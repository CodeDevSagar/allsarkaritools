import React, { useState, useRef } from 'react';
import { Card, Button, Typography, Space, message, Input, Radio, Row, Col, Divider } from 'antd';
import { FileText, Download, Shield, Check, Globe, Code, Play } from 'lucide-react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const HtmlToPdf = () => {
  const [mode, setMode] = useState('url'); // url or code
  const [url, setUrl] = useState('');
  const [htmlCode, setHtmlCode] = useState(`<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; color: #333; }
    h1 { color: #7000ff; }
    p { line-height: 1.6; }
    .card { border: 1px solid #ddd; padding: 15px; border-radius: 8px; margin-top: 15px; }
  </style>
</head>
<body>
  <h1>Sarkari Utility Suite</h1>
  <p>Generate high-quality PDF files from direct HTML templates locally.</p>
  <div class="card">
    <h3>Client-Side Rendering</h3>
    <p>This PDF is generated using jsPDF and html2canvas-pro directly in your browser.</p>
  </div>
</body>
</html>`);
  const [loading, setLoading] = useState(false);
  const [previewHtml, setPreviewHtml] = useState('');
  const previewRef = useRef(null);

  const fetchWebpageHtml = async (targetUrl) => {
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = 'https://' + targetUrl;
    }
    
    // Attempt 1: corsproxy.io (Fast, direct HTML content proxy)
    try {
      const response = await axios.get(`https://corsproxy.io/?url=${encodeURIComponent(targetUrl)}`);
      if (response.data) {
        return response.data;
      }
    } catch (e) {
      console.warn('Proxy 1 (corsproxy.io) failed:', e);
    }

    // Attempt 2: allorigins.win (JSON wrapped proxy)
    try {
      const response = await axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`);
      if (response.data && response.data.contents) {
        return response.data.contents;
      }
    } catch (e) {
      console.warn('Proxy 2 (allorigins.win) failed:', e);
    }

    throw new Error('Could not load the webpage via public CORS proxies. Try copying the page HTML code directly in Code Mode.');
  };

  const handleGeneratePdf = async () => {
    setLoading(true);
    try {
      let finalHtml = '';
      if (mode === 'url') {
        if (!url) throw new Error('Please enter a URL');
        finalHtml = await fetchWebpageHtml(url);
      } else {
        if (!htmlCode.trim()) throw new Error('Please enter HTML code');
        finalHtml = htmlCode;
      }

      setPreviewHtml(finalHtml);

      // Create a temporary hidden container to render the HTML securely
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '0px';
      container.style.width = '800px'; // fixed layout width for clean print
      container.style.minHeight = '600px'; // guarantee non-zero height
      container.style.background = 'white';
      container.style.color = '#000000';
      container.innerHTML = finalHtml;
      document.body.appendChild(container);

      // Give images/scripts a brief moment to render
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const canvas = await html2canvas(container, {
        useCORS: true,
        allowTaint: true,
        scale: 2, // high quality
      });

      document.body.removeChild(container);

      // Sanity checks on canvas dimensions to prevent NaN or division by zero errors in jsPDF
      const canvasWidth = canvas.width > 0 ? canvas.width : 800;
      const canvasHeight = canvas.height > 0 ? canvas.height : 1130;

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 standard width in mm
      const pageHeight = 295; // A4 standard height in mm
      const imgHeight = (canvasHeight * imgWidth) / canvasWidth;
      
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`web-export-${Date.now()}.pdf`);
      message.success('PDF generated and downloaded successfully!');
    } catch (error) {
      console.error(error);
      message.error(error.message || 'Failed to convert HTML to PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-24 px-4 min-h-screen">
      <div className="text-center mb-16">
        <Title className="!text-white !text-5xl !font-black !mb-4 tracking-tighter uppercase">HTML to PDF Studio</Title>
        <Paragraph className="!text-gray-400 text-lg">Convert webpages or raw HTML documents into print-ready PDFs.</Paragraph>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card className="glass-card !p-6 h-full">
            <Space direction="vertical" className="w-full" size="large">
              <div>
                <Text className="text-gray-400 font-bold block mb-3 uppercase text-[10px] tracking-widest">Source Mode</Text>
                <Radio.Group value={mode} onChange={(e) => setMode(e.target.value)} buttonStyle="solid" className="w-full">
                  <Row gutter={8}>
                    <Col span={12}>
                      <Radio.Button value="url" className="w-full text-center !bg-white/5 !border-white/10 hover:!border-primary !text-white flex items-center justify-center gap-2">
                        <Globe size={14} /> Webpage URL
                      </Radio.Button>
                    </Col>
                    <Col span={12}>
                      <Radio.Button value="code" className="w-full text-center !bg-white/5 !border-white/10 hover:!border-primary !text-white flex items-center justify-center gap-2">
                        <Code size={14} /> HTML Code
                      </Radio.Button>
                    </Col>
                  </Row>
                </Radio.Group>
              </div>

              {mode === 'url' ? (
                <div>
                  <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Enter Webpage URL</Text>
                  <Input
                    size="large"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="!bg-white/5 !border-white/10 !text-white !rounded-xl"
                  />
                  <Text className="text-gray-500 text-xs block mt-2">
                    Note: Pages requiring authentication or complex scripts might render as public snapshots.
                  </Text>
                </div>
              ) : (
                <div>
                  <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">HTML Code Snippet</Text>
                  <TextArea
                    rows={10}
                    value={htmlCode}
                    onChange={(e) => setHtmlCode(e.target.value)}
                    placeholder="<html><body><h1>Hello World</h1></body></html>"
                    className="!bg-white/5 !border-white/10 !text-white !rounded-xl font-mono text-sm"
                  />
                </div>
              )}

              <Button
                block
                type="primary"
                size="large"
                className="neon-button !h-14 !text-base"
                icon={<Play size={18} />}
                onClick={handleGeneratePdf}
                loading={loading}
              >
                {loading ? 'Converting Layout...' : 'Convert to PDF'}
              </Button>
            </Space>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card className="glass-card !p-6 h-full flex flex-col" title={<span className="text-white flex items-center gap-2 font-bold"><FileText size={18} className="text-primary" /> Visual Document Preview</span>}>
            <div className="flex-1 bg-white rounded-2xl p-4 overflow-auto min-h-[300px] max-h-[450px]">
              {mode === 'code' ? (
                <iframe
                  title="html-preview"
                  srcDoc={htmlCode}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts"
                />
              ) : url ? (
                <div className="text-center py-20 text-gray-400 font-semibold">
                  <Globe size={32} className="mx-auto mb-2 text-primary animate-pulse" />
                  URL Preview is simulated on conversion
                </div>
              ) : (
                <div className="text-center py-20 text-gray-400">
                  Enter HTML code or URL to preview document layout.
                </div>
              )}
            </div>
          </Card>
        </Col>
      </Row>

      <div className="mt-12 flex items-start gap-4 p-8 glass-card bg-primary/5 border-none">
        <Shield size={32} className="text-primary mt-1 shrink-0" />
        <div>
          <Text className="text-white font-bold block mb-2 text-lg">Local Sandbox Execution</Text>
          <Text className="text-gray-500">
            HTML documents are rendered inside your browser's context. Security sandboxing prevents cross-origin scripts from executing.
          </Text>
        </div>
      </div>
    </div>
  );
};

export default HtmlToPdf;
