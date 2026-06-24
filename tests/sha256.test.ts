import { describe, expect, it } from 'vitest';
import { isSha256Hex, sha256Hex } from '../src/utils/sha256';

describe('sha256Hex', () => {
  it('matches the SHA-256 test vector for empty string', async () => {
    await expect(sha256Hex('')).resolves.toBe('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
  });

  it('matches the SHA-256 test vector for abc', async () => {
    await expect(sha256Hex('abc')).resolves.toBe('ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
  });

  it('validates 64-character lowercase hex', () => {
    expect(isSha256Hex('ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad')).toBe(true);
    expect(isSha256Hex('not-a-hash')).toBe(false);
  });
});
