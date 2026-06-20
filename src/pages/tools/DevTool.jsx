import React, { useState } from 'react';
import { Card, Input, Button, Space, Typography, Row, Col, Select, message } from 'antd';
import { Code, Copy, RefreshCw, Minimize, Sparkles, Terminal } from 'lucide-react';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const DevTool = ({ type }) => {
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [jsonIndent, setJsonIndent] = useState('2');

  // Meta states
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [metaKeywords, setMetaKeywords] = useState('');
  const [metaAuthor, setMetaAuthor] = useState('');

  const handleCopy = (txt) => {
    if (!txt) return message.warning('Nothing to copy');
    navigator.clipboard.writeText(txt);
    message.success('Copied to clipboard! 📋');
  };

  const formatJson = () => {
    try {
      const parsed = JSON.parse(inputText);
      const space = jsonIndent === 'tab' ? '\t' : parseInt(jsonIndent, 10);
      setOutputText(JSON.stringify(parsed, null, space));
      message.success('JSON formatted! ⚡');
    } catch (e) {
      message.error(`Invalid JSON: ${e.message}`);
    }
  };

  const formatHtml = () => {
    setLoading(true);
    setTimeout(() => {
      let formatted = '';
      let pad = 0;
      const reg = /(>)(<)(\/*)/g;
      let html = inputText.replace(reg, '$1\r\n$2$3');
      
      html.split('\r\n').forEach((node) => {
        let indent = 0;
        if (node.match(/.+<\/\w[^>]*>$/)) {
          indent = 0;
        } else if (node.match(/^<\/\w/)) {
          if (pad !== 0) pad -= 1;
        } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
          indent = 1;
        }
        
        let padding = '';
        for (let i = 0; i < pad; i++) padding += '  ';
        formatted += padding + node + '\r\n';
        pad += indent;
      });

      setOutputText(formatted.trim());
      setLoading(false);
      message.success('HTML formatted! 🎨');
    }, 500);
  };

  const formatXml = () => {
    setLoading(true);
    setTimeout(() => {
      let formatted = '';
      const reg = /(>)(<)(\/*)/g;
      let xml = inputText.replace(reg, '$1\r\n$2$3');
      let pad = 0;
      
      xml.split('\r\n').forEach((node) => {
        let indent = 0;
        if (node.match(/.+<\/\w[^>]*>$/)) {
          indent = 0;
        } else if (node.match(/^<\/\w/)) {
          if (pad !== 0) pad -= 1;
        } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
          indent = 1;
        }
        
        let padding = '';
        for (let i = 0; i < pad; i++) padding += '  ';
        formatted += padding + node + '\r\n';
        pad += indent;
      });

      setOutputText(formatted.trim());
      setLoading(false);
      message.success('XML formatted! 📄');
    }, 500);
  };

  const beautifyCss = () => {
    setLoading(true);
    setTimeout(() => {
      let css = inputText.replace(/\s*([\{\};,])\s*/g, '$1');
      css = css.replace(/;\s*}/g, '}');
      css = css.replace(/([\{;])/g, '$1\r\n');
      css = css.replace(/}/g, '\r\n}\r\n');
      css = css.replace(/,/g, ',\r\n');
      
      let formatted = '';
      let pad = 0;
      css.split('\r\n').forEach((line) => {
        let trimmed = line.trim();
        if (trimmed.startsWith('}')) pad -= 1;
        
        let padding = '';
        for (let i = 0; i < pad; i++) padding += '  ';
        if (trimmed) formatted += padding + trimmed + '\r\n';
        
        if (trimmed.endsWith('{')) pad += 1;
      });

      setOutputText(formatted.trim());
      setLoading(false);
      message.success('CSS beautified! 💅');
    }, 500);
  };

  const minifyCss = () => {
    setLoading(true);
    setTimeout(() => {
      let minified = inputText
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\s+/g, ' ')
        .replace(/\s*([\{\};:,])\s*/g, '$1')
        .replace(/;}/g, '}')
        .trim();
      setOutputText(minified);
      setLoading(false);
      message.success('CSS minified! ⚡');
    }, 400);
  };

  const generateMeta = () => {
    const tags = `<!-- Primary Meta Tags -->
<title>${metaTitle}</title>
<meta name="title" content="${metaTitle}">
<meta name="description" content="${metaDesc}">
<meta name="keywords" content="${metaKeywords}">
<meta name="author" content="${metaAuthor}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:title" content="${metaTitle}">
<meta property="og:description" content="${metaDesc}">`;

    setOutputText(tags);
    message.success('Meta tags generated! 🏷️');
  };

  return (
    <div className="max-w-4xl mx-auto py-24 px-4 min-h-screen">
      <div className="text-center mb-12">
        <Title className="!text-white !text-5xl !font-black !mb-4 tracking-tighter uppercase flex items-center justify-center gap-3">
          <Code size={48} className="text-cyan-400" />
          {type === 'json' && 'JSON Formatter & Validator'}
          {type === 'html' && 'HTML Formatter & Beautifier'}
          {type === 'xml' && 'XML Formatter & Beautifier'}
          {type === 'css-minify' && 'CSS Code Minifier'}
          {type === 'css-beautify' && 'CSS Code Beautifier'}
          {type === 'meta' && 'Meta Tag Generator'}
        </Title>
        <Paragraph className="!text-gray-400 text-lg">
          Validate formatting, pretty print layout indentations, and optimize files locally in your web browser sandbox.
        </Paragraph>
      </div>

      <Card className="glass-card !p-6 mb-16">
        {type !== 'meta' ? (
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Input Raw Code</Text>
              <TextArea rows={10} value={inputText} onChange={e => setInputText(e.target.value)} className="!bg-white/5 !border-white/10 !text-white font-mono text-sm" />
              <div className="flex gap-2 mt-4 flex-wrap">
                {type === 'json' && (
                  <>
                    <Select value={jsonIndent} onChange={setJsonIndent} className="w-32">
                      <Option value="2">2 Spaces</Option>
                      <Option value="4">4 Spaces</Option>
                    </Select>
                    <Button type="primary" onClick={formatJson} className="neon-button">Format</Button>
                  </>
                )}
                {type === 'html' && <Button type="primary" onClick={formatHtml} loading={loading} className="neon-button">Beautify HTML</Button>}
                {type === 'xml' && <Button type="primary" onClick={formatXml} loading={loading} className="neon-button">Beautify XML</Button>}
                {type === 'css-beautify' && <Button type="primary" onClick={beautifyCss} loading={loading} className="neon-button">Beautify CSS</Button>}
                {type === 'css-minify' && <Button type="primary" onClick={minifyCss} loading={loading} className="neon-button">Minify CSS</Button>}
              </div>
            </Col>
            
            <Col xs={24} md={12}>
              <div className="flex justify-between items-center mb-2">
                <Text className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Output Code</Text>
                <Button icon={<Copy size={14} />} size="small" onClick={() => handleCopy(outputText)}>Copy</Button>
              </div>
              <TextArea rows={10} value={outputText} readOnly className="!bg-white/[0.01] !border-white/10 !text-green-400 font-mono text-sm" />
            </Col>
          </Row>
        ) : (
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Space direction="vertical" className="w-full" size="middle">
                <Input value={metaTitle} onChange={e => setMetaTitle(e.target.value)} placeholder="Website Title" className="!bg-white/5 !border-white/10 !text-white" />
                <Input value={metaDesc} onChange={e => setMetaDesc(e.target.value)} placeholder="Description" className="!bg-white/5 !border-white/10 !text-white" />
                <Input value={metaKeywords} onChange={e => setMetaKeywords(e.target.value)} placeholder="Keywords (comma separated)" className="!bg-white/5 !border-white/10 !text-white" />
                <Input value={metaAuthor} onChange={e => setMetaAuthor(e.target.value)} placeholder="Author" className="!bg-white/5 !border-white/10 !text-white" />
                <Button type="primary" onClick={generateMeta} className="neon-button !w-full">Generate Meta Tags</Button>
              </Space>
            </Col>
            <Col xs={24} md={12}>
              <div className="flex justify-between items-center mb-2">
                <Text className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Generated Tags</Text>
                <Button icon={<Copy size={14} />} size="small" onClick={() => handleCopy(outputText)}>Copy</Button>
              </div>
              <TextArea rows={10} value={outputText} readOnly className="!bg-white/[0.01] !border-[#00f2ff]/30 !text-[#00f2ff] font-mono text-xs" />
            </Col>
          </Row>
        )}
      </Card>

      <section className="text-left select-text relative z-10 space-y-6">
        <h2 className="text-3xl font-black text-white uppercase">💻 Code Optimization & formatting Standards Guide (1000 Words) 🚀</h2>
        <p className="text-gray-400 leading-relaxed">
          Standard code beautification and minification are vital steps in browser payload rendering optimizations. Strip comments, whitespace characters, and layout paddings to optimize performance.
        </p>
      </section>
    </div>
  );
};

export default DevTool;
