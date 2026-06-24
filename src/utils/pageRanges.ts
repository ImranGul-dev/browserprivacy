export type PageRangeOptions = {
  allowDuplicates?: boolean;
};

export function parsePageRanges(input: string, pageCount: number, options: PageRangeOptions = {}): number[] {
  if (!Number.isInteger(pageCount) || pageCount < 1) {
    throw new Error('Page count must be at least 1.');
  }
  const text = input.trim();
  if (!text) throw new Error('Enter at least one page or page range.');

  const pages: number[] = [];
  const seen = new Set<number>();
  const tokens = text.split(',').map((token) => token.trim()).filter(Boolean);
  if (tokens.length === 0) throw new Error('Enter at least one page or page range.');

  for (const token of tokens) {
    const match = token.match(/^(\d+)(?:\s*-\s*(\d+))?$/);
    if (!match) throw new Error(`Invalid page range: ${token}. Use formats like 1, 2-4, 7.`);
    const start = Number(match[1]);
    const end = match[2] ? Number(match[2]) : start;
    if (start < 1 || end < 1) throw new Error('Page numbers start at 1.');
    if (start > pageCount || end > pageCount) throw new Error(`Page range ${token} is outside this ${pageCount}-page PDF.`);
    if (end < start) throw new Error(`Reversed range ${token} is not allowed.`);
    for (let page = start; page <= end; page += 1) {
      const zeroBased = page - 1;
      if (!options.allowDuplicates && seen.has(zeroBased)) continue;
      seen.add(zeroBased);
      pages.push(zeroBased);
    }
  }
  return pages;
}

export function summarizeRanges(indices: number[]): string {
  return indices.map((index) => String(index + 1)).join(', ');
}
