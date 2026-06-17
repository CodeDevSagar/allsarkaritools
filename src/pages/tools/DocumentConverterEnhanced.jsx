import React, { useState } from 'react';
import { Upload, Download, FileText, Zap } from 'lucide-react';
import { Button, Select, message, Spin } from 'antd';
import { motion } from 'framer-motion';
import AnimatedCard from '../../components/AnimatedCard';
import GradientButton from '../../components/GradientButton';

const DocumentConverterEnhanced = () => {
  const [file, setFile] = useState(null);
  const [converting, setConverting] = useState(false);
  const [fromFormat, setFromFormat] = useState('pdf');
  const [toFormat, setToFormat] = useState('docx');

  const supportedFormats = {
    pdf: { label: 'PDF', icon: '📄', extensions: ['.pdf'] },
    docx: { label: 'Word (DOCX)', icon: '📝', extensions: ['.docx', '.doc'] },
    txt: { label: 'Text (TXT)', icon: '📋', extensions: ['.txt'] },
    xlsx: { label: 'Excel (XLSX)', icon: '📊', extensions: ['.xlsx', '.xls'] },
    pptx: { label: 'PowerPoint (PPTX)', icon: '🎞️', extensions: ['.pptx', '.ppt'] },
    jpg: { label: 'Image (JPG)', icon: '🖼️', extensions: ['.jpg', '.jpeg'] },
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      message.success(`${uploadedFile.name} uploaded!`);
    }
  };

  const handleConvert = async () => {
    if (!file) {
      message.error('Please upload a file first');
      return;
    }

    setConverting(true);
    // Simulate conversion
    setTimeout(() => {
      setConverting(false);
      message.success(`Converted to ${supportedFormats[toFormat].label}!`);
    }, 2000);
  };

  const handleDownload = () => {
    if (!file) {
      message.error('Please convert a file first');
      return;
    }
    message.success(`Download: ${file.name.split('.')[0]}.${toFormat}`);
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
          <h1 className="text-4xl md:text-5xl font-black mb-4">🔄 Document Converter</h1>
          <p className="text-gray-400 text-lg">Convert between multiple file formats</p>
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
                <h2 className="text-2xl font-bold">Upload Document</h2>
              </div>

              <label className="border-2 border-dashed border-cyan-500/30 rounded-lg p-8 text-center cursor-pointer hover:border-cyan-500/60 transition-all block group">
                <input type="file" onChange={handleFileUpload} className="hidden" />
                <div className="group-hover:scale-110 transition-transform">
                  <Upload size={48} className="mx-auto text-cyan-400 mb-3" />
                  <p className="text-white font-bold text-lg">Click to upload document</p>
                  <p className="text-gray-400 text-sm">Support all formats (PDF, Word, Excel, etc.)</p>
                </div>
              </label>

              {file && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg"
                >
                  <p className="text-green-400 font-bold">✓ {file.name}</p>
                  <p className="text-gray-400 text-sm">{(file.size / 1024).toFixed(2)} KB</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatedCard>

          {file && (
            <>
              {/* Format Selection */}
              <AnimatedCard delay={0.1} className="glass p-8 rounded-xl">
                <motion.div variants={itemVariants} className="space-y-6">
                  <h2 className="text-2xl font-bold">Select Formats</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-gray-400 font-bold block mb-3">From Format</label>
                      <Select
                        value={fromFormat}
                        onChange={setFromFormat}
                        options={Object.entries(supportedFormats).map(([key, val]) => ({
                          label: `${val.icon} ${val.label}`,
                          value: key,
                        }))}
                      />
                    </div>

                    <div>
                      <label className="text-gray-400 font-bold block mb-3">To Format</label>
                      <Select
                        value={toFormat}
                        onChange={setToFormat}
                        options={Object.entries(supportedFormats)
                          .filter(([key]) => key !== fromFormat)
                          .map(([key, val]) => ({
                            label: `${val.icon} ${val.label}`,
                            value: key,
                          }))}
                      />
                    </div>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-blue-400">
                      📢 Converting {supportedFormats[fromFormat].label} to {supportedFormats[toFormat].label}
                    </p>
                  </div>
                </motion.div>
              </AnimatedCard>

              {/* Action Section */}
              <AnimatedCard delay={0.2} className="glass p-8 rounded-xl">
                <motion.div variants={itemVariants} className="space-y-4">
                  <GradientButton
                    onClick={handleConvert}
                    disabled={converting}
                    className="w-full py-4 text-lg font-bold flex items-center justify-center gap-2"
                  >
                    {converting ? (
                      <>
                        <Spin size="small" /> Converting...
                      </>
                    ) : (
                      <>
                        <Zap size={20} /> Convert Document
                      </>
                    )}
                  </GradientButton>

                  {!converting && (
                    <GradientButton onClick={handleDownload} className="w-full py-3 flex items-center justify-center gap-2">
                      <Download size={20} /> Download Converted File
                    </GradientButton>
                  )}
                </motion.div>
              </AnimatedCard>

              {/* Supported Formats */}
              <AnimatedCard delay={0.3} className="glass p-6 rounded-xl">
                <h3 className="text-lg font-bold mb-4">✨ Supported Formats</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries(supportedFormats).map(([key, val]) => (
                    <div key={key} className="bg-white/5 p-3 rounded-lg text-center">
                      <p className="text-2xl mb-1">{val.icon}</p>
                      <p className="text-white font-bold text-sm">{val.label}</p>
                    </div>
                  ))}
                </div>
              </AnimatedCard>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DocumentConverterEnhanced;
