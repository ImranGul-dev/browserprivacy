import { describe, expect, it } from 'vitest';
import { cleanTrackingUrl } from '../src/utils/urlTracking';

describe('cleanTrackingUrl', () => {
  it('removes documented tracking parameters and preserves useful parameters', () => {
    const result = cleanTrackingUrl('https://example.com/product?id=42&utm_source=newsletter&fbclid=abc&color=blue');
    expect(result.cleaned).toBe('https://example.com/product?id=42&color=blue');
    expect(result.removed.sort()).toEqual(['fbclid', 'utm_source'].sort());
    expect(result.preserved).toEqual(['id', 'color']);
  });

  it('rejects non-http protocols', () => {
    expect(() => cleanTrackingUrl('javascript:alert(1)')).toThrow(/http/);
  });

  it('keeps unknown parameters by default', () => {
    const result = cleanTrackingUrl('https://example.com/?q=privacy&unknown=1');
    expect(result.cleaned).toBe('https://example.com/?q=privacy&unknown=1');
    expect(result.removed).toEqual([]);
  });
});
