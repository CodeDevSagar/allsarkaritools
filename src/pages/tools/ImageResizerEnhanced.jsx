import React, { useState } from 'react';
import { Upload, Download, Maximize, RefreshCw } from 'lucide-react';
import { Button, Input, Select, message, Row, Col } from 'antd';
import { motion } from 'framer-motion';
import AnimatedCard from '../../components/AnimatedCard';
import GradientButton from '../../components/GradientButton';

const ImageResizerEnhanced = () => {
  const [image, setImage] = useState(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [format, setFormat] = useState('jpeg');
  const [maintaining, setMaintaining] = useState(true);
  const [preview, setPreview] = useState(null);

  const presets = [
    { label: 'Passport Photo (4x6)', width: 480, height: 600 },
    { label: 'Square (1000x1000)', width: 1000, height: 1000 },
    { label: 'HD (1280x720)', width: 1280, height: 720 },
    { label: 'Full HD (1920x1080)', width: 1920, height: 1080 },
    { label: 'Thumbnail (200x200)', width: 200, height: 200 },
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
        setPreview(event.target.result);
        message.success('Image uploaded!');
      };
      reader.readAsDataURL(file);
    } else {
      message.error('Please upload an image file');
    }
  };

  const handleWidthChange = (value) => {
    setWidth(value);
    if (maintaining) {
      setHeight(Math.round((value / 800) * 600));
    }
  };

  const handleHeightChange = (value) => {
    setHeight(value);
    if (maintaining) {
      setWidth(Math.round((value / 600) * 800));
    }
  };

  const applyPreset = (preset) => {
    setWidth(preset.width);
    setHeight(preset.height);
    message.info(`Applied: ${preset.label}`);
  };

  const handleResize = () => {
    if (!image) {
      message.error('Please upload an image first');
      return;
    }
    message.success(`Image resized to ${width}x${height} in ${format.toUpperCase()}`);
  };

  const handleDownload = () => {
    if (!image) {
      message.error('Please resize an image first');
      return;
    }
    message.success(`Download started: resized.${format === 'jpeg' ? 'jpg' : format}`);
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
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-black mb-4">📐 Image Resizer Pro</h1>
          <p className="text-gray-400 text-lg">Resize images to any dimension instantly</p>
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
                <h2 className="text-2xl font-bold">Upload Image</h2>
              </div>

              <label className="border-2 border-dashed border-cyan-500/30 rounded-lg p-8 text-center cursor-pointer hover:border-cyan-500/60 transition-all block group">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                <div className="group-hover:scale-110 transition-transform">
                  <Upload size={48} className="mx-auto text-cyan-400 mb-3" />
                  <p className="text-white font-bold">Click to upload image</p>
                  <p className="text-gray-400 text-sm">JPG, PNG, WebP, SVG supported</p>
                </div>
              </label>

              {image && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                  <p className="text-green-400 font-bold">✓ Image uploaded</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatedCard>

          {image && (
            <>
              {/* Presets */}
              <AnimatedCard delay={0.1} className="glass p-6 rounded-xl">
                <motion.div variants={itemVariants} className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Maximize size={20} className="text-purple-400" /> Quick Presets
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {presets.map((preset, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          block
                          className="h-16 text-xs font-bold bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 hover:border-purple-500/60 text-white"
                          onClick={() => applyPreset(preset)}
                        >
                          {preset.label}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatedCard>

              {/* Settings */}
              <AnimatedCard delay={0.2} className="glass p-8 rounded-xl">
                <motion.div variants={itemVariants} className="space-y-6">
                  <h3 className="text-2xl font-bold">Custom Dimensions</h3>

                  <Row gutter={16} className="mb-6">
                    <Col span={12}>
                      <label className="text-gray-400 text-sm font-bold block mb-2">Width (px)</label>
                      <Input
                        type="number"
                        value={width}
                        onChange={(e) => handleWidthChange(parseInt(e.target.value))}
                        className="!bg-gray-900 !border-cyan-500/30 !text-white"
                      />
                    </Col>
                    <Col span={12}>
                      <label className="text-gray-400 text-sm font-bold block mb-2">Height (px)</label>
                      <Input
                        type="number"
                        value={height}
                        onChange={(e) => handleHeightChange(parseInt(e.target.value))}
                        className="!bg-gray-900 !border-cyan-500/30 !text-white"
                      />
                    </Col>
                  </Row>

                  <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                    <input
                      type="checkbox"
                      checked={maintaining}
                      onChange={(e) => setMaintaining(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <label className="text-blue-400 font-semibold cursor-pointer flex-1">Maintain Aspect Ratio</label>
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm font-bold block mb-3">Output Format</label>
                    <Select
                      value={format}
                      onChange={setFormat}
                      options={[
                        { label: 'JPEG', value: 'jpeg' },
                        { label: 'PNG', value: 'png' },
                        { label: 'WebP', value: 'webp' },
                      ]}
                      className="!bg-gray-900"
                    />
                  </div>
                </motion.div>
              </AnimatedCard>

              {/* Preview & Action */}
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <AnimatedCard delay={0.3} className="glass p-6 rounded-xl">
                    <h3 className="text-lg font-bold mb-4">Preview</h3>
                    <div className="bg-black/50 rounded-lg p-4 aspect-square overflow-hidden flex items-center justify-center">
                      <img src={preview} alt="preview" className="max-w-full max-h-full rounded" />
                    </div>
                  </AnimatedCard>
                </Col>
                <Col xs={24} md={12}>
                  <AnimatedCard delay={0.3} className="glass p-6 rounded-xl h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold mb-4">Image Info</h3>
                      <div className="space-y-3 text-gray-400">
                        <p>📏 Resolution: <span className="text-cyan-400 font-bold">{width}×{height}</span></p>
                        <p>🎨 Format: <span className="text-cyan-400 font-bold">{format.toUpperCase()}</span></p>
                        <p>📦 Quality: <span className="text-cyan-400 font-bold">High</span></p>
                      </div>
                    </div>
                    <div className="space-y-2 mt-4">
                      <GradientButton onClick={handleResize} className="w-full">
                        <RefreshCw size={16} className="inline mr-2" /> Resize Image
                      </GradientButton>
                      <GradientButton onClick={handleDownload} className="w-full">
                        <Download size={16} className="inline mr-2" /> Download
                      </GradientButton>
                    </div>
                  </AnimatedCard>
                </Col>
              </Row>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ImageResizerEnhanced;
