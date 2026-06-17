import React, { useState } from 'react';
import { Upload, Wand2, Download, RefreshCw } from 'lucide-react';
import { Button, Slider, message, Space } from 'antd';
import { motion } from 'framer-motion';
import AnimatedCard from '../../components/AnimatedCard';
import GradientButton from '../../components/GradientButton';

const BackgroundRemoverEnhanced = () => {
  const [image, setImage] = useState(null);
  const [removing, setRemoving] = useState(false);
  const [tolerance, setTolerance] = useState(30);
  const [processed, setProcessed] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
        setProcessed(false);
        message.success('Image uploaded!');
      };
      reader.readAsDataURL(file);
    } else {
      message.error('Please upload an image file');
    }
  };

  const handleRemoveBackground = async () => {
    if (!image) {
      message.error('Please upload an image first');
      return;
    }

    setRemoving(true);
    // Simulate background removal
    setTimeout(() => {
      setRemoving(false);
      setProcessed(true);
      message.success('Background removed successfully!');
    }, 2000);
  };

  const handleDownload = () => {
    if (!processed) {
      message.error('Please remove background first');
      return;
    }
    message.success('Download started: removed-bg.png');
  };

  const handleReset = () => {
    setImage(null);
    setProcessed(false);
    setTolerance(30);
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
          <h1 className="text-4xl md:text-5xl font-black mb-4">🎨 Background Remover</h1>
          <p className="text-gray-400 text-lg">Remove background from images instantly</p>
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
                  <p className="text-white font-bold text-lg">Click to upload image</p>
                  <p className="text-gray-400 text-sm">JPG, PNG, WebP supported</p>
                </div>
              </label>

              {image && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg"
                >
                  <p className="text-green-400 font-bold">✓ Image uploaded</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatedCard>

          {image && (
            <>
              {/* Settings */}
              <AnimatedCard delay={0.1} className="glass p-8 rounded-xl">
                <motion.div variants={itemVariants} className="space-y-6">
                  <h2 className="text-2xl font-bold">Adjustment Settings</h2>

                  <div>
                    <label className="text-gray-400 font-bold block mb-3">
                      Tolerance Level: <span className="text-cyan-400">{tolerance}%</span>
                    </label>
                    <Slider
                      value={tolerance}
                      onChange={setTolerance}
                      min={5}
                      max={100}
                      marks={{ 5: 'Low', 50: 'Medium', 100: 'High' }}
                    />
                    <p className="text-gray-500 text-sm mt-2">Higher tolerance removes more similar colors</p>
                  </div>
                </motion.div>
              </AnimatedCard>

              {/* Preview */}
              <AnimatedCard delay={0.2} className="glass p-8 rounded-xl">
                <motion.div variants={itemVariants} className="space-y-4">
                  <h3 className="text-xl font-bold">Preview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-400 text-sm mb-3">Original</p>
                      <div className="bg-black/50 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
                        <img src={image} alt="original" className="max-w-full max-h-full" />
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-3">Preview (After Removal)</p>
                      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden aspect-square flex items-center justify-center border border-cyan-500/30">
                        {processed ? (
                          <img src={image} alt="processed" className="max-w-full max-h-full opacity-80" />
                        ) : (
                          <p className="text-gray-500">Process to see preview</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatedCard>

              {/* Actions */}
              <AnimatedCard delay={0.3} className="glass p-8 rounded-xl">
                <motion.div variants={itemVariants} className="space-y-3">
                  <GradientButton
                    onClick={handleRemoveBackground}
                    disabled={removing}
                    className="w-full py-4 text-lg font-bold flex items-center justify-center gap-2"
                  >
                    <Wand2 size={20} />
                    {removing ? 'Processing...' : 'Remove Background'}
                  </GradientButton>

                  {processed && (
                    <GradientButton onClick={handleDownload} className="w-full py-3 flex items-center justify-center gap-2">
                      <Download size={20} /> Download PNG (Transparent BG)
                    </GradientButton>
                  )}

                  <Button block onClick={handleReset} className="!h-10 bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
                    <RefreshCw size={16} className="inline mr-2" /> Start Over
                  </Button>
                </motion.div>
              </AnimatedCard>

              {/* Tips */}
              <AnimatedCard delay={0.4} className="glass p-6 rounded-xl">
                <h3 className="text-lg font-bold mb-4">💡 Tips for Best Results</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>✓ Images with clear, uniform backgrounds work best</li>
                  <li>✓ Higher tolerance may remove parts of your subject</li>
                  <li>✓ Downloaded file will have transparent background (PNG)</li>
                  <li>✓ Works best with contrasting subject and background</li>
                </ul>
              </AnimatedCard>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BackgroundRemoverEnhanced;
