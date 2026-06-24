import { cleanTrackingUrl } from '@/utils/urlTracking';
import { parsePageRanges, summarizeRanges } from '@/utils/pageRanges';
import { createDownloadLink, revokeDownloadLinks, safeFilename } from '@/utils/download';
import { formatBytes, isImageFile, isPdfFile, SOFT_LIMITS } from '@/utils/fileGuards';
import { isSha256Hex } from '@/utils/sha256';

type ToolKind = HTMLElement['dataset']['toolKind'];
type WorkerResponse = Record<string, unknown> & { id: string; ok: boolean; error?: string };
type MetadataField = { group: string; key: string; value: string };

type RuntimeState = {
  root: HTMLElement;
  kind: ToolKind;
  files: File[];
  pageCount?: number;
  imageDimensions?: { width: number; height: number };
  initialized: boolean;
};

let initializedOnce = false;
let requestId = 0;

function request(worker: Worker, message: Record<string, unknown>, transfer: Transferable[] = []): Promise<WorkerResponse> {
  const id = `req-${Date.now()}-${requestId += 1}`;
  return new Promise((resolve) => {
    const onMessage = (event: MessageEvent<WorkerResponse>) => {
      if (event.data.id === id) {
        worker.removeEventListener('message', onMessage);
        resolve(event.data);
      }
    };
    worker.addEventListener('message', onMessage);
    worker.postMessage({ id, ...message }, transfer);
  });
}

function makeImageWorker(): Worker {
  return new Worker(new URL('../workers/image.worker.ts', import.meta.url), { type: 'module' });
}
function makePdfWorker(): Worker {
  return new Worker(new URL('../workers/pdf.worker.ts', import.meta.url), { type: 'module' });
}
function makeHashWorker(): Worker {
  return new Worker(new URL('../workers/hash.worker.ts', import.meta.url), { type: 'module' });
}

function q<T extends Element>(root: ParentNode, selector: string): T | null {
  return root.querySelector<T>(selector);
}

function showProgress(root: HTMLElement, label: string, percent: number): void {
  const card = q<HTMLElement>(root, '[data-progress-card]');
  const labelEl = q<HTMLElement>(root, '[data-progress-label]');
  const bar = q<HTMLElement>(root, '[data-progress-bar]');
  if (card) card.hidden = false;
  if (labelEl) labelEl.textContent = label;
  if (bar) bar.style.width = `${Math.max(0, Math.min(100, percent))}%`;
}

function hideProgress(root: HTMLElement): void {
  const card = q<HTMLElement>(root, '[data-progress-card]');
  if (card) card.hidden = true;
}

function showError(root: HTMLElement, message: string): void {
  hideProgress(root);
  const error = q<HTMLElement>(root, '[data-error]');
  const title = q<HTMLElement>(root, '[data-error-title]');
  const text = q<HTMLElement>(root, '[data-error] p');
  if (title) title.textContent = 'Could not complete the tool.';
  if (text) text.textContent = message;
  if (error) error.hidden = false;
}

function clearError(root: HTMLElement): void {
  const error = q<HTMLElement>(root, '[data-error]');
  if (error) error.hidden = true;
}

function clearResult(root: HTMLElement): void {
  revokeDownloadLinks(root);
  const result = q<HTMLElement>(root, '[data-result]');
  const heading = q<HTMLElement>(root, '[data-result-heading]');
  const summary = q<HTMLElement>(root, '[data-result-summary]');
  const actions = q<HTMLElement>(root, '[data-result-actions]');
  if (heading) heading.textContent = '';
  if (summary) summary.innerHTML = '';
  if (actions) actions.innerHTML = '';
  if (result) result.hidden = true;
}

