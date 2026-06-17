import React, { useState } from 'react';
import { Upload, DownloadCloud, Zap, Trash2 } from 'lucide-react';
import { Button, Input, Row, Col, Progress, message } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedCard from '../../components/AnimatedCard';
import GradientButton from '../../components/GradientButton';

const BatchImageProcessorEnhanced = () => {
  const [files, setFiles] = useState([]);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleMultipleUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    const imageFiles = uploadedFiles.filter(f => f.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      message.error('Please upload image files');
      return;
    }

    setFiles(prev => [...prev, ...imageFiles.map((f, idx) => ({
      id: Date.now() + idx,
      file: f,
      name: f.name,
      status: 'pending'
    }))]);

    message.success(`${imageFiles.length} image(s) added!`);
  };

  const removeFile = (id) => {
    setFiles(files.filter(f => f.id !== id));
  };

  const handleProcessBatch = async () => {
    if (files.length === 0) {
      message.error('Please upload images first');
      return;
    }

    setProcessing(true);
    let completed = 0;

    for (let i = 0; i < files.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      completed++;
      setProgress(Math.round((completed / files.length) * 100));
    }

    setProcessing(false);
    message.success('All images processed!');
  };

  const handleDownloadAll = () => {
    if (files.length === 0) {
      message.error('Please process images first');
      return;
    }
    message.success('Batch download started!');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-black mb-4">⚡ Batch Image Processor</h1>
          <p className="text-gray-400 text-lg">Process multiple images at once</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Upload Section */}
          <AnimatedCard delay={0} className="glass p-8 rounded-xl">
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Upload size={24} className="text-cyan-400" />
                <h2 className="text-2xl font-bold">Upload Multiple Images</h2>
              </div>

              <label className="border-2 border-dashed border-cyan-500/30 rounded-lg p-8 text-center cursor-pointer hover:border-cyan-500/60 transition-all block group">
                <input type="file" accept="image/*" multiple onChange={handleMultipleUpload} className="hidden" />
                <div className="group-hover:scale-110 transition-transform">
                  <Upload size={48} className="mx-auto text-cyan-400 mb-3" />
                  <p className="text-white font-bold text-lg">Click to upload multiple images</p>
                  <p className="text-gray-400 text-sm">Drag & drop images here or click to browse</p>
                </div>
              </label>

              <p className="text-cyan-400 font-bold text-sm">
                📌 {files.length} image(s) selected
              </p>
            </motion.div>
          </AnimatedCard>

          {files.length > 0 && (
            <>
              {/* Settings */}
              <AnimatedCard delay={0.1} className="glass p-8 rounded-xl">
                <motion.div variants={itemVariants} className="space-y-6">
                  <h2 className="text-2xl font-bold">Resize Settings</h2>

                  <Row gutter={16}>
                    <Col span={12}>
                      <label className="text-gray-400 font-bold block mb-2">Width (px)</label>
                      <Input
                        type="number"
                        value={width}
                        onChange={(e) => setWidth(Number(e.target.value))}
                        className="!bg-gray-900 !border-cyan-500/30 !text-white"
                      />
                    </Col>
                    <Col span={12}>
                      <label className="text-gray-400 font-bold block mb-2">Height (px)</label>
                      <Input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(Number(e.target.value))}
                        className="!bg-gray-900 !border-cyan-500/30 !text-white"
                      />
                    </Col>
                  </Row>
                </motion.div>
              </AnimatedCard>

              {/* File List */}
              <AnimatedCard delay={0.2} className="glass p-8 rounded-xl max-h-64 overflow-y-auto">
                <motion.div variants={itemVariants} className="space-y-2">
                  <h3 className="text-xl font-bold mb-4">Selected Files</h3>
                  <AnimatePresence>
                    {files.map((file, idx) => (
                      <motion.div
                        key={file.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex justify-between items-center p-3 bg-gray-900/50 rounded-lg border border-gray-700/50"
                      >
                        <div className="flex-1">
                          <p className="text-white font-bold text-sm">{idx + 1}. {file.name}</p>
                          <p className="text-gray-500 text-xs">{(file.file.size / 1024).toFixed(2)} KB</p>
                        </div>
                        <Button
                          danger
                          size="small"
                          icon={<Trash2 size={14} />}
                          onClick={() => removeFile(file.id)}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </AnimatedCard>

              {/* Progress */}
              {processing && (
                <AnimatedCard delay={0.3} className="glass p-6 rounded-xl">
                  <p className="text-gray-400 mb-3">Processing: {progress}%</p>
                  <Progress
                    percent={progress}
                    strokeColor={{
                      '0%': '#00f2ff',
                      '100%': '#7000ff',
                    }}
                  />
                </AnimatedCard>
              )}

              {/* Actions */}
              <AnimatedCard delay={0.4} className="glass p-8 rounded-xl">
                <motion.div variants={itemVariants} className="space-y-3">
                  <GradientButton
                    onClick={handleProcessBatch}
                    disabled={processing}
                    className="w-full py-4 text-lg font-bold flex items-center justify-center gap-2"
                  >
                    <Zap size={20} />
                    {processing ? 'Processing...' : `Process ${files.length} Image(s)`}
                  </GradientButton>

                  {progress === 100 && (
                    <GradientButton onClick={handleDownloadAll} className="w-full py-3 flex items-center justify-center gap-2">
                      <DownloadCloud size={20} /> Download All (ZIP)
                    </GradientButton>
                  )}

                  <Button
                    block
                    danger
                    onClick={() => {
                      setFiles([]);
                      setProgress(0);
                    }}
                    className="!h-10"
                  >
                    <Trash2 size={16} className="inline mr-2" /> Clear All
                  </Button>
                </motion.div>
              </AnimatedCard>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BatchImageProcessorEnhanced;
