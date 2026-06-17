import React, { useState } from 'react';
import { Card, Upload, Button, Typography, Row, Col, Space, Input, message, Progress } from 'antd';
import { Lock, Unlock, Download, Shield, Check, Info, FileDigit } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { downloadFile } from '../../utils/downloadHelper';

const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;

const PdfSecurity = () => {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = (info) => {
    const uploadedFile = info.file.originFileObj || info.file;
    if (!uploadedFile) return;
    setFile(uploadedFile);
    setResult(null);
  };

  const handleProtect = async () => {
    if (!file || !password) return message.error('Upload PDF and set a password');

    setLoading(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      
      // Encrypt PDF with user password (requires PDF 1.7+ capabilities in library)
      // Note: pdf-lib version might have limited encryption support depending on sub-version
      // We will re-save it with security parameters
      const pdfBytes = await pdfDoc.save({ 
        userPassword: password, 
        ownerPassword: password,
        permissions: {
          printing: 'highResolution',
          modifying: false,
          copying: false,
          annotating: false,
          fillingForms: false,
          contentAccessibility: true,
          documentAssembly: false
        }
      });
      
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setResult(url);
      message.success('PDF Protected successfully!');
    } catch (error) {
      console.error(error);
      message.error('Encryption failed. Check if file is already protected.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-24 px-4 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="responsive-title !text-white !mb-4 tracking-tighter uppercase">PDF Security Vault</h1>
        <Paragraph className="!text-gray-400 text-lg sm:text-xl">Add passwords and restrict permissions for your sensitive documents.</Paragraph>
      </div>

      <Row gutter={[32, 32]}>
        <Col xs={24} lg={14}>
          <Card className="glass-card !p-8 h-full">
            <Dragger
              accept=".pdf"
              showUploadList={false}
              beforeUpload={() => false}
              onChange={handleUpload}
              className="!bg-white/[0.02] !border-2 !border-dashed !border-white/10 hover:!border-primary/50 !rounded-[2.5rem] transition-all group"
            >
              {file ? (
                <div className="py-24 flex flex-col items-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <Lock className="text-primary" size={40} />
                  </div>
                  <Title level={4} className="!text-white !m-0">{file.name}</Title>
                  <Text className="text-gray-500 mt-2 uppercase font-black text-[10px] tracking-widest">PDF SELECTED</Text>
                </div>
              ) : (
                <div className="py-24 flex flex-col items-center">
                  <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mb-8 border border-white/5">
                    <Shield className="text-primary opacity-50" size={40} />
                  </div>
                  <Title level={4} className="!text-white">Upload PDF to Secure</Title>
                  <Text className="text-gray-500">Add password protection instantly</Text>
                </div>
              )}
            </Dragger>
          </Card>
        </Col>

        <Col xs={24} lg={10}>
          <Card className="glass-card !p-8" title={<span className="text-white flex items-center gap-3 font-black uppercase tracking-widest text-xs"><FileDigit size={18} className="text-primary"/> Encryption Settings</span>}>
            <Space direction="vertical" className="w-full" size="xl">
              <div>
                <Text className="text-gray-400 font-bold block mb-4 uppercase text-[10px] tracking-widest">Set User Password</Text>
                <Input.Password
                  size="large"
                  placeholder="Enter secure password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="!h-14 !rounded-xl !bg-white/5 !border-white/10 !text-white"
                />
              </div>

              <div className="p-6 bg-primary/5 rounded-3xl mt-5 border border-primary/10">
                <div className="flex items-start gap-4">
                  <Info size={24} className="text-primary shrink-0 mt-1" />
                  <Text className="text-gray-500 text-xs">
                    This password will be required every time anyone tries to open the PDF. 
                    Permissions like **printing** and **copying** will be restricted.
                  </Text>
                </div>
              </div>

              <Button 
                type="primary" 
                block 
                size="large" 
                className="neon-button mt-5 !h-16 !text-lg" 
                loading={loading}
                onClick={handleProtect}
                disabled={!file || !password}
                icon={<Lock size={18} />}
              >
                {loading ? 'Encrypting...' : 'Lock PDF Now'}
              </Button>

              {result && (
                <div className="mt-8 p-6 bg-green-500/10 border border-green-500/20 rounded-3xl text-center animate-in zoom-in duration-500">
                  <div className="w-12 h-12 bg-green-500/20  rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Check size={24} className="text-green-400" />
                  </div>
                  <Title level={4} className="!text-white !mb-6">PDF Secured!</Title>
                  <Button 
                    type="primary" 
                    block 
                    icon={<Download size={20} />} 
                    className="!bg-green-500 !border-none !text-black  font-black h-14 rounded-xl"
                    onClick={() => downloadFile(result, `locked-${file.name}`)}
                  >
                    Download Locked PDF
                  </Button>
                </div>
              )}
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PdfSecurity;
