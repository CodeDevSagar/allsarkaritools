import React, { useState, useRef } from 'react';
import { Card, Upload, Button, Typography, Row, Col, Space, message, Select, Divider, Tag, Segmented } from 'antd';
import { Download, Scissors, User, Info, Check, Shield, Printer, Grid } from 'lucide-react';
import { resizeImageClient } from '../../utils/imageProcessor';
import { downloadFile } from '../../utils/downloadHelper';

const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;
const { Option } = Select;

const PassportPhotoMaker = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [preset, setPreset] = useState('indian_passport');
  const [unit, setUnit] = useState('KB');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const printRef = useRef(null);

  const presets = {
    indian_passport: { name: 'Indian Passport (3.5x4.5 cm)', w: 413, h: 531, kb: 50, wCm: 3.5, hCm: 4.5 },
    neet_postcard: { name: 'NEET Post Card (4x6 inch)', w: 1200, h: 1800, kb: 200, wCm: 10.16, hCm: 15.24 },
    us_visa: { name: 'US Visa (2x2 inch)', w: 600, h: 600, kb: 100, wCm: 5.08, hCm: 5.08 },
    pan_card: { name: 'PAN Card Photo (2.5x3.5 cm)', w: 295, h: 413, kb: 30, wCm: 2.5, hCm: 3.5 },
    ssc_exam: { name: 'SSC/Exam Form (3.5x4.5 cm)', w: 413, h: 531, kb: 20, wCm: 3.5, hCm: 4.5 },
  };

  const handleUpload = (info) => {
    const uploadedFile = info.file.originFileObj || info.file;
    if (!uploadedFile || !(uploadedFile instanceof File || uploadedFile instanceof Blob)) return;
    setFile(uploadedFile);
    setPreview(URL.createObjectURL(uploadedFile));
    setResult(null);
  };

  const handleCreate = async () => {
    if (!file) return message.error('Please upload a photo first');

    setLoading(true);
    const selectedPreset = presets[preset];
    const targetInKB = unit === 'MB' ? selectedPreset.kb * 1024 : selectedPreset.kb;
    
    try {
      const processed = await resizeImageClient(file, {
        width: selectedPreset.w,
        height: selectedPreset.h,
        targetSizeKB: targetInKB
      });
      setResult(processed);
      message.success('Photo generated successfully!');
    } catch (error) {
      message.error('Failed to create photo');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    if (!result) return;
    const printContent = printRef.current;
    const WinPrint = window.open('', '', 'width=900,height=650');
    WinPrint.document.write(`
      <html>
        <head>
          <title>Print Photos</title>
          <style>
            body { margin: 0; padding: 20px; display: flex; flex-direction: column; align-items: center; background-color: #f0f0f0; }
            .print-container { 
              display: flex; 
              flex-wrap: wrap; 
              gap: 4px; 
              justify-content: flex-start; 
              align-content: flex-start;
              background-color: white; 
              padding: 10px; 
              box-shadow: 0 0 10px rgba(0,0,0,0.1); 
              width: fit-content; 
              max-width: 100%;
            }
            img { 
              border: 1px solid #777; 
              width: ${presets[preset].wCm}cm; 
              height: ${presets[preset].hCm}cm; 
              object-fit: cover; 
              box-sizing: border-box;
              margin: 0;
            }
            @media print {
              body { background-color: white; padding: 0; margin: 0; }
              .print-container { 
                padding: 0; 
                box-shadow: none; 
                gap: 2px; /* Minimal cutting gap */
              }
              img { 
                border: 1px solid #000; 
                break-inside: avoid; 
              }
            }
          </style>
        </head>
        <body>
          <div class="print-container">
            ${Array(quantity).fill(`<img src="${result.dataUrl}" />`).join('')}
          </div>
          <script>
            window.onload = function() {
              setTimeout(() => {
                window.print();
                window.close();
              }, 500);
            };
          </script>
        </body>
      </html>
    `);
    WinPrint.document.close();
  };

  return (
    <div className="max-w-7xl mx-auto py-24 px-4 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="responsive-title !text-white !mb-4 tracking-tighter uppercase">Pro Passport Studio</h1>
        <Paragraph className="!text-gray-400 text-lg sm:text-xl">Generate, Grid, and Print Official Photos Instantly.</Paragraph>
      </div>

      <Row gutter={[32, 32]}>
        {/* Left: Upload & Preview */}
        <Col xs={24} lg={14}>
          <Card className="glass-card !p-6 h-full">
            <Dragger
              accept="image/*"
              showUploadList={false}
              beforeUpload={() => false}
              onChange={handleUpload}
              className="!bg-white/[0.02] !border-2 !border-dashed !border-white/10 hover:!border-primary/50 !rounded-[2.5rem] transition-all group"
            >
              {preview ? (
                <div className="relative p-2">
                  <img src={preview} alt="Preview" className="max-h-[500px] mx-auto rounded-2xl shadow-2xl" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl backdrop-blur-sm">
                    <Text className="text-white font-bold">Change Original Photo</Text>
                  </div>
                </div>
              ) : (
                <div className="py-24 flex flex-col items-center">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,242,255,0.2)]">
                    <User size={48} className="text-primary" />
                  </div>
                  <Title level={4} className="!text-white">Upload Portrait</Title>
                  <Text className="text-gray-500">Ensure good lighting and plain background</Text>
                </div>
              )}
            </Dragger>

            {result && (
              <div className="mt-8 p-8 bg-white/5 rounded-[2.5rem] border border-white/10">
                <div className="flex justify-between items-center mb-6">
                  <Title level={5} className="!text-white !m-0 flex items-center gap-2">
                    <Grid size={18} className="text-primary" /> Multi-Photo Preview ({quantity} Pics)
                  </Title>
                  <Button type="primary" icon={<Printer size={18} />} onClick={handlePrint} className="neon-button">Print Now</Button>
                </div>
                
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-3 max-h-[300px] overflow-auto p-4 bg-black/20 rounded-2xl border border-white/5">
                  {Array(quantity).fill(0).map((_, i) => (
                    <div key={i} className="aspect-[3.5/4.5] border border-white/10 rounded overflow-hidden shadow-lg animate-in zoom-in duration-300">
                      <img src={result.dataUrl} alt={`grid-${i}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </Col>

        {/* Right: Settings */}
        <Col xs={24} lg={10}>
          <Card className="glass-card !p-8" title={<span className="text-white flex items-center gap-3 font-black uppercase tracking-widest text-xs"><Scissors size={18} className="text-primary"/> Pro Configuration</span>}>
            <Space direction="vertical" className="w-full" size="large">
              <div>
                <Text className="text-gray-400 font-bold block mb-4 uppercase text-[10px] tracking-widest">Select Exam/Format</Text>
                <Select 
                  className="w-full" 
                  value={preset} 
                  onChange={setPreset}
                  size="large"
                  dropdownStyle={{ backgroundColor: '#1f1f1f' }}
                >
                  {Object.entries(presets).map(([key, value]) => (
                    <Option key={key} value={key}>{value.name}</Option>
                  ))}
                </Select>
              </div>

              <div>
                <Text className="text-gray-400 font-bold block mb-4 uppercase text-[10px] tracking-widest">Quantity (Grid Layout)</Text>
                <Segmented
                  block
                  size="large"
                  value={quantity}
                  onChange={setQuantity}
                  options={[
                    { label: '1 Pic', value: 1 },
                    { label: '6 Pics', value: 6 },
                    { label: '8 Pics', value: 8 },
                    { label: '16 Pics', value: 16 },
                  ]}
                  className="!bg-white/5 !p-1"
                />
              </div>

              <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                <div className="flex items-start gap-4">
                  <Info size={24} className="text-primary shrink-0 mt-1" />
                  <div className="w-full">
                    <div className="flex justify-between items-center mb-2">
                      <Text className="text-white font-bold block">Specs</Text>
                      <Select value={unit} onChange={setUnit} className="!w-20 !h-8 !text-xs">
                        <Option value="KB">KB</Option>
                        <Option value="MB">MB</Option>
                      </Select>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Tag color="blue" className="!border-blue-500/20 !bg-blue-500/10 !text-blue-400 font-bold uppercase text-[10px]">
                        {presets[preset].w} x {presets[preset].h} PX
                      </Tag>
                      <Tag color="green" className="!border-green-500/20 !bg-green-500/10 !text-green-400 font-bold uppercase text-[10px]">
                        MAX {presets[preset].kb} {unit}
                      </Tag>
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                block 
                size="large" 
                className="neon-button !h-16 !text-lg" 
                loading={loading}
                onClick={handleCreate}
              >
                {loading ? 'Processing...' : 'Generate High-Res Grid'}
              </Button>

              {result && (
                <div className="mt-4 animate-in zoom-in duration-500">
                  <Button 
                    icon={<Download size={20} />} 
                    block 
                    type="primary" 
                    className="!bg-primary !border-none !text-black font-black h-16 rounded-2xl shadow-xl"
                    onClick={() => downloadFile(result.dataUrl, `${preset}-grid-${Date.now()}.jpg`)}
                  >
                    Download Single Photo
                  </Button>
                </div>
              )}
            </Space>
          </Card>

          <div className="mt-8 flex items-center gap-4 p-6 glass-card border-none bg-primary/5">
            <Shield size={24} className="text-primary shrink-0" />
            <Text className="text-gray-500 text-sm">
              AI-powered resizing with local encryption. Perfect for NEET, SSC, and UPSC portals.
            </Text>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PassportPhotoMaker;
