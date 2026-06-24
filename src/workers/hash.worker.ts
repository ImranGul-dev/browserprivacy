type RequestMessage = {
  id: string;
  action: 'sha256';
  buffer: ArrayBuffer;
};

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer)).map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

self.addEventListener('message', async (event: MessageEvent<RequestMessage>) => {
  const { id, action, buffer } = event.data;
  try {
    if (action !== 'sha256') throw new Error('Unsupported hash worker action.');
    const digest = await crypto.subtle.digest('SHA-256', buffer);
    self.postMessage({ id, ok: true, hash: toHex(digest) });
  } catch (error) {
    self.postMessage({ id, ok: false, error: error instanceof Error ? error.message : 'Hashing failed.' });
  }
});
