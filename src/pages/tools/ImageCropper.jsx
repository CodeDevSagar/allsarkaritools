import React, { useState, useRef, useEffect } from 'react';
import { Card, Upload, Button, Typography, Row, Col, Space, Select, Slider, message, Tag } from 'antd';
import { Download, ImageIcon, Crop, RotateCw, RefreshCw, ZoomIn, ZoomOut, Check, Info } from 'lucide-react';
import { downloadFile } from '../../utils/downloadHelper';
import ToolContent from '../../components/ToolContent';
import { motion, AnimatePresence } from 'framer-motion';

const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;
const { Option } = Select;

const ImageCropper = () => {
  const [file, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [cropAspect, setCropAspect] = useState('free'); // 'free', '1:1', '3:4', '4:3', '16:9'
  const [rotation, setRotation] = useState(0); // 0, 90, 180, 270
  const [croppedImage, setCroppedImage] = useState(null);
  const [isCropped, setIsCropped] = useState(false);

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  // Crop Box Coordinates (normalized percentages or absolute pixels on display)
  const [cropBox, setCropBox] = useState({ x: 50, y: 50, width: 200, height: 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragBoxStart, setDragBoxStart] = useState({ x: 0, y: 0 });
  const [activeHandle, setActiveHandle] = useState(null); // 'nw', 'ne', 'se', 'sw', 'move'

  const aspectPresets = [
    { label: 'Free Crop', value: 'free' },
    { label: 'Square (1:1)', value: '1:1' },
    { label: 'Passport (3:4)', value: '3:4' },
    { label: 'UPSC / Exam (4:3)', value: '4:3' },
    { label: 'Landscape (16:9)', value: '16:9' }
  ];

  const handleUpload = (info) => {
    const uploadedFile = info.file.originFileObj || info.file;
    if (!uploadedFile || !(uploadedFile instanceof File || uploadedFile instanceof Blob)) return;
    setFile(uploadedFile);
    setImageSrc(URL.createObjectURL(uploadedFile));
    setCroppedImage(null);
    setIsCropped(false);
    setRotation(0);
    // Reset crop box default
    setCropBox({ x: 50, y: 50, width: 200, height: 200 });
  };

  // Adjust crop box aspect ratio when preset changes
  useEffect(() => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    let w = Math.min(200, rect.width - 20);
    let h = Math.min(200, rect.height - 20);

    if (cropAspect === '1:1') {
      const side = Math.min(w, h);
      w = side;
      h = side;
    } else if (cropAspect === '3:4') {
      h = Math.min(rect.height - 20, w * (4 / 3));
      w = h * (3 / 4);
    } else if (cropAspect === '4:3') {
      w = Math.min(rect.width - 20, h * (4 / 3));
      h = w * (3 / 4);
    } else if (cropAspect === '16:9') {
      w = Math.min(rect.width - 20, h * (16 / 9));
      h = w * (9 / 16);
    }

    setCropBox({
      x: (rect.width - w) / 2,
      y: (rect.height - h) / 2,
      width: w,
      height: h
    });
  }, [cropAspect, imageSrc, rotation]);

  const handleMouseDown = (e, handle) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setActiveHandle(handle);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setDragStart({ x: clientX, y: clientY });
    setDragBoxStart({ ...cropBox });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !imageRef.current) return;
    e.preventDefault();

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const dx = clientX - dragStart.x;
    const dy = clientY - dragStart.y;

    const rect = imageRef.current.getBoundingClientRect();
    const maxWidth = rect.width;
    const maxHeight = rect.height;

    let { x, y, width, height } = dragBoxStart;

    if (activeHandle === 'move') {
      x = Math.max(0, Math.min(dragBoxStart.x + dx, maxWidth - width));
      y = Math.max(0, Math.min(dragBoxStart.y + dy, maxHeight - height));
    } else {
      // Resize logic
      let newWidth = width;
      let newHeight = height;
      let newX = x;
      let newY = y;

      if (activeHandle.includes('e')) {
        newWidth = Math.max(30, Math.min(dragBoxStart.width + dx, maxWidth - dragBoxStart.x));
      }
      if (activeHandle.includes('w')) {
        const potentialWidth = dragBoxStart.width - dx;
        if (potentialWidth >= 30) {
          newX = Math.max(0, dragBoxStart.x + dx);
          newWidth = dragBoxStart.width + (dragBoxStart.x - newX);
        }
      }
      if (activeHandle.includes('s')) {
        newHeight = Math.max(30, Math.min(dragBoxStart.height + dy, maxHeight - dragBoxStart.y));
      }
      if (activeHandle.includes('n')) {
        const potentialHeight = dragBoxStart.height - dy;
        if (potentialHeight >= 30) {
          newY = Math.max(0, dragBoxStart.y + dy);
          newHeight = dragBoxStart.height + (dragBoxStart.y - newY);
        }
      }

      // Constrain aspect ratio if not free
      if (cropAspect !== 'free') {
        let ratio = 1;
        if (cropAspect === '1:1') ratio = 1;
        else if (cropAspect === '3:4') ratio = 3 / 4;
        else if (cropAspect === '4:3') ratio = 4 / 3;
        else if (cropAspect === '16:9') ratio = 16 / 9;

        if (activeHandle === 'se' || activeHandle === 'nw' || activeHandle === 'ne' || activeHandle === 'sw') {
          // Maintain aspect based on width changes
          newHeight = newWidth / ratio;
          if (newY + newHeight > maxHeight) {
            newHeight = maxHeight - newY;
            newWidth = newHeight * ratio;
          }
        }
      }

      x = newX;
      y = newY;
      width = newWidth;
      height = newHeight;
    }

    setCropBox({ x, y, width, height });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setActiveHandle(null);
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  const handleCrop = () => {
    if (!imageRef.current || !canvasRef.current) return;
    const image = imageRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Get original resolution aspect
    const naturalWidth = image.naturalWidth;
    const naturalHeight = image.naturalHeight;
    const rect = image.getBoundingClientRect();

    // Scale factor from display to natural dimensions
    const scaleX = naturalWidth / rect.width;
    const scaleY = naturalHeight / rect.height;

    // Calculate source rect
    const sx = cropBox.x * scaleX;
    const sy = cropBox.y * scaleY;
    const sWidth = cropBox.width * scaleX;
    const sHeight = cropBox.height * scaleY;

    // Set canvas dimensions to exact cropped dimensions
    canvas.width = sWidth;
    canvas.height = sHeight;

    // Clear and draw cropped portion
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Apply rotation on output canvas if rotation > 0
    if (rotation !== 0) {
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      
      // We will first draw the original rotated image, then crop.
      // But standard way: draw rotated image on temp, then crop from temp
      tempCanvas.width = naturalWidth;
      tempCanvas.height = naturalHeight;
      tempCtx.translate(naturalWidth / 2, naturalHeight / 2);
      tempCtx.rotate((rotation * Math.PI) / 180);
      tempCtx.drawImage(image, -naturalWidth / 2, -naturalHeight / 2);
      
      ctx.drawImage(tempCanvas, sx, sy, sWidth, sHeight, 0, 0, sWidth, sHeight);
    } else {
      ctx.drawImage(image, sx, sy, sWidth, sHeight, 0, 0, sWidth, sHeight);
    }

    const outputDataUrl = canvas.toDataURL(file.type || 'image/jpeg', 0.95);
    setCroppedImage(outputDataUrl);
    setIsCropped(true);
    message.success('Image cropped successfully!');
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
    setCroppedImage(null);
    setIsCropped(false);
  };

  const handleDownload = () => {
    if (!croppedImage) return;
    const ext = file.name.split('.').pop() || 'jpg';
    downloadFile(croppedImage, `cropped_${Date.now()}.${ext}`);
  };

  return (
    <div className="max-w-7xl mx-auto py-24 px-4 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="responsive-title !text-white !mb-4 tracking-tighter uppercase flex items-center justify-center gap-3">
          <Crop size={38} className="text-[#00f2ff]" /> Smart Image Cropper
        </h1>
        <Paragraph className="!text-gray-400 text-lg sm:text-xl">
          Crop and resize images to exact aspect ratios (Passport, UPSC, SSC exams) 100% locally.
        </Paragraph>
      </div>

      <Row gutter={[32, 32]}>
        {/* Editor Area */}
        <Col xs={24} lg={16}>
          <Card className="glass-card !p-8 h-full flex flex-col justify-between">
            <div className="w-full flex-grow flex items-center justify-center min-h-[350px] bg-black/20 rounded-3xl overflow-hidden border border-white/5 relative p-4">
              {imageSrc ? (
                <div 
                  ref={containerRef}
                  className="relative select-none"
                  onMouseMove={handleMouseMove}
                  onTouchMove={handleMouseMove}
                >
                  <img 
                    ref={imageRef}
                    src={imageSrc} 
                    alt="Source" 
                    className="max-h-[500px] object-contain rounded-lg transition-transform duration-200 pointer-events-none"
                    style={{ transform: `rotate(${rotation}deg)` }}
                    onLoad={() => {
                      // Trigger initial crop coordinates
                      setCropAspect('free');
                    }}
                  />
                  
                  {/* Visual Overlay for Crop Mask */}
                  <div className="absolute inset-0 bg-black/50 pointer-events-none" style={{ pointerEvents: 'none' }} />

                  {/* Highlighting Active Crop Box */}
                  <div 
                    className="absolute border-2 border-[#00f2ff] shadow-[0_0_20px_rgba(0,242,255,0.4)] cursor-move"
                    style={{
                      left: cropBox.x,
                      top: cropBox.y,
                      width: cropBox.width,
                      height: cropBox.height,
                      backgroundImage: `url(${imageSrc})`,
                      backgroundPosition: `-${cropBox.x}px -${cropBox.y}px`,
                      backgroundSize: 'cover', // Will match the container image size
                    }}
                    onMouseDown={(e) => handleMouseDown(e, 'move')}
                    onTouchStart={(e) => handleMouseDown(e, 'move')}
                  >
                    {/* Inner Grid Lines */}
                    <div className="absolute inset-0 border border-white/20 pointer-events-none grid grid-cols-3 grid-rows-3">
                      <div className="border-r border-b border-white/10" />
                      <div className="border-r border-b border-white/10" />
                      <div className="border-b border-white/10" />
                      <div className="border-r border-b border-white/10" />
                      <div className="border-r border-b border-white/10" />
                      <div className="border-b border-white/10" />
                    </div>

                    {/* Corner Handles */}
                    {['nw', 'ne', 'se', 'sw'].map((handle) => (
                      <div
                        key={handle}
                        className={`absolute w-4 h-4 bg-[#00f2ff] border border-white rounded-full ${
                          handle === 'nw' ? 'top-[-6px] left-[-6px] cursor-nwse-resize' :
                          handle === 'ne' ? 'top-[-6px] right-[-6px] cursor-nesw-resize' :
                          handle === 'se' ? 'bottom-[-6px] right-[-6px] cursor-nwse-resize' :
                          'bottom-[-6px] left-[-6px] cursor-nesw-resize'
                        }`}
                        onMouseDown={(e) => handleMouseDown(e, handle)}
                        onTouchStart={(e) => handleMouseDown(e, handle)}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <Dragger
                  accept="image/*"
                  showUploadList={false}
                  beforeUpload={() => false}
                  onChange={handleUpload}
                  className="w-full !bg-white/[0.01] !border-2 !border-dashed !border-white/10 hover:!border-[#00f2ff]/50 !rounded-[2.5rem] transition-all group py-16"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-[#00f2ff]/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,242,255,0.2)]">
                      <ImageIcon size={40} className="text-[#00f2ff]" />
                    </div>
                    <Title level={4} className="!text-white">Upload Your Photo</Title>
                    <Text className="text-gray-500">Supports JPG, PNG, and WebP formats</Text>
                  </div>
                </Dragger>
              )}
            </div>

            {imageSrc && (
              <div className="mt-8 flex flex-wrap gap-4 justify-between items-center border-t border-white/10 pt-6">
                <Space size="middle" className="flex-wrap">
                  <Button 
                    icon={<RotateCw size={16} />} 
                    onClick={handleRotate}
                    className="!bg-white/5 !border-white/10 !text-white hover:!border-[#00f2ff] hover:!text-[#00f2ff]"
                  >
                    Rotate 90°
                  </Button>
                  <Button 
                    onClick={() => {
                      setImageSrc(null);
                      setFile(null);
                      setCroppedImage(null);
                      setIsCropped(false);
                    }}
                    className="!bg-red-500/10 !border-red-500/20 !text-red-400 hover:!bg-red-500/20"
                  >
                    Reset / Upload New
                  </Button>
                </Space>
                <Button 
                  type="primary"
                  icon={<Crop size={18} />} 
                  onClick={handleCrop}
                  className="neon-button font-bold"
                >
                  Crop Selection
                </Button>
              </div>
            )}
          </Card>
        </Col>

        {/* Sidebar Controls */}
        <Col xs={24} lg={8} className="space-y-6">
          <Card className="glass-card !p-6 space-y-6">
            <h3 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2">
              ⚙️ Crop Options
            </h3>
            
            <div className="space-y-2">
              <Text className="text-gray-400 font-bold block uppercase text-[10px] tracking-widest">Aspect Ratio Preset</Text>
              <Select 
                value={cropAspect} 
                onChange={setCropAspect} 
                className="w-full !bg-[#0c0721] !border-white/10 !text-white custom-select-glow"
                dropdownClassName="!bg-[#0c0721] !border-white/10 !text-white"
                disabled={!imageSrc}
              >
                {aspectPresets.map((preset) => (
                  <Option key={preset.value} value={preset.value}>{preset.label}</Option>
                ))}
              </Select>
            </div>

            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">
                <Info size={14} /> Preset Guidelines
              </div>
              <p className="text-gray-500 text-[11px] leading-relaxed">
                Use **Passport (3:4)** ratio for state/central government application forms. Use **Square (1:1)** for general photo uploads.
              </p>
            </div>
          </Card>

          {/* Export / Cropped Output */}
          <AnimatePresence>
            {isCropped && croppedImage && (
              <Card className="glass-card !p-6 border-[#00f2ff]/30 shadow-[0_0_30px_rgba(0,242,255,0.15)] text-center space-y-6">
                <div className="w-16 h-16 bg-[#00f2ff]/10 rounded-full flex items-center justify-center mx-auto">
                  <Check size={32} className="text-[#00f2ff]" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-white font-sans">Cropped Image Ready!</h4>
                  <Text className="text-gray-500 text-xs">High-resolution export generated completely in-browser.</Text>
                </div>
                
                <div className="bg-black/30 p-2 rounded-2xl max-h-[200px] overflow-hidden flex items-center justify-center">
                  <img src={croppedImage} alt="Cropped preview" className="max-h-[180px] rounded-lg shadow-md object-contain" />
                </div>

                <Button
                  type="primary"
                  size="large"
                  icon={<Download size={20} />}
                  onClick={handleDownload}
                  className="w-full !bg-[#00f2ff] !text-black font-black !h-12 rounded-xl shadow-lg hover:shadow-[#00f2ff]/50 transition-all duration-300"
                >
                  Download Cropped Photo
                </Button>
              </Card>
            )}
          </AnimatePresence>
        </Col>
      </Row>

      {/* Hidden Canvas for Canvas Cropping operations */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* SEO / Instruction block */}
      <ToolContent toolKey="image-crop" />
    </div>
  );
};

export default ImageCropper;
