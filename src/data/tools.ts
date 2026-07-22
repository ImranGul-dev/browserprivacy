export type ToolMode =
  | 'text-redactor'
  | 'developer-redactor'
  | 'json-redactor'
  | 'csv-anonymizer'
  | 'url-cleaner'
  | 'jwt-checker'
  | 'image-redactor'
  | 'image-metadata-remover'
  | 'image-metadata-viewer'
  | 'sha256-checksum';

export type ToolCategory =
  | 'AI Privacy'
  | 'Developer Privacy'
  | 'Data Files'
  | 'Image Privacy'
  | 'File Verification';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ToolPage {
  kind: 'tool';
  name: string;
  slug: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  category: ToolCategory;
  mode: ToolMode;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  shortDescription: string;
  purpose: string;
  audience: string[];
  detects: string[];
  mayMiss: string[];
  exampleUnsafe: string;
  exampleClean: string;
  interfaceHint: string;
  emptyState: string;
  primaryButton: string;
  overview: string[];
  workflow: { title: string; text: string }[];
  safetyChecks: string[];
  testedWith: string[];
  relatedTools: string[];
  relatedGuides: string[];
  faq: FAQItem[];
  llmSummary: string;
  updated: string;
}

const localProcessingFaq = (tool: string): FAQItem[] => [
  {
    question: `Does ${tool} upload my input?`,
    answer: 'The normal tool workflow runs in your browser. The page code is downloaded from the website, but the content you paste or select is processed locally and is not sent to a Privacy Toolbox processing API.'
  },
  {
    question: 'Can this guarantee complete anonymization?',
    answer: 'No. Automated checks can miss context clues, unusual identifiers, text inside unsupported files, and details that only a person would recognize. Always review the result before sharing.'
  },
  {
    question: 'Should I use this for regulated or highly sensitive data?',
    answer: 'Only when your organization permits it. For medical, legal, financial, employment, or customer data, follow your approved security and compliance process rather than relying on a free pattern-based tool alone.'
  }
];

