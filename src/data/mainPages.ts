import { tools } from './tools';

export interface MainPage {
  kind: 'main';
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  eyebrow: string;
  intro: string;
  sections: { heading: string; body: string; bullets?: string[] }[];
  ctaTitle: string;
  ctaText: string;
  ctaHref: string;
  relatedToolSlugs?: string[];
  updated: string;
}

const localPromise = 'The normal tool workflow runs in the browser using client-side JavaScript. The page itself is loaded from the website, but selected files and pasted content are not sent to a Privacy Toolbox processing API.';

export const mainPages: MainPage[] = [
  {
    kind: 'main',
    slug: 'ai-privacy-tools',
    title: 'AI Privacy Tools',
    seoTitle: 'AI Privacy Tools for ChatGPT and Other Assistants',
    metaDescription: 'Clean prompts, client emails, notes, links, support text, and private context before using ChatGPT or another AI assistant.',
    h1: 'AI privacy tools for safer prompts and sharing',
    eyebrow: 'AI sharing safety',
    intro: 'Keep the useful problem context while removing names, contact details, account references, private links, credentials, and business information an AI assistant does not need.',
    sections: [
      { heading: 'Use the minimum necessary context', body: 'Start with the question you need answered, then include only the smallest excerpt required. Full email threads, documents, spreadsheets, and screenshots often contain unrelated private information.' },
      { heading: 'Replace identifiers consistently', body: 'Use placeholders such as [CLIENT_A], [EMAIL], [ORDER_ID], and [PRIVATE_URL]. Consistent labels preserve relationships without exposing real values.' },
      { heading: 'Review more than obvious PII', body: 'Private information includes access links, internal strategy, customer records, exact locations, rare job titles, and combinations of facts that can identify a person or organization.', bullets: ['Direct identifiers', 'Credentials and signed URLs', 'Business-confidential context', 'Indirect re-identification clues'] },
      { heading: 'Local first pass, human final review', body: localPromise }
    ],
    ctaTitle: 'Clean text before using AI',
    ctaText: 'Run a local first-pass scan, then review every replacement in context.',
    ctaHref: '/remove-pii-before-chatgpt/',
    relatedToolSlugs: ['remove-pii-before-chatgpt', 'url-privacy-cleaner', 'screenshot-redactor'],
    updated: '2026-07-23'
  },
  {
    kind: 'main',
    slug: 'developer-privacy-tools',
    title: 'Developer Privacy Tools',
    seoTitle: 'Developer Privacy Tools for Logs, JSON, JWTs, and Secrets',
    metaDescription: 'Sanitize logs, redact secrets, mask JSON, review JWT claims, and verify files before sharing developer data.',
    h1: 'Developer privacy tools for safer debugging',
    eyebrow: 'Logs and technical data',
    intro: 'Clean the parts of a log, payload, token, or issue that create access or privacy risk while preserving enough technical detail to diagnose the problem.',
    sections: [
      { heading: 'Common exposure paths', body: 'Credentials and private identifiers appear in Authorization headers, environment variables, database URLs, request bodies, stack traces, query strings, screenshots, and copied command output.' },
      { heading: 'Preserve useful debugging context', body: 'Keep exception types, package versions, status codes, request methods, relevant stack frames, and synthetic payload structure. Replace the values rather than deleting every clue.' },
      { heading: 'Rotate what was exposed', body: 'Redacting future copies does not secure a real token or key that has already left an approved location. Revoke or rotate it and check where else it may have been copied.' },
      { heading: 'Understand tool boundaries', body: 'A JWT decoder does not verify signatures, and a pattern scanner cannot recognize every custom secret. Use official server libraries and organizational incident processes for trust and response decisions.' }
    ],
    ctaTitle: 'Sanitize a log locally',
    ctaText: 'Remove common secrets, paths, identifiers, and private URLs before posting a debugging example.',
    ctaHref: '/sanitize-logs-before-chatgpt/',
    relatedToolSlugs: ['sanitize-logs-before-chatgpt', 'json-pii-redactor', 'jwt-privacy-checker', 'sha256-checksum'],
    updated: '2026-07-23'
  },
  {
    kind: 'main',
    slug: 'file-privacy-tools',
    title: 'File and Image Privacy Tools',
    seoTitle: 'Browser-Only File and Image Privacy Tools',
    metaDescription: 'Inspect and remove image metadata, redact screenshots, calculate SHA-256 checksums, and follow safer PDF and ZIP sharing workflows.',
    h1: 'File and image privacy tools that run locally',
    eyebrow: 'Photos, documents, and downloads',
    intro: 'Check what a file reveals, create cleaner image copies, cover visible details, verify downloads, and learn how to handle PDFs and ZIP archives more safely.',
    sections: [
      { heading: 'Image metadata and GPS', body: 'Photos may include camera model, capture time, software, author fields, and GPS coordinates. Inspect the exact outgoing file, then create and verify a new copy when metadata is unnecessary.' },
      { heading: 'Visible information matters too', body: 'Removing metadata does not hide faces, street signs, screens, documents, balances, tabs, or account IDs visible in the pixels. Crop or redact those separately.' },
      { heading: 'PDF and archive review', body: 'PDFs and ZIP files can contain comments, attachments, hidden files, paths, form data, metadata, and underlying text. Use a trusted local workflow and verify the final artifact rather than trusting its appearance.' },
      { heading: 'Integrity checks', body: 'A SHA-256 checksum can confirm that file bytes match a trusted published value. It does not prove that the publisher or file is safe.' }
    ],
    ctaTitle: 'Inspect image metadata',
    ctaText: 'Check common EXIF and GPS fields locally before sharing a photo.',
    ctaHref: '/view-image-metadata/',
    relatedToolSlugs: ['view-image-metadata', 'remove-exif-metadata', 'screenshot-redactor', 'sha256-checksum'],
    updated: '2026-07-23'
  },
  {
    kind: 'main',
    slug: 'how-it-works',
    title: 'How Privacy Toolbox Works',
    seoTitle: 'How Privacy Toolbox Works',
    metaDescription: 'Learn how Privacy Toolbox uses browser JavaScript for text redaction, image processing, metadata inspection, URL cleaning, and checksums.',
    h1: 'How Privacy Toolbox works',
    eyebrow: 'Local-first processing',
    intro: 'Privacy Toolbox provides focused utilities that process pasted text or selected files with code running in your browser for the normal workflow.',
    sections: [
      { heading: 'Text and structured data', body: 'Text tools use pattern matching, while JSON and CSV tools parse structure before masking selected values. These methods are fast but cannot understand every context-specific identifier.' },
      { heading: 'Images and metadata', body: 'The screenshot tool draws onto a canvas. The metadata remover decodes visible pixels and exports a new image. The metadata viewer reads selected JPEG, PNG, and WebP structures without claiming forensic completeness.' },
      { heading: 'Checksums and files', body: 'The SHA-256 tool uses the Web Crypto API to calculate a digest from local file bytes. Very large files can exceed browser memory and are better handled by operating-system tools.' },
      { heading: 'Verification and limitations', body: 'Every result is a draft. Review the output manually, test important files, and follow approved security, legal, medical, and compliance processes for high-risk data.' }
    ],
    ctaTitle: 'Read the testing methodology',
    ctaText: 'See what is tested, what is not tested, and how to verify local processing yourself.',
    ctaHref: '/methodology/',
    relatedToolSlugs: ['remove-pii-before-chatgpt', 'remove-exif-metadata', 'sha256-checksum'],
    updated: '2026-07-23'
  },
  {
    kind: 'main',
    slug: 'browser-only-privacy',
    title: 'What Browser-Only Privacy Means',
    seoTitle: 'What Browser-Only Privacy Means and Does Not Mean',
    metaDescription: 'Understand local browser processing, network requests, file access, JavaScript limits, third-party resources, and manual review.',
    h1: 'What browser-only privacy means',
    eyebrow: 'Clear privacy claims',
    intro: 'A browser can process content locally, but the phrase “browser-only” should be understood precisely rather than treated as a complete security guarantee.',
    sections: [
      { heading: 'The file or text can stay local', body: localPromise },
      { heading: 'The website still loads over the network', body: 'HTML, CSS, JavaScript, icons, and hosting requests still use the network. A local-processing claim describes the selected input workflow, not the entire internet connection.' },
      { heading: 'You can verify behavior', body: 'Use browser developer tools and synthetic test data to inspect network requests while running a tool. The test value should not appear in request URLs, headers, or bodies.' },
      { heading: 'Local does not mean perfect', body: 'Local processing does not guarantee trustworthy code, complete anonymization, malware safety, legal compliance, or secure sharing after the result leaves the browser.' }
    ],
    ctaTitle: 'Read the no-upload guide',
    ctaText: 'Learn how local file access works and how to verify a no-upload workflow.',
    ctaHref: '/guides/no-upload-file-tools-explained/',
    relatedToolSlugs: ['remove-exif-metadata', 'csv-anonymizer', 'sha256-checksum'],
    updated: '2026-07-23'
  },
  {
    kind: 'main',
    slug: 'privacy-glossary',
    title: 'Privacy and Redaction Glossary',
    seoTitle: 'Privacy and Redaction Glossary',
    metaDescription: 'Clear definitions for PII, personal data, redaction, anonymization, pseudonymization, metadata, EXIF, JWT, hashing, and local processing.',
    h1: 'Privacy and redaction glossary',
    eyebrow: 'Definitions',
    intro: 'These terms are related, but they do not mean the same thing. Understanding the difference prevents unsafe assumptions about a cleaned file or message.',
    sections: [
      { heading: 'PII and personal data', body: 'PII commonly means information that identifies or can be linked to a person. “Personal data” is a broader legal term in some jurisdictions and may include online identifiers, behavior, location, and combinations of information.' },
      { heading: 'Redaction and masking', body: 'Redaction removes or permanently obscures content from a shared artifact. Masking replaces values with placeholders or partial representations. A visual cover is not true redaction when the underlying text remains recoverable.' },
      { heading: 'Anonymization and pseudonymization', body: 'Anonymization aims to prevent identification. Pseudonymization replaces identifiers but retains a way to relate records or reverse the process. A simple name replacement rarely guarantees anonymity.' },
      { heading: 'Metadata, EXIF, and hashing', body: 'Metadata describes a file or its creation. EXIF is a common image metadata format. A cryptographic hash is a fingerprint of bytes used for integrity checks, not encryption or malware detection.' }
    ],
    ctaTitle: 'See practical redaction examples',
    ctaText: 'Compare unsafe and cleaned text, JSON, logs, and screenshots.',
    ctaHref: '/redaction-examples/',
    relatedToolSlugs: ['remove-pii-before-chatgpt', 'view-image-metadata', 'sha256-checksum'],
    updated: '2026-07-23'
  },
  {
    kind: 'main',
    slug: 'privacy-checklist',
    title: 'Privacy Checklist Before Sharing',
    seoTitle: 'Privacy Checklist Before Sharing With AI, Support, or Online',
    metaDescription: 'Use a practical checklist before sharing text, logs, structured data, screenshots, photos, PDFs, ZIP files, links, or downloads.',
    h1: 'Privacy checklist before sharing anything',
    eyebrow: 'Final review',
    intro: 'Run through the checks that match the content type, then inspect the exact final artifact rather than the original or editor preview.',
    sections: [
      { heading: 'Text and AI prompts', body: 'Remove direct identifiers, credentials, signatures, quoted history, internal links, confidential business details, and indirect clues the recipient does not need.' },
      { heading: 'Logs, JSON, and CSV', body: 'Check Authorization data, connection strings, request bodies, every array item, free-text columns, customer IDs, URLs, and organization-specific fields.' },
      { heading: 'Images and documents', body: 'Inspect visible content, metadata, comments, attachments, hidden text, editable layers, QR codes, file names, page order, and the exact exported copy.' },
      { heading: 'Links, archives, and downloads', body: 'Remove tracking and user parameters, keep signed URLs private, inspect ZIP members and paths, and verify file checksums against a trusted source.' }
    ],
    ctaTitle: 'Choose a local tool',
    ctaText: 'Use the closest matching tool, then complete the manual checks for your content type.',
    ctaHref: '/tools/',
    relatedToolSlugs: tools.map((tool) => tool.slug),
    updated: '2026-07-23'
  },
  {
    kind: 'main',
    slug: 'redaction-examples',
    title: 'Redaction Examples',
    seoTitle: 'Redaction Examples for Text, Logs, JSON, CSV, and Images',
    metaDescription: 'See practical before-and-after examples that preserve useful context while removing personal identifiers, secrets, and access details.',
    h1: 'Redaction examples that preserve useful context',
    eyebrow: 'Before and after',
    intro: 'A strong cleaned example explains the same problem without exposing the real person, account, organization, credential, or private location.',
    sections: [
      { heading: 'AI prompt', body: 'Unsafe: “Reply to John at john@example.com about account ACC-8821.” Clean: “Reply to [CLIENT_CONTACT] at [EMAIL] about account [ACCOUNT_ID].”' },
      { heading: 'Developer log', body: 'Unsafe: “Authorization: Bearer abc.def.ghi user=client@example.com.” Clean: “Authorization: Bearer [SECRET] user=[EMAIL].”' },
      { heading: 'Structured data', body: 'Unsafe: {"email":"user@example.com","token":"live-secret"}. Clean: {"email":"[EMAIL]","token":"[SECRET]"}.' },
      { heading: 'Image', body: 'Crop to the relevant interface, cover the account menu, email, ID, internal URL, and tabs with solid boxes, then export and inspect a new flattened image.' }
    ],
    ctaTitle: 'Read more client examples',
    ctaText: 'See detailed email, support, JSON, log, and screenshot examples.',
    ctaHref: '/guides/client-data-redaction-examples/',
    relatedToolSlugs: ['remove-pii-before-chatgpt', 'sanitize-logs-before-chatgpt', 'json-pii-redactor', 'screenshot-redactor'],
    updated: '2026-07-23'
  },
  {
    kind: 'main',
    slug: 'compare',
    title: 'Browser-Only vs Upload-Based Privacy Tools',
    seoTitle: 'Browser-Only vs Upload-Based Privacy Tools',
    metaDescription: 'Compare local browser processing with upload-based services for privacy, file size, OCR, collaboration, retention, and advanced document workflows.',
    h1: 'Browser-only vs upload-based privacy tools',
    eyebrow: 'Comparison',
    intro: 'The safer choice depends on the data, the feature required, the provider, retention rules, file size, and your ability to verify the workflow.',
    sections: [
      { heading: 'Browser-only strengths', body: 'Local tools reduce processing exposure for text, small files, image rendering, metadata checks, URL cleaning, and checksums. They can be transparent and require no account.' },
      { heading: 'Browser-only limits', body: 'Browsers have memory limits and may not support advanced OCR, collaboration, enterprise access control, large PDFs, digital signatures, or complex document sanitization.' },
      { heading: 'Upload-based strengths and risks', body: 'Server tools may offer advanced processing and team workflows, but the file leaves your device. Review encryption, access, retention, training use, subprocessors, data location, and deletion behavior.' },
      { heading: 'Practical decision rule', body: 'Use the least-exposing method that reliably completes the task. When advanced server processing is necessary, choose an approved provider and share only the minimum data.' }
    ],
    ctaTitle: 'Start with local processing',
    ctaText: 'Use a browser tool for a first pass when the file type and workflow are supported.',
    ctaHref: '/tools/',
    relatedToolSlugs: ['remove-pii-before-chatgpt', 'remove-exif-metadata', 'sha256-checksum'],
    updated: '2026-07-23'
  },
  {
    kind: 'main',
    slug: 'methodology',
    title: 'Testing Methodology and Tool Limitations',
    seoTitle: 'Privacy Toolbox Testing Methodology and Limitations',
    metaDescription: 'See how Privacy Toolbox tests local processing, redaction patterns, image metadata workflows, checksums, accessibility, and known limitations.',
    h1: 'Testing methodology and known limitations',
    eyebrow: 'Transparency',
    intro: 'This page explains what is checked before publishing a tool, what the tests do not prove, and how users can verify important behavior independently.',
    sections: [
      { heading: 'Local-processing checks', body: 'Tools are tested with synthetic values while the browser Network panel is monitored. The expected behavior is that pasted content and selected file bytes do not appear in requests to a Privacy Toolbox processing API.' },
      { heading: 'Functional test cases', body: 'Text tools are checked against representative emails, phone numbers, IDs, URLs, tokens, JSON nesting, CSV quoting, and JWT payloads. Image tools are checked with supported formats, orientation, dimensions, export, and common metadata fields.' },
      { heading: 'Regression and build checks', body: 'The project validates data references, duplicate slugs, internal links, sitemap URLs, JavaScript syntax, and production output. Important redirects are kept in version-controlled configuration.' },
      { heading: 'What these tests do not prove', body: 'Tests do not guarantee complete anonymization, forensic metadata removal, regulatory compliance, security against malicious browser extensions, or compatibility with every file produced by every application.', bullets: ['Pattern detection can produce false positives and false negatives', 'Lightweight metadata parsing does not cover every proprietary field', 'Browser memory limits vary by device', 'High-risk workflows require approved professional tools'] }
    ],
    ctaTitle: 'Review recent changes',
    ctaText: 'See what was added, consolidated, fixed, and clarified.',
    ctaHref: '/changelog/',
    relatedToolSlugs: ['remove-pii-before-chatgpt', 'view-image-metadata', 'sha256-checksum'],
    updated: '2026-07-23'
  },
  {
    kind: 'main',
    slug: 'changelog',
    title: 'Privacy Toolbox Changelog',
    seoTitle: 'Privacy Toolbox Changelog',
    metaDescription: 'Version history for Privacy Toolbox tools, privacy claims, guide updates, redirects, accessibility, and technical SEO changes.',
    h1: 'Privacy Toolbox changelog',
    eyebrow: 'Version history',
    intro: 'Material tool, content, privacy, routing, and verification changes are recorded here so users can understand how the site evolves.',
    sections: [
      { heading: 'July 23, 2026 — Site consolidation and migration repair', body: 'Consolidated overlapping keyword pages into canonical tools; restored image metadata, PDF privacy, ZIP, checksum, and tracking-link guide topics; added exact redirects for retired URLs; rebuilt sitemap and structured data; added author, methodology, and update information.' },
      { heading: 'July 23, 2026 — New local file tools', body: 'Added local EXIF/GPS image re-encoding, common JPEG/PNG/WebP metadata inspection, and SHA-256 checksum calculation with optional expected-hash comparison.' },
      { heading: 'July 23, 2026 — Trust and accessibility improvements', body: 'Clarified local-processing claims, added known limitations and test coverage, improved article authorship, enhanced keyboard and screen-reader labels, and added a noindex directive for the 404 page.' },
      { heading: 'Earlier 2026 versions', body: 'The site previously focused primarily on PDF, image metadata, and file utilities, then briefly expanded into many narrowly targeted AI redaction pages. The current structure unifies those topics under browser-only privacy and safer sharing.' }
    ],
    ctaTitle: 'Read how tools are tested',
    ctaText: 'Review the functional checks and limitations behind the current release.',
    ctaHref: '/methodology/',
    updated: '2026-07-23'
  },
  {
    kind: 'main',
    slug: 'about',
    title: 'About Privacy Toolbox',
    seoTitle: 'About Privacy Toolbox and Its Maintainer',
    metaDescription: 'Privacy Toolbox is maintained by web developer Imran Gul to provide transparent browser-based privacy utilities and practical safer-sharing guidance.',
    h1: 'About Privacy Toolbox',
    eyebrow: 'Who maintains this site',
    intro: 'Privacy Toolbox is created and maintained by Imran Gul, a web developer building practical browser-based tools for safer digital sharing.',
    sections: [
      { heading: 'Why the project exists', body: 'People routinely copy client messages, logs, data exports, screenshots, photos, and documents into AI tools, support systems, and public platforms. Many exposures happen because the sharing step is faster than the review step.' },
      { heading: 'What the site provides', body: 'The site combines focused local utilities with detailed guides, clear limitations, test notes, migration redirects, and manual-review checklists. It avoids promises of perfect anonymity or automatic compliance.' },
      { heading: 'About the maintainer', body: 'Imran Gul is a web developer with experience building websites, browser interfaces, automation workflows, and client-facing digital tools. He is not presented as a lawyer, doctor, compliance officer, or security auditor.' },
      { heading: 'Corrections and feedback', body: 'Report broken links, inaccurate explanations, accessibility problems, or reproducible tool issues to support@privacy-toolbox.com. Do not send confidential files, credentials, or private customer data.' }
    ],
    ctaTitle: 'Review the methodology',
    ctaText: 'See how local processing and representative test cases are checked.',
    ctaHref: '/methodology/',
    relatedToolSlugs: ['remove-pii-before-chatgpt', 'remove-exif-metadata', 'sha256-checksum'],
    updated: '2026-07-23'
  },
  {
    kind: 'main',
    slug: 'contact',
    title: 'Contact Privacy Toolbox',
    seoTitle: 'Contact Privacy Toolbox Support',
    metaDescription: 'Contact Privacy Toolbox for corrections, accessibility issues, broken links, tool bugs, and practical feature suggestions.',
    h1: 'Contact Privacy Toolbox',
    eyebrow: 'Feedback and corrections',
    intro: 'Email support@privacy-toolbox.com for reproducible tool issues, broken links, accessibility problems, factual corrections, and focused feature suggestions.',
    sections: [
      { heading: 'Useful reports', body: 'Include the page URL, browser and version, operating system, steps to reproduce, expected behavior, and what happened instead. Use synthetic sample data.' },
      { heading: 'Do not send sensitive data', body: 'Do not email passwords, API keys, tokens, customer records, medical information, legal case details, financial documents, private images, or unredacted logs.' },
      { heading: 'Security-related reports', body: 'Describe the issue without exploiting other users or accessing data you do not own. Include a safe proof of concept and allow reasonable time for review.' },
      { heading: 'Email address', body: 'support@privacy-toolbox.com' }
    ],
    ctaTitle: 'Clean an example before reporting',
    ctaText: 'Use synthetic data or remove private values before including a reproduction sample.',
    ctaHref: '/remove-pii-before-chatgpt/',
    relatedToolSlugs: ['remove-pii-before-chatgpt', 'sanitize-logs-before-chatgpt'],
    updated: '2026-07-23'
  },
  {
    kind: 'main',
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    seoTitle: 'Privacy Policy - Privacy Toolbox',
    metaDescription: 'Privacy policy for browser-based tool processing, hosting logs, cookies, third-party services, contact, and user responsibilities.',
    h1: 'Privacy Policy',
    eyebrow: 'Legal information',
    intro: 'This policy explains the intended processing model of Privacy Toolbox and the information users should consider before using the site.',
    sections: [
      { heading: 'Tool input processing', body: 'The normal tools are designed to process pasted text and selected files in the browser. Privacy Toolbox does not provide a backend processing API for these tool inputs in this build.' },
      { heading: 'Hosting and technical logs', body: 'The hosting provider may process standard request information such as IP address, user agent, requested URL, timestamps, and security events. These logs are separate from the local tool input workflow.' },
      { heading: 'Cookies, analytics, and advertising', body: 'This project build does not require an account. If analytics or advertising is enabled later, this policy and consent behavior should be updated before deployment. Third-party services may apply their own policies.' },
      { heading: 'Contact and retention', body: 'Email sent to support@privacy-toolbox.com is processed for responding to the request. Do not send sensitive content. Contact the same address for privacy questions.' }
    ],
    ctaTitle: 'Understand local processing',
    ctaText: 'Read what browser-only and no-upload claims mean in practice.',
    ctaHref: '/browser-only-privacy/',
    updated: '2026-07-23'
  },
  {
    kind: 'main',
    slug: 'terms',
    title: 'Terms of Use',
    seoTitle: 'Terms of Use - Privacy Toolbox',
    metaDescription: 'Terms covering responsible use, tool limitations, user responsibility, prohibited use, availability, and changes.',
    h1: 'Terms of Use',
    eyebrow: 'Legal information',
    intro: 'By using Privacy Toolbox, you agree to use the tools responsibly, respect applicable law and rights, and review all output before relying on or sharing it.',
    sections: [
      { heading: 'Tools are provided as practical helpers', body: 'The tools may produce false positives, false negatives, changed formatting, or incomplete results. They do not guarantee anonymity, security, compliance, accuracy, availability, or fitness for a particular purpose.' },
      { heading: 'You control and review the data', body: 'You are responsible for having permission to process the input and for what you copy, download, publish, send, or rely on after using a tool.' },
      { heading: 'Prohibited use', body: 'Do not use the site to process data you are not authorized to handle, harm others, evade lawful controls, distribute malware, abuse services, or conceal illegal activity.' },
      { heading: 'Changes and availability', body: 'Features, limits, content, URLs, and these terms may change. Material changes are recorded in the changelog where practical.' }
    ],
    ctaTitle: 'Read the disclaimer',
    ctaText: 'Review the main limitations before using a sensitive workflow.',
    ctaHref: '/disclaimer/',
    updated: '2026-07-23'
  },
  {
    kind: 'main',
    slug: 'disclaimer',
    title: 'Disclaimer',
    seoTitle: 'Disclaimer - Privacy Toolbox',
    metaDescription: 'Important limitations for redaction, anonymization, image metadata, PDF guidance, file checksums, AI sharing, and professional advice.',
    h1: 'Disclaimer',
    eyebrow: 'Important limitations',
    intro: 'Privacy Toolbox can reduce common accidental exposure, but it cannot guarantee that content or files are safe, anonymous, compliant, or free from hidden information.',
    sections: [
      { heading: 'No guarantee of complete anonymization', body: 'Pattern-based tools can miss unusual values, indirect identifiers, context, hidden file structures, unsupported metadata, text inside images, and information only a human reviewer would understand.' },
      { heading: 'No professional or compliance advice', body: 'The site does not provide legal, medical, financial, security, privacy-officer, or regulatory advice. Use qualified professionals and approved systems for high-risk workflows.' },
      { heading: 'No malware or trust guarantee', body: 'A checksum match confirms byte equality with an expected hash; it does not prove a file is safe. Local processing does not prove the website code, browser, device, or extension environment is trustworthy.' },
      { heading: 'Credentials require incident response', body: 'If a live password, key, token, cookie, signed URL, or private key has been exposed, redact future copies and rotate or revoke the credential immediately.' }
    ],
    ctaTitle: 'Review the testing methodology',
    ctaText: 'Understand representative test coverage and known boundaries.',
    ctaHref: '/methodology/',
    updated: '2026-07-23'
  }
];

export function getMainPage(slug: string) {
  return mainPages.find((page) => page.slug === slug);
}
