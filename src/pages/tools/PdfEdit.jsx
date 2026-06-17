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

      <div className="mt-12 flex items-start gap-4 p-8 glass-card bg-primary/5 border-none">
        <Shield size={32} className="text-primary mt-1 shrink-0" />
        <div>
          <Text className="text-white font-bold block mb-2 text-lg">Local Encryption Sandbox</Text>
          <Text className="text-gray-500">
            Editing operations, metadata embedding, and text overlay compiling occur locally within your browser context. No upload is triggered.
          </Text>
        </div>
      </div>
    </div>
  );
};

export default PdfEdit;