function showResult(root: HTMLElement, rows: Record<string, string | number | boolean>, actions?: Node[]): void {
  const result = q<HTMLElement>(root, '[data-result]');
  const heading = q<HTMLElement>(root, '[data-result-heading]');
  const summary = q<HTMLElement>(root, '[data-result-summary]');
  const actionBox = q<HTMLElement>(root, '[data-result-actions]');
  if (!result || !summary || !actionBox) return;
  if (heading) heading.textContent = 'Result';

  const dl = document.createElement('dl');
  dl.className = 'result-grid';

  for (const [key, value] of Object.entries(rows)) {
    const stringValue = String(value);
    const row = document.createElement('div');
    row.className = 'result-row';

    const shouldUseWideRow =
      key.toLowerCase().includes('url') ||
      key.toLowerCase().includes('hash') ||
      key.toLowerCase().includes('file') ||
      stringValue.length > 52;

    if (shouldUseWideRow) row.classList.add('result-row-wide');
    if (key.toLowerCase() === 'status') row.classList.add('result-row-status');

    const dt = document.createElement('dt');
    dt.textContent = key;

    const dd = document.createElement('dd');
    dd.textContent = stringValue;
    if (key.toLowerCase().includes('url') || key.toLowerCase().includes('sha') || key.toLowerCase().includes('hash')) {
      dd.classList.add('mono-value');
    }

    row.append(dt, dd);
    dl.append(row);
  }

  summary.innerHTML = '';
  summary.className = 'result-summary';
  summary.append(dl);
  actionBox.innerHTML = '';
  actions?.forEach((node) => actionBox.append(node));
  result.hidden = false;
  hideProgress(root);
}

function copyButton(text: string, label = 'Copy'): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'button secondary';
  button.textContent = label;
  button.addEventListener('click', async () => {
    await navigator.clipboard.writeText(text);
    button.textContent = 'Copied';
    window.setTimeout(() => { button.textContent = label; }, 1600);
  });
  return button;
}

function validateFiles(kind: ToolKind, files: File[]): string | null {
  if (kind === 'url-cleaner') return null;
  if (!files.length) return 'Choose a file first.';
  if (kind === 'merge-pdf' && files.length < 2) return 'Select at least two PDF files to merge.';
  if ((kind === 'remove-exif' || kind === 'remove-gps' || kind === 'metadata-viewer' || kind === 'resize-image' || kind === 'convert-image')) {
    const bad = files.find((file) => !isImageFile(file));
    if (bad) return `${bad.name} is not a supported image. Choose a JPG, PNG, or WebP file.`;
    const large = files.find((file) => file.size > SOFT_LIMITS.imageBytes);
    if (large) return `${large.name} is ${formatBytes(large.size)}. For browser-only image processing, use an image under ${formatBytes(SOFT_LIMITS.imageBytes)}.`;
  }
  if (kind === 'merge-pdf' || kind === 'split-pdf' || kind === 'remove-pdf-pages' || kind === 'remove-pdf-metadata' || kind === 'remove-pdf-hidden-data') {
    const bad = files.find((file) => !isPdfFile(file));
    if (bad) return `${bad.name} is not a supported PDF. Choose a .pdf file.`;
    const large = files.find((file) => file.size > SOFT_LIMITS.pdfBytes);
    if (large) return `${large.name} is ${formatBytes(large.size)}. For browser-only processing, use a file under ${formatBytes(SOFT_LIMITS.pdfBytes)}.`;
  }
  return null;
}

function renderSelectedFiles(state: RuntimeState): void {
  const box = q<HTMLElement>(state.root, '[data-selected-files]');
  const processButton = q<HTMLButtonElement>(state.root, '[data-process]');
  if (!box) return;
  if (!state.files.length) {
    box.hidden = true;
    box.innerHTML = '';
    if (processButton && state.kind !== 'url-cleaner') processButton.disabled = true;
    return;
  }
  box.hidden = false;
  box.innerHTML = '';
  state.files.forEach((file, index) => {
    const row = document.createElement('div');
    row.className = 'file-row';
    const label = document.createElement('div');
    label.innerHTML = `<strong>${escapeHtml(file.name)}</strong><br><span>${formatBytes(file.size)}${file.type ? ` · ${escapeHtml(file.type)}` : ''}</span>`;
    row.append(label);
    if (state.kind === 'merge-pdf') {
      const actions = document.createElement('div');
      actions.className = 'file-actions';
      const up = document.createElement('button');
      up.type = 'button';
      up.textContent = 'Up';
      up.disabled = index === 0;
      up.addEventListener('click', () => {
        const next = [...state.files];
        [next[index - 1], next[index]] = [next[index], next[index - 1]];
        state.files = next;
        renderSelectedFiles(state);
      });
      const down = document.createElement('button');
      down.type = 'button';
      down.textContent = 'Down';
      down.disabled = index === state.files.length - 1;
      down.addEventListener('click', () => {
        const next = [...state.files];
        [next[index + 1], next[index]] = [next[index], next[index + 1]];
        state.files = next;
        renderSelectedFiles(state);
      });
      actions.append(up, down);
      row.append(actions);
    }
    box.append(row);
  });
  if (processButton) processButton.disabled = false;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char] ?? char));
}