export const tools: ToolPage[] = [
  {
    kind: 'tool',
    name: 'Remove PII Before ChatGPT',
    slug: 'remove-pii-before-chatgpt',
    primaryKeyword: 'remove PII before ChatGPT',
    secondaryKeywords: ['anonymize text before ChatGPT', 'clean prompt before AI', 'remove personal data before AI'],
    category: 'AI Privacy',
    mode: 'text-redactor',
    seoTitle: 'Remove PII Before ChatGPT - Local Privacy Cleaner',
    metaDescription: 'Mask names, emails, phone numbers, IDs, links, and common private details before pasting text into ChatGPT or another AI assistant.',
    h1: 'Remove PII Before ChatGPT',
    shortDescription: 'Clean private details from prompts, client emails, notes, and support messages before using AI.',
    purpose: 'Use this cleaner when the AI needs the situation but does not need real names, contact details, customer references, private links, or account identifiers.',
    audience: ['freelancers', 'support teams', 'students', 'operations teams', 'business owners'],
    detects: ['email addresses', 'phone numbers', 'common person-name patterns', 'URLs', 'IPv4 addresses', 'dates', 'money amounts', 'common order and account IDs', 'tokens and secrets'],
    mayMiss: ['single-word names', 'postal addresses without a clear pattern', 'industry-specific identifiers', 'private facts revealed by context', 'text inside images or unsupported documents'],
    exampleUnsafe: 'Draft a reply to John Carter at john.carter@example.com about order ORD-29388 and phone +1 415 555 0198.',
    exampleClean: 'Draft a reply to [PERSON] at [EMAIL] about order [ID] and phone [PHONE].',
    interfaceHint: 'Paste the exact text you plan to send to an AI assistant. The browser replaces common sensitive patterns with readable placeholders.',
    emptyState: 'Paste a prompt, email, note, transcript, or ticket here.',
    primaryButton: 'Scan and redact',
    overview: [
      'AI assistants often need context, but they rarely need real customer names, contact details, account numbers, or confidential links. This tool performs a local first-pass scan and replaces recognizable patterns with placeholders.',
      'The cleaned text remains editable. You can restore details that are genuinely necessary, remove extra context, and check whether the prompt still makes sense before copying it.'
    ],
    workflow: [
      { title: 'Paste only the relevant section', text: 'Avoid copying an entire email chain or document when a smaller excerpt is enough.' },
      { title: 'Run the local scan', text: 'Review which pattern types were found and inspect every replacement in context.' },
      { title: 'Check indirect identifiers', text: 'Look for unique job titles, project names, uncommon dates, locations, and private business facts the pattern scan cannot understand.' },
      { title: 'Copy the reviewed version', text: 'Share only after the placeholders are consistent and the useful problem remains clear.' }
    ],
    safetyChecks: ['Remove signatures and quoted email history', 'Replace customer, patient, employee, and order references', 'Remove internal URLs and non-public company details', 'Never paste live passwords, API keys, or access tokens'],
    testedWith: ['plain-text prompts', 'client emails', 'support-ticket text', 'meeting notes', 'short transcripts'],
    relatedTools: ['sanitize-logs-before-chatgpt', 'json-pii-redactor', 'screenshot-redactor'],
    relatedGuides: ['what-not-to-paste-into-chatgpt', 'how-to-anonymize-text-before-using-ai', 'client-data-redaction-examples'],
    faq: localProcessingFaq('Remove PII Before ChatGPT'),
    llmSummary: 'A browser-based text redactor for masking common personal identifiers and secrets before using AI assistants.',
    updated: '2026-07-23'
  },
  {
    kind: 'tool',
    name: 'Log Sanitizer for ChatGPT',
    slug: 'sanitize-logs-before-chatgpt',
    primaryKeyword: 'sanitize logs before ChatGPT',
    secondaryKeywords: ['remove secrets from logs', 'redact API keys from logs', 'clean stack trace before sharing'],
    category: 'Developer Privacy',
    mode: 'developer-redactor',
    seoTitle: 'Sanitize Logs Before ChatGPT or Support',
    metaDescription: 'Mask API keys, Bearer tokens, database URLs, emails, IP addresses, file paths, and IDs before sharing logs with AI or support.',
    h1: 'Sanitize Logs Before ChatGPT or Support',
    shortDescription: 'Remove common secrets and private infrastructure details from logs while preserving debugging context.',
    purpose: 'Use this before posting error logs to ChatGPT, GitHub, Jira, Slack, Stack Overflow, or a vendor support portal.',
    audience: ['developers', 'DevOps teams', 'technical support', 'site owners', 'QA teams'],
    detects: ['Bearer tokens', 'JWT-like values', 'API-key assignments', 'AWS-style access key IDs', 'database connection URLs', 'email addresses', 'IPv4 addresses', 'URLs', 'file paths', 'common IDs'],
    mayMiss: ['custom secret formats', 'base64-encoded secrets', 'private hostnames without a URL', 'credentials split across lines', 'secrets inside screenshots or archives'],
    exampleUnsafe: 'ERROR user=ali@example.com Authorization: Bearer abc.def.ghi DATABASE_URL=postgres://admin:secret@db.internal/app',
    exampleClean: 'ERROR user=[EMAIL] Authorization: Bearer [SECRET] DATABASE_URL=[SECRET]',
    interfaceHint: 'Paste a log, stack trace, .env excerpt, or issue description. The local scan removes common credentials and identifiers.',
    emptyState: 'Paste logs, stack traces, configuration text, or a bug report here.',
    primaryButton: 'Sanitize log',
    overview: [
      'Logs contain the exact details needed for debugging, which is also why they frequently expose credentials, customer identifiers, internal paths, and infrastructure names. A useful sanitized log keeps error messages, timestamps, package names, status codes, and relevant stack frames while removing access-bearing values.',
      'If a real secret has already been shared, redaction is not enough. Revoke or rotate it in the service that issued it.'
    ],
    workflow: [
      { title: 'Work from a copy', text: 'Keep the original log private and sanitize a duplicate intended for sharing.' },
      { title: 'Scan for credentials first', text: 'Check Authorization headers, environment variables, connection strings, JWTs, and vendor-specific key prefixes.' },
      { title: 'Preserve the error path', text: 'Keep the exception, package versions, relevant stack frames, request method, and response status where safe.' },
      { title: 'Rotate exposed secrets', text: 'Revoke any credential that left an approved system, even if you later delete or edit the message.' }
    ],
    safetyChecks: ['Search manually for password, token, secret, auth, key, cookie, and session', 'Remove internal domains and user-specific file paths', 'Check pasted request and response bodies', 'Review screenshots separately'],
    testedWith: ['Node.js stack traces', 'browser console output', 'web-server logs', '.env-style snippets', 'API error responses'],
    relatedTools: ['json-pii-redactor', 'jwt-privacy-checker', 'remove-pii-before-chatgpt'],
    relatedGuides: ['sanitize-error-logs-before-sharing', 'redact-api-keys-before-posting-logs', 'check-jwt-for-sensitive-data'],
    faq: localProcessingFaq('Log Sanitizer for ChatGPT'),
    llmSummary: 'A local log-cleaning tool that masks common credentials, identifiers, IP addresses, URLs, and file paths before external sharing.',
    updated: '2026-07-23'
  },
  {
    kind: 'tool',
    name: 'JSON PII Redactor',
    slug: 'json-pii-redactor',
    primaryKeyword: 'JSON PII redactor',
    secondaryKeywords: ['mask JSON before sharing', 'remove personal data from JSON', 'JSON anonymizer'],
    category: 'Data Files',
    mode: 'json-redactor',
    seoTitle: 'JSON PII Redactor - Mask Private Fields Locally',
    metaDescription: 'Mask sensitive JSON keys and common personal values locally before sharing API responses, webhook payloads, or examples.',
    h1: 'JSON PII Redactor',
    shortDescription: 'Preserve valid JSON structure while masking sensitive keys and recognizable private values.',
    purpose: 'Use this for API responses, webhook payloads, database exports, event data, and support examples that must keep their structure.',
    audience: ['API developers', 'integration specialists', 'support engineers', 'QA teams', 'automation builders'],
    detects: ['sensitive key names', 'emails', 'phone numbers', 'JWTs', 'Bearer tokens', 'API-key assignments', 'IP addresses', 'URLs', 'common IDs'],
    mayMiss: ['custom keys with harmless-looking names', 'numbers whose meaning depends on context', 'nested values encoded as strings', 'encrypted or compressed payloads'],
    exampleUnsafe: '{"name":"John Carter","email":"john@example.com","customer_id":"CUST-4501","token":"live-secret"}',
    exampleClean: '{"name":"[REDACTED]","email":"[REDACTED]","customer_id":"[REDACTED]","token":"[REDACTED]"}',
    interfaceHint: 'Paste valid JSON. Sensitive keys are masked recursively, and string values receive an additional pattern scan.',
    emptyState: 'Paste a JSON object or array here.',
    primaryButton: 'Redact JSON',
    overview: [
      'Support teams and developers often need the shape of a payload rather than the real records inside it. This tool parses valid JSON, walks nested objects and arrays, masks configured sensitive keys, and scans remaining strings for common private patterns.',
      'When the input is invalid JSON, the tool falls back to text redaction and warns through the output behavior. For technical troubleshooting, valid JSON is preferable because nesting and data types are preserved.'
    ],
    workflow: [
      { title: 'Paste a representative sample', text: 'Use the smallest payload that still reproduces the issue.' },
      { title: 'Redact recursively', text: 'The tool masks sensitive-looking keys throughout objects and arrays.' },
      { title: 'Validate the output', text: 'Confirm the result is valid JSON and that IDs needed to explain relationships use consistent placeholders.' },
      { title: 'Review custom business fields', text: 'Check organization-specific keys that an automatic list cannot know.' }
    ],
    safetyChecks: ['Inspect every array item, not only the first record', 'Remove access and refresh tokens even when expired', 'Check URLs for query-string identifiers', 'Avoid sharing full production payloads'],
    testedWith: ['API responses', 'webhook payloads', 'nested arrays', 'automation-node outputs', 'support examples'],
    relatedTools: ['sanitize-logs-before-chatgpt', 'csv-anonymizer', 'jwt-privacy-checker'],
    relatedGuides: ['mask-json-before-sharing-with-support', 'client-data-redaction-examples'],
    faq: localProcessingFaq('JSON PII Redactor'),
    llmSummary: 'A browser-only JSON redactor that masks sensitive keys recursively and scans string values for common private patterns.',
    updated: '2026-07-23'
  },
  {
    kind: 'tool',
    name: 'CSV Anonymizer and PII Scanner',
    slug: 'csv-anonymizer',
    primaryKeyword: 'CSV anonymizer',
    secondaryKeywords: ['scan CSV for PII', 'remove emails from CSV', 'anonymize spreadsheet data'],
    category: 'Data Files',
    mode: 'csv-anonymizer',
    seoTitle: 'CSV Anonymizer and PII Scanner - Browser Only',
    metaDescription: 'Scan and anonymize emails, phone numbers, IDs, URLs, IP addresses, and name patterns in CSV data without uploading the file.',
    h1: 'CSV Anonymizer and PII Scanner',
    shortDescription: 'Create a cleaned copy of CSV data while keeping rows, columns, quoting, and useful structure.',
    purpose: 'Use this before sending spreadsheet exports to AI tools, contractors, clients, support teams, or public examples.',
    audience: ['analysts', 'operations teams', 'marketers', 'researchers', 'support teams'],
    detects: ['emails', 'phone numbers', 'IPv4 addresses', 'URLs', 'common IDs', 'two-word name patterns'],
    mayMiss: ['addresses', 'single-word names', 'free-text context', 'internal numeric identifiers', 'non-comma delimiters', 'very large files that exceed browser memory'],
    exampleUnsafe: 'name,email,customer_id\nJohn Carter,john@example.com,CUST-4501',
    exampleClean: 'name,email,customer_id\n[PERSON],[EMAIL],[ID]',
    interfaceHint: 'Paste CSV text or choose a local .csv file. The output preserves CSV formatting and replaces recognizable private values.',
    emptyState: 'Paste comma-separated data here or choose a local CSV file.',
    primaryButton: 'Anonymize CSV',
    overview: [
      'CSV exports can expose hundreds or thousands of records in one action. This tool parses quoted values, processes every cell locally, and generates a downloadable cleaned copy.',
      'Column names are not automatically removed because they are often necessary to understand the dataset. Review headers such as notes, address, patient_id, account, and comments even when the sample values do not match a simple pattern.'
    ],
    workflow: [
      { title: 'Duplicate the source file', text: 'Never overwrite the only copy of a business export.' },
      { title: 'Use a limited sample first', text: 'Test a few rows and confirm that delimiters, quoted values, and line breaks are preserved.' },
      { title: 'Run the anonymizer', text: 'Download the cleaned file and compare row and column counts.' },
      { title: 'Review high-risk columns', text: 'Manually inspect notes, comments, addresses, identifiers, and other organization-specific fields.' }
    ],
    safetyChecks: ['Remove unneeded columns before anonymizing', 'Check free-text cells manually', 'Confirm no formulas or alternate delimiters are required', 'Open the downloaded copy before sharing'],
    testedWith: ['comma-separated UTF-8 files', 'quoted commas', 'multiline quoted values', 'small spreadsheet exports'],
    relatedTools: ['json-pii-redactor', 'remove-pii-before-chatgpt', 'sha256-checksum'],
    relatedGuides: ['scan-csv-for-personal-information', 'client-data-redaction-examples'],
    faq: localProcessingFaq('CSV Anonymizer and PII Scanner'),
    llmSummary: 'A local CSV anonymizer that parses rows and quoted cells, masks common private values, and downloads a cleaned copy.',
    updated: '2026-07-23'
  },
  {
    kind: 'tool',
    name: 'Screenshot Redactor',
    slug: 'screenshot-redactor',
    primaryKeyword: 'screenshot redactor',
    secondaryKeywords: ['blur screenshot online without upload', 'cover private information in screenshot', 'redact image locally'],
    category: 'Image Privacy',
    mode: 'image-redactor',
    seoTitle: 'Screenshot Redactor - Cover Private Details Locally',
    metaDescription: 'Draw solid or blurred redaction boxes over screenshots locally in your browser, review visible private details, and export a flattened cleaned copy.',
    h1: 'Screenshot Redactor',
    shortDescription: 'Cover names, emails, IDs, URLs, balances, tabs, and other visible details before sharing a screenshot.',
    purpose: 'Use this for support screenshots, invoices, receipts, dashboards, browser windows, messages, and interface examples.',
    audience: ['support teams', 'developers', 'freelancers', 'content creators', 'online sellers'],
    detects: ['manual selections made by you'],
    mayMiss: ['areas you do not select', 'metadata in the original image', 'text outside the visible crop', 'details still readable through weak blur'],
    exampleUnsafe: 'A full browser screenshot showing the customer email, account ID, internal URL, open tabs, and balance.',
    exampleClean: 'A new exported image with solid covers over every private area and only the relevant interface visible.',
    interfaceHint: 'Choose an image, drag over private areas, use a solid cover for high-risk text, and download a new copy.',
    emptyState: 'Choose a PNG, JPEG, or WebP screenshot.',
    primaryButton: 'Download redacted image',
    overview: [
      'Visual redaction is safest when the output is a newly rendered image rather than a document with editable shapes layered over text. This tool draws directly onto a browser canvas and exports the rendered result.',
      'The tool does not use OCR. You are responsible for finding every sensitive area, including browser tabs, notifications, profile photos, file names, URLs, and information near the edges.'
    ],
    workflow: [
      { title: 'Crop before redacting', text: 'Remove irrelevant parts of the screen so there are fewer areas to inspect.' },
      { title: 'Cover high-risk values', text: 'Use solid boxes for credentials, account numbers, financial values, and text that must be unreadable.' },
      { title: 'Export a new image', text: 'Download the rendered copy instead of sharing the original file.' },
      { title: 'Review at full size', text: 'Zoom in and confirm no text is visible around the edges of each box.' }
    ],
    safetyChecks: ['Inspect browser tabs and address bars', 'Check notifications and profile menus', 'Cover QR codes and barcodes when private', 'Remove metadata separately when location privacy matters'],
    testedWith: ['PNG screenshots', 'JPEG photos', 'WebP images', 'solid redaction boxes', 'blurred selections'],
    relatedTools: ['remove-exif-metadata', 'view-image-metadata', 'remove-pii-before-chatgpt'],
    relatedGuides: ['redact-screenshots-before-sharing-online', 'image-metadata-privacy-checklist', 'pdf-redaction-mistakes'],
    faq: localProcessingFaq('Screenshot Redactor'),
    llmSummary: 'A local canvas-based image redactor for covering visible private details and exporting a new rendered image.',
    updated: '2026-07-23'
  },
  {
    kind: 'tool',
    name: 'JWT Privacy Checker',
    slug: 'jwt-privacy-checker',
    primaryKeyword: 'JWT privacy checker',
    secondaryKeywords: ['decode JWT locally', 'check JWT for sensitive data', 'JWT payload viewer'],
    category: 'Developer Privacy',
    mode: 'jwt-checker',
    seoTitle: 'JWT Privacy Checker - Decode Payload Locally',
    metaDescription: 'Decode JWT header and payload sections locally and review claims such as email, name, user ID, roles, tenant, issuer, and expiry.',
    h1: 'JWT Privacy Checker',
    shortDescription: 'Inspect readable JWT claims before sharing a token in logs, tickets, screenshots, or AI prompts.',
    purpose: 'Use this to understand what a token reveals. Do not use it to validate a signature or decide whether a token is trustworthy.',
    audience: ['developers', 'security reviewers', 'support engineers', 'QA teams', 'integration builders'],
    detects: ['readable JWT header', 'readable JWT payload', 'claim names that look identity- or permission-related'],
    mayMiss: ['encrypted JWE content', 'meaning hidden in custom claims', 'signature problems', 'server-side token state', 'access granted by the live token'],
    exampleUnsafe: 'A live JWT copied into a public issue because the payload was assumed to be encrypted.',
    exampleClean: 'A decoded, reviewed payload example with real claim values replaced and the live token revoked if exposed.',
    interfaceHint: 'Paste a JWT. The tool decodes the first two base64url sections locally and flags sensitive-looking claim names.',
    emptyState: 'Paste a JWT token here. Do not use a live production token unless your policy permits local inspection.',
    primaryButton: 'Decode locally',
    overview: [
      'Most signed JWTs are encoded, not encrypted. Anyone who receives the token can usually decode the header and payload without the signing key.',
      'This checker never verifies the signature and never confirms whether a token is valid, expired, revoked, or safe. Its purpose is limited to privacy review before sharing.'
    ],
    workflow: [
      { title: 'Prefer a test token', text: 'Use a non-production token whenever possible.' },
      { title: 'Decode the payload', text: 'Review identity, tenant, organization, permission, audience, and issuer claims.' },
      { title: 'Create a synthetic example', text: 'Replace real values while keeping the claim names needed for debugging.' },
      { title: 'Revoke exposed live tokens', text: 'Treat a shared access-bearing token as compromised until proven otherwise.' }
    ],
    safetyChecks: ['Do not assume signing hides the payload', 'Check custom claims as well as standard claims', 'Remove the complete token from screenshots and logs', 'Use server-side validation for trust decisions'],
    testedWith: ['three-part signed JWT strings', 'base64url header and payload sections', 'common identity claims'],
    relatedTools: ['sanitize-logs-before-chatgpt', 'json-pii-redactor', 'sha256-checksum'],
    relatedGuides: ['check-jwt-for-sensitive-data', 'redact-api-keys-before-posting-logs'],
    faq: localProcessingFaq('JWT Privacy Checker'),
    llmSummary: 'A local decoder for reviewing readable JWT header and payload claims; it does not verify signatures or token validity.',
    updated: '2026-07-23'
  },
  {
    kind: 'tool',
    name: 'URL Privacy Cleaner',
    slug: 'url-privacy-cleaner',
    primaryKeyword: 'URL privacy cleaner',
    secondaryKeywords: ['remove UTM parameters', 'remove tracking from links', 'clean URL before sharing'],
    category: 'AI Privacy',
    mode: 'url-cleaner',
    seoTitle: 'URL Privacy Cleaner - Remove Tracking Parameters',
    metaDescription: 'Remove common UTM tags, click IDs, referral parameters, email identifiers, and session-like query parameters before sharing links.',
    h1: 'URL Privacy Cleaner',
    shortDescription: 'Remove common marketing and personal query parameters while preserving the destination URL.',
    purpose: 'Use this for links copied from newsletters, ads, social platforms, dashboards, search results, and support systems.',
    audience: ['writers', 'marketers', 'researchers', 'support teams', 'privacy-conscious users'],
    detects: ['utm parameters', 'gclid and related ad click IDs', 'fbclid', 'msclkid', 'common referral parameters', 'email and user query parameters', 'session-like query parameters', 'URL fragments'],
    mayMiss: ['tracking encoded in the path', 'short-link redirects', 'site-specific parameter names', 'server-side or fingerprinting-based tracking'],
    exampleUnsafe: 'https://example.com/page?utm_source=newsletter&email=ali@example.com&gclid=abc123&id=55',
    exampleClean: 'https://example.com/page?id=55',
    interfaceHint: 'Paste one or more links or text containing links. The tool removes common tracking parameters and keeps unknown parameters.',
    emptyState: 'Paste URLs here, one per line or inside normal text.',
    primaryButton: 'Clean URLs',
    overview: [
      'Tracking parameters can reveal which campaign, email, advertisement, or user flow produced a link. Removing them makes shared URLs shorter and reduces unnecessary disclosure.',
      'The cleaner intentionally keeps unknown parameters because some are required for the destination page to work. Review remaining values such as document IDs, invite codes, and private dashboard references.'
    ],
    workflow: [
      { title: 'Paste the copied link', text: 'You can process one URL, multiple lines, or text containing links.' },
      { title: 'Remove known tracking fields', text: 'The tool deletes common campaign, click, referral, email, user, and session parameters.' },
      { title: 'Test the destination', text: 'Open the cleaned link in a private window and confirm the intended page still loads.' },
      { title: 'Review remaining identifiers', text: 'Remove document, invitation, account, or access values when they are not safe to share.' }
    ],
    safetyChecks: ['Do not publish private invite links', 'Check path segments as well as query parameters', 'Treat signed URLs as access credentials', 'Test the cleaned URL before distributing it'],
    testedWith: ['HTTP and HTTPS links', 'multiple links in text', 'UTM tags', 'common advertising click IDs'],
    relatedTools: ['remove-pii-before-chatgpt', 'sha256-checksum', 'sanitize-logs-before-chatgpt'],
    relatedGuides: ['what-are-utm-parameters', 'what-not-to-paste-into-chatgpt'],
    faq: localProcessingFaq('URL Privacy Cleaner'),
    llmSummary: 'A local link cleaner that removes common tracking and personal query parameters while preserving unknown destination parameters.',
    updated: '2026-07-23'
  },
  {
    kind: 'tool',
    name: 'Remove EXIF Metadata',
    slug: 'remove-exif-metadata',
    primaryKeyword: 'remove EXIF metadata',
    secondaryKeywords: ['remove GPS from photo', 'strip image metadata', 'remove photo location data'],
    category: 'Image Privacy',
    mode: 'image-metadata-remover',
    seoTitle: 'Remove EXIF and GPS Metadata From Photos Locally',
    metaDescription: 'Re-encode JPEG, PNG, or WebP images locally to create a fresh copy without common EXIF, GPS, camera, author, software, and text metadata.',
    h1: 'Remove EXIF and GPS Metadata From Photos',
    shortDescription: 'Create a new pixel-only image copy in your browser before uploading or sharing a photo.',
    purpose: 'Use this for photos from phones, cameras, design tools, or messaging apps when location, camera, author, or software metadata should not travel with the file.',
    audience: ['photographers', 'online sellers', 'job seekers', 'bloggers', 'privacy-conscious users'],
    detects: ['file type and size', 'image dimensions', 'whether the browser can decode the image'],
    mayMiss: ['information visible in the pixels', 'faces, signs, addresses, and reflections', 'unsupported image formats', 'metadata in a non-image wrapper or archive'],
    exampleUnsafe: 'An original phone photo that may include GPS coordinates, capture time, device model, editing software, and embedded comments.',
    exampleClean: 'A newly rendered JPEG, PNG, or WebP copy containing the visible pixels without the original EXIF block.',
    interfaceHint: 'Choose a JPEG, PNG, or WebP image. The browser decodes the pixels and exports a newly rendered copy.',
    emptyState: 'Choose a JPEG, PNG, or WebP photo.',
    primaryButton: 'Create clean image',
    overview: [
      'EXIF and related metadata can store camera details, timestamps, orientation, software names, copyright text, and sometimes GPS coordinates. This tool removes the original metadata by decoding the visible image and creating a new browser-rendered file.',
      'Re-encoding can change file size and, for JPEG or WebP, can slightly change compression quality. The visible image itself may still reveal location or identity, so inspect the pixels as well as the metadata.'
    ],
    workflow: [
      { title: 'Choose the original image', text: 'The file stays in the browser for the normal workflow.' },
      { title: 'Review the preview and dimensions', text: 'Confirm the browser has applied orientation correctly and the visible content is safe.' },
      { title: 'Create a new copy', text: 'The canvas export discards the original metadata blocks and writes a new image.' },
      { title: 'Verify before deleting the original', text: 'Open the downloaded copy and use the metadata viewer to confirm the result.' }
    ],
    safetyChecks: ['Check visible street signs and screens', 'Use the screenshot redactor for private pixels', 'Keep the original until the clean copy is verified', 'Do not assume social platforms always remove metadata'],
    testedWith: ['JPEG images', 'PNG images', 'WebP images', 'phone-photo orientation handled by modern browsers'],
    relatedTools: ['view-image-metadata', 'screenshot-redactor', 'sha256-checksum'],
    relatedGuides: ['how-to-check-photo-gps', 'remove-exif-metadata-before-uploading', 'image-metadata-privacy-checklist'],
    faq: localProcessingFaq('Remove EXIF Metadata'),
    llmSummary: 'A local image re-encoder that creates a new JPEG, PNG, or WebP copy without the original metadata blocks.',
    updated: '2026-07-23'
  },
  {
    kind: 'tool',
    name: 'View Image Metadata',
    slug: 'view-image-metadata',
    primaryKeyword: 'view image metadata',
    secondaryKeywords: ['check photo GPS data', 'EXIF viewer browser', 'see photo location metadata'],
    category: 'Image Privacy',
    mode: 'image-metadata-viewer',
    seoTitle: 'View Image Metadata and Check Photo GPS Locally',
    metaDescription: 'Inspect common JPEG EXIF and GPS fields, PNG text chunks, WebP metadata flags, dimensions, type, and file size locally in your browser.',
    h1: 'View Image Metadata and Check Photo GPS',
    shortDescription: 'Inspect common metadata fields before sharing a photo, without uploading it for server-side analysis.',
    purpose: 'Use this to check whether an image contains GPS coordinates, camera details, timestamps, software names, copyright text, or embedded comments.',
    audience: ['photographers', 'journalists', 'online sellers', 'developers', 'privacy-conscious users'],
    detects: ['basic file information', 'image dimensions', 'common JPEG EXIF fields', 'JPEG GPS coordinates when readable', 'PNG text and EXIF chunks', 'WebP EXIF and XMP chunk presence'],
    mayMiss: ['manufacturer-specific maker notes', 'encrypted or malformed metadata', 'metadata in unsupported formats', 'all possible XMP, IPTC, or ICC fields'],
    exampleUnsafe: 'A photo appears ordinary, but the EXIF block contains exact latitude and longitude plus the capture time and phone model.',
    exampleClean: 'The metadata report shows no readable GPS coordinates or embedded EXIF block after a clean copy is created.',
    interfaceHint: 'Choose a JPEG, PNG, or WebP image. The browser reads common metadata structures and shows a local report.',
    emptyState: 'Choose an image to inspect locally.',
    primaryButton: 'Inspect metadata',
    overview: [
      'Metadata is not always visible in normal photo viewers. A file can look harmless while carrying location coordinates, device details, timestamps, editing software, or author information.',
      'This lightweight viewer focuses on common privacy-relevant fields. It is not a forensic parser and may not display every manufacturer-specific or embedded metadata format.'
    ],
    workflow: [
      { title: 'Choose the exact file you will share', text: 'Messaging and editing apps may create copies with different metadata.' },
      { title: 'Inspect the local report', text: 'Pay special attention to GPS coordinates, dates, device model, software, artist, copyright, and comments.' },
      { title: 'Create a clean copy if needed', text: 'Use the metadata remover, then inspect the downloaded output again.' },
      { title: 'Review visible content', text: 'Metadata removal does not hide faces, signs, screens, documents, or location clues in the pixels.' }
    ],
    safetyChecks: ['Check GPS latitude and longitude', 'Check capture date and time', 'Check camera and phone model', 'Check author, software, comments, and copyright fields'],
    testedWith: ['common JPEG EXIF blocks', 'JPEG GPS IFD data', 'PNG text chunks', 'WebP EXIF/XMP chunk flags'],
    relatedTools: ['remove-exif-metadata', 'screenshot-redactor', 'sha256-checksum'],
    relatedGuides: ['how-to-check-photo-gps', 'what-is-exif-data', 'image-metadata-privacy-checklist'],
    faq: localProcessingFaq('View Image Metadata'),
    llmSummary: 'A local image metadata viewer for common JPEG EXIF and GPS fields, PNG metadata chunks, WebP flags, dimensions, and file details.',
    updated: '2026-07-23'
  },
  {
    kind: 'tool',
    name: 'SHA-256 File Checksum',
    slug: 'sha256-checksum',
    primaryKeyword: 'SHA-256 checksum tool',
    secondaryKeywords: ['verify file SHA-256', 'calculate file hash locally', 'browser SHA256 checker'],
    category: 'File Verification',
    mode: 'sha256-checksum',
    seoTitle: 'SHA-256 File Checksum - Calculate Hash Locally',
    metaDescription: 'Calculate a SHA-256 checksum for a local file in your browser, copy the 64-character result, and compare it with a trusted published hash.',
    h1: 'SHA-256 File Checksum',
    shortDescription: 'Calculate a local file fingerprint for download verification and change detection.',
    purpose: 'Use this to compare a downloaded file with a checksum published by the software vendor or to confirm two files are byte-for-byte identical.',
    audience: ['developers', 'software users', 'researchers', 'IT teams', 'security-conscious users'],
    detects: ['the SHA-256 digest of the selected file bytes'],
    mayMiss: ['whether the publisher itself is trustworthy', 'malware in a file whose malicious hash was published', 'changes after the hash is calculated'],
    exampleUnsafe: 'A downloaded installer is opened without checking the checksum even though the vendor provides a SHA-256 value.',
    exampleClean: 'The locally calculated hash exactly matches the value copied from the vendor over a trusted channel.',
    interfaceHint: 'Choose a file. The browser reads the bytes locally and calculates a lowercase hexadecimal SHA-256 digest.',
    emptyState: 'Choose a file to calculate its SHA-256 checksum.',
    primaryButton: 'Calculate SHA-256',
    overview: [
      'A SHA-256 checksum is a deterministic fingerprint of file contents. Changing even one byte normally produces a different digest, which makes hashes useful for integrity checks.',
      'A matching hash proves only that your file matches the bytes represented by the comparison hash. It does not prove the file is safe unless the expected hash came from a trusted source.'
    ],
    workflow: [
      { title: 'Get the expected hash safely', text: 'Copy it from the official vendor page, signed release notes, or another trusted channel.' },
      { title: 'Select the downloaded file', text: 'The browser calculates the digest from the local file bytes.' },
      { title: 'Compare every character', text: 'Hashes must match exactly; uppercase and lowercase hex are equivalent.' },
      { title: 'Investigate a mismatch', text: 'Download again from the official source or contact the publisher before opening the file.' }
    ],
    safetyChecks: ['Use a trusted expected hash', 'Compare the complete 64-character value', 'Recalculate after any file modification', 'Do not treat a hash match as malware scanning'],
    testedWith: ['small documents', 'images', 'archives', 'software installers within browser memory limits'],
    relatedTools: ['view-image-metadata', 'remove-exif-metadata', 'url-privacy-cleaner'],
    relatedGuides: ['verify-download-sha256-checksum', 'no-upload-file-tools-explained'],
    faq: localProcessingFaq('SHA-256 File Checksum'),
    llmSummary: 'A browser-only SHA-256 calculator for verifying local file integrity against a trusted expected checksum.',
    updated: '2026-07-23'
  }
];

export function getTool(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}
