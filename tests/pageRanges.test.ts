import { describe, expect, it } from 'vitest';
import { parsePageRanges, summarizeRanges } from '../src/utils/pageRanges';

describe('parsePageRanges', () => {
  it('parses comma-separated pages and ranges to zero-based indices', () => {
    expect(parsePageRanges('1-3, 5, 8-10', 10)).toEqual([0, 1, 2, 4, 7, 8, 9]);
  });

  it('deduplicates by default', () => {
    expect(parsePageRanges('1,1,2', 3)).toEqual([0, 1]);
  });

  it('can preserve duplicates for split exports', () => {
    expect(parsePageRanges('1,1,2', 3, { allowDuplicates: true })).toEqual([0, 0, 1]);
  });

  it('rejects reversed ranges', () => {
    expect(() => parsePageRanges('4-2', 5)).toThrow(/Reversed/);
  });

  it('rejects out-of-bounds ranges', () => {
    expect(() => parsePageRanges('1-6', 5)).toThrow(/outside/);
  });

  it('summarizes zero-based page indices for display', () => {
    expect(summarizeRanges([0, 2, 3])).toBe('1, 3, 4');
  });
});