async function loadImageDimensions(state: RuntimeState): Promise<void> {
  const file = state.files[0];
  if (!file) return;
  const settings = q<HTMLElement>(state.root, '[data-settings]');
  if (settings) settings.hidden = false;
  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
    state.imageDimensions = { width: bitmap.width, height: bitmap.height };
    const width = q<HTMLInputElement>(state.root, '[data-width]');
    const height = q<HTMLInputElement>(state.root, '[data-height]');
    if (width && height) {
      width.value = String(bitmap.width);
      height.value = String(bitmap.height);
      wireAspectRatio(state, bitmap.width, bitmap.height);
    }
    bitmap.close?.();
  } catch {
    // Processing will show a more specific error if decode fails later.
  }
}

function wireAspectRatio(state: RuntimeState, originalW: number, originalH: number): void {
  const width = q<HTMLInputElement>(state.root, '[data-width]');
  const height = q<HTMLInputElement>(state.root, '[data-height]');
  const lock = q<HTMLInputElement>(state.root, '[data-lock-aspect]');
  if (!width || !height || !lock) return;
  const ratio = originalW / originalH;
  width.oninput = () => {
    if (lock.checked && width.value) height.value = String(Math.max(1, Math.round(Number(width.value) / ratio)));
  };
  height.oninput = () => {
    if (lock.checked && height.value) width.value = String(Math.max(1, Math.round(Number(height.value) * ratio)));
  };
}

async function loadPdfPageCount(state: RuntimeState): Promise<void> {
  const file = state.files[0];
  const settings = q<HTMLElement>(state.root, '[data-settings]');
  const pageCountEl = q<HTMLElement>(state.root, '[data-page-count]');
  if (settings) settings.hidden = false;
  if (!file || !pageCountEl) return;
  const worker = makePdfWorker();
  try {
    showProgress(state.root, 'Reading PDF page count locally...', 20);
    const buffer = await file.arrayBuffer();
    const response = await request(worker, { action: 'pageCount', buffer }, [buffer]);
    if (!response.ok) throw new Error(String(response.error ?? 'Could not read PDF page count.'));
    state.pageCount = Number(response.pageCount);
    pageCountEl.textContent = `This PDF has ${state.pageCount} pages. Use ranges like 1-3, 5, 8-10.`;
    hideProgress(state.root);
  } catch (error) {
    showError(state.root, error instanceof Error ? error.message : 'Could not read PDF page count.');
  } finally {
    worker.terminate();
  }
}


function fieldMatchesPrivacyMode(field: MetadataField, mode: 'all' | 'gps'): boolean {
  const haystack = `${field.group} ${field.key}`.toLowerCase();
  if (mode === 'gps') {
    return /gps|latitude|longitude|altitude|location|geotag|geolocation/.test(haystack);
  }
  return field.group === 'Location' ||
    field.group === 'Camera' ||
    field.group === 'Date' ||
    field.group === 'Software / Copyright' ||
    /gps|latitude|longitude|altitude|location|make|model|lens|camera|date|time|software|creator|artist|copyright|owner|author|xmp|iptc/.test(haystack);
}

