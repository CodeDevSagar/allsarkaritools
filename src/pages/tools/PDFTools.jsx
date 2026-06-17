import React, { useState } from 'react';
import { Card, Upload, Button, Typography, Space, message, List, Progress, Tag } from 'antd';
import { FileText, Download, Plus, Trash2, Merge, Layout, ArrowRight, Shield, Check, Image as ImageIcon } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { downloadFile } from '../../utils/downloadHelper';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;

const PDFTools = () => {
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = (info) => {
    // Collect all valid PDF files from the list
    const updatedList = info.fileList.map(f => f.originFileObj || f);
    const validFiles = updatedList.filter(file => {
      const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
      return isPdf;
    });

    if (validFiles.length < updatedList.length) {
      message.error('Some files were not PDFs and were skipped.');
    }
    
    // Map back to Ant Design format for List component compatibility if needed, 
    // but here we just store the actual File objects
    setFileList(validFiles.map((file, i) => ({
      uid: `file-${i}-${Date.now()}`,
      name: file.name,
      size: file.size,
      originFileObj: file
    })));
    setResult(null);
  };

  const removeFile = (uid) => {
    setFileList(prev => prev.filter(f => f.uid !== uid));
    setResult(null);
  };

  const handleMerge = async () => {
    if (fileList.length < 2) return message.error('Upload at least 2 PDFs to merge');

    setLoading(true);
    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of fileList) {
        const arrayBuffer = await file.originFileObj.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setResult(url);
      message.success('PDFs merged successfully!');
    } catch (error) {
      console.error(error);
      message.error('Failed to merge PDFs.');
    } finally {
      setLoading(false);
    }
  };

  const handlePdfToImage = async () => {
    if (fileList.length === 0) return message.error('Upload a PDF first');
    
    setLoading(true);
    try {
      const file = fileList[0].originFileObj;
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const page = await pdf.getPage(1);
      
      const viewport = page.getViewport({ scale: 2 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      
      await page.render({ canvasContext: context, viewport }).promise;
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      downloadFile(dataUrl, `pdf-export-${Date.now()}.jpg`);
      message.success('Page 1 exported as JPG!');
    } catch (error) {
      console.error(error);
      message.error('Failed to export image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-24 px-4 min-h-screen">
      <div className="text-center mb-16">
        <Title className="!text-white !text-5xl !font-black !mb-4 tracking-tighter uppercase">PDF Power Studio</Title>
        <Paragraph className="!text-gray-400 text-lg">Merge documents and extract images with 100% privacy.</Paragraph>
      </div>

      <Card className="glass-card !p-8">
        <Dragger 
          accept=".pdf" 
          multiple 
          showUploadList={false}
          beforeUpload={() => false}
          onChange={handleUpload}
          className="!bg-white/[0.02] !border-2 !border-dashed !border-white/10 hover:!border-primary/50 !rounded-[2.5rem] transition-all group"
        >
          <div className="w-full h-40 flex flex-col items-center justify-center">
            <Plus size={48} className="text-primary mb-4 group-hover:scale-110 transition-transform" />
            <Text className="text-white font-bold text-lg">Click or Drag PDF files here</Text>
            <Text className="text-gray-500">Supports multiple files</Text>
          </div>
        </Dragger>

        {fileList.length > 0 && (
          <div className="mt-10 animate-in fade-in duration-500">
            <div className="flex justify-between items-center mb-6">
              <Text className="text-white font-bold uppercase tracking-widest text-xs">Selected Files ({fileList.length})</Text>
              <Button type="link" danger onClick={() => setFileList([])}>Clear All</Button>
            </div>
            <List
              dataSource={fileList}
              renderItem={file => (
                <div className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/10 mb-3 group hover:border-primary/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <FileText size={24} className="text-primary" />
                    </div>
                    <div>
                      <Text className="text-white font-bold block truncate max-w-[250px]">{file.name}</Text>
                      <Text className="text-gray-500 text-xs">{(file.size / 1024 / 1024).toFixed(2)} MB</Text>
                    </div>
                  </div>
                  <Button 
                    type="text" 
                    danger 
                    icon={<Trash2 size={18} />} 
                    onClick={() => removeFile(file.uid)}
                    className="hover:!bg-red-500/10"
                  />
                </div>
              )}
            />
          </div>
        )}

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button 
            type="primary" 
            size="large" 
            className="neon-button !h-16 !text-lg" 
            icon={<Merge size={24} />}
            loading={loading}
            onClick={handleMerge}
            disabled={fileList.length < 2}
          >
            {loading ? 'Merging...' : 'Merge PDFs'}
          </Button>
          <Button 
            size="large" 
            className="!h-16 !text-lg !bg-white/5 !text-white !border-white/10" 
            icon={<ImageIcon size={24} />}
            loading={loading}
            onClick={handlePdfToImage}
            disabled={fileList.length === 0}
          >
            PDF to JPG (Page 1)
          </Button>
        </div>

        {result && (
          <div className="mt-10 p-10 bg-primary/10 border border-primary/20 rounded-[2.5rem] text-center animate-in zoom-in duration-500">
            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Check size={32} className="text-primary" />
            </div>
            <Title level={3} className="!text-white !mb-2">Success!</Title>
            <Paragraph className="!text-gray-400 mb-8">Your processed PDF is ready for download.</Paragraph>
            <Button 
              icon={<Download size={20} />} 
              type="primary" 
              size="large"
              className="!bg-primary !border-none !text-black font-black h-16 px-12 rounded-2xl shadow-[0_10px_30px_rgba(0,242,255,0.3)]"
              onClick={() => {
                const link = document.createElement('a');
                link.href = result;
                link.download = `sarkari-tools-pdf-${Date.now()}.pdf`;
                link.click();
              }}
            >
              Download PDF
            </Button>
          </div>
        )}
      </Card>

      <div className="mt-12 flex items-start gap-4 p-8 glass-card bg-primary/5 border-none">
        <Shield size={32} className="text-primary mt-1 shrink-0" />
        <div>
          <Text className="text-white font-bold block mb-2 text-lg">Privacy Guaranteed</Text>
          <Text className="text-gray-500">
            Your files are processed 100% locally in your browser. 
            No content is ever uploaded to any server.
          </Text>
        </div>
      </div>
    </div>
  );
};

export default PDFTools;
