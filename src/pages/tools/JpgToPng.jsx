import React, { useState } from 'react';
import { Card, Upload, Button, Typography, Space, message, Row, Col, Switch } from 'antd';
import { FileImage, Download, Plus, Trash2, Check, Shield } from 'lucide-react';
import { downloadFile } from '../../utils/downloadHelper';
import ToolContent from '../../components/ToolContent';

const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;

const JpgToPng = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [transparent, setTransparent] = useState(true);

  const handleUpload = (info) => {
    const uploadedFile = info.file.originFileObj || info.file;
    if (!uploadedFile) return;
    
    setFile(uploadedFile);
    setPreview(URL.createObjectURL(uploadedFile));
    setResult(null);
  };

  const convertToPng = async () => {
    if (!file) return message.error('Please upload a JPG image first');

    setLoading(true);
    try {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');

        if (!transparent) {
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0);

        const dataUrl = canvas.toDataURL('image/png');
        setResult(dataUrl);
        setLoading(false);
        message.success('Converted to PNG successfully! 🖼️');
      };
      img.onerror = () => {
        setLoading(false);
        message.error('Failed to load image.');
      };
      img.src = preview;
    } catch (error) {
      console.error(error);
      setLoading(false);
      message.error('Failed to convert.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-24 px-4 min-h-screen">
      <div className="text-center mb-16">
        <Title className="!text-white !text-5xl !font-black !mb-4">JPG TO PNG CONVERTER</Title>
        <Paragraph className="!text-gray-400 text-lg">Convert your JPG images to PNG format instantly. 100% Secure & Client-Side.</Paragraph>
      </div>

      <Row gutter={[32, 32]}>
        <Col xs={24} lg={12}>
          <Card className="glass-card !p-8">
            <Dragger
              accept=".jpg,.jpeg"
              showUploadList={false}
              beforeUpload={() => false}
              onChange={handleUpload}
              className="!bg-white/[0.02] !border-2 !border-dashed !border-white/10 hover:!border-primary/50 !rounded-[2.5rem] transition-all group"
            >
              {preview ? (
                <div className="relative p-2">
                  <img src={preview} alt="Preview" className="max-h-[300px] mx-auto rounded-3xl shadow-2xl" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-3xl backdrop-blur-sm">
                    <Text className="text-white font-bold">Change Image</Text>
                  </div>
                </div>
              ) : (
                <div className="py-16 flex flex-col items-center justify-center">
                  <Plus size={48} className="text-primary mb-4 group-hover:rotate-90 transition-transform duration-500" />
                  <Title level={4} className="!text-white !m-0">Upload JPG Image</Title>
                  <Text className="text-gray-500 mt-2 text-base">Select .jpg or .jpeg file</Text>
                </div>
              )}
            </Dragger>

            <div className="mt-8 flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
              <span className="text-white font-bold">Transparent Canvas</span>
              <Switch checked={transparent} onChange={setTransparent} />
            </div>
            
            <div className="mt-8">
              <Button 
                type="primary" 
                block 
                size="large" 
                className="neon-button !h-16 !text-lg" 
                loading={loading}
                onClick={convertToPng}
                disabled={!file}
              >
                Convert to PNG
              </Button>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card className="glass-card !p-8 h-full" title={<span className="text-white font-black tracking-widest uppercase text-xs">Conversion Result</span>}>
            {result ? (
              <div className="text-center animate-in zoom-in duration-500">
                <div className="inline-block p-4 bg-white/5 rounded-3xl border border-primary/20 mb-6 relative">
                  <img src={result} alt="Result" className="max-h-[250px] mx-auto rounded-xl" />
                  <div className="absolute top-[-10px] right-[-10px] w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <Check size={18} className="text-white" />
                  </div>
                </div>
                
                <Button 
                  icon={<Download size={20} />} 
                  block 
                  type="primary" 
                  className="!bg-primary !border-none !text-black font-black h-16 rounded-2xl shadow-xl"
                  onClick={() => downloadFile(result, `converted-${Date.now()}.png`)}
                >
                  Download PNG Image
                </Button>
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[2.5rem]">
                <FileImage size={48} className="text-gray-600 mb-4 animate-pulse" />
                <Text className="text-gray-500">Your PNG result will appear here.</Text>
              </div>
            )}
          </Card>
        </Col>
      </Row>

      {/* Security Card */}
      <div className="mt-12 p-8 glass-card border-none bg-primary/5 flex items-center gap-6">
        <Shield size={40} className="text-primary shrink-0" />
        <div>
          <Title level={4} className="!text-white !mb-1">Privacy First Sandbox</Title>
          <Text className="text-gray-500">All conversion tasks are executed entirely inside your browser. No files are uploaded to any server.</Text>
        </div>
      </div>

      <ToolContent toolKey="jpg-to-png" />
    </div>
  );
};

export default JpgToPng;