function friendlyMetadataGroup(field: MetadataField, mode: 'all' | 'gps'): string {
  const haystack = `${field.group} ${field.key}`.toLowerCase();
  if (mode === 'gps' || /gps|latitude|longitude|altitude|location|geotag|geolocation/.test(haystack)) return 'GPS/location metadata';
  if (field.group === 'Camera' || /make|model|lens|camera|focal|iso|aperture|exposure/.test(haystack)) return 'camera/device details';
  if (field.group === 'Date' || /date|time|created|modified|offsettime/.test(haystack)) return 'date/time metadata';
  if (field.group === 'Software / Copyright' || /software|creator|artist|copyright|owner|author|xmp|iptc/.test(haystack)) return 'software/author/copyright metadata';
  return 'other supported privacy metadata';
}

function summarizeMetadataGroups(fields: MetadataField[], mode: 'all' | 'gps'): string {
  const groups = Array.from(new Set(
    fields
      .filter((field) => fieldMatchesPrivacyMode(field, mode))
      .map((field) => friendlyMetadataGroup(field, mode))
  ));
  if (!groups.length) {
    return mode === 'gps'
      ? 'No GPS/location metadata found.'
      : 'No supported EXIF/GPS privacy metadata found.';
  }
  return `${groups.length} group${groups.length === 1 ? '' : 's'} found: ${groups.join(', ')}.`;
}

function summarizeRemovedMetadata(beforeFields: MetadataField[], afterFields: MetadataField[], mode: 'all' | 'gps'): string {
  const beforeGroups = new Set(
    beforeFields
      .filter((field) => fieldMatchesPrivacyMode(field, mode))
      .map((field) => friendlyMetadataGroup(field, mode))
  );
  const afterGroups = new Set(
    afterFields
      .filter((field) => fieldMatchesPrivacyMode(field, mode))
      .map((field) => friendlyMetadataGroup(field, mode))
  );
  const removed = Array.from(beforeGroups).filter((group) => !afterGroups.has(group));
  if (!beforeGroups.size) return 'Nothing needed to be removed.';
  if (!removed.length) return 'No supported metadata groups could be confirmed as removed. Please review the output.';
  return `Removed: ${removed.join(', ')}.`;
}

function summarizeRemainingMetadata(afterFields: MetadataField[], mode: 'all' | 'gps'): string {
  const remaining = Array.from(new Set(
    afterFields
      .filter((field) => fieldMatchesPrivacyMode(field, mode))
      .map((field) => friendlyMetadataGroup(field, mode))
  ));
  if (!remaining.length) {
    return mode === 'gps'
      ? 'No supported GPS/location metadata detected after cleaning.'
      : 'No supported EXIF/GPS privacy metadata detected after cleaning.';
  }
  return `Review needed: still detected ${remaining.join(', ')}.`;
}

function renderMetadataTable(root: HTMLElement, fields: MetadataField[]): void {
  const summary = q<HTMLElement>(root, '[data-result-summary]');
  if (!summary) return;
  if (!fields.length) {
    summary.insertAdjacentHTML('beforeend', '<p>No supported metadata was detected.</p>');
    return;
  }
  const groups = new Map<string, MetadataField[]>();
  fields.forEach((field) => {
    if (!groups.has(field.group)) groups.set(field.group, []);
    groups.get(field.group)?.push(field);
  });
  for (const [group, groupFields] of groups) {
    const heading = document.createElement('h3');
    heading.textContent = group;
    const table = document.createElement('table');
    table.className = 'metadata-table';
    table.innerHTML = '<thead><tr><th>Field</th><th>Value</th></tr></thead>';
    const tbody = document.createElement('tbody');
    groupFields.forEach((field) => {
      const tr = document.createElement('tr');
      const key = document.createElement('td');
      key.textContent = field.key;
      const value = document.createElement('td');
      value.textContent = field.value;
      tr.append(key, value);
      tbody.append(tr);
    });
    table.append(tbody);
    summary.append(heading, table);
  }
}

