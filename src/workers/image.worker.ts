import * as exifr from 'exifr';

type RequestMessage =
  | { id: string; action: 'metadata'; buffer: ArrayBuffer; mime: string; name: string }
  | { id: string; action: 'clean'; mode: 'all' | 'gps'; buffer: ArrayBuffer; mime: string; name: string }
  | { id: string; action: 'resize'; buffer: ArrayBuffer; mime: string; name: string; width: number; height: number; outputType: string; quality: number }
  | { id: string; action: 'convert'; buffer: ArrayBuffer; mime: string; name: string; outputType: string; quality: number };

type Field = { group: string; key: string; value: string };

const options = { tiff: true, exif: true, gps: true, iptc: true, xmp: true, mergeOutput: false };

function stringify(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (typeof value === 'string') return value;
  if (value == null) return '';
  try { return JSON.stringify(value); } catch { return String(value); }
}

function groupKey(key: string, parent: string): string {
  const lower = `${parent} ${key}`.toLowerCase();
  if (lower.includes('gps') || lower.includes('latitude') || lower.includes('longitude') || lower.includes('altitude') || lower.includes('location')) return 'Location';
  if (/(make|model|lens|focal|iso|aperture|exposure|camera)/.test(lower)) return 'Camera';
  if (/(date|time|created|modified|offsettime)/.test(lower)) return 'Date';
  if (/(software|creator|artist|copyright|owner|author|xmp|iptc)/.test(lower)) return 'Software / Copyright';
  return 'Other';
}

function flatten(obj: unknown, parent = ''): Field[] {
  if (!obj || typeof obj !== 'object') return [];
  const fields: Field[] = [];
  for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
    if (value && typeof value === 'object' && !(value instanceof Date) && !Array.isArray(value)) {
      fields.push(...flatten(value, key));
    } else if (value !== undefined && value !== null && stringify(value) !== '') {
      fields.push({ group: groupKey(key, parent), key: parent ? `${parent}.${key}` : key, value: stringify(value) });
    }
  }
  return fields.sort((a, b) => a.group.localeCompare(b.group) || a.key.localeCompare(b.key));
}

function isPrivacyMetadata(field: Field): boolean {
  if (field.group === 'Location' || field.group === 'Camera' || field.group === 'Date' || field.group === 'Software / Copyright') {
    return true;
  }
  return /gps|latitude|longitude|altitude|location|make|model|lens|camera|date|time|software|creator|artist|copyright|owner|author|xmp|iptc/i.test(field.key);
}

async function parseMetadata(blob: Blob): Promise<{ fields: Field[]; count: number; gpsFound: boolean; sensitiveCount: number; technicalCount: number }> {
  const parsed = await exifr.parse(blob, options).catch(() => null);
  const fields = flatten(parsed);
  const gpsFound = fields.some((field) => field.group === 'Location' || /gps|latitude|longitude/i.test(field.key));
  const sensitiveCount = fields.filter(isPrivacyMetadata).length;
  return {
    fields,
    count: fields.length,
    gpsFound,
    sensitiveCount,
    technicalCount: Math.max(0, fields.length - sensitiveCount)
  };
}

function getExtension(mime: string): string {
  if (mime === 'image/jpeg') return 'jpg';
  if (mime === 'image/png') return 'png';
  if (mime === 'image/webp') return 'webp';
  return 'png';
}

async function blobFromCanvas(canvas: OffscreenCanvas, type: string, quality: number): Promise<Blob> {
  return canvas.convertToBlob({ type, quality });
}

async function drawToCanvas(blob: Blob, width?: number, height?: number, background = false): Promise<OffscreenCanvas> {
  if (typeof OffscreenCanvas === 'undefined' || typeof createImageBitmap === 'undefined') {
    throw new Error('This browser does not support worker canvas processing for this image. Try a current desktop browser.');
  }
  const bitmap = await createImageBitmap(blob, { imageOrientation: 'from-image' });
  const targetW = Math.max(1, Math.round(width ?? bitmap.width));
  const targetH = Math.max(1, Math.round(height ?? bitmap.height));
  const canvas = new OffscreenCanvas(targetW, targetH);
  const ctx = canvas.getContext('2d', { alpha: !background });
  if (!ctx) throw new Error('Canvas is not available in this browser.');
  if (background) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, targetW, targetH);
  }
  ctx.drawImage(bitmap, 0, 0, targetW, targetH);
  bitmap.close?.();
  return canvas;
}

async function bytesFromBlob(blob: Blob): Promise<ArrayBuffer> {
  return await blob.arrayBuffer();
}

self.addEventListener('message', async (event: MessageEvent<RequestMessage>) => {
  const message = event.data;
  try {
    const blob = new Blob([message.buffer], { type: message.mime || 'application/octet-stream' });

    if (message.action === 'metadata') {
      const metadata = await parseMetadata(blob);
      self.postMessage({ id: message.id, ok: true, ...metadata });
      return;
    }

    if (message.action === 'clean') {
      const before = await parseMetadata(blob);
      const outputType = message.mime === 'image/png' || message.mime === 'image/webp' ? message.mime : 'image/jpeg';
      const canvas = await drawToCanvas(blob, undefined, undefined, outputType === 'image/jpeg');
      const outputBlob = await blobFromCanvas(canvas, outputType, 0.92);
      const after = await parseMetadata(outputBlob);
      const bytes = await bytesFromBlob(outputBlob);
      self.postMessage({ id: message.id, ok: true, bytes, outputType, extension: getExtension(outputType), before, after }, [bytes]);
      return;
    }

    if (message.action === 'resize') {
      const outputType = message.outputType === 'same' ? (message.mime || 'image/png') : message.outputType;
      const canvas = await drawToCanvas(blob, message.width, message.height, outputType === 'image/jpeg');
      const outputBlob = await blobFromCanvas(canvas, outputType, message.quality);
      const verifyBitmap = await createImageBitmap(outputBlob);
      const bytes = await bytesFromBlob(outputBlob);
      self.postMessage({ id: message.id, ok: true, bytes, outputType, extension: getExtension(outputType), width: verifyBitmap.width, height: verifyBitmap.height }, [bytes]);
      verifyBitmap.close?.();
      return;
    }

    if (message.action === 'convert') {
      const outputType = message.outputType;
      const canvas = await drawToCanvas(blob, undefined, undefined, outputType === 'image/jpeg');
      const outputBlob = await blobFromCanvas(canvas, outputType, message.quality);
      const verifyBitmap = await createImageBitmap(outputBlob);
      const bytes = await bytesFromBlob(outputBlob);
      self.postMessage({ id: message.id, ok: true, bytes, outputType, extension: getExtension(outputType), width: verifyBitmap.width, height: verifyBitmap.height }, [bytes]);
      verifyBitmap.close?.();
      return;
    }
  } catch (error) {
    self.postMessage({ id: message.id, ok: false, error: error instanceof Error ? error.message : 'Image processing failed.' });
  }
});
