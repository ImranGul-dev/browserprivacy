export function createDownloadLink(blob: Blob, filename: string): HTMLAnchorElement {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.dataset.objectUrl = url;
  link.className = 'button primary';
  link.textContent = 'Download file';
  link.addEventListener('click', () => {
    window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
  }, { once: true });
  return link;
}

export function revokeDownloadLinks(root: ParentNode): void {
  root.querySelectorAll<HTMLAnchorElement>('a[data-object-url]').forEach((link) => {
    const url = link.dataset.objectUrl;
    if (url) URL.revokeObjectURL(url);
    delete link.dataset.objectUrl;
  });
}

export function safeFilename(name: string, suffix: string, extension?: string): string {
  const clean = name.replace(/\.[^.]+$/, '').replace(/[^a-z0-9._-]+/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'privacy-toolbox-output';
  const ext = extension ? extension.replace(/^\./, '') : (name.split('.').pop() || 'bin');
  return `${clean}-${suffix}.${ext}`;
}