async function handleUrlCleaner(state: RuntimeState): Promise<void> {
  clearError(state.root);
  clearResult(state.root);
  const input = q<HTMLTextAreaElement>(state.root, '[data-url-input]');
  try {
    showProgress(state.root, 'Finding tracking parameters...', 35);
    const result = cleanTrackingUrl(input?.value ?? '');
    showProgress(state.root, 'Clean URL ready.', 100);
    const actions = [copyButton(result.cleaned, 'Copy clean URL')];
    showResult(state.root, {
      'Original URL': input?.value.trim() ?? '',
      'Cleaned URL': result.cleaned,
      'Removed parameters': result.removed.length ? result.removed.join(', ') : 'None found',
      'Preserved parameters': result.preserved.length ? result.preserved.join(', ') : 'None'
    }, actions);
  } catch (error) {
    showError(state.root, error instanceof Error ? error.message : 'Enter a valid URL.');
  }
}

async function handleHash(state: RuntimeState): Promise<void> {
  const file = state.files[0];
  if (!file) return;
  const worker = makeHashWorker();
  try {
    showProgress(state.root, 'Reading file locally...', 20);
    const buffer = await file.arrayBuffer();
    showProgress(state.root, 'Calculating SHA-256 locally...', 65);
    const response = await request(worker, { action: 'sha256', buffer }, [buffer]);
    if (!response.ok) throw new Error(String(response.error ?? 'Hash calculation failed.'));
    const hash = String(response.hash);
    const expectedInput = q<HTMLInputElement>(state.root, '[data-expected-hash]');
    const expected = expectedInput?.value.trim().toLowerCase() ?? '';
    let comparison = 'No expected hash entered';
    if (expected) comparison = isSha256Hex(expected) ? (expected === hash ? 'Match' : 'Does not match') : 'Expected hash is not a valid SHA-256 hex value';
    showResult(state.root, {
      'File': file.name,
      'Size': formatBytes(file.size),
      'SHA-256': hash,
      'Verification': /^[a-f0-9]{64}$/.test(hash) ? '64 lowercase hex characters' : 'Unexpected hash format',
      'Compare': comparison
    }, [copyButton(hash, 'Copy hash')]);
  } catch (error) {
    showError(state.root, error instanceof Error ? error.message : 'Hash calculation failed.');
  } finally {
    worker.terminate();
  }
}

