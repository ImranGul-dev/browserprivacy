import { PDFDocument } from 'pdf-lib';

type RequestMessage =
  | { id: string; action: 'pageCount'; buffer: ArrayBuffer }
  | { id: string; action: 'cleanMetadata'; buffer: ArrayBuffer }
  | { id: string; action: 'merge'; buffers: ArrayBuffer[] }
  | { id: string; action: 'split'; buffer: ArrayBuffer; indices: number[] }
  | { id: string; action: 'removePages'; buffer: ArrayBuffer; removeIndices: number[] };

async function loadPdf(buffer: ArrayBuffer): Promise<PDFDocument> {
  return PDFDocument.load(buffer, { ignoreEncryption: false, updateMetadata: false });
}

async function verifyPageCount(bytes: Uint8Array, expected: number): Promise<void> {
  const pdf = await PDFDocument.load(bytes, { ignoreEncryption: false, updateMetadata: false });
  const actual = pdf.getPageCount();
  if (actual !== expected) throw new Error(`Output verification failed. Expected ${expected} pages but found ${actual}.`);
}

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  const output = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(output).set(bytes);
  return output;
}

function describeDate(value: unknown): string {
  return value instanceof Date && !Number.isNaN(value.getTime()) ? value.toISOString() : '';
}

function detectCommonMetadata(pdf: PDFDocument): string[] {
  const fields: Array<[string, unknown]> = [
    ['Title', pdf.getTitle?.()],
    ['Author', pdf.getAuthor?.()],
    ['Subject', pdf.getSubject?.()],
    ['Keywords', pdf.getKeywords?.()],
    ['Creator', pdf.getCreator?.()],
    ['Producer', pdf.getProducer?.()],
    ['Creation date', describeDate(pdf.getCreationDate?.())],
    ['Modification date', describeDate(pdf.getModificationDate?.())]
  ];
  return fields
    .filter(([, value]) => Boolean(String(value || '').trim()))
    .map(([label]) => label);
}

function clearCommonMetadata(pdf: PDFDocument): void {
  pdf.setTitle('');
  pdf.setAuthor('');
  pdf.setSubject('');
  pdf.setKeywords([]);
  pdf.setCreator('');
  pdf.setProducer('');
  pdf.setCreationDate(new Date(0));
  pdf.setModificationDate(new Date(0));
}

self.addEventListener('message', async (event: MessageEvent<RequestMessage>) => {
  const message = event.data;
  try {
    if (message.action === 'pageCount') {
      const pdf = await loadPdf(message.buffer);
      self.postMessage({ id: message.id, ok: true, pageCount: pdf.getPageCount() });
      return;
    }

    if (message.action === 'cleanMetadata') {
      const pdf = await PDFDocument.load(message.buffer, { ignoreEncryption: true, updateMetadata: false });
      const detectedFields = detectCommonMetadata(pdf);
      clearCommonMetadata(pdf);
      const bytes = await pdf.save({ useObjectStreams: true, addDefaultPage: false });
      const output = toArrayBuffer(bytes);
      self.postMessage({ id: message.id, ok: true, bytes: output, detectedFields, pageCount: pdf.getPageCount() }, [output]);
      return;
    }

    if (message.action === 'merge') {
      if (message.buffers.length < 2) throw new Error('Select at least two PDF files to merge.');
      const out = await PDFDocument.create();
      let expected = 0;
      for (const buffer of message.buffers) {
        const src = await loadPdf(buffer);
        const indices = src.getPageIndices();
        expected += indices.length;
        const pages = await out.copyPages(src, indices);
        pages.forEach((page) => out.addPage(page));
      }
      out.setTitle('Merged PDF');
      out.setProducer('Privacy Toolbox browser-only PDF merger');
      out.setModificationDate(new Date());
      const bytes = await out.save();
      await verifyPageCount(bytes, expected);
      const output = toArrayBuffer(bytes);
      self.postMessage({ id: message.id, ok: true, bytes: output, pageCount: expected }, [output]);
      return;
    }

    if (message.action === 'split') {
      const src = await loadPdf(message.buffer);
      if (message.indices.length === 0) throw new Error('Select at least one page.');
      const out = await PDFDocument.create();
      const pages = await out.copyPages(src, message.indices);
      pages.forEach((page) => out.addPage(page));
      out.setTitle('Split PDF');
      out.setProducer('Privacy Toolbox browser-only PDF splitter');
      const bytes = await out.save();
      await verifyPageCount(bytes, message.indices.length);
      const output = toArrayBuffer(bytes);
      self.postMessage({ id: message.id, ok: true, bytes: output, pageCount: message.indices.length }, [output]);
      return;
    }

    if (message.action === 'removePages') {
      const src = await loadPdf(message.buffer);
      const pageCount = src.getPageCount();
      const removeSet = new Set(message.removeIndices);
      const keep = src.getPageIndices().filter((index) => !removeSet.has(index));
      if (keep.length === 0) throw new Error('You cannot remove every page. Keep at least one page.');
      const out = await PDFDocument.create();
      const pages = await out.copyPages(src, keep);
      pages.forEach((page) => out.addPage(page));
      out.setTitle('PDF with pages removed');
      out.setProducer('Privacy Toolbox browser-only page remover');
      const bytes = await out.save();
      await verifyPageCount(bytes, pageCount - removeSet.size);
      const output = toArrayBuffer(bytes);
      self.postMessage({ id: message.id, ok: true, bytes: output, pageCount: keep.length }, [output]);
      return;
    }

    throw new Error('Unsupported PDF worker action.');
  } catch (error) {
    const messageText = error instanceof Error ? error.message : 'PDF processing failed.';
    self.postMessage({ id: message.id, ok: false, error: messageText.includes('encrypted') ? 'This PDF appears to be encrypted or password-protected. Remove the password first, then try again.' : messageText });
  }
});
