import React, { useState } from 'react';
import { Card, Upload, Button, Typography, Space, message, Input, Slider, Radio, Row, Col } from 'antd';
import { FileText, Download, Plus, Trash2, Shield, Check, Type } from 'lucide-react';
import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';
import { downloadFile } from '../../utils/downloadHelper';

const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;

const PdfWatermark = () => {
  const [file, setFile] = useState(null);
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [fontSize, setFontSize] = useState(50);
  const [opacity, setOpacity] = useState(0.3);
  const [rotation, setRotation] = useState(-45);
  const [color, setColor] = useState('#ff0000'); // Hex color picker
  const [position, setPosition] = useState('center'); // center, diagonal, top-right, bottom-left
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
    } : { r: 1, g: 0, b: 0 };
  };

  const handleApplyWatermark = async () => {
    if (!file) return message.error('Upload a PDF first');
    if (!watermarkText.trim()) return message.error('Enter watermark text');

    setLoading(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const pages = pdfDoc.getPages();
      const { r, g, b } = hexToRgb(color);

      for (const page of pages) {
        const { width, height } = page.getSize();
        let x = width / 2;
        let y = height / 2;
        let rot = rotation;

        if (position === 'center') {
          // Center aligning rough width approximation
          x = width / 2 - (watermarkText.length * fontSize * 0.3);
          y = height / 2;
        } else if (position === 'diagonal') {
          x = width / 4;
          y = height / 4;
          rot = 45; // force diagonal angle
        } else if (position === 'top-right') {
          x = width - (watermarkText.length * fontSize * 0.3) - 30;
          y = height - 50;
        } else if (position === 'bottom-left') {
          x = 30;
          y = 50;
        }

        page.drawText(watermarkText, {
          x,
          y,
          size: fontSize,
          font,
          color: rgb(r, g, b),
          opacity: opacity,
          rotate: degrees(rot),
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setResult(url);
      message.success('Watermark added successfully!');
    } catch (error) {
      console.error(error);
      message.error('Failed to add watermark');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-24 px-4 min-h-screen">
      <div className="text-center mb-16">
        <Title className="!text-white !text-5xl !font-black !mb-4 tracking-tighter uppercase">PDF Watermark Studio</Title>
        <Paragraph className="!text-gray-400 text-lg">Add highly customizable text watermarks to your PDF documents instantly.</Paragraph>
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
                <Paragraph className="!text-gray-400 text-xs mb-4">Your watermark has been embedded locally.</Paragraph>
                <Button
                  icon={<Download size={18} />}
                  type="primary"
                  className="!bg-primary !border-none !text-black font-black h-12 px-8 rounded-xl shadow-lg w-full"
                  onClick={() => downloadFile(result, `watermarked-${file.name}`)}
                >
                  Download PDF
                </Button>
              </div>
            )}
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card className="glass-card !p-6" title={<span className="text-white flex items-center gap-2 font-bold"><Type size={18} className="text-primary" /> Watermark Style Options</span>}>
            <Space direction="vertical" className="w-full" size="large">
              <div>
                <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Watermark Text</Text>
                <Input
                  size="large"
                  value={watermarkText}
                  onChange={(e) => setWatermarkText(e.target.value)}
                  placeholder="e.g. CONFIDENTIAL, DRAFT"
                  className="!bg-white/5 !border-white/10 !text-white !rounded-xl"
                />
              </div>

              <Row gutter={16}>
                <Col span={12}>
                  <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Font Size ({fontSize}px)</Text>
                  <Slider min={10} max={120} value={fontSize} onChange={setFontSize} tooltip={{ formatter: (v) => `${v}px` }} />
                </Col>
                <Col span={12}>
                  <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Opacity ({(opacity * 100).toFixed(0)}%)</Text>
                  <Slider min={0.1} max={1} step={0.05} value={opacity} onChange={setOpacity} tooltip={{ formatter: (v) => `${(v * 100).toFixed(0)}%` }} />
                </Col>
              </Row>

              <Row gutter={16} align="middle">
                <Col span={12}>
                  <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Rotation ({rotation}°)</Text>
                  <Slider min={-180} max={180} value={rotation} onChange={setRotation} />
                </Col>
                <Col span={12}>
                  <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Watermark Color</Text>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-10 h-10 border-0 rounded cursor-pointer bg-transparent"
                    />
                    <Text className="text-white font-mono">{color.toUpperCase()}</Text>
                  </div>
                </Col>
              </Row>

              <div>
                <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Position Template</Text>
                <Radio.Group value={position} onChange={(e) => setPosition(e.target.value)} className="w-full">
                  <Row gutter={[8, 8]}>
                    <Col span={12}><Radio value="center" className="text-white">Center</Radio></Col>
                    <Col span={12}><Radio value="diagonal" className="text-white">Diagonal</Radio></Col>
                    <Col span={12}><Radio value="top-right" className="text-white">Top Right</Radio></Col>
                    <Col span={12}><Radio value="bottom-left" className="text-white">Bottom Left</Radio></Col>
                  </Row>
                </Radio.Group>
              </div>

              <Button
                block
                type="primary"
                size="large"
                className="neon-button !h-14 !text-base"
                onClick={handleApplyWatermark}
                loading={loading}
                disabled={!file}
              >
                Apply Watermark
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>

      <div className="mt-12 flex items-start gap-4 p-8 glass-card bg-primary/5 border-none">
        <Shield size={32} className="text-primary mt-1 shrink-0" />
        <div>
          <Text className="text-white font-bold block mb-2 text-lg">100% Client-Side Processing</Text>
          <Text className="text-gray-500">
            Watermarking runs fully in your web browser. No document pages or watermark content are sent to any external server.
          </Text>
        </div>
      </div>
    </div>
  );
};

export default PdfWatermark;
