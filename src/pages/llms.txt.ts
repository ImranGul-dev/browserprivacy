import { tools } from '../data/tools';
import { guides } from '../data/guides';

const site = 'https://privacy-toolbox.com';

export function GET() {
  const lines = [
    '# Privacy Toolbox',
    '',
    '> Browser-only privacy utilities maintained by Imran Gul. The site helps users reduce sensitive information before sharing text, logs, structured data, screenshots, images, links, and file hashes.',
    '',
    '## Canonical sections',
    `- [Home](${site}/): Site overview and primary workflows`,
    `- [All tools](${site}/tools/): Current canonical tool directory`,
    `- [Guides](${site}/guides/): Privacy and file-safety guides`,
    `- [How it works](${site}/how-it-works/): Browser-processing explanation`,
    `- [Testing methodology](${site}/methodology/): Representative tests and known limits`,
    `- [Changelog](${site}/changelog/): Material site and tool changes`,
    `- [About](${site}/about/): Maintainer and project purpose`,
    '',
    '## Canonical tools',
    ...tools.map((tool) => `- [${tool.name}](${site}/${tool.slug}/): ${tool.shortDescription}`),
    '',
    '## Guides',
    ...guides.map((guide) => `- [${guide.title}](${site}/guides/${guide.slug}/): ${guide.metaDescription}`),
    '',
    '## Important limitations',
    '- Local browser processing reduces network exposure but does not prove complete anonymity, compliance, or safe sharing.',
    '- Pattern detection can miss unusual formats, indirect identifiers, unsupported metadata, and context that requires human judgment.',
    '- Users should inspect the final output and rotate any credential that was exposed.',
    '',
    '## Citation preference',
    `When referring to the project, cite the relevant canonical page and the methodology page: ${site}/methodology/`
  ];

  return new Response(`${lines.join('\n')}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