async function handleImage(state: RuntimeState): Promise<void> {
  const file = state.files[0];
  if (!file) return;
  const worker = makeImageWorker();
  try {
    const buffer = await file.arrayBuffer();
    if (state.kind === 'metadata-viewer') {
      showProgress(state.root, 'Scanning metadata locally...', 55);
      const response = await request(worker, { action: 'metadata', buffer, mime: file.type, name: file.name }, [buffer]);
      if (!response.ok) throw new Error(String(response.error ?? 'Metadata scan failed.'));
      showResult(state.root, {
        'File': file.name,
        'Detected privacy fields': Number(response.sensitiveCount ?? response.count ?? 0),
        'Detected technical fields': Number(response.technicalCount ?? 0),
        'GPS detected': response.gpsFound ? 'Yes' : 'No',
        'Accuracy note': 'No supported metadata detected is not a forensic guarantee.'
      });
      renderMetadataTable(state.root, (response.fields as MetadataField[]) ?? []);
      return;
    }

    if (state.kind === 'remove-exif' || state.kind === 'remove-gps') {
      showProgress(state.root, state.kind === 'remove-gps' ? 'Detecting GPS metadata...' : 'Scanning metadata...', 30);
      const response = await request(worker, { action: 'clean', mode: state.kind === 'remove-gps' ? 'gps' : 'all', buffer, mime: file.type, name: file.name }, [buffer]);
      if (!response.ok) throw new Error(String(response.error ?? 'Image cleaning failed.'));
      const bytes = response.bytes as ArrayBuffer;
      const outputType = String(response.outputType);
      const extension = String(response.extension || 'jpg');
      const blob = new Blob([bytes], { type: outputType });
      const link = createDownloadLink(blob, safeFilename(file.name, state.kind === 'remove-gps' ? 'gps-cleaned' : 'metadata-cleaned', extension));
      const mode = state.kind === 'remove-gps' ? 'gps' : 'all';
      const before = response.before as { count: number; gpsFound: boolean; sensitiveCount?: number; technicalCount?: number; fields?: MetadataField[] };
      const after = response.after as { count: number; gpsFound: boolean; sensitiveCount?: number; technicalCount?: number; fields?: MetadataField[] };
      const beforeFields = before?.fields ?? [];
      const afterFields = after?.fields ?? [];
      const beforeSensitive = mode === 'gps'
        ? beforeFields.filter((field) => fieldMatchesPrivacyMode(field, mode)).length
        : Number(before?.sensitiveCount ?? beforeFields.filter((field) => fieldMatchesPrivacyMode(field, mode)).length);
      const afterSensitive = mode === 'gps'
        ? afterFields.filter((field) => fieldMatchesPrivacyMode(field, mode)).length
        : Number(after?.sensitiveCount ?? afterFields.filter((field) => fieldMatchesPrivacyMode(field, mode)).length);
      const removedCount = Math.max(0, beforeSensitive - afterSensitive);
      const status = after?.gpsFound && mode === 'gps'
        ? 'Review needed - GPS metadata is still detected'
        : afterSensitive === 0
          ? 'Clean file ready'
          : 'Review needed - supported privacy metadata remains';

      showResult(state.root, {
        'Status': status,
        'Original file': file.name,
        'What was found': summarizeMetadataGroups(beforeFields, mode),
        'What was removed': summarizeRemovedMetadata(beforeFields, afterFields, mode),
        'After cleaning': summarizeRemainingMetadata(afterFields, mode),
        'GPS location': before?.gpsFound
          ? (after?.gpsFound ? 'Found before cleaning, still detected after cleaning.' : 'Found before cleaning and removed from supported metadata.')
          : 'No GPS/location metadata found.',
        'Removed field count': beforeSensitive === 0 ? '0 - no supported privacy metadata was present' : `${removedCount} of ${beforeSensitive} supported privacy fields`,
        'Output type': outputType
      }, [link]);
      return;
    }

    if (state.kind === 'resize-image') {
      const width = Number(q<HTMLInputElement>(state.root, '[data-width]')?.value);
      const height = Number(q<HTMLInputElement>(state.root, '[data-height]')?.value);
      const outputType = q<HTMLSelectElement>(state.root, '[data-output-format]')?.value ?? 'same';
      const quality = Number(q<HTMLInputElement>(state.root, '[data-quality]')?.value ?? 0.92);
      if (!Number.isFinite(width) || !Number.isFinite(height) || width < 1 || height < 1) throw new Error('Enter valid output width and height.');
      showProgress(state.root, 'Resizing image locally...', 55);
      const response = await request(worker, { action: 'resize', buffer, mime: file.type, name: file.name, width, height, outputType, quality }, [buffer]);
      if (!response.ok) throw new Error(String(response.error ?? 'Image resize failed.'));
      const bytes = response.bytes as ArrayBuffer;
      const type = String(response.outputType);
      const extension = String(response.extension || 'png');
      const blob = new Blob([bytes], { type });
      const link = createDownloadLink(blob, safeFilename(file.name, 'resized', extension));
      showResult(state.root, {
        'Original file': file.name,
        'Output type': type,
        'Output dimensions': `${response.width} x ${response.height}px`,
        'Verification': Number(response.width) === width && Number(response.height) === height ? 'Dimensions verified' : 'Review dimensions'
      }, [link]);
      return;
    }

    if (state.kind === 'convert-image') {
      const outputType = q<HTMLSelectElement>(state.root, '[data-output-format]')?.value ?? 'image/jpeg';
      const quality = Number(q<HTMLInputElement>(state.root, '[data-quality]')?.value ?? 0.92);
      showProgress(state.root, 'Converting image locally...', 55);
      const response = await request(worker, { action: 'convert', buffer, mime: file.type, name: file.name, outputType, quality }, [buffer]);
      if (!response.ok) throw new Error(String(response.error ?? 'Image conversion failed.'));
      const bytes = response.bytes as ArrayBuffer;
      const type = String(response.outputType);
      const extension = String(response.extension || 'png');
      const blob = new Blob([bytes], { type });
      const link = createDownloadLink(blob, safeFilename(file.name, 'converted', extension));
      showResult(state.root, {
        'Original file': file.name,
        'Output type': type,
        'Output dimensions': `${response.width} x ${response.height}px`,
        'Verification': type === outputType ? 'Output MIME verified' : 'Browser changed output type'
      }, [link]);
      return;
    }
  } catch (error) {
    showError(state.root, error instanceof Error ? error.message : 'Image tool failed.');
  } finally {
    worker.terminate();
  }
}

