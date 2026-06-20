import React, { useState } from 'react';
import { Card, Upload, Button, Typography, Row, Col, Space, InputNumber, Select, message, Tag } from 'antd';
import { Download, ImageIcon, Ruler, Zap, Shield, Check, Info } from 'lucide-react';
import { resizeImageClient } from '../../utils/imageProcessor';
import { downloadFile } from '../../utils/downloadHelper';
import ToolContent from '../../components/ToolContent';

const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;
const { Option } = Select;

const ImageResizer = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [targetSize, setTargetSize] = useState(50);
  const [unit, setUnit] = useState('KB');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const presets = [
    { label: 'UPSC Photo (20-50 KB)', w: 350, h: 350, kb: 50 },
    { label: 'SSC Signature (10-20 KB)', w: 140, h: 60, kb: 20 },
    { label: 'Bank Exam (20-100 KB)', w: 800, h: 800, kb: 100 },
  ];

  const handleUpload = (info) => {
    const uploadedFile = info.file.originFileObj || info.file;
    if (!uploadedFile || !(uploadedFile instanceof File || uploadedFile instanceof Blob)) return;
    setFile(uploadedFile);
    setPreview(URL.createObjectURL(uploadedFile));
    setResult(null);
  };

  const handleResize = async () => {
    if (!file) return message.error('Please upload an image first');

    setLoading(true);
    const targetInKB = unit === 'MB' ? targetSize * 1024 : targetSize;
    
    try {
      const processed = await resizeImageClient(file, {
        targetSizeKB: targetInKB
      });
      setResult(processed);
      message.success('Image resized successfully!');
    } catch (error) {
      message.error('Failed to resize image');
    } finally {
      setLoading(false);
    }
  };

  const applyPreset = (preset) => {
    setTargetSize(preset.kb);
    setUnit('KB');
    message.info(`Applied ${preset.label}`);
  };

  return (
    <div className="max-w-7xl mx-auto py-24 px-4 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="responsive-title !text-white !mb-4 tracking-tighter uppercase">Image Power Resizer</h1>
        <Paragraph className="!text-gray-400 text-lg sm:text-xl">Compress images to exact KB for government portals. 100% Client-Side.</Paragraph>
      </div>

      <Row gutter={[32, 32]}>
        {/* Input Card */}
        <Col xs={24} lg={14}>
          <Card className="glass-card !p-8 h-full">
            <Dragger
              accept="image/*"
              showUploadList={false}
              beforeUpload={() => false}
              onChange={handleUpload}
              className="!bg-white/[0.02] !border-2 !border-dashed !border-white/10 hover:!border-primary/50 !rounded-[2.5rem] transition-all group"
            >
              {preview ? (
                <div className="relative p-2">
                  <img src={preview} alt="Preview" className="max-h-[400px] mx-auto rounded-3xl shadow-2xl" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-3xl backdrop-blur-sm">
                    <Text className="text-white font-bold">Change Original Image</Text>
                  </div>
                </div>
              ) : (
                <div className="py-24 flex flex-col items-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,242,255,0.2)]">
                    <ImageIcon size={40} className="text-primary" />
                  </div>
                  <Title level={4} className="!text-white">Upload Your Photo</Title>
                  <Text className="text-gray-500">Supports JPG, PNG, and WebP</Text>
                </div>
              )}
            </Dragger>

            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              {presets.map((p, i) => (
                <Tag 
                  key={i} 
                  className="!px-6 !py-2 !rounded-full !bg-white/5 !border-white/10 !text-gray-400 hover:!border-primary hover:!text-primary cursor-pointer transition-all font-bold uppercase text-[10px] tracking-widest"
                  onClick={() => applyPreset(p)}
                >
                  {p.label}
                </Tag>
              ))}
            </div>
          </Card>
        </Col>

        {/* Controls Card */}
        <Col xs={24} lg={10}>
          <Card className="glass-card !p-8" title={<span className="text-white flex items-center gap-3 font-black uppercase tracking-widest text-xs"><Zap size={18} className="text-primary"/> Compression Engine</span>}>
            <Space direction="vertical" className="w-full" size="xl">
              <div>
                <Text className="text-gray-400 font-bold block mb-4 uppercase text-[10px] tracking-widest">Target File Size</Text>
                <div className="flex gap-4">
                  <InputNumber
                    min={1}
                    max={5000}
                    value={targetSize}
                    onChange={setTargetSize}
                    className="flex-1 !h-14 !text-lg !rounded-xl !bg-white/5 !border-white/10 !text-white"
                  />
                  <Select 
                    value={unit} 
                    onChange={setUnit} 
                    className="!w-24 !h-14" 
                    size="large"
                    dropdownStyle={{ backgroundColor: '#1f1f1f' }}
                  >
                    <Option value="KB">KB</Option>
                    <Option value="MB">MB</Option>
                  </Select>
                </div>
              </div>

              <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                <div className="flex items-start gap-4">
                  <Info size={24} className="text-primary shrink-0 mt-1" />
                  <Text className="text-gray-500 text-xs">
                    We will optimize the quality and resolution to match your target of **{targetSize} {unit}**. 
                    Perfect for UPSC/SSC portal requirements.
                  </Text>
                </div>
              </div>

              <Button 
                type="primary" 
                block 
                size="large" 
                className="neon-button !h-16 !text-lg" 
                loading={loading}
                onClick={handleResize}
              >
                {loading ? 'Optimizing...' : 'Resize Now'}
              </Button>

              {result && (
                <div className="mt-8 text-center animate-in zoom-in duration-500">
                  <div className="inline-block p-4 bg-white/5 rounded-3xl border border-primary/20 mb-6 relative">
                    <img src={result.dataUrl} alt="Result" className="h-40 w-auto rounded-xl" />
                    <div className="absolute top-[-10px] right-[-10px] w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <Check size={18} className="text-white" />
                    </div>
                    <div className="mt-4 text-primary font-black text-xs uppercase tracking-widest">
                      Optimized to: {(result.size / 1024).toFixed(1)} KB
                    </div>
                  </div>
                  
                  <Button 
                    icon={<Download size={20} />} 
                    block 
                    type="primary" 
                    className="!bg-primary !border-none !text-black font-black h-16 rounded-2xl shadow-xl"
                    onClick={() => downloadFile(result.dataUrl, `resized-${Date.now()}.jpg`)}
                  >
                    Download Optimized Image
                  </Button>
                </div>
              )}
            </Space>
          </Card>

        </Col>
      </Row>

      <ToolContent toolKey="image-resizer" />
    </div>
  );
};

export default ImageResizer;
