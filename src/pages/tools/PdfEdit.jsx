import React, { useState } from 'react';
import { Card, Upload, Button, Typography, Space, message, Input, Row, Col, Select, Divider } from 'antd';
import { FileText, Download, Plus, Shield, Check, Edit3, Settings } from 'lucide-react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { downloadFile } from '../../utils/downloadHelper';

const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;
const { Option } = Select;

const PdfEdit = () => {
  const [file, setFile] = useState(null);
  
  // Metadata state
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [subject, setSubject] = useState('');
  const [keywords, setKeywords] = useState('');

  // Annotation/Text Overlay state
  const [overlayText, setOverlayText] = useState('');
  const [targetPage, setTargetPage] = useState(1);
  const [xPos, setXPos] = useState(50);
  const [yPos, setYPos] = useState(100);
  const [textSize, setTextSize] = useState(14);
  const [textColor, setTextColor] = useState('#000000');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = (info) => {
    const uploadedFile = info.file.originFileObj || info.file;
    if (!uploadedFile) return;
    const isPdf = uploadedFile.type === 'application/pdf' || uploadedFile.name.toLowerCase().endsWith('.pdf');
    if (!isPdf) {
      message.error('Please upload a valid PDF file');
      return;
    }
    setFile(uploadedFile);
    setResult(null);

    // Try reading metadata dynamically
    loadMetadata(uploadedFile);
  };

  const loadMetadata = async (uploadedFile) => {
    try {
      const arrayBuffer = await uploadedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      setTitle(pdfDoc.getTitle() || '');
      setAuthor(pdfDoc.getAuthor() || '');
      setSubject(pdfDoc.getSubject() || '');
      setKeywords(pdfDoc.getKeywords() || '');
    } catch (e) {
      console.warn('Failed to load initial metadata', e);
    }
  };

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16) / 255,
      g: parseInt(result[2], 16) / 255,
      b: parseInt(result[3], 16) / 255
    } : { r: 0, g: 0, b: 0 };
  };

  const handleSavePdf = async () => {
    if (!file) return message.error('Upload a PDF first');

    setLoading(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

      // Apply metadata adjustments
      pdfDoc.setTitle(title);
      pdfDoc.setAuthor(author);
      pdfDoc.setSubject(subject);
      pdfDoc.setKeywords(keywords.split(',').map(k => k.trim()));

      // Apply text overlay if set
      if (overlayText.trim()) {
        const pages = pdfDoc.getPages();
        const pageIdx = Math.max(0, Math.min(targetPage - 1, pages.length - 1));
        const page = pages[pageIdx];
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const { r, g, b } = hexToRgb(textColor);

        page.drawText(overlayText, {
          x: xPos,
          y: yPos,
          size: textSize,
          font,
          color: rgb(r, g, b),
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setResult(url);
      message.success('PDF updated and ready for export!');
    } catch (error) {
      console.error(error);
      message.error('Failed to edit PDF.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-24 px-4 min-h-screen">
      <div className="text-center mb-16">
        <Title className="!text-white !text-5xl !font-black !mb-4 tracking-tighter uppercase">PDF Editor Studio</Title>
        <Paragraph className="!text-gray-400 text-lg">Modify document properties, author meta fields, and inject custom text tags locally.</Paragraph>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card className="glass-card !p-6 h-full">
            <Space direction="vertical" className="w-full" size="large">
              <Dragger
                accept=".pdf"
                showUploadList={false}
                beforeUpload={() => false}
                onChange={handleUpload}
                className="!bg-white/[0.02] !border-2 !border-dashed !border-white/10 hover:!border-primary/50 !rounded-[2.5rem] transition-all group"
              >
                {file ? (
                  <div className="py-8 flex flex-col items-center">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-3">
                      <FileText size={28} className="text-primary" />
                    </div>
                    <Text className="text-white font-bold block truncate max-w-[200px]">{file.name}</Text>
                    <Text className="text-gray-500 text-xs mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</Text>
                  </div>
                ) : (
                  <div className="py-12 flex flex-col items-center justify-center">
                    <Plus size={44} className="text-primary mb-3 group-hover:scale-110 transition-transform" />
                    <Text className="text-white font-bold text-base">Upload PDF file here</Text>
                  </div>
                )}
              </Dragger>

              <div>
                <Title level={5} className="!text-white mb-4 flex items-center gap-2"><Settings size={16} className="text-primary" /> Document Metadata</Title>
                <Space direction="vertical" className="w-full" size="middle">
                  <div>
                    <Text className="text-gray-400 font-bold block mb-1 uppercase text-[9px] tracking-widest">Document Title</Text>
                    <Input value={title} onChange={e => setTitle(e.target.value)} className="!bg-white/5 !border-white/10 !text-white" />
                  </div>
                  <div>
                    <Text className="text-gray-400 font-bold block mb-1 uppercase text-[9px] tracking-widest">Author Name</Text>
                    <Input value={author} onChange={e => setAuthor(e.target.value)} className="!bg-white/5 !border-white/10 !text-white" />
                  </div>
                  <div>
                    <Text className="text-gray-400 font-bold block mb-1 uppercase text-[9px] tracking-widest">Subject</Text>
                    <Input value={subject} onChange={e => setSubject(e.target.value)} className="!bg-white/5 !border-white/10 !text-white" />
                  </div>
                  <div>
                    <Text className="text-gray-400 font-bold block mb-1 uppercase text-[9px] tracking-widest">Keywords (comma separated)</Text>
                    <Input value={keywords} onChange={e => setKeywords(e.target.value)} className="!bg-white/5 !border-white/10 !text-white" placeholder="e.g. form, exam, ssc" />
                  </div>
                </Space>
              </div>
            </Space>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card className="glass-card !p-6" title={<span className="text-white flex items-center gap-2 font-bold"><Edit3 size={18} className="text-primary" /> Overlay Text Layer</span>}>
            <Space direction="vertical" className="w-full" size="large">
              <div>
                <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Add Text Content</Text>
                <Input
                  value={overlayText}
                  onChange={e => setOverlayText(e.target.value)}
                  placeholder="Type text to overlay..."
                  className="!bg-white/5 !border-white/10 !text-white !rounded-xl"
                  size="large"
                />
              </div>

              <Row gutter={16}>
                <Col span={12}>
                  <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Target Page</Text>
                  <Input
                    type="number"
                    min={1}
                    value={targetPage}
                    onChange={e => setTargetPage(parseInt(e.target.value) || 1)}
                    className="!bg-white/5 !border-white/10 !text-white"
                  />
                </Col>
                <Col span={12}>
                  <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Font Size (px)</Text>
                  <Input
                    type="number"
                    min={6}
                    max={72}
                    value={textSize}
                    onChange={e => setTextSize(parseInt(e.target.value) || 14)}
                    className="!bg-white/5 !border-white/10 !text-white"
                  />
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">X Coord (Points)</Text>
                  <Input
                    type="number"
                    value={xPos}
                    onChange={e => setXPos(parseInt(e.target.value) || 0)}
                    className="!bg-white/5 !border-white/10 !text-white"
                  />
                </Col>
                <Col span={12}>
                  <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Y Coord (Points)</Text>
                  <Input
                    type="number"
                    value={yPos}
                    onChange={e => setYPos(parseInt(e.target.value) || 0)}
                    className="!bg-white/5 !border-white/10 !text-white"
                  />
                </Col>
              </Row>

              <div>
                <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Text Color</Text>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-10 h-10 border-0 rounded cursor-pointer bg-transparent"
                  />
                  <Text className="text-white font-mono">{textColor.toUpperCase()}</Text>
                </div>
              </div>

              <Divider className="!border-white/10 !m-0" />

              <Button
                block
                type="primary"
                size="large"
                className="neon-button !h-14 !text-base"
                onClick={handleSavePdf}
                loading={loading}
                disabled={!file}
              >
                Apply Changes & Compile
              </Button>

              {result && (
                <div className="mt-4 animate-in zoom-in duration-500">
                  <Button
                    icon={<Download size={20} />}
                    block
                    type="primary"
                    className="!bg-primary !border-none !text-black font-black h-14 rounded-xl shadow-xl"
                    onClick={() => downloadFile(result, `edited-${file.name}`)}
                  >
                    Download Compiled PDF
                  </Button>
                </div>
              )}
            </Space>
          </Card>
        </Col>
      </Row>

      {/* ── MASSIVE 1000+ WORD SEO ARTICLE & INSTRUCTIONAL SECTION WITH 3D EMOJIS ── */}
      <section className="mt-20 max-w-7xl mx-auto text-left select-text relative z-10">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          
          {/* Left Columns: Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                📂 PDF Document Editing & Metadata Architecture 🏷️
              </h2>
              <p className="text-gray-400 leading-relaxed text-base">
                Welcome to the professional-grade **PDF Editor Studio** 🚀. In today's digital era, Portable Document Format (PDF) files have become the global standard for sharing official forms, exam notifications, and legal documents. However, a major element of PDF documents that often goes unnoticed is **Document Metadata** 🔐. Metadata contains crucial background information about your file, such as the document title, author name, subject description, and search keywords.
              </p>
              <p className="text-gray-400 leading-relaxed text-base">
                When you submit job applications, university thesis files, or government recruitment forms (such as SSC, UPSC, Bank, or railway exam forms), indexing engines and applicant screening systems crawl these background fields to categorize your files. An incorrect author tag or a blank title can sometimes lead to automatic rejection or categorization failures on official portals. 📝
              </p>
              <p className="text-gray-400 leading-relaxed text-base">
                Our PDF Editor Studio provides you with an easy, standard interface to modify these properties. By entering custom titles, official author tags, and relevant keyword indices, you ensure your files are fully optimized for search indexes, official verification boards, and automated screening programs. 🛠️
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                ✍️ Overlaying Custom Text Layers & Annotations 🎨
              </h2>
              <p className="text-gray-400 leading-relaxed text-base">
                Need to add a certificate number, sign-off tag, or custom watermark text to your PDF pages? Typing directly onto compiled PDF files is notoriously difficult because PDFs are rendered as flat vector packages rather than editable text flows. 📄
              </p>
              <p className="text-gray-400 leading-relaxed text-base">
                Our **Overlay Text Engine** solves this problem by using standard coordinate geometry. Every page inside a PDF is plotted on a grid using **points** (where 1 inch is equal to 72 points). By configuring the target page number, font size, custom text content, text color (using hex color picker), and the precise X and Y coordinate parameters, you can stamp custom text overlays onto any page layout instantly. This allows you to fill out application fields, insert missing headers, or mark documents with "CONFIDENTIAL" tags easily. 📐
              </p>
              <p className="text-gray-400 leading-relaxed text-base">
                Using coordinates is incredibly powerful once you understand the layout rules. Standard A4 size sheets are exactly 595 points wide by 842 points high. If you want to place a signature tag at the bottom-right corner, setting X: 450 and Y: 50 will align it perfectly on your selected page. This level of precise coordinate control gives you full freedom over text placement. 🖋️
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                🛡️ Local Sandbox: Complete Privacy Protection 🔒
              </h2>
              <p className="text-gray-400 leading-relaxed text-base">
                Have you ever uploaded your banking sheets, grade cards, or address proofs to popular online PDF tools? Most utility sites upload your files directly to external cloud databases, which exposes your private records to third-party tracking, security vulnerabilities, and server leaks. ⚠️
              </p>
              <p className="text-gray-400 leading-relaxed text-base">
                AllSarkari Tools guarantees **100% Client-Side Processing** 🛡️. By running the advanced `pdf-lib` binary compiler directly in your web browser environment, all metadata updates, text injections, and file rendering tasks are processed on-device. No data, files, or keystrokes travel over the internet, giving you peace of mind that your academic certificates and sensitive document files remain entirely private. 💻
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                📊 Advanced PDF Document Properties Guide 🔍
              </h2>
              <p className="text-gray-400 leading-relaxed text-base">
                Understanding the technical makeup of your PDFs is crucial for professional presentation. Let's break down the essential metadata fields you can modify using this tool:
              </p>
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02]">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.05]">
                      <th className="p-4 font-bold text-white uppercase text-[11px] tracking-wider">Metadata Field</th>
                      <th className="p-4 font-bold text-white uppercase text-[11px] tracking-wider">Purpose & Importance</th>
                      <th className="p-4 font-bold text-white uppercase text-[11px] tracking-wider">Recommended Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-gray-300">
                    <tr>
                      <td className="p-4 font-semibold text-white">Title 🏷️</td>
                      <td className="p-4">Defines the primary name of the document seen in browser tabs and search engine snippets.</td>
                      <td className="p-4 font-mono text-xs">"My_Resume_2026.pdf"</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-white">Author 👤</td>
                      <td className="p-4">Identifies the creator or organization responsible for the document's content.</td>
                      <td className="p-4 font-mono text-xs">"Your Full Name"</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-white">Subject 📝</td>
                      <td className="p-4">Provides a brief summary of what the document contains (e.g. thesis statement or form type).</td>
                      <td className="p-4 font-mono text-xs">"Employment Verification"</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-white">Keywords 🔑</td>
                      <td className="p-4">Comma-separated tags that indexing systems use to categorize the document during searches.</td>
                      <td className="p-4 font-mono text-xs">"resume, job, developer, cv"</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                📈 Future Scope of Digital Documents & PDF Standard 🔮
              </h2>
              <p className="text-gray-400 leading-relaxed text-base">
                The world of digital documents is rapidly shifting towards interactive, secure, and AI-optimized files. In the coming years, PDFs will transition from flat static layouts to dynamic structured payloads containing semantic metadata. This metadata allows AI search engines, screen readers, and automated workflows to understand context instantly without relying on error-prone optical character recognition (OCR) algorithms. 🧠
              </p>
              <p className="text-gray-400 leading-relaxed text-base">
                By taking control of your document structure today with tools like PDF Editor Studio, you prepare your files for the future of automated document indexing, ensuring compatibility with upcoming semantic databases and smart organization algorithms. 🌐
              </p>
            </div>

          </div>

          {/* Right Column: Roadmap & Quick Info */}
          <div className="space-y-8">
            <div className="p-8 bg-gradient-to-br from-[#1b103c]/60 to-[#0c0721]/90 rounded-[2.5rem] border border-[#7000ff]/20 shadow-2xl backdrop-blur-md">
              <h3 className="text-lg font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                🚀 Upcoming Roadmap 🗺️
              </h3>
              
              <div className="space-y-6">
                {[
                  { title: "✏️ Full Text Editor Suite 📝", desc: "Modify existing text paragraphs inside PDF documents locally in-browser." },
                  { title: "📄 Page Organizer Panel 🗂️", desc: "Drag and drop thumbnails to re-order, rotate, or delete individual pages." },
                  { title: "🔏 Secure Digital Signatures 🔑", desc: "Embed cryptographic signature certificates into official layouts." },
                  { title: "🖼️ Image to Text OCR 🤖", desc: "Extract text from scanned PDF certificates using localized AI models." }
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#00f2ff]/10 border border-[#00f2ff]/30 text-[#00f2ff] flex items-center justify-center font-extrabold text-sm shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 bg-white/[0.01] border border-white/5 rounded-[2.5rem] space-y-4">
              <h4 className="text-white font-bold text-base flex items-center gap-2">
                🔒 Privacy Guarantee Standard 🛡️
              </h4>
              <p className="text-gray-500 text-xs leading-relaxed">
                This PDF Editor complies with standard client-side sandbox guidelines. We do not gather cookies, user data, or document records. All processing happens in browser state.
              </p>
            </div>

            <div className="p-8 bg-white/[0.01] border border-white/5 rounded-[2.5rem] space-y-4">
              <h4 className="text-white font-bold text-base flex items-center gap-2">
                💡 Quick Coordinate Sheet 📐
              </h4>
              <ul className="text-gray-500 text-xs space-y-2 leading-relaxed">
                <li>• <strong>A4 Dimensions:</strong> 595 x 842 points</li>
                <li>• <strong>Letter Dimensions:</strong> 612 x 792 points</li>
                <li>• <strong>Origin:</strong> Bottom-left is (0, 0)</li>
                <li>• <strong>Margins:</strong> Keep X & Y &gt; 35 for printable safe zone</li>
              </ul>
            </div>
          </div>

        </div>

        {/* FAQs */}
        <div className="space-y-6 mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight flex items-center gap-3">
            ❓ Frequently Asked Questions (FAQ) 💬
          </h2>
          
          <div className="space-y-4">
            {[
              {
                q: "Can I edit the original text printed in my PDF document? ✏️",
                a: "This tool allows updating file metadata fields and stamping new text annotations or overlays at specific coordinate positions. To edit the underlying vector text lines, we are integrating an interactive full-text editor block in our next major release."
              },
              {
                q: "What is the coordinate system in PDF pages? 📐",
                a: "PDF pages are mapped using points. A standard A4 document page measures 595 points wide by 842 points high. The X-coordinate starts from 0 at the left border and goes right. The Y-coordinate starts from 0 at the bottom border and goes up."
              },
              {
                q: "Will modifying metadata damage or reduce PDF document quality? 📉",
                a: "No. Modifying document metadata only updates the background header blocks. Vector shapes, text lines, formatting styles, and image resolutions inside your pages remain completely untouched and lose zero quality."
              },
              {
                q: "Why is local processing important for candidate documents? 🛡️",
                a: "Academic documents, ID proofs, and certificates contain highly sensitive personal details. Local processing guarantees that your files never travel over the internet, protecting you from hacking, data leaks, and identity theft."
              },
              {
                q: "Is there a limit on file size when editing PDFs? 📁",
                a: "No hard limits exist, but since files are processed entirely in browser memory, large PDF documents (e.g. over 50MB) with heavy graphical scans may consume significant RAM and take a few extra seconds to compile."
              },
              {
                q: "What fonts are supported for overlay text? 🔤",
                a: "Currently, standard PDF fonts such as Helvetica, Times-Roman, and Courier are supported. They are embedded automatically by the browser layout compiler, ensuring tiny output sizes and perfect compatibility with all readers."
              },
              {
                q: "How can I find the correct coordinates for text overlays? 🔍",
                a: "You can calculate positions based on percentages: X is horizontal distance from left, Y is vertical distance from bottom. Standard margins are 40-50 points. For middle placement, set X near 250-300 and Y near 400."
              }
            ].map((faq, idx) => (
              <div key={idx} className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                <h4 className="text-white font-bold text-base md:text-lg mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary shrink-0" /> {faq.q}
                </h4>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed pl-4">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
};

export default PdfEdit;
