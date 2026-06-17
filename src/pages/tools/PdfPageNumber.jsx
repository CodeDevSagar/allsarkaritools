import React, { useState } from 'react';
import { Card, Upload, Button, Typography, Space, message, Select, Slider, Row, Col, Radio } from 'antd';
import { FileText, Download, Plus, Shield, Check, Hash } from 'lucide-react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { downloadFile } from '../../utils/downloadHelper';

const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;
const { Option } = Select;

const PdfPageNumber = () => {
  const [file, setFile] = useState(null);
  const [position, setPosition] = useState('bottom-center'); // top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
  const [format, setFormat] = useState('page-x-of-y'); // x, page-x, page-x-of-y, hyphen-x
  const [fontSize, setFontSize] = useState(12);
  const [color, setColor] = useState('#000000');
  const [startNumber, setStartNumber] = useState(1);
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
  };

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16) / 255,
      g: parseInt(result[2], 16) / 255,
      b: parseInt(result[3], 16) / 255
    } : { r: 0, g: 0, b: 0 };
  };

  const handleAddPageNumbers = async () => {
    if (!file) return message.error('Upload a PDF first');

    setLoading(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const pages = pdfDoc.getPages();
      const totalPages = pages.length;
      const { r, g, b } = hexToRgb(color);

      pages.forEach((page, index) => {
        const { width, height } = page.getSize();
        const displayPageNum = startNumber + index;
        
        let text = `${displayPageNum}`;
        if (format === 'page-x') text = `Page ${displayPageNum}`;
        else if (format === 'page-x-of-y') text = `Page ${displayPageNum} of ${totalPages}`;
        else if (format === 'hyphen-x') text = `- ${displayPageNum} -`;

        // Measure rough text width based on font size (approx 0.5 * size per char for Helvetica)
        const approxTextWidth = text.length * fontSize * 0.5;

        let x = width / 2 - approxTextWidth / 2; // default center
        let y = 30; // default bottom

        // Determine X coordinate
        if (position.endsWith('left')) {
          x = 40;
        } else if (position.endsWith('right')) {
          x = width - approxTextWidth - 40;
        } else {
          x = width / 2 - approxTextWidth / 2;
        }

        // Determine Y coordinate
        if (position.startsWith('top')) {
          y = height - 40;
        } else {
          y = 30;
        }

        page.drawText(text, {
          x,
          y,
          size: fontSize,
          font,
          color: rgb(r, g, b),
        });
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setResult(url);
      message.success('Page numbers added successfully!');
    } catch (error) {
      console.error(error);
      message.error('Failed to add page numbers.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-24 px-4 min-h-screen">
      <div className="text-center mb-16">
        <Title className="!text-white !text-5xl !font-black !mb-4 tracking-tighter uppercase">PDF Page Numbering Studio</Title>
        <Paragraph className="!text-gray-400 text-lg">Add custom formatted page numbers to PDF document headers or footers instantly.</Paragraph>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card className="glass-card !p-6 h-full">
            <Dragger
              accept=".pdf"
              showUploadList={false}
              beforeUpload={() => false}
              onChange={handleUpload}
              className="!bg-white/[0.02] !border-2 !border-dashed !border-white/10 hover:!border-primary/50 !rounded-[2.5rem] transition-all group"
            >
              {file ? (
                <div className="py-12 flex flex-col items-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <FileText size={32} className="text-primary" />
                  </div>
                  <Text className="text-white font-bold block truncate max-w-[200px]">{file.name}</Text>
                  <Text className="text-gray-500 text-xs mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</Text>
                  <Button type="link" danger onClick={(e) => { e.stopPropagation(); setFile(null); setResult(null); }} className="mt-4">
                    Remove File
                  </Button>
                </div>
              ) : (
                <div className="py-16 flex flex-col items-center justify-center">
                  <Plus size={48} className="text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <Text className="text-white font-bold text-lg">Upload PDF file here</Text>
                  <Text className="text-gray-500">Only PDF formats are supported</Text>
                </div>
              )}
            </Dragger>

            {result && (
              <div className="mt-8 p-6 bg-primary/10 border border-primary/20 rounded-[2rem] text-center animate-in zoom-in duration-500">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Check size={24} className="text-primary" />
                </div>
                <Title level={4} className="!text-white !mb-1">Ready to Download!</Title>
                <Paragraph className="!text-gray-400 text-xs mb-4">Page numbers applied successfully.</Paragraph>
                <Button
                  icon={<Download size={18} />}
                  type="primary"
                  className="!bg-primary !border-none !text-black font-black h-12 px-8 rounded-xl shadow-lg w-full"
                  onClick={() => downloadFile(result, `numbered-${file.name}`)}
                >
                  Download Numbered PDF
                </Button>
              </div>
            )}
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card className="glass-card !p-6" title={<span className="text-white flex items-center gap-2 font-bold"><Hash size={18} className="text-primary" /> Numbering Controls</span>}>
            <Space direction="vertical" className="w-full" size="large">
              <div>
                <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Placement Position</Text>
                <Radio.Group value={position} onChange={(e) => setPosition(e.target.value)} className="w-full">
                  <Row gutter={[8, 8]}>
                    <Col span={12}><Radio value="top-left" className="text-white">Header Left</Radio></Col>
                    <Col span={12}><Radio value="top-center" className="text-white">Header Center</Radio></Col>
                    <Col span={12}><Radio value="top-right" className="text-white">Header Right</Radio></Col>
                    <Col span={12}><Radio value="bottom-left" className="text-white">Footer Left</Radio></Col>
                    <Col span={12}><Radio value="bottom-center" className="text-white">Footer Center</Radio></Col>
                    <Col span={12}><Radio value="bottom-right" className="text-white">Footer Right</Radio></Col>
                  </Row>
                </Radio.Group>
              </div>

              <div>
                <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Numbering Format</Text>
                <Select value={format} onChange={setFormat} className="w-full" size="large">
                  <Option value="x">X (e.g. 1, 2, 3)</Option>
                  <Option value="page-x">Page X (e.g. Page 1, Page 2)</Option>
                  <Option value="page-x-of-y">Page X of Y (e.g. Page 1 of 10)</Option>
                  <Option value="hyphen-x">- X - (e.g. - 1 -, - 2 -)</Option>
                </Select>
              </div>

              <Row gutter={16}>
                <Col span={12}>
                  <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Font Size ({fontSize}px)</Text>
                  <Slider min={8} max={24} value={fontSize} onChange={setFontSize} />
                </Col>
                <Col span={12}>
                  <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Start From Page</Text>
                  <Select value={startNumber} onChange={setStartNumber} className="w-full" size="large">
                    {[1, 2, 3, 4, 5].map(n => (
                      <Option key={n} value={n}>{n}</Option>
                    ))}
                  </Select>
                </Col>
              </Row>

              <div>
                <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Typography Color</Text>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-10 h-10 border-0 rounded cursor-pointer bg-transparent"
                  />
                  <Text className="text-white font-mono">{color.toUpperCase()}</Text>
                </div>
              </div>

              <Button
                block
                type="primary"
                size="large"
                className="neon-button !h-14 !text-base"
                onClick={handleAddPageNumbers}
                loading={loading}
                disabled={!file}
              >
                Apply Page Numbers
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>

      <div className="mt-12 flex items-start gap-4 p-8 glass-card bg-primary/5 border-none">
        <Shield size={32} className="text-primary mt-1 shrink-0" />
        <div>
          <Text className="text-white font-bold block mb-2 text-lg">Local Sandbox Execution</Text>
          <Text className="text-gray-500">
            Page numbering is calculated fully in your web browser. Privacy is 100% guaranteed.
          </Text>
        </div>
      </div>
    </div>
  );
};

export default PdfPageNumber;
