(function () {
  if (window.__privacyFileToolsLoaded) return;
  window.__privacyFileToolsLoaded = true;

  const IMAGE_LIMIT = 50 * 1024 * 1024;
  const HASH_LIMIT = 250 * 1024 * 1024;
  const PIXEL_LIMIT = 40 * 1000 * 1000;

  function formatBytes(bytes) {
    if (!Number.isFinite(bytes) || bytes < 0) return 'Unknown';
    if (bytes < 1024) return `${bytes} B`;
    const units = ['KB', 'MB', 'GB'];
    let value = bytes / 1024;
    let unit = units[0];
    for (let index = 1; index < units.length && value >= 1024; index += 1) {
      value /= 1024;
      unit = units[index];
    }
    return `${value.toFixed(value >= 10 ? 1 : 2)} ${unit}`;
  }

  function setStatus(root, message, type) {
    const status = root.querySelector('[data-file-status]');
    if (!status) return;
    status.textContent = message;
    status.className = `alert${type ? ` ${type}` : ''}`;
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function safeName(name, suffix, extension) {
    const base = String(name || 'file').replace(/\.[^.]+$/, '').replace(/[^a-z0-9._-]+/gi, '-').replace(/^-+|-+$/g, '') || 'file';
    return `${base}${suffix}.${extension}`;
  }

  async function loadImage(file) {
    if ('createImageBitmap' in window) {
      const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
      return {
        width: bitmap.width,
        height: bitmap.height,
        draw(ctx) { ctx.drawImage(bitmap, 0, 0); },
        close() { bitmap.close(); }
      };
    }
    return new Promise((resolve, reject) => {
      const image = new Image();
      const url = URL.createObjectURL(file);
      image.onload = () => resolve({
        width: image.naturalWidth,
        height: image.naturalHeight,
        draw(ctx) { ctx.drawImage(image, 0, 0); },
        close() { URL.revokeObjectURL(url); }
      });
      image.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('The browser could not decode this image.'));
      };
      image.src = url;
    });
  }

  function renderSummary(root, rows) {
    const summary = root.querySelector('[data-file-summary]');
    if (!summary) return;
    summary.innerHTML = '';
    rows.forEach(([term, value]) => {
      const dt = document.createElement('dt');
      const dd = document.createElement('dd');
      dt.textContent = term;
      dd.textContent = value;
      summary.append(dt, dd);
    });
  }

  function initImageRemover(root) {
    const input = root.querySelector('[data-file-input]');
    const run = root.querySelector('[data-run-file-tool]');
    const clear = root.querySelector('[data-clear-file-tool]');
    const preview = root.querySelector('[data-image-preview]');
    const previewEmpty = root.querySelector('[data-preview-empty]');
    let file = null;
    let previewUrl = '';

    function reset() {
      file = null;
      input.value = '';
      run.disabled = true;
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      previewUrl = '';
      preview.hidden = true;
      preview.removeAttribute('src');
      previewEmpty.hidden = false;
      renderSummary(root, []);
      setStatus(root, 'Choose an image to begin.');
    }

    input.addEventListener('change', async () => {
      file = input.files && input.files[0] ? input.files[0] : null;
      run.disabled = true;
      if (!file) return reset();
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        setStatus(root, 'Choose a JPEG, PNG, or WebP image.', 'danger');
        file = null;
        return;
      }
      if (file.size > IMAGE_LIMIT) {
        setStatus(root, 'This image is larger than 50 MB. Use a smaller copy to avoid browser memory problems.', 'danger');
        file = null;
        return;
      }
      try {
        const image = await loadImage(file);
        const pixels = image.width * image.height;
        image.close();
        if (pixels > PIXEL_LIMIT) {
          setStatus(root, 'This image exceeds 40 megapixels. Resize it first to avoid browser memory problems.', 'danger');
          file = null;
          return;
        }
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        previewUrl = URL.createObjectURL(file);
        preview.src = previewUrl;
        preview.hidden = false;
        previewEmpty.hidden = true;
        renderSummary(root, [
          ['Original file', file.name],
          ['Type', file.type || 'Unknown'],
          ['Original size', formatBytes(file.size)],
          ['Dimensions', `${image.width} × ${image.height}`]
        ]);
        run.disabled = false;
        setStatus(root, 'Ready. The clean copy will be newly rendered from the visible pixels.', 'ok');
      } catch (error) {
        setStatus(root, error.message || 'The image could not be opened.', 'danger');
        file = null;
      }
    });

    run.addEventListener('click', async () => {
      if (!file) return;
      run.disabled = true;
      setStatus(root, 'Creating a new metadata-free image copy...');
      try {
        const image = await loadImage(file);
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext('2d', { alpha: file.type !== 'image/jpeg' });
        if (!context) throw new Error('Canvas processing is not available in this browser.');
        if (file.type === 'image/jpeg') {
          context.fillStyle = '#ffffff';
          context.fillRect(0, 0, canvas.width, canvas.height);
        }
        image.draw(context);
        image.close();
        const outputType = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type) ? file.type : 'image/png';
        const extension = outputType === 'image/jpeg' ? 'jpg' : outputType.split('/')[1];
        const blob = await new Promise((resolve) => canvas.toBlob(resolve, outputType, outputType === 'image/png' ? undefined : 0.92));
        if (!blob) throw new Error('The browser could not export the cleaned image.');
        downloadBlob(blob, safeName(file.name, '-metadata-removed', extension));
        renderSummary(root, [
          ['Original file', file.name],
          ['Original size', formatBytes(file.size)],
          ['Clean copy size', formatBytes(blob.size)],
          ['Output format', outputType],
          ['Dimensions', `${canvas.width} × ${canvas.height}`]
        ]);
        setStatus(root, 'Clean copy created. Inspect the downloaded file before sharing or deleting the original.', 'ok');
      } catch (error) {
        setStatus(root, error.message || 'The clean copy could not be created.', 'danger');
      } finally {
        run.disabled = !file;
      }
    });

    clear.addEventListener('click', reset);
  }

  function getString(view, offset, length) {
    let result = '';
    for (let index = 0; index < length; index += 1) result += String.fromCharCode(view.getUint8(offset + index));
    return result;
  }

  function readExifValue(view, tiff, entryOffset, littleEndian) {
    const type = view.getUint16(entryOffset + 2, littleEndian);
    const count = view.getUint32(entryOffset + 4, littleEndian);
    const typeSizes = { 1: 1, 2: 1, 3: 2, 4: 4, 5: 8, 7: 1, 9: 4, 10: 8 };
    const size = (typeSizes[type] || 1) * count;
    const valueOffset = size <= 4 ? entryOffset + 8 : tiff + view.getUint32(entryOffset + 8, littleEndian);
    if (valueOffset < 0 || valueOffset + size > view.byteLength) return null;

    const readRational = (position, signed) => {
      const numerator = signed ? view.getInt32(position, littleEndian) : view.getUint32(position, littleEndian);
      const denominator = signed ? view.getInt32(position + 4, littleEndian) : view.getUint32(position + 4, littleEndian);
      return denominator ? numerator / denominator : 0;
    };

    if (type === 2) return getString(view, valueOffset, count).replace(/\0+$/, '').trim();
    if (type === 3) return count === 1 ? view.getUint16(valueOffset, littleEndian) : Array.from({ length: count }, (_, i) => view.getUint16(valueOffset + i * 2, littleEndian));
    if (type === 4) return count === 1 ? view.getUint32(valueOffset, littleEndian) : Array.from({ length: count }, (_, i) => view.getUint32(valueOffset + i * 4, littleEndian));
    if (type === 5) return count === 1 ? readRational(valueOffset, false) : Array.from({ length: count }, (_, i) => readRational(valueOffset + i * 8, false));
    if (type === 9) return count === 1 ? view.getInt32(valueOffset, littleEndian) : Array.from({ length: count }, (_, i) => view.getInt32(valueOffset + i * 4, littleEndian));
    if (type === 10) return count === 1 ? readRational(valueOffset, true) : Array.from({ length: count }, (_, i) => readRational(valueOffset + i * 8, true));
    if (type === 1 || type === 7) return count === 1 ? view.getUint8(valueOffset) : Array.from({ length: count }, (_, i) => view.getUint8(valueOffset + i));
    return null;
  }

  function readIfd(view, tiff, relativeOffset, littleEndian) {
    const offset = tiff + relativeOffset;
    if (offset < 0 || offset + 2 > view.byteLength) return new Map();
    const count = view.getUint16(offset, littleEndian);
    const result = new Map();
    for (let index = 0; index < count; index += 1) {
      const entry = offset + 2 + index * 12;
      if (entry + 12 > view.byteLength) break;
      const tag = view.getUint16(entry, littleEndian);
      result.set(tag, readExifValue(view, tiff, entry, littleEndian));
    }
    return result;
  }

  function formatCoordinate(values, reference) {
    if (!Array.isArray(values) || values.length < 3) return null;
    let decimal = Number(values[0]) + Number(values[1]) / 60 + Number(values[2]) / 3600;
    if (reference === 'S' || reference === 'W') decimal *= -1;
    return Number.isFinite(decimal) ? decimal.toFixed(6) : null;
  }

  function parseJpegMetadata(buffer) {
    const view = new DataView(buffer);
    const rows = [];
    if (view.byteLength < 4 || view.getUint16(0, false) !== 0xffd8) return rows;
    let offset = 2;
    while (offset + 4 <= view.byteLength) {
      if (view.getUint8(offset) !== 0xff) break;
      const marker = view.getUint8(offset + 1);
      if (marker === 0xda || marker === 0xd9) break;
      const length = view.getUint16(offset + 2, false);
      if (length < 2 || offset + 2 + length > view.byteLength) break;
      const dataStart = offset + 4;
      if (marker === 0xe0 && getString(view, dataStart, Math.min(5, length - 2)) === 'JFIF\0') {
        rows.push(['JFIF header', 'Present']);
      }
      if (marker === 0xe1 && length >= 8 && getString(view, dataStart, 6) === 'Exif\0\0') {
        rows.push(['EXIF block', 'Present']);
        const tiff = dataStart + 6;
        if (tiff + 8 > view.byteLength) break;
        const byteOrder = getString(view, tiff, 2);
        const littleEndian = byteOrder === 'II';
        if (!littleEndian && byteOrder !== 'MM') break;
        const ifd0Offset = view.getUint32(tiff + 4, littleEndian);
        const ifd0 = readIfd(view, tiff, ifd0Offset, littleEndian);
        const labelMap = new Map([
          [0x010f, 'Camera make'], [0x0110, 'Camera model'], [0x0112, 'Orientation'], [0x0131, 'Software'],
          [0x0132, 'Modified date'], [0x013b, 'Artist'], [0x8298, 'Copyright'], [0x010e, 'Image description']
        ]);
        labelMap.forEach((label, tag) => {
          const value = ifd0.get(tag);
          if (value !== undefined && value !== null && value !== '') rows.push([label, String(value)]);
        });
        const exifPointer = ifd0.get(0x8769);
        if (Number.isFinite(exifPointer)) {
          const exif = readIfd(view, tiff, Number(exifPointer), littleEndian);
          const exifLabels = new Map([[0x9003, 'Date taken'], [0x9004, 'Digitized date'], [0xa434, 'Lens model'], [0xa420, 'Image unique ID']]);
          exifLabels.forEach((label, tag) => {
            const value = exif.get(tag);
            if (value !== undefined && value !== null && value !== '') rows.push([label, String(value)]);
          });
        }
        const gpsPointer = ifd0.get(0x8825);
        if (Number.isFinite(gpsPointer)) {
          const gps = readIfd(view, tiff, Number(gpsPointer), littleEndian);
          const latitude = formatCoordinate(gps.get(2), gps.get(1));
          const longitude = formatCoordinate(gps.get(4), gps.get(3));
          if (latitude) rows.push(['GPS latitude', latitude]);
          if (longitude) rows.push(['GPS longitude', longitude]);
          const altitude = gps.get(6);
          if (Number.isFinite(altitude)) rows.push(['GPS altitude', `${Number(altitude).toFixed(2)} m`]);
        }
        break;
      }
      offset += 2 + length;
    }
    return rows;
  }

  function parsePngMetadata(buffer) {
    const view = new DataView(buffer);
    const rows = [];
    if (view.byteLength < 24 || getString(view, 0, 8) !== '\x89PNG\r\n\x1a\n') return rows;
    let offset = 8;
    while (offset + 12 <= view.byteLength) {
      const length = view.getUint32(offset, false);
      const type = getString(view, offset + 4, 4);
      const dataStart = offset + 8;
      if (dataStart + length + 4 > view.byteLength) break;
      if (type === 'IHDR' && length >= 8) rows.push(['PNG dimensions', `${view.getUint32(dataStart, false)} × ${view.getUint32(dataStart + 4, false)}`]);
      if (type === 'eXIf') rows.push(['EXIF chunk', 'Present']);
      if (type === 'iTXt' || type === 'tEXt' || type === 'zTXt') {
        const raw = getString(view, dataStart, Math.min(length, 200));
        const keyword = raw.split('\0')[0].trim();
        rows.push([`${type} chunk`, keyword || 'Embedded text present']);
      }
      if (type === 'iCCP') rows.push(['ICC color profile', 'Present']);
      if (type === 'IEND') break;
      offset = dataStart + length + 4;
    }
    return rows;
  }

  function parseWebpMetadata(buffer) {
    const view = new DataView(buffer);
    const rows = [];
    if (view.byteLength < 16 || getString(view, 0, 4) !== 'RIFF' || getString(view, 8, 4) !== 'WEBP') return rows;
    let offset = 12;
    while (offset + 8 <= view.byteLength) {
      const type = getString(view, offset, 4);
      const length = view.getUint32(offset + 4, true);
      if (type === 'EXIF') rows.push(['EXIF chunk', 'Present']);
      if (type === 'XMP ') rows.push(['XMP chunk', 'Present']);
      if (type === 'ICCP') rows.push(['ICC color profile', 'Present']);
      offset += 8 + length + (length % 2);
    }
    return rows;
  }

  function renderMetadataReport(root, rows) {
    const report = root.querySelector('[data-metadata-report]');
    report.innerHTML = '';
    if (!rows.length) {
      const message = document.createElement('p');
      message.textContent = 'No supported metadata fields were found. This does not prove the file contains no metadata.';
      report.appendChild(message);
      return;
    }
    const dl = document.createElement('dl');
    dl.className = 'metadata-list metadata-list-report';
    rows.forEach(([term, value]) => {
      const dt = document.createElement('dt');
      const dd = document.createElement('dd');
      dt.textContent = term;
      dd.textContent = value;
      if (/GPS latitude|GPS longitude/i.test(term)) dd.classList.add('sensitive-value');
      dl.append(dt, dd);
    });
    report.appendChild(dl);
  }

  function initMetadataViewer(root) {
    const input = root.querySelector('[data-file-input]');
    const run = root.querySelector('[data-run-file-tool]');
    const clear = root.querySelector('[data-clear-file-tool]');
    let file = null;

    function reset() {
      file = null;
      input.value = '';
      run.disabled = true;
      renderMetadataReport(root, []);
      setStatus(root, 'Choose an image to begin.');
    }

    input.addEventListener('change', () => {
      file = input.files && input.files[0] ? input.files[0] : null;
      if (!file) return reset();
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > IMAGE_LIMIT) {
        setStatus(root, 'Choose a JPEG, PNG, or WebP image no larger than 50 MB.', 'danger');
        file = null;
        run.disabled = true;
        return;
      }
      run.disabled = false;
      setStatus(root, `Ready to inspect ${file.name} (${formatBytes(file.size)}).`, 'ok');
    });

    run.addEventListener('click', async () => {
      if (!file) return;
      run.disabled = true;
      setStatus(root, 'Reading common metadata structures locally...');
      try {
        const [buffer, image] = await Promise.all([file.arrayBuffer(), loadImage(file)]);
        const rows = [
          ['File name', file.name],
          ['File type', file.type || 'Unknown'],
          ['File size', formatBytes(file.size)],
          ['Last modified', new Date(file.lastModified).toISOString()],
          ['Decoded dimensions', `${image.width} × ${image.height}`]
        ];
        image.close();
        if (file.type === 'image/jpeg') rows.push(...parseJpegMetadata(buffer));
        else if (file.type === 'image/png') rows.push(...parsePngMetadata(buffer));
        else if (file.type === 'image/webp') rows.push(...parseWebpMetadata(buffer));
        renderMetadataReport(root, rows);
        const hasGps = rows.some(([term]) => /GPS latitude|GPS longitude/i.test(term));
        setStatus(root, hasGps ? 'GPS coordinates were found. Create a clean copy before sharing this image.' : 'Inspection complete. Review the report and remember that unsupported metadata may still exist.', hasGps ? 'danger' : 'ok');
      } catch (error) {
        setStatus(root, error.message || 'The image metadata could not be read.', 'danger');
      } finally {
        run.disabled = !file;
      }
    });

    clear.addEventListener('click', reset);
  }

  function normalizeHash(value) {
    return String(value || '').trim().toLowerCase().replace(/^sha256[:\s-]*/i, '').replace(/\s+/g, '');
  }

  function initChecksum(root) {
    const input = root.querySelector('[data-file-input]');
    const expected = root.querySelector('[data-expected-hash]');
    const run = root.querySelector('[data-run-file-tool]');
    const clear = root.querySelector('[data-clear-file-tool]');
    const output = root.querySelector('[data-hash-output]');
    const copy = root.querySelector('[data-copy-hash]');
    const comparison = root.querySelector('[data-hash-comparison]');
    let file = null;
    let hash = '';

    function compare() {
      comparison.textContent = '';
      comparison.className = 'hash-comparison';
      const expectedValue = normalizeHash(expected.value);
      if (!hash || !expectedValue) return;
      if (!/^[a-f0-9]{64}$/.test(expectedValue)) {
        comparison.textContent = 'The expected value is not a valid 64-character SHA-256 hex digest.';
        comparison.classList.add('mismatch');
        return;
      }
      const matches = hash === expectedValue;
      comparison.textContent = matches ? 'Exact match: the file bytes match the expected SHA-256 value.' : 'Mismatch: do not assume this is the expected file.';
      comparison.classList.add(matches ? 'match' : 'mismatch');
    }

    function reset() {
      file = null;
      hash = '';
      input.value = '';
      expected.value = '';
      run.disabled = true;
      copy.disabled = true;
      output.textContent = 'No checksum calculated.';
      comparison.textContent = '';
      comparison.className = 'hash-comparison';
      setStatus(root, 'Choose a file to begin.');
    }

    input.addEventListener('change', () => {
      file = input.files && input.files[0] ? input.files[0] : null;
      hash = '';
      copy.disabled = true;
      output.textContent = 'No checksum calculated.';
      comparison.textContent = '';
      if (!file) return reset();
      if (file.size > HASH_LIMIT) {
        setStatus(root, 'This file is larger than 250 MB. Use an operating-system checksum command for very large files.', 'danger');
        file = null;
        run.disabled = true;
        return;
      }
      run.disabled = false;
      setStatus(root, `Ready to hash ${file.name} (${formatBytes(file.size)}).`, 'ok');
    });

    expected.addEventListener('input', compare);

    run.addEventListener('click', async () => {
      if (!file) return;
      run.disabled = true;
      setStatus(root, 'Calculating SHA-256 locally...');
      try {
        const buffer = await file.arrayBuffer();
        const digest = await crypto.subtle.digest('SHA-256', buffer);
        hash = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
        output.textContent = hash;
        copy.disabled = false;
        compare();
        setStatus(root, 'Checksum calculated. Compare it with a value from a trusted source.', 'ok');
      } catch (error) {
        setStatus(root, error.message || 'The checksum could not be calculated.', 'danger');
      } finally {
        run.disabled = !file;
      }
    });

    copy.addEventListener('click', async () => {
      if (!hash) return;
      await navigator.clipboard.writeText(hash);
      copy.textContent = 'Copied';
      setTimeout(() => { copy.textContent = 'Copy hash'; }, 1200);
    });

    clear.addEventListener('click', reset);
  }

  function initAll() {
    document.querySelectorAll('[data-file-tool]').forEach((root) => {
      if (root.dataset.ready) return;
      root.dataset.ready = 'true';
      const mode = root.dataset.mode;
      if (mode === 'image-metadata-remover') initImageRemover(root);
      else if (mode === 'image-metadata-viewer') initMetadataViewer(root);
      else if (mode === 'sha256-checksum') initChecksum(root);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initAll);
  else initAll();
})();
