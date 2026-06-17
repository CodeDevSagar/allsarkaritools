import React, { useState } from 'react';
import { Card, Upload, Typography, Row, Col, Space, Button, Table, message, Empty, Spin, Tag, Tabs } from 'antd';
import { FileText, FileSpreadsheet, Presentation, Download, Eye, FileSearch, Trash2, CheckCircle, FileDigit, Scissors, Shield } from 'lucide-react';
import * as XLSX from 'xlsx';
import mammoth from 'mammoth';
import JSZip from 'jszip';
import { downloadFile } from '../../utils/downloadHelper';

const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;

const OfficeTools = () => {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const [docxHtml, setDocxHtml] = useState(null);
  const [pptSlides, setPptSlides] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = (info) => {
    // When beforeUpload returns false, info.file is the File object
    const uploadedFile = info.file.originFileObj || info.file;
    if (!uploadedFile || !(uploadedFile instanceof File || uploadedFile instanceof Blob)) return;

    const extension = uploadedFile.name.split('.').pop().toLowerCase();
    setFile(uploadedFile);
    setFileType(extension);
    setExcelData(null);
    setDocxHtml(null);
    setPptSlides(null);

    if (extension === 'xlsx' || extension === 'xls' || extension === 'csv') {
      processExcel(uploadedFile);
    } else if (extension === 'docx') {
      processDocx(uploadedFile);
    } else if (extension === 'pptx') {
      processPptx(uploadedFile);
    } else if (extension === 'ppt') {
      message.error('Binary .ppt not supported. Please save as .pptx and upload.');
    } else {
      message.success(`${uploadedFile.name} ready!`);
    }
  };

  const processExcel = (file) => {
    setLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        setExcelData(jsonData.slice(0, 50));
        message.success('Excel data loaded!');
      } catch (err) {
        console.error(err);
        message.error('Failed to parse Excel file');
      } finally {
        setLoading(false);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const processDocx = (file) => {
    setLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = e.target.result;
      mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
        .then((result) => {
          setDocxHtml(result.value);
          message.success('Word doc rendered!');
        })
        .catch(() => message.error('Failed to render Word document'))
        .finally(() => setLoading(false));
    };
    reader.readAsArrayBuffer(file);
  };

  const processPptx = async (file) => {
    setLoading(true);
    try {
      const zip = await JSZip.loadAsync(file);
      const slideFiles = Object.keys(zip.files).filter(name => name.startsWith('ppt/slides/slide') && name.endsWith('.xml'));
      
      const slides = [];
      for (const fileName of slideFiles) {
        const slideXml = await zip.file(fileName).async('string');
        const textMatches = slideXml.match(/<a:t>([^<]+)<\/a:t>/g) || [];
        const slideText = textMatches.map(m => m.replace(/<[^>]+>/g, '')).join(' ');
        
        const slideNum = fileName.match(/slide(\d+)\.xml/)?.[1] || slides.length + 1;
        slides.push({ id: parseInt(slideNum), content: slideText });
      }

      if (slides.length === 0) {
        message.warning('No slides found');
      } else {
        setPptSlides(slides.sort((a, b) => a.id - b.id));
        message.success(`Parsed ${slides.length} slides!`);
      }
    } catch (err) {
      console.error(err);
      message.error('Failed to parse PowerPoint');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-24 px-4 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="responsive-title !text-white !mb-4 tracking-tighter">OFFICE STUDIO ELITE</h1>
        <Paragraph className="!text-gray-400 text-lg sm:text-xl">Pro-grade viewing for Word, Excel, and PowerPoint. 100% Private.</Paragraph>
      </div>

      <Row gutter={[32, 32]}>
        <Col xs={24} lg={9}>
          <Card className="glass-card !p-8 h-full">
            <Dragger
              accept=".docx,.xlsx,.xls,.csv,.pptx"
              showUploadList={false}
              beforeUpload={() => false}
              onChange={handleUpload}
              className="!bg-white/[0.02] !border-2 !border-dashed !border-white/10 hover:!border-primary/50 !rounded-[2.5rem] transition-all group"
            >
              <div className="py-16 flex flex-col items-center">
                <div className="flex gap-4 mb-6">
                  <FileText className="text-blue-400" size={32} />
                  <FileSpreadsheet className="text-green-400" size={32} />
                  <Presentation className="text-orange-400" size={32} />
                </div>
                <Title level={4} className="!text-white">Upload Office Doc</Title>
                <Text className="text-gray-500">Word, Excel, or PPT (Max 25MB)</Text>
              </div>
            </Dragger>

            {file && (
              <div className="mt-8 p-8 bg-white/5 rounded-[2rem] border border-white/10">
                <div className="flex items-center gap-4 mb-6">
                  <CheckCircle className="text-primary" size={24} />
                  <div>
                    <Text className="text-white font-bold block truncate max-w-[180px]">{file.name}</Text>
                    <Text className="text-gray-500 text-[10px] uppercase font-black tracking-widest">{fileType} DETECTED</Text>
                  </div>
                </div>
                <Button 
                  type="primary" 
                  block 
                  size="large"
                  className="neon-button !h-14" 
                  onClick={() => downloadFile(file, file.name)}
                  icon={<Download size={18} />}
                >
                  Download Original
                </Button>
                <Button 
                  type="text" 
                  block 
                  danger 
                  className="mt-2" 
                  onClick={() => {setFile(null); setExcelData(null); setDocxHtml(null); setPptSlides(null);}}
                  icon={<Trash2 size={16} />}
                >
                  Clear File
                </Button>
              </div>
            )}
          </Card>
        </Col>

        <Col xs={24} lg={15}>
          <Card className="glass-card !p-0 h-full bg-white/2 border-none overflow-hidden min-h-[650px] relative">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5 backdrop-blur-3xl">
              <Title level={4} className="!text-white !m-0 !font-black uppercase tracking-widest text-xs flex items-center gap-2">
                <Eye size={16} className="text-primary" /> Dynamic Content View
              </Title>
              {loading && <Spin />}
            </div>

            <div className="p-8 max-h-[550px] overflow-auto custom-scrollbar">
              {excelData ? (
                <div className="animate-in fade-in duration-500">
                  <table className="w-full text-sm text-left text-gray-400 border-collapse">
                    <thead>
                      <tr className="bg-white/5 text-white font-black uppercase text-[10px]">
                        {excelData[0]?.map((cell, i) => (
                          <th key={i} className="px-6 py-4 border-b border-white/10">{cell || `Col ${i+1}`}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {excelData.length > 1 ? excelData.slice(1).map((row, i) => (
                        <tr key={i} className="hover:bg-white/[0.02]">
                          {Array.isArray(row) ? row.map((cell, j) => (
                            <td key={j} className="px-6 py-4 border-r border-white/5 last:border-none">{cell}</td>
                          )) : null}
                        </tr>
                      )) : (
                        <tr><td className="p-8 text-center" colSpan={100}>No data rows found</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              ) : docxHtml ? (
                <div 
                  className="bg-white text-black p-12 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-500 word-preview prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: docxHtml }}
                />
              ) : pptSlides ? (
                <div className="grid grid-cols-1 gap-6 animate-in slide-in-from-right-4 duration-500">
                  {pptSlides.map((slide) => (
                    <div key={slide.id} className="bg-white/5 border border-white/10 p-8 rounded-2xl group hover:border-primary/30 transition-all">
                      <div className="flex justify-between items-center mb-4">
                        <Tag color="orange" className="!bg-orange-500/10 !text-orange-400 !border-orange-500/20 font-black">SLIDE {slide.id}</Tag>
                      </div>
                      <Paragraph className="!text-gray-300 text-lg leading-relaxed m-0 italic">
                        {slide.content || "No text content found."}
                      </Paragraph>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-32 opacity-20 text-center">
                  <FileSearch size={100} className="text-gray-600 mb-8" />
                  <Title level={3} className="!text-gray-500 !font-black uppercase tracking-widest">Select a Document</Title>
                  <Paragraph className="text-gray-600 max-w-sm">
                    Upload Word, Excel or PowerPoint to analyze and view content instantly.
                  </Paragraph>
                </div>
              )}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OfficeTools;
