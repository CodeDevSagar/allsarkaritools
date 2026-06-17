import React, { useEffect, useRef, useState } from 'react';
import { Card, Button, Space, Typography, Row, Col, message, Slider, Divider, Tag, Input, Segmented } from 'antd';
import { Eraser, Download, Shield, Palette, Type, Edit3, RotateCw } from 'lucide-react';
import { Canvas, PencilBrush } from 'fabric';
import { downloadFile } from '../../utils/downloadHelper';

const { Text, Paragraph } = Typography;

const FONTS = [
  { name: 'Alex Brush', family: 'Alex Brush' },
  { name: 'Allison', family: 'Allison' },
  { name: 'Allura', family: 'Allura' },
  { name: 'Arizonia', family: 'Arizonia' },
  { name: 'Bad Script', family: 'Bad Script' },
  { name: 'Bilbo Swash Caps', family: 'Bilbo Swash Caps' },
  { name: 'Calligraffitti', family: 'Calligraffitti' },
  { name: 'Caveat', family: 'Caveat' },
  { name: 'Cherish', family: 'Cherish' },
  { name: 'Clicker Script', family: 'Clicker Script' },
  { name: 'Cookie', family: 'Cookie' },
  { name: 'Courgette', family: 'Courgette' },
  { name: 'Damion', family: 'Damion' },
  { name: 'Dancing Script', family: 'Dancing Script' },
  { name: 'Ephesis', family: 'Ephesis' },
  { name: 'Festive', family: 'Festive' },
  { name: 'Fleur De Leah', family: 'Fleur De Leah' },
  { name: 'Great Vibes', family: 'Great Vibes' },
  { name: 'Handlee', family: 'Handlee' },
  { name: 'Herr Von Muellerhoff', family: 'Herr Von Muellerhoff' },
  { name: 'Italianno', family: 'Italianno' },
  { name: 'Kaushan Script', family: 'Kaushan Script' },
  { name: 'Love Light', family: 'Love Light' },
  { name: 'Marck Script', family: 'Marck Script' },
  { name: 'Meddon', family: 'Meddon' },
  { name: 'Meow Script', family: 'Meow Script' },
  { name: 'Montez', family: 'Montez' },
  { name: 'Mrs Saint Delafield', family: 'Mrs Saint Delafield' },
  { name: 'Mrs Sheppards', family: 'Mrs Sheppards' },
  { name: 'Nothing You Could Do', family: 'Nothing You Could Do' },
  { name: 'Pacifico', family: 'Pacifico' },
  { name: 'Parisienne', family: 'Parisienne' },
  { name: 'Pinyon Script', family: 'Pinyon Script' },
  { name: 'Playball', family: 'Playball' },
  { name: 'Qwigley', family: 'Qwigley' },
  { name: 'Reenie Beanie', family: 'Reenie Beanie' },
  { name: 'Rochester', family: 'Rochester' },
  { name: 'Sacramento', family: 'Sacramento' },
  { name: 'Satisfy', family: 'Satisfy' },
  { name: 'Shadows Into Light', family: 'Shadows Into Light' },
  { name: 'Stalemate', family: 'Stalemate' },
  { name: 'Tangerine', family: 'Tangerine' },
  { name: 'WindSong', family: 'WindSong' },
  { name: 'Yellowtail', family: 'Yellowtail' },
  { name: 'Zeyada', family: 'Zeyada' }
];

