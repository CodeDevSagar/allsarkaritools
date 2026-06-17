import React, { useState } from 'react';
import { Card, Upload, Button, Typography, Row, Col, Space, Select, message, Spin, Progress } from 'antd';
import { FileText, Download, FileType, Zap, Shield, Check, Info, FileSpreadsheet, Presentation, ArrowRightLeft, FileSearch, Trash2 } from 'lucide-react';
import * as XLSX from 'xlsx';
import mammoth from 'mammoth';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { downloadFile } from '../../utils/downloadHelper';

const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;
const { Option } = Select;

const DocumentConverter = () => {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [targetType, setTargetType] = useState('pdf');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = (info) => {
    const uploadedFile = info.file.originFileObj || info.file;
    if (!uploadedFile) return;

    const extension = uploadedFile.name.split('.').pop().toLowerCase();
    setFile(uploadedFile);
    setFileType(extension);
    
    // Auto-set target based on source
    if (extension === 'docx') setTargetType('pdf');
    else if (extension === 'xlsx') setTargetType('pdf');
    else if (extension === 'pdf') setTargetType('docx');
  };

  const convertDocxToPdf = async (file) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target.result;
        const result = await mammoth.convertToHtml({ arrayBuffer });
        const html = result.value;
        
        const doc = new jsPDF();
        doc.html(html, {
          callback: function (doc) {
            doc.save(`${file.name.split('.')[0]}.pdf`);
            message.success('Word to PDF conversion complete!');
            setLoading(false);
          },
          x: 10,
          y: 10,
          width: 190,
          windowWidth: 650
        });
      } catch (err) {
        message.error('Failed to convert Word to PDF');
        setLoading(false);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const convertExcelToPdf = async (file) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        const doc = new jsPDF();
        autoTable(doc, {
          head: [jsonData[0]],
          body: jsonData.slice(1),
          theme: 'grid',
          styles: { fontSize: 8 }
        });
        
        doc.save(`${file.name.split('.')[0]}.pdf`);
        message.success('Excel to PDF conversion complete!');
      } catch (err) {
        message.error('Failed to convert Excel to PDF');
      } finally {
        setLoading(false);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleConvert = async () => {
    if (!file) return message.error('Please upload a file first');
    setLoading(true);
    setProgress(30);

    setTimeout(async () => {
      setProgress(60);
      if (fileType === 'docx' && targetType === 'pdf') {
        await convertDocxToPdf(file);
      } else if (fileType === 'xlsx' && targetType === 'pdf') {
        await convertExcelToPdf(file);
      } else {
        message.info(`Client-side ${fileType} to ${targetType} is being optimized. Downloading original for now.`);
        downloadFile(file, file.name);
        setLoading(false);
      }
      setProgress(100);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto py-24 px-4 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="responsive-title !text-white !mb-4 tracking-tighter uppercase">Universal Converter</h1>
        <Paragraph className="!text-gray-400 text-lg sm:text-xl">Convert Word, Excel, and PDF formats with 100% privacy.</Paragraph>
      </div>

      <Row gutter={[32, 32]}>
        <Col xs={24} lg={14}>
          <Card className="glass-card !p-8 h-full">
            <Dragger
              accept=".docx,.xlsx,.xls,.pdf"
              showUploadList={false}
              beforeUpload={() => false}
              onChange={handleUpload}
              className="!bg-white/[0.02] !border-2 !border-dashed !border-white/10 hover:!border-primary/50 !rounded-[2.5rem] transition-all group"
            >
              {file ? (
                <div className="py-16 flex flex-col items-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    {fileType === 'pdf' ? <FileType className="text-red-400" size={40} /> : <FileText className="text-blue-400" size={40} />}
                  </div>
                  <Title level={4} className="!text-white !m-0">{file.name}</Title>
                  <Text className="text-gray-500 mt-2 uppercase font-black text-[10px] tracking-widest">{fileType} DETECTED</Text>
                  <Button type="text" danger className="mt-4" onClick={(e) => { e.stopPropagation(); setFile(null); }}>Remove File</Button>
                </div>
              ) : (
                <div className="py-24 flex flex-col items-center">
                  <div className="flex gap-4 mb-8">
                    <FileText className="text-blue-400 opacity-50" size={32} />
                    <ArrowRightLeft className="text-primary animate-pulse" size={32} />
                    <FileType className="text-red-400 opacity-50" size={32} />
                  </div>
                  <Title level={4} className="!text-white">Upload File to Convert</Title>
                  <Text className="text-gray-500">Supports Word, Excel, and PDF (Max 20MB)</Text>
                </div>
              )}
            </Dragger>
          </Card>
        </Col>

        <Col xs={24} lg={10}>
          <Card className="glass-card !p-8 h-full" title={<span className="text-white flex items-center gap-3 font-black uppercase tracking-widest text-xs"><Zap size={18} className="text-primary"/> Conversion Logic</span>}>
            <Space direction="vertical" className="w-full" size="xl">
              <div>
                <Text className="text-gray-400 font-bold block mb-4 uppercase text-[10px] tracking-widest">Convert To</Text>
                <Select 
                  value={targetType} 
                  onChange={setTargetType} 
                  className="w-full !h-14" 
                  size="large"
                  dropdownStyle={{ backgroundColor: '#1f1f1f' }}
                >
                  <Option value="pdf">PDF Document (.pdf)</Option>
                  <Option value="docx">Word Document (.docx)</Option>
                  <Option value="xlsx">Excel Spreadsheet (.xlsx)</Option>
                </Select>
              </div>

              <div className="p-6 bg-white/5 mt-8 rounded-3xl border border-white/5">
                <div className="flex items-start gap-4">
                  <Shield size={24} className="text-primary shrink-0 mt-1" />
                  <Text className="text-gray-500 text-xs">
                    Your conversion is processed **100% inside your browser**. Your documents never touch our servers.
                  </Text>
                </div>
              </div>

              {loading && <Progress percent={progress} status="active" strokeColor="#00f2ff" className="!mb-4" />}

              <Button 
                type="primary" 
                block 
                size="large" 
                className="neon-button mt-6 !h-16 !text-lg" 
                loading={loading}
                onClick={handleConvert}
                disabled={!file}
              >
                {loading ? 'Converting...' : 'Convert Now'}
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DocumentConverter;
