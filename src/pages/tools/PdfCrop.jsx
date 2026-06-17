import React, { useState } from 'react';
import { Card, Upload, Button, Typography, Space, message, Input, Row, Col, Select } from 'antd';
import { FileText, Download, Plus, Shield, Check, Crop } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { downloadFile } from '../../utils/downloadHelper';

const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;
const { Option } = Select;

const PdfCrop = () => {
  const [file, setFile] = useState(null);
  const [cropPreset, setCropPreset] = useState('custom'); // custom, a4, letter
  const [marginTop, setMarginTop] = useState(20);
  const [marginRight, setMarginRight] = useState(20);
  const [marginBottom, setMarginBottom] = useState(20);
  const [marginLeft, setMarginLeft] = useState(20);
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

  const handleCrop = async () => {
    if (!file) return message.error('Upload a PDF first');

    setLoading(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      const pages = pdfDoc.getPages();

      pages.forEach((page) => {
        const { x, y, width, height } = page.getMediaBox();

        let newX = x;
        let newY = y;
        let newWidth = width;
        let newHeight = height;

        if (cropPreset === 'a4') {
          // Standard A4 dimensions in points: 595.27 x 841.89
          newWidth = Math.min(width, 595);
          newHeight = Math.min(height, 842);
          newX = (width - newWidth) / 2;
          newY = (height - newHeight) / 2;
        } else if (cropPreset === 'letter') {
          // Standard Letter dimensions in points: 612 x 792
          newWidth = Math.min(width, 612);
          newHeight = Math.min(height, 792);
          newX = (width - newWidth) / 2;
          newY = (height - newHeight) / 2;
        } else {
          // Custom crop margins in points
          newX = x + marginLeft;
          newY = y + marginBottom;
          newWidth = width - marginLeft - marginRight;
          newHeight = height - marginBottom - marginTop;
        }

        // Apply crop box dimensions
        page.setCropBox(newX, newY, newWidth, newHeight);
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setResult(url);
      message.success('PDF cropped successfully!');
    } catch (error) {
      console.error(error);
      message.error('Failed to crop PDF.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-24 px-4 min-h-screen">
      <div className="text-center mb-16">
        <Title className="!text-white !text-5xl !font-black !mb-4 tracking-tighter uppercase">PDF Crop Studio</Title>
        <Paragraph className="!text-gray-400 text-lg">Crop document margins, clip page borders, and apply standard size templates locally.</Paragraph>
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
                <Title level={4} className="!text-white !mb-1">Cropped PDF Ready!</Title>
                <Paragraph className="!text-gray-400 text-xs mb-4">Margins and crop boundaries updated successfully.</Paragraph>
                <Button
                  icon={<Download size={18} />}
                  type="primary"
                  className="!bg-primary !border-none !text-black font-black h-12 px-8 rounded-xl shadow-lg w-full"
                  onClick={() => downloadFile(result, `cropped-${file.name}`)}
                >
                  Download PDF
                </Button>
              </div>
            )}
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card className="glass-card !p-6" title={<span className="text-white flex items-center gap-2 font-bold"><Crop size={18} className="text-primary" /> Cropping Margin Controls</span>}>
            <Space direction="vertical" className="w-full" size="large">
              <div>
                <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Dimension Preset</Text>
                <Select value={cropPreset} onChange={setCropPreset} className="w-full" size="large">
                  <Option value="custom">Custom Margin Crop</Option>
                  <Option value="a4">Force A4 Template Bounds</Option>
                  <Option value="letter">Force US Letter Bounds</Option>
                </Select>
              </div>

              {cropPreset === 'custom' && (
                <div>
                  <Text className="text-gray-400 font-bold block mb-4 uppercase text-[10px] tracking-widest">Crop Margins (Points)</Text>
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Text className="text-gray-500 text-xs block mb-1">Top Margin</Text>
                      <Input
                        type="number"
                        value={marginTop}
                        onChange={e => setMarginTop(parseInt(e.target.value) || 0)}
                        className="!bg-white/5 !border-white/10 !text-white"
                      />
                    </Col>
                    <Col span={12}>
                      <Text className="text-gray-500 text-xs block mb-1">Right Margin</Text>
                      <Input
                        type="number"
                        value={marginRight}
                        onChange={e => setMarginRight(parseInt(e.target.value) || 0)}
                        className="!bg-white/5 !border-white/10 !text-white"
                      />
                    </Col>
                    <Col span={12}>
                      <Text className="text-gray-500 text-xs block mb-1">Bottom Margin</Text>
                      <Input
                        type="number"
                        value={marginBottom}
                        onChange={e => setMarginBottom(parseInt(e.target.value) || 0)}
                        className="!bg-white/5 !border-white/10 !text-white"
                      />
                    </Col>
                    <Col span={12}>
                      <Text className="text-gray-500 text-xs block mb-1">Left Margin</Text>
                      <Input
                        type="number"
                        value={marginLeft}
                        onChange={e => setMarginLeft(parseInt(e.target.value) || 0)}
                        className="!bg-white/5 !border-white/10 !text-white"
                      />
                    </Col>
                  </Row>
                </div>
              )}

              <Button
                block
                type="primary"
                size="large"
                className="neon-button !h-14 !text-base"
                onClick={handleCrop}
                loading={loading}
                disabled={!file}
              >
                Crop PDF Document
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>

      <div className="mt-12 flex items-start gap-4 p-8 glass-card bg-primary/5 border-none">
        <Shield size={32} className="text-primary mt-1 shrink-0" />
        <div>
          <Text className="text-white font-bold block mb-2 text-lg">100% In-Browser Crop</Text>
          <Text className="text-gray-500">
            Page dimensions and crop boxes are modified instantly inside your web browser sandbox using `pdf-lib` binary processing.
          </Text>
        </div>
      </div>
    </div>
  );
};

export default PdfCrop;
