export const TRACKING_PARAMETERS = new Set([
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'utm_id',
  'utm_reader',
  'utm_name',
  'utm_social',
  'utm_social-type',
  'fbclid',
  'gclid',
  'dclid',
  'msclkid',
  'mc_cid',
  'mc_eid',
  'igshid',
  'ref',
  'ref_src'
]);

export type CleanUrlResult = {
  cleaned: string;
  removed: string[];
  preserved: string[];
};

export function cleanTrackingUrl(raw: string): CleanUrlResult {
  const input = raw.trim();
  if (!input) throw new Error('Enter a full URL starting with http:// or https://.');
  const url = new URL(input);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error('Only http:// and https:// URLs are supported.');
  }

  const removed: string[] = [];
  const preserved: string[] = [];
  const keys = Array.from(url.searchParams.keys());
  for (const key of keys) {
    const normalized = key.toLowerCase();
    if (TRACKING_PARAMETERS.has(normalized)) {
      url.searchParams.delete(key);
      removed.push(key);
    } else {
      preserved.push(key);
    }
  }
  return { cleaned: url.toString(), removed, preserved };
}
