import React from 'react';
import { Card, Typography, Collapse, Tag } from 'antd';
import { HelpCircle, Info, ShieldCheck, CheckCircle2, FileText, Settings } from 'lucide-react';

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
  'image-resizer': {
    title: 'Image Resizer Pro',
    desc: 'Resize, compress, and re-format photos to meet strict document guidelines for government portals (like SSC, UPSC, IBPS). Control width, height, aspect ratio, and maximum file size (in KB) effortlessly.',
    steps: [
      'Select and upload the image you want to resize.',
      'Select an exam photo preset (like Passport Photo, Signature) or enter custom width and height.',
      'Toggle the aspect ratio lock to prevent image stretching or distortion.',
      'Choose your preferred target format (JPEG, PNG, or WebP) and adjust the quality slider to control KB size.',
      'Click "Resize Image" and download the optimized output file.'
    ],
    features: [
      { name: 'Target KB Compression', detail: 'Set exact limits (e.g., under 20KB or 50KB) to satisfy rigid recruitment portal rules.' },
      { name: 'Exam Presets', detail: 'Pre-loaded dimensions for UPSC, SSC, IBPS, and state PSC passport and signature uploads.' },
      { name: 'Format Converter', detail: 'Convert images on-the-fly to JPEG, PNG, or WebP to match submission requirements.' },
      { name: 'Aspect Ratio Guard', detail: 'Lock proportions to keep your face and text details looking natural and professional.' }
    ],
    faqs: [
      { q: 'How do I compress an image to exactly under 20 KB?', a: 'Upload your image, choose JPEG as the output format, and slide the quality slider down (e.g. to 70% or 80%). The live preview will display the estimated output file size. Adjust the slider until it fits your target size limit.' },
      { q: 'Why is it important to lock the aspect ratio?', a: 'Locking the aspect ratio ensures that when you change the width, the height adjusts proportionally. This prevents your photos from appearing squished or stretched, which can lead to application rejection.' },
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
    title: 'PDF Merger Studio',
    desc: 'Combine multiple PDF files, certificates, and scanned notes into a single cohesive document. Arrange, re-order, and merge pages securely without uploading files to any remote server.',
    steps: [
      'Select and upload multiple PDF files from your device.',
      'Drag and drop the file list items to re-order the document sequence.',
      'Review file details including page counts and file sizes.',
      'Click the "Merge PDFs" button to compile them into a single file.',
      'Click the download button to save the unified PDF.'
    ],
    features: [
      { name: 'Intuitive Drag & Drop', detail: 'Re-arrange the sequence of documents visually to ensure pages appear in the correct order.' },
      { name: 'Fast Compilation', detail: 'Combines large documents in seconds using client-side JavaScript libraries.' },
      { name: 'No Size Limits', detail: 'Merge as many files as you need since processing relies on local hardware instead of limited server bandwidth.' },
      { name: 'Preserves PDF Metadata', detail: 'Retains original text formatting, hyperlinks, and page resolutions in the merged output.' }
    ],
    faqs: [
      { q: 'Is there a limit to how many files I can merge?', a: 'No, there are no hard limits. You can merge two or twenty files. However, merging very large files on low-end devices might take a few moments depending on your browser memory.' },
      { q: 'Are my academic certificates secure when merging?', a: 'Yes. The merging process takes place locally inside your browser. Your sensitive educational certificates and personal documents are never transmitted over the internet.' },
      { q: 'Can I select specific pages from different files to merge?', a: 'Currently, the tool merges full PDF documents together. To split or extract specific pages first, you can use our PDF Editor tool, then merge them.' }
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
    title: 'JPG to PDF Document Converter',
    desc: 'Convert photographs, handwritten assignments, and ID cards into standard PDF documents. Easily compile scanned images into single multi-page PDF documents locally in your browser.',
    steps: [
      'Upload one or multiple images (JPG, PNG, WebP) using the file input.',
      'Drag and drop the uploaded image cards to re-arrange the page sequence.',
      'Choose paper size presets (A4, Letter) and page orientation (Portrait/Landscape).',
      'Set desired page margin settings (No Margin, Thin, Normal).',
      'Click "Convert to PDF" and download the generated document.'
    ],
    features: [
      { name: 'Multi-Image Batching', detail: 'Compile dozens of images into a single multi-page PDF file with one click.' },
      { name: 'Page Layout Presets', detail: 'Format your final PDF to fit standard A4 or Letter sizes with custom margins.' },
      { name: 'Image Compression Control', detail: 'Adjust output quality to keep the compiled PDF size within upload limits of exam forms.' },
      { name: 'Secure Local Conversion', detail: 'All image rendering and PDF compiling happen client-side in the browser. Zero upload risk.' }
    ],
    faqs: [
      { q: 'Can I convert PNG images as well?', a: 'Yes! The tool supports JPG, JPEG, PNG, and WebP image formats, converting them all into standard PDF pages.' },
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
  }
};

const ToolContent = ({ toolKey }) => {
  const content = toolContentDb[toolKey];

  if (!content) return null;

  return (
    <div className="mt-20 max-w-6xl mx-auto px-4 relative z-10 select-text">
      {/* Divider */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />

      {/* Main Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
        
        {/* Description & Guide */}
        <div className="lg:col-span-2 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-2">
            <Info size={14} className="text-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Complete Guide</span>
          </div>
          
          <Title level={2} className="!text-white !font-black !mb-4 tracking-tight uppercase">
            About {content.title}
          </Title>
          
          <Paragraph className="!text-gray-400 text-base leading-relaxed">
            {content.desc}
          </Paragraph>

          <Card className="glass-card !bg-white/[0.01] !border-white/5 !p-6 rounded-[2rem]">
            <Title level={4} className="!text-white !mb-6 flex items-center gap-3 uppercase tracking-widest text-xs">
              <Settings size={18} className="text-secondary" /> How to use this tool
            </Title>
            <div className="space-y-4">
              {content.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-secondary/15 border border-secondary/35 text-secondary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <Text className="text-gray-400 text-sm leading-relaxed">{step}</Text>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Features Column */}
        <div className="space-y-6 text-left">
          <div className="p-6 bg-gradient-to-br from-[#1b103c]/60 to-[#0c0721]/90 rounded-[2.5rem] border border-[#7000ff]/20 shadow-2xl backdrop-blur-md">
            <Title level={4} className="!text-white !mb-6 flex items-center gap-3 uppercase tracking-widest text-xs">
              <CheckCircle2 size={18} className="text-primary" /> Key Features
            </Title>
            <div className="space-y-6">
              {content.features.map((feat, idx) => (
                <div key={idx} className="space-y-1">
                  <Text className="text-white font-bold text-sm block flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" /> {feat.name}
                  </Text>
                  <Text className="text-gray-500 text-xs leading-relaxed block pl-3.5">
                    {feat.detail}
                  </Text>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[2.5rem] flex items-center gap-4">
            <ShieldCheck size={36} className="text-[#00f2ff] shrink-0" />
            <div>
              <Text className="text-white font-bold block text-sm">Privacy Guaranteed</Text>
              <Text className="text-gray-500 text-xs leading-relaxed block">
                This tool runs entirely in your web browser. No files or inputs are sent to our servers.
              </Text>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="text-left mb-16">
        <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/20 px-4 py-1.5 rounded-full mb-4">
          <HelpCircle size={14} className="text-secondary" />
          <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Got Questions?</span>
        </div>
        
        <Title level={2} className="!text-white !font-black !mb-8 tracking-tight uppercase">
          Frequently Asked Questions
        </Title>

        <Collapse 
          accordion 
          expandIconPosition="end"
          className="custom-faq-collapse !bg-transparent !border-none"
        >
          {content.faqs.map((faq, idx) => (
            <Panel 
              header={<span className="text-white font-bold text-base md:text-lg">{faq.q}</span>} 
              key={idx}
              className="!mb-4 !bg-white/[0.02] !border !border-white/5 !rounded-2xl overflow-hidden"
            >
              <Paragraph className="!text-gray-400 leading-relaxed text-sm md:text-base !m-0 !pt-2">
                {faq.a}
              </Paragraph>
            </Panel>
          ))}
        </Collapse>
      </div>
    </div>
  );
};

export default ToolContent;