async function handlePdf(state: RuntimeState): Promise<void> {
  const worker = makePdfWorker();
  try {
    if (state.kind === 'merge-pdf') {
      showProgress(state.root, 'Reading PDFs locally...', 25);
      const buffers = await Promise.all(state.files.map((file) => file.arrayBuffer()));
      showProgress(state.root, 'Building merged PDF...', 70);
      const response = await request(worker, { action: 'merge', buffers }, buffers);
      if (!response.ok) throw new Error(String(response.error ?? 'PDF merge failed.'));
      const bytes = response.bytes as ArrayBuffer;
      const blob = new Blob([bytes], { type: 'application/pdf' });
      const link = createDownloadLink(blob, 'merged-pdf-privacy-toolbox.pdf');
      showResult(state.root, {
        'Input files': state.files.length,
        'Output pages': Number(response.pageCount),
        'Verification': 'Page count verified',
        'Privacy': 'Merged locally in your browser'
      }, [link]);
      return;
    }

    const file = state.files[0];
    if (!file) throw new Error('Choose a PDF first.');

    if (state.kind === 'remove-pdf-metadata' || state.kind === 'remove-pdf-hidden-data') {
      showProgress(state.root, 'Cleaning common PDF metadata locally...', 60);
      const buffer = await file.arrayBuffer();
      const response = await request(worker, { action: 'cleanMetadata', buffer }, [buffer]);
      if (!response.ok) throw new Error(String(response.error ?? 'PDF metadata cleanup failed.'));
      const bytes = response.bytes as ArrayBuffer;
      const blob = new Blob([bytes], { type: 'application/pdf' });
      const suffix = state.kind === 'remove-pdf-metadata' ? 'metadata-cleaned' : 'hidden-data-cleaned';
      const link = createDownloadLink(blob, safeFilename(file.name, suffix, 'pdf'));
      const detectedFields = Array.isArray(response.detectedFields) ? response.detectedFields.map(String) : [];
      showResult(state.root, {
        'File': file.name,
        'Detected metadata fields': detectedFields.length ? detectedFields.join(', ') : 'None reported by this parser',
        'Output size': formatBytes(blob.size),
        'Verification': 'Open the cleaned PDF and review before sharing',
        'Privacy': 'Processed locally in your browser'
      }, [link]);
      return;
    }

    const pageCount = state.pageCount;
    if (!pageCount) throw new Error('Page count is not ready yet. Choose the PDF again or wait for the page count to load.');
    const input = q<HTMLInputElement>(state.root, '[data-page-ranges]')?.value ?? '';
    const indices = parsePageRanges(input, pageCount, { allowDuplicates: state.kind === 'split-pdf' });
    const buffer = await file.arrayBuffer();

    if (state.kind === 'split-pdf') {
      showProgress(state.root, 'Exporting selected pages locally...', 70);
      const response = await request(worker, { action: 'split', buffer, indices }, [buffer]);
      if (!response.ok) throw new Error(String(response.error ?? 'PDF split failed.'));
      const bytes = response.bytes as ArrayBuffer;
      const blob = new Blob([bytes], { type: 'application/pdf' });
      const link = createDownloadLink(blob, safeFilename(file.name, 'split', 'pdf'));
      showResult(state.root, {
        'Original pages': pageCount,
        'Selected pages': summarizeRanges(indices),
        'Output pages': Number(response.pageCount),
        'Verification': Number(response.pageCount) === indices.length ? 'Page count verified' : 'Review output'
      }, [link]);
      return;
    }

    if (state.kind === 'remove-pdf-pages') {
      showProgress(state.root, 'Removing selected pages locally...', 70);
      const response = await request(worker, { action: 'removePages', buffer, removeIndices: indices }, [buffer]);
      if (!response.ok) throw new Error(String(response.error ?? 'PDF page removal failed.'));
      const bytes = response.bytes as ArrayBuffer;
      const blob = new Blob([bytes], { type: 'application/pdf' });
      const link = createDownloadLink(blob, safeFilename(file.name, 'pages-removed', 'pdf'));
      showResult(state.root, {
        'Original pages': pageCount,
        'Removed pages': summarizeRanges(indices),
        'Output pages': Number(response.pageCount),
        'Verification': Number(response.pageCount) === pageCount - new Set(indices).size ? 'Page count verified' : 'Review output'
      }, [link]);
    }
  } catch (error) {
    showError(state.root, error instanceof Error ? error.message : 'PDF tool failed.');
  } finally {
    worker.terminate();
  }
}

