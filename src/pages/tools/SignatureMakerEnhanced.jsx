import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button, Input, message, Slider, ColorPicker, Space, Divider } from 'antd';
import { Download, Copy, RotateCcw, Type } from 'lucide-react';
import html2canvas from 'html2canvas';
import GradientButton from '../../components/GradientButton';
import AnimatedCard from '../../components/AnimatedCard';

const SignatureMaker = () => {
  const canvasRef = useRef();
  const [isDrawing, setIsDrawing] = useState(false);
  const [signatureName, setSignatureName] = useState('');
  const [fontSize, setFontSize] = useState(48);
  const [fontFamily, setFontFamily] = useState('cursive');
  const [color, setColor] = useState('#00f2ff');
  const [ctx, setCtx] = useState(null);

  // Initialize canvas
  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width, canvas.height);
      setCtx(context);
    }
  };

  React.useEffect(() => {
    initCanvas();
  }, []);

  // Draw signature
  const drawSignature = () => {
    if (!ctx || !signatureName) return;

    const canvas = canvasRef.current;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = color || '#00f2ff';
    ctx.font = `bold ${fontSize}px ${fontFamily}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0, 242, 255, 0.5)';
    ctx.shadowBlur = 10;
    ctx.fillText(signatureName, canvas.width / 2, canvas.height / 2);
  };

  React.useEffect(() => {
    drawSignature();
  }, [signatureName, fontSize, fontFamily, color, ctx]);

  const downloadSignature = async () => {
    if (!signatureName) {
      message.error('Please enter your name');
      return;
    }

    try {
      const canvas = canvasRef.current;
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `${signatureName}_signature.png`;
      link.click();
      message.success('Signature downloaded successfully!');
    } catch (error) {
      message.error('Failed to download signature');
    }
  };

  const copySignature = () => {
    const canvas = canvasRef.current;
    canvas.toBlob((blob) => {
      navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      message.success('Signature copied to clipboard!');
    });
  };

  return (
    <div className="min-h-screen py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto px-4"
      >
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black mb-4 gradient-text">Signature Maker</h1>
          <p className="text-xl text-gray-300">Create a professional digital signature</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="lg:col-span-1">
            <AnimatedCard className="glass p-6 rounded-xl">
              <h2 className="text-xl font-bold mb-6">Customize</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Your Name</label>
                  <Input
                    placeholder="Enter your full name"
                    value={signatureName}
                    onChange={(e) => setSignatureName(e.target.value)}
                    size="large"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Font Style</label>
                  <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    className="w-full p-2 bg-gray-800 border border-cyan-500/50 rounded-lg text-white"
                  >
                    <option value="cursive">Cursive</option>
                    <option value="serif">Serif</option>
                    <option value="sans-serif">Sans-Serif</option>
                    <option value="monospace">Monospace</option>
                    <option value="fantasy">Fantasy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Font Size: {fontSize}px</label>
                  <Slider
                    value={fontSize}
                    onChange={setFontSize}
                    min={20}
                    max={100}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-12 h-10 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="flex-1 p-2 bg-gray-800 border border-cyan-500/50 rounded-lg text-white text-sm"
                    />
                  </div>
                </div>

                <Divider />

                <div className="flex flex-col gap-2">
                  <GradientButton onClick={downloadSignature} className="w-full">
                    <Download size={18} className="inline mr-2" />
                    Download PNG
                  </GradientButton>
                  <GradientButton onClick={copySignature} className="w-full bg-gradient-to-r from-purple-500 to-pink-600">
                    <Copy size={18} className="inline mr-2" />
                    Copy to Clipboard
                  </GradientButton>
                  <GradientButton onClick={() => { setSignatureName(''); initCanvas(); }} className="w-full bg-gradient-to-r from-gray-600 to-gray-800">
                    <RotateCcw size={18} className="inline mr-2" />
                    Clear
                  </GradientButton>
                </div>
              </div>
            </AnimatedCard>
          </div>

          {/* Canvas Preview */}
          <div className="lg:col-span-2">
            <AnimatedCard className="glass p-6 rounded-xl">
              <h2 className="text-xl font-bold mb-4">Preview</h2>
              <canvas
                ref={canvasRef}
                width={600}
                height={200}
                className="w-full border-2 border-cyan-500/50 rounded-lg bg-white mb-4"
              />
              <p className="text-sm text-gray-400 text-center">Your signature will appear above</p>
            </AnimatedCard>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignatureMaker;
