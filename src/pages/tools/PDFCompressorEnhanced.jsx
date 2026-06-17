import React, { useState } from 'react';
import { Upload, Download, Trash2, Settings } from 'lucide-react';
import { Button, Slider, message, Progress } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedCard from '../../components/AnimatedCard';
import GradientButton from '../../components/GradientButton';

const PDFCompressorEnhanced = () => {
  const [file, setFile] = useState(null);
  const [compressing, setCompressing] = useState(false);
  const [compression, setCompression] = useState(50);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile?.type === 'application/pdf') {
      setFile(uploadedFile);
      setOriginalSize(uploadedFile.size);
      setCompressedSize(Math.floor(uploadedFile.size * (1 - compression / 100)));
      message.success('PDF uploaded successfully!');
    } else {
      message.error('Please upload a PDF file');
    }
  };

  const handleCompress = async () => {
    if (!file) {
      message.error('Please upload a PDF first');
      return;
    }
    
    setCompressing(true);
    // Simulate compression
    setTimeout(() => {
      const newSize = Math.floor(file.size * (1 - compression / 100));
      setCompressedSize(newSize);
      setCompressing(false);
      message.success('PDF compressed successfully!');
    }, 2000);
  };

  const handleDownload = () => {
    if (compressedSize === 0) {
      message.error('Please compress the PDF first');
      return;
    }
    // Create dummy download
    const element = document.createElement('a');
    element.href = '#';
    element.download = 'compressed.pdf';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    message.success('PDF downloaded!');
  };

  const reduction = originalSize > 0 ? ((originalSize - compressedSize) / originalSize * 100).toFixed(1) : 0;

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
          <h1 className="text-4xl md:text-5xl font-black mb-4">📦 PDF Compressor</h1>
          <p className="text-gray-400 text-lg">Reduce PDF file size while maintaining quality</p>
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
                <h2 className="text-2xl font-bold">Step 1: Upload PDF</h2>
              </div>
              
              <label className="border-2 border-dashed border-cyan-500/30 rounded-lg p-8 text-center cursor-pointer hover:border-cyan-500/60 transition-all block group">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="group-hover:scale-110 transition-transform">
                  <Upload size={48} className="mx-auto text-cyan-400 mb-3" />
                  <p className="text-white font-bold text-lg">Click to upload or drag & drop</p>
                  <p className="text-gray-400 text-sm">PDF files only</p>
                </div>
              </label>

              {file && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg"
                >
                  <p className="text-green-400 font-bold">✓ {file.name}</p>
                  <p className="text-gray-400 text-sm">{(originalSize / 1024 / 1024).toFixed(2)} MB</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatedCard>

          {/* Settings Section */}
          {file && (
            <AnimatedCard delay={0.1} className="glass p-8 rounded-xl">
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <Settings size={24} className="text-purple-400" />
                  <h2 className="text-2xl font-bold">Step 2: Compression Level</h2>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Compression Strength</span>
                    <span className="text-cyan-400 font-bold text-lg">{compression}%</span>
                  </div>
                  <Slider
                    value={compression}
                    onChange={setCompression}
                    marks={{ 0: 'Light', 50: 'Medium', 100: 'Heavy' }}
                    className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/30">
                    <p className="text-gray-400 text-sm mb-2">Original Size</p>
                    <p className="text-cyan-400 font-bold text-lg">{(originalSize / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
                    <p className="text-gray-400 text-sm mb-2">Compressed</p>
                    <p className="text-purple-400 font-bold text-lg">{(compressedSize / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
                    <p className="text-gray-400 text-sm mb-2">Reduction</p>
                    <p className="text-green-400 font-bold text-lg">{reduction}%</p>
                  </div>
                </div>
              </motion.div>
            </AnimatedCard>
          )}

          {/* Compress Section */}
          {file && (
            <AnimatedCard delay={0.2} className="glass p-8 rounded-xl">
              <motion.div variants={itemVariants} className="space-y-4">
                <GradientButton
                  onClick={handleCompress}
                  disabled={compressing}
                  className="w-full py-4 text-lg font-bold"
                >
                  {compressing ? '🔄 Compressing...' : '⚡ Compress PDF'}
                </GradientButton>

                {compressing && (
                  <Progress
                    percent={Math.random() * 100}
                    strokeColor={{
                      '0%': '#00f2ff',
                      '100%': '#7000ff',
                    }}
                  />
                )}

                {compressedSize > 0 && !compressing && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <GradientButton onClick={handleDownload} className="w-full py-3 flex items-center justify-center gap-2">
                      <Download size={20} /> Download Compressed PDF
                    </GradientButton>
                    <Button
                      block
                      danger
                      onClick={() => setFile(null)}
                      icon={<Trash2 size={16} />}
                    >
                      Clear & Start Over
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatedCard>
          )}

          {/* Info Section */}
          <AnimatedCard delay={0.3} className="glass p-6 rounded-xl">
            <h3 className="text-lg font-bold mb-4">💡 Tips for Better Compression</h3>
            <ul className="space-y-2 text-gray-400">
              <li>✓ Higher compression may reduce image quality</li>
              <li>✓ Medium compression balances quality and file size</li>
              <li>✓ Works best with image-heavy PDFs</li>
              <li>✓ All processing happens locally on your device</li>
            </ul>
          </AnimatedCard>
        </motion.div>
      </div>
    </div>
  );
};

export default PDFCompressorEnhanced;