async function process(state: RuntimeState): Promise<void> {
  clearError(state.root);
  clearResult(state.root);
  const validation = validateFiles(state.kind, state.files);
  if (validation) {
    showError(state.root, validation);
    return;
  }
  showProgress(state.root, 'Processing locally... keep this tab open.', 10);
  if (state.kind === 'url-cleaner') return handleUrlCleaner(state);
  if (state.kind === 'sha256') return handleHash(state);
  if (state.kind?.includes('pdf')) return handlePdf(state);
  return handleImage(state);
}

function wireFileSelection(state: RuntimeState): void {
  const input = q<HTMLInputElement>(state.root, '[data-file-input]');
  const dropzone = q<HTMLElement>(state.root, '[data-dropzone]');
  if (!input) return;
  const applyFiles = async (fileList: FileList | File[]) => {
    clearError(state.root);
    clearResult(state.root);
    state.files = Array.from(fileList);
    const validation = validateFiles(state.kind, state.files);
    renderSelectedFiles(state);
    if (validation) {
      showError(state.root, validation);
      return;
    }
    const settings = q<HTMLElement>(state.root, '[data-settings]');
    if (settings && !['resize-image', 'convert-image', 'split-pdf', 'remove-pdf-pages', 'sha256'].includes(String(state.kind))) settings.hidden = true;
    if (state.kind === 'resize-image' || state.kind === 'convert-image') await loadImageDimensions(state);
    if (state.kind === 'split-pdf' || state.kind === 'remove-pdf-pages') await loadPdfPageCount(state);
    if (state.kind === 'sha256' && settings) settings.hidden = false;
  };
  input.addEventListener('change', () => {
    if (input.files) void applyFiles(input.files);
  });
  if (dropzone) {
    dropzone.addEventListener('dragover', (event) => {
      event.preventDefault();
      dropzone.classList.add('dragover');
    });
    dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
    dropzone.addEventListener('drop', (event) => {
      event.preventDefault();
      dropzone.classList.remove('dragover');
      if (event.dataTransfer?.files) void applyFiles(event.dataTransfer.files);
    });
  }
}

function initRoot(root: HTMLElement): void {
  if (root.dataset.initialized === 'true') return;
  root.dataset.initialized = 'true';
  const state: RuntimeState = {
    root,
    kind: root.dataset.toolKind,
    files: [],
    initialized: true
  };
  wireFileSelection(state);
  const button = q<HTMLButtonElement>(root, '[data-process]');
  button?.addEventListener('click', () => void process(state));
}

export function initToolRuntime(): void {
  if (initializedOnce) return;
  initializedOnce = true;
  document.querySelectorAll<HTMLElement>('[data-tool-root]').forEach(initRoot);
  window.addEventListener('pagehide', () => revokeDownloadLinks(document));
}
