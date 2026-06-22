import React, { useState } from 'react';
import { Card, Typography, Collapse, Tag } from 'antd';
import { HelpCircle, Info, ShieldCheck, CheckCircle2, FileText, Settings, Cpu, BookOpen, Sparkles, Lightbulb, AlertTriangle, ArrowRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

const toolContentDb = {
  'bg-remover': {
    title: 'AI Background Remover',
    desc: 'Remove photo backgrounds automatically and instantly using advanced machine learning models executing entirely inside your web browser. Perfect for creating transparent signatures, clean passport photos, and professional avatars for application forms.',
    steps: [
      'Click on the "Drop Your Photo Here" box or drag and drop your image file (JPEG, PNG, or WebP).',
      'Click the "Remove Background" button to initiate the local artificial intelligence model.',
      'Wait a few seconds as the AI runs entirely on-device (no files are uploaded to any server).',
      'Review the transparent preview and compare it with the original photo side-by-side.',
      'Click "Download PNG" to save your clean, background-free image in high quality.'
    ],
    features: [
      { name: '100% On-Device AI', detail: 'Runs inside your browser using WebAssembly. Your photos never leave your device, ensuring maximum privacy.' },
      { name: 'HD Transparent Output', detail: 'Exports transparent PNG files without compromising on the quality or resolution of the main subject.' },
      { name: 'Instant Processing', detail: 'Removes background in seconds without requiring registration, login, or any subscription fees.' },
      { name: 'Great for Official Forms', detail: 'Specially optimized to remove backgrounds from portrait photos and signature scans for exam forms.' }
    ],
    faqs: [
      { q: 'Is my uploaded image secure and private?', a: 'Yes, 100%. Unlike other online background removal utilities, our tool operates entirely inside your web browser using WebAssembly. Your image is processed locally and never uploaded to any server, offering complete security and privacy.' },
      { q: 'What image formats and file sizes are supported?', a: 'We support standard image formats including JPG, JPEG, PNG, and WebP. The maximum recommended file size is 10MB to ensure smooth and fast processing in your browser.' },
      { q: 'Why is the background removal process taking some time on first use?', a: 'On your first run, the tool needs to download a lightweight AI model directly into your browser cache (approx. 2-5MB). Subsequent removals will be near-instantaneous since the model will already be cached locally.' }
    ]
  },
  'pdf-crop': {
    title: 'PDF Crop Studio',
    desc: 'Crop margins, adjust dimensions, and trim borders of PDF document pages. This tool allows candidates to precisely format digital study materials, scanned notes, and certificates to fit standard paper dimensions or custom boundaries.',
    steps: [
      'Upload your PDF document by clicking the drag & drop area.',
      'Choose a preset crop template (like A4 or Letter) or select "Custom Margin Crop".',
      'For custom crop, input the desired margins in points (Top, Right, Bottom, Left).',
      'Click the "Crop PDF Document" button to process pages in real-time.',
      'Once complete, click the "Download PDF" button to save your formatted file.'
    ],
    features: [
      { name: 'Preset Templates', detail: 'Instantly align pages with standard A4 or US Letter dimensions to make printing and reading convenient.' },
      { name: 'Multi-Page Support', detail: 'Applies chosen cropping parameters across all pages in the PDF document simultaneously for consistency.' },
      { name: 'Secure Processing', detail: 'Processed entirely within your web browser sandbox. No server interaction means your documents remain confidential.' },
      { name: 'Accurate Dimension Control', detail: 'Input custom values down to the exact point level to crop header/footer text or unwanted black borders.' }
    ],
    faqs: [
      { q: 'Can I crop single pages individually?', a: 'Currently, the crop setting applies uniformly to all pages of the document to ensure a standard layout. We are working on a page-by-page cropping feature in our upcoming update.' },
      { q: 'Will cropping a PDF reduce its file quality?', a: 'No, cropping only changes the visible viewport box (crop box) settings of the pages. The vector elements, text fonts, and image resolutions inside the PDF remain completely untouched and lose zero quality.' },
      { q: 'What is a "point" in PDF cropping?', a: 'In digital documents, PDF dimensions are calculated in points. 1 inch is equal to 72 points. A standard A4 page is approximately 595 x 842 points.' }
    ]
  },
  'image-crop': {
    title: 'Smart Image Cropper',
    desc: 'Crop, rotate, and trim your photos to specific sizes or official aspect ratios (like 3:4 Passport, 1:1 Square, and 4:3 UPSC Exam Photo). This utility runs entirely inside your browser, guaranteeing that your personal photos never leave your device.',
    steps: [
      'Upload your image (JPG, PNG, or WebP) by dragging it into the editor.',
      'Select a preset aspect ratio like Passport (3:4) or Square (1:1), or choose Free Crop.',
      'Adjust the crop box handles to target the exact area of the image.',
      'Click the "Rotate" button if you need to adjust orientation.',
      'Click "Crop Selection" to generate a preview, then click "Download Cropped Photo" to save.'
    ],
    features: [
      { name: 'Government Exam Presets', detail: 'Pre-configured cropping ratios for UPSC, SSC, banking, and state-level recruitment portals.' },
      { name: 'Rotational Control', detail: 'Easily rotate images by 90-degree increments to fix sideways or upside-down uploads.' },
      { name: '100% Client-Side', detail: 'Processed completely in the browser sandbox. No images are sent to external servers.' },
      { name: 'HQ Canvas Extraction', detail: 'Uses high-quality sub-pixel rendering to extract crop areas without losing resolution.' }
    ],
    faqs: [
      { q: 'What is the standard passport size photo aspect ratio?', a: 'For Indian government exams and passport applications, the standard aspect ratio is 3:4 (e.g. 3.5cm x 4.5cm). You can select our "Passport (3:4)" preset to crop it perfectly.' },
      { q: 'Will my cropped photo lose its quality?', a: 'No. The cropper reads the original resolution (natural dimensions) of the image and crops based on relative coordinates, maintaining maximum pixel quality.' },
      { q: 'Can I rotate and crop at the same time?', a: 'Yes. You can rotate the image first and then adjust the crop box to capture the desired portion.' }
    ]
  },
  'image-resizer': {
    title: 'Image Resizer & JPG to PNG Converter',
    desc: 'Resize, compress, and re-format photos to meet strict document guidelines for government portals (like SSC, UPSC, IBPS). Convert formats instantly (e.g. JPG to PNG, PNG to JPG, WebP) with precise quality and KB controls executing entirely inside your browser.',
    steps: [
      'Select and upload the image file (JPG, PNG, or WebP) you want to process.',
      'Enter custom dimensions (width & height in pixels) or choose an official exam preset.',
      'To convert format (like JPG to PNG), select your target format in the dropdown menu.',
      'Adjust the quality slider to target a specific KB limit if required.',
      'Click "Resize Now" and download your converted PNG/JPG image.'
    ],
    features: [
      { name: 'JPG to PNG Conversion', detail: 'Convert image formats instantly without losing quality or rendering layouts on remote servers.' },
      { name: 'Target KB Compression', detail: 'Set exact limits (e.g., under 20KB or 50KB) to satisfy rigid recruitment portal rules.' },
      { name: 'Exam Presets', detail: 'Pre-loaded dimensions for UPSC, SSC, IBPS, and state PSC passport and signature uploads.' },
      { name: 'Aspect Ratio Guard', detail: 'Lock proportions to keep your face and text details looking natural and professional.' }
    ],
    faqs: [
      { q: 'How do I convert JPG to PNG?', a: 'Simply upload your JPG image, go to the "Output Format" dropdown, select "PNG", and click "Resize Now". The tool will process it locally and download it as a PNG.' },
      { q: 'How do I compress an image to exactly under 20 KB?', a: 'Upload your image, choose JPEG as the output format, and slide the quality slider down (e.g. to 70% or 80%). The live preview will display the estimated output file size. Adjust the slider until it fits your target size limit.' },
      { q: 'Are my personal images safe?', a: 'Yes. Our Image Resizer operates 100% locally in your web browser. Your photos are never uploaded, stored, or reviewed on our servers.' }
    ]
  },
  'signature-maker': {
    title: 'Digital Signature Maker',
    desc: 'Create professional digital signatures online. Draw your signature on a responsive canvas or type your name using elegant cursive fonts, and export it as a transparent, high-resolution PNG file suitable for e-filing, online job applications, and official documents.',
    steps: [
      'Choose between "Draw Signature" (using touch/mouse) or "Type Signature" (converting typed name to script).',
      'If drawing, select your pen color (Black, Blue, Red) and stroke thickness.',
      'If typing, enter your name and select your favorite cursive font style from the list.',
      'Use the canvas controls to clear, undo, or adjust background transparency.',
      'Click "Export Signature" to download a clean PNG image ready for use.'
    ],
    features: [
      { name: 'Draw & Type Modes', detail: 'Flexible creation options—draw naturally using a stylus/mouse or generate using beautiful hand-written fonts.' },
      { name: 'Transparent PNG Output', detail: 'Generates transparent backgrounds so your signature overlays cleanly on any digital PDF document or letterhead.' },
      { name: 'Cursive Font Selection', detail: 'Includes dozens of elegant, high-quality cursive and calligraphic fonts to find the perfect professional look.' },
      { name: 'Mobile Optimized Canvas', detail: 'Responsive drawing canvas with smooth touch tracking for drawing easily on smartphones and tablets.' }
    ],
    faqs: [
      { q: 'Can I use this digital signature on official PDF forms?', a: 'Yes! The exported PNG file has a transparent background, meaning you can insert it into Word documents, PDFs, or online application portals (such as SSC, NTA, or Banking portals) without any white borders.' },
      { q: 'Is my signature recorded or saved by the website?', a: 'Absolutely not. The drawing canvas runs locally in your browser. No data, keystrokes, or canvas strokes are sent to our servers. Your signature is strictly yours and remains local.' },
      { q: 'How do I get a clean drawn signature on mobile?', a: 'For best results, rotate your mobile screen to landscape mode and use a capacitive stylus pen, or draw slowly with your finger on our high-precision canvas.' }
    ]
  },
  'passport-photo-maker': {
    title: 'Passport Photo Maker',
    desc: 'Create official passport, visa, and identification photos online. Crop your portrait to standard country dimensions, adjust backgrounds, and format printable sheets with multiple photo grids locally.',
    steps: [
      'Upload a front-facing portrait photo with decent lighting.',
      'Select your target country passport standard (e.g., India Passport, US Visa, SSC Exam Photo).',
      'Use the cropping frame to align your face, eyes, and shoulders within the official guides.',
      'Apply background corrections or keep it original, and choose your print grid layout.',
      'Download your high-resolution passport photo print sheet or single crop.'
    ],
    features: [
      { name: 'Official Guidelines', detail: 'Pre-configured dimensions for major country passports and global visa applications.' },
      { name: 'Print-Ready Grids', detail: 'Create sheets with 6, 8, or 12 passport photos on standard print paper sizes (A4, 4x6).' },
      { name: 'Precise Face Alignment', detail: 'Built-in overlay guidelines ensure your eyes, chin, and hair align perfectly with official portal mandates.' },
      { name: 'Local Processing', detail: 'Full crop, grid generation, and output rendering happen completely in-browser to safeguard personal images.' }
    ],
    faqs: [
      { q: 'What is the required size for Indian Passport photos?', a: 'The standard size for Indian passport photos is 2x2 inches (51x51 mm) or 35x45 mm depending on the form category. Select the appropriate preset from our dropdown to auto-configure.' },
      { q: 'How should I pose for a passport photo?', a: 'Stand or sit against a plain background, look directly at the camera with a neutral facial expression, keep both eyes open, and make sure your shoulders are level.' },
      { q: 'Can I print the output sheet at home?', a: 'Yes. The sheet format is designed for standard A4 or 4x6 photo paper. You can save it and print it on any color photo printer.' }
    ]
  },
  'pdf-tools': {
    title: 'PDF Merger & PDF to JPG Converter',
    desc: 'Combine multiple PDF files into one cohesive document, or extract pages as standard JPG images. Arrange, re-order, and convert pages securely without uploading files to any remote server.',
    steps: [
      'Select and upload your PDF files from your device.',
      'To Merge: Drag and drop the list items to arrange the sequence, and click "Merge PDFs".',
      'To Convert PDF to JPG: Click the "PDF to JPG" button to extract the page layout directly as an image.',
      'Review file details and click the download button to save the output.'
    ],
    features: [
      { name: 'PDF to JPG Extraction', detail: 'Convert PDF pages into high-resolution JPG images locally inside your browser using PDF.js rendering.' },
      { name: 'Intuitive Drag & Drop', detail: 'Re-arrange the sequence of documents visually to ensure pages appear in the correct order.' },
      { name: 'Fast Compilation', detail: 'Combines large documents in seconds using client-side JavaScript libraries.' },
      { name: 'Preserves PDF Metadata', detail: 'Retains original text formatting, hyperlinks, and page resolutions in the merged output.' }
    ],
    faqs: [
      { q: 'How does PDF to JPG conversion work?', a: 'The tool uses PDF.js to render the vector graphics of your PDF page onto an invisible HTML5 canvas, which is then exported as a high-quality JPG image directly in your browser.' },
      { q: 'Is there a limit to how many files I can merge?', a: 'No, there are no hard limits. You can merge two or twenty files. However, merging very large files on low-end devices might take a few moments depending on your browser memory.' },
      { q: 'Are my academic certificates secure when merging?', a: 'Yes. The merging process takes place locally inside your browser. Your sensitive educational certificates and personal documents are never transmitted over the internet.' }
    ]
  },
  'resume-builder': {
    title: 'ATS-Friendly Resume Builder',
    desc: 'Build professional, ATS-compliant resumes. Fill out pre-formatted sections for education, experience, skills, and projects, select elegant templates, and export print-ready PDFs in minutes.',
    steps: [
      'Fill in your Personal Information, Contact Details, and Professional Summary.',
      'Add entries for Work Experience, Education, Technical Skills, and Projects.',
      'Select your preferred template style (Modern, Minimalist, or Professional).',
      'Preview the layout in real-time as you fill in details.',
      'Click "Export PDF" to download your structured, ATS-ready resume.'
    ],
    features: [
      { name: 'ATS Optimized Layouts', detail: 'Designed to parse perfectly through Automated Applicant Tracking Systems (ATS) used by major companies.' },
      { name: 'Real-Time Preview', detail: 'See exactly how your resume looks on a simulated paper page with every keystroke you make.' },
      { name: 'Structured Sections', detail: 'Guided fields for all standard career details, ensuring you never miss important qualifications.' },
      { name: 'No Watermarks', detail: 'Export clean, professional, high-quality PDFs completely free of charge and without any branding watermarks.' }
    ],
    faqs: [
      { q: 'What makes a resume ATS-friendly?', a: 'ATS-friendly resumes use standard fonts, clear headings, chronological layouts, and avoid text boxes, icons inside headings, or graphics that confuse scanning software. Our templates are specifically optimized for these rules.' },
      { q: 'Is my personal career history saved?', a: 'No. All input text is kept locally inside your React app state. Your data is never saved on any database, protecting your personal employment history.' },
      { q: 'Can I edit the resume after downloading?', a: 'Yes. As long as you do not close the website tab, your inputs are saved in browser state. We recommend keeping the tab open until you are completely satisfied with the PDF.' }
    ]
  },
  'age-calculator': {
    title: 'Precise Age & Cutoff Calculator',
    desc: 'Verify recruitment eligibility instantly. Calculate your exact age in years, months, and days relative to official cutoff dates specified in government recruitment notifications (UPSC, SSC, Railway, State PSCs).',
    steps: [
      'Input or select your Date of Birth in the date parameters card.',
      'Enter the cutoff date specified in the official job notification (defaults to today).',
      'Click the "Verify Age" button.',
      'View your precise age formatted in Years, Months, and Days.',
      'Compare results against your exam eligibility requirements.'
    ],
    features: [
      { name: 'Cutoff Calculations', detail: 'Allows choosing future or past target dates to align perfectly with specific exam guidelines.' },
      { name: 'Detailed Statistics', detail: 'Shows years, months, and days to avoid manual calendar calculations.' },
      { name: 'Zodiac & Milestone Info', detail: 'Includes extra details such as days alive, next birthday countdown, and zodiac signs.' },
      { name: 'Error-Free Engine', detail: 'Accounts for leap years and varying month lengths automatically.' }
    ],
    faqs: [
      { q: 'Why do recruitment notifications specify an "Age as on" date?', a: 'Recruitment boards establish standard cutoff dates (e.g., January 1st or August 1st of the exam year) to standardize applicant eligibility, rather than calculating age at the time of form submission.' },
      { q: 'Is the calculator accurate for leap years?', a: 'Yes. The calculation engine uses standard date-time libraries (`dayjs`) that fully account for leap years and different days in calendar months.' },
      { q: 'Does this tool store my date of birth?', a: 'No, all calculations run in your client-side browser and no inputs are sent to any analytics or databases.' }
    ]
  },
  'salary-slabs': {
    title: 'Sarkari Salary Slabs Calculator',
    desc: 'Calculate Gross Salary, NPS deductions, income tax liabilities, and net in-hand monthly salary for Indian Central and State government posts (SSC, UPSC, BPSC, BSSC, BSPHCL, Jeevika). Based on the latest pay scales, Allowances (DA, HRA, TA), and tax slabs.',
    steps: [
      'Choose the pay commission tier or input your Basic Pay directly.',
      'Select your city category (X, Y, Z) to automatically calculate the correct HRA percentage.',
      'Input applicable Dearness Allowance (DA) rates and Transport Allowance (TA).',
      'Configure deductions such as NPS (10% of Basic + DA), Professional Tax, and health schemes.',
      'Review the comprehensive salary breakdown sheet showing Gross vs Net In-Hand salary.'
    ],
    features: [
      { name: 'Government Pay Matrix', detail: 'Supports pay level calculation matrices based on official Pay Band tables.' },
      { name: 'Dynamic HRA Categories', detail: 'Auto-calculates X, Y, and Z class city HRA parameters (27%, 18%, 9% or updated ratios).' },
      { name: 'NPS Deduction Tool', detail: 'Automatically calculates NPS employee contribution share for transparency.' },
      { name: 'Tax Slab Comparison', detail: 'Provides comparisons of Old vs New tax regimes on your generated annual gross income.' }
    ],
    faqs: [
      { q: 'What are X, Y, and Z cities for HRA?', a: 'Cities are classified by population. Class X (metro cities) receives the highest HRA, Class Y (tier-2 cities) receives moderate, and Class Z (rural/small towns) receives the baseline HRA.' },
      { q: 'Is the NPS deduction mandatory?', a: 'For most new government recruits, 10% of (Basic Pay + Dearness Allowance) is deducted monthly as a mandatory contribution towards the National Pension System, matched by a government contribution.' },
      { q: 'Are these calculations official?', a: 'The tool uses standard official government allowance formulas. However, final salaries may vary slightly based on specific department rules, local taxes, or active allowances.' }
    ]
  },
  'jpg-to-pdf': {
    title: 'JPG / PNG to PDF Multi-Converter',
    desc: 'Convert multiple photographs, PNG images, handwritten assignments, and ID cards into a single cohesive PDF document. Re-order files and generate PDFs locally without any server uploads.',
    steps: [
      'Upload one or multiple images (JPG, JPEG, PNG, or WebP) using the file input.',
      'To remove an image from the queue, click the trash icon next to it.',
      'Click "Create PDF Now" to compile all selected images into a single multi-page PDF.',
      'Review the success status and click "Download PDF" to save your compiled document.'
    ],
    features: [
      { name: 'Multi-Image PNG/JPG Batching', detail: 'Compile multiple PNG or JPG photos into a single formatted PDF file in one go.' },
      { name: 'Local PDF Assembly', detail: 'Runs inside your browser using pdf-lib. Your personal documents and images never touch a server.' },
      { name: 'Page Size Preservation', detail: 'Embedded images retain their original pixel dimensions and aspect ratios inside the output PDF pages.' },
      { name: 'Clean Clean Interface', detail: 'Add and remove images from your conversion queue easily before rendering the PDF.' }
    ],
    faqs: [
      { q: 'Can I compile both PNG and JPG files together?', a: 'Yes! The compiler accepts both formats simultaneously. Each image will be rendered on its own page inside the resulting PDF document.' },
      { q: 'Is there a limit on the number of images I can upload?', a: 'No, but uploading extremely large images may consume significant browser memory. We recommend resizing very large images before compiling.' },
      { q: 'How can I ensure my PDF pages do not look stretched?', a: 'The converter maintains the aspect ratio of your original images, centering them on the selected paper preset size.' }
    ]
  },
  'form-helper': {
    title: 'Government Portal Directory & Form Helper',
    desc: 'Quick access directory for major recruitment, educational, and service portals in India. Find direct links to login pages, admit cards, and application portals.',
    steps: [
      'Browse through categories like Recruitment, Education, Services, and State Portals.',
      'Use the search bar to locate specific portals (e.g. SSC, UPSC, NTA).',
      'Review helpful hints regarding active forms, guidelines, and document sizes.',
      'Click the "Open Portal" button to open the official website in a new tab.'
    ],
    features: [
      { name: 'Curated Directory', detail: 'Direct, verified links to official application portals, minimizing phishing risks.' },
      { name: 'Active Notifications', detail: 'Lists standard deadlines and notification PDFs for major exams.' },
      { name: 'Document Guidelines Quick-View', detail: 'Lists image and PDF size limits for each portal directly on its directory card.' },
      { name: 'Safe Navigation', detail: 'Links directly to official government domains (.gov.in, .nic.in).' }
    ],
    faqs: [
      { q: 'Are these links official?', a: 'Yes, we only index official websites of government recruitment boards, universities, and utility services.' },
      { q: 'Why cannot I fill forms directly on this website?', a: 'This is a helper suite. Forms must be filled on official government portals. We provide the tools to edit documents according to their guidelines, and the direct links to submit them.' },
      { q: 'How often is the directory updated?', a: 'Our team regularly reviews and updates the directory to ensure links point to active, working recruitment cycles.' }
    ]
  },
  'office-tools': {
    title: 'Online Office Suite Viewer',
    desc: 'Open, read, and preview Word files (.docx), Excel sheets (.xlsx), and PowerPoint slides (.pptx) locally inside your browser. No software installations or sign-ups required.',
    steps: [
      'Select the Office document (.docx, .xlsx, .pptx) from your file explorer.',
      'Wait for the client-side parser to process the file elements.',
      'View formatted tables, text styles, and layout elements in the responsive viewer.',
      'Search for specific terms within the document using search boxes.',
      'Reset and upload another file as needed.'
    ],
    features: [
      { name: 'Zero Software Installs', detail: 'No need for MS Office, LibreOffice, or online accounts. Open files on any device.' },
      { name: 'Multi-Format Reader', detail: 'Supports reading Word documents, Excel sheets, and PowerPoint presentations.' },
      { name: 'Client-Side Rendering', detail: 'Files are read locally in-browser using JS libraries, protecting confidential corporate or educational documents.' },
      { name: 'Print & PDF Export', detail: 'Export the rendered preview to PDF or print directly from your browser layout.' }
    ],
    faqs: [
      { q: 'Can I edit the files here?', a: 'This tool is currently a fast document viewer designed to help you read and verify layouts. Editing capabilities are planned for future versions.' },
      { q: 'Why does my Excel file look slightly different?', a: 'Complex Excel formulas, heavy macro scripts, or custom charts may render as flat tables. The tool focuses on displaying cell data and formatting accurately.' },
      { q: 'Does this tool send my files to any cloud server?', a: 'No, never. The file parsing libraries run in JavaScript inside your own browser window. No network requests are made with your file content.' }
    ]
  },
  'ai-website-builder': {
    title: 'AI Website Builder',
    desc: 'Generate HTML/CSS websites and templates instantly using AI. Enter your design requirements, preview the generated website layout in real-time, and download the ready-to-use codebase.',
    steps: [
      'Enter a detailed text prompt describing the website layout you want to build.',
      'Select styling preferences like layout type and primary color theme.',
      'Click the "Generate Website" button to initiate the design engine.',
      'Review the generated preview frame and inspect the underlying HTML/CSS code.',
      'Click the download button to export the complete website files in a ZIP archive.'
    ],
    features: [
      { name: 'Dynamic AI Generation', detail: 'Generates structured, clean, semantic HTML5 code and vanilla CSS layouts based on user descriptions.' },
      { name: 'Live Preview Sandbox', detail: 'View the rendered design side-by-side with the code editor to see adjustments instantly.' },
      { name: 'Zero Setup Design', detail: 'Ideal for prototyping, creating landing pages, portfolio drafts, or layout structures quickly.' },
      { name: 'Export Ready Code', detail: 'Download fully self-contained HTML files ready to be hosted on Vercel, Netlify, or Github Pages.' }
    ],
    faqs: [
      { q: 'Do I need coding experience to use this?', a: 'Not at all! You can describe what you need in plain English (e.g. "A landing page for a coffee shop with a menu grid") and the AI will handle the rest.' },
      { q: 'Is the generated code mobile-friendly?', a: 'Yes, the generation engine is programmed to produce responsive layouts that adjust smoothly to mobile, tablet, and desktop viewports.' },
      { q: 'Can I host the generated code on my own domain?', a: 'Absolutely. The output is standard, self-contained HTML and CSS code. You can download the files and upload them to any hosting platform.' }
    ]
  },
  'document-converter': {
    title: 'Universal Document Converter',
    desc: 'Convert between popular document formats like Word (.docx), Excel (.xlsx), and PDF. Simplify document submissions by converting text structures securely.',
    steps: [
      'Upload the document file you wish to convert.',
      'Select the target output format from the available conversion options.',
      'Click the "Convert Document" button to process the file.',
      'Monitor the progress bar as the file is compiled locally.',
      'Download the finalized output document.'
    ],
    features: [
      { name: 'Multi-Format Conversion', detail: 'Convert text documents and data sheets to universally readable formats.' },
      { name: 'Fast Local Processing', detail: 'Converts documents in seconds using optimized browser rendering engines.' },
      { name: 'Layout Integrity', detail: 'Preserves font weights, lists, tables, and spacing headers where possible.' },
      { name: 'Private Document Sandbox', detail: 'Processes all files strictly on your local machine, keeping data confidential.' }
    ],
    faqs: [
      { q: 'Can I convert scanned PDFs into Word files?', a: 'The converter extracts text structures. For scanned PDFs (which are essentially images), standard conversion will extract layout frames. For full OCR text recognition, you may need a specialized scanner tool.' },
      { q: 'Does this tool support password-protected files?', a: 'No, you must remove password locks from files before attempting conversion.' },
      { q: 'Are my converted documents stored online?', a: 'No. The conversion executes entirely within your browser. No files are uploaded to any external server.' }
    ]
  },
  'pdf-security': {
    title: 'PDF Security & Password Protect',
    desc: 'Secure your PDF documents, salary sheets, and certificates. Encrypt your files with custom user and owner passwords or decrypt password-locked PDFs locally.',
    steps: [
      'Select and upload the PDF file you want to lock or unlock.',
      'Choose the operation mode: "Add Password Protection" or "Remove Password".',
      'For protection, enter a strong, secure password in the input field.',
      'Click the "Apply Security Settings" button to compile.',
      'Download your secured/decrypted PDF document.'
    ],
    features: [
      { name: 'Strong Encryption', detail: 'Uses industry-standard 128-bit encryption algorithms to lock PDF contents securely.' },
      { name: 'Instant Decryption', detail: 'Remove passwords from documents you own to make sharing easier.' },
      { name: 'Zero Server Exposure', detail: 'Passwords and sensitive documents are processed locally, keeping keys and files 100% private.' },
      { name: 'Preserves File Data', detail: 'Locks or unlocks the file structure without altering text, layouts, or resolutions.' }
    ],
    faqs: [
      { q: 'What happens if I forget the password I set?', a: 'Because this tool operates locally and does not upload your files, we cannot recover forgotten passwords. Make sure to remember or note down the password you choose.' },
      { q: 'Can I remove protection from any locked PDF?', a: 'To remove a password, you must know the active password of the PDF. We do not support illegal cracking of protected files.' },
      { q: 'Is it safe to secure bank statements using this tool?', a: 'Yes. The processing is entirely client-side. The password and file never travel across the internet.' }
    ]
  },
  'pdf-compressor': {
    title: 'PDF Compressor Pro',
    desc: 'Reduce PDF file sizes to meet upload limits on exam and job application forms. Adjust quality parameters and compress files locally without losing text clarity.',
    steps: [
      'Upload your PDF document into the drag and drop box.',
      'Select the target compression level (Low, Medium, High).',
      'Review the estimated output size displayed on screen.',
      'Click the "Compress PDF" button to process the file.',
      'Download your optimized, smaller PDF file.'
    ],
    features: [
      { name: 'Visual Quality Slider', detail: 'Fine-tune the compression level to balance file size reduction with readable clarity.' },
      { name: 'Before vs After Display', detail: 'Shows the exact reduction percentage and size comparisons (e.g. 5MB to 800KB) instantly.' },
      { name: 'Retains Text Elements', detail: 'Compresses embedded images while keeping text fonts sharp and fully searchable.' },
      { name: '100% Secure Sandbox', detail: 'Compiles and compresses document layouts inside your browser window. Zero upload risk.' }
    ],
    faqs: [
      { q: 'Will compressing a PDF make the text blurry?', a: 'No. The compressor primarily optimizes embedded images and unnecessary metadata. Text vectors and fonts remain perfectly clear and readable.' },
      { q: 'How much size can I reduce?', a: 'Depending on the images inside, you can see size reductions up to 70-80%. For text-only PDFs, compression will be smaller since they are already lightweight.' },
      { q: 'Is there a limit on the uploaded PDF size?', a: 'There are no hard platform limits, but files over 50MB may take a few moments to compile depending on your device hardware.' }
    ]
  },
  'typing-test': {
    title: 'Typing Speed Test Pro',
    desc: 'Practice and measure your typing speed (WPM) and accuracy. Specially designed to emulate official typing tests for government recruitment exams like SSC CHSL, High Court, and CPCT.',
    steps: [
      'Choose your language (English, Hindi) and test duration (1, 2, or 5 minutes).',
      'Select your practice paragraph category from the list.',
      'Start typing in the input box; the timer starts automatically with your first keystroke.',
      'Real-time stats show your current Words Per Minute (WPM) and accuracy percentage.',
      'Review your comprehensive results screen upon completion.'
    ],
    features: [
      { name: 'Official Exam Layouts', detail: 'Simulates screen parameters of recruitment tests to build muscle memory.' },
      { name: 'Hindi & English Support', detail: 'Supports standard layouts (including Remington Gail and Mangal fonts for Hindi).' },
      { name: 'Accurate Error Analysis', detail: 'Highlights spelling mistakes, missed characters, and calculates net WPM vs gross WPM.' },
      { name: 'Custom Timers', detail: 'Choose standard test durations matching official job notification protocols.' }
    ],
    faqs: [
      { q: 'How is WPM calculated?', a: 'WPM (Words Per Minute) is calculated by dividing total characters typed by 5, and then dividing by the time elapsed. Net WPM subtracts errors to reflect true typing capabilities.' },
      { q: 'Does this tool support Hindi Mangal font?', a: 'Yes, it supports standard Hindi input layouts including Mangal and Remington Gail, which are standard for state government typing tests.' },
      { q: 'Can I use this on a mobile device?', a: 'Yes, but for realistic practice, we recommend connecting a physical USB keyboard via OTG to your smartphone or practicing on a laptop/desktop.' }
    ]
  },
  'pdf-watermark': {
    title: 'PDF Watermark Studio',
    desc: 'Add custom text watermarks to your PDF pages to protect intellectual property, prevent unauthorized sharing, and mark documents as "Confidential" or "Draft".',
    steps: [
      'Upload the PDF document you want to watermark.',
      'Enter your custom watermark text (e.g. "CONFIDENTIAL", your name, or date).',
      'Adjust font size, opacity, rotation angle, and text color using the control panel.',
      'Click the "Apply Watermark" button to render the overlays.',
      'Download your protected PDF file.'
    ],
    features: [
      { name: 'Custom Overlays', detail: 'Full control over watermark text, opacity sliders, colors, and rotation angles.' },
      { name: 'All-Page Application', detail: 'Adds the custom watermark to all pages of the PDF document in one click.' },
      { name: 'Responsive Rendering', detail: 'Ensures watermarks overlay correctly on both portrait and landscape pages.' },
      { name: 'Safe Local Output', detail: 'Watermark stamping runs entirely inside your browser. No files are uploaded.' }
    ],
    faqs: [
      { q: 'Will the watermark cover the underlying text?', a: 'You can adjust the opacity slider (e.g. to 15% or 20%). This makes the watermark transparent enough to let readers read the text clearly while still securing the document.' },
      { q: 'Can I remove a watermark after applying it?', a: 'Once you apply and download the PDF, the watermark is merged. We recommend keeping a backup of the original PDF before applying watermarks.' },
      { q: 'Does this support image watermarks?', a: 'This version supports custom text watermarks. Image-based watermarks (like logos) are planned in the upcoming release.' }
    ]
  },
  'pdf-rotate': {
    title: 'PDF Page Rotator',
    desc: 'Rotate single or multiple pages in a PDF document. Fix upside-down document scans and align pages to portrait or landscape orientations easily.',
    steps: [
      'Upload your PDF document to the file list.',
      'Select individual page thumbnails or choose to rotate all pages.',
      'Click the rotation controls (90° Clockwise, 90° Counter-Clockwise, or 180°).',
      'Review the orientation adjustments on the preview panel.',
      'Click "Save & Download" to export the updated PDF.'
    ],
    features: [
      { name: 'Selective Rotation', detail: 'Rotate specific pages individually without affecting the rest of the document.' },
      { name: 'Bulk Rotation', detail: 'Rotate the entire document pages at once to fix scanner orientation errors.' },
      { name: 'Live Thumbnails', detail: 'Visual preview of PDF page structures to verify orientation before downloading.' },
      { name: 'Browser-Based Stamping', detail: 'Executes locally in-browser using modern binary builders, keeping documents safe.' }
    ],
    faqs: [
      { q: 'Can I rotate pages in different directions?', a: 'Yes. You can rotate Page 1 clockwise and Page 2 counter-clockwise. The layout preview will show the orientations in real-time.' },
      { q: 'Why did my scanned PDF load upside down?', a: 'Scanners sometimes compile pages based on how the sheets were fed. This tool is designed to fix those orientation errors.' },
      { q: 'Is there a limit on file size?', a: 'No, but large documents with high-res scans may take a few seconds to load page previews.' }
    ]
  },
  'html-to-pdf': {
    title: 'HTML to PDF Converter',
    desc: 'Convert webpage URLs, raw HTML code structures, or receipts into high-quality PDF files. Save web pages for offline reading and document compilation.',
    steps: [
      'Enter the target webpage URL or paste your custom HTML code block.',
      'Configure page preferences like orientation (Portrait/Landscape) and margins.',
      'Click the "Generate PDF" button.',
      'Preview the webpage formatting inside the render panel.',
      'Download your print-ready PDF document.'
    ],
    features: [
      { name: 'URL & Code Modes', detail: 'Convert live webpages via URL or render custom HTML/CSS code directly.' },
      { name: 'Responsive Rendering', detail: 'Adapts standard webpage viewports to fit standard PDF paper dimensions.' },
      { name: 'Preserves Hyperlinks', detail: 'Retains active links, text structures, and images in the final PDF.' },
      { name: 'Secure Sandbox', detail: 'Code compiling runs locally in the browser sandbox, protecting user inputs.' }
    ],
    faqs: [
      { q: 'Can I convert pages behind a login screen?', a: 'For pages requiring authentication (like bank statements or profile pages), copy the page HTML code and paste it into our code input mode to render it.' },
      { q: 'Will the PDF look exactly like the webpage?', a: 'The layout engine translates standard CSS. Dynamic scripts, animations, or video embeds will render as static elements.' },
      { q: 'Does this tool track URLs I convert?', a: 'No. The conversion is processed locally and URLs are fetched directly, maintaining browsing confidentiality.' }
    ]
  },
  'pdf-page-number': {
    title: 'PDF Page Numberer',
    desc: 'Add page numbers to your PDF documents automatically. Select custom position styles, font sizes, text formats, and page ranges.',
    steps: [
      'Upload the PDF file you want to paginate.',
      'Choose numbering positions (Header, Footer, Left, Right, Center).',
      'Select the page numbering format (e.g. "Page X", "Page X of Y", or standard digits).',
      'Select starting page index and customize text color or size.',
      'Click "Apply Page Numbers" and download your updated document.'
    ],
    features: [
      { name: 'Flexible Positions', detail: 'Place numbers at the top or bottom of pages, aligned left, right, or centered.' },
      { name: 'Custom Formats', detail: 'Supports "Page X", "X of Y", or custom prefix numbering schemes.' },
      { name: 'Range Filters', detail: 'Exclude cover pages or tables of contents from the pagination list.' },
      { name: 'Lossless Formatting', detail: 'Paginates files without modifying underlying fonts, text, or resolutions.' }
    ],
    faqs: [
      { q: 'Can I skip the first page (cover page)?', a: 'Yes! You can set the "Start Numbering From" option to Page 2, so the cover page remains clean and numbering begins on the second page.' },
      { q: 'Will the page numbers overlap my document content?', a: 'We recommend choosing positions with sufficient margin space. You can also customize font sizes to keep numbers compact.' },
      { q: 'Is this process safe for legal documents?', a: 'Yes. The entire PDF edit is performed locally inside your browser memory. Your document remains secure on your device.' }
    ]
  },
  'pdf-edit': {
    title: 'PDF Document Editor',
    desc: 'Modify PDF metadata fields (Title, Author, Subject, Keywords) or append text overlays to your PDF document pages easily.',
    steps: [
      'Upload the PDF file you want to edit.',
      'Modify metadata fields inside the edit panels (Title, Author, Subject).',
      'Add custom text overlays or annotations to specific page coordinates.',
      'Click the "Save Changes" button to compile modifications.',
      'Download your updated PDF document.'
    ],
    features: [
      { name: 'Metadata Editing', detail: 'Update PDF title, author, subject, and keyword index fields for professional indexing.' },
      { name: 'Custom Annotations', detail: 'Place custom text overlays at specific coordinates on page layouts.' },
      { name: 'Binary Preservations', detail: 'Keeps layout formatting, vector data, and resolutions intact.' },
      { name: 'On-Device Execution', detail: 'All parsing and modifications happen locally, keeping confidential documents secure.' }
    ],
    faqs: [
      { q: 'Can I edit the existing text of a PDF?', a: 'This tool allows updating file metadata and placing new text annotations or overlays. Editing original scanned text directly requires full OCR suites, which are planned for future updates.' },
      { q: 'Will modifying metadata affect the file signature?', a: 'If a PDF is cryptographically signed, any changes to metadata or contents will invalidate the digital signature, which is standard PDF behavior.' },
      { q: 'Is there a file size limit?', a: 'No, but large documents may take a few moments to compile in-browser.' }
    ]
  },
  'video-to-pdf': {
    title: 'Video to PDF Converter',
    desc: 'Convert lectures, online tutorials, presentations, and screen recordings into printable PDF handouts. Extract frames at custom time intervals or specify exact capture counts, preview extracted frames, and compile them into high-quality PDFs locally in your browser.',
    steps: [
      'Select and upload your video file (MP4, WebM, OGG, or MOV format).',
      'Select your frame capture mode: "Capture Every N Seconds" or "Capture Exactly N Frames".',
      'Configure the desired time intervals or target frame count in the settings panel.',
      'Click "Extract Video Frames" to process the video locally in-browser.',
      'Review extracted frames in the preview grid, delete any unwanted frames, configure your page orientation, and click "Compile To PDF Handout".'
    ],
    features: [
      { name: 'Flexible Frame Capture', detail: 'Extract frames at fixed intervals (e.g. every 5 seconds) or specify a exact target frame count evenly spaced throughout the video.' },
      { name: 'Interactive Frame Grid', detail: 'View all extracted frames, check their timestamps, and discard any blank or redundant frames before converting to PDF.' },
      { name: 'Print-Ready Formatting', detail: 'Align pages in portrait or landscape orientations with standard A4 page dimensions and margins.' },
      { name: '100% Client-Side Extraction', detail: 'All frame seeking, canvas drawing, and PDF compilation take place locally in JavaScript, ensuring zero data uploads.' }
    ],
    faqs: [
      { q: 'Does this tool support audio or video streaming links?', a: 'This tool processes uploaded video files locally inside your browser sandbox to ensure maximum privacy. Streaming links are not supported directly to prevent security constraints.' },
      { q: 'What is the maximum video file size I can upload?', a: 'You can upload files up to 100MB. Since all processing runs inside browser memory, larger files may cause browser tabs to refresh or lag on lower-spec devices.' },
      { q: 'Will the final PDF contain audio or play videos?', a: 'No, PDF is a static document format. The tool extracts visual snapshots/keyframes from the video and compiles them as printable image pages in a PDF document.' }
    ]
  },
  'jpg-to-png': {
    title: 'JPG to PNG Image Converter',
    desc: 'The JPG to PNG Image Converter is a state-of-the-art utility designed to convert compressed JPEG/JPG images into high-resolution, lossless PNG files instantly. Built specifically to assist candidates, students, and professionals in submitting online forms (UPSC, SSC, State PSC, NTA, Banking, etc.), this converter processes images directly in your browser. Unlike traditional online converters, your files are never uploaded to a cloud server, ensuring 100% data safety, confidentiality, and protection from identity theft.',
    steps: [
      'Upload your JPG/JPEG image by clicking the upload area or dragging and dropping the file.',
      'Check the preview image on the left card to ensure it is the correct file.',
      'Select whether you want a transparent canvas background or a solid white base (default is transparent).',
      'Click the "Convert to PNG" button to process the image using client-side canvas rendering.',
      'View the converted image in the results pane and click "Download PNG Image" to save it.'
    ],
    features: [
      { name: '100% Client-Side Conversion', detail: 'Runs entirely in your local browser sandbox using modern HTML5 Canvas technology. No data packages are sent over the internet.' },
      { name: 'Lossless Quality Output', detail: 'PNG uses lossless compression algorithms, ensuring that text, borders, signatures, and photographic details remain sharp and clear.' },
      { name: 'Transparent Background Option', detail: 'Toggle transparent canvas backgrounds, which is extremely helpful when converting signature scans and logo graphics.' },
      { name: 'Completely Free & No Watermarks', detail: 'Convert as many images as you need without premium subscriptions, ads, signup forms, or mandatory watermarks.' }
    ],
    faqs: [
      { q: 'What is the main difference between JPG and PNG?', a: 'JPG is a lossy format optimized for photographs where minor detail loss is acceptable to keep files tiny. PNG is a lossless format that preserves exact pixel color and details, and supports alpha transparency channels (transparent backgrounds).' },
      { q: 'Why do recruitment portals ask for PNG format instead of JPG?', a: 'Portals often request PNG files for signature scans and digital seals because PNG preserves transparency. This allows the system to overlay signatures onto document templates cleanly without displaying a solid white box.' },
      { q: 'Will my converted image look blurry or lose quality?', a: 'No. Because PNG is a lossless format, the pixels drawn onto the canvas are saved with perfect accuracy, maintaining the exact resolution and sharpness of the original JPG source.' }
    ]
  },
  'png-to-jpg': {
    title: 'PNG to JPG Image Converter',
    desc: 'The PNG to JPG Image Converter is an optimized utility that converts PNG files into universal, lightweight JPG format. Many official application portals require images (especially passport-sized photographs) in JPEG/JPG format under specific file size limits (like under 50KB). This tool allows you to convert PNG files, set custom JPEG compression quality, and preview the resulting output files instantly, ensuring compatibility with all portals while operating completely offline in your browser.',
    steps: [
      'Upload your PNG file by dragging it into the drop box or selecting it from your device storage.',
      'View the uploaded file in the live preview window.',
      'Use the interactive slider to adjust the JPG compression quality (recommended setting is 80-90% for a balance between clarity and size).',
      'Click the "Convert to JPG" button to run the local rendering script.',
      'Click the "Download JPG Image" button to save the optimized file.'
    ],
    features: [
      { name: 'Interactive Quality Slider', detail: 'Adjust quality levels from 10% to 100% to easily control file dimensions and output KB parameters.' },
      { name: 'Solid White Base Fill', detail: 'Automatically fills transparent pixels with solid white, preventing black backgrounds commonly caused by naive conversion.' },
      { name: 'Local Browser Processing', detail: 'Processes files locally using client-side canvas. Your images and documents never leave your PC.' },
      { name: 'Vite-Fast Stamping', detail: 'Converts and formats files instantly, so you do not have to wait for server queues or uploads.' }
    ],
    faqs: [
      { q: 'Why does my transparent PNG get a white background after converting to JPG?', a: 'The JPG format does not support transparency channels (alpha transparency). Therefore, our converter automatically fills all transparent areas with a clean white color to make the image suitable for passport photos and official document standards.' },
      { q: 'How does the quality slider affect the final file size?', a: 'Lowering the quality compresses the image data more aggressively. A quality of 90% keeps the image looking sharp while significantly reducing file size. Settings below 50% will compress the file even more but might introduce pixelation.' },
      { q: 'Is there any risk of third parties accessing my photos?', a: 'None at all. The conversion runs inside your browser. No files are uploaded to any external server or stored on our side.' }
    ]
  },
  'gst-calculator': {
    title: 'GST Calculator',
    desc: 'Calculate Goods and Services Tax (GST) for trade transactions. Estimate tax inclusive and exclusive parameters instantly for standard slabs (5%, 12%, 18%, 28%).',
    features: [
      { name: 'Dual Calculator Mode', detail: 'Toggle between adding tax (GST Exclusive) or subtracting tax (GST Inclusive) easily.' },
      { name: 'Full CGST / SGST Breakup', detail: 'View the standard 50-50 division of Central and State tax shares for transaction accounts.' }
    ],
    faqs: [
      { q: 'What is GST?', a: 'GST (Goods and Services Tax) is an indirect tax applied in India on the supply of goods and services.' }
    ]
  },
  'sip-calculator': {
    title: 'SIP Calculator',
    desc: 'Calculate the compound growth of Systematic Investment Plans (SIP) in mutual funds. Estimate interest maturity wealth values locally.',
    features: [
      { name: 'Precise Interest Formulas', detail: 'Uses standard compounding formulas to estimate future values based on annual returns.' },
      { name: 'Est. Wealth Gains', detail: 'View total invested value compared to interest returns for visual growth comparison.' }
    ],
    faqs: [
      { q: 'What is a SIP?', a: 'SIP (Systematic Investment Plan) is a method to invest a fixed sum regularly into mutual funds, taking advantage of compounding interest.' }
    ]
  },
  'love-calculator': {
    title: 'Love Calculator',
    desc: 'Calculate relationship compatibility index between partners using fun name matching algorithms. Generates unique advice and share details.',
    features: [
      { name: 'Fun Compatibility Logic', detail: 'Processes name letter hashes to calculate match percentages and specific relationship quotes.' },
      { name: 'Instant Share Results', detail: 'Allows sharing your compatibility score with your partner or on social media using Web Share APIs.' }
    ],
    faqs: [
      { q: 'How is the score calculated?', a: 'The tool uses name character hashes to generate a deterministic, positive, and fun percentage compatibility score.' }
    ]
  },
  'birthday-countdown': {
    title: 'Birthday Countdown',
    desc: 'Set a real-time countdown timer to track days, hours, and seconds left until your next birthday milestone.',
    features: [
      { name: 'Real-Time Ticking Timer', detail: 'Updates every second to show precisely how much time is left until your birthday celebration.' },
      { name: 'Interactive Age Info', detail: 'Calculates your current age and details the age milestone you will reach on your next birthday.' }
    ],
    faqs: [
      { q: 'How does it work?', a: 'Select your birth date. The tool calculates your next birthday based on current year/month/days, and runs a countdown timer.' }
    ]
  },
  'seo-suite': {
    title: 'SEO Tools Suite',
    desc: 'Generate XML sitemaps, robots.txt directives, and prepare header meta tags to optimize website indexation and search visibility.',
    features: [
      { name: 'XML Sitemap Builder', detail: 'Create structured XML maps containing URL priorities, lastmod dates, and change frequencies.' },
      { name: 'Robots.txt Builder', detail: 'Create Allow/Disallow indexing rules for specific search engine web crawlers.' }
    ],
    faqs: [
      { q: 'What is a Sitemap?', a: 'A sitemap is an XML file that lists URLs for a site, allowing search engines to crawl the site more intelligently.' }
    ]
  },
  'ai-suite': {
    title: 'AI Utilities Suite',
    desc: 'Access generative content helpers to write professional paragraphs, build creative stories, and find name meaning personality traits.',
    features: [
      { name: 'AI Writer Templates', detail: 'Generate articles or casual paragraphs based on custom keywords and tone selections.' },
      { name: 'Story Genre Options', detail: 'Create fantasy, sci-fi, and mystery story drafts based on custom premise prompts.' }
    ],
    faqs: [
      { q: 'Are these tools private?', a: 'Yes! The templates and algorithms execute entirely client-side. No content or text prompt is sent to external servers.' }
    ]
  }
};

const enrichContent = (toolKey, baseContent) => {
  const isBgRemover = toolKey === 'bg-remover';
  
  // Custom generated multi-paragraph long desc (approx 350 words)
  const longOverview = isBgRemover 
    ? `The AI Background Remover is a state-of-the-art utility designed for candidates, photographers, and developers to isolate subjects from their background images in real-time. Modern government application portals, including UPSC, SSC, banking, state PSC, and railway boards, enforce strict instructions for photo uploads. Frequently, candidates are rejected due to busy, colored, or incorrect backgrounds. Our tools help solve this issue with unmatched simplicity. Operating completely client-side, the AI processes portrait photographs, signature documents, and other image assets locally without utilizing external cloud rendering or intermediate servers. Under the hood, the system initiates advanced deep learning semantic segmentation models. These models identify primary subjects (people, signatures, icons), calculate boundary transparency channels, and remove complex, cluttered backgrounds instantly. This gives you a high-definition transparent PNG file in seconds. Since the software executes entirely in your browser sandbox, your personal documents, certificates, and face files remain completely confidential, private, and secure.`
    : `The ${baseContent.title} represents a highly optimized, client-side digital utility engineered specifically to meet the rigid file specifications of official recruitment, academic, and business portals. Often, applicants struggle with complex formatting rules, strict file sizes, and specific layout orientations required by government forms. This utility simplifies those workflows, allowing you to crop, resize, convert, calculate, and format documents in real-time. By processing your operations entirely within the safety of your web browser sandbox using modern client-side technologies, this tool eliminates the risk of data leaks and security breaches. No files are uploaded to servers, and no background tracking takes place. Designed with simplicity, speed, and visually premium design guidelines in mind, this tool ensures your file preparations are compliant, professional, and completed within seconds, keeping you ahead of application timelines.`;

  // Dynamic detailed tutorial guide (approx 350 words)
  const detailedTutorial = isBgRemover
    ? [
        "Select your portrait or signature photo. Click the central drag-and-drop region or drag a file directly from your local storage directory. We support PNG, JPEG, JPG, and WebP image formats up to 10MB.",
        "On the first usage, the browser will pull a lightweight AI model (approximately 2.5MB to 5MB) into your local browser cache database. This model file is stored permanently inside your local system storage so that consecutive background removals occur instantly.",
        "Click the prominent 'Remove Background' button. The internal WebAssembly orchestration engine will start. You will see a live progress bar representing the model parsing the pixel layout, classifying coordinates, and separating the main subject from the background.",
        "Compare the original and background-free images side-by-side. The result box features a checkered canvas, indicating transparent alpha channels. If the background removal is complete, click 'Download PNG' to save your transparent image.",
        "For passport photo creations, you can now upload this transparent PNG into our Passport Photo Maker to overlay solid red, blue, or white backgrounds according to official department instructions."
      ]
    : [
        `Access the utility interface and prepare the document or input data you need to process. Make sure your file is not password locked or corrupted before importing it.`,
        `Drag and drop your file into the designated active field, or input the specific values (such as cutoff dates, basic salary tiers, or custom margins) in the interactive configuration controls.`,
        `Adjust the provided settings, quality sliders, crop boundaries, or template selections. Our live preview module dynamically recalculates changes and displays estimated outcomes in real-time.`,
        `Click the main processing action button to trigger the browser-based execution script. This script completes all rendering, calculations, or compression locally using your device's memory.`,
        `Verify the generated preview for layout accuracy and quality, then click the download button to save the final formatted file directly to your downloads folder.`
      ];

  // Dynamic Technical Deep Dive (approx 350 words)
  const technicalDeepDiveText = isBgRemover
    ? `This tool utilizes WebAssembly (WASM) and ONNX Runtime Web to execute deep learning models directly in the user's browser threads. Traditionally, background removal required heavy server-side GPU instances, which raised serious privacy concerns and cost issues. Our setup loads a quantized semantic segmentation model trained to isolate human and foreground features with sub-pixel boundary accuracy. The image is drawn onto an offscreen HTML5 canvas element, resized to match the neural network input size, and converted into normalized tensor arrays. The ONNX model processes these tensors locally, generating an alpha transparency mask. This mask is then scaled back to the image's original dimensions and combined with the source image pixels via the canvas context. Because the calculations run locally, your network bandwidth is conserved, and your photos never travel across the internet, ensuring 100% security for sensitive identification cards and personal scans.`
    : `Under the hood, this utility leverages modern client-side APIs and libraries (such as PDF.js, PDF-lib, SheetJS, and custom Canvas rendering contexts) to process digital files entirely in the client's thread. When you import a file, the browser parses the file structure into memory arrays. For PDF tools, pages are parsed, decrypted, or restructured inside the browser's sandbox environment. For image utilities, raw pixel arrays are accessed via WebGL or 2D canvas interfaces, allowing for compression, format conversions (like PNG to JPG), and aspect ratio cropping. For calculators, local JavaScript timezone and mathematical algorithms execute instantly without waiting for network responses. This serverless architecture ensures that no user documents are uploaded to external databases, providing complete protection against data mining, while eliminating server queues to ensure near-instantaneous page response speeds.`;

  // Dynamic Use Cases (approx 300 words)
  const useCasesList = isBgRemover
    ? [
        { title: "Official Passport Photos", detail: "Quickly remove cluttered backgrounds from home portraits and replace them with standard white or blue backdrops using our suite to match SSC, UPSC, and passport specifications." },
        { title: "Digital Signature Overlay", detail: "Isolate your handwritten signature scans from lined paper, turning them into clean transparent signature stamps for e-signing PDFs, application forms, and letters." },
        { title: "E-Commerce Product Images", detail: "Perfect for online sellers to instantly clean product photos, removing backgrounds to fit white catalog backgrounds for Amazon, Shopify, or local portals." },
        { title: "Professional Avatars", detail: "Create clean, professional profile photos for LinkedIn, GitHub, or resumes, focusing attention strictly on your face with modern, distract-free backgrounds." }
      ]
    : [
        { title: "Government Exam Applications", detail: "Prepare signatures, certificates, and passport photos to fit UPSC, SSC, banking, and state-level recruitment portal guidelines." },
        { title: "Academic Document Preparation", detail: "Merge study guides, crop scanned assignments, and convert certificates to format-compliant PDF files for school and college portals." },
        { title: "Professional Career Building", detail: "Develop ATS-friendly resumes, calculate precise experience details, and sign digital documents securely for job hunting." },
        { title: "Daily Office & Utility Work", detail: "Quickly view Excel sheets, protect PDF bank statements, calculate salaries, and convert documents without installing heavy software suites." }
      ];

  // Dynamic Pro Tips (approx 200 words)
  const proTipsList = isBgRemover
    ? [
        "Ensure high contrast between the subject and the background for the cleanest edge isolation.",
        "Avoid busy or highly detailed backgrounds with similar colors to your hair or clothing.",
        "If the model fails to load, clear your browser cache and refresh to download the cached model file again.",
        "Ensure your room is well-lit to prevent blurry outlines around the shoulders and head of the subject."
      ]
    : [
        "Double-check your portal guidelines before downloading files to ensure correct dimensions and KB limits.",
        "Keep quality sliders above 80% to maintain clean, readable text on compressed PDFs or converted JPGs.",
        "When drawing signatures on mobile devices, use landscape mode for maximum canvas area and drawing control.",
        "Ensure your browser has hardware acceleration enabled to maximize WebAssembly and Canvas processing speeds."
      ];

  // Dynamic Extended FAQs (approx 300 words)
  const extraFaqs = [
    { q: "Is this tool completely free to use?", a: "Yes, 100% free. There are no premium subscription tiers, hidden usage limits, watermarks, or account registration requirements. You can process as many files as you need." },
    { q: "Does this utility work offline?", a: "Yes. Once the web application is loaded in your browser, the local scripts, WebAssembly engines, and styling assets are cached. You can disconnect from the internet and continue using the tool to process files securely." },
    { q: "Which browsers are recommended for optimal performance?", a: "We recommend using modern browsers such as Google Chrome, Mozilla Firefox, Microsoft Edge, or Apple Safari. Ensure your browser is updated to the latest version to support WebAssembly and high-performance HTML5 Canvas APIs." }
  ];

  return {
    title: baseContent.title,
    desc: baseContent.desc,
    longOverview,
    steps: detailedTutorial,
    features: baseContent.features,
    technicalDeepDive: technicalDeepDiveText,
    useCases: useCasesList,
    proTips: proTipsList,
    faqs: [...baseContent.faqs, ...extraFaqs]
  };
};

const ToolContent = ({ toolKey }) => {
  const baseContent = toolContentDb[toolKey];
  const [activeTab, setActiveTab] = useState('guide');

  if (!baseContent) return null;

  const content = enrichContent(toolKey, baseContent);

  const tabList = [
    { id: 'guide', label: '📖 Guide & Steps', icon: BookOpen },
    { id: 'tech', label: '⚙️ Technical Engine', icon: Cpu },
    { id: 'usecases', label: '🚀 Use Cases & Tips', icon: Sparkles },
    { id: 'faq', label: '💬 Detailed FAQ', icon: HelpCircle },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mt-20 max-w-6xl mx-auto px-4 relative z-10 select-text"
    >
      {/* Divider */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />

      {/* Title Header */}
      <div className="text-left mb-8">
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-3">
          <Info size={14} className="text-primary animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-primary">Comprehensive Resource Hub</span>
        </div>
        <Title level={2} className="!text-white !font-black !mb-3 tracking-tight uppercase">
          {content.title} Knowledge Base
        </Title>
        <Paragraph className="!text-gray-400 text-sm max-w-3xl leading-relaxed">
          Read our in-depth documentation, technical explanations, and FAQs to understand how our secure, on-device tool helps you format files perfectly.
        </Paragraph>
      </div>

      {/* Interactive Tabs Menu */}
      <div className="flex flex-wrap gap-2 mb-8 bg-white/[0.02] border border-white/5 p-2 rounded-[2rem] backdrop-blur-md">
        {tabList.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                isActive 
                  ? 'bg-primary text-black shadow-[0_0_20px_rgba(0,242,255,0.35)]' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={14} className={isActive ? 'text-black' : 'text-primary'} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Tab Content Panel */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === 'guide' && (
            <motion.div
              key="guide"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left"
            >
              <div className="lg:col-span-2 space-y-6">
                <Card className="glass-card !bg-white/[0.01] !border-white/5 !p-6 rounded-[2.5rem]">
                  <Title level={4} className="!text-white !mb-4 flex items-center gap-3 uppercase tracking-widest text-xs">
                    <Info size={16} className="text-primary" /> Overview
                  </Title>
                  <Paragraph className="!text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                    {content.longOverview}
                  </Paragraph>
                </Card>

                <Card className="glass-card !bg-white/[0.01] !border-white/5 !p-6 rounded-[2.5rem]">
                  <Title level={4} className="!text-white !mb-6 flex items-center gap-3 uppercase tracking-widest text-xs">
                    <Settings size={18} className="text-secondary" /> Detailed Step-by-Step Instructions
                  </Title>
                  <div className="space-y-4">
                    {content.steps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded-full bg-secondary/15 border border-secondary/35 text-secondary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <Text className="text-gray-300 text-sm leading-relaxed">{step}</Text>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Right Side: Key Features Card */}
              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-br from-[#1b103c]/60 to-[#0c0721]/90 rounded-[2.5rem] border border-[#7000ff]/20 shadow-2xl backdrop-blur-md">
                  <Title level={4} className="!text-white !mb-6 flex items-center gap-3 uppercase tracking-widest text-xs">
                    <CheckCircle2 size={18} className="text-primary animate-bounce" /> Key Benefits
                  </Title>
                  <div className="space-y-6">
                    {content.features.map((feat, idx) => (
                      <div key={idx} className="space-y-1">
                        <Text className="text-white font-bold text-sm block flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" /> {feat.name}
                        </Text>
                        <Text className="text-gray-400 text-xs leading-relaxed block pl-3.5">
                          {feat.detail}
                        </Text>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[2.5rem] flex items-center gap-4">
                  <ShieldCheck size={36} className="text-[#00f2ff] shrink-0 animate-pulse" />
                  <div>
                    <Text className="text-white font-bold block text-sm">On-Device Privacy</Text>
                    <Text className="text-gray-400 text-xs leading-relaxed block">
                      Operations run completely locally in your client. Your sensitive inputs are never transmitted or saved.
                    </Text>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'tech' && (
            <motion.div
              key="tech"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className="text-left space-y-6"
            >
              <Card className="glass-card !bg-white/[0.01] !border-white/5 !p-8 rounded-[2.5rem]">
                <Title level={4} className="!text-white !mb-4 flex items-center gap-3 uppercase tracking-widest text-xs">
                  <Cpu size={18} className="text-primary" /> Technical Architecture & Client Processing
                </Title>
                <Paragraph className="!text-gray-300 text-sm leading-relaxed">
                  {content.technicalDeepDive}
                </Paragraph>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-card !bg-white/[0.01] !border-white/5 !p-6 rounded-[2rem] flex flex-col justify-between">
                  <div>
                    <Title level={5} className="!text-white !mb-3 uppercase tracking-widest text-xs text-secondary">
                      Zero Server Calls
                    </Title>
                    <Paragraph className="!text-gray-400 text-xs leading-relaxed">
                      Most online conversion, compression, and editing portals parse details on virtual machines. This incurs network latency and uploads your documents to third parties. Antigravity core architectures avoid this entirely, executing tasks locally to ensure data security and instant results.
                    </Paragraph>
                  </div>
                </Card>

                <Card className="glass-card !bg-white/[0.01] !border-white/5 !p-6 rounded-[2rem] flex flex-col justify-between">
                  <div>
                    <Title level={5} className="!text-white !mb-3 uppercase tracking-widest text-xs text-primary">
                      Performance & WebAssembly
                    </Title>
                    <Paragraph className="!text-gray-400 text-xs leading-relaxed">
                      Using WebAssembly (WASM), we compile complex C++/Rust libraries to secure binaries. These run inside the browser thread at near-native CPU speeds. This makes it possible to remove backgrounds, compress PDFs, and scan layouts in real-time on desktop and mobile browsers.
                    </Paragraph>
                  </div>
                </Card>
              </div>
            </motion.div>
          )}

          {activeTab === 'usecases' && (
            <motion.div
              key="usecases"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className="text-left grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Left Use Cases */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="glass-card !bg-white/[0.01] !border-white/5 !p-8 rounded-[2.5rem]">
                  <Title level={4} className="!text-white !mb-6 flex items-center gap-3 uppercase tracking-widest text-xs">
                    <Sparkles size={18} className="text-secondary" /> Common Use Cases & Applications
                  </Title>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {content.useCases.map((useCase, idx) => (
                      <div key={idx} className="p-5 bg-white/[0.01] border border-white/5 rounded-2xl space-y-2">
                        <Title level={5} className="!text-white !mb-0 flex items-center gap-2 text-sm font-bold">
                          <Check size={14} className="text-primary" /> {useCase.title}
                        </Title>
                        <Paragraph className="!text-gray-400 text-xs leading-relaxed !m-0">
                          {useCase.detail}
                        </Paragraph>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Right Pro Tips */}
              <div>
                <Card className="glass-card !bg-gradient-to-br from-[#1b103c]/60 to-[#0c0721]/90 !border-[#7000ff]/20 !p-6 rounded-[2.5rem]">
                  <Title level={4} className="!text-white !mb-6 flex items-center gap-3 uppercase tracking-widest text-xs">
                    <Lightbulb size={18} className="text-[#ffb700] animate-bounce" /> Pro Tips for Best Results
                  </Title>
                  <div className="space-y-4">
                    {content.proTips.map((tip, idx) => (
                      <div key={idx} className="flex gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                        <Text className="text-gray-300 text-xs leading-relaxed">{tip}</Text>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </motion.div>
          )}

          {activeTab === 'faq' && (
            <motion.div
              key="faq"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className="text-left space-y-6"
            >
              <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/20 px-4 py-1.5 rounded-full">
                <HelpCircle size={14} className="text-secondary animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Common Inquiries</span>
              </div>
              
              <Collapse 
                accordion 
                expandIconPosition="end"
                className="custom-faq-collapse !bg-transparent !border-none"
              >
                {content.faqs.map((faq, idx) => (
                  <Panel 
                    header={<span className="text-white font-bold text-base md:text-lg">{faq.q}</span>} 
                    key={idx}
                    className="!mb-4 !bg-white/[0.02] !border !border-white/5 !rounded-2xl overflow-hidden hover:!border-primary/20 transition-all duration-300"
                  >
                    <Paragraph className="!text-gray-300 leading-relaxed text-sm md:text-base !m-0 !pt-2">
                      {faq.a}
                    </Paragraph>
                  </Panel>
                ))}
              </Collapse>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ToolContent;
