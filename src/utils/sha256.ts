export async function sha256Hex(input: ArrayBuffer | Uint8Array | string): Promise<string> {
  const data = typeof input === 'string'
    ? new TextEncoder().encode(input)
    : input instanceof Uint8Array
      ? input
      : new Uint8Array(input);
  const digest = await globalThis.crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

export function isSha256Hex(value: string): boolean {
  return /^[a-f0-9]{64}$/.test(value.trim().toLowerCase());
}
