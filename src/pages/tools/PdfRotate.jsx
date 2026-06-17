import React, { useState } from 'react';
import { Card, Upload, Button, Typography, Space, message, List, Radio, Row, Col } from 'antd';
import { FileText, Download, Plus, Trash2, Shield, Check, RotateCw, RefreshCw } from 'lucide-react';
import { PDFDocument, degrees } from 'pdf-lib';
import JSZip from 'jszip';
import { downloadFile } from '../../utils/downloadHelper';

const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;

const PdfRotate = () => {
  const [fileList, setFileList] = useState([]);
  const [rotationAngle, setRotationAngle] = useState(90); // 90, 180, 270
  const [rotateMode, setRotateMode] = useState('all'); // all, odd, even, first
  const [loading, setLoading] = useState(false);
  const [resultZip, setResultZip] = useState(null);
  const [singleResults, setSingleResults] = useState([]);

  const handleUpload = (info) => {
    const updatedList = info.fileList.map(f => f.originFileObj || f);
    const validFiles = updatedList.filter(file => {
      return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    });

    if (validFiles.length < updatedList.length) {
      message.error('Skipped non-PDF files.');
    }

    setFileList(validFiles.map((file, i) => ({
      uid: `rotate-file-${i}-${Date.now()}`,
      name: file.name,
      size: file.size,
      originFileObj: file
    })));
    setResultZip(null);
    setSingleResults([]);
  };

  const removeFile = (uid) => {
    setFileList(prev => prev.filter(f => f.uid !== uid));
    setResultZip(null);
    setSingleResults([]);
  };

  const handleRotate = async () => {
    if (fileList.length === 0) return message.error('Upload at least one PDF file first');

    setLoading(true);
    try {
      const processedFiles = [];
      const zip = new JSZip();

      for (const fileItem of fileList) {
        const arrayBuffer = await fileItem.originFileObj.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
        const pages = pdfDoc.getPages();

        pages.forEach((page, index) => {
          const pageNum = index + 1;
          let shouldRotate = false;

          if (rotateMode === 'all') {
            shouldRotate = true;
          } else if (rotateMode === 'odd' && pageNum % 2 !== 0) {
            shouldRotate = true;
          } else if (rotateMode === 'even' && pageNum % 2 === 0) {
            shouldRotate = true;
          } else if (rotateMode === 'first' && index === 0) {
            shouldRotate = true;
          }

          if (shouldRotate) {
            const currentRotation = page.getRotation().angle;
            page.setRotation(degrees((currentRotation + rotationAngle) % 360));
          }
        });

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        processedFiles.push({
          name: `rotated-${fileItem.name}`,
          url: url
        });

        zip.file(`rotated-${fileItem.name}`, blob);
      }

      setSingleResults(processedFiles);

      if (fileList.length > 1) {
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const zipUrl = URL.createObjectURL(zipBlob);
        setResultZip(zipUrl);
      }

      message.success('PDFs rotated successfully!');
    } catch (error) {
      console.error(error);
      message.error('Failed to rotate PDF documents.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-24 px-4 min-h-screen">
      <div className="text-center mb-16">
        <Title className="!text-white !text-5xl !font-black !mb-4 tracking-tighter uppercase">PDF Rotate Studio</Title>
        <Paragraph className="!text-gray-400 text-lg">Rotate entire files or select pages for multiple PDF files at once.</Paragraph>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card className="glass-card !p-6 h-full">
            <Dragger
              accept=".pdf"
              multiple
              showUploadList={false}
              beforeUpload={() => false}
              onChange={handleUpload}
              className="!bg-white/[0.02] !border-2 !border-dashed !border-white/10 hover:!border-primary/50 !rounded-[2.5rem] transition-all group"
            >
              <div className="py-16 flex flex-col items-center justify-center">
                <Plus size={48} className="text-primary mb-4 group-hover:scale-110 transition-transform" />
                <Text className="text-white font-bold text-lg">Upload PDF files here</Text>
                <Text className="text-gray-500">Supports multiple file selection</Text>
              </div>
            </Dragger>

            {fileList.length > 0 && (
              <div className="mt-8 animate-in fade-in duration-500">
                <div className="flex justify-between items-center mb-4">
                  <Text className="text-white font-bold uppercase tracking-widest text-[10px]">Files ({fileList.length})</Text>
                  <Button type="link" danger onClick={() => setFileList([])} className="!p-0 h-auto">Clear All</Button>
                </div>
                <List
                  dataSource={fileList}
                  renderItem={file => (
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10 mb-2">
                      <div className="flex items-center gap-3 truncate max-w-[80%]">
                        <FileText size={18} className="text-primary shrink-0" />
                        <Text className="text-white font-medium text-sm truncate">{file.name}</Text>
                      </div>
                      <Button 
                        type="text" 
                        danger 
                        icon={<Trash2 size={16} />} 
                        onClick={() => removeFile(file.uid)} 
                        className="hover:!bg-red-500/10"
                      />
                    </div>
                  )}
                />
              </div>
            )}
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card className="glass-card !p-6" title={<span className="text-white flex items-center gap-2 font-bold"><RefreshCw size={18} className="text-primary" /> Rotation Parameters</span>}>
            <Space direction="vertical" className="w-full" size="large">
              <div>
                <Text className="text-gray-400 font-bold block mb-3 uppercase text-[10px] tracking-widest">Rotation Angle</Text>
                <Radio.Group value={rotationAngle} onChange={(e) => setRotationAngle(e.target.value)} buttonStyle="solid" className="w-full">
                  <Row gutter={8}>
                    <Col span={8}>
                      <Radio.Button value={90} className="w-full text-center !bg-white/5 !border-white/10 hover:!border-primary !text-white">90° Right</Radio.Button>
                    </Col>
                    <Col span={8}>
                      <Radio.Button value={180} className="w-full text-center !bg-white/5 !border-white/10 hover:!border-primary !text-white">180° Flip</Radio.Button>
                    </Col>
                    <Col span={8}>
                      <Radio.Button value={270} className="w-full text-center !bg-white/5 !border-white/10 hover:!border-primary !text-white">90° Left</Radio.Button>
                    </Col>
                  </Row>
                </Radio.Group>
              </div>

              <div>
                <Text className="text-gray-400 font-bold block mb-3 uppercase text-[10px] tracking-widest">Target Pages</Text>
                <Radio.Group value={rotateMode} onChange={(e) => setRotateMode(e.target.value)} className="w-full">
                  <Row gutter={[8, 8]}>
                    <Col span={12}><Radio value="all" className="text-white">All Pages</Radio></Col>
                    <Col span={12}><Radio value="first" className="text-white">First Page Only</Radio></Col>
                    <Col span={12}><Radio value="odd" className="text-white">Odd Pages Only</Radio></Col>
                    <Col span={12}><Radio value="even" className="text-white">Even Pages Only</Radio></Col>
                  </Row>
                </Radio.Group>
              </div>

              <Button
                block
                type="primary"
                size="large"
                className="neon-button !h-14 !text-base"
                icon={<RotateCw size={18} />}
                onClick={handleRotate}
                loading={loading}
                disabled={fileList.length === 0}
              >
                Rotate PDF(s)
              </Button>

              {singleResults.length > 0 && (
                <div className="mt-6 p-4 bg-primary/5 rounded-2xl border border-primary/20 animate-in zoom-in duration-500">
                  <Title level={5} className="!text-white !mb-3">Rotated Downloads:</Title>
                  <Space direction="vertical" className="w-full">
                    {resultZip && (
                      <Button 
                        type="primary" 
                        block 
                        className="!bg-primary !border-none !text-black font-black mb-2" 
                        onClick={() => downloadFile(resultZip, `rotated-pdfs-${Date.now()}.zip`)}
                      >
                        Download All (ZIP Archive)
                      </Button>
                    )}
                    {singleResults.map((res, i) => (
                      <div key={i} className="flex justify-between items-center p-2 bg-white/5 rounded-lg">
                        <Text className="text-white text-xs truncate max-w-[70%]">{res.name}</Text>
                        <Button size="small" type="link" icon={<Download size={14} />} onClick={() => downloadFile(res.url, res.name)}>Download</Button>
                      </div>
                    ))}
                  </Space>
                </div>
              )}
            </Space>
          </Card>
        </Col>
      </Row>

      <div className="mt-12 flex items-start gap-4 p-8 glass-card bg-primary/5 border-none">
        <Shield size={32} className="text-primary mt-1 shrink-0" />
        <div>
          <Text className="text-white font-bold block mb-2 text-lg">Offline execution & Privacy</Text>
          <Text className="text-gray-500">
            All rotations are calculated in your browser sandbox using `pdf-lib`. No files leave your machine.
          </Text>
        </div>
      </div>
    </div>
  );
};

export default PdfRotate;
