(function () {
  if (window.__privacyToolboxLoaded) return;
  window.__privacyToolboxLoaded = true;

  const patterns = [
    { key: 'Email', placeholder: '[EMAIL]', regex: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi },
    { key: 'JWT', placeholder: '[JWT]', regex: /\beyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\b/g },
    { key: 'Bearer token', placeholder: 'Bearer [SECRET]', regex: /Bearer\s+[A-Za-z0-9._~+\/-]+=*/gi },
    { key: 'API key assignment', placeholder: '$1[SECRET]', regex: /\b((?:api[_-]?key|secret|token|password|passwd|access[_-]?token|refresh[_-]?token|client[_-]?secret|database_url|db_url)\s*[:=]\s*)([^\s,;"']+)/gi },
    { key: 'AWS-like key', placeholder: '[SECRET]', regex: /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/g },
    { key: 'Database URL', placeholder: '[SECRET]', regex: /\b(?:postgres|postgresql|mysql|mongodb|redis):\/\/[^\s)]+/gi },
    { key: 'IP address', placeholder: '[IP]', regex: /\b(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)\b/g },
    { key: 'Phone', placeholder: '[PHONE]', regex: /(?<!\w)(?:\+?\d{1,3}[\s.-]?)?(?:\(?\d{2,4}\)?[\s.-]?)?\d{3,4}[\s.-]?\d{3,4}(?!\w)/g },
    { key: 'URL', placeholder: '[URL]', regex: /\bhttps?:\/\/[^\s<>"]+/gi },
    { key: 'File path', placeholder: '[PATH]', regex: /(?:[A-Za-z]:\\|\/)(?:[\w .-]+[\\/])+[\w .-]+/g },
    { key: 'Amount', placeholder: '[AMOUNT]', regex: /(?:USD|EUR|GBP|PKR|AUD|CAD|\$|£|€)\s?\d[\d,]*(?:\.\d{2})?/gi },
    { key: 'Date', placeholder: '[DATE]', regex: /\b(?:\d{1,2}[\/.-]\d{1,2}[\/.-]\d{2,4}|\d{4}[\/.-]\d{1,2}[\/.-]\d{1,2})\b/g },
    { key: 'ID', placeholder: '[ID]', regex: /\b(?:ACC|CUST|ORD|INV|TKT|CASE|USER|PROJ|ID)[-_#:]?\d{3,}\b/gi },
    { key: 'Possible name', placeholder: '[PERSON]', regex: /\b(?:Mr\.|Mrs\.|Ms\.|Dr\.)?\s?([A-Z][a-z]{2,}\s+[A-Z][a-z]{2,})(?!\w)/g }
  ];

  const modePatternKeys = {
    'email-remover': ['Email'],
    'phone-redactor': ['Phone'],
    'developer-redactor': ['JWT', 'Bearer token', 'API key assignment', 'AWS-like key', 'Database URL', 'IP address', 'Email', 'URL', 'File path', 'ID'],
    'text-redactor': ['Email', 'Phone', 'JWT', 'Bearer token', 'API key assignment', 'IP address', 'URL', 'Amount', 'Date', 'ID', 'Possible name'],
    'csv-anonymizer': ['Email', 'Phone', 'IP address', 'URL', 'ID', 'Possible name'],
    'csv-scanner': ['Email', 'Phone', 'IP address', 'URL', 'ID', 'Possible name'],
    'json-redactor': ['Email', 'Phone', 'JWT', 'Bearer token', 'API key assignment', 'IP address', 'URL', 'ID', 'Possible name'],
    'json-key-masker': ['Email', 'Phone', 'JWT', 'Bearer token', 'API key assignment', 'IP address', 'URL', 'ID', 'Possible name']
  };

  const knownTrackingParams = new Set([
    'utm_source','utm_medium','utm_campaign','utm_term','utm_content','utm_id','utm_name',
    'fbclid','gclid','gbraid','wbraid','msclkid','mc_cid','mc_eid','yclid','dclid','igshid',
    'vero_id','_hsenc','_hsmi','mkt_tok','spm'
  ]);

  const reviewOnlyParams = new Set([
    'ref','referrer','source','email','email_id','user','userid','user_id','session','sid'
  ]);

  const stableSecretKeys = new Set(['JWT', 'Bearer token', 'API key assignment', 'AWS-like key', 'Database URL']);
  const sampleJwt = 'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyLTEyMyIsImVtYWlsIjoiYWxpY2VAZXhhbXBsZS5jb20iLCJyb2xlIjoiZWRpdG9yIiwiZXhwIjoyMDAwMDAwMDAwfQ.';

  function escapeHtml(value) {
    return String(value).replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char]));
  }

  function createReplacementState() {
    return { values: new Map(), counters: {} };
  }

  function placeholderLabel(pattern) {
    return pattern.placeholder
      .replace(/\$1/g, '')
      .replace(/[^A-Z]+/g, '') || pattern.key.toUpperCase().replace(/[^A-Z0-9]+/g, '_');
  }

  function replacementFor(pattern, match, args, options) {
    if (pattern.placeholder.includes('$1')) return pattern.placeholder.replace('$1', args[0] || '');
    if (!options.stable || stableSecretKeys.has(pattern.key)) return pattern.placeholder;

    const normalized = String(match).trim().toLowerCase();
    const mapKey = `${pattern.key}:${normalized}`;
    if (options.state.values.has(mapKey)) return options.state.values.get(mapKey);

    const label = placeholderLabel(pattern);
    options.state.counters[label] = (options.state.counters[label] || 0) + 1;
    const replacement = `[${label}_${options.state.counters[label]}]`;
    options.state.values.set(mapKey, replacement);
    return replacement;
  }

  function redactText(input, mode, options = {}) {
    const defaultKeys = modePatternKeys[mode] || modePatternKeys['text-redactor'];
    const keys = Array.isArray(options.enabledKeys) ? options.enabledKeys : defaultKeys;
    const active = patterns.filter((pattern) => keys.includes(pattern.key));
    const counts = {};
    const state = options.state || createReplacementState();
    let output = input;

    for (const pattern of active) {
      output = output.replace(pattern.regex, function (match) {
        const args = Array.prototype.slice.call(arguments, 1);
        counts[pattern.key] = (counts[pattern.key] || 0) + 1;
        return replacementFor(pattern, match, args, { ...options, state });
      });
    }
    return { output, counts, state };
  }

  function renderStats(container, counts) {
    if (!container) return;
    const entries = Object.entries(counts).filter(([, count]) => count > 0);
    if (!entries.length) {
      container.innerHTML = '<div class="mini"><strong>0</strong><span>matches found</span></div>';
      return;
    }
    container.innerHTML = entries.slice(0, 9).map(([label, count]) => `<div class="mini"><strong>${count}</strong><span>${escapeHtml(label)}</span></div>`).join('');
  }

  function downloadText(filename, text, type) {
    const blob = new Blob([text], { type: type || 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }

  function mergeCounts(a, b) {
    const merged = { ...a };
    for (const [key, value] of Object.entries(b || {})) merged[key] = (merged[key] || 0) + value;
    return merged;
  }

  function maskByKey(obj, keys, counts, options) {
    if (Array.isArray(obj)) return obj.map((item) => maskByKey(item, keys, counts, options));
    if (obj && typeof obj === 'object') {
      const clone = {};
      for (const [key, value] of Object.entries(obj)) {
        const lower = key.toLowerCase();
        if (keys.some((maskKey) => lower === maskKey || lower.includes(maskKey))) {
          counts['Selected JSON keys'] = (counts['Selected JSON keys'] || 0) + 1;
          clone[key] = '[REDACTED]';
        } else {
          clone[key] = maskByKey(value, keys, counts, options);
        }
      }
      return clone;
    }
    if (typeof obj === 'string') {
      const result = redactText(obj, 'json-redactor', options);
      Object.assign(counts, mergeCounts(counts, result.counts));
      return result.output;
    }
    return obj;
  }

  function processJson(input, keyString, options = {}) {
    const keys = keyString
      ? keyString.split(',').map((item) => item.trim().toLowerCase()).filter(Boolean)
      : ['email','phone','name','address','token','secret','password','api_key','access_token','refresh_token','user_id','customer_id','account_id'];
    const counts = {};
    try {
      const parsed = JSON.parse(input);
      const masked = maskByKey(parsed, keys, counts, options);
      return { output: JSON.stringify(masked, null, 2), counts, ok: true };
    } catch (error) {
      const fallback = redactText(input, 'json-redactor', options);
      return { output: fallback.output, counts: fallback.counts, ok: false };
    }
  }

  function parseCsvRows(input) {
    const rows = [];
    let row = [];
    let value = '';
    let inQuotes = false;
    for (let i = 0; i < input.length; i++) {
      const char = input[i];
      const next = input[i + 1];
      if (char === '"' && inQuotes && next === '"') { value += '"'; i++; continue; }
      if (char === '"') { inQuotes = !inQuotes; continue; }
      if (char === ',' && !inQuotes) { row.push(value); value = ''; continue; }
      if ((char === '\n' || char === '\r') && !inQuotes) {
        if (char === '\r' && next === '\n') i++;
        row.push(value); rows.push(row); row = []; value = ''; continue;
      }
      value += char;
    }
    if (value || row.length) { row.push(value); rows.push(row); }
    return rows.filter((r) => r.some((cell) => cell.trim() !== ''));
  }

  function csvEscape(value) {
    const string = String(value ?? '');
    if (/[",\n\r]/.test(string)) return `"${string.replace(/"/g, '""')}"`;
    return string;
  }

  function processCsv(input, mode, options = {}) {
    const rows = parseCsvRows(input);
    if (!rows.length) return { output: '', counts: {}, summary: 'No CSV rows found.' };
    const header = rows[0];
    const counts = {};
    const columnHits = header.map((name, index) => {
      let hitCount = 0;
      for (const row of rows.slice(1, 101)) {
        const result = redactText(row[index] || '', 'csv-anonymizer');
        hitCount += Object.values(result.counts).reduce((sum, count) => sum + count, 0);
      }
      return { name: name || `Column ${index + 1}`, hitCount };
    });
    if (mode === 'csv-scanner') {
      const summary = columnHits.map((item) => `${item.name}: ${item.hitCount} possible sensitive value${item.hitCount === 1 ? '' : 's'}`).join('\n');
      return { output: summary, counts: Object.fromEntries(columnHits.filter((c) => c.hitCount).map((c) => [c.name, c.hitCount])) };
    }

    const state = options.state || createReplacementState();
    const cleanedRows = rows.map((row) => row.map((cell) => {
      const result = redactText(cell, 'csv-anonymizer', { ...options, state });
      Object.assign(counts, mergeCounts(counts, result.counts));
      return result.output;
    }));
    const output = cleanedRows.map((row) => row.map(csvEscape).join(',')).join('\n');
    return { output, counts };
  }

  function cleanUrls(input, mode, removeFragment) {
    const urlRegex = /https?:\/\/[^\s<>"]+/gi;
    let removed = 0;
    let processed = 0;
    let fragmentsRemoved = 0;
    const removedNames = new Set();
    const keptNames = new Set();

    const output = input.replace(urlRegex, (match) => {
      processed++;
      try {
        const url = new URL(match);
        for (const key of [...url.searchParams.keys()]) {
          const lower = key.toLowerCase();
          const shouldRemove = lower.startsWith('utm_') || knownTrackingParams.has(lower) || (mode === 'review' && reviewOnlyParams.has(lower));
          if (shouldRemove) {
            url.searchParams.delete(key);
            removed++;
            removedNames.add(key);
          } else {
            keptNames.add(key);
          }
        }
        if (removeFragment && url.hash) {
          url.hash = '';
          fragmentsRemoved++;
        }
        return url.toString();
      } catch (error) {
        return match;
      }
    });

    const removedLabel = removedNames.size ? [...removedNames].sort().join(', ') : 'none';
    const keptLabel = keptNames.size ? [...keptNames].sort().join(', ') : 'none';
    return {
      output,
      counts: {
        'URLs processed': processed,
        'Parameters removed': removed,
        'Fragments removed': fragmentsRemoved
      },
      report: `Removed parameter names: ${removedLabel}. Preserved parameter names: ${keptLabel}. ${removeFragment ? 'Fragments were removed when present.' : 'Fragments were preserved.'}`
    };
  }

  function base64UrlDecode(value) {
    const safe = value.replace(/-/g, '+').replace(/_/g, '/');
    const padded = safe + '='.repeat((4 - safe.length % 4) % 4);
    const binary = atob(padded);
    return decodeURIComponent([...binary].map((char) => '%' + char.charCodeAt(0).toString(16).padStart(2, '0')).join(''));
  }

  function checkJwt(input) {
    const token = input.trim();
    const parts = token.split('.');
    if (parts.length < 2) throw new Error('A JWT should have at least header and payload sections separated by dots.');
    const header = JSON.parse(base64UrlDecode(parts[0]));
    const payload = JSON.parse(base64UrlDecode(parts[1]));
    const sensitiveKeys = ['email','name','phone','address','user','user_id','sub','role','roles','permissions','account','tenant','org','customer','patient'];
    const found = [];
    for (const key of Object.keys(payload)) {
      const lower = key.toLowerCase();
      if (sensitiveKeys.some((sensitive) => lower.includes(sensitive))) found.push(key);
    }
    const decoded = {
      header,
      payload,
      privacyReview: found.length ? `Sensitive-looking claims found: ${found.join(', ')}` : 'No obvious sensitive claim names found. Review the payload manually.'
    };
    return { output: JSON.stringify(decoded, null, 2), counts: { 'Sensitive claims': found.length, 'Payload keys': Object.keys(payload).length } };
  }

  function initTextTool(root) {
    const mode = root.dataset.mode;
    const input = root.querySelector('#tool-input');
    const output = root.querySelector('[data-output]');
    const stats = root.querySelector('[data-stats]');
    const run = root.querySelector('[data-run-tool]');
    const fileInput = root.querySelector('[data-file-input]');
    const copy = root.querySelector('[data-copy-output]');
    const download = root.querySelector('[data-download-output]');
    const clear = root.querySelector('[data-clear-tool]');
    const maskKeys = root.querySelector('[data-mask-keys]');
    const stablePlaceholders = root.querySelector('[data-stable-placeholders]');
    const loadSample = root.querySelector('[data-load-sample]');
    const loadJwtSample = root.querySelector('[data-load-jwt-sample]');
    const urlMode = root.querySelector('[data-url-clean-mode]');
    const removeFragment = root.querySelector('[data-remove-fragment]');
    const urlReport = root.querySelector('[data-url-report]');
    const patternInputs = [...root.querySelectorAll('[data-pattern-key]')];
    if (!input || !output || !run) return;

    function enabledPatternKeys() {
      if (!patternInputs.length) return null;
      return patternInputs.filter((control) => control.checked).map((control) => control.value);
    }

    loadSample?.addEventListener('click', () => {
      input.value = root.dataset.sample || '';
      input.focus();
    });

    loadJwtSample?.addEventListener('click', () => {
      input.value = sampleJwt;
      input.focus();
    });

    fileInput?.addEventListener('change', async () => {
      const file = fileInput.files && fileInput.files[0];
      if (!file) return;
      if (file.size > 5 * 1024 * 1024) {
        output.textContent = 'This file is large and may slow down your browser. Try a smaller export or paste the needed section.';
        return;
      }
      input.value = await file.text();
    });

    run.addEventListener('click', () => {
      const text = input.value || '';
      if (!text.trim()) {
        output.textContent = 'Paste content first, then run the tool.';
        renderStats(stats, {});
        return;
      }
      try {
        const options = {
          stable: stablePlaceholders ? stablePlaceholders.checked : false,
          state: createReplacementState(),
          enabledKeys: enabledPatternKeys()
        };
        let result;
        if (mode === 'json-redactor' || mode === 'json-key-masker') result = processJson(text, maskKeys?.value || '', options);
        else if (mode === 'csv-scanner' || mode === 'csv-anonymizer') result = processCsv(text, mode, options);
        else if (mode === 'url-cleaner') result = cleanUrls(text, urlMode?.value || 'safe', Boolean(removeFragment?.checked));
        else if (mode === 'jwt-checker') result = checkJwt(text);
        else result = redactText(text, mode, options);
        output.textContent = result.output || 'No output generated.';
        renderStats(stats, result.counts || {});
        if (urlReport && result.report) urlReport.textContent = result.report;
      } catch (error) {
        output.textContent = error.message || 'The input could not be processed. Check the format and try again.';
        renderStats(stats, {});
      }
    });

    copy?.addEventListener('click', async () => {
      const originalLabel = copy.dataset.originalLabel || copy.textContent || 'Copy';
      copy.dataset.originalLabel = originalLabel;
      await navigator.clipboard.writeText(output.textContent || '');
      copy.textContent = 'Copied';
      setTimeout(() => (copy.textContent = originalLabel), 1400);
    });
    download?.addEventListener('click', () => downloadText('privacy-toolbox-cleaned.txt', output.textContent || '', 'text/plain'));
    clear?.addEventListener('click', () => {
      input.value = '';
      output.textContent = mode === 'jwt-checker' ? 'Decoded JWT details will appear here.' : mode === 'url-cleaner' ? 'Cleaned URLs will appear here.' : 'Results will appear here after scanning.';
      if (fileInput) fileInput.value = '';
      if (urlReport) urlReport.textContent = 'Run the cleaner to see which parameter names were removed and which were preserved.';
      renderStats(stats, {});
    });
  }

  function initImageTool(root) {
    const input = root.querySelector('#image-file');
    const canvas = root.querySelector('#redaction-canvas');
    const status = root.querySelector('[data-image-status]');
    if (!input || !canvas) return;
    const ctx = canvas.getContext('2d');
    let sourceImage = null;
    let sourceUrl = '';
    let boxes = [];
    let start = null;

    function setStatus(message, type) {
      if (!status) return;
      status.textContent = message;
      status.className = `alert${type ? ` ${type}` : ''}`;
    }

    function redraw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (sourceImage) ctx.drawImage(sourceImage, 0, 0, canvas.width, canvas.height);
      const style = root.querySelector('#redaction-style')?.value || 'solid';
      for (const box of boxes) {
        if (style === 'blur' && sourceImage) {
          ctx.save();
          ctx.filter = 'blur(12px)';
          ctx.drawImage(sourceImage, box.x, box.y, box.w, box.h, box.x, box.y, box.w, box.h);
          ctx.restore();
          ctx.fillStyle = 'rgba(15, 38, 47, .18)';
          ctx.fillRect(box.x, box.y, box.w, box.h);
        } else {
          ctx.fillStyle = '#10262f';
          ctx.fillRect(box.x, box.y, box.w, box.h);
        }
      }
    }

    function getPoint(event) {
      const rect = canvas.getBoundingClientRect();
      return {
        x: (event.clientX - rect.left) * (canvas.width / rect.width),
        y: (event.clientY - rect.top) * (canvas.height / rect.height)
      };
    }

    input.addEventListener('change', () => {
      const file = input.files && input.files[0];
      if (!file) return;
      const img = new Image();
      if (sourceUrl) URL.revokeObjectURL(sourceUrl);
      sourceUrl = URL.createObjectURL(file);
      img.onload = () => {
        const pixels = img.naturalWidth * img.naturalHeight;
        if (pixels > 40 * 1000 * 1000) {
          setStatus('This image exceeds 40 megapixels. Use a smaller copy to avoid browser memory problems.', 'danger');
          URL.revokeObjectURL(sourceUrl);
          sourceUrl = '';
          sourceImage = null;
          return;
        }
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        sourceImage = img;
        boxes = [];
        redraw();
        setStatus(`Ready. Export will preserve ${img.naturalWidth} × ${img.naturalHeight} pixels.`, 'ok');
        if (sourceUrl) { URL.revokeObjectURL(sourceUrl); sourceUrl = ''; }
      };
      img.onerror = () => setStatus('The browser could not open this image.', 'danger');
      img.src = sourceUrl;
    });

    canvas.addEventListener('pointerdown', (event) => {
      if (!sourceImage) return;
      start = getPoint(event);
      canvas.setPointerCapture?.(event.pointerId);
    });
    canvas.addEventListener('pointerup', (event) => {
      if (!start || !sourceImage) return;
      const end = getPoint(event);
      const box = {
        x: Math.min(start.x, end.x),
        y: Math.min(start.y, end.y),
        w: Math.abs(end.x - start.x),
        h: Math.abs(end.y - start.y)
      };
      if (box.w > 6 && box.h > 6) boxes.push(box);
      start = null;
      redraw();
      setStatus(`${boxes.length} redaction box${boxes.length === 1 ? '' : 'es'} applied. Review the full image before downloading.`, 'ok');
    });
    root.querySelector('#redaction-style')?.addEventListener('change', redraw);
    root.querySelector('[data-undo-box]')?.addEventListener('click', () => {
      boxes.pop();
      redraw();
      setStatus(`${boxes.length} redaction box${boxes.length === 1 ? '' : 'es'} remaining.`);
    });
    root.querySelector('[data-clear-boxes]')?.addEventListener('click', () => {
      boxes = [];
      redraw();
      setStatus('All redaction boxes cleared.');
    });
    root.querySelector('[data-download-image]')?.addEventListener('click', () => {
      if (!sourceImage) {
        setStatus('Choose an image before downloading.', 'danger');
        return;
      }
      redraw();
      canvas.toBlob((blob) => {
        if (!blob) {
          setStatus('The browser could not export the redacted image.', 'danger');
          return;
        }
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'privacy-toolbox-redacted.png';
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        setStatus('Redacted PNG created. Open the downloaded file and inspect it at full size before sharing.', 'ok');
      }, 'image/png');
    });
  }

  function initAll() {
    document.querySelectorAll('[data-tool]').forEach((root) => {
      if (root.dataset.ready) return;
      root.dataset.ready = 'true';
      const mode = root.dataset.mode;
      if (mode === 'image-redactor') initImageTool(root);
      else initTextTool(root);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initAll);
  else initAll();
})();
