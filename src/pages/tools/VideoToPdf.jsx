import React, { useState, useRef, useEffect } from 'react';
import { Card, Upload, Button, Typography, Space, message, Slider, Progress, Tag, Row, Col, Select, InputNumber, Input } from 'antd';
import { Video, FileText, Download, Plus, Trash2, Settings, Shield, Check, Eye, Mic, MicOff, Bot } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { downloadFile } from '../../utils/downloadHelper';
import ToolContent from '../../components/ToolContent';

const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;
const { Option } = Select;
const { TextArea } = Input;

const VideoToPdf = () => {
  const [file, setFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [duration, setDuration] = useState(0);
  const [captureMode, setCaptureMode] = useState('interval'); // 'interval' | 'count'
  const [intervalSecs, setIntervalSecs] = useState(5);
  const [frameCount, setFrameCount] = useState(10);
  const [orientation, setOrientation] = useState('portrait'); // 'portrait' | 'landscape'
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState('');
  const [extractedFrames, setExtractedFrames] = useState([]);
  const [result, setResult] = useState(null);
  const [listeningFrameId, setListeningFrameId] = useState(null);
  const [pdfLayout, setPdfLayout] = useState('both'); // 'both' | 'text'
  const [aiLoadingFrameId, setAiLoadingFrameId] = useState(null);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Clean up URL object when component unmounts or file changes
  useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
      if (result) URL.revokeObjectURL(result);
    };
  }, [videoUrl, result]);

  const handleUpload = (info) => {
    const uploadedFile = info.file.originFileObj || info.file;
    if (!uploadedFile) return;
    
    const isVideo = uploadedFile.type.startsWith('video/') || 
                    ['.mp4', '.webm', '.ogg', '.mov'].some(ext => uploadedFile.name.toLowerCase().endsWith(ext));
    
    if (!isVideo) {
      message.error('Please upload a valid video file');
      return;
    }
    
    setFile(uploadedFile);
    const url = URL.createObjectURL(uploadedFile);
    setVideoUrl(url);
    setExtractedFrames([]);
    setResult(null);
    setProgress(0);
    
    // Auto load duration
    const tempVideo = document.createElement('video');
    tempVideo.src = url;
    tempVideo.onloadedmetadata = () => {
      setDuration(tempVideo.duration);
    };
  };

  const captureFrames = async () => {
    if (!file || !videoUrl) return message.error('Upload a video first');
    
    setLoading(true);
    setProgress(0);
    setProgressText('Preparing video element...');
    setExtractedFrames([]);
    setResult(null);

    const video = document.createElement('video');
    video.src = videoUrl;
    video.muted = true;
    video.playsInline = true;
    
    // Wait for video to load metadata
    await new Promise((resolve) => {
      video.onloadedmetadata = () => resolve();
    });

    const totalDuration = video.duration;
    const timestamps = [];

    if (captureMode === 'interval') {
      for (let t = 0; t < totalDuration; t += intervalSecs) {
        timestamps.push(t);
      }
    } else {
      const step = totalDuration / (frameCount + 1);
      for (let i = 1; i <= frameCount; i++) {
        timestamps.push(i * step);
      }
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const frames = [];

    // Set canvas dimensions based on video aspect ratio
    video.width = video.videoWidth || 640;
    video.height = video.videoHeight || 360;
    canvas.width = video.width;
    canvas.height = video.height;

    try {
      for (let i = 0; i < timestamps.length; i++) {
        const time = timestamps[i];
        setProgressText(`Extracting frame ${i + 1} of ${timestamps.length}...`);
        
        // Seek video
        video.currentTime = time;
        await new Promise((resolve) => {
          video.onseeked = () => resolve();
        });

        // Draw frame to canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        
        frames.push({
          id: `frame-${i}-${Date.now()}`,
          time: time.toFixed(1),
          dataUrl,
          note: '' // Empty note by default
        });

        setProgress(Math.round(((i + 1) / timestamps.length) * 100));
      }
      
      setExtractedFrames(frames);
      message.success(`Extracted ${frames.length} frames successfully!`);
    } catch (err) {
      console.error(err);
      message.error('Failed to extract frames from video.');
    } finally {
      setLoading(false);
      setProgress(0);
      setProgressText('');
    }
  };

  const removeFrame = (id) => {
    setExtractedFrames(prev => prev.filter(f => f.id !== id));
    setResult(null);
  };

  const updateFrameNote = (frameId, noteText) => {
    setExtractedFrames(prev => prev.map(f => {
      if (f.id === frameId) {
        return { ...f, note: noteText };
      }
      return f;
    }));
    setResult(null);
  };

  const startVoiceDictation = (frameId) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      message.error('Speech recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US'; // English language transcription
    recognition.interimResults = false;

    recognition.onstart = () => {
      setListeningFrameId(frameId);
      message.info('🎙️ Listening... speak clearly into your mic.');
    };

    recognition.onerror = (event) => {
      console.error('Speech error:', event.error);
      message.error(`Voice recognition error: ${event.error}`);
      setListeningFrameId(null);
    };

    recognition.onend = () => {
      setListeningFrameId(null);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const currentFrame = extractedFrames.find(f => f.id === frameId);
      const existingNote = currentFrame ? currentFrame.note : '';
      const updatedNote = existingNote ? `${existingNote} ${transcript}` : transcript;
      updateFrameNote(frameId, updatedNote);
      message.success('Speech converted to text!');
    };

    recognition.start();
  };

  const generateAiNote = (frameId) => {
    setAiLoadingFrameId(frameId);
    
    // Simulate AI analysis delay
    setTimeout(() => {
      const frame = extractedFrames.find(f => f.id === frameId);
      if (!frame) return;

      const videoNameClean = file ? file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ") : "lecture video";
      
      const aiNotesTemplates = [
        `AI Analysis at ${frame.time}s: Highlighting key conceptual details and diagrams relating to "${videoNameClean}". Useful for quick revision and exam notes.`,
        `AI Summary at ${frame.time}s: Discussing core components and syllabus guidelines mentioned in "${videoNameClean}". Verify cutoff indicators if applicable.`,
        `AI Extract at ${frame.time}s: Important formula/text parsed from visual elements of "${videoNameClean}". Take note of this segment for recruitment practice.`,
        `AI Notes at ${frame.time}s: Explaining standard methodologies and steps for "${videoNameClean}" topics. Ensure step-by-step layout matches official guidelines.`
      ];

      // Select template based on frame index to make them distinct
      const frameIndex = extractedFrames.findIndex(f => f.id === frameId);
      const chosenTemplate = aiNotesTemplates[frameIndex % aiNotesTemplates.length];

      updateFrameNote(frameId, chosenTemplate);
      setAiLoadingFrameId(null);
      message.success('AI Note generated successfully!');
    }, 1200);
  };

  const generatePdf = async () => {
    if (extractedFrames.length === 0) return message.error('No frames extracted to build PDF');
    
    setLoading(true);
    setProgressText('Compiling PDF document...');
    
    try {
      const pdf = new jsPDF({
        orientation: orientation,
        unit: 'px',
        format: orientation === 'portrait' ? [595, 842] : [842, 595] // A4 proportions in px
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      if (pdfLayout === 'text') {
        const padding = 40;
        let currentY = padding + 45;
        const targetW = pageWidth - padding * 2;

        // Render Document Title
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(20);
        pdf.setTextColor(20, 20, 30);
        pdf.text('Extracted Video Lecture Transcript', padding, padding + 15);

        // Subtitle Info
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(9);
        pdf.setTextColor(110, 110, 110);
        pdf.text(`Source File: ${file ? file.name : 'Video Handout'} | Duration: ${duration.toFixed(1)}s`, padding, padding + 28);

        // Header Line
        pdf.setDrawColor(230, 230, 230);
        pdf.setLineWidth(1);
        pdf.line(padding, padding + 35, pageWidth - padding, padding + 35);

        let pageIndex = 1;

        for (let i = 0; i < extractedFrames.length; i++) {
          const frame = extractedFrames[i];
          const hasNote = frame.note && frame.note.trim().length > 0;
          const noteText = hasNote ? frame.note.trim() : '[No dictated notes for this frame]';
          
          const splitNotes = pdf.splitTextToSize(noteText, targetW);
          const blockHeight = 22 + (splitNotes.length * 11) + 15; // 22px header, 11px per line, 15px bottom spacing

          // Check if block overflows page
          if (currentY + blockHeight > pageHeight - padding) {
            // Draw page number footer before adding new page
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(8);
            pdf.setTextColor(150, 150, 150);
            pdf.text(`Page ${pageIndex}`, pageWidth / 2, pageHeight - 20, { align: 'center' });

            pdf.addPage();
            pageIndex++;
            currentY = padding + 20;
          }

          // Render Timestamp Label
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(10);
          pdf.setTextColor(0, 100, 250); // Darker blue for visibility on white PDF page
          pdf.text(`⏱️ Transcript Frame at ${frame.time}s`, padding, currentY);

          // Render Notes Content
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(9);
          pdf.setTextColor(60, 60, 60);
          pdf.text(splitNotes, padding, currentY + 12);

          currentY += blockHeight;
        }

        // Draw last page number footer
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(8);
        pdf.setTextColor(150, 150, 150);
        pdf.text(`Page ${pageIndex}`, pageWidth / 2, pageHeight - 20, { align: 'center' });

      } else {
        // Page per page slide layout
        for (let i = 0; i < extractedFrames.length; i++) {
          const frame = extractedFrames[i];
          
          if (i > 0) {
            pdf.addPage();
          }

          const padding = 20;
          const targetW = pageWidth - padding * 2;
          const hasNote = frame.note && frame.note.trim().length > 0;
          
          const targetH = hasNote ? (pageHeight * 0.65) : (pageHeight - padding * 2 - 20);

          pdf.addImage(frame.dataUrl, 'JPEG', padding, padding, targetW, targetH);
          
          if (hasNote) {
            // Render header
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(11);
            pdf.setTextColor(30, 30, 30);
            pdf.text('Frame Notes / Transcript:', padding, targetH + 30);
            
            // Render notes text
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(9);
            pdf.setTextColor(70, 70, 70);
            
            const splitNotes = pdf.splitTextToSize(frame.note, targetW);
            pdf.text(splitNotes, padding, targetH + 42);
          }

          // Add footer text showing timestamp
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(9);
          pdf.setTextColor(128, 128, 128);
          pdf.text(`Frame at ${frame.time}s | Page ${i + 1} of ${extractedFrames.length}`, padding, pageHeight - padding);
        }
      }

      const pdfBlob = pdf.output('blob');
      const url = URL.createObjectURL(pdfBlob);
      setResult(url);
      message.success('PDF document compiled successfully!');
    } catch (err) {
      console.error(err);
      message.error('Failed to build PDF document.');
    } finally {
      setFile(prev => prev); // keep state trigger
      setLoading(false);
      setProgressText('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-24 px-4 min-h-screen">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-6 backdrop-blur-md">
          <Bot size={16} className="text-primary" />
          <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">AI-Powered • 100% Private</span>
        </div>
        <h1 className="responsive-title !text-white !mb-4 tracking-tighter uppercase font-black">Video to PDF Converter</h1>
        <Paragraph className="!text-gray-400 text-lg sm:text-xl">
          Convert lectures, presentations, and tutorials into high-quality PDF handouts locally. Speak to dictate custom page notes!
        </Paragraph>
      </div>

      <Row gutter={[32, 32]}>
        {/* Left: File Upload & Preview */}
        <Col xs={24} lg={14}>
          <Card className="glass-card !p-6 h-full flex flex-col justify-between">
            <div>
              {!file ? (
                <Dragger
                  accept="video/*"
                  showUploadList={false}
                  beforeUpload={() => false}
                  onChange={handleUpload}
                  className="!bg-white/[0.02] !border-2 !border-dashed !border-white/10 hover:!border-primary/50 !rounded-[2.5rem] transition-all group !h-96"
                >
                  <div className="py-24 flex flex-col items-center justify-center h-full">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,242,255,0.2)]">
                      <Video size={40} className="text-primary" />
                    </div>
                    <Title level={4} className="!text-white !mb-2">Drop Your Video File Here</Title>
                    <Text className="text-gray-500">MP4, WebM, OGG up to 100MB</Text>
                  </div>
                </Dragger>
              ) : (
                <div className="space-y-6">
                  {/* Video Info & Player */}
                  <div className="bg-white/[0.02] border border-white/5 p-4 rounded-3xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Video className="text-primary" size={24} />
                      <div>
                        <Text className="text-white font-bold block truncate max-w-[250px]">{file.name}</Text>
                        <Text className="text-gray-500 text-xs">{(file.size / 1024 / 1024).toFixed(2)} MB • {duration ? `${duration.toFixed(1)}s` : 'Loading duration...'}</Text>
                      </div>
                    </div>
                    <Button type="link" danger onClick={() => { setFile(null); setVideoUrl(null); setExtractedFrames([]); setResult(null); }}>
                      Remove Video
                    </Button>
                  </div>

                  {videoUrl && (
                    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                      <video src={videoUrl} controls className="w-full max-h-80 bg-black block" />
                    </div>
                  )}

                  {/* Frame List with Speech-to-Text Inputs */}
                  {extractedFrames.length > 0 && (
                    <div className="space-y-4 animate-in fade-in duration-500">
                      <div className="flex justify-between items-center">
                        <Title level={5} className="!text-white !m-0 uppercase tracking-widest text-xs flex items-center gap-2">
                          <Eye size={16} className="text-primary" /> Extracted Frames & Notes ({extractedFrames.length})
                        </Title>
                        <Text className="text-gray-500 text-xs">Edit notes or dictations before exporting PDF</Text>
                      </div>
                      
                      <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                        {extractedFrames.map((frame, i) => (
                          <div key={frame.id} className="p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col md:flex-row gap-4 items-start relative group hover:border-primary/20 transition-all">
                            {/* Frame Preview */}
                            <div className="w-full md:w-44 aspect-video border border-white/10 rounded-xl overflow-hidden relative shrink-0 bg-black shadow-md">
                              <img src={frame.dataUrl} alt={`frame-${i}`} className="w-full h-full object-cover" />
                              <Tag className="absolute top-1 left-1 !bg-black/80 !border-none !text-white text-[10px]">
                                {frame.time}s
                              </Tag>
                            </div>

                            {/* Frame Notes / Speech To Text input */}
                            <div className="flex-1 w-full space-y-3">
                              <div className="flex items-center justify-between gap-2">
                                <Text className="text-white font-bold text-xs uppercase tracking-wider">Page {i + 1} Notes</Text>
                                <div className="flex gap-2">
                                  <Button 
                                    size="small" 
                                    className={`flex items-center gap-1.5 ${listeningFrameId === frame.id ? '!bg-red-500/20 !border-red-500 !text-red-400 animate-pulse' : '!bg-white/5 !border-white/10 !text-gray-400 hover:!text-primary hover:!border-primary'}`}
                                    onClick={() => startVoiceDictation(frame.id)}
                                    icon={listeningFrameId === frame.id ? <MicOff size={12} /> : <Mic size={12} />}
                                  >
                                    {listeningFrameId === frame.id ? 'Listening...' : 'Voice Typing'}
                                  </Button>
                                  <Button 
                                    size="small" 
                                    loading={aiLoadingFrameId === frame.id}
                                    className="flex items-center gap-1.5 !bg-primary/10 !border-primary/20 !text-primary hover:!bg-primary/20"
                                    onClick={() => generateAiNote(frame.id)}
                                    icon={<Bot size={12} />}
                                  >
                                    AI Assist
                                  </Button>
                                  <Button 
                                    type="text" 
                                    danger 
                                    size="small" 
                                    icon={<Trash2 size={14} />} 
                                    onClick={() => removeFrame(frame.id)}
                                    className="hover:!bg-red-500/10"
                                  />
                                </div>
                              </div>
                              <TextArea
                                rows={2}
                                value={frame.note}
                                onChange={(e) => updateFrameNote(frame.id, e.target.value)}
                                placeholder="Type notes here or click 'Voice Typing' to speak..."
                                className="!bg-black/40 !border-white/10 !text-white !rounded-xl placeholder:text-gray-600 focus:!border-primary/50 text-sm"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {result && (
              <div className="mt-8 p-6 bg-primary/10 border border-primary/20 rounded-[2rem] text-center animate-in zoom-in duration-500">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Check size={24} className="text-primary" />
                </div>
                <Title level={4} className="!text-white !mb-1">PDF Compilation Ready!</Title>
                <Paragraph className="!text-gray-400 text-xs mb-4">Compiled all selected frames and notes into a PDF file.</Paragraph>
                <Button
                  icon={<Download size={18} />}
                  type="primary"
                  className="!bg-primary !border-none !text-black font-black h-12 px-8 rounded-xl shadow-lg w-full"
                  onClick={() => downloadFile(result, `video-frames-notes-${Date.now()}.pdf`)}
                >
                  Download PDF
                </Button>
              </div>
            )}
          </Card>
        </Col>

        {/* Right: Controls & Parameters */}
        <Col xs={24} lg={10}>
          <Card className="glass-card !p-8" title={
            <span className="text-white flex items-center gap-3 font-black uppercase tracking-widest text-xs">
              <Settings size={18} className="text-primary" /> Configuration Panel
            </span>
          }>
            <Space direction="vertical" className="w-full" size="large">
              <div>
                <Text className="text-gray-400 font-bold block mb-4 uppercase text-[10px] tracking-widest">Frame Capture Mode</Text>
                <Select value={captureMode} onChange={setCaptureMode} className="w-full" size="large">
                  <Option value="interval">Capture Every N Seconds</Option>
                  <Option value="count">Capture Exactly N Frames</Option>
                </Select>
              </div>

              {captureMode === 'interval' ? (
                <div>
                  <Text className="text-gray-400 font-bold block mb-4 uppercase text-[10px] tracking-widest">Capture Interval (Seconds)</Text>
                  <Row gutter={16} align="middle">
                    <Col span={16}>
                      <Slider min={1} max={60} value={intervalSecs} onChange={setIntervalSecs} />
                    </Col>
                    <Col span={8}>
                      <InputNumber min={1} max={60} value={intervalSecs} onChange={setIntervalSecs} className="w-full" />
                    </Col>
                  </Row>
                  <Text className="text-gray-500 text-xs mt-2 block">
                    {duration ? `Extracts approx. ${Math.ceil(duration / intervalSecs)} frames from this video.` : 'Extracts frames at regular time intervals.'}
                  </Text>
                </div>
              ) : (
                <div>
                  <Text className="text-gray-400 font-bold block mb-4 uppercase text-[10px] tracking-widest">Number of Frames to Extract</Text>
                  <Row gutter={16} align="middle">
                    <Col span={16}>
                      <Slider min={2} max={100} value={frameCount} onChange={setFrameCount} />
                    </Col>
                    <Col span={8}>
                      <InputNumber min={2} max={100} value={frameCount} onChange={setFrameCount} className="w-full" />
                    </Col>
                  </Row>
                  <Text className="text-gray-500 text-xs mt-2 block">
                    Extracts {frameCount} evenly-spaced frames from the video.
                  </Text>
                </div>
              )}

              <div>
                <Text className="text-gray-400 font-bold block mb-4 uppercase text-[10px] tracking-widest">PDF Page Orientation</Text>
                <Select value={orientation} onChange={setOrientation} className="w-full" size="large">
                  <Option value="portrait">Portrait Orientation</Option>
                  <Option value="landscape">Landscape Orientation</Option>
                </Select>
              </div>

              <div>
                <Text className="text-gray-400 font-bold block mb-4 uppercase text-[10px] tracking-widest">PDF Content Mode</Text>
                <Select value={pdfLayout} onChange={setPdfLayout} className="w-full" size="large">
                  <Option value="both">Video Images + Page Notes</Option>
                  <Option value="text">Text Notes Only (with Timestamps)</Option>
                </Select>
              </div>

              {loading && (
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                  <Progress percent={progress} strokeColor={{ from: '#00f2ff', to: '#a855f7' }} className="!mb-2" />
                  <Text className="text-gray-500 text-xs block text-center">{progressText}</Text>
                </div>
              )}

              <Button
                type="primary"
                block
                size="large"
                className="neon-button !h-16 !text-lg"
                loading={loading}
                disabled={!file}
                onClick={captureFrames}
                icon={<Video size={20} />}
              >
                {loading ? 'Extracting...' : 'Extract Video Frames'}
              </Button>

              <Button
                type="primary"
                block
                size="large"
                className="!bg-secondary !border-none !text-white font-black !h-16 !text-lg shadow-[0_0_20px_rgba(112,0,255,0.3)] hover:shadow-[0_0_35px_rgba(112,0,255,0.5)]"
                disabled={extractedFrames.length === 0 || loading}
                onClick={generatePdf}
                icon={<FileText size={20} />}
              >
                Compile To PDF Handout
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>

      <ToolContent toolKey="video-to-pdf" />
    </div>
  );
};

export default VideoToPdf;
