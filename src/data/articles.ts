export type Article = {
  slug: string;
  title: string;
  description: string;
  relatedTool: string;
  updated: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
  faqs: { question: string; answer: string }[];
};

const updated = '2026-06-24';

export const articles: Article[] = [
  {
    slug: 'what-is-exif-data',
    title: 'What is EXIF data and why should you remove it?',
    description: 'Learn what EXIF photo metadata can reveal, when removing supported fields helps, and what metadata removal cannot guarantee.',
    relatedTool: 'remove-exif-data',
    updated,
    intro: 'EXIF data is metadata that can be stored inside photos. It can help cameras and editing apps remember technical details, but it can also reveal private information when images are shared publicly.',
    sections: [
      { heading: 'What EXIF data can include', body: ['A photo may store camera make and model, lens information, exposure settings, orientation, capture date, editing software, embedded thumbnails, author fields, copyright fields, and GPS coordinates. Not every image contains every field.', 'Metadata behavior varies by device, app, and file format. A social app may remove some fields, preserve others, or create a new copy with different information. Checking the file yourself is safer than assuming metadata has been stripped.'] },
      { heading: 'Why EXIF matters for privacy', body: ['Camera and location fields can connect a public image to a device, time, editing workflow, or place. That may be harmless for a product photo but risky for photos taken at home, school, work, a hotel, or a private event.', 'EXIF is not the only privacy risk in an image. Faces, license plates, badges, documents, street signs, reflections, and landmarks are visible content, not metadata. You need to review both the file data and the picture itself.'] },
      { heading: 'How browser-only removal works', body: ['A browser-only metadata remover reads the selected photo locally, redraws or exports a new copy, and creates a local download in the browser tab. The supported file does not need to be uploaded to a remote processing server.', 'The correct wording is “supported metadata” because proprietary or unusual fields may exist outside what a browser tool can detect. After cleaning, check the cleaned copy with a metadata viewer before publishing sensitive images.'] },
      { heading: 'When removal helps most', body: ['Remove supported EXIF fields before posting marketplace photos, publishing blog images, sending pictures to people you do not know well, or sharing photos taken near private locations.', 'If the image is part of a legal, employment, medical, or identity workflow, use a specialist redaction process. Browser metadata cleanup is useful for everyday privacy hygiene, not forensic sanitization.'] },
      { heading: 'Safe workflow before sharing', body: ['Keep the original file private, scan the photo for supported metadata, create a cleaned copy, scan the cleaned copy again, and then inspect visible content before uploading or emailing it.', 'Name the cleaned copy clearly so you do not accidentally share the original. When possible, test the final file on the same service where you plan to upload it, because some services reprocess images after upload.'] }
    ],
    faqs: [
      { question: 'Does every photo contain EXIF data?', answer: 'No. Some images have no EXIF data, and some apps remove metadata during export or upload.' },
      { question: 'Is EXIF removal the same as redaction?', answer: 'No. EXIF removal handles supported metadata fields. Redaction removes or hides visible content, which is a different task.' },
      { question: 'Can metadata removal make a photo anonymous?', answer: 'No. It can reduce metadata exposure, but visible content and unsupported fields may still reveal information.' }
    ]
  },
  {
    slug: 'remove-photo-metadata-before-sharing',
    title: 'How to remove photo metadata before sharing online',
    description: 'A practical checklist for cleaning supported photo metadata locally before posting images on social media, marketplaces, forums, or websites.',
    relatedTool: 'remove-exif-data',
    updated,
    intro: 'Before you post a photo publicly, it is worth checking whether the file contains metadata you do not need to share. This guide explains a simple local workflow that keeps the original photo on your device.',
    sections: [
      { heading: 'Start with the original file', body: ['Use the original file from your camera, phone, or editor only as your private source. Do not upload it to random tools just to inspect it. A local viewer can show supported metadata fields in your browser.', 'Make a copy for sharing and keep the original in a private folder. This prevents accidental replacement and gives you a clean audit trail if you need to compare before and after results.'] },
      { heading: 'Check metadata before cleaning', body: ['Look for GPS, capture date, camera model, software, copyright, author, comments, thumbnails, and editing history. Not every photo will contain all of these fields.', 'If no supported metadata is detected, still review the visible image. A photo can reveal location or identity through the pixels even when the metadata looks empty.'] },
      { heading: 'Create and verify the cleaned copy', body: ['Use a browser-only remover to export a fresh copy without supported metadata fields. Download the cleaned file and run it through a viewer again.', 'Verification matters because different formats and browser encoders behave differently. The safest everyday workflow is clean, download, inspect, then share the cleaned file only.'] },
      { heading: 'Review visible privacy clues', body: ['Metadata removal cannot hide faces, uniforms, documents, screens, house numbers, street signs, license plates, reflections, maps, or unique buildings. These clues require cropping, blurring, redaction, or a different photo.', 'For children, workplaces, private homes, and sensitive events, the visual review is just as important as metadata cleanup.'] },
      { heading: 'Choose honest expectations', body: ['A local metadata remover is a privacy hygiene tool. It can reduce accidental metadata exposure for supported fields, but it should not be described as anonymous, forensic, or guaranteed to remove every possible hidden value.', 'Use careful language when explaining cleaned files to other people: “supported metadata was removed locally” is more accurate than “all hidden data is gone.”'] }
    ],
    faqs: [
      { question: 'Should I remove metadata from every photo?', answer: 'It is most useful before public sharing, marketplace listings, and photos taken in private or sensitive places.' },
      { question: 'Will social media remove metadata automatically?', answer: 'Some platforms strip some metadata, but behavior varies. Checking and cleaning before upload gives you more control.' },
      { question: 'Can the cleaned copy be smaller?', answer: 'Yes. Browser re-encoding can change file size, format characteristics, and compression.' }
    ]
  },
  {
    "slug": "how-to-check-photo-gps",
    "title": "How to check if a photo has location data",
    "description": "Find out whether a photo contains GPS metadata, what location fields mean, and how to verify a cleaned copy before sharing.",
    "relatedTool": "image-metadata-viewer",
    "updated": "2026-06-24",
    "intro": "A photo can reveal location through hidden metadata or through visible details in the image. This guide shows how to check supported GPS fields locally and decide what to do before sharing.",
    "sections": [
      {
        "heading": "Quick answer",
        "body": [
          "Open the photo in a local metadata viewer and look for GPS, location, latitude, longitude, altitude, map datum, or location timestamp fields. If any supported location fields appear, clean the photo and scan the cleaned copy again.",
          "Do not rely only on the image preview. GPS coordinates are usually invisible during normal viewing, but they can still travel with the file depending on how it is shared."
        ]
      },
      {
        "heading": "Common location metadata fields",
        "body": [
          "Photo location data can include latitude, longitude, altitude, direction, speed, timestamp, map datum, or XMP location fields. Some apps also add place names or estimated locations outside classic EXIF GPS fields.",
          "A metadata viewer may show coordinates rather than an address. Even coordinates rounded to fewer decimals can identify a sensitive area, so treat location fields as private data."
        ]
      },
      {
        "heading": "Check the exact file you will share",
        "body": [
          "Metadata can change when a photo is exported, edited, downloaded from cloud storage, sent through messaging, or saved from a social app. Check the final file, not only the original in your gallery.",
          "If you create a resized or converted copy, check that copy too. Browser export may remove many metadata fields, but verification is better than guessing."
        ]
      },
      {
        "heading": "Android, iPhone, and cloud photo libraries",
        "body": [
          "Phones may store camera GPS when location permission is enabled. Cloud photo libraries may also show estimated or manually added locations. Google Photos explains that camera-added location cannot always be changed or removed inside Google Photos itself, so file-level verification is still useful.",
          "For iPhone photos, Apple explains that location metadata can be shared with photos and videos. Review device settings, sharing settings, and the actual file before posting sensitive images."
        ]
      },
      {
        "heading": "Look for visible location clues",
        "body": [
          "Metadata is not the only way to reveal location. Street signs, license plates, school logos, badges, uniforms, maps, buildings, reflections, package labels, and screenshots can reveal a place even after GPS fields are removed.",
          "Before publishing, zoom in and review the whole image. If the visible content is sensitive, crop, blur, redact, or do not share the photo."
        ]
      },
      {
        "heading": "Privacy-safe verification workflow",
        "body": [
          "Use this sequence: inspect original, remove supported GPS or EXIF fields, download cleaned copy, inspect cleaned copy, review visible content, then share only the cleaned file.",
          "Avoid copying private GPS values into support emails, analytics tools, public forums, or bug reports. If you need help, describe the browser, file type, and error without sending the private photo or coordinates."
        ]
      }
    ],
    "faqs": [
      {
        "question": "Can a photo have location data without showing a map?",
        "answer": "Yes. GPS metadata can be hidden inside file fields and may not appear in a normal image preview."
      },
      {
        "question": "Can Google Photos remove all location data?",
        "answer": "Google Photos has location controls, but camera-added location and file metadata behavior can vary. Check the exported file before sharing."
      },
      {
        "question": "Can screenshots have GPS data?",
        "answer": "Many screenshots do not contain camera GPS metadata, but you should still check sensitive images because formats and apps vary."
      },
      {
        "question": "Does no GPS metadata mean the photo is safe?",
        "answer": "No. Visible content can still reveal the location or identity of people and places."
      }
    ]
  },
  {
    "slug": "remove-gps-from-iphone-photos",
    "title": "How to remove GPS from iPhone photos before sharing",
    "description": "Learn how to remove, check, and verify location metadata from iPhone photos before sending or uploading them.",
    "relatedTool": "remove-gps-from-photo",
    "updated": "2026-06-24",
    "intro": "iPhone photos can include location metadata when Camera has location access. Before you share a personal photo, check the exported file, remove supported GPS fields, and verify the cleaned copy.",
    "sections": [
      {
        "heading": "Quick answer",
        "body": [
          "To reduce location exposure, first check whether the photo file contains GPS metadata, then create a cleaned copy with supported GPS fields removed, and finally scan the cleaned copy again before sharing.",
          "On iPhone, location information may also be controlled in the Photos sharing options and in Camera location permissions. The safest workflow is still to verify the actual file you plan to upload or send, because metadata behavior can change depending on the app and sharing method."
        ]
      },
      {
        "heading": "Why iPhone photos can reveal location",
        "body": [
          "When location access is enabled for the Camera app, iPhone photos may store coordinates that can identify a home, school, workplace, hotel, clinic, event venue, or travel route. Apple warns that people you share photos with may be able to access location metadata if it is included.",
          "The risk is highest when you share original files, send images by file transfer, post marketplace photos, publish images on a website, or pass files through apps that preserve metadata."
        ]
      },
      {
        "heading": "Step-by-step local workflow",
        "body": [
          "First, save or export the image you actually plan to share. Next, open the Privacy Toolbox GPS remover and select that photo. If GPS metadata is detected, remove supported location fields and download the cleaned copy.",
          "After downloading, use the metadata viewer or GPS remover again on the cleaned copy. Only share the cleaned file after confirming supported GPS fields are no longer detected."
        ]
      },
      {
        "heading": "Also check iPhone sharing settings",
        "body": [
          "When sharing directly from the iPhone Photos app, review the sharing options for location before sending. This can help in normal iPhone-to-app sharing flows, but it should not replace checking the final file when the photo is sensitive.",
          "For future photos, consider whether the Camera app needs location permission. Disabling location for Camera can reduce new geotagging, but it does not remove location data from old photos."
        ]
      },
      {
        "heading": "Visible clues can still reveal the place",
        "body": [
          "Removing GPS metadata does not remove street signs, building names, maps, school logos, ID badges, license plates, reflections, house numbers, or landmarks from the image itself.",
          "For sensitive images, crop or blur visible clues before sharing, or choose a different photo. Metadata cleanup is one privacy step, not a full anonymity guarantee."
        ]
      },
      {
        "heading": "Best related tools",
        "body": [
          "Use Remove GPS from Photo when the main concern is geotag data. Use View Image Metadata when you want to inspect the file before and after cleanup. Use Remove EXIF Metadata when you want a broader supported metadata cleanup.",
          "Keep the original photo private and use clear filenames such as photo-cleaned.jpg so you do not accidentally upload the original later."
        ]
      }
    ],
    "faqs": [
      {
        "question": "Can iPhone photos include GPS coordinates?",
        "answer": "Yes. If Camera had location access and the metadata was preserved, the image file may contain GPS coordinates or related location fields."
      },
      {
        "question": "Does removing GPS from an iPhone photo remove all metadata?",
        "answer": "No. GPS cleanup targets supported location fields. Other metadata and visible clues may still exist, so verify the cleaned output."
      },
      {
        "question": "Is turning off Camera location enough for old photos?",
        "answer": "No. It can reduce future geotagging, but old photos should still be checked and cleaned before sharing."
      },
      {
        "question": "Can AirDrop or messaging keep location data?",
        "answer": "Metadata behavior depends on sharing settings, app behavior, and export method. Check the final file when privacy matters."
      }
    ]
  },
  {
    slug: 'image-metadata-privacy-checklist',
    title: 'Image metadata privacy checklist before uploading photos',
    description: 'Review this checklist before uploading photos to marketplaces, websites, forums, and social profiles.',
    relatedTool: 'image-metadata-viewer',
    updated,
    intro: 'A quick metadata and visual review can prevent accidental sharing of location, camera, date, software, or personal context in photos.',
    sections: [
      { heading: 'Check the file metadata', body: ['Use a local metadata viewer to inspect supported GPS, camera, software, capture date, copyright, and other fields. Focus first on location, date, author, and device information.', 'The viewer should not upload the image or send metadata values to analytics. Sensitive metadata can be just as private as the photo itself.'] },
      { heading: 'Check the visible image', body: ['Look for faces, badges, paperwork, labels, addresses, screens, usernames, QR codes, license plates, reflections, and landmarks. Metadata cleanup will not remove any of these visible details.', 'Zoom in before sharing. Details that are hard to notice at thumbnail size can still be readable in the full-resolution image.'] },
      { heading: 'Clean what you do not need', body: ['If supported metadata is present, create a cleaned copy and verify the output. If visible content is sensitive, crop, blur, redact, or use a different image.', 'For marketplace photos, remove metadata and also check backgrounds. A home address on a package label or a reflection in a window can be more revealing than EXIF fields.'] },
      { heading: 'Keep a repeatable workflow', body: ['Use the same process each time: inspect, clean, verify, visually review, then upload. A repeatable checklist is faster and safer than guessing from memory.', 'Store cleaned copies in a separate folder so you do not accidentally upload originals later.'] }
    ],
    faqs: [
      { question: 'What is the most important metadata to check?', answer: 'GPS location, capture date, device/camera details, author fields, and editing software are common privacy-relevant fields.' },
      { question: 'Can metadata come back after editing?', answer: 'Some editors can add new software or export metadata. Check the final exported file, not only the original.' },
      { question: 'Is a metadata viewer enough?', answer: 'No. It helps you inspect supported fields, but you should also review visible content.' }
    ]
  },
  {
    slug: 'resize-images-for-web-without-uploading',
    title: 'How to resize images for the web without uploading them',
    description: 'Learn how to resize photos and graphics locally for faster pages, smaller attachments, and better upload compatibility.',
    relatedTool: 'resize-image',
    updated,
    intro: 'Large images can slow websites, fail upload forms, and make emails heavier than necessary. A browser-only image resizer lets you create a smaller copy locally.',
    sections: [
      { heading: 'Choose the right dimensions', body: ['Start with the final use. A blog hero image, profile picture, product thumbnail, and email attachment all need different sizes. Avoid uploading full camera-resolution photos when the display area is much smaller.', 'Keep aspect ratio enabled for most photos. Stretching an image to fit exact dimensions can distort faces, logos, products, and text.'] },
      { heading: 'Balance quality and file size', body: ['Fewer pixels usually means a smaller file, but compression settings and image format also matter. Check the output visually before publishing, especially for screenshots or images with small text.', 'For websites, smaller images can improve perceived speed and make pages more mobile-friendly. Still, do not resize so aggressively that the image becomes blurry or unreadable.'] },
      { heading: 'Privacy considerations', body: ['Resizing with browser APIs often creates a new export and may remove or change metadata, but you should not rely on resizing as a complete privacy tool. Use a metadata viewer if privacy is the reason you are editing the file.', 'A local resizer avoids uploading your original image to a remote service. That is helpful for everyday privacy and for images that do not need cloud processing.'] },
      { heading: 'Verification checklist', body: ['Confirm output width and height, open the file at normal display size, check file size, inspect visible content, and verify metadata if the image is sensitive.', 'Keep the original until the resized copy has been accepted by the form, website, or recipient.'] }
    ],
    faqs: [
      { question: 'What size should I use for a website image?', answer: 'Use dimensions close to the actual display size. Many content images work well below full camera resolution.' },
      { question: 'Does resizing reduce quality?', answer: 'It can. Downscaling usually preserves enough quality for web use, but the result should be checked visually.' },
      { question: 'Does resizing remove metadata?', answer: 'It may remove or change some metadata during export, but use a metadata remover/viewer for privacy verification.' }
    ]
  },
  {
    slug: 'png-jpg-webp-which-format-to-use',
    title: 'PNG vs JPG vs WebP: which image format should you use?',
    description: 'Compare PNG, JPG, and WebP for photos, screenshots, transparency, compatibility, and privacy-focused local conversion.',
    relatedTool: 'convert-image',
    updated,
    intro: 'Choosing an image format affects quality, transparency, file size, compatibility, and sometimes metadata behavior. This guide explains the practical differences.',
    sections: [
      { heading: 'Use JPG for broad photo compatibility', body: ['JPG is widely supported and usually works well for photographs. It uses lossy compression, which means the file can be smaller but some detail is discarded during export.', 'JPG does not support transparency. If you convert a transparent PNG to JPG, the transparent area may become a solid background depending on the export process.'] },
      { heading: 'Use PNG for transparency and sharp graphics', body: ['PNG is useful for screenshots, logos, icons, interface images, and graphics where sharp edges or transparency matter. It can be larger than JPG for photographs.', 'If small text is important, test JPG and PNG outputs. PNG often preserves screenshot text more clearly, while JPG may introduce compression artifacts.'] },
      { heading: 'Use WebP for modern web optimization', body: ['WebP can offer strong compression for websites and supports features such as transparency. It is widely supported in modern browsers, but some older workflows or upload forms may still reject it.', 'When compatibility is uncertain, keep a JPG or PNG fallback available. Always test the final file where you plan to upload it.'] },
      { heading: 'Privacy and conversion', body: ['Converting an image locally can create a fresh file without uploading the original. However, format conversion should not be described as guaranteed metadata removal in every case.', 'If privacy is the goal, convert if needed, then check the final file with a metadata viewer and inspect visible content before sharing.'] }
    ],
    faqs: [
      { question: 'Is WebP always better?', answer: 'No. WebP can be efficient, but compatibility and workflow requirements matter.' },
      { question: 'Should I convert PNG to JPG?', answer: 'For photos, sometimes. For transparency, screenshots, and logos, PNG may be better.' },
      { question: 'Can conversion change file size?', answer: 'Yes. Output size depends on format, dimensions, image content, and compression.' }
    ]
  },
  {
    slug: 'convert-image-without-losing-transparency',
    title: 'How to convert images without losing transparency',
    description: 'Understand which image formats preserve transparency and how to avoid unwanted backgrounds when converting images locally.',
    relatedTool: 'convert-image',
    updated,
    intro: 'Transparency is easy to lose when converting images. If you need a logo, icon, product cutout, or overlay to keep a transparent background, choose the output format carefully.',
    sections: [
      { heading: 'Formats that support transparency', body: ['PNG and WebP can support transparent backgrounds. JPG does not support transparency, so a transparent area must become a color when exported to JPG.', 'If your image is a logo, sticker, overlay, or product cutout, converting to JPG may create an unwanted white, black, or default background.'] },
      { heading: 'Test the output visually', body: ['Open the converted file on a contrasting background to confirm the transparent area is still transparent. A viewer with a checkerboard background can make this easier.', 'Also check edges around objects. Some conversions can introduce halos, rough edges, or color changes if the original transparency was complex.'] },
      { heading: 'When JPG is still useful', body: ['JPG is useful when you have a normal photo and do not need transparency. It is broadly compatible and can create smaller files for photo sharing.', 'For screenshots, logos, and images with text, compare output quality before choosing JPG because compression artifacts can make edges and letters look fuzzy.'] },
      { heading: 'Local conversion workflow', body: ['Use a local converter when the original file is private or when you simply do not need a cloud service. Select the input, choose PNG or WebP when transparency matters, export, then inspect the result.', 'If the converted image will be uploaded to a strict form, confirm the accepted format and size before converting.'] }
    ],
    faqs: [
      { question: 'Can JPG have transparency?', answer: 'No. Use PNG or WebP if transparency is required.' },
      { question: 'Why did my background turn white?', answer: 'The output format or converter likely flattened the transparent area onto a solid background.' },
      { question: 'Is PNG always best for logos?', answer: 'PNG is a safe compatibility choice for transparent logos. WebP may be efficient for modern websites if accepted.' }
    ]
  },
  {
    "slug": "merge-pdf-files-without-uploading",
    "title": "How to merge PDF files without uploading them",
    "description": "Combine PDFs locally in your browser, choose the right order, avoid privacy mistakes, and verify the merged file before sharing.",
    "relatedTool": "merge-pdf",
    "updated": "2026-06-24",
    "intro": "PDFs often contain private documents such as forms, statements, invoices, IDs, contracts, and certificates. A browser-only merger lets you combine supported PDFs without sending them to a remote processing server.",
    "sections": [
      {
        "heading": "Quick answer",
        "body": [
          "Use a browser-only PDF merger, add the files in the correct order, create the merged PDF locally, then open the output and check page count, page order, readability, and sensitive content before sharing.",
          "This is useful when you need one combined document but do not want to upload private PDFs to a third-party service."
        ]
      },
      {
        "heading": "Why local merging is better for private PDFs",
        "body": [
          "Many PDFs include personal names, addresses, account numbers, signatures, health details, school records, invoices, or business documents. Uploading them to an unknown tool can create unnecessary privacy exposure.",
          "Local browser merging keeps supported files in your browser session. The site still cannot fix risks from malware, shared devices, browser extensions, screenshots, or documents you later upload elsewhere."
        ]
      },
      {
        "heading": "Prepare the PDFs first",
        "body": [
          "Rename files so the order is obvious, remove pages you do not want included, and open each source PDF before merging. Do not combine documents just because they are in the same folder.",
          "If one PDF contains a page that should not be shared, remove that page first. If a page contains private text you must keep around, use proper redaction rather than just merging."
        ]
      },
      {
        "heading": "Merge and verify",
        "body": [
          "Add the PDFs to the merge tool, reorder them if needed, and create the merged file. After downloading, open the result in a PDF viewer and verify the page order from beginning to end.",
          "Check forms, links, page orientation, signatures, scanned pages, and readability. Some complex PDFs may behave differently after being copied into a new document."
        ]
      },
      {
        "heading": "Merging is not sanitization",
        "body": [
          "Merging PDFs does not remove hidden metadata, comments, attachments, form values, bookmarks, or sensitive visible content. It simply combines pages into a new document for the supported workflow.",
          "For legal, medical, financial, or workplace disclosures, use a specialist PDF review workflow and verify the final file carefully."
        ]
      },
      {
        "heading": "Best internal workflow",
        "body": [
          "Use Remove PDF Pages before merging if whole pages should be excluded. Use Split PDF if you only need certain pages from a larger document. Use Merge PDF last when the final packet is ready.",
          "Keep originals private until the recipient confirms the merged document is acceptable."
        ]
      }
    ],
    "faqs": [
      {
        "question": "Are my PDFs uploaded when I merge them here?",
        "answer": "No. Supported PDFs are processed locally in your browser."
      },
      {
        "question": "Can I change the order before merging?",
        "answer": "Yes. Add and arrange files in the order you want before creating the final PDF."
      },
      {
        "question": "Does merging make the PDF smaller?",
        "answer": "Not necessarily. Merging combines pages and may keep large images or embedded objects."
      },
      {
        "question": "Can merging remove private pages?",
        "answer": "No. Remove unwanted pages before merging, then check the merged output."
      }
    ]
  },
  {
    slug: 'safe-pdf-workflow-before-sharing',
    title: 'Safe PDF workflow before sharing documents online',
    description: 'A practical privacy checklist for merging, splitting, removing pages, and reviewing PDFs before you upload or email them.',
    relatedTool: 'merge-pdf',
    updated,
    intro: 'PDFs can contain private pages, visible text, form data, comments, bookmarks, and embedded objects. Before sharing a document, use a careful workflow instead of only checking the filename.',
    sections: [
      { heading: 'Review the whole document', body: ['Open the PDF and scan every page. Look for private addresses, account numbers, signatures, faces, barcodes, QR codes, notes, comments, and pages that do not belong in the final packet.', 'Do not rely on thumbnails alone. Some private details are only visible when you zoom in or search text inside the PDF.'] },
      { heading: 'Use the right operation', body: ['Merge PDFs when you need one combined packet. Split PDFs when you only need selected pages. Remove pages when you want to exclude whole pages. Use redaction when private content appears on a page you must keep.', 'These operations are related but not interchangeable. Page removal and splitting are not full PDF sanitization, and merging is not a privacy cleanup step.'] },
      { heading: 'Prefer local processing for sensitive documents', body: ['A browser-only workflow can reduce unnecessary uploads for everyday PDF tasks. This is useful for forms, receipts, invoices, school papers, travel documents, and personal records.', 'Use a trusted device and network. Local processing protects against uploading to a processing server, but it does not protect against malware, screenshots, shared devices, or insecure storage.'] },
      { heading: 'Verify the final output', body: ['Open the output file, check page count and order, search for terms that should not appear, and verify that any forms or links still work if they matter.', 'Keep originals private until the final copy has been accepted. Name final files clearly so you do not accidentally send the wrong version.'] }
    ],
    faqs: [
      { question: 'Can browser PDF tools handle every PDF?', answer: 'No. Very large, encrypted, corrupted, or complex PDFs may fail or need specialist software.' },
      { question: 'Is removing a page redaction?', answer: 'No. It removes whole pages only. Content on kept pages remains.' },
      { question: 'Should I check metadata in PDFs?', answer: 'For sensitive workflows, yes. Basic page tools are not the same as full PDF metadata sanitizers.' }
    ]
  },
  {
    slug: 'extract-one-page-from-pdf',
    title: 'How to extract one page from a PDF',
    description: 'Use page ranges to split a PDF locally and export only the page or pages you need without uploading supported files.',
    relatedTool: 'split-pdf',
    updated,
    intro: 'Extracting a page is a common PDF workflow for forms, invoices, certificates, and attachments. A browser-only splitter can do this locally for supported PDFs.',
    sections: [
      { heading: 'Use a page range', body: ['To extract one page, enter a single page number. To extract several pages, enter a list or range such as 1-3, 5, 8-10. A strict parser should reject invalid page ranges instead of guessing.', 'Check whether the tool preserves the order you enter. For example, extracting 5, 2 may be useful if you need a custom order, but you should verify the output.'] },
      { heading: 'Match page numbers carefully', body: ['PDF viewers sometimes show labels that differ from actual page positions, especially when a document has a cover, table of contents, or Roman numeral front matter. Count from the tool page count if there is any doubt.', 'Before sending the extracted file, open it and confirm that the first and last pages are correct. This simple check prevents many document-sharing mistakes.'] },
      { heading: 'Verify the output', body: ['Open the exported PDF and confirm the page count, content, orientation, and readability before sending it to someone else. If the document contains forms, links, or signatures, check those too.', 'Extracting pages does not redact sensitive information from kept pages. If a kept page contains private text or images, they remain in the output.'] },
      { heading: 'Privacy advantages of local splitting', body: ['Browser-only splitting creates a new PDF locally, which avoids uploading sensitive documents to a remote tool. This is helpful for IDs, certificates, invoices, contracts, and personal records.', 'Very large, encrypted, corrupted, or complex PDFs may not load in browser memory. A clear error is better than silently creating an incomplete output.'] },
      { heading: 'Common extraction examples', body: ['Use a single page number to export one certificate page. Use 1-2 for a cover letter and resume. Use 3, 5, 7-9 for selected pages from a larger packet.', 'For recurring tasks, write down the correct page ranges in your own workflow notes so you do not repeat manual counting every time.'] }
    ],
    faqs: [
      { question: 'Can I extract pages out of order?', answer: 'The page range parser can preserve the order you enter when supported by the tool.' },
      { question: 'Is the original changed?', answer: 'No. The tool exports a new local file.' },
      { question: 'Can splitting remove hidden PDF data?', answer: 'It copies selected pages into a new PDF, but it is not a full PDF sanitizer.' }
    ]
  },
  {
    slug: 'remove-blank-pages-from-pdf',
    title: 'How to remove blank pages from a PDF',
    description: 'Remove selected blank, duplicate, or unwanted pages from a PDF locally in the browser and verify the new copy before sharing.',
    relatedTool: 'remove-pdf-pages',
    updated,
    intro: 'Blank pages often appear in scanned PDFs, forms, and combined documents. Removing them makes files easier to read and share.',
    sections: [
      { heading: 'Identify pages first', body: ['Open or preview the PDF and note the page numbers you want to remove. The current tool removes pages by number, not by automatically detecting blank content.', 'Be careful with scanned documents because a page that looks blank may contain a faint stamp, signature, page number, or backside scan. Review before deleting.'] },
      { heading: 'Create a new copy', body: ['The safest browser-only method is to copy kept pages into a new document instead of mutating the original file. This keeps the original on your device and gives you a new output to review.', 'After removing pages, open the result and confirm that the correct pages are gone and the remaining pages are still in the expected order.'] },
      { heading: 'Check links and signatures', body: ['Removing pages can affect bookmarks, internal links, page labels, tables of contents, and digital signatures. Important business or legal documents should be verified carefully before sending.', 'Removing pages is not the same as redaction. If a page remains in the document, the visible content on that page remains too.'] },
      { heading: 'When this workflow helps', body: ['Page removal is useful for deleting scanner blanks, duplicate pages, separator sheets, irrelevant covers, or extra instruction pages before sending a shorter document.', 'If you need to remove private text inside a page, do not simply cover it with a shape or delete a different page. Use a proper redaction process and verify the output.'] }
    ],
    faqs: [
      { question: 'Does the tool detect blank pages automatically?', answer: 'This launch version removes pages you select. Automatic blank detection can be added later with careful testing.' },
      { question: 'Can this redact a PDF?', answer: 'No. It removes pages, not content inside kept pages.' },
      { question: 'Will the original file change?', answer: 'No. The tool creates a new local copy.' }
    ]
  },
  {
    slug: 'remove-pdf-pages-vs-redact-pdf',
    title: 'Remove PDF pages vs redact PDF: what is the difference?',
    description: 'Understand when page removal is enough, when redaction is required, and why deleting pages is not the same as sanitizing a PDF.',
    relatedTool: 'remove-pdf-pages',
    updated,
    intro: 'Many people confuse deleting pages with redacting a PDF. They solve different problems, and choosing the wrong workflow can leave private information exposed.',
    sections: [
      { heading: 'Page removal deletes whole pages', body: ['Use page removal when an entire page is unnecessary: blank scanner pages, duplicate pages, covers, separators, extra instructions, or a page that should not be included at all.', 'The output should be checked page by page. If a sensitive page was removed, make sure references to that page or its information do not remain elsewhere in the document.'] },
      { heading: 'Redaction removes content inside kept pages', body: ['Use redaction when private text, images, signatures, account numbers, faces, or addresses appear on a page you must keep. Proper redaction removes the underlying content, not just the visible display.', 'Drawing a black rectangle over text is not reliable redaction if the original text remains underneath. Use tools designed for redaction when the content is sensitive or legally important.'] },
      { heading: 'What browser page tools can do', body: ['A local page removal tool can create a new copy without selected pages. It is useful for document cleanup and simple sharing workflows.', 'It should not claim to remove every hidden object, attachment, annotation, or metadata value from every PDF. Complex PDF sanitization requires more specialized tooling and verification.'] },
      { heading: 'Choose the safer workflow', body: ['If the sensitive material is on pages you can remove entirely, page removal may be enough for a simple workflow. If sensitive material appears on pages you need to keep, use redaction and verify the final file carefully.', 'When in doubt, do not share the document until a knowledgeable person has reviewed it. Privacy Toolbox tools are everyday utilities, not legal document review services.'] }
    ],
    faqs: [
      { question: 'Is deleting a PDF page safe?', answer: 'It can be appropriate when the whole page is unnecessary, but you must verify the output and understand it is not full sanitization.' },
      { question: 'Can I redact by covering text with a box?', answer: 'That is not reliable redaction if the original text remains in the file. Use a proper redaction tool.' },
      { question: 'Can Privacy Toolbox redact PDFs?', answer: 'No. It provides merge, split, and page-removal workflows, not full redaction.' }
    ]
  },
  {
    slug: 'what-is-a-file-checksum',
    title: 'What is a file checksum?',
    description: 'Understand SHA-256 hashes, file integrity checks, local hashing, and what a checksum can and cannot prove.',
    relatedTool: 'sha256-file-hash',
    updated,
    intro: 'A checksum is a value calculated from file bytes. If two files have the same SHA-256 hash, they are expected to have the same bytes.',
    sections: [
      { heading: 'What SHA-256 proves', body: ['SHA-256 is useful for checking file integrity, comparing downloads, and confirming that a file matches a published checksum. Even one byte changing creates a different hash.', 'A checksum is often shown as a 64-character hexadecimal string. If your calculated value exactly matches a trusted published value, the file bytes match that published reference.'] },
      { heading: 'What it does not prove', body: ['A checksum does not prove a file is safe, legal, original, trustworthy, or malware-free. It only describes byte identity. A malicious file can still have a valid checksum if the attacker publishes the checksum too.', 'A hash can also reveal whether two files are identical. Do not share hashes of private files publicly if matching that exact file would create a privacy risk.'] },
      { heading: 'Why local hashing is useful', body: ['Browser Web Crypto can calculate the digest locally so the selected file does not need to leave your device. This is useful when you want to verify a download without uploading the file to a checksum website.', 'Large files can take longer to read, and browser memory limits vary by device. A progress message helps users understand that the browser is working locally.'] },
      { heading: 'Safe verification workflow', body: ['Copy the expected SHA-256 value from the official source, calculate the hash locally, compare the values exactly, and download the file again from the official source if they do not match.', 'If the checksum is published on the same untrusted page as the suspicious file, it does not provide strong assurance. Prefer checksums from the official publisher and secure distribution channels.'] }
    ],
    faqs: [
      { question: 'Why is my hash lowercase?', answer: 'Lowercase hex is a common normalized display format. Uppercase and lowercase represent the same hex value.' },
      { question: 'Can I hash text instead of a file?', answer: 'This launch tool focuses on file hashing. Text hashing can be added later.' },
      { question: 'Does a matching hash mean the file is safe?', answer: 'No. It means the bytes match the expected value. Safety requires separate trust and security checks.' }
    ]
  },
  {
    "slug": "verify-download-sha256-checksum",
    "title": "How to verify a file with SHA-256",
    "description": "Learn how to compare a file against an official SHA-256 checksum locally and understand what a matching hash does and does not prove.",
    "relatedTool": "sha256-file-hash",
    "updated": "2026-06-24",
    "intro": "SHA-256 verification helps confirm that a file matches an expected byte-for-byte value. It is commonly used for software downloads, archives, documents, backups, and shared files.",
    "sections": [
      {
        "heading": "Quick answer",
        "body": [
          "Get the expected SHA-256 value from the official source, calculate the SHA-256 hash of your local file, and compare the full 64-character hexadecimal value exactly.",
          "If the values match, the file bytes match the expected checksum. If they do not match, do not trust or install the file until you understand why."
        ]
      },
      {
        "heading": "Find the official hash",
        "body": [
          "Use the publisher's official website, release page, package registry, documentation, or signed release notes. Avoid checksums copied from comments, mirrors, random forums, or screenshots.",
          "A checksum only helps if the expected value is trustworthy. If an attacker controls both the download and the checksum, the match does not prove safety."
        ]
      },
      {
        "heading": "Calculate the hash locally",
        "body": [
          "Select the file in the Privacy Toolbox SHA-256 tool and wait for the browser to calculate the digest. The file is read locally and does not need to be uploaded to a remote server.",
          "Modern browsers expose Web Crypto digest features that can calculate SHA-256 values from file bytes. Large files may require time and memory, so wait until the calculation completes."
        ]
      },
      {
        "heading": "Compare the full value",
        "body": [
          "Compare every character. SHA-256 is usually displayed as 64 hexadecimal characters. Uppercase and lowercase letters can represent the same value, but missing, extra, or different characters mean the hash does not match.",
          "Do not compare only the first few characters unless you are doing a quick informal check. For download verification, use the complete value."
        ]
      },
      {
        "heading": "What a match does not prove",
        "body": [
          "A matching SHA-256 value proves the file matches the expected bytes. It does not prove the software is safe, the author is trustworthy, the file is malware-free, or the document is appropriate to open.",
          "For higher-risk downloads, also use HTTPS, official sources, digital signatures when available, antivirus or platform warnings, and normal security judgment."
        ]
      },
      {
        "heading": "When to use SHA-256",
        "body": [
          "Use SHA-256 when verifying software installers, compressed archives, disk images, shared backups, important document transfers, or any file where byte-level integrity matters.",
          "Do not send private files to someone else just to calculate a hash. Use a local tool, and share only the hash value when appropriate."
        ]
      }
    ],
    "faqs": [
      {
        "question": "Does SHA-256 upload my file?",
        "answer": "Not in Privacy Toolbox. The file is read locally in your browser to calculate the hash."
      },
      {
        "question": "Can two different files have the same SHA-256?",
        "answer": "SHA-256 is designed to make collisions extremely hard in practice, but no hash explanation should be treated as a complete security guarantee."
      },
      {
        "question": "Why did the hash change after editing the file?",
        "answer": "Any change to the file bytes, even a small edit or metadata change, produces a different SHA-256 value."
      },
      {
        "question": "Is SHA-256 the same as encryption?",
        "answer": "No. Hashing creates a fixed digest for verification. It does not encrypt the file or allow recovery of the original data."
      }
    ]
  },
  {
    slug: 'what-are-utm-parameters',
    title: 'What are UTM parameters and should you remove them?',
    description: 'Learn what UTM and click tracking parameters do, when to remove them, and how to clean sharing links transparently.',
    relatedTool: 'url-tracking-remover',
    updated,
    intro: 'UTM parameters and click identifiers help marketers measure campaigns. They can also make links long and reveal how a link was shared.',
    sections: [
      { heading: 'Common tracking parameters', body: ['Examples include utm_source, utm_medium, utm_campaign, utm_term, utm_content, fbclid, gclid, msclkid, mc_cid, mc_eid, igshid, ref, and ref_src. These parameters are often added by newsletters, ads, social platforms, and analytics tools.', 'A transparent cleaner should list removed parameters instead of silently changing a link. This helps you understand what changed before you share the cleaned URL.'] },
      { heading: 'When to preserve parameters', body: ['Unknown parameters may be required for search results, filters, product variants, language settings, sessions, coupons, or authentication. A cautious cleaner removes documented tracking parameters by default and preserves the rest.', 'If a link is important, open the cleaned URL in a private window or safe test environment to confirm it still points to the expected page.'] },
      { heading: 'Privacy limits', body: ['URL cleaning does not stop tracking after you visit a page. Websites can still use cookies, account login, browser fingerprinting, IP address, redirects, or server-side tracking.', 'Cleaning a shared link mainly reduces campaign tags and click identifiers that are visible in the URL itself. It is a useful sharing hygiene step, not a complete anti-tracking system.'] },
      { heading: 'Safe sharing workflow', body: ['Paste the full URL, remove known tracking parameters locally, review the removed and preserved parameter lists, then copy the cleaned URL. Avoid pasting private tokens, invite links, password reset links, or personal account URLs into any public or shared tool.', 'For private links, consider not cleaning or sharing them at all. A private token in a URL can grant access even if campaign parameters are removed.'] }
    ],
    faqs: [
      { question: 'Can cleaning break a link?', answer: 'It is uncommon with standard campaign parameters, but review the output if the link is important.' },
      { question: 'Are pasted URLs sent anywhere?', answer: 'No. The cleaner runs locally in the browser.' },
      { question: 'Does URL cleaning block ads or trackers?', answer: 'No. It removes documented tracking parameters from the URL. It is not an ad blocker or browser privacy extension.' }
    ]
  },
  {
    slug: 'clean-links-before-sharing',
    title: 'How to clean tracking links before sharing them',
    description: 'Remove common campaign and click-tracking parameters from URLs while preserving parameters that may be needed for the page to work.',
    relatedTool: 'url-tracking-remover',
    updated,
    intro: 'Clean links are easier to read and can reduce visible campaign tracking when you share a URL. The safest cleaner is cautious: remove known tracking parameters and preserve unknown ones.',
    sections: [
      { heading: 'Understand what should be removed', body: ['Known campaign tags such as utm_source, utm_medium, and utm_campaign usually identify where a link came from. Click identifiers such as fbclid, gclid, and msclkid can connect a click to advertising systems.', 'Removing these parameters can make a link shorter and less revealing when shared in a message, post, or document.'] },
      { heading: 'Preserve what may be functional', body: ['Some query parameters are not tracking. They may control search terms, sort order, page number, language, product variant, referral state, coupons, or login sessions.', 'A good cleaner should not blindly delete every parameter. It should show what was removed and what was kept so you can review the result.'] },
      { heading: 'Test important links', body: ['Before sending a cleaned link for work, travel, shopping, or account-related tasks, open the cleaned URL and confirm it still points to the correct page.', 'Do not share private reset links, invite links, payment links, account links, or tokenized URLs unless you understand the risk. Cleaning campaign tags does not make a private token safe.'] },
      { heading: 'Use local cleaning for privacy', body: ['A browser-only URL cleaner can process the pasted text inside your tab. That avoids sending the URL to a remote cleaning API.', 'Still, treat the URL itself as sensitive. If it contains personal identifiers or access tokens, avoid pasting it into any public or shared environment.'] }
    ],
    faqs: [
      { question: 'Should all question-mark parameters be removed?', answer: 'No. Some parameters are needed for the page to work correctly.' },
      { question: 'Does a clean URL stop website tracking?', answer: 'No. It only removes visible parameters from the URL you share.' },
      { question: 'Can I clean shopping links?', answer: 'Often yes, but check that product variant, coupon, or search parameters still work if they matter.' }
    ]
  },
  {
    slug: 'browser-only-tools-vs-online-upload-tools',
    title: 'Browser-only tools vs online upload tools: privacy differences',
    description: 'Compare local browser processing with upload-based online tools for photos, PDFs, hashes, and URL cleanup workflows.',
    relatedTool: 'remove-exif-data',
    updated,
    intro: 'Many online tools look similar, but their privacy models can be very different. The main question is whether your file is processed in your browser or uploaded to a remote server.',
    sections: [
      { heading: 'Browser-only processing', body: ['A browser-only tool uses APIs available in your web browser to read and process supported files locally. The website can be static and still perform useful tasks such as image export, PDF page operations, checksums, and URL cleaning.', 'This model is helpful when the task can be done client-side and when you do not want to create an account, upload originals, or store file history on a server.'] },
      { heading: 'Upload-based processing', body: ['An upload-based tool sends your file to a server for processing. That may be necessary for some advanced tasks, but it creates additional privacy questions: where the file is stored, how long it remains, who can access it, and what logs are created.', 'Some upload tools are trustworthy and well documented. Others provide little information. Always read the privacy policy and consider whether the file is sensitive before uploading.'] },
      { heading: 'What browser-only does not solve', body: ['Local processing does not protect you from malware on your device, screenshots, browser extensions, shared computers, or mistakes such as emailing the wrong file.', 'It also does not guarantee forensic sanitization. Browser tools should clearly describe supported formats, limits, and operations instead of promising perfect privacy.'] },
      { heading: 'How to choose', body: ['Use browser-only tools for everyday privacy tasks that fit the supported formats and file sizes. Use specialist software or professional workflows for legal redaction, regulated data, complex PDFs, or files where correctness is critical.', 'The best user experience is honest: clear limitations, local processing details, no exaggerated claims, and easy verification steps.'] }
    ],
    faqs: [
      { question: 'Are browser-only tools always private?', answer: 'They reduce upload exposure, but your device, browser, extensions, and behavior still matter.' },
      { question: 'Why do some tools need upload servers?', answer: 'Some advanced processing requires more compute, server libraries, or features not available in browsers.' },
      { question: 'Is Privacy Toolbox browser-only?', answer: 'Its tools are designed for supported inputs to run locally in the browser without file uploads.' }
    ]
  },
  {
    slug: 'private-file-tool-safety-checklist',
    title: 'Private file tool safety checklist',
    description: 'Questions to ask before using any online tool with photos, PDFs, checksums, links, or other private files.',
    relatedTool: 'image-metadata-viewer',
    updated,
    intro: 'Before using any file tool, ask how it handles your data. A simple checklist can help you avoid uploading sensitive files when local processing is enough.',
    sections: [
      { heading: 'Check the privacy model', body: ['Look for clear wording that explains whether files are processed locally or uploaded to a server. Vague promises such as “secure” or “private” are less useful than specific workflow details.', 'If the tool uses cloud processing, look for retention rules, deletion timing, access controls, logging practices, and contact information.'] },
      { heading: 'Check the task risk', body: ['A public product image is lower risk than a passport scan, legal document, medical record, school file, or private family photo. The more sensitive the file, the more careful your workflow should be.', 'Some tasks are safe for simple local tools, while others require specialist software, legal review, or organization-approved systems.'] },
      { heading: 'Check output accuracy', body: ['Always open the output file before sharing it. Check page order, image quality, dimensions, metadata status, or checksum value depending on the task.', 'Do not assume a success message is enough. A useful tool should explain what happened and what still needs your review.'] },
      { heading: 'Check what not to send', body: ['Do not send private originals, filenames, metadata values, hashes, GPS coordinates, personal URLs, access tokens, or screenshots with sensitive information to support unless there is a verified and appropriate process.', 'For bug reports, describe the problem using non-private details: browser, device, approximate file type, approximate size, and the error message.'] }
    ],
    faqs: [
      { question: 'Is local processing always better?', answer: 'It is often better for simple privacy tasks, but some workflows require specialist tools.' },
      { question: 'What is the biggest mistake?', answer: 'Uploading sensitive originals to a tool without understanding where the file goes or how long it is retained.' },
      { question: 'Should I keep originals?', answer: 'Yes. Keep originals private until you have verified the cleaned or converted output.' }
    ]
  },
  {
    slug: 'no-upload-file-tools-explained',
    title: 'What does “no upload” mean for browser file tools?',
    description: 'Understand what no-upload file processing means, what it can protect, and what limitations still apply in a browser-based workflow.',
    relatedTool: 'sha256-file-hash',
    updated,
    intro: '“No upload” should mean the selected supported file is processed in your browser instead of being sent to a processing server. It is a strong privacy feature, but it should be explained accurately.',
    sections: [
      { heading: 'How browsers can process files locally', body: ['Modern browsers can read files you select with the File API, draw images to canvas, calculate hashes with Web Crypto, create downloads with Blob URLs, and run heavier work in Web Workers.', 'A static website can provide these tools without creating accounts, file histories, or server-side processing pipelines.'] },
      { heading: 'What no-upload protects against', body: ['No-upload workflows reduce exposure to remote processing servers, server-side file storage, server-side file access, and third-party upload retention policies.', 'This is especially useful for routine tasks such as metadata checks, image resizing, PDF page operations, and checksum calculation when supported by the browser.'] },
      { heading: 'What no-upload does not protect against', body: ['It does not protect against compromised devices, malicious browser extensions, screen capture, shared computers, phishing, or users accidentally sharing the wrong output file.', 'It also does not automatically mean every metadata field or PDF object is cleaned. Tool pages should describe supported operations and verification steps.'] },
      { heading: 'How to verify a no-upload claim', body: ['Read the privacy policy, inspect network activity if you are technical, and prefer tools that explain the local workflow clearly. The page should not ask you to create an account or wait for a server job for simple local tasks.', 'If a website has conflicting pages that mention cloud processing, upload limits, or file history, that conflict should be fixed before users are asked to trust the privacy claim.'] }
    ],
    faqs: [
      { question: 'Does no upload mean no internet?', answer: 'No. The website itself loads from the internet, but supported files do not need to be uploaded for processing.' },
      { question: 'Can a no-upload tool have analytics?', answer: 'It can, but analytics should not collect filenames, file contents, hashes, metadata values, GPS coordinates, private URLs, or private user inputs.' },
      { question: 'Why does the page still need JavaScript?', answer: 'Browser-only file processing relies on JavaScript APIs in your tab.' }
    ]
  },
  {
    "slug": "remove-gps-from-android-photos",
    "title": "How to remove GPS from Android photos before sharing",
    "description": "Check Android photo location metadata, understand Google Photos limits, clean supported GPS fields locally, and verify the output before posting.",
    "relatedTool": "remove-gps-from-photo",
    "updated": "2026-06-24",
    "intro": "Android photos can include camera-added GPS metadata when location permission is enabled. Before posting or sending sensitive photos, check the file itself and remove supported location fields locally.",
    "sections": [
      {
        "heading": "Quick answer",
        "body": [
          "Export or download the Android photo you plan to share, scan it for supported GPS metadata, remove detected location fields, download the cleaned copy, and scan the cleaned copy again before sharing.",
          "If you use Google Photos, remember that app location controls and file metadata are not always the same thing. Verify the actual image file when privacy matters."
        ]
      },
      {
        "heading": "Where Android photo location data comes from",
        "body": [
          "Android camera apps may save GPS coordinates when location permission or geotagging is enabled. Different phone brands and camera apps may label the setting differently, such as location tags, save location, or geotag photos.",
          "Cloud photo apps can also display estimated or manually added locations. Google Photos explains that camera-added location cannot always be changed or removed in Google Photos, which is why checking exported files is important."
        ]
      },
      {
        "heading": "Check before you clean",
        "body": [
          "Use a metadata viewer on the exact image file you will upload or send. Look for GPS latitude, longitude, altitude, timestamp, or related location fields.",
          "If no supported GPS fields appear, still review visible content. A picture of a street sign, map, building, badge, or package label can reveal location without metadata."
        ]
      },
      {
        "heading": "Remove supported GPS fields locally",
        "body": [
          "Use the Remove GPS from Photo tool to create a new cleaned copy in your browser. The supported image does not need to be uploaded to a server for this workflow.",
          "After cleaning, scan the cleaned copy again. If you created multiple copies or resized the photo, verify the final copy you will actually share."
        ]
      },
      {
        "heading": "Turn off future geotagging if needed",
        "body": [
          "For future photos, review your camera app's location permission and geotagging setting. Turning it off can reduce future GPS metadata, but it does not clean older photos.",
          "Some users prefer keeping location enabled for private photo organization and cleaning only before public sharing. Choose the workflow that fits your privacy risk."
        ]
      },
      {
        "heading": "When to be extra careful",
        "body": [
          "Be careful with photos taken at homes, workplaces, schools, hotels, clinics, private events, protest locations, or travel routines.",
          "For very sensitive images, do not rely on a single metadata tool. Use visual review, proper redaction where needed, and a cautious sharing decision."
        ]
      }
    ],
    "faqs": [
      {
        "question": "Can Android photos contain GPS data?",
        "answer": "Yes. Android camera apps can save GPS metadata when location access or geotagging is enabled."
      },
      {
        "question": "Can Google Photos remove camera-added location?",
        "answer": "Google says camera-added location cannot always be changed or removed in Google Photos. Check and clean the exported file when needed."
      },
      {
        "question": "Does removing GPS lower image quality?",
        "answer": "The browser may re-export the image, so file size or compression can change. Check the cleaned copy visually."
      },
      {
        "question": "Can I prevent GPS from being saved in future photos?",
        "answer": "Usually yes by changing camera location permission or geotagging settings, but exact steps vary by Android device and camera app."
      }
    ]
  },
  {
    "slug": "remove-exif-metadata-before-uploading",
    "title": "How to remove EXIF metadata before uploading online",
    "description": "Use this local checklist to remove supported EXIF metadata from photos before uploading to websites, marketplaces, forums, or social apps.",
    "relatedTool": "remove-exif-data",
    "updated": "2026-06-24",
    "intro": "Before uploading a photo online, check whether the file includes metadata you do not want to publish. A browser-only workflow can clean supported fields without sending the original file to a remote server.",
    "sections": [
      {
        "heading": "Quick answer",
        "body": [
          "Inspect the photo locally, remove supported EXIF fields, download a cleaned copy, inspect the cleaned copy again, and upload only the verified cleaned file.",
          "This workflow is best for everyday privacy before posting marketplace photos, profile images, blog images, forum attachments, or public social content."
        ]
      },
      {
        "heading": "What EXIF metadata may include",
        "body": [
          "EXIF and related metadata can include camera model, lens details, capture time, orientation, editing software, embedded thumbnails, author fields, copyright information, and GPS coordinates.",
          "Not every photo has metadata, and not every file format stores the same fields. The safe habit is to inspect the final file before uploading."
        ]
      },
      {
        "heading": "Remove metadata before public uploads",
        "body": [
          "Upload forms, public websites, and forums may store or reprocess your image in different ways. Some services strip metadata, some preserve parts of it, and some create new versions. Cleaning before upload gives you more control.",
          "Use a local remover when the photo is private enough that you do not want to upload the original to a third-party cleanup service."
        ]
      },
      {
        "heading": "Verify the cleaned copy",
        "body": [
          "After removing supported metadata, scan the cleaned output with a metadata viewer. Look for remaining GPS, date, camera, software, or author fields that matter to your situation.",
          "Verification is especially important after editing, converting, or resizing, because each export can change file details."
        ]
      },
      {
        "heading": "Do not forget visible privacy risks",
        "body": [
          "Metadata removal does not blur faces, license plates, ID cards, house numbers, package labels, computer screens, usernames, documents, or landmarks.",
          "Review the image at full size before posting. If visible information is sensitive, crop, blur, redact, or choose a safer photo."
        ]
      },
      {
        "heading": "Use accurate claims",
        "body": [
          "Say that supported metadata was removed locally. Do not claim a photo is 100% anonymous, forensic-grade, or guaranteed to have all hidden data removed.",
          "For legal, medical, workplace, or investigative situations, use specialist sanitization and review workflows."
        ]
      }
    ],
    "faqs": [
      {
        "question": "Should I remove EXIF before uploading to social media?",
        "answer": "For public or sensitive photos, yes. Platforms vary, and cleaning before upload gives you more control."
      },
      {
        "question": "Does EXIF removal remove GPS too?",
        "answer": "A broader EXIF cleanup can remove supported GPS fields, but use the GPS-focused tool if location is your main concern."
      },
      {
        "question": "Can EXIF metadata come back?",
        "answer": "New exports can add new software or date fields. Check the final file after editing or conversion."
      },
      {
        "question": "Is metadata removal the same as redaction?",
        "answer": "No. Redaction removes visible content. Metadata cleanup removes supported hidden file fields."
      }
    ]
  },
  {
    "slug": "is-it-safe-to-use-online-pdf-tools",
    "title": "Is it safe to use online PDF tools?",
    "description": "Understand when online PDF tools are convenient, when browser-only tools are safer, and what to check before uploading private documents.",
    "relatedTool": "merge-pdf",
    "updated": "2026-06-24",
    "intro": "Online PDF tools are convenient, but not every PDF should be uploaded to a remote service. The safer choice depends on the document, the task, and how much privacy risk you can accept.",
    "sections": [
      {
        "heading": "Quick answer",
        "body": [
          "For public or low-risk PDFs, a reputable online tool may be fine. For private forms, statements, IDs, contracts, school papers, health documents, or business files, prefer a browser-only tool or trusted offline software.",
          "The important question is not only whether the tool works. It is whether the document needs to leave your device at all."
        ]
      },
      {
        "heading": "What can go wrong with uploads",
        "body": [
          "A cloud PDF tool may receive the file, process it on a server, create temporary copies, log request details, or store files long enough to generate a download. Reputable services may have deletion policies, but users still need to trust the service.",
          "A browser-only tool can reduce unnecessary upload exposure for supported tasks such as merging, splitting, and removing pages, because processing happens in the tab instead of on a processing server."
        ]
      },
      {
        "heading": "When browser-only tools are a good fit",
        "body": [
          "Use browser-only PDF tools for everyday tasks where supported PDFs can be handled locally: merging multiple documents, extracting selected pages, splitting a file, or removing whole pages before sharing.",
          "Local tools are especially useful for PDFs containing names, addresses, signatures, invoices, receipts, school documents, forms, or internal business information."
        ]
      },
      {
        "heading": "When you may need specialist software",
        "body": [
          "Browser tools are not the best choice for every PDF. Encrypted, corrupted, huge, heavily interactive, signed, form-heavy, or legally sensitive PDFs may need professional PDF software.",
          "If you need true redaction, accessibility tagging, digital-signature preservation, legal discovery, or complete sanitization, use a workflow designed for that purpose."
        ]
      },
      {
        "heading": "Safety checklist before using any PDF tool",
        "body": [
          "Ask: Does this PDF include private or regulated information? Does it need to be uploaded? Does the tool explain retention and processing? Can I do the task locally? Can I verify the output?",
          "Also check page order, missing pages, visible private text, comments, form fields, bookmarks, attachments, and metadata if the document is sensitive."
        ]
      },
      {
        "heading": "Privacy Toolbox position",
        "body": [
          "Privacy Toolbox is designed for browser-only utility workflows. Supported PDFs are processed in the browser without a backend upload for the tool operation.",
          "That does not make the result a legal sanitization product. It is a practical privacy-first workflow for everyday document handling."
        ]
      }
    ],
    "faqs": [
      {
        "question": "Are all online PDF tools unsafe?",
        "answer": "No. Many are useful, but uploading private documents creates a trust decision. Use local processing when upload is unnecessary."
      },
      {
        "question": "Is browser-only PDF processing perfect?",
        "answer": "No. Large, encrypted, corrupted, or complex PDFs may fail, and local page tools are not full sanitization tools."
      },
      {
        "question": "Can I use online PDF tools for legal documents?",
        "answer": "Be careful. Legal or regulated documents may require approved software, policies, and verification."
      },
      {
        "question": "What is the safest simple workflow?",
        "answer": "Use a trusted device, process locally when possible, verify the output, and share only the final checked copy."
      }
    ]
  },
  {
    "slug": "split-pdf-files-without-uploading",
    "title": "How to split PDF files without uploading them",
    "description": "Extract selected pages from a PDF locally in your browser and verify the new file before sending or uploading it.",
    "relatedTool": "split-pdf",
    "updated": "2026-06-24",
    "intro": "Splitting a PDF is useful when you only need certain pages from a larger document. A browser-only split workflow can create a smaller file without uploading the original PDF to a remote server.",
    "sections": [
      {
        "heading": "Quick answer",
        "body": [
          "Open the browser-only Split PDF tool, select the source PDF, choose the page range or pages you need, download the extracted file, and verify the output page by page before sharing.",
          "This is better than sending a full document when only a few pages are relevant."
        ]
      },
      {
        "heading": "When splitting helps privacy",
        "body": [
          "Many documents include extra pages: cover sheets, instructions, statements, signatures, unrelated invoices, blank scans, or pages intended for a different recipient. Splitting lets you send only the pages needed.",
          "This can reduce accidental disclosure, but only if the selected pages themselves are safe to share."
        ]
      },
      {
        "heading": "Choose page ranges carefully",
        "body": [
          "Open the original PDF and confirm page numbers before extraction. Some PDF viewers show logical labels while the tool may use actual page order, so verify by visual page count.",
          "If the document has blank pages, covers, or scanned inserts, count them. Do not assume page 3 in the viewer is always the page you mean without checking."
        ]
      },
      {
        "heading": "Verify the split output",
        "body": [
          "After creating the split PDF, open it and check every page. Confirm that the file includes all required pages and excludes everything else.",
          "Search the output for names, addresses, account numbers, terms, or private words that should not appear. If the output is sensitive, do not rely on the filename alone."
        ]
      },
      {
        "heading": "Splitting is not redaction",
        "body": [
          "Splitting removes pages that are not selected. It does not remove private text, comments, attachments, form fields, or visible content from pages you keep.",
          "If private information appears on a page you must include, use a proper redaction workflow before sharing."
        ]
      },
      {
        "heading": "Use local processing for sensitive files",
        "body": [
          "A local browser split avoids uploading the original PDF to a cloud split service for supported files. This is helpful for everyday private documents.",
          "Keep the original private and share only the verified extracted copy."
        ]
      }
    ],
    "faqs": [
      {
        "question": "Are PDFs uploaded when I split them here?",
        "answer": "No. Supported PDFs are processed locally in your browser."
      },
      {
        "question": "Can I extract one page from a PDF?",
        "answer": "Yes. Select the page or range you need, then verify the output."
      },
      {
        "question": "Does splitting remove metadata?",
        "answer": "Not necessarily. Splitting is a page operation, not a full metadata sanitization process."
      },
      {
        "question": "Can I split encrypted PDFs?",
        "answer": "Encrypted or restricted PDFs may fail or require specialist software."
      }
    ]
  },
  {
    "slug": "remove-pdf-pages-before-sharing",
    "title": "How to remove pages from a PDF before sharing",
    "description": "Remove unwanted PDF pages locally, avoid common privacy mistakes, and verify the final document before sending it.",
    "relatedTool": "remove-pdf-pages",
    "updated": "2026-06-24",
    "intro": "Removing pages from a PDF helps when a document contains blank, duplicate, unrelated, or private pages that should not be included in the final shared copy.",
    "sections": [
      {
        "heading": "Quick answer",
        "body": [
          "Use a local page removal tool, select the pages you want to delete, create a new PDF, then open the output and verify that the correct pages are gone.",
          "This is useful for removing whole pages. It is not the right tool for hiding text inside a page you need to keep."
        ]
      },
      {
        "heading": "Good reasons to remove pages",
        "body": [
          "Remove blank scanner pages, duplicate pages, covers, separator sheets, instruction pages, expired forms, unrelated receipts, or pages meant for a different person.",
          "Also remove private whole pages before merging PDFs into one packet. Cleaning the source files first reduces mistakes in the final merged document."
        ]
      },
      {
        "heading": "Check page numbers before deleting",
        "body": [
          "Open the original PDF and count pages carefully. Some documents have cover pages, Roman numerals, scanned inserts, or viewer labels that make page numbering confusing.",
          "Preview the selected pages to remove when possible. Deleting the wrong page can create an incomplete document or accidentally leave private pages behind."
        ]
      },
      {
        "heading": "Verify the output file",
        "body": [
          "After downloading the new PDF, open it and review every page. Confirm page order, page count, readability, and that the unwanted pages are gone.",
          "Search for private terms or identifiers if the document is sensitive. Do not assume removal worked only because the file downloaded successfully."
        ]
      },
      {
        "heading": "Page removal vs redaction",
        "body": [
          "Page removal deletes whole pages. Redaction removes or hides content inside pages you keep. Covering text with a shape is not reliable redaction if the original text remains underneath.",
          "Use proper redaction software for account numbers, signatures, addresses, names, or private text on pages that must remain in the PDF."
        ]
      },
      {
        "heading": "Why browser-only helps",
        "body": [
          "For supported PDFs, Privacy Toolbox removes pages locally in your browser. The document does not need to be uploaded to a processing server for this operation.",
          "Local processing is still not a replacement for legal review, full sanitization, or secure document-management policies."
        ]
      }
    ],
    "faqs": [
      {
        "question": "Are PDFs uploaded when I remove pages here?",
        "answer": "No. Supported PDFs are processed locally in your browser."
      },
      {
        "question": "Can this redact a PDF?",
        "answer": "No. It removes whole pages only. Use proper redaction for private content inside kept pages."
      },
      {
        "question": "Will the original PDF be changed?",
        "answer": "No. The tool creates a new output file and leaves the original on your device."
      },
      {
        "question": "Should I remove pages before or after merging PDFs?",
        "answer": "Usually remove unwanted pages before merging so the final combined document starts cleaner."
      }
    ]
  },
  {
    "slug": "remove-tracking-from-amazon-links",
    "title": "How to remove tracking from Amazon links",
    "description": "Clean long Amazon product URLs, understand common tracking parameters, and avoid breaking product links before sharing.",
    "relatedTool": "url-tracking-remover",
    "updated": "2026-06-24",
    "intro": "Amazon product links can become long because of referral tags, tracking parameters, search context, and session-style URL data. A clean link is easier to share and can reduce unnecessary tracking clutter.",
    "sections": [
      {
        "heading": "Quick answer",
        "body": [
          "For many Amazon product pages, the cleanest shareable form is the product URL that keeps the domain and the product identifier, usually the /dp/ASIN path, while removing unnecessary query parameters such as tracking and referral tags.",
          "Always test the cleaned link before sending it, especially when the link points to a variation such as size, color, bundle, or region-specific product page."
        ]
      },
      {
        "heading": "Why Amazon links get long",
        "body": [
          "Copied Amazon URLs often include navigation context, referral tags, advertising parameters, ranking or search details, and other query strings. These values are usually not needed for a normal product share.",
          "The essential part is usually the product identifier. For Amazon products, that is commonly the ASIN shown in a /dp/ASIN-style URL."
        ]
      },
      {
        "heading": "Parameters commonly removed",
        "body": [
          "Tracking cleaners often remove parameters such as tag, ref, pd_rd_*, pf_rd_*, ascsubtag, linkCode, creative, campaign, and UTM-style parameters when they are not needed for the destination to work.",
          "Some parameters can affect product variation, language, seller, subscription, or other behavior. That is why a good workflow tests the cleaned link instead of deleting blindly."
        ]
      },
      {
        "heading": "Clean and test the link",
        "body": [
          "Paste the Amazon URL into the URL Tracking Remover, review the cleaned result, open it in a private window or new tab, and confirm it still loads the exact product you intended.",
          "If the cleaned link changes the variation, seller, or region, use a less aggressive cleaned version or keep the parameter that controls the needed behavior."
        ]
      },
      {
        "heading": "Affiliate and creator links",
        "body": [
          "If you intentionally want to share your own affiliate link, do not remove the affiliate tag. Cleaning an affiliate link can remove attribution and change how the link is credited.",
          "If you want to share a neutral product link with no affiliate attribution, remove affiliate and tracking parameters and test the destination."
        ]
      },
      {
        "heading": "Privacy limits",
        "body": [
          "Cleaning a URL can remove tracking clutter from the link itself, but it does not make shopping anonymous. Amazon, browsers, apps, networks, and logged-in accounts can still process activity in other ways.",
          "Use honest wording: clean links reduce unnecessary URL parameters; they do not guarantee private browsing."
        ]
      }
    ],
    "faqs": [
      {
        "question": "What is an Amazon ASIN?",
        "answer": "An ASIN is Amazon's product identifier. Many clean product links use the /dp/ASIN path."
      },
      {
        "question": "Should I remove tag= from Amazon links?",
        "answer": "Remove it when you want a neutral non-affiliate link. Keep it if it is your intentional affiliate attribution."
      },
      {
        "question": "Can cleaning break an Amazon link?",
        "answer": "Yes, if a removed parameter controlled variation, language, seller, or another needed behavior. Always test the cleaned URL."
      },
      {
        "question": "Does cleaning an Amazon link make shopping private?",
        "answer": "No. It only removes unnecessary URL parameters from the shared link."
      }
    ]
  },
  {
    slug: 'remove-pdf-metadata-before-sharing',
    title: 'How to remove PDF metadata before sharing',
    description: 'Learn how to check, remove, and verify common PDF metadata such as author, title, creator, producer, and date fields before sharing a document.',
    relatedTool: 'remove-pdf-metadata',
    updated,
    intro: 'PDF files can include document properties that are easy to overlook before emailing, uploading, or publishing a file. This guide explains a cautious browser-only workflow for removing supported PDF metadata and verifying the result.',
    sections: [
      { heading: 'Quick answer', body: ['Use a PDF metadata remover when you need to clear common document-info fields such as title, author, subject, keywords, creator, producer, creation date, and modification date. Then open the cleaned copy in a PDF viewer and check document properties before sharing.', 'PDF metadata removal is not the same as redaction. If private text, comments, attachments, form values, layers, or failed redactions are inside the document, metadata cleanup alone is not enough.'] },
      { heading: 'What PDF metadata can reveal', body: ['Common PDF fields may expose an author name, organization, export tool, document title, keywords, creation date, or modification date. Some files can also contain XMP metadata, attachments, comments, form fields, JavaScript actions, bookmarks, or incremental update history.', 'The risk depends on how the PDF was created. A resume, invoice, contract draft, exported report, scanned document, or office file converted to PDF can all carry different hidden details.'] },
      { heading: 'Browser-only cleanup workflow', body: ['Select the PDF in the local metadata tool, review any detected common fields, run the cleanup, and download the cleaned copy. Keep the original private until you confirm that the output opens correctly and contains the pages you expect.', 'The cleaned file should be treated as a new document. Rename it clearly so you do not accidentally send the original file later.'] },
      { heading: 'Verify before sending', body: ['Open the cleaned PDF in your normal PDF viewer and check document properties. Review visible pages, comments, attachments, form fields, bookmarks, links, and redacted-looking boxes separately.', 'Search the document for private names, account numbers, addresses, and other sensitive terms. Metadata removal does not remove visible content inside kept pages.'] },
      { heading: 'When to use specialist software', body: ['Use specialist redaction or compliance tools for legal, medical, financial, employment, identity, or regulated documents. A browser metadata cleaner is useful for everyday privacy hygiene, but it is not a forensic sanitizer.', 'When a recipient requires a certified redaction or compliance workflow, follow their required software and verification process.'] }
    ],
    faqs: [
      { question: 'Does PDF metadata removal remove the author field?', answer: 'It clears the common Author field when the PDF library can read and rewrite the document successfully.' },
      { question: 'Does this remove comments or attachments?', answer: 'Not reliably for every PDF. Check comments, attachments, form fields, and hidden objects separately before sharing sensitive documents.' },
      { question: 'Are PDFs uploaded during browser-only cleanup?', answer: 'No. Supported PDFs are read and rewritten locally in your browser.' },
      { question: 'Is metadata removal the same as redaction?', answer: 'No. Redaction permanently removes sensitive visible content. Metadata cleanup clears supported document properties and should be verified separately.' }
    ]
  },
  {
    slug: 'image-metadata-viewer-before-sharing',
    title: 'How to use an image metadata viewer before sharing photos',
    description: 'Use a browser-only image metadata viewer to check EXIF, GPS, camera, date, software, and copyright fields before posting or sending a photo.',
    relatedTool: 'image-metadata-viewer',
    updated,
    intro: 'An image metadata viewer helps you inspect what a photo file may reveal before you upload it, email it, or publish it. This guide explains what to check and how to use the results safely.',
    sections: [
      { heading: 'Quick answer', body: ['Open the exact image file you plan to share in a metadata viewer, check for GPS/location, camera, date, software, copyright, author, and embedded thumbnail fields, then decide whether to remove supported metadata before sharing.', 'A viewer is a diagnostic step. It shows supported fields; it does not automatically make the image safe. You still need to review visible content in the photo.'] },
      { heading: 'Fields worth checking first', body: ['Start with GPS latitude and longitude, capture date, camera make and model, editing software, author or copyright fields, and any embedded thumbnail or XMP fields that the viewer can detect.', 'Some images have no visible metadata report because the fields were removed earlier or the format is not supported by the parser. Unsupported fields can still exist, so sensitive files deserve extra caution.'] },
      { heading: 'Check before and after cleanup', body: ['Use the viewer on the original file to understand the risk, then remove supported EXIF or GPS fields and inspect the cleaned copy again. Verify the actual output you will upload, not just the original file.', 'If you resize or convert the image, run the viewer on that exported copy too. File metadata can change when apps or browsers re-encode an image.'] },
      { heading: 'Visible content matters too', body: ['Metadata does not include faces, documents, house numbers, badges, street signs, screens, maps, reflections, or landmarks visible inside the pixels. These clues require cropping, blurring, redaction, or a different image.', 'For personal, workplace, school, travel, or marketplace photos, zoom in and inspect the whole frame before publishing.'] },
      { heading: 'Use cautious wording', body: ['Say that supported metadata was checked or removed locally. Avoid claiming that a file is anonymous, untraceable, or guaranteed clean because no browser viewer can promise that for every file and every proprietary metadata format.', 'This wording helps user trust and prevents overpromising on privacy-sensitive tasks.'] }
    ],
    faqs: [
      { question: 'Can an image metadata viewer show GPS coordinates?', answer: 'Yes, if supported GPS metadata is present and the viewer can parse the file format.' },
      { question: 'Does viewing metadata upload my photo?', answer: 'The Privacy Toolbox viewer reads supported image files locally in your browser and does not upload the selected file to a processing server.' },
      { question: 'Should I check the cleaned photo again?', answer: 'Yes. Always verify the cleaned copy because exports, conversions, and app behavior can change metadata.' },
      { question: 'Does no metadata mean the photo is safe?', answer: 'No. Visible content can still reveal location, identity, or private details even when supported metadata fields are not detected.' }
    ]
  },
  {
    slug: 'browser-based-privacy-tools',
    title: 'Browser-based privacy tools: when no-upload processing helps',
    description: 'Understand when browser-based privacy tools are useful for metadata removal, checksums, PDF workflows, and tracking-link cleanup—and when specialist software is still needed.',
    relatedTool: 'remove-exif-data',
    updated,
    intro: 'Browser-based privacy tools can reduce exposure for everyday file and link tasks because supported inputs are handled in your tab instead of being uploaded to a remote processing service.',
    sections: [
      { heading: 'Quick answer', body: ['Browser-based privacy tools are useful when you need a quick local workflow for supported files: checking image metadata, removing supported EXIF or GPS fields, clearing common PDF document properties, calculating SHA-256 hashes, or cleaning known URL tracking parameters.', 'They are not a replacement for legal redaction, malware analysis, forensic sanitization, enterprise data-loss prevention, or specialist compliance software.'] },
      { heading: 'Where browser tools help most', body: ['They help with everyday public-sharing tasks such as marketplace photos, blog images, resumes, invoices, merged PDFs, software-download checksums, and links copied from marketing emails or social platforms.', 'Because processing runs locally, the tool can avoid sending supported file bytes, filenames, metadata values, or pasted URLs to a processing server.'] },
      { heading: 'Limits to understand', body: ['Browser APIs and JavaScript libraries may not support every file format, proprietary metadata block, encrypted PDF, huge file, animation, signature, attachment, or hidden object. Memory can also be limited on mobile devices.', 'A trustworthy tool should explain these limits clearly instead of promising to remove all hidden data.'] },
      { heading: 'Safer workflow', body: ['Keep the original private, use the smallest tool that matches the task, download a new output, verify the result, and share only the cleaned copy or cleaned link.', 'For files that contain regulated, legal, medical, financial, or identity data, use an approved specialist workflow and keep records of verification.'] },
      { heading: 'How to evaluate a privacy utility', body: ['Look for clear support limits, no-upload wording, local processing details, visible verification steps, cautious privacy claims, accessible contact information, and pages that explain what happens before and after processing.', 'Avoid tools that hide upload behavior, make absolute anonymity promises, or place ads near upload, result, or download controls.'] }
    ],
    faqs: [
      { question: 'Are browser-based privacy tools always safer?', answer: 'They can reduce upload exposure for supported tasks, but safety depends on the implementation, file type, browser behavior, and whether you verify the output.' },
      { question: 'Can browser tools handle every file?', answer: 'No. Encrypted, corrupted, very large, proprietary, or complex files may need desktop or specialist software.' },
      { question: 'What should I verify after using a tool?', answer: 'Check metadata, visible content, page order, file properties, copied hashes, and cleaned URLs before sharing anything sensitive.' },
      { question: 'Do browser tools replace redaction software?', answer: 'No. Redaction, legal review, and forensic sanitization require specialist workflows and verification.' }
    ]
  }
];

export const articleBySlug = new Map(articles.map((article) => [article.slug, article]));