const SignatureMaker = () => {
  // Mode Selection
  const [activeMode, setActiveMode] = useState('Draw'); // 'Draw' | 'Type'

  // Drawing Mode States
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [drawColor, setDrawColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(3);
  const [drawMode, setDrawMode] = useState('draw'); // 'draw' | 'move'

  // Type Mode States
  const typeCanvasRef = useRef(null);
  const [typedText, setTypedText] = useState('Your Name');
  const [selectedFont, setSelectedFont] = useState('Alex Brush');
  const [typeColor, setTypeColor] = useState('#000000');
  const [typeFontSize, setTypeFontSize] = useState(60);
  const [slant, setSlant] = useState(0);

  // Initialize Fabric Canvas for Drawing Mode
  useEffect(() => {
    if (activeMode !== 'Draw') return;

    const fabricCanvas = new Canvas(canvasRef.current, {
      isDrawingMode: true,
      width: 700,
      height: 350,
      backgroundColor: '#ffffff',
    });

    fabricCanvas.freeDrawingBrush = new PencilBrush(fabricCanvas);
    fabricCanvas.freeDrawingBrush.color = drawColor;
    fabricCanvas.freeDrawingBrush.width = brushSize;

    setCanvas(fabricCanvas);

    return () => {
      fabricCanvas.dispose();
      setCanvas(null);
    };
  }, [activeMode]);

  // Update Drawing brush styles
  useEffect(() => {
    if (canvas) {
      canvas.isDrawingMode = drawMode === 'draw';
      canvas.freeDrawingBrush.color = drawColor;
      canvas.freeDrawingBrush.width = brushSize;
    }
  }, [drawColor, brushSize, drawMode, canvas]);

  // Render Type Signature whenever text or parameters change
  useEffect(() => {
    if (activeMode !== 'Type') return;
    drawTypeSignature();
  }, [activeMode, typedText, selectedFont, typeColor, typeFontSize, slant]);

  const drawTypeSignature = () => {
    const canvasEl = typeCanvasRef.current;
    if (!canvasEl) return;
    const ctx = canvasEl.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    
    // Fill canvas with white background for preview
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
    
    // Set text font, alignment
    ctx.fillStyle = typeColor;
    ctx.font = `${typeFontSize}px "${selectedFont}", cursive, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Apply slant rotation
    ctx.save();
    ctx.translate(canvasEl.width / 2, canvasEl.height / 2);
    ctx.rotate((slant * Math.PI) / 180);
    
    ctx.fillText(typedText || 'Signature', 0, 0);
    ctx.restore();
  };

  const clearDrawCanvas = () => {
    if (canvas) {
      canvas.clear();
      canvas.backgroundColor = '#ffffff';
      canvas.renderAll();
      message.info('Canvas cleared');
    }
  };

  const downloadDrawSignature = () => {
    if (!canvas || canvas.getObjects().length === 0) {
      return message.warning('Please draw your signature first');
    }

    canvas.backgroundColor = null;
    canvas.renderAll();
    
    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1,
    });
    
    downloadFile(dataURL, `signature-${Date.now()}.png`);
    
    canvas.backgroundColor = '#ffffff';
    canvas.renderAll();
    message.success('Signature downloaded as transparent PNG!');
  };

  const downloadTypeSignature = () => {
    if (!typedText) {
      return message.warning('Please enter some text first');
    }
    
    // Create transparent export canvas
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 700;
    tempCanvas.height = 350;
    const tempCtx = tempCanvas.getContext('2d');
    
    tempCtx.fillStyle = typeColor;
    tempCtx.font = `${typeFontSize}px "${selectedFont}", cursive, sans-serif`;
    tempCtx.textAlign = 'center';
    tempCtx.textBaseline = 'middle';
    
    tempCtx.save();
    tempCtx.translate(tempCanvas.width / 2, tempCanvas.height / 2);
    tempCtx.rotate((slant * Math.PI) / 180);
    tempCtx.fillText(typedText, 0, 0);
    tempCtx.restore();
    
    const dataURL = tempCanvas.toDataURL('image/png');
    downloadFile(dataURL, `typed-signature-${Date.now()}.png`);
    message.success('Signature downloaded as transparent PNG!');
  };

  const renderInkSelector = (colorVal, setColorVal) => (
    <div>
      <Text className="text-gray-400 font-bold block mb-4 uppercase text-[10px] tracking-widest">Ink Selection</Text>
      <div className="flex gap-4">
        {[
          { val: '#000000', label: 'Black' },
          { val: '#0000FF', label: 'Blue' },
          { val: '#FF0000', label: 'Red' }
        ].map(c => (
          <button 
            key={c.val}
            onClick={() => setColorVal(c.val)}
            className={`w-12 h-12 rounded-2xl border-4 transition-all ${colorVal === c.val ? 'border-primary scale-110 shadow-lg' : 'border-transparent opacity-50 hover:opacity-100'}`}
            style={{ backgroundColor: c.val }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto py-24 px-4">
      <div className="text-center mb-10">
        <h1 className="responsive-title !text-white !mb-4 tracking-tighter uppercase">Signature Studio</h1>
        <Paragraph className="!text-gray-400 text-lg sm:text-xl">Create high-resolution transparent signatures. Visibility fixed for all devices.</Paragraph>
        
        <div className="mt-8 flex justify-center">
          <Segmented
            value={activeMode}
            onChange={setActiveMode}
            options={[
              { label: 'Draw Signature', value: 'Draw', icon: <Edit3 size={16} /> },
              { label: 'Type Signature', value: 'Type', icon: <Type size={16} /> }
            ]}
            size="large"
            className="glass-card !p-1 !rounded-2xl border border-white/10"
          />
        </div>
      </div>

      <Row gutter={[32, 32]}>
        <Col xs={24} lg={16}>
          <Card className="glass-card !p-0 overflow-hidden border-none shadow-2xl bg-white relative z-[10]">
            <div className="flex justify-center py-10">
              <div className="relative border-4 border-dashed border-gray-100 rounded-[2.5rem] overflow-hidden bg-white shadow-inner cursor-crosshair">
                {activeMode === 'Draw' ? (
                  <>
                    <canvas ref={canvasRef} className="block" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none text-gray-900 font-black text-6xl uppercase tracking-[1em] whitespace-nowrap">
                      SIGN HERE
                    </div>
                  </>
                ) : (
                  <>
                    <canvas ref={typeCanvasRef} width={700} height={350} className="block" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none text-gray-900 font-black text-6xl uppercase tracking-[1em] whitespace-nowrap">
                      PREVIEW
                    </div>
                  </>
                )}
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          {activeMode === 'Draw' ? (
            <Card className="glass-card !p-8" title={<span className="text-white flex items-center gap-3 font-bold uppercase tracking-widest text-xs"><Palette size={16} className="text-primary"/> Signature Controls</span>}>
              <Space direction="vertical" className="w-full" size="xl">
                {renderInkSelector(drawColor, setDrawColor)}

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Text className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Brush Thickness</Text>
                    <Tag color="blue">{brushSize}px</Tag>
                  </div>
                  <Slider min={1} max={10} value={brushSize} onChange={setBrushSize} />
                </div>

                <Divider className="!my-2 border-white/5" />

                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    size="large" 
                    onClick={clearDrawCanvas}
                    className="!h-14 !rounded-2xl !bg-red-500/10 !text-red-400 !border-red-500/20"
                  >
                    Clear
                  </Button>
                  <Button 
                    size="large" 
                    onClick={() => setDrawMode(drawMode === 'draw' ? 'move' : 'draw')}
                    className={`!h-14 !rounded-2xl ${drawMode === 'move' ? '!bg-primary !text-black' : '!bg-white/5 !text-white !border-white/10'}`}
                  >
                    {drawMode === 'move' ? 'Drawing...' : 'Move Tool'}
                  </Button>
                </div>

                <Button 
                  type="primary" 
                  block 
                  size="large" 
                  className="neon-button !h-16 !text-lg" 
                  icon={<Download size={22} />}
                  onClick={downloadDrawSignature}
                >
                  Export Signature
                </Button>

                <div className="mt-4 p-6 bg-primary/5 rounded-3xl border border-primary/10">
                  <div className="flex items-start gap-3">
                    <Shield size={20} className="text-primary shrink-0" />
                    <Text className="text-gray-400 text-xs">
                      Auto-exports as **Transparent PNG**. Perfect for UPSC, SSC, and Banking portals.
                    </Text>
                  </div>
                </div>
              </Space>
            </Card>
          ) : (
            <Card className="glass-card !p-8" title={<span className="text-white flex items-center gap-3 font-bold uppercase tracking-widest text-xs"><Type size={16} className="text-primary"/> Text Controls</span>}>
              <Space direction="vertical" className="w-full" size="lg">
                <div>
                  <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Type Your Name</Text>
                  <Input 
                    value={typedText} 
                    onChange={(e) => setTypedText(e.target.value)} 
                    placeholder="Enter signature text" 
                    maxLength={30}
                    className="w-full"
                  />
                </div>

                {renderInkSelector(typeColor, setTypeColor)}

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Text className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Font Size</Text>
                    <Tag color="blue">{typeFontSize}px</Tag>
                  </div>
                  <Slider min={24} max={100} value={typeFontSize} onChange={setTypeFontSize} />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Text className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Slant / Angle</Text>
                    <Tag color="blue">{slant}°</Tag>
                  </div>
                  <Slider min={-15} max={15} value={slant} onChange={setSlant} />
                </div>

                <div>
                  <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Choose Font Style (30+ Designs)</Text>
                  <div className="grid grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1 border border-white/5 rounded-xl p-2 bg-[#080415]/60 custom-scrollbar">
                    {FONTS.map(f => (
                      <div
                        key={f.family}
                        onClick={() => setSelectedFont(f.family)}
                        className={`p-3 rounded-lg border text-center cursor-pointer transition-all ${
                          selectedFont === f.family
                            ? 'border-primary bg-primary/10 text-white'
                            : 'border-white/5 bg-white/5 text-gray-400 hover:border-white/20 hover:bg-white/10'
                        }`}
                      >
                        <div 
                          style={{ fontFamily: f.family, fontSize: '18px' }} 
                          className="truncate mb-1 text-white leading-relaxed"
                        >
                          {typedText || 'Sign'}
                        </div>
                        <div className="text-[9px] text-gray-500 truncate">{f.name}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  type="primary" 
                  block 
                  size="large" 
                  className="neon-button !h-16 !text-lg" 
                  icon={<Download size={22} />}
                  onClick={downloadTypeSignature}
                >
                  Export Signature
                </Button>

                <div className="mt-2 p-6 bg-primary/5 rounded-3xl border border-primary/10">
                  <div className="flex items-start gap-3">
                    <Shield size={20} className="text-primary shrink-0" />
                    <Text className="text-gray-400 text-xs">
                      Exported signature is fully **transparent** and sized to perfectly fit online portals.
                    </Text>
                  </div>
                </div>
              </Space>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default SignatureMaker;
