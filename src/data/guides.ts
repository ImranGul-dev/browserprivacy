export type GuideCategory = 'AI Privacy' | 'Developer Privacy' | 'Data Privacy' | 'Image Privacy' | 'PDF Privacy' | 'File Privacy';

export interface GuideSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface GuidePage {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  category: GuideCategory;
  intro: string;
  quickAnswer: string;
  sections: GuideSection[];
  checklist?: string[];
  relatedTools: string[];
  relatedGuides: string[];
  published: string;
  updated: string;
  readingTime: string;
}

export const guides: GuidePage[] = [
  {
    slug: 'what-not-to-paste-into-chatgpt',
    title: 'What Not to Paste Into ChatGPT',
    seoTitle: 'What Not to Paste Into ChatGPT: Practical Privacy Checklist',
    metaDescription: 'Learn which personal, business, developer, medical, legal, and access-related details to remove before pasting content into ChatGPT.',
    primaryKeyword: 'what not to paste into ChatGPT',
    category: 'AI Privacy',
    intro: 'ChatGPT can help with writing, debugging, summarizing, and planning, but a useful prompt can accidentally include far more private information than the task requires.',
    quickAnswer: 'Do not paste passwords, API keys, live tokens, private keys, full customer records, payment details, medical records, confidential legal material, unpublished business information, or identifying details that the AI does not need. Use placeholders and share the smallest useful excerpt.',
    sections: [
      {
        heading: 'Remove direct personal identifiers',
        paragraphs: [
          'Names, personal email addresses, phone numbers, home addresses, government identifiers, signatures, account numbers, and exact dates can identify a person directly. Replace them with consistent labels such as [CLIENT], [EMAIL], [PHONE], or [ACCOUNT_ID].',
          'A name is not the only identifier. A small combination such as employer, job title, town, date, and unusual event may identify someone even after the name is removed.'
        ]
      },
      {
        heading: 'Never paste access-bearing secrets',
        paragraphs: [
          'Passwords, API keys, Bearer tokens, session cookies, database URLs, private keys, recovery codes, signed links, and live JWTs can provide access rather than merely reveal information. Remove the complete value, not only part of it.',
          'If a real credential was already pasted into an unapproved place, rotate or revoke it. Editing the message later does not reliably undo the exposure.'
        ]
      },
      {
        heading: 'Reduce business and client context',
        paragraphs: [
          'Private contracts, pricing, customer lists, internal roadmaps, unreleased features, legal strategy, employee issues, and incident details may remain confidential even when personal identifiers are removed.',
          'Describe the type of problem rather than the real organization. For example, replace a client name with [CLIENT_A] and exact revenue with a broad range when the precise figure is unnecessary.'
        ]
      },
      {
        heading: 'Use a minimum-necessary workflow',
        paragraphs: [
          'Start with the question you need answered, then include only the smallest excerpt required to answer it. Remove quoted email history, signatures, unrelated spreadsheet columns, hidden document comments, and screenshots unless they are essential.',
          'Run a local first-pass redaction, then read the final prompt as if it were public. If a detail would be uncomfortable in a public issue tracker, ask whether it belongs in the prompt.'
        ]
      }
    ],
    checklist: ['No passwords, tokens, cookies, or private keys', 'No unnecessary names, contact details, addresses, or IDs', 'No confidential customer, employee, legal, medical, or financial records', 'No internal links, signed URLs, or unpublished business plans', 'Only the smallest useful excerpt is included'],
    relatedTools: ['remove-pii-before-chatgpt', 'sanitize-logs-before-chatgpt'],
    relatedGuides: ['how-to-anonymize-text-before-using-ai', 'client-data-redaction-examples'],
    published: '2026-06-24',
    updated: '2026-07-23',
    readingTime: '7 min read'
  },
  {
    slug: 'how-to-anonymize-text-before-using-ai',
    title: 'How to Anonymize Text Before Using AI',
    seoTitle: 'How to Anonymize Text Before Using AI: Step-by-Step',
    metaDescription: 'A step-by-step method for replacing names, contact details, account IDs, and indirect identifiers before sharing text with AI tools.',
    primaryKeyword: 'anonymize text before using AI',
    category: 'AI Privacy',
    intro: 'Good anonymization keeps the facts needed for the task while removing details that identify a person, account, client, or organization.',
    quickAnswer: 'Copy only the necessary text, replace direct identifiers with consistent placeholders, generalize indirect clues, remove secrets and private links, then review the cleaned version manually before using an AI tool.',
    sections: [
      {
        heading: 'Step 1: Identify the purpose of the prompt',
        paragraphs: [
          'Write down what the AI needs to do: summarize a complaint, improve wording, debug an error, classify feedback, or explain a concept. This makes it easier to distinguish useful context from unnecessary private detail.',
          'If the task is to improve tone, the AI usually does not need real names, phone numbers, customer IDs, signatures, or the full message history.'
        ]
      },
      {
        heading: 'Step 2: Replace direct identifiers consistently',
        paragraphs: [
          'Use stable placeholders such as [CUSTOMER_A], [AGENT_B], [EMAIL], [ORDER_ID], and [DATE]. Consistency preserves relationships in the text without exposing the original values.',
          'Avoid replacing every value with the same word. If two different customers appear, use two different labels so the model can still follow the conversation.'
        ]
      },
      {
        heading: 'Step 3: Generalize indirect identifiers',
        paragraphs: [
          'Exact age, rare job title, small location, distinctive incident, precise salary, uncommon diagnosis, or exact event date can identify someone indirectly. Change these to broader but truthful descriptions when precision is not required.',
          'For example, replace a specific town with [REGION], an exact date with [MONTH], and an exact amount with an approximate range.'
        ]
      },
      {
        heading: 'Step 4: Review meaning and re-identification risk',
        paragraphs: [
          'Read the output without looking at the original. Confirm the task remains understandable and that no combination of clues points back to a real person or organization.',
          'An automated redactor is only a first pass. Human review is essential for context, relationships, and unusual identifiers.'
        ]
      }
    ],
    checklist: ['Placeholders are consistent', 'Quoted history and signatures are removed', 'Exact dates and locations are generalized when possible', 'Secrets and access links are removed completely', 'The cleaned text still answers the intended task'],
    relatedTools: ['remove-pii-before-chatgpt'],
    relatedGuides: ['what-not-to-paste-into-chatgpt', 'client-data-redaction-examples'],
    published: '2026-06-24',
    updated: '2026-07-23',
    readingTime: '6 min read'
  },
  {
    slug: 'sanitize-error-logs-before-sharing',
    title: 'How to Sanitize Error Logs Before Sharing',
    seoTitle: 'How to Sanitize Error Logs Before Sharing With AI or Support',
    metaDescription: 'Remove API keys, tokens, customer data, IP addresses, file paths, internal hosts, and private URLs before sharing error logs.',
    primaryKeyword: 'sanitize error logs before sharing',
    category: 'Developer Privacy',
    intro: 'Logs are useful because they contain detailed context, but the same detail can expose credentials, customer records, internal systems, and developer environments.',
    quickAnswer: 'Copy the smallest relevant time window, remove credentials and session data first, mask customer identifiers and infrastructure details, preserve the error message and useful stack frames, then review the sanitized copy before posting it.',
    sections: [
      {
        heading: 'Start with secrets and authentication data',
        paragraphs: [
          'Search for Authorization, Bearer, token, secret, password, cookie, session, api_key, client_secret, database_url, and connection_string. Also look for vendor-specific prefixes and long random values.',
          'Do not preserve a few visible characters of a live secret unless your security process explicitly permits it. A fully replaced [SECRET] value is safer for public examples.'
        ]
      },
      {
        heading: 'Remove customer and employee identifiers',
        paragraphs: [
          'Logs may include email addresses, usernames, account IDs, order numbers, IP addresses, request bodies, query strings, and user-entered text. Replace them consistently so the sequence of events remains understandable.',
          'Be especially careful with bulk logs. A single export may contain information for many users, not only the user connected to the visible error.'
        ]
      },
      {
        heading: 'Preserve debugging value',
        paragraphs: [
          'Keep the exception type, message, package versions, status code, request method, safe timestamps, and relevant stack frames. Remove unrelated entries and repetitive noise.',
          'If a path is useful, replace the user-specific part. For example, change /Users/alice/private-project/file.js to /Users/[USER]/[PROJECT]/file.js.'
        ]
      },
      {
        heading: 'Respond to actual exposure',
        paragraphs: [
          'Sanitizing a future copy does not secure a credential already posted in a ticket, chat, repository, or AI prompt. Revoke or rotate it and inspect access logs when appropriate.',
          'Document where the value was shared and follow your incident process. Deleting a message may reduce visibility but should not be treated as credential rotation.'
        ]
      }
    ],
    checklist: ['Credentials and cookies are fully removed', 'Request and response bodies are checked', 'User paths and internal hosts are masked', 'Only the relevant time window remains', 'Exposed secrets have been rotated'],
    relatedTools: ['sanitize-logs-before-chatgpt', 'jwt-privacy-checker'],
    relatedGuides: ['redact-api-keys-before-posting-logs', 'check-jwt-for-sensitive-data'],
    published: '2026-06-25',
    updated: '2026-07-23',
    readingTime: '7 min read'
  },
  {
    slug: 'redact-api-keys-before-posting-logs',
    title: 'How to Redact API Keys Before Posting Logs',
    seoTitle: 'How to Redact API Keys, Tokens, and Secrets From Logs',
    metaDescription: 'Find, remove, rotate, and safely replace API keys, Bearer tokens, passwords, JWTs, private keys, and connection strings in logs.',
    primaryKeyword: 'redact API keys before posting logs',
    category: 'Developer Privacy',
    intro: 'A credential inside a log can turn a debugging question into an account compromise, unexpected bill, data leak, or service interruption.',
    quickAnswer: 'Replace the complete credential with [SECRET], keep only the variable or header name needed for context, rotate any value that was exposed, and check screenshots, command history, and attached files for additional copies.',
    sections: [
      {
        heading: 'Know where secrets appear',
        paragraphs: [
          'Secrets appear in environment variables, Authorization headers, command-line arguments, database URLs, webhook signatures, cloud configuration, build output, request dumps, and exception messages.',
          'Some values are obvious because the key name says password or token. Others are only recognizable by a provider-specific prefix or by their length and randomness.'
        ]
      },
      {
        heading: 'Keep the label, remove the value',
        paragraphs: [
          'For troubleshooting, the location of a secret is often useful while the secret itself is not. Keep text such as Authorization: Bearer [SECRET] or API_KEY=[SECRET].',
          'Avoid partial masking in public content. Showing the first or last characters can help internal identification, but it also creates unnecessary exposure and may reveal which service issued the key.'
        ]
      },
      {
        heading: 'Rotate instead of relying on deletion',
        paragraphs: [
          'Once a real secret leaves an approved location, assume it may have been copied. Revoke it, create a replacement, update dependent services, and verify that old access no longer works.',
          'Check repository history, CI logs, ticket attachments, chat exports, screenshots, and copied commands. The same credential may exist in more than one place.'
        ]
      },
      {
        heading: 'Use synthetic examples for support',
        paragraphs: [
          'A minimal reproduction should use fake credentials that cannot access anything. Preserve the character class or approximate shape only when the format itself is relevant to the bug.',
          'For example, use sk_test_[REDACTED] rather than a real production key. Explain the provider and environment separately.'
        ]
      }
    ],
    checklist: ['Authorization headers checked', 'Environment and connection strings checked', 'Screenshots and attachments checked', 'Exposed values revoked', 'Examples use non-working synthetic secrets'],
    relatedTools: ['sanitize-logs-before-chatgpt', 'jwt-privacy-checker'],
    relatedGuides: ['sanitize-error-logs-before-sharing', 'check-jwt-for-sensitive-data'],
    published: '2026-06-25',
    updated: '2026-07-23',
    readingTime: '6 min read'
  },
  {
    slug: 'mask-json-before-sharing-with-support',
    title: 'How to Mask JSON Before Sharing With Support',
    seoTitle: 'Mask JSON Before Sharing With Support: Privacy Guide',
    metaDescription: 'Keep JSON valid while masking emails, names, IDs, tokens, passwords, addresses, customer records, and sensitive nested values.',
    primaryKeyword: 'mask JSON before sharing',
    category: 'Data Privacy',
    intro: 'Support teams often need the structure of an API response, but they usually do not need the real people, accounts, credentials, or transactions inside it.',
    quickAnswer: 'Use a small representative payload, recursively mask sensitive keys and values, preserve valid JSON and data types, inspect every array item, and confirm no private data remains in strings or URLs.',
    sections: [
      {
        heading: 'Reduce the payload before masking',
        paragraphs: [
          'Remove unrelated branches, repeated records, binary content, and fields that do not contribute to the issue. Smaller examples are easier to review and less likely to leak information.',
          'Keep enough nesting to demonstrate the problem. Replacing the entire object with a flat summary may remove the structure the support team needs.'
        ]
      },
      {
        heading: 'Mask keys and values recursively',
        paragraphs: [
          'Review keys such as name, email, phone, address, password, token, secret, access_token, refresh_token, user_id, customer_id, patient_id, account, and notes.',
          'Arrays require special care because they may contain hundreds of records. A clean first object does not mean later objects are safe.'
        ]
      },
      {
        heading: 'Preserve useful data types',
        paragraphs: [
          'When the type matters, replace a string with another string, a number with a safe example number, and a timestamp with a synthetic timestamp. This prevents the redaction itself from changing application behavior.',
          'Use consistent placeholder IDs when relationships matter. If order.customer_id refers to customer.id, both should use the same synthetic value.'
        ]
      },
      {
        heading: 'Validate the final example',
        paragraphs: [
          'Parse the output again to confirm it remains valid JSON. Then search for @ signs, long tokens, URLs, names, IDs, and organization-specific fields.',
          'Treat embedded JSON strings as a separate document. They may contain another layer of private data that a normal object walk will not parse.'
        ]
      }
    ],
    checklist: ['Payload reduced to a minimal sample', 'Nested objects and every array item reviewed', 'Tokens and passwords fully replaced', 'Relationships use consistent synthetic IDs', 'Output parses as valid JSON'],
    relatedTools: ['json-pii-redactor', 'sanitize-logs-before-chatgpt'],
    relatedGuides: ['client-data-redaction-examples', 'sanitize-error-logs-before-sharing'],
    published: '2026-06-26',
    updated: '2026-07-23',
    readingTime: '6 min read'
  },
  {
    slug: 'scan-csv-for-personal-information',
    title: 'How to Scan a CSV for Personal Information',
    seoTitle: 'How to Scan and Anonymize a CSV Before Sharing',
    metaDescription: 'Review CSV headers, sample values, free-text columns, IDs, emails, phone numbers, and exports before sharing spreadsheet data.',
    primaryKeyword: 'scan CSV for personal information',
    category: 'Data Privacy',
    intro: 'A CSV looks simple, but one export can expose thousands of customers, employees, patients, subscribers, or transactions.',
    quickAnswer: 'Work on a copy, remove unnecessary columns and rows, scan both headers and values, anonymize direct and indirect identifiers, verify row and column counts, and open the cleaned file before sharing it.',
    sections: [
      {
        heading: 'Classify the columns first',
        paragraphs: [
          'Flag obvious columns such as name, email, phone, address, account_id, customer_id, employee_id, patient_id, date_of_birth, IP address, notes, and comments.',
          'Do not assume generic headers are safe. A column called value, text, response, or metadata may contain complete messages or nested records.'
        ]
      },
      {
        heading: 'Inspect representative values',
        paragraphs: [
          'Look across the whole file or a statistically useful sample, not only the first few rows. Sensitive data may appear only in exceptions, notes, rejected records, or older entries.',
          'Search for email patterns, international phone formats, URLs, dates, long IDs, postal addresses, and free-text descriptions.'
        ]
      },
      {
        heading: 'Choose deletion, masking, or generalization',
        paragraphs: [
          'Delete a column when it is unnecessary. Mask values when the field location matters. Generalize ages, dates, locations, and amounts when analysis needs a category rather than an exact value.',
          'Consistent pseudonyms preserve grouping but may still enable re-identification when combined with other data. Use them carefully.'
        ]
      },
      {
        heading: 'Verify the exported copy',
        paragraphs: [
          'Compare headers, row count, delimiter, quoting, encoding, and line breaks with the source. Open the cleaned file in a spreadsheet application and inspect random rows.',
          'Keep the original in an approved location and share only the verified anonymized copy.'
        ]
      }
    ],
    checklist: ['Unnecessary columns removed', 'Free-text columns reviewed manually', 'All rows or a meaningful sample scanned', 'Quoted commas and line breaks preserved', 'Clean copy opened and checked'],
    relatedTools: ['csv-anonymizer', 'sha256-checksum'],
    relatedGuides: ['client-data-redaction-examples', 'how-to-anonymize-text-before-using-ai'],
    published: '2026-06-26',
    updated: '2026-07-23',
    readingTime: '7 min read'
  },
  {
    slug: 'redact-screenshots-before-sharing-online',
    title: 'How to Redact Screenshots Before Sharing Online',
    seoTitle: 'Redact Screenshots Safely Before Sharing Online',
    metaDescription: 'Check browser tabs, URLs, names, account IDs, notifications, balances, QR codes, and hidden context before sharing screenshots.',
    primaryKeyword: 'redact screenshots before sharing',
    category: 'Image Privacy',
    intro: 'Screenshots often reveal private information outside the area you intended to show, especially around the edges of the screen.',
    quickAnswer: 'Crop to the necessary area, use solid covers for high-risk text, inspect tabs and notifications, export a newly rendered image, remove metadata if needed, and review the final copy at full size.',
    sections: [
      {
        heading: 'Inspect the edges before the center',
        paragraphs: [
          'Check browser tabs, bookmarks, URL bars, side navigation, file names, desktop icons, account menus, notifications, and profile photos. These areas are easy to overlook because they are not the subject of the screenshot.',
          'On phones, inspect the status bar, contact name, message previews, location indicators, and other open conversations.'
        ]
      },
      {
        heading: 'Prefer solid covers for sensitive text',
        paragraphs: [
          'Blur can leave letter shapes, short values, QR patterns, or account endings recognizable. Use an opaque solid cover for passwords, recovery codes, financial values, personal IDs, and access links.',
          'Make each cover slightly larger than the text. Thin edges can expose characters when the image is viewed at full resolution.'
        ]
      },
      {
        heading: 'Export a new rendered image',
        paragraphs: [
          'Do not rely on editable rectangles layered over a document or design file. Export a flattened image so the covered pixels are part of the output.',
          'Keep the original private. Share the downloaded redacted copy, then reopen that exact file to verify it.'
        ]
      },
      {
        heading: 'Remember metadata and visual clues',
        paragraphs: [
          'A screenshot or photo can contain metadata such as capture time, software, or location. Re-encoding through a canvas usually removes the original metadata, but verify important files with a metadata viewer.',
          'Visible details such as faces, window reflections, addresses, documents, maps, and background screens require separate review.'
        ]
      }
    ],
    checklist: ['Tabs, URLs, menus, and notifications checked', 'Solid cover used for high-risk values', 'QR codes and barcodes reviewed', 'New flattened copy exported', 'Final file reviewed at full size'],
    relatedTools: ['screenshot-redactor', 'remove-exif-metadata', 'view-image-metadata'],
    relatedGuides: ['image-metadata-privacy-checklist', 'pdf-redaction-mistakes'],
    published: '2026-06-27',
    updated: '2026-07-23',
    readingTime: '6 min read'
  },
  {
    slug: 'check-jwt-for-sensitive-data',
    title: 'How to Check a JWT for Sensitive Data',
    seoTitle: 'How to Check a JWT for Sensitive Data Before Sharing',
    metaDescription: 'Decode JWT header and payload sections locally and review identity, role, tenant, organization, issuer, audience, and custom claims.',
    primaryKeyword: 'check JWT for sensitive data',
    category: 'Developer Privacy',
    intro: 'A signed JWT is usually readable by anyone who receives it. A signature protects integrity; it does not normally hide the payload.',
    quickAnswer: 'Decode the token locally, review standard and custom claims, never post a live access token, create a synthetic payload example, and revoke any real token shared outside an approved system.',
    sections: [
      {
        heading: 'Encoding is not encryption',
        paragraphs: [
          'The header and payload of a common signed JWT are base64url encoded. They can usually be decoded without the signing key. The signature allows a verifier to detect changes, but it does not make the claims confidential.',
          'Encrypted JWTs, often called JWE, are different. A simple three-part decoder does not inspect encrypted content.'
        ]
      },
      {
        heading: 'Review identity and authorization claims',
        paragraphs: [
          'Look for sub, email, name, phone, user_id, account_id, tenant, organization, roles, permissions, groups, issuer, audience, and custom application fields.',
          'Even values that look random may map directly to a user or customer record in your system.'
        ]
      },
      {
        heading: 'Do not share live tokens',
        paragraphs: [
          'A token may grant access until it expires or is revoked. Redacting only the payload after posting the complete token does not remove the access risk.',
          'Use a fabricated token or share only a cleaned decoded payload when the claim structure is the issue.'
        ]
      },
      {
        heading: 'Separate privacy review from validation',
        paragraphs: [
          'A local decoder does not verify the signature, issuer, audience, expiry, revocation, key rotation, or server-side authorization rules.',
          'Use the official application or server library for validation. Use the privacy checker only to understand what the readable token reveals.'
        ]
      }
    ],
    checklist: ['No live production token is shared', 'Custom claims reviewed', 'Identity and permission claims masked', 'Exposed tokens revoked', 'Server-side validation used for trust decisions'],
    relatedTools: ['jwt-privacy-checker', 'sanitize-logs-before-chatgpt'],
    relatedGuides: ['redact-api-keys-before-posting-logs', 'sanitize-error-logs-before-sharing'],
    published: '2026-06-27',
    updated: '2026-07-23',
    readingTime: '5 min read'
  },
  {
    slug: 'client-data-redaction-examples',
    title: 'Client Data Redaction Examples',
    seoTitle: 'Client Data Redaction Examples for Emails, Tickets, and Reports',
    metaDescription: 'See before-and-after examples for cleaning client emails, support tickets, reports, logs, JSON, and screenshots before external sharing.',
    primaryKeyword: 'client data redaction examples',
    category: 'Data Privacy',
    intro: 'Effective redaction removes the real identity and access risk while preserving the relationships and facts needed to understand the task.',
    quickAnswer: 'Use descriptive placeholders, keep them consistent, remove unnecessary context, and verify that the cleaned example still explains the problem without identifying the client or granting access.',
    sections: [
      {
        heading: 'Client email example',
        paragraphs: [
          'Unsafe: “Jane Miller at jane@northwind.example says invoice INV-921 for $28,450 is wrong. Call +1 415 555 0198.”',
          'Clean: “[CLIENT_CONTACT] at [EMAIL] says invoice [INVOICE_ID] for [AMOUNT] is wrong. Call [PHONE].” The problem remains clear without the real identity or contact details.'
        ]
      },
      {
        heading: 'Support ticket example',
        paragraphs: [
          'Unsafe: “Customer CUST-3901 from IP 203.0.113.9 cannot access https://admin.example.com/users/8821.”',
          'Clean: “Customer [CUSTOMER_ID] from [IP] cannot access [INTERNAL_URL].” If the path shape matters, use a synthetic path such as /users/[USER_ID].'
        ]
      },
      {
        heading: 'JSON and log example',
        paragraphs: [
          'Unsafe: {"email":"user@example.com","token":"live-secret","order":"ORD-8821"}.',
          'Clean: {"email":"[EMAIL]","token":"[SECRET]","order":"[ORDER_ID]"}. Keep valid JSON and preserve field names only when they are safe and relevant.'
        ]
      },
      {
        heading: 'Screenshot example',
        paragraphs: [
          'Crop the screenshot to the relevant interface, cover the account menu, email, ID, balance, internal URL, and open browser tabs, then export a flattened copy.',
          'Inspect the downloaded file rather than relying on the editor preview. The shared artifact is what must be safe.'
        ]
      },
      {
        heading: 'Preserve relationships without preserving identities',
        paragraphs: [
          'A useful redaction keeps roles and relationships consistent. Use [CLIENT_A] and [CLIENT_B] when two clients appear, [ORDER_1] when an order is referenced several times, and broad labels such as [MONTH] or [REGION] when the exact date or location is unnecessary.',
          'Read the cleaned example from beginning to end. A remaining domain name, project codename, unusual amount, job title, file path, or quoted signature may reconnect the placeholders to the real client even when obvious contact details are gone.'
        ]
      }
    ],
    checklist: ['Placeholders describe the data type', 'Different entities use different labels', 'Access-bearing values are fully removed', 'The example remains technically useful', 'The final shared artifact is reviewed'],
    relatedTools: ['remove-pii-before-chatgpt', 'json-pii-redactor', 'screenshot-redactor'],
    relatedGuides: ['how-to-anonymize-text-before-using-ai', 'mask-json-before-sharing-with-support'],
    published: '2026-06-28',
    updated: '2026-07-23',
    readingTime: '5 min read'
  },
  {
    slug: 'how-browser-only-privacy-tools-work',
    title: 'How Browser-Only Privacy Tools Work',
    seoTitle: 'How Browser-Only Privacy Tools Work and Their Limits',
    metaDescription: 'Understand local JavaScript processing, browser file access, canvas image export, hashing, network limits, and manual-review requirements.',
    primaryKeyword: 'browser-only privacy tools',
    category: 'File Privacy',
    intro: 'Browser-only tools process selected content with code running on your device, but “local” does not remove every privacy or security risk.',
    quickAnswer: 'The website sends JavaScript to your browser, then that code reads pasted text or files you select and produces a result locally. You should still verify the site, inspect network behavior when necessary, review output, and follow organizational policy.',
    sections: [
      {
        heading: 'What local processing means',
        paragraphs: [
          'Textareas, FileReader, ArrayBuffer, Canvas, Web Crypto, and other browser APIs can process data without sending the selected content to an application server. The browser still downloads the page code, styles, and scripts from the website.',
          'A privacy claim should describe the specific workflow rather than imply the browser is offline. Network requests for fonts, analytics, ads, or other resources may still occur unless the site avoids them.'
        ]
      },
      {
        heading: 'How different tools work',
        paragraphs: [
          'Text tools use pattern matching and parsing. Image tools can decode pixels into a canvas and export a newly rendered image. Hash tools pass file bytes to the Web Crypto API. Metadata viewers inspect known binary structures.',
          'Each method has limits. Pattern matching cannot understand every context, and lightweight parsers cannot read every proprietary metadata format.'
        ]
      },
      {
        heading: 'How to verify a local claim',
        paragraphs: [
          'Open developer tools, use the Network panel, select a test file containing fake data, run the tool, and confirm no request contains the file or pasted content. Repeat after updates or when third-party scripts change.',
          'Use synthetic test data rather than real confidential information during verification.'
        ]
      },
      {
        heading: 'What local processing does not guarantee',
        paragraphs: [
          'It does not guarantee complete anonymization, safe output, trustworthy code, malware protection, legal compliance, or protection after you paste the result into another service.',
          'For high-risk data, use approved tools, access controls, retention rules, and professional review.'
        ]
      }
    ],
    checklist: ['Tool workflow described precisely', 'Network behavior tested with synthetic data', 'Third-party scripts reviewed', 'Output manually checked', 'Organizational policy followed'],
    relatedTools: ['remove-pii-before-chatgpt', 'remove-exif-metadata', 'sha256-checksum'],
    relatedGuides: ['no-upload-file-tools-explained', 'what-not-to-paste-into-chatgpt'],
    published: '2026-06-28',
    updated: '2026-07-23',
    readingTime: '7 min read'
  },
  {
    slug: 'how-to-check-photo-gps',
    title: 'How to Check If a Photo Has GPS Location Data',
    seoTitle: 'Check Photo GPS Location Data in Your Browser',
    metaDescription: 'Check JPEG EXIF GPS latitude and longitude, understand app-created copies, verify removal, and review visible location clues before sharing.',
    primaryKeyword: 'check photo GPS data',
    category: 'Image Privacy',
    intro: 'Some phone and camera photos store latitude and longitude in EXIF metadata, which can reveal where the image was captured.',
    quickAnswer: 'Inspect the exact file you plan to share with a local metadata viewer, look for GPS latitude and longitude, create a newly rendered copy if coordinates are present, and inspect the output again before uploading.',
    sections: [
      {
        heading: 'Check the exact copy you will share',
        paragraphs: [
          'Editing, messaging, cloud-sync, and social applications may create new copies with different metadata. The original camera file and the downloaded or exported copy may not match.',
          'Use the file from the final sharing location, not only the original in the camera roll.'
        ]
      },
      {
        heading: 'Understand GPS fields',
        paragraphs: [
          'Common EXIF GPS fields include latitude, latitude reference, longitude, longitude reference, altitude, direction, and timestamp. A viewer may display coordinates as degrees, minutes, and seconds or decimal degrees.',
          'Exact coordinates can identify a home, workplace, school, private event, or travel route.'
        ]
      },
      {
        heading: 'Remove coordinates by creating a new image',
        paragraphs: [
          'A reliable browser method is to decode the visible pixels and export a new JPEG, PNG, or WebP image. This discards the original EXIF block rather than editing only one field.',
          'Re-encoding may change compression quality or file size, so inspect the result visually.'
        ]
      },
      {
        heading: 'Review location clues in the pixels',
        paragraphs: [
          'Removing GPS metadata does not hide street signs, house numbers, landmarks, maps, badges, reflections, or documents visible in the image.',
          'Crop or redact those details separately when location privacy matters.'
        ]
      }
    ],
    checklist: ['Exact outgoing file inspected', 'GPS latitude and longitude checked', 'Clean copy created when needed', 'Clean copy inspected again', 'Visible location clues reviewed'],
    relatedTools: ['view-image-metadata', 'remove-exif-metadata', 'screenshot-redactor'],
    relatedGuides: ['what-is-exif-data', 'remove-exif-metadata-before-uploading'],
    published: '2026-06-11',
    updated: '2026-07-23',
    readingTime: '6 min read'
  },
  {
    slug: 'what-is-exif-data',
    title: 'What Is EXIF Data and Why Can It Affect Privacy?',
    seoTitle: 'What Is EXIF Data? Photo Metadata and Privacy Explained',
    metaDescription: 'Learn what EXIF metadata can contain, including camera model, dates, orientation, software, copyright, and GPS location fields.',
    primaryKeyword: 'what is EXIF data',
    category: 'Image Privacy',
    intro: 'EXIF is a metadata format commonly used in image files to store technical and descriptive information about how a photo was created.',
    quickAnswer: 'EXIF can include camera or phone model, capture date, orientation, exposure settings, software, author details, and GPS coordinates. Not every image contains all fields, and some apps remove or rewrite them.',
    sections: [
      {
        heading: 'Common EXIF fields',
        paragraphs: [
          'Technical fields include camera make and model, lens, exposure time, aperture, ISO, focal length, flash, orientation, and image dimensions. These help photo software display and organize images.',
          'Descriptive fields may include artist, copyright, software, comments, capture time, and a unique image identifier.'
        ]
      },
      {
        heading: 'GPS and privacy risk',
        paragraphs: [
          'When location services and camera settings permit it, a photo may contain latitude, longitude, altitude, and direction. Exact coordinates can reveal a private location.',
          'Device model, timestamp, and software fields may also add identifying context even without GPS.'
        ]
      },
      {
        heading: 'Why metadata varies between copies',
        paragraphs: [
          'Phones, cameras, editors, screenshot tools, cloud services, and messaging platforms may preserve, remove, or add metadata. A saved copy can be different from the original.',
          'That is why privacy checks should use the exact file being uploaded or sent.'
        ]
      },
      {
        heading: 'Metadata removal is not full anonymization',
        paragraphs: [
          'The visible pixels can identify a person or place. File name, upload account, surrounding post text, and platform data can also reveal context.',
          'Treat metadata removal as one layer in a broader sharing review.'
        ]
      }
    ],
    checklist: ['Camera and phone model understood', 'Capture date and GPS checked', 'Exact outgoing copy inspected', 'Visible image content reviewed', 'File name and surrounding context reviewed'],
    relatedTools: ['view-image-metadata', 'remove-exif-metadata'],
    relatedGuides: ['how-to-check-photo-gps', 'image-metadata-privacy-checklist'],
    published: '2026-06-12',
    updated: '2026-07-23',
    readingTime: '5 min read'
  },
  {
    slug: 'remove-exif-metadata-before-uploading',
    title: 'How to Remove EXIF Metadata Before Uploading a Photo',
    seoTitle: 'How to Remove EXIF Metadata Before Uploading Photos',
    metaDescription: 'Create a clean image copy without common EXIF and GPS metadata, verify the result, and review visible content before uploading.',
    primaryKeyword: 'remove EXIF metadata before uploading',
    category: 'Image Privacy',
    intro: 'Removing image metadata before uploading reduces the chance of sharing camera, date, software, author, or location information that the destination does not need.',
    quickAnswer: 'Inspect the original, re-render the visible pixels into a new image file, inspect the new copy for remaining metadata, check visual location clues, and upload only the verified clean copy.',
    sections: [
      {
        heading: 'Why re-rendering is useful',
        paragraphs: [
          'A browser canvas decodes the pixels and exports a new image rather than copying the original file structure. The new file does not normally include the original EXIF block.',
          'This approach is simple for JPEG, PNG, and WebP images, but it may change compression and does not preserve every color-management detail.'
        ]
      },
      {
        heading: 'Keep the original until verification',
        paragraphs: [
          'Create a separate clean copy with a clear file name. Open it and confirm orientation, dimensions, crop, color, and readability before deleting or archiving the original.',
          'For important photos, keep the original in a protected location because metadata and image quality may be useful later.'
        ]
      },
      {
        heading: 'Inspect the output again',
        paragraphs: [
          'Use a metadata viewer on the downloaded copy. Confirm that GPS coordinates, camera details, author fields, and comments are not readable in the supported report.',
          'A lightweight viewer cannot prove that every proprietary metadata block is absent, so use specialized forensic tools when the risk is high.'
        ]
      },
      {
        heading: 'Review the destination and visible pixels',
        paragraphs: [
          'Platforms may generate their own thumbnails or retain upload information. Metadata removal does not control platform logs or account information.',
          'Crop or redact faces, addresses, screens, documents, badges, and reflections that reveal private details visually.'
        ]
      }
    ],
    checklist: ['Original kept until verification', 'New copy visually inspected', 'Metadata report checked', 'Visible private details removed', 'Only the clean copy uploaded'],
    relatedTools: ['remove-exif-metadata', 'view-image-metadata', 'screenshot-redactor'],
    relatedGuides: ['how-to-check-photo-gps', 'image-metadata-privacy-checklist'],
    published: '2026-06-13',
    updated: '2026-07-23',
    readingTime: '6 min read'
  },
  {
    slug: 'image-metadata-privacy-checklist',
    title: 'Image Metadata Privacy Checklist Before Uploading',
    seoTitle: 'Image Metadata Privacy Checklist Before Uploading Photos',
    metaDescription: 'Use this checklist to inspect GPS, EXIF, file names, visible details, clean copies, and destination behavior before uploading images.',
    primaryKeyword: 'image metadata privacy checklist',
    category: 'Image Privacy',
    intro: 'A repeatable checklist is more reliable than assuming an app or website will remove every private detail automatically.',
    quickAnswer: 'Check the exact outgoing file, inspect metadata, remove GPS and unnecessary fields, review the visible pixels and file name, verify a clean copy, and consider what the destination records about the upload.',
    sections: [
      {
        heading: 'Before cleaning',
        paragraphs: [
          'Confirm which copy will be shared and why. Remove unnecessary photos and crop the image to the smallest useful area.',
          'Inspect the original metadata so you know whether location, date, device, author, or software information is present.'
        ]
      },
      {
        heading: 'During cleaning',
        paragraphs: [
          'Re-render the image to create a new file and use solid visual redaction where needed. Give the clean copy a neutral file name that does not include a person, address, client, or project.',
          'Do not overwrite the original until the output has been verified.'
        ]
      },
      {
        heading: 'After cleaning',
        paragraphs: [
          'Open the exact downloaded output, inspect metadata again, and review the image at full size. Confirm that orientation and quality remain acceptable.',
          'Check both metadata and visible clues because either layer may reveal private information.'
        ]
      },
      {
        heading: 'At the destination',
        paragraphs: [
          'Consider the account name, post text, audience, permanence, and download settings of the platform. A clean file can still be shared in an identifying context.',
          'When possible, use a test upload with non-sensitive content to understand how the platform handles metadata.'
        ]
      }
    ],
    checklist: ['Exact outgoing file selected', 'GPS and EXIF inspected', 'Neutral file name used', 'Visible private details checked', 'Clean output verified', 'Destination audience and retention considered'],
    relatedTools: ['view-image-metadata', 'remove-exif-metadata', 'screenshot-redactor'],
    relatedGuides: ['what-is-exif-data', 'remove-exif-metadata-before-uploading'],
    published: '2026-06-14',
    updated: '2026-07-23',
    readingTime: '5 min read'
  },
  {
    slug: 'merge-pdf-files-without-uploading',
    title: 'How to Merge PDF Files Without Uploading Them',
    seoTitle: 'Merge PDF Files Without Uploading: Safer Workflow',
    metaDescription: 'Compare local PDF merge options, prepare files, verify page order and links, and protect sensitive documents without using an upload service.',
    primaryKeyword: 'merge PDF files without uploading',
    category: 'PDF Privacy',
    intro: 'Private contracts, statements, applications, and records should not be uploaded to an unknown PDF service simply because merging is convenient.',
    quickAnswer: 'Use a trusted local desktop application or reviewed browser tool that processes files locally, arrange copies in the correct order, create the merged PDF, then verify page count, links, metadata, and sensitive content before sharing.',
    sections: [
      {
        heading: 'Choose a genuinely local method',
        paragraphs: [
          'Operating-system print workflows, trusted desktop PDF applications, and transparent browser-only tools can merge files without sending the document content to a processing server.',
          'Verify claims with the browser Network panel when using a web tool. Test with synthetic documents rather than confidential records.'
        ]
      },
      {
        heading: 'Prepare safe working copies',
        paragraphs: [
          'Duplicate the source PDFs and use clear file names or sequence numbers. Remove unnecessary pages before merging so private attachments are not included accidentally.',
          'Open every source file and confirm it is the intended version, especially when folders contain signed and unsigned copies.'
        ]
      },
      {
        heading: 'Verify the merged document',
        paragraphs: [
          'Check page count, order, rotation, blank pages, bookmarks, links, form fields, signatures, and accessibility. Some merge methods flatten or discard advanced features.',
          'Search for names, account numbers, comments, and attachments that should not be present.'
        ]
      },
      {
        heading: 'Review metadata and destination risk',
        paragraphs: [
          'The merged file may inherit title, author, creator, dates, or other metadata from the tool or source documents. Inspect and clean metadata where required.',
          'A local merge protects the processing step, but email, cloud storage, and the final recipient still affect confidentiality.'
        ]
      }
    ],
    checklist: ['Local behavior verified', 'Working copies used', 'Page order and count checked', 'Links, forms, and signatures checked', 'Metadata and final destination reviewed'],
    relatedTools: ['sha256-checksum'],
    relatedGuides: ['remove-pdf-pages-before-sharing', 'remove-pdf-metadata-before-sharing', 'no-upload-file-tools-explained'],
    published: '2026-06-15',
    updated: '2026-07-23',
    readingTime: '6 min read'
  },
  {
    slug: 'remove-pdf-metadata-before-sharing',
    title: 'How to Remove PDF Metadata Before Sharing',
    seoTitle: 'How to Remove PDF Metadata Before Sharing a Document',
    metaDescription: 'Inspect PDF title, author, subject, keywords, creator, producer, dates, comments, attachments, and other hidden information before sharing.',
    primaryKeyword: 'remove PDF metadata before sharing',
    category: 'PDF Privacy',
    intro: 'A PDF can reveal more than the visible pages, including document properties, comments, attachments, form values, layers, and revision information.',
    quickAnswer: 'Inspect document properties and hidden content, create a sanitized copy using a trusted local tool, reopen the output, search and copy text, check attachments and comments, and retain the original separately.',
    sections: [
      {
        heading: 'Inspect document properties',
        paragraphs: [
          'Review title, author, subject, keywords, creator, producer, creation date, and modification date. These fields may reveal a person, organization, software workflow, or internal project name.',
          'Custom properties can contain additional values not shown in a basic file browser.'
        ]
      },
      {
        heading: 'Look beyond metadata fields',
        paragraphs: [
          'Comments, annotations, form values, embedded files, layers, bookmarks, scripts, hidden text, and previous revisions can expose content that is not obvious in a normal page view.',
          'A visual check alone is not enough for sensitive documents.'
        ]
      },
      {
        heading: 'Create and verify a sanitized copy',
        paragraphs: [
          'Use a trusted local sanitizer or a print-to-PDF workflow when appropriate. Printing may flatten some content but can also remove accessibility, links, forms, signatures, and quality.',
          'Open the output in a different viewer, inspect properties, search text, copy suspicious areas, and check for attachments and comments.'
        ]
      },
      {
        heading: 'Understand the limits',
        paragraphs: [
          'Removing document metadata does not remove visible names, account numbers, or sensitive text. It also does not make a document anonymous when the content itself identifies the subject.',
          'For legal, medical, financial, or regulated documents, use an approved redaction and sanitization process.'
        ]
      }
    ],
    checklist: ['Document properties inspected', 'Comments and attachments checked', 'Sanitized copy created locally', 'Output reopened in another viewer', 'Visible content reviewed separately'],
    relatedTools: ['sha256-checksum'],
    relatedGuides: ['pdf-redaction-mistakes', 'remove-pdf-pages-before-sharing', 'merge-pdf-files-without-uploading'],
    published: '2026-06-16',
    updated: '2026-07-23',
    readingTime: '7 min read'
  },
  {
    slug: 'remove-pdf-pages-before-sharing',
    title: 'How to Remove PDF Pages Before Sharing',
    seoTitle: 'How to Remove PDF Pages Before Sharing a Document',
    metaDescription: 'Remove blank, duplicate, irrelevant, or sensitive pages locally, then verify page count, bookmarks, links, forms, and metadata.',
    primaryKeyword: 'remove PDF pages before sharing',
    category: 'PDF Privacy',
    intro: 'Deleting unnecessary pages reduces exposure and makes the shared document easier to review, but the output must be checked carefully.',
    quickAnswer: 'Work on a duplicate, note the pages to keep, use a trusted local editor, save a new PDF, then verify page count, numbering, bookmarks, links, forms, signatures, and hidden content before sharing.',
    sections: [
      {
        heading: 'Decide what the recipient actually needs',
        paragraphs: [
          'List the required sections and remove blank pages, duplicates, internal notes, appendices, personal records, or unrelated attachments. Minimum necessary sharing is safer than sending the complete source.',
          'Be careful with printed page numbers because they may differ from the viewer page index.'
        ]
      },
      {
        heading: 'Use a working copy',
        paragraphs: [
          'Keep the original unchanged in an approved location. Save the reduced version with a clear name that does not expose private information.',
          'When multiple versions exist, confirm you are editing the final intended source.'
        ]
      },
      {
        heading: 'Check features affected by deletion',
        paragraphs: [
          'Removing pages can break bookmarks, table-of-contents links, internal references, form calculations, signatures, and page labels. It may also change the meaning of a signed document.',
          'Review the output from the recipient perspective rather than assuming the editor preserved everything.'
        ]
      },
      {
        heading: 'Verify the new file completely',
        paragraphs: [
          'Open the saved output, compare page count, scroll every page, search for sensitive terms, inspect properties, and check comments or attachments.',
          'Share only the verified reduced copy and retain the source according to your retention rules.'
        ]
      }
    ],
    checklist: ['Required pages listed', 'Original preserved', 'Printed and viewer page numbers distinguished', 'Bookmarks and signatures checked', 'New file reviewed page by page'],
    relatedTools: ['sha256-checksum'],
    relatedGuides: ['merge-pdf-files-without-uploading', 'remove-pdf-metadata-before-sharing', 'pdf-redaction-mistakes'],
    published: '2026-06-17',
    updated: '2026-07-23',
    readingTime: '6 min read'
  },
  {
    slug: 'pdf-redaction-mistakes',
    title: 'PDF Redaction Mistakes: Why Black Boxes May Not Be Enough',
    seoTitle: 'PDF Redaction Mistakes: Hidden Text, Layers, and Metadata',
    metaDescription: 'Learn why drawing black boxes over PDF text can leave selectable content, and how to verify redaction, comments, attachments, and metadata.',
    primaryKeyword: 'PDF redaction mistakes',
    category: 'PDF Privacy',
    intro: 'A PDF can look redacted while the original text remains searchable, selectable, copyable, extractable, or recoverable from another layer.',
    quickAnswer: 'Use a true redaction feature that removes underlying content, apply and save the redactions, sanitize hidden data, then test the final file by searching, selecting, copying, extracting, and inspecting it in another viewer.',
    sections: [
      {
        heading: 'A rectangle is not necessarily redaction',
        paragraphs: [
          'Drawing a black shape over text may only cover the visible page. The text can remain underneath and may be revealed by selecting, copying, changing layers, or extracting document content.',
          'The same problem can occur when screenshots are pasted over PDF pages without flattening the final file.'
        ]
      },
      {
        heading: 'Use a true apply-redaction workflow',
        paragraphs: [
          'Professional PDF tools distinguish marking content for redaction from applying the redaction. The apply step removes the underlying objects and creates the final appearance.',
          'Work on a copy and save a separate final file. Do not distribute the editable source with pending redaction marks.'
        ]
      },
      {
        heading: 'Sanitize hidden document content',
        paragraphs: [
          'Comments, attachments, form fields, bookmarks, metadata, hidden layers, scripts, and previous revisions can expose information outside the visible page.',
          'Use the sanitization features of an approved tool and inspect document properties after saving.'
        ]
      },
      {
        heading: 'Test like a recipient or attacker',
        paragraphs: [
          'Search for the redacted terms, drag across the area, copy and paste into a text editor, use another PDF viewer, inspect attachments, and run approved extraction tools when the risk warrants it.',
          'For legal, medical, financial, or regulated records, follow a documented redaction review process with a second reviewer.'
        ]
      }
    ],
    checklist: ['True redaction feature used', 'Redactions applied and saved', 'Hidden data sanitized', 'Search and copy tests performed', 'Final file reviewed in another viewer'],
    relatedTools: ['screenshot-redactor', 'sha256-checksum'],
    relatedGuides: ['remove-pdf-metadata-before-sharing', 'remove-pdf-pages-before-sharing'],
    published: '2026-06-18',
    updated: '2026-07-23',
    readingTime: '7 min read'
  },
  {
    slug: 'no-upload-file-tools-explained',
    title: 'What “No Upload” Means for Browser File Tools',
    seoTitle: 'What No-Upload Browser File Processing Really Means',
    metaDescription: 'Understand local file selection, JavaScript processing, network verification, third-party resources, browser memory, and no-upload limitations.',
    primaryKeyword: 'no upload file tools',
    category: 'File Privacy',
    intro: '“No upload” should describe a specific processing path, not act as a broad promise that nothing about the page communicates over the internet.',
    quickAnswer: 'A no-upload tool can read a selected file with browser APIs and process it locally without sending the file contents to an application server. The page itself still loads code and may make other network requests, so verify the actual workflow.',
    sections: [
      {
        heading: 'File selection does not automatically upload',
        paragraphs: [
          'Choosing a file gives page JavaScript permission to read that file in the browser. The code can inspect bytes, draw pixels, calculate hashes, and create downloads without sending the file elsewhere.',
          'An upload occurs only when code transmits the file or derived content through a network request, form submission, WebSocket, or similar channel.'
        ]
      },
      {
        heading: 'The webpage still uses the network',
        paragraphs: [
          'HTML, CSS, JavaScript, icons, and other assets are downloaded from the site. Analytics, advertising, error reporting, or third-party libraries may create additional requests.',
          'A precise privacy statement should separate local file processing from general website hosting and logs.'
        ]
      },
      {
        heading: 'Verify with synthetic data',
        paragraphs: [
          'Open developer tools, clear the Network panel, choose a harmless test file containing a recognizable fake value, run the tool, and inspect every request. The test value should not appear in request bodies, URLs, or headers.',
          'Repeat after major updates and test both success and error paths.'
        ]
      },
      {
        heading: 'Understand browser limits',
        paragraphs: [
          'Large files can exhaust memory because many browser APIs read the complete file. A local tool may also support fewer formats or advanced features than a server application.',
          'For sensitive files, local processing is one risk reduction measure, not a replacement for approved software, access controls, and review.'
        ]
      }
    ],
    checklist: ['Processing path described clearly', 'Network panel tested', 'Third-party requests understood', 'Large-file memory limits considered', 'Sensitive workflow policy followed'],
    relatedTools: ['remove-exif-metadata', 'sha256-checksum', 'csv-anonymizer'],
    relatedGuides: ['how-browser-only-privacy-tools-work', 'merge-pdf-files-without-uploading'],
    published: '2026-06-19',
    updated: '2026-07-23',
    readingTime: '6 min read'
  },
  {
    slug: 'zip-file-privacy-checklist',
    title: 'ZIP File Privacy Checklist Before Sharing an Archive',
    seoTitle: 'ZIP File Privacy Checklist: What to Remove Before Sharing',
    metaDescription: 'Check hidden files, paths, backups, environment files, logs, metadata, passwords, and archive contents before sharing a ZIP file.',
    primaryKeyword: 'ZIP file privacy checklist',
    category: 'File Privacy',
    intro: 'A ZIP archive can reveal more than the files you intended to include, including directory structure, hidden files, backups, logs, and configuration secrets.',
    quickAnswer: 'Create the archive from a clean staging folder, exclude secrets and hidden system files, inspect the final member list and paths, scan configuration and logs, use encryption appropriately, and verify the exact archive before sharing.',
    sections: [
      {
        heading: 'Build from a staging folder',
        paragraphs: [
          'Copy only the required files into a new folder rather than compressing an entire project, desktop, or user directory. This reduces accidental inclusion.',
          'Use neutral folder names that do not reveal a customer, employee, private project, or local username.'
        ]
      },
      {
        heading: 'Exclude high-risk files',
        paragraphs: [
          'Remove .env files, credentials, private keys, database dumps, logs, browser profiles, backups, temporary files, source maps, build caches, and editor settings when they are not required.',
          'Hidden files such as .DS_Store and version-control folders can reveal paths, names, or repository history.'
        ]
      },
      {
        heading: 'Inspect the final archive',
        paragraphs: [
          'Open the ZIP and review every member name and path. Extract it into a temporary folder and confirm that only the intended content appears.',
          'Search text-based files for email addresses, tokens, passwords, internal domains, and customer identifiers.'
        ]
      },
      {
        heading: 'Use passwords carefully',
        paragraphs: [
          'Archive encryption protects the file only when the password is strong and sent through a separate channel. Older ZIP encryption methods may be weak.',
          'Encryption does not correct accidental inclusion. The recipient can still see everything after opening the archive.'
        ]
      }
    ],
    checklist: ['Clean staging folder used', 'Hidden and backup files excluded', 'Paths and member names reviewed', 'Text files scanned for secrets', 'Password shared separately when encryption is used'],
    relatedTools: ['sha256-checksum', 'sanitize-logs-before-chatgpt'],
    relatedGuides: ['no-upload-file-tools-explained', 'verify-download-sha256-checksum'],
    published: '2026-06-20',
    updated: '2026-07-23',
    readingTime: '6 min read'
  },
  {
    slug: 'verify-download-sha256-checksum',
    title: 'How to Verify a Download With a SHA-256 Checksum',
    seoTitle: 'Verify Downloads With SHA-256 Checksums: Step-by-Step',
    metaDescription: 'Calculate a local SHA-256 file hash, compare all 64 hexadecimal characters, and understand what a checksum match does and does not prove.',
    primaryKeyword: 'verify download SHA-256 checksum',
    category: 'File Privacy',
    intro: 'A checksum comparison can detect file corruption or substitution when the expected hash comes from a trusted source.',
    quickAnswer: 'Get the expected SHA-256 value from the official publisher, calculate the hash of the downloaded file locally, compare the complete 64-character hexadecimal value, and do not open the file if the values differ.',
    sections: [
      {
        heading: 'Obtain the expected value safely',
        paragraphs: [
          'Use the official vendor website, signed release notes, package repository, or another authenticated channel. A hash copied from the same untrusted mirror as the file provides little independent assurance.',
          'Confirm the hash corresponds to the exact version, operating system, architecture, and file name you downloaded.'
        ]
      },
      {
        heading: 'Calculate the local file hash',
        paragraphs: [
          'A browser tool can pass the file bytes to the Web Crypto API without uploading them. Operating systems also provide command-line checksum utilities for very large files.',
          'Hash the final downloaded file before installation or extraction when that is the published comparison point.'
        ]
      },
      {
        heading: 'Compare the full digest',
        paragraphs: [
          'A SHA-256 digest is normally shown as 64 hexadecimal characters. Compare every character. Uppercase and lowercase hexadecimal letters represent the same value.',
          'A mismatch can result from corruption, a different build, a modified file, or an incorrect expected hash. Download again from the official source and investigate.'
        ]
      },
      {
        heading: 'Know what a match proves',
        paragraphs: [
          'A match proves that your file bytes correspond to the expected digest. It does not prove the publisher is trustworthy or that the file is free from malware.',
          'Use code signing, trusted distribution, security scanning, and vendor reputation in addition to checksums.'
        ]
      }
    ],
    checklist: ['Expected hash from trusted source', 'Correct version and file selected', 'All 64 characters compared', 'Mismatch investigated before opening', 'Additional security checks used'],
    relatedTools: ['sha256-checksum'],
    relatedGuides: ['no-upload-file-tools-explained', 'zip-file-privacy-checklist'],
    published: '2026-06-21',
    updated: '2026-07-23',
    readingTime: '5 min read'
  },
  {
    slug: 'what-are-utm-parameters',
    title: 'What Are UTM Parameters and Should You Remove Them?',
    seoTitle: 'What Are UTM Parameters? Tracking Links Explained',
    metaDescription: 'Understand utm_source, utm_medium, utm_campaign, click IDs, referral parameters, and when to remove tracking data before sharing links.',
    primaryKeyword: 'what are UTM parameters',
    category: 'Data Privacy',
    intro: 'UTM parameters are query-string fields added to URLs so marketers and analytics systems can attribute visits to a campaign, source, medium, or piece of content.',
    quickAnswer: 'UTM parameters usually are not required to load the destination page. Remove them when sharing a clean link unless attribution is intentionally needed, then test the cleaned URL and review remaining identifiers.',
    sections: [
      {
        heading: 'Common UTM fields',
        paragraphs: [
          'Typical fields include utm_source, utm_medium, utm_campaign, utm_term, utm_content, and utm_id. They tell analytics systems where a click came from and which campaign or creative produced it.',
          'Advertising platforms also use click identifiers such as gclid, fbclid, msclkid, and related values.'
        ]
      },
      {
        heading: 'Privacy and link-sharing concerns',
        paragraphs: [
          'A tracking parameter can reveal the newsletter, advertisement, campaign, or account flow that produced the link. Some sites also place email, user, referral, or session identifiers in the query string.',
          'URLs are commonly stored in browser history, analytics logs, chat systems, screenshots, referrer data, and support tickets.'
        ]
      },
      {
        heading: 'What can be removed safely',
        paragraphs: [
          'Known campaign and click identifiers are often removable without changing the destination. Unknown parameters may control search filters, language, document selection, or access, so keep them until tested.',
          'Signed URLs and invitation links can function like credentials. Do not publish them merely because they lack a recognizable tracking field.'
        ]
      },
      {
        heading: 'Test the cleaned URL',
        paragraphs: [
          'Open the cleaned link in a private window and confirm the correct page appears. Check whether login, document access, filters, or checkout state changed.',
          'When sharing publicly, remove unnecessary fragments, referral values, email fields, and account identifiers as well as UTM tags.'
        ]
      }
    ],
    checklist: ['Common UTM and click IDs removed', 'Unknown parameters reviewed', 'Signed or invite links kept private', 'Clean link tested', 'Remaining path and query identifiers checked'],
    relatedTools: ['url-privacy-cleaner'],
    relatedGuides: ['what-not-to-paste-into-chatgpt', 'client-data-redaction-examples'],
    published: '2026-06-22',
    updated: '2026-07-23',
    readingTime: '5 min read'
  }
];

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
