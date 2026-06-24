import type { ToolKind } from './tools';

export type ToolContentExtra = {
  intent: string;
  bestFor: string[];
  localWorkflow: string[];
  qualityChecks: string[];
  avoid: string[];
  comparison: {
    heading: string;
    body: string;
  };
};

export const toolContentExtras: Record<ToolKind, ToolContentExtra> = {
  'remove-exif': {
    intent: 'Use this page when you want to remove supported photo metadata before posting, selling, emailing, or publishing an image and you do not want to upload that image to a remote cleanup service.',
    bestFor: [
      'Marketplace photos where camera, date, or location details are not needed.',
      'Blog, portfolio, and social images that should not expose device or editing software details.',
      'Photos taken at home, school, work, or another sensitive location where GPS or capture data may be stored.',
      'A quick before-and-after metadata check before sharing a cleaned copy.'
    ],
    localWorkflow: [
      'Keep the original file on your device and select it in the browser tool.',
      'Review the detected metadata groups before cleaning so you understand what is present.',
      'Create the cleaned copy locally and download it with a clear filename.',
      'Open the cleaned file and run it through the metadata viewer if the image is sensitive.'
    ],
    qualityChecks: [
      'Confirm the visible image still looks acceptable after browser re-encoding.',
      'Check that GPS, camera, software, and date fields are no longer detected when supported.',
      'Look at the image itself for faces, documents, addresses, license plates, reflections, and landmarks.',
      'Share the cleaned copy, not the original file.'
    ],
    avoid: [
      'Do not describe any metadata remover as forensic sanitization.',
      'Do not assume every proprietary metadata block can be detected in every format.',
      'Do not rely on metadata removal if the visible photo already reveals private information.',
      'Do not upload sensitive originals to a third-party tool just to verify basic metadata.'
    ],
    comparison: {
      heading: 'Local EXIF remover vs cloud EXIF remover',
      body: 'A cloud EXIF remover may upload the original photo to a remote server for processing. Privacy Toolbox is designed for local browser processing instead: the selected supported image is handled in your tab and exported as a new local download. That privacy model is useful for everyday sharing, but it still requires a visual review and a second metadata check for sensitive files.'
    }
  },
  'remove-gps': {
    intent: 'Use this page when your main concern is location metadata in a photo and you want to remove supported GPS fields before sharing the image.',
    bestFor: [
      'Photos taken near your home, workplace, school, hotel, or family location.',
      'Images prepared for marketplace listings, forums, classifieds, or public social posts.',
      'Checking whether a phone or camera saved latitude and longitude fields.',
      'Creating a cleaned copy without sending GPS coordinates to a server.'
    ],
    localWorkflow: [
      'Choose the photo and wait for the local GPS scan.',
      'Read the GPS status before cleaning so you know whether location fields were detected.',
      'Remove supported GPS fields and download the new copy.',
      'Check the cleaned image again before sharing it publicly.'
    ],
    qualityChecks: [
      'Verify that GPS fields are no longer detected in the output when supported.',
      'Inspect the visible image for location clues such as signs, landmarks, house numbers, or maps.',
      'Be cautious with images that were previously uploaded to cloud albums or social apps.',
      'Keep the original private and share only the cleaned copy.'
    ],
    avoid: [
      'Do not claim the tool hides where a photo was taken if the place is visible in the pixels.',
      'Do not paste or email exact GPS coordinates when reporting issues.',
      'Do not assume screenshots contain EXIF GPS; many screenshots have different metadata behavior.',
      'Do not treat metadata cleaning as legal redaction.'
    ],
    comparison: {
      heading: 'GPS removal is different from hiding a location visually',
      body: 'GPS metadata is stored in file fields. Visible location clues are stored in the image itself. This tool targets supported metadata fields; it does not blur landmarks, faces, addresses, or text. For sensitive images, use both metadata cleaning and visual inspection.'
    }
  },
  'metadata-viewer': {
    intent: 'Use this page when you want to inspect supported EXIF, GPS, camera, software, and date fields before deciding whether a photo is safe to share.',
    bestFor: [
      'Checking whether a photo contains GPS coordinates before posting it.',
      'Comparing an original image and a cleaned copy.',
      'Understanding what camera, software, date, or copyright fields may exist in a file.',
      'Reviewing metadata locally instead of uploading a private image to an online inspector.'
    ],
    localWorkflow: [
      'Select an image file from your device.',
      'Let the browser parse supported metadata groups locally.',
      'Review location, camera, date, software, and other visible groups.',
      'Use the related removal tools if any detected fields should be cleaned.'
    ],
    qualityChecks: [
      'Compare the report before and after using a cleanup tool.',
      'Remember that unsupported fields may not appear in the report.',
      'Review visible content separately from metadata.',
      'Avoid copying private metadata values into public support messages.'
    ],
    avoid: [
      'Do not assume “no supported metadata detected” means the file has no information at all.',
      'Do not treat the viewer as forensic software.',
      'Do not publish screenshots of metadata reports that include private coordinates or dates.',
      'Do not forget that visible text and faces are not metadata.'
    ],
    comparison: {
      heading: 'Metadata viewer vs metadata remover',
      body: 'A viewer helps you understand what supported fields are present. A remover creates a new copy with supported fields cleaned. For careful sharing, first view the original, then clean it, then view the cleaned output again.'
    }
  },
  'resize-image': {
    intent: 'Use this page when an upload form, website, email, or profile image needs a smaller image size and you want the resize operation to happen locally.',
    bestFor: [
      'Reducing large phone photos before uploading them to forms or websites.',
      'Creating exact pixel dimensions for profile pictures, thumbnails, blog images, and attachments.',
      'Lowering file size when the visible quality does not need to remain original-camera quality.',
      'Preparing web images without sending the original to a cloud resizer.'
    ],
    localWorkflow: [
      'Select a supported image and review the current dimensions.',
      'Choose exact width and height or resize by percentage.',
      'Keep aspect ratio enabled unless you intentionally need a stretched output.',
      'Download the resized copy and check dimensions before using it.'
    ],
    qualityChecks: [
      'Confirm the output width and height match the target requirement.',
      'Open the result at normal size to check sharpness and compression.',
      'Use a larger source image when small text or detailed graphics must stay readable.',
      'Remember that resizing may strip or change metadata because the image is re-exported.'
    ],
    avoid: [
      'Do not upscale small images and expect new detail to appear.',
      'Do not disable aspect ratio unless distortion is acceptable.',
      'Do not use resize as a privacy guarantee; inspect metadata and visible content separately.',
      'Do not overwrite your original until you confirm the resized output works.'
    ],
    comparison: {
      heading: 'Image resizing vs image compression',
      body: 'Resizing changes pixel dimensions. Compression changes how image data is encoded. A smaller image often uses both: fewer pixels and a new compression pass. This tool focuses on a predictable local export with dimensions you can verify.'
    }
  },
  'convert-image': {
    intent: 'Use this page when you need to change an image format for compatibility, smaller sharing, transparency support, or a website requirement without uploading the image.',
    bestFor: [
      'Converting PNG screenshots to JPG when transparency is not needed.',
      'Exporting WebP for modern web use when browser support is acceptable.',
      'Creating a fresh copy that is easier to upload to services that reject one format.',
      'Checking how format conversion affects visible quality and file size.'
    ],
    localWorkflow: [
      'Select a supported image from your device.',
      'Choose the target format based on whether you need transparency, quality, or compatibility.',
      'Export the converted copy locally in the browser.',
      'Open the result and confirm quality, transparency, dimensions, and file size.'
    ],
    qualityChecks: [
      'Use PNG when transparency or sharp graphics are important.',
      'Use JPG for photos when broad compatibility matters and transparency is not needed.',
      'Use WebP when modern browser/web optimization is the goal.',
      'Check metadata separately if privacy is the reason for conversion.'
    ],
    avoid: [
      'Do not convert screenshots with text to very low-quality JPG settings.',
      'Do not expect JPG to preserve transparent backgrounds.',
      'Do not assume conversion alone is complete metadata sanitization for every format.',
      'Do not use unsupported formats for important archives without verifying compatibility.'
    ],
    comparison: {
      heading: 'PNG, JPG, and WebP in plain language',
      body: 'PNG is strong for screenshots, logos, and transparency. JPG is widely compatible for photos but uses lossy compression and no transparency. WebP can be efficient for modern websites but may not be accepted by every older workflow.'
    }
  },
  'merge-pdf': {
    intent: 'Use this page when you need to combine several PDFs into one document and prefer not to upload private documents to a server-based merger.',
    bestFor: [
      'Combining forms, receipts, invoices, statements, or supporting documents into one packet.',
      'Ordering several PDFs before submitting them through a portal.',
      'Creating a single local output from files stored on your device.',
      'Avoiding cloud upload for everyday PDF combining tasks.'
    ],
    localWorkflow: [
      'Add the PDF files in the order you want them to appear.',
      'Use move up and move down controls if the order is wrong.',
      'Merge the files locally and download the new PDF.',
      'Open the merged copy and verify page count, order, rotation, and readability.'
    ],
    qualityChecks: [
      'Check that each document appears exactly once and in the right position.',
      'Verify forms, links, bookmarks, annotations, and signatures if the PDF is important.',
      'Be aware that encrypted or corrupted PDFs may fail to load.',
      'Keep originals until you confirm the merged output is correct.'
    ],
    avoid: [
      'Do not use merging as redaction or privacy cleaning.',
      'Do not merge confidential documents on a shared or untrusted device.',
      'Do not assume all interactive PDF features survive every client-side workflow.',
      'Do not send the result until you review the full document.'
    ],
    comparison: {
      heading: 'Local PDF merge vs online PDF merge',
      body: 'Many online PDF mergers require uploading documents. A local browser merger keeps supported files inside the browser session and creates the output locally. This is safer for everyday privacy, but complex PDFs should still be checked carefully after export.'
    }
  },
  'split-pdf': {
    intent: 'Use this page when you only need certain PDF pages and want to extract page ranges locally instead of uploading the whole document.',
    bestFor: [
      'Extracting one certificate, invoice, form page, or attachment from a larger PDF.',
      'Creating smaller PDF packets for email or web forms.',
      'Saving only the pages needed for a specific task.',
      'Testing page ranges before sharing a shorter document.'
    ],
    localWorkflow: [
      'Select the PDF and wait for the local page count.',
      'Enter a single page, a range, or a comma-separated list such as 1-3, 5, 8.',
      'Create the split PDF locally and download it.',
      'Open the output to confirm the right pages were included.'
    ],
    qualityChecks: [
      'Check page numbering carefully because PDF viewers and printed labels can differ.',
      'Verify that attachments, forms, or links still behave as expected.',
      'Remember that extracting pages does not redact content on pages you keep.',
      'Keep the original until you confirm the extracted copy is correct.'
    ],
    avoid: [
      'Do not guess page ranges when the document is important.',
      'Do not assume hidden attachments or annotations are fully removed by splitting.',
      'Do not share the extracted PDF until you open and review it.',
      'Do not use page splitting as a substitute for legal redaction.'
    ],
    comparison: {
      heading: 'Split PDF vs remove PDF pages',
      body: 'Splitting exports selected pages you want to keep. Removing pages starts from the full document and excludes pages you do not want. Both create a new local copy, but neither should be described as full PDF sanitization.'
    }
  },
  'remove-pdf-pages': {
    intent: 'Use this page when you want to delete selected pages from a PDF and export a shorter local copy while keeping the original unchanged.',
    bestFor: [
      'Removing blank scanner pages, duplicate pages, separators, or extra instructions.',
      'Creating a cleaner document before emailing or uploading it.',
      'Deleting whole pages that are not needed in a packet.',
      'Reviewing a shorter PDF locally before sharing.'
    ],
    localWorkflow: [
      'Open the PDF and identify exact page numbers to remove.',
      'Enter the pages or ranges that should be excluded.',
      'Create the new PDF locally in the browser.',
      'Open the result and verify removed pages, remaining order, and readability.'
    ],
    qualityChecks: [
      'Check that you removed the correct pages and did not remove important context.',
      'Review page numbers, especially in documents with covers or Roman numeral front matter.',
      'Confirm bookmarks, links, forms, and signatures if the document relies on them.',
      'Keep the original until the final PDF has been reviewed.'
    ],
    avoid: [
      'Do not use page deletion to redact content within a page that remains in the document.',
      'Do not assume removing a page removes every hidden PDF object in every complex file.',
      'Do not delete pages without reviewing the output.',
      'Do not use this workflow for legal sanitization without a proper redaction tool.'
    ],
    comparison: {
      heading: 'Removing pages is not the same as redacting a PDF',
      body: 'Removing pages deletes whole pages from the new output. Redaction removes specific visible or hidden content from pages that stay in the document. If sensitive information appears on a kept page, it is still present.'
    }
  },
  'remove-pdf-metadata': {
    intent: 'Use this page when a PDF may expose common document properties such as author, title, creator, producer, creation date, or modification date before you send it to someone else.',
    bestFor: [
      'Cleaning common PDF document properties before emailing or uploading a file.',
      'Removing author, title, subject, creator, producer, and date fields where supported.',
      'Creating a new local copy while leaving the original PDF unchanged.',
      'Everyday privacy checks before sharing resumes, forms, invoices, or exported documents.'
    ],
    localWorkflow: [
      'Select a supported PDF from your device.',
      'Let the browser read common document-info fields locally.',
      'Export a new copy with supported metadata fields cleared.',
      'Open the downloaded PDF and verify document properties before sharing.'
    ],
    qualityChecks: [
      'Check the cleaned PDF in your normal PDF viewer.',
      'Confirm visible pages, file name, and document properties are safe to share.',
      'Review comments, attachments, form fields, and redactions separately.',
      'Keep the original until you confirm the cleaned copy works.'
    ],
    avoid: [
      'Do not call this forensic sanitization or legal redaction.',
      'Do not rely on metadata cleanup for PDFs with hidden layers, attachments, comments, or failed redactions.',
      'Do not share a sensitive PDF without opening and checking the cleaned output.',
      'Do not use this on password-protected files without first removing encryption in trusted software.'
    ],
    comparison: {
      heading: 'PDF metadata removal vs PDF redaction',
      body: 'Metadata removal clears common document property fields. Redaction permanently removes sensitive visible content from pages. If a page contains private text, metadata cleanup does not remove that text.'
    }
  },
  'remove-pdf-hidden-data': {
    intent: 'Use this page as a practical PDF sharing checklist and local cleanup step when you are worried about common hidden data, metadata, and document properties.',
    bestFor: [
      'Rewriting a supported PDF into a cleaner local copy before routine sharing.',
      'Clearing common document-info metadata fields as one privacy step.',
      'Learning which hidden-data risks require manual review or specialist redaction tools.',
      'Avoiding misleading redirects from old hidden-data URLs to unrelated PDF tools.'
    ],
    localWorkflow: [
      'Select the PDF and run the browser-only cleanup.',
      'Download the rewritten copy.',
      'Open the result and inspect pages, comments, attachments, forms, and document properties.',
      'Use specialist redaction software for legal or high-risk documents.'
    ],
    qualityChecks: [
      'Search the output for sensitive words before sharing.',
      'Check comments, attachments, form fields, layers, bookmarks, and document properties.',
      'Confirm black boxes are real redactions, not just shapes over text.',
      'Use the metadata removal page when your main concern is title, author, creator, or date fields.'
    ],
    avoid: [
      'Do not promise that every hidden object in every PDF is removed.',
      'Do not treat page deletion or metadata cleanup as legal redaction.',
      'Do not send documents with visible sensitive content still present.',
      'Do not use browser cleanup as the only review for compliance, medical, legal, or financial documents.'
    ],
    comparison: {
      heading: 'Hidden data cleanup vs full sanitization',
      body: 'This local workflow helps with common document-info metadata and everyday sharing hygiene. Full sanitization can require flattening, attachment removal, annotation review, OCR checks, and professional redaction verification.'
    }
  },
  sha256: {
    intent: 'Use this page when you need to calculate a SHA-256 checksum for a local file and compare it with a trusted value from the software publisher or file provider.',
    bestFor: [
      'Verifying downloaded software against a published SHA-256 checksum.',
      'Checking whether two local files are byte-for-byte identical.',
      'Documenting file integrity for your own workflow without uploading the file.',
      'Learning what a checksum can and cannot prove.'
    ],
    localWorkflow: [
      'Select the file you want to verify.',
      'Let the browser read the file and calculate the SHA-256 digest locally.',
      'Copy the result and compare it exactly with the trusted published checksum.',
      'Download again from the official source if the values do not match.'
    ],
    qualityChecks: [
      'Compare every character; one changed byte produces a different hash.',
      'Use the checksum from the official publisher, not a random forum or mirror.',
      'Remember that a matching hash proves byte identity, not file safety.',
      'Do not publish hashes of private files if exact-file matching would be sensitive.'
    ],
    avoid: [
      'Do not treat SHA-256 as a malware scan.',
      'Do not trust a checksum from the same untrusted place as a suspicious download.',
      'Do not upload private files to a checksum website when local hashing is enough.',
      'Do not share the selected file or its private filename in support messages.'
    ],
    comparison: {
      heading: 'Checksum verification vs virus scanning',
      body: 'A checksum tells you whether bytes match an expected value. It does not tell you whether those bytes are safe. For software downloads, compare the hash with the official source and still use normal security checks.'
    }
  },
  'url-cleaner': {
    intent: 'Use this page when a link contains campaign or click-tracking parameters and you want to create a cleaner sharing URL locally in your browser.',
    bestFor: [
      'Removing common UTM campaign tags before sharing an article or product page.',
      'Cleaning fbclid, gclid, msclkid, mc_cid, mc_eid, and similar click identifiers.',
      'Reviewing which parameters were removed and which were preserved.',
      'Making long links easier to read without sending the URL to a remote cleaner.'
    ],
    localWorkflow: [
      'Paste the URL into the local cleaner.',
      'Review removed tracking parameters and preserved parameters.',
      'Copy the cleaned URL.',
      'Test important links before sending them to someone else.'
    ],
    qualityChecks: [
      'Preserve unknown parameters that may control search, filters, language, coupons, or product variants.',
      'Avoid cleaning private account, invite, reset, payment, or tokenized URLs in any shared environment.',
      'Check that the cleaned link still opens the intended destination.',
      'Remember URL cleaning is not a full anti-tracking system.'
    ],
    avoid: [
      'Do not paste passwords, private tokens, invite links, or reset links into any tool you do not fully trust.',
      'Do not remove every query parameter automatically; some are required for the page to work.',
      'Do not claim cleaned URLs stop cookies, fingerprinting, or account-based tracking.',
      'Do not use URL cleaning as a substitute for browser privacy settings or security tools.'
    ],
    comparison: {
      heading: 'Tracking parameter remover vs ad blocker',
      body: 'A tracking parameter remover cleans visible URL parameters before you share a link. It does not block ads, scripts, cookies, redirects, or tracking after you visit a website. It is a sharing hygiene tool, not a full privacy extension.'
    }
  }
};
