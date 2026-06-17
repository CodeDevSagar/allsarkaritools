import React, { useState, useRef } from 'react';
import { Card, Upload, Button, Typography, Row, Col, Space, message, Progress, Tag } from 'antd';
import { Wand2, Download, Shield, ImageIcon, Layers, RefreshCw, CheckCircle } from 'lucide-react';
import { removeBackground } from '@imgly/background-removal';

const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;

const BgRemover = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState('');

  const handleUpload = (info) => {
    const uploadedFile = info.file.originFileObj || info.file;
    if (!uploadedFile || !(uploadedFile instanceof File || uploadedFile instanceof Blob)) return;
    setFile(uploadedFile);
    setPreview(URL.createObjectURL(uploadedFile));
    setResult(null);
    setProgress(0);
  };

  const handleRemove = async () => {
    if (!file) return message.error('Please upload an image first');
    setLoading(true);
    setProgress(5);
    setProgressText('Loading AI model...');

    try {
      const blob = await removeBackground(file, {
        progress: (key, current, total) => {
          const pct = Math.round((current / total) * 100);
          setProgress(pct);
          if (key === 'fetch:ort-wasm-simd-threaded.wasm') setProgressText('Loading AI engine...');
          else if (key.startsWith('compute')) setProgressText('Removing background...');
          else setProgressText('Processing...');
        },
        output: { format: 'image/png', quality: 1 },
      });

      const url = URL.createObjectURL(blob);
      setResult(url);
      setProgress(100);
      setProgressText('Done!');
      message.success('Background removed successfully!');
    } catch (err) {
      console.error(err);
      message.error('Background removal failed. Please try a different image.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setProgress(0);
    setProgressText('');
  };

  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement('a');
    a.href = result;
    a.download = `bg-removed-${Date.now()}.png`;
    a.click();
  };

  return (
    <div className="max-w-7xl mx-auto py-24 px-4 min-h-screen">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6 backdrop-blur-md">
          <Wand2 size={16} className="text-primary" />
          <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">AI-Powered • 100% Private</span>
        </div>
        <h1 className="responsive-title !text-white !mb-4 tracking-tighter uppercase">BG Remover</h1>
        <Paragraph className="!text-gray-400 text-lg sm:text-xl">
          Remove backgrounds instantly with on-device AI. No uploads. No server.
        </Paragraph>
      </div>

      <Row gutter={[32, 32]}>
        {/* Left: Upload + Preview */}
        <Col xs={24} lg={14}>
          <Card className="glass-card !p-6 h-full">
            {!preview ? (
              <Dragger
                accept="image/*"
                showUploadList={false}
                beforeUpload={() => false}
                onChange={handleUpload}
                className="!bg-white/[0.02] !border-2 !border-dashed !border-white/10 hover:!border-primary/50 !rounded-[2.5rem] transition-all group !h-full"
              >
                <div className="py-28 flex flex-col items-center">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(0,242,255,0.15)] animate-pulse">
                    <ImageIcon size={44} className="text-primary" />
                  </div>
                  <Title level={4} className="!text-white !mb-2">Drop Your Photo Here</Title>
                  <Text className="text-gray-500">JPG, PNG, WebP up to 10MB</Text>
                  <Tag className="mt-6 !bg-primary/10 !border-primary/20 !text-primary !px-4 !py-1 !rounded-full uppercase text-[10px] tracking-widest">Click or Drag</Tag>
                </div>
              </Dragger>
            ) : (
              <div className="relative">
                {/* Before / After comparison */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="relative">
                    <div className="absolute top-3 left-3 z-10">
                      <Tag className="!bg-black/60 !border-white/10 !text-white uppercase text-[10px] tracking-widest backdrop-blur-sm">Original</Tag>
                    </div>
                    <img
                      src={preview}
                      alt="Original"
                      className="w-full h-64 object-cover rounded-2xl border border-white/10"
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute top-3 left-3 z-10">
                      <Tag className="!bg-primary/20 !border-primary/30 !text-primary uppercase text-[10px] tracking-widest backdrop-blur-sm">Result</Tag>
                    </div>
                    {result ? (
                      <img
                        src={result}
                        alt="Result"
                        className="w-full h-64 object-contain rounded-2xl border border-primary/20"
                        style={{
                          background: 'repeating-conic-gradient(#333 0% 25%, #222 0% 50%) 0 0 / 20px 20px',
                        }}
                      />
                    ) : (
                      <div className="w-full h-64 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center justify-center">
                        {loading ? (
                          <div className="flex flex-col items-center gap-3">
                            <Wand2 size={32} className="text-primary animate-spin" />
                            <Text className="text-gray-500 text-sm">{progressText}</Text>
                          </div>
                        ) : (
                          <Layers size={32} className="text-gray-700" />
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress bar */}
                {loading && (
                  <div className="mb-6">
                    <Progress
                      percent={progress}
                      status="active"
                      strokeColor={{ from: '#00f2ff', to: '#a855f7' }}
                      className="!mb-2"
                    />
                    <Text className="text-gray-500 text-xs text-center block">{progressText}</Text>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex gap-4">
                  <Button
                    block
                    icon={<RefreshCw size={16} />}
                    onClick={handleReset}
                    className="!bg-white/5 !border-white/10 !text-gray-400 !h-12 !rounded-xl"
                  >
                    New Image
                  </Button>
                  {result && (
                    <Button
                      block
                      type="primary"
                      icon={<Download size={16} />}
                      onClick={handleDownload}
                      className="!bg-primary !border-none !text-black font-black !h-12 !rounded-xl"
                    >
                      Download PNG
                    </Button>
                  )}
                </div>
              </div>
            )}
          </Card>
        </Col>

        {/* Right: Controls & Info */}
        <Col xs={24} lg={10}>
          <div className="flex flex-col gap-6">
            <Card className="glass-card !p-8" title={
              <span className="text-white flex items-center gap-3 font-black uppercase tracking-widest text-xs">
                <Wand2 size={18} className="text-primary" /> AI Engine
              </span>
            }>
              <Space direction="vertical" className="w-full" size="large">
                <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10">
                  <div className="flex items-start gap-4">
                    <Shield size={22} className="text-primary shrink-0 mt-1" />
                    <div>
                      <Text className="text-white font-bold block mb-1">100% On-Device AI</Text>
                      <Text className="text-gray-500 text-xs leading-relaxed">
                        The AI model runs entirely inside your browser using WebAssembly.
                        Your photos are never sent to any server.
                      </Text>
                    </div>
                  </div>
                </div>

                <Button
                  type="primary"
                  block
                  size="large"
                  className="neon-button !h-16 !text-lg"
                  loading={loading}
                  disabled={!file || !!result}
                  onClick={handleRemove}
                  icon={<Wand2 size={20} />}
                >
                  {loading ? progressText || 'Processing...' : result ? 'Done!' : 'Remove Background'}
                </Button>

                {result && (
                  <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl animate-in fade-in duration-500">
                    <CheckCircle size={20} className="text-green-400 shrink-0" />
                    <Text className="text-green-400 text-sm font-bold">Background removed! Download your transparent PNG.</Text>
                  </div>
                )}
              </Space>
            </Card>

            {/* Feature list */}
            <Card className="glass-card !p-8 border-none bg-white/[0.02]">
              <Title level={5} className="!text-white !mb-6 uppercase tracking-widest text-xs">Why Use This Tool?</Title>
              <div className="flex flex-col gap-4">
                {[
                  { icon: '🎯', text: 'Perfect for passport photo backgrounds' },
                  { icon: '🛡️', text: 'Zero data collection — fully private' },
                  { icon: '🖼️', text: 'Exports lossless transparent PNG' },
                  { icon: '⚡', text: 'Processes in seconds, no account needed' },
                  { icon: '📱', text: 'Works on mobile and desktop browsers' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="text-2xl">{item.icon}</span>
                    <Text className="text-gray-400 text-sm">{item.text}</Text>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BgRemover;
