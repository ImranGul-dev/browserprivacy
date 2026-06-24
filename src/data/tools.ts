export type ToolKind =
  | 'remove-exif'
  | 'remove-gps'
  | 'metadata-viewer'
  | 'resize-image'
  | 'convert-image'
  | 'merge-pdf'
  | 'split-pdf'
  | 'remove-pdf-pages'
  | 'remove-pdf-metadata'
  | 'remove-pdf-hidden-data'
  | 'sha256'
  | 'url-cleaner';

export type ToolCategory = 'Image Tools' | 'PDF Tools' | 'Privacy Utilities';

export type Tool = {
  id: ToolKind;
  slug: string;
  category: ToolCategory;
  title: string;
  metaDescription: string;
  h1: string;
  hero: string;
  primaryKeyword: string;
  cta: string;
  acceptedFormats: string;
  accept?: string;
  multiple?: boolean;
  outputPromise: string;
  what: string;
  steps: string[];
  privacy: string;
  limitations: string[];
  faqs: { question: string; answer: string }[];
  related: string[];
  articleSlug: string;
};

export const tools: Tool[] = [
  {
    id: 'remove-exif',
    slug: 'remove-exif-data',
    category: 'Image Tools',
    title: 'Remove EXIF Metadata Online - Private Browser Tool',
    metaDescription: 'Remove supported EXIF, camera, software, and photo metadata from JPG, PNG, and WebP images. Your photo is processed locally in your browser.',
    h1: 'Remove EXIF Metadata from Photos',
    hero: 'Clean hidden photo metadata before you upload, email, or publish an image. This free EXIF remover runs in your browser, so supported photos are processed on your device instead of being uploaded to a server.',
    primaryKeyword: 'remove exif data',
    cta: 'Select image',
    acceptedFormats: 'JPG, PNG, WebP. Recommended max size: 50 MB.',
    accept: 'image/jpeg,image/png,image/webp',
    outputPromise: 'Creates a fresh image copy and verifies supported metadata fields after export when the browser can parse them.',
    what: 'For supported image types, the tool removes detectable EXIF, IPTC, XMP, camera, software, date, and GPS-related metadata blocks while keeping the visible image available for export.',
    steps: ['Select or drag a JPG, PNG, or WebP image into the tool.', 'Review the detected metadata summary before cleaning.', 'Click Remove Metadata.', 'Download the cleaned copy and compare the before and after summary.'],
    privacy: 'The selected image is read, processed, and exported locally as a Blob URL. The file is not uploaded to a processing server.',
    limitations: ['The tool removes supported metadata fields it can detect. It does not inspect visible content inside the photo.', 'Some proprietary tags or uncommon metadata blocks may not be supported in the first version.', 'Canvas re-encoding can change file size and compression. Verify the output before sharing sensitive files.'],
    faqs: [
      { question: 'Does removing EXIF reduce image quality?', answer: 'The cleaned file may be re-encoded depending on browser support and output format. The visible image should remain usable, but compression and file size can change.' },
      { question: 'Does this remove GPS location?', answer: 'Yes, when GPS fields are present in supported metadata and the image type can be processed by the browser.' },
      { question: 'Are my photos uploaded?', answer: 'No. The tool reads and processes the selected file locally in your browser.' },
      { question: 'Can I batch clean many photos?', answer: 'This starter focuses on one image at a time so memory use stays predictable. Batch support can be added later with clear mobile warnings.' },
      { question: 'What should I check after cleaning?', answer: 'Check the before and after metadata summary and confirm that the visible image itself does not contain private information.' }
    ],
    related: ['remove-gps-from-photo', 'image-metadata-viewer', 'resize-image'],
    articleSlug: 'remove-exif-metadata-before-uploading'
  },
  {
    id: 'remove-gps',
    slug: 'remove-gps-from-photo',
    category: 'Image Tools',
    title: 'Remove GPS Location from Photo Online - No Upload',
    metaDescription: 'Remove GPS coordinates and geotag location data from supported photos locally in your browser before sharing them online.',
    h1: 'Remove GPS Location from a Photo',
    hero: 'Photos can store GPS coordinates that reveal where the picture was taken. Use this private browser tool to detect and remove supported GPS metadata before sharing an image.',
    primaryKeyword: 'remove location from photo',
    cta: 'Select photo',
    acceptedFormats: 'JPG, PNG, WebP. Recommended max size: 50 MB.',
    accept: 'image/jpeg,image/png,image/webp',
    outputPromise: 'Detects supported GPS fields, creates a cleaned copy, and verifies whether GPS metadata is still detected after export.',
    what: 'For supported images, the tool detects EXIF GPS latitude, longitude, altitude, timestamp, direction, and related geotag fields, then exports a new copy without those supported location fields.',
    steps: ['Choose a photo from your device.', 'Check whether GPS metadata is detected.', 'Click Remove GPS Data.', 'Download the cleaned image and verify that location fields are gone.'],
    privacy: 'GPS detection and cleaning happen inside your browser. The page does not send GPS values, filenames, hashes, metadata, or image bytes to analytics.',
    limitations: ['This tool removes metadata-based location fields, not visible landmarks, signs, maps, or text in the image.', 'The browser re-encode path may also remove non-location metadata.', 'Unsupported formats may need conversion first.'],
    faqs: [
      { question: 'How do I know if my photo has GPS data?', answer: 'Select the photo and review the GPS status shown before cleaning.' },
      { question: 'Does this change the image itself?', answer: 'The visible image is redrawn into a new copy. It should look the same, but file size or compression can change.' },
      { question: 'Can someone still identify the location from the photo?', answer: 'Yes, if the location is visible in the image pixels. Metadata removal does not blur visible clues.' },
      { question: 'Is this different from the EXIF remover?', answer: 'This page focuses on GPS/geotag privacy. The EXIF remover cleans a wider set of supported metadata fields.' },
      { question: 'Does the file leave my browser?', answer: 'No. Detection and cleaning run locally in the browser.' }
    ],
    related: ['image-metadata-viewer', 'remove-exif-data', 'convert-image'],
    articleSlug: 'how-to-check-photo-gps'
  },
  {
    id: 'metadata-viewer',
    slug: 'image-metadata-viewer',
    category: 'Image Tools',
    title: 'Image Metadata Viewer - Check EXIF and GPS Locally',
    metaDescription: 'Check supported EXIF, GPS, camera, date, and software metadata from images locally in your browser before you share them.',
    h1: 'View Image Metadata Before Sharing',
    hero: 'Check what hidden information is stored inside a photo. This browser-only image metadata viewer shows supported EXIF, GPS, camera, software, date, and editing fields without uploading your image.',
    primaryKeyword: 'image metadata viewer',
    cta: 'Select image',
    acceptedFormats: 'JPG, PNG, WebP. Recommended max size: 50 MB.',
    accept: 'image/jpeg,image/png,image/webp',
    outputPromise: 'Shows supported metadata groups detected by the browser parser and labels unsupported detection limits clearly.',
    what: 'For supported image files, the tool reads detectable metadata fields and groups them into Location, Camera, Date, Software, Copyright, and Other sections.',
    steps: ['Select a JPG, PNG, or WebP image.', 'Wait for the local scan to finish.', 'Review the grouped metadata report.', 'Use cleanup links if you want to remove EXIF or GPS fields.'],
    privacy: 'The image is parsed locally in a browser worker. Metadata values are displayed only in your tab and are not sent to a backend.',
    limitations: ['The viewer shows supported metadata fields it can parse. It does not claim to detect every proprietary field in every format.', 'Visible content, watermarks, and readable text inside the image are not metadata.', 'Some formats show limited information depending on browser and parser support.'],
    faqs: [
      { question: 'What metadata can photos contain?', answer: 'Photos may contain camera model, lens settings, capture date, GPS coordinates, editing software, copyright fields, and embedded thumbnails.' },
      { question: 'Can I use this to see where a photo was taken?', answer: 'If supported GPS metadata is present, the Location section can show detected GPS fields. Many images do not contain GPS data.' },
      { question: 'Does viewing metadata upload my image?', answer: 'No. The selected file is read locally in your browser.' },
      { question: 'Can I export the metadata report?', answer: 'The current starter displays the report in the page. Copy or export options can be added without changing the privacy model.' },
      { question: 'Can I remove metadata after viewing it?', answer: 'Yes. Use the related Remove EXIF Metadata or Remove GPS from Photo tools.' }
    ],
    related: ['remove-exif-data', 'remove-gps-from-photo', 'convert-image'],
    articleSlug: 'image-metadata-viewer-before-sharing'
  },
  {
    id: 'resize-image',
    slug: 'resize-image',
    category: 'Image Tools',
    title: 'Resize Image Online - Change JPG, PNG, WebP Size Privately',
    metaDescription: 'Resize JPG, PNG, and WebP images to exact pixels or percentage locally in your browser. No upload required for supported files.',
    h1: 'Resize an Image Online',
    hero: 'Resize images for websites, forms, social profiles, email, and uploads. Choose exact pixel dimensions or scale by percentage, then download the resized image from your browser.',
    primaryKeyword: 'resize image online',
    cta: 'Select image',
    acceptedFormats: 'JPG, PNG, WebP. Recommended max size: 50 MB.',
    accept: 'image/jpeg,image/png,image/webp',
    outputPromise: 'Exports a new image with the requested pixel dimensions and verifies the output dimensions before showing success.',
    what: 'For supported image formats, the tool outputs an image at the chosen dimensions. Users can keep aspect ratio, set width, set height, or use exact dimensions.',
    steps: ['Select or drag an image into the page.', 'Choose width and height. Keep aspect ratio locked if needed.', 'Choose output format and quality.', 'Click Resize Image and download the result.'],
    privacy: 'The selected image is decoded and resized locally using browser image APIs. No server receives the original or resized image.',
    limitations: ['Upscaling cannot create true original detail. It only increases pixel dimensions.', 'Exact dimensions may stretch an image if aspect ratio is unlocked.', 'Animated images are not supported in this starter and may be flattened or rejected.'],
    faqs: [
      { question: 'Can I resize without losing aspect ratio?', answer: 'Yes. Keep the aspect ratio option enabled and enter one dimension.' },
      { question: 'Can I resize to exact pixels?', answer: 'Yes. Enter both width and height and turn off aspect ratio lock.' },
      { question: 'Will resizing remove metadata?', answer: 'Browser re-export usually drops many metadata fields, but use the EXIF remover and metadata viewer to verify.' },
      { question: 'Is the image uploaded to your server?', answer: 'No. The image is processed locally.' },
      { question: 'Which output formats are supported first?', answer: 'Start with JPG, PNG, and WebP because they cover common browser workflows.' }
    ],
    related: ['remove-exif-data', 'convert-image', 'image-metadata-viewer'],
    articleSlug: 'resize-without-stretching'
  },
  {
    id: 'convert-image',
    slug: 'convert-image',
    category: 'Image Tools',
    title: 'Image Converter - Convert JPG, PNG, WebP Locally',
    metaDescription: 'Convert JPG, PNG, and WebP images locally in your browser. No upload, no account, and no server-side processing for supported files.',
    h1: 'Convert Image Format Online',
    hero: 'Convert common image formats for websites, documents, forms, and sharing. Choose JPG, PNG, or WebP and download a new copy processed locally in your browser.',
    primaryKeyword: 'image converter',
    cta: 'Select image',
    acceptedFormats: 'JPG, PNG, WebP input where the browser can decode it.',
    accept: 'image/jpeg,image/png,image/webp',
    outputPromise: 'Creates a browser-encoded JPG, PNG, or WebP file and verifies that the output MIME type and dimensions match the selected format.',
    what: 'For supported source files, the tool decodes the image in the browser and exports a new copy in the selected format with optional quality and transparency handling.',
    steps: ['Select an image file.', 'Choose JPG, PNG, or WebP as the output format.', 'Adjust quality or background handling if needed.', 'Convert and download the new image.'],
    privacy: 'Conversion uses local browser APIs and creates a local Blob URL for download. No file is uploaded.',
    limitations: ['Transparency is not supported in JPG. Converting PNG or WebP with transparency to JPG uses a white background.', 'Advanced formats such as HEIC, RAW, or AVIF are not included in this first version.', 'Animated images need a separate pipeline and are not included in the basic converter.'],
    faqs: [
      { question: 'Which image formats are supported first?', answer: 'JPG, PNG, and WebP are the supported launch formats.' },
      { question: 'Can I convert WebP to JPG?', answer: 'Yes, if your browser can decode the WebP file.' },
      { question: 'Will image quality change?', answer: 'Lossy formats such as JPG and WebP can change quality depending on compression settings.' },
      { question: 'Does conversion remove metadata?', answer: 'A browser re-export often drops many metadata fields, but verify using the metadata viewer.' },
      { question: 'Are files uploaded?', answer: 'No. Supported images are processed locally in the browser.' }
    ],
    related: ['resize-image', 'remove-exif-data', 'image-metadata-viewer'],
    articleSlug: 'jpg-vs-png-vs-webp'
  },
  {
    id: 'merge-pdf',
    slug: 'merge-pdf',
    category: 'PDF Tools',
    title: 'Merge PDF Online - Combine PDFs Locally in Your Browser',
    metaDescription: 'Merge multiple PDF files into one document in your browser. Reorder files, combine them, and download the merged PDF without server upload for supported files.',
    h1: 'Merge PDF Files Online',
    hero: 'Combine multiple PDFs into one clean document. Reorder files, merge them locally in your browser, and download the finished PDF without creating an account.',
    primaryKeyword: 'merge PDF',
    cta: 'Select PDF files',
    acceptedFormats: 'PDF files. Recommended max size: 200 MB or 500 pages total.',
    accept: 'application/pdf,.pdf',
    multiple: true,
    outputPromise: 'Copies pages from the selected PDFs in the chosen order and verifies the final page count.',
    what: 'For standard PDFs that the browser library can read, the tool preserves page order, copies pages into a new PDF, and exports a merged document in the selected order.',
    steps: ['Add two or more PDF files.', 'Move files into the order you want.', 'Click Merge PDF.', 'Download the combined PDF and open it to verify page order.'],
    privacy: 'The PDFs are read and merged in a Web Worker inside your browser. The page has no upload endpoint for files.',
    limitations: ['Password-protected, corrupted, encrypted, XFA, or very large PDFs may fail or need a clear error message.', 'This tool combines pages; it does not edit existing text inside PDFs.', 'Digital signatures and special interactive behavior may not remain valid after modification.'],
    faqs: [
      { question: 'Can I reorder PDFs before merging?', answer: 'Yes. Use the up and down controls in the selected file list.' },
      { question: 'Are my PDFs uploaded?', answer: 'No. The browser-only version reads and merges files locally.' },
      { question: 'Can I merge scanned PDFs?', answer: 'Yes, if they are valid PDFs. Scanned pages are just pages inside the document.' },
      { question: 'Why did my PDF fail?', answer: 'The most common reasons are encryption, corruption, very large file size, or unsupported PDF features.' },
      { question: 'Can I merge images into a PDF?', answer: 'That should be handled by a future Images to PDF tool, not this launch tool.' }
    ],
    related: ['split-pdf', 'remove-pdf-pages', 'sha256-file-hash'],
    articleSlug: 'merge-pdf-files-without-uploading'
  },
  {
    id: 'split-pdf',
    slug: 'split-pdf',
    category: 'PDF Tools',
    title: 'Split PDF Online - Extract PDF Pages Locally',
    metaDescription: 'Split a PDF by page range or extract selected pages locally in your browser. No upload required for supported PDF files.',
    h1: 'Extract Pages from a PDF',
    hero: 'Extract selected pages from a PDF using page ranges. Choose one page or multiple ranges, then export a new PDF locally from your browser.',
    primaryKeyword: 'split PDF',
    cta: 'Select PDF',
    acceptedFormats: 'One PDF file. Recommended max size: 200 MB or 500 pages.',
    accept: 'application/pdf,.pdf',
    outputPromise: 'Exports a new PDF containing exactly the selected page ranges and verifies the output page count.',
    what: 'For supported PDFs, the tool copies selected pages into a new PDF according to the page range you enter. It does not upload the original PDF or change the source file.',
    steps: ['Select a PDF file.', 'Enter page ranges such as 1-3, 5, 8-10.', 'Confirm the selected page count.', 'Download the new PDF.'],
    privacy: 'The original PDF stays on your device. The split output is generated locally and downloaded with a Blob URL.',
    limitations: ['Complex, encrypted, or damaged PDFs may not load.', 'The tool does not perform OCR or text extraction.', 'Very large PDFs can be memory-heavy, especially on mobile.'],
    faqs: [
      { question: 'Can I split by page range?', answer: 'Yes. Use ranges such as 1-3, 5, 8-10.' },
      { question: 'Can I extract only one page?', answer: 'Yes. Enter a single page number, such as 4.' },
      { question: 'Will the original PDF be changed?', answer: 'No. The original remains on your device and the tool creates a new file.' },
      { question: 'Can I split into many files at once?', answer: 'This version exports one PDF for the selected ranges. Multi-file ZIP export can be added later without changing the browser-only privacy model.' },
      { question: 'Are PDFs uploaded?', answer: 'No. Supported PDFs are processed locally.' }
    ],
    related: ['merge-pdf', 'remove-pdf-pages', 'sha256-file-hash'],
    articleSlug: 'split-pdf-files-without-uploading'
  },
  {
    id: 'remove-pdf-pages',
    slug: 'remove-pdf-pages',
    category: 'PDF Tools',
    title: 'Remove Pages from PDF Online - Delete PDF Pages Privately',
    metaDescription: 'Delete selected pages from a PDF locally in your browser. Remove blank, duplicate, or unwanted pages without uploading supported files.',
    h1: 'Remove Pages from a PDF',
    hero: 'Delete unwanted pages from a PDF and download a clean copy. Remove blank pages, duplicate pages, cover pages, or unnecessary attachments locally in your browser.',
    primaryKeyword: 'remove pages from PDF',
    cta: 'Select PDF',
    acceptedFormats: 'One PDF file. Recommended max size: 200 MB or 500 pages.',
    accept: 'application/pdf,.pdf',
    outputPromise: 'Creates a new PDF without the selected pages and verifies that the output page count matches the expected result.',
    what: 'For supported PDFs, the tool copies all kept pages into a new PDF so the selected pages are absent and the remaining pages stay in their original order.',
    steps: ['Select a PDF file.', 'Enter the pages to remove, such as 1, 3-4, 10.', 'Review the expected remaining page count.', 'Download the new PDF.'],
    privacy: 'Page removal is done locally in a browser worker. No PDF file is uploaded or saved to a server.',
    limitations: ['Removing pages may break internal links, bookmarks, page labels, and signatures.', 'Corrupted or encrypted PDFs may fail.', 'This is not a forensic sanitizer and does not redact visible content inside kept pages.'],
    faqs: [
      { question: 'Can I remove one page from a PDF?', answer: 'Yes. Enter the page number you want to remove.' },
      { question: 'Can I remove a range of pages?', answer: 'Yes. Use a range such as 2-5.' },
      { question: 'Is the original PDF modified?', answer: 'No. The tool creates a new local PDF copy.' },
      { question: 'Does this remove hidden data?', answer: 'No. It removes selected pages from the output. It is not a full PDF sanitizer.' },
      { question: 'Are PDFs uploaded?', answer: 'No. Files stay in your browser.' }
    ],
    related: ['split-pdf', 'merge-pdf', 'sha256-file-hash'],
    articleSlug: 'remove-pdf-pages-before-sharing'
  },

  {
    id: 'remove-pdf-metadata',
    slug: 'remove-pdf-metadata',
    category: 'PDF Tools',
    title: 'Remove PDF Metadata Online - Private No Upload Tool',
    metaDescription: 'Remove common PDF metadata such as title, author, creator, producer, creation date, and modification date locally in your browser. No upload required for supported PDFs.',
    h1: 'Remove PDF Metadata Online',
    hero: 'Clean common document-info metadata from a PDF before sharing it. The PDF is read and rewritten locally in your browser, so supported files are not uploaded to a server.',
    primaryKeyword: 'remove PDF metadata online',
    cta: 'Select PDF',
    acceptedFormats: 'One PDF file. Recommended max size: 200 MB or 500 pages.',
    accept: 'application/pdf,.pdf',
    outputPromise: 'Creates a new PDF copy with common document-info metadata cleared and reports the fields detected before cleanup.',
    what: 'For supported PDFs, this tool clears common document information fields including title, author, subject, keywords, creator, producer, creation date, and modification date. It keeps the original file unchanged and exports a new local copy.',
    steps: ['Select a PDF from your device.', 'Review which common metadata fields were detected.', 'Click Remove PDF Metadata.', 'Download the cleaned copy and open it before sharing.'],
    privacy: 'The PDF is processed inside your browser using local file APIs and a Web Worker. The file is not uploaded to a processing server.',
    limitations: ['This removes common PDF document-info metadata supported by the browser library; it is not a forensic sanitizer.', 'It does not remove visible text, images, comments, annotations, hidden layers, attachments, or redacted-looking boxes from every PDF.', 'Encrypted, password-protected, corrupted, or very complex PDFs may fail or need specialist software.'],
    faqs: [
      { question: 'Does this remove the PDF author name?', answer: 'It clears the common Author field when the PDF library can read and rewrite the document.' },
      { question: 'Are PDFs uploaded?', answer: 'No. Supported PDFs are processed locally in your browser.' },
      { question: 'Is this a full PDF sanitizer?', answer: 'No. It is a practical metadata cleaner for common document-info fields, not forensic sanitization.' },
      { question: 'Will the original PDF change?', answer: 'No. The tool creates a new cleaned copy for download.' },
      { question: 'Should I verify the output?', answer: 'Yes. Open the cleaned PDF and inspect it before sending any sensitive document.' }
    ],
    related: ['remove-pdf-hidden-data', 'remove-pdf-pages', 'merge-pdf'],
    articleSlug: 'remove-pdf-metadata-before-sharing'
  },
  {
    id: 'remove-pdf-hidden-data',
    slug: 'remove-pdf-hidden-data',
    category: 'PDF Tools',
    title: 'Remove PDF Hidden Data - Private Browser Cleanup',
    metaDescription: 'Create a cleaner PDF copy by rewriting the document locally and clearing common metadata fields. Browser-only workflow for everyday PDF privacy checks.',
    h1: 'Remove PDF Hidden Data',
    hero: 'Create a cleaner PDF copy before sharing. This tool rewrites supported PDFs locally and clears common document metadata while explaining important limits around redaction and hidden objects.',
    primaryKeyword: 'remove PDF hidden data',
    cta: 'Select PDF',
    acceptedFormats: 'One PDF file. Recommended max size: 200 MB or 500 pages.',
    accept: 'application/pdf,.pdf',
    outputPromise: 'Rewrites a new PDF copy locally, clears common document-info metadata, and reminds you to verify visible content, annotations, attachments, and redactions separately.',
    what: 'This page is for everyday PDF sharing hygiene. It creates a new PDF copy and clears common metadata fields where supported, but it does not claim to remove every hidden object in every PDF.',
    steps: ['Select a PDF from your device.', 'Run the local cleanup.', 'Download the rewritten copy.', 'Open the result and check metadata, visible content, comments, attachments, and redactions before sharing.'],
    privacy: 'The cleanup runs in your browser and the selected PDF is not sent to a server. The cleaned file is generated as a local download.',
    limitations: ['Not a legal redaction tool or forensic PDF sanitizer.', 'May not remove every attachment, annotation, form field, layer, script, incremental update, or hidden object in complex PDFs.', 'Use specialist redaction software for legal, compliance, medical, or high-risk documents.'],
    faqs: [
      { question: 'Is this different from PDF metadata removal?', answer: 'It uses the same local metadata cleanup but adds stronger sharing guidance for hidden-data risks.' },
      { question: 'Does it remove black-box redactions?', answer: 'No. If sensitive text is hidden under a black shape, use a proper redaction tool and verify the result.' },
      { question: 'Are my PDFs uploaded?', answer: 'No. Supported files stay in your browser.' },
      { question: 'Can this clean every PDF?', answer: 'No. PDF files can contain many complex objects that require specialist review.' },
      { question: 'What should I check after cleanup?', answer: 'Check document properties, visible pages, comments, attachments, form fields, and any redacted-looking content.' }
    ],
    related: ['remove-pdf-metadata', 'remove-pdf-pages', 'split-pdf'],
    articleSlug: 'safe-pdf-workflow-before-sharing'
  },
  {
    id: 'sha256',
    slug: 'sha256-file-hash',
    category: 'Privacy Utilities',
    title: 'SHA-256 File Hash Generator - Calculate Checksum Locally',
    metaDescription: 'Calculate a SHA-256 checksum for any file locally in your browser. Use it to verify downloads or compare file integrity without uploading the file.',
    h1: 'SHA-256 File Hash Generator',
    hero: 'Calculate a SHA-256 checksum for any supported file directly in your browser. Use it to verify downloads, compare file integrity, or confirm that two files match.',
    primaryKeyword: 'SHA256 file hash',
    cta: 'Select file',
    acceptedFormats: 'Any file your browser can read locally.',
    accept: '*/*',
    outputPromise: 'Calculates the SHA-256 digest over the exact selected bytes and verifies that the result is 64 lowercase hexadecimal characters.',
    what: 'The tool reads the selected file bytes locally and uses the Web Crypto API to calculate a SHA-256 checksum.',
    steps: ['Select a file from your device.', 'Wait for the local hash calculation.', 'Copy the SHA-256 value.', 'Optionally paste an expected hash to compare.'],
    privacy: 'The file is never uploaded. The hash is calculated locally and displayed only in your browser tab.',
    limitations: ['A hash proves byte equality; it does not prove a file is safe.', 'This is not a malware scanner.', 'Very large files may take longer and require memory depending on the browser.'],
    faqs: [
      { question: 'What is SHA-256 used for?', answer: 'It is commonly used to verify that file bytes match an expected value.' },
      { question: 'Does this scan for viruses?', answer: 'No. It calculates a checksum only.' },
      { question: 'Can I compare an expected hash?', answer: 'Yes. Paste an expected hash into the compare field after calculation.' },
      { question: 'Is the file uploaded?', answer: 'No. The hash is calculated locally.' },
      { question: 'Why is the hash different?', answer: 'Any byte change, including metadata or line endings, changes the SHA-256 digest.' }
    ],
    related: ['url-tracking-remover', 'merge-pdf', 'remove-exif-data'],
    articleSlug: 'verify-download-sha256-checksum'
  },
  {
    id: 'url-cleaner',
    slug: 'url-tracking-remover',
    category: 'Privacy Utilities',
    title: 'URL Tracking Remover - Clean UTM, fbclid, gclid Links',
    metaDescription: 'Clean long tracking links locally in your browser. Remove common UTM, fbclid, gclid, msclkid, and similar parameters before sharing URLs.',
    h1: 'URL Tracking Remover',
    hero: 'Clean long tracking links before you share them. Paste a URL, remove common tracking parameters such as UTM, fbclid, and gclid, and copy a shorter privacy-friendly link.',
    primaryKeyword: 'URL tracking remover',
    cta: 'Clean URL',
    acceptedFormats: 'One full URL starting with http:// or https://.',
    outputPromise: 'Removes only documented tracking parameters and preserves other query parameters as much as the browser URL API allows.',
    what: 'This tool parses a URL locally, removes known tracking parameters, and shows exactly which parameters were removed.',
    steps: ['Paste a full URL into the input box.', 'Click Clean URL.', 'Review the removed parameter list.', 'Copy the cleaned URL.'],
    privacy: 'The URL cleaner runs entirely in the page. Pasted URLs are not sent to a server or analytics.',
    limitations: ['Unknown query parameters are preserved by default because they may be needed for page behavior.', 'Tracking can also appear in redirects, path segments, or encoded nested URLs; this tool does not guess unless a rule is documented.', 'Malformed URLs show a validation message.'],
    faqs: [
      { question: 'Which parameters are removed?', answer: 'The default blocklist includes common UTM parameters, fbclid, gclid, msclkid, mc_cid, mc_eid, igshid, ref, and ref_src.' },
      { question: 'Will this break links?', answer: 'Usually no for common tracking parameters, but some websites misuse query parameters. The tool lists removed parameters so you can review the change.' },
      { question: 'Are URLs uploaded?', answer: 'No. Cleaning happens locally in your browser.' },
      { question: 'Does this remove every tracker?', answer: 'No. It removes documented query parameters only.' },
      { question: 'Can I clean multiple URLs?', answer: 'This launch version is focused on one URL at a time. Batch cleaning can be added later.' }
    ],
    related: ['sha256-file-hash', 'remove-exif-data', 'image-metadata-viewer'],
    articleSlug: 'remove-tracking-from-amazon-links'
  }
];

export const toolBySlug = new Map(tools.map((tool) => [tool.slug, tool]));
export const categories = Array.from(new Set(tools.map((tool) => tool.category)));
