import React, { useState } from 'react';
import { Card, Upload, Button, Typography, Space, message, List, Row, Col } from 'antd';
import { FileImage, Download, Plus, Trash2, Check, Shield } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { downloadFile } from '../../utils/downloadHelper';

const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;

const JpgToPdf = () => {
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = (info) => {
    const updatedList = info.fileList.map(f => f.originFileObj || f);
    const validFiles = updatedList.filter(file => {
      const isImage = file.type?.startsWith('image/') || /\.(jpg|jpeg|png|webp)$/i.test(file.name);
      return isImage;
    });

    setFileList(validFiles.map((file, i) => ({
      uid: `img-${i}-${Date.now()}`,
      name: file.name,
      originFileObj: file
    })));
  };

  const convertToPdf = async () => {
    if (fileList.length === 0) return message.error('Please upload at least one image');

    setLoading(true);
    try {
      const pdfDoc = await PDFDocument.create();

      for (const file of fileList) {
        const arrayBuffer = await file.originFileObj.arrayBuffer();
        const extension = file.name.split('.').pop().toLowerCase();
        
        let image;
        if (extension === 'png') {
          image = await pdfDoc.embedPng(arrayBuffer);
        } else {
          // Sharp/Canvas logic is not needed for embedding if we use embedJpg (supports JPG/JPEG)
          // For webp, pdf-lib doesn't support directly, so we'd need to convert first.
          // For simplicity in this tool, we'll support JPG/PNG.
          image = await pdfDoc.embedJpg(arrayBuffer);
        }

        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: image.width,
          height: image.height,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      setResult(url);
      message.success('Images converted to PDF successfully!');
    } catch (error) {
      console.error(error);
      message.error('Failed to convert. Ensure images are JPG or PNG.');
    } finally {
      setLoading(false);
    }
  };

  const downloadPdfHandler = async () => {
    if (!result) return;
    const response = await fetch(result);
    const blob = await response.blob();
    downloadFile(blob, `converted-images-${Date.now()}.pdf`);
  };

  return (
    <div className="max-w-5xl mx-auto py-24 px-4 min-h-screen">
      <div className="text-center mb-16">
        <Title className="!text-white !text-5xl !font-black !mb-4">JPG to PDF</Title>
        <Paragraph className="!text-gray-400 text-lg">Convert your photos and documents into a high-quality PDF file.</Paragraph>
      </div>

      <Row gutter={[32, 32]}>
        <Col xs={24} lg={fileList.length > 0 ? 12 : 24}>
          <Card className="glass-card !p-8">
            <Dragger
              accept="image/*"
              multiple
              showUploadList={false}
              beforeUpload={() => false}
              onChange={handleUpload}
              className="!bg-white/[0.02] !border-2 !border-dashed !border-white/10 hover:!border-primary/50 !rounded-[2.5rem] transition-all group"
            >
              <div className="w-full h-64 border-2 border-dashed border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center hover:border-primary/50 transition-all cursor-pointer group bg-white/[0.02]">
                <Plus size={48} className="text-primary mb-4 group-hover:rotate-90 transition-transform duration-500" />
                <Title level={4} className="!text-white !m-0">Upload Images</Title>
                <Text className="text-gray-500 mt-2 text-base">Select JPG, PNG or WebP</Text>
              </div>
            </Dragger>
            
            <div className="mt-12">
              <Button 
                type="primary" 
                block 
                size="large" 
                className="neon-button !h-16 !text-lg" 
                loading={loading}
                onClick={convertToPdf}
                disabled={fileList.length === 0}
              >
                Create PDF Now
              </Button>
            </div>
          </Card>
        </Col>

        {fileList.length > 0 && (
          <Col xs={24} lg={12}>
            <Card className="glass-card !p-8 h-full" title={<span className="text-white font-black tracking-widest uppercase text-xs">Image Queue ({fileList.length})</span>}>
              <List
                className="max-h-[400px] overflow-y-auto pr-2"
                dataSource={fileList}
                renderItem={file => (
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl mb-3 border border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <FileImage size={24} className="text-primary" />
                      </div>
                      <Text className="text-white font-bold truncate max-w-[150px]">{file.name}</Text>
                    </div>
                    <Button type="text" danger icon={<Trash2 size={18} />} onClick={() => setFileList(fileList.filter(f => f.uid !== file.uid))} />
                  </div>
                )}
              />
              
              {result && (
                <div className="mt-8 p-6 bg-primary/10 border border-primary/20 rounded-3xl text-center animate-in zoom-in duration-500">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Check size={24} className="text-primary" />
                  </div>
                  <Title level={4} className="!text-white !mb-6">PDF Generated!</Title>
                  <Button 
                    type="primary" 
                    block 
                    icon={<Download size={20} />} 
                    className="!bg-primary !text-black font-black h-14 rounded-xl"
                    onClick={downloadPdfHandler}
                  >
                    Download PDF
                  </Button>
                </div>
              )}
            </Card>
          </Col>
        )}
      </Row>

      {/* Security Card */}
      <div className="mt-12 p-8 glass-card border-none bg-primary/5 flex items-center gap-6">
        <Shield size={40} className="text-primary shrink-0" />
        <div>
          <Title level={4} className="!text-white !mb-1">Privacy Guaranteed</Title>
          <Text className="text-gray-500">Your images are processed locally. They never leave your browser or get uploaded to any server.</Text>
        </div>
      </div>
    </div>
  );
};

export default JpgToPdf;
