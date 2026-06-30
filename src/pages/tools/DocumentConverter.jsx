import React, { useState } from 'react';
import { Card, Upload, Button, Typography, Row, Col, Space, Select, message, Spin, Progress } from 'antd';
import { FileText, Download, FileType, Zap, Shield, Check, Info, FileSpreadsheet, Presentation, ArrowRightLeft, FileSearch, Trash2 } from 'lucide-react';
import * as XLSX from 'xlsx';
import mammoth from 'mammoth';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import JSZip from 'jszip';
import { downloadFile } from '../../utils/downloadHelper';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

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

  const convertPdfToDocx = async (file) => {
    const escapeXml = (unsafe) => {
      return unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
          case '<': return '&lt;';
          case '>': return '&gt;';
          case '&': return '&amp;';
          case '\'': return '&apos;';
          case '"': return '&quot;';
          default: return c;
        }
      });
    };

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target.result;
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const numPages = pdf.numPages;
        
        const zip = new JSZip();

        // 1. [Content_Types].xml
        zip.file("[Content_Types].xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Default Extension="png" ContentType="image/png"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`);

        // 2. _rels/.rels
        zip.folder("_rels").file(".rels", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`);

        // Create word folder and media subfolder
        const wordFolder = zip.folder("word");
        const mediaFolder = wordFolder.folder("media");

        let relsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">`;

        let documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
            xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"
            xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
            xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"
            xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
  <w:body>`;

        for (let i = 1; i <= numPages; i++) {
          setProgress(Math.round(30 + (i / numPages) * 50));
          const page = await pdf.getPage(i);
          
          // Extract and render page images (logos, shapes, signatures)
          const ops = await page.getOperatorList();
          let imageIndex = 1;
          for (let j = 0; j < ops.fnArray.length; j++) {
            if (ops.fnArray[j] === pdfjsLib.OPS.paintImageXObject || ops.fnArray[j] === pdfjsLib.OPS.paintJpegXObject) {
              const imgKey = ops.argsArray[j][0];
              try {
                const img = await new Promise((resolve) => {
                  page.objs.get(imgKey, (obj) => resolve(obj));
                });
                if (img && (img.width || img.data)) {
                  const imgCanvas = document.createElement('canvas');
                  imgCanvas.width = img.width;
                  imgCanvas.height = img.height;
                  const imgCtx = imgCanvas.getContext('2d');
                  
                  const imgData = imgCtx.createImageData(img.width, img.height);
                  if (img.data instanceof Uint8ClampedArray) {
                    imgData.data.set(img.data);
                  } else {
                    let srcIdx = 0;
                    let destIdx = 0;
                    for (let p = 0; p < img.width * img.height; p++) {
                      imgData.data[destIdx] = img.data[srcIdx];
                      imgData.data[destIdx+1] = img.data[srcIdx+1];
                      imgData.data[destIdx+2] = img.data[srcIdx+2];
                      imgData.data[destIdx+3] = 255;
                      srcIdx += 3;
                      destIdx += 4;
                    }
                  }
                  imgCtx.putImageData(imgData, 0, 0);
                  
                  const imgBlob = await new Promise((resolve) => imgCanvas.toBlob(resolve, 'image/png'));
                  const relId = `rIdPage${i}Img${imageIndex}`;
                  
                  mediaFolder.file(`image_p${i}_${imageIndex}.png`, imgBlob);
                  relsXml += `<Relationship Id="${relId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/image_p${i}_${imageIndex}.png"/>`;
                  
                  // Calculate exact dimensions in EMUs (1 point = 12700 EMUs)
                  // Clamp width/height to A4 sizes so large background images do not overflow
                  const cx = Math.min(5760000, Math.round(img.width * 12700));
                  const cy = Math.min(8150400, Math.round(img.height * 12700));
                  
                  documentXml += `
    <w:p>
      <w:pPr>
        <w:jc w:val="center"/>
      </w:pPr>
      <w:r>
        <w:drawing>
          <wp:inline distT="0" distB="0" distL="0" distR="0">
            <wp:extent cx="${cx}" cy="${cy}"/>
            <wp:effectExtent l="0" t="0" r="0" b="0"/>
            <wp:docPr id="${i * 100 + imageIndex}" name="Image ${imageIndex}"/>
            <wp:cNvGraphicFramePr>
              <a:graphicFrameLocks xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" noChangeAspect="1"/>
            </wp:cNvGraphicFramePr>
            <a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
              <a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">
                <pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">
                  <pic:nvPicPr>
                    <pic:cNvPr id="${i * 100 + imageIndex}" name="image_p${i}_${imageIndex}.png"/>
                    <pic:cNvPicPr/>
                  </pic:nvPicPr>
                  <pic:blipFill>
                    <a:blip r:embed="${relId}"/>
                    <a:stretch><a:fillRect/></a:stretch>
                  </pic:blipFill>
                  <pic:spPr>
                    <a:xfrm><a:off x="0" y="0"/><a:ext cx="${cx}" cy="${cy}"/></a:xfrm>
                    <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
                  </pic:spPr>
                </pic:pic>
              </a:graphicData>
            </a:graphic>
          </wp:inline>
        </w:drawing>
      </w:r>
    </w:p>`;
                  imageIndex++;
                }
              } catch (err) {
                console.error("Failed to extract page image", err);
              }
            }
          }
          
          const textContent = await page.getTextContent();
          const items = textContent.items || [];
          
          // Filter out empty or whitespace items
          const textItems = items.filter(item => item.str && item.str.trim() !== '');

          if (textItems.length > 0) {
            // Sort items: top-to-bottom (Y descending), then left-to-right (X ascending)
            const sortedItems = [...textItems].sort((a, b) => {
              const yA = a.transform ? a.transform[5] : 0;
              const yB = b.transform ? b.transform[5] : 0;
              const xA = a.transform ? a.transform[4] : 0;
              const xB = b.transform ? b.transform[4] : 0;
              
              if (Math.abs(yA - yB) < 5) {
                return xA - xB;
              }
              return yB - yA;
            });
            
            // Group items into lines based on Y coordinate closeness
            const lines = [];
            let currentLine = [];
            let lastY = null;
            
            for (const item of sortedItems) {
              const y = item.transform ? item.transform[5] : 0;
              if (lastY === null || Math.abs(lastY - y) < 8) {
                currentLine.push(item);
              } else {
                lines.push(currentLine);
                currentLine = [item];
              }
              lastY = y;
            }
            if (currentLine.length > 0) {
              lines.push(currentLine);
            }
            
            // Append each line as an editable paragraph in Word preserving PDF layout coordinates
            let lastLineY = null;
            for (const line of lines) {
              const firstItem = line[0];
              const xCoord = firstItem.transform ? firstItem.transform[4] : 0;
              const yCoord = firstItem.transform ? firstItem.transform[5] : 0;
              
              // Convert PDF X coordinates to Word left indent in dxa (1 point = 20 dxa)
              // Clamp left indent to prevent pushing text off A4 boundary (width is ~11906 dxa)
              const leftIndent = Math.round((xCoord - 50) * 20); // offset left margins
              const clampLeft = Math.max(0, Math.min(8500, leftIndent));
              
              // Convert PDF transform height to Word half-point font sizes
              const scaleHeight = firstItem.transform ? Math.abs(firstItem.transform[3]) : 11;
              const fontSizeHalfPoints = Math.round(scaleHeight * 2);
              const clampFontSize = Math.max(14, Math.min(72, fontSizeHalfPoints));
              
              // Convert PDF Y coordinate offsets to paragraph spacing before in dxa
              let spacingBefore = 40; // baseline tiny spacing
              if (lastLineY !== null) {
                const yDiff = lastLineY - yCoord;
                if (yDiff > 4) {
                  spacingBefore = Math.round(yDiff * 20);
                }
              }
              lastLineY = yCoord;
              const clampSpacing = Math.max(0, Math.min(1800, spacingBefore));

              const lineText = line.map(item => item.str).join(' ');
              const escapedText = escapeXml(lineText);
              
              documentXml += `
    <w:p>
      <w:pPr>
        <w:jc w:val="left"/>
        <w:ind w:left="${clampLeft}"/>
        <w:spacing w:before="${clampSpacing}" w:line="240" w:lineRule="auto"/>
      </w:pPr>
      <w:r>
        <w:rPr>
          <w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/>
          <w:sz w:val="${clampFontSize}"/>
        </w:rPr>
        <w:t xml:space="preserve">${escapedText}</w:t>
      </w:r>
    </w:p>`;
            }
          } else {
            // Fallback to rendering page to canvas at high quality (scale 2) if no text is present (scanned PDF)
            const viewport = page.getViewport({ scale: 2 });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            
            await page.render({ canvasContext: context, viewport }).promise;
            
            // Convert canvas to PNG blob
            const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
            
            // Add image to media folder
            mediaFolder.file(`image${i}.png`, blob);
            
            // Add relationship
            relsXml += `<Relationship Id="rIdImage${i}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/image${i}.png"/>`;
            
            // Add drawing markup to document
            documentXml += `
    <w:p>
      <w:r>
        <w:drawing>
          <wp:inline distT="0" distB="0" distL="0" distR="0">
            <wp:extent cx="5760000" cy="8150400"/>
            <wp:effectExtent l="0" t="0" r="0" b="0"/>
            <wp:docPr id="${i}" name="Page ${i}"/>
            <wp:cNvGraphicFramePr>
              <a:graphicFrameLocks xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" noChangeAspect="1"/>
            </wp:cNvGraphicFramePr>
            <a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
              <a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">
                <pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">
                  <pic:nvPicPr>
                    <pic:cNvPr id="${i}" name="image${i}.png"/>
                    <pic:cNvPicPr/>
                  </pic:nvPicPr>
                  <pic:blipFill>
                    <a:blip r:embed="rIdImage${i}"/>
                    <a:stretch><a:fillRect/></a:stretch>
                  </pic:blipFill>
                  <pic:spPr>
                    <a:xfrm>
                      <a:off x="0" y="0"/>
                      <a:ext cx="5760000" cy="8150400"/>
                    </a:xfrm>
                    <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
                  </pic:spPr>
                </pic:pic>
              </a:graphicData>
            </a:graphic>
          </wp:inline>
        </w:drawing>
      </w:r>
    </w:p>`;
          }

          // Page break except for last page
          if (i < numPages) {
            documentXml += `<w:p><w:r><w:br w:type="page"/></w:r></w:p>`;
          }
        }

        relsXml += `</Relationships>`;
        documentXml += `
  </w:body>
</w:document>`;

        // Write XML files
        wordFolder.folder("_rels").file("document.xml.rels", relsXml);
        wordFolder.file("document.xml", documentXml);

        const zipBlob = await zip.generateAsync({ type: "blob" });
        const url = URL.createObjectURL(zipBlob);
        downloadFile(url, `${file.name.split('.')[0]}.docx`);
        message.success('PDF to Word conversion complete!');
      } catch (err) {
        console.error(err);
        message.error('Failed to convert PDF to Word');
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
      } else if (fileType === 'pdf' && targetType === 'docx') {
        await convertPdfToDocx(file);
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
        <h1 className="responsive-title !text-white !mb-4 tracking-tighter uppercase">PDF to Word</h1>
        <Paragraph className="!text-gray-400 text-lg sm:text-xl">Convert PDF files to editable Word document format offline with 100% privacy.</Paragraph>
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
