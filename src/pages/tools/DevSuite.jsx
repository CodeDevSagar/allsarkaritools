import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Tabs, Space, Typography, Row, Col, Select, message } from 'antd';
import { Code, Copy, RefreshCw, Minimize, Sparkles, Terminal, FileCode, Check } from 'lucide-react';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const DevSuite = ({ defaultTab = 'json' }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);
  const [loading, setLoading] = useState(false);

  // General Text Input / Output states
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  // JSON Formatter states
  const [jsonIndent, setJsonIndent] = useState('2');

  // Meta Tag Generator states
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [metaKeywords, setMetaKeywords] = useState('');
  const [metaAuthor, setMetaAuthor] = useState('');

  // Helper: Copy to Clipboard
  const handleCopy = (text) => {
    if (!text) return message.warning('No output content to copy');
    navigator.clipboard.writeText(text);
    message.success('Copied to clipboard! 📋');
  };

  // JSON Formatter
  const formatJson = () => {
    if (!inputText.trim()) return message.warning('Please enter JSON text');
    try {
      const parsed = JSON.parse(inputText);
      const space = jsonIndent === 'tab' ? '\t' : parseInt(jsonIndent, 10);
      setOutputText(JSON.stringify(parsed, null, space));
      message.success('JSON formatted successfully! ⚡');
    } catch (e) {
      message.error(`Invalid JSON: ${e.message}`);
    }
  };

  // HTML Formatter
  const formatHtml = () => {
    if (!inputText.trim()) return message.warning('Please enter HTML code');
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
          if (pad !== 0) {
            pad -= 1;
          }
        } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
          indent = 1;
        } else {
          indent = 0;
        }
        
        let padding = '';
        for (let i = 0; i < pad; i++) {
          padding += '  ';
        }
        formatted += padding + node + '\r\n';
        pad += indent;
      });

      setOutputText(formatted.trim());
      setLoading(false);
      message.success('HTML formatted! 🎨');
    }, 600);
  };

  // XML Formatter
  const formatXml = () => {
    if (!inputText.trim()) return message.warning('Please enter XML code');
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
    }, 600);
  };

  // CSS Beautifier
  const beautifyCss = () => {
    if (!inputText.trim()) return message.warning('Please enter CSS code');
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
    }, 600);
  };

  // CSS Minifier
  const minifyCss = () => {
    if (!inputText.trim()) return message.warning('Please enter CSS code');
    setLoading(true);
    setTimeout(() => {
      let minified = inputText
        .replace(/\/\*[\s\S]*?\*\//g, '') // remove comments
        .replace(/\s+/g, ' ')             // collapse whitespace
        .replace(/\s*([\{\};:,])\s*/g, '$1') // remove spaces around brackets/colons
        .replace(/;}/g, '}')               // remove final semicolon
        .trim();
      setOutputText(minified);
      setLoading(false);
      message.success('CSS minified! ⚡');
    }, 500);
  };

  // Meta Tag Generator
  const generateMetaTags = () => {
    if (!metaTitle.trim()) return message.warning('Please enter a website title');
    const tags = `<!-- Primary Meta Tags -->
<title>${metaTitle}</title>
<meta name="title" content="${metaTitle}">
<meta name="description" content="${metaDesc}">
<meta name="keywords" content="${metaKeywords}">
<meta name="author" content="${metaAuthor}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:title" content="${metaTitle}">
<meta property="og:description" content="${metaDesc}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:title" content="${metaTitle}">
<meta property="twitter:description" content="${metaDesc}">`;

    setOutputText(tags);
    message.success('Meta tags generated! 🏷️');
  };

  return (
    <div className="max-w-6xl mx-auto py-24 px-4 min-h-screen">
      <div className="text-center mb-16">
        <Title className="!text-white !text-5xl !font-black !mb-4 tracking-tighter uppercase flex items-center justify-center gap-3">
          <Code size={48} className="text-cyan-400" /> Developer & Formatter Suite
        </Title>
        <Paragraph className="!text-gray-400 text-lg">
          Format, beautify, and validate HTML, JSON, and XML structures, minify CSS codes, and build standard SEO meta tags.
        </Paragraph>
      </div>

      <Tabs 
        activeKey={activeTab} 
        onChange={(key) => { setActiveTab(key); setInputText(''); setOutputText(''); }}
        className="custom-tabs-glass mb-16"
        items={[
          {
            key: 'json',
            label: <span className="flex items-center gap-2 text-white font-bold"><FileCode size={16} /> JSON Formatter</span>,
            children: (
              <Card className="glass-card !p-6">
                <Row gutter={[24, 24]}>
                  <Col xs={24} md={12}>
                    <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Input Raw JSON</Text>
                    <TextArea 
                      rows={10}
                      value={inputText}
                      onChange={e => setInputText(e.target.value)}
                      placeholder='{"name":"Sarkari Suite","private":true,"year":2026}'
                      className="!bg-white/5 !border-white/10 !text-white !rounded-xl font-mono text-sm"
                    />
                    <div className="flex gap-2 mt-4 flex-wrap">
                      <Select value={jsonIndent} onChange={setJsonIndent} className="!bg-[#0c0721] !border-white/10 !text-white w-32 custom-select-glow">
                        <Option value="2">2 Spaces</Option>
                        <Option value="4">4 Spaces</Option>
                        <Option value="tab">Tab Indent</Option>
                      </Select>
                      <Button type="primary" onClick={formatJson} className="neon-button">Format & Validate</Button>
                    </div>
                  </Col>
                  <Col xs={24} md={12}>
                    <div className="flex justify-between items-center mb-2">
                      <Text className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Output Pretty JSON</Text>
                      <Button icon={<Copy size={14} />} size="small" onClick={() => handleCopy(outputText)} className="!bg-white/5 !border-white/10 !text-white">Copy Output</Button>
                    </div>
                    <TextArea 
                      rows={10}
                      value={outputText}
                      readOnly
                      placeholder="Pretty output will appear here..."
                      className="!bg-white/[0.01] !border-white/10 !text-green-400 !rounded-xl font-mono text-sm"
                    />
                  </Col>
                </Row>
              </Card>
            )
          },
          {
            key: 'html',
            label: <span className="flex items-center gap-2 text-white font-bold"><Code size={16} /> HTML Formatter</span>,
            children: (
              <Card className="glass-card !p-6">
                <Row gutter={[24, 24]}>
                  <Col xs={24} md={12}>
                    <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Input Raw HTML</Text>
                    <TextArea 
                      rows={10}
                      value={inputText}
                      onChange={e => setInputText(e.target.value)}
                      placeholder="<div><h1>Welcome</h1><p>Learn dev tools</p></div>"
                      className="!bg-white/5 !border-white/10 !text-white !rounded-xl font-mono text-sm"
                    />
                    <Button type="primary" onClick={formatHtml} loading={loading} className="neon-button mt-4">Beautify HTML</Button>
                  </Col>
                  <Col xs={24} md={12}>
                    <div className="flex justify-between items-center mb-2">
                      <Text className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Output Formatted HTML</Text>
                      <Button icon={<Copy size={14} />} size="small" onClick={() => handleCopy(outputText)} className="!bg-white/5 !border-white/10 !text-white">Copy Output</Button>
                    </div>
                    <TextArea 
                      rows={10}
                      value={outputText}
                      readOnly
                      placeholder="Formatted markup will appear here..."
                      className="!bg-white/[0.01] !border-white/10 !text-cyan-300 !rounded-xl font-mono text-sm"
                    />
                  </Col>
                </Row>
              </Card>
            )
          },
          {
            key: 'xml',
            label: <span className="flex items-center gap-2 text-white font-bold"><Terminal size={16} /> XML Formatter</span>,
            children: (
              <Card className="glass-card !p-6">
                <Row gutter={[24, 24]}>
                  <Col xs={24} md={12}>
                    <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Input XML Source</Text>
                    <TextArea 
                      rows={10}
                      value={inputText}
                      onChange={e => setInputText(e.target.value)}
                      placeholder="<root><child id='1'>Value</child></root>"
                      className="!bg-white/5 !border-white/10 !text-white !rounded-xl font-mono text-sm"
                    />
                    <Button type="primary" onClick={formatXml} loading={loading} className="neon-button mt-4">Beautify XML</Button>
                  </Col>
                  <Col xs={24} md={12}>
                    <div className="flex justify-between items-center mb-2">
                      <Text className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Output Formatted XML</Text>
                      <Button icon={<Copy size={14} />} size="small" onClick={() => handleCopy(outputText)} className="!bg-white/5 !border-white/10 !text-white">Copy Output</Button>
                    </div>
                    <TextArea 
                      rows={10}
                      value={outputText}
                      readOnly
                      placeholder="Formatted XML will appear here..."
                      className="!bg-white/[0.01] !border-white/10 !text-yellow-300 !rounded-xl font-mono text-sm"
                    />
                  </Col>
                </Row>
              </Card>
            )
          },
          {
            key: 'css',
            label: <span className="flex items-center gap-2 text-white font-bold"><Minimize size={16} /> CSS Minifier / Beautifier</span>,
            children: (
              <Card className="glass-card !p-6">
                <Row gutter={[24, 24]}>
                  <Col xs={24} md={12}>
                    <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">CSS Input Stylesheet</Text>
                    <TextArea 
                      rows={10}
                      value={inputText}
                      onChange={e => setInputText(e.target.value)}
                      placeholder=".card { border: 1px solid white; padding: 20px; }"
                      className="!bg-white/5 !border-white/10 !text-white !rounded-xl font-mono text-sm"
                    />
                    <div className="flex gap-2 mt-4">
                      <Button type="primary" onClick={beautifyCss} loading={loading} className="neon-button">Beautify CSS</Button>
                      <Button type="default" onClick={minifyCss} loading={loading} className="!bg-white/5 !border-white/10 !text-white hover:!text-primary">Minify CSS</Button>
                    </div>
                  </Col>
                  <Col xs={24} md={12}>
                    <div className="flex justify-between items-center mb-2">
                      <Text className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Output CSS</Text>
                      <Button icon={<Copy size={14} />} size="small" onClick={() => handleCopy(outputText)} className="!bg-white/5 !border-white/10 !text-white">Copy Output</Button>
                    </div>
                    <TextArea 
                      rows={10}
                      value={outputText}
                      readOnly
                      placeholder="Formatted or minified style will appear here..."
                      className="!bg-white/[0.01] !border-white/10 !text-pink-300 !rounded-xl font-mono text-sm"
                    />
                  </Col>
                </Row>
              </Card>
            )
          },
          {
            key: 'meta',
            label: <span className="flex items-center gap-2 text-white font-bold"><Sparkles size={16} /> Meta Tag Generator</span>,
            children: (
              <Card className="glass-card !p-6">
                <Row gutter={[24, 24]}>
                  <Col xs={24} md={12}>
                    <Space direction="vertical" className="w-full" size="middle">
                      <div>
                        <Text className="text-gray-400 font-bold block mb-1 uppercase text-[9px] tracking-widest">Website Title</Text>
                        <Input value={metaTitle} onChange={e => setMetaTitle(e.target.value)} placeholder="e.g. Online Photo Compressor" className="!bg-white/5 !border-white/10 !text-white" />
                      </div>
                      <div>
                        <Text className="text-gray-400 font-bold block mb-1 uppercase text-[9px] tracking-widest">Description</Text>
                        <Input value={metaDesc} onChange={e => setMetaDesc(e.target.value)} placeholder="A brief summary of your webpage..." className="!bg-white/5 !border-white/10 !text-white" />
                      </div>
                      <div>
                        <Text className="text-gray-400 font-bold block mb-1 uppercase text-[9px] tracking-widest">Keywords (comma separated)</Text>
                        <Input value={metaKeywords} onChange={e => setMetaKeywords(e.target.value)} placeholder="e.g. tools, photo, crop" className="!bg-white/5 !border-white/10 !text-white" />
                      </div>
                      <div>
                        <Text className="text-gray-400 font-bold block mb-1 uppercase text-[9px] tracking-widest">Author</Text>
                        <Input value={metaAuthor} onChange={e => setMetaAuthor(e.target.value)} placeholder="e.g. John Doe" className="!bg-white/5 !border-white/10 !text-white" />
                      </div>
                      <Button type="primary" onClick={generateMetaTags} className="neon-button">Generate HTML Meta Tags</Button>
                    </Space>
                  </Col>
                  <Col xs={24} md={12}>
                    <div className="flex justify-between items-center mb-2">
                      <Text className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Generated Header Tags</Text>
                      <Button icon={<Copy size={14} />} size="small" onClick={() => handleCopy(outputText)} className="!bg-white/5 !border-white/10 !text-white">Copy Tags</Button>
                    </div>
                    <TextArea 
                      rows={12}
                      value={outputText}
                      readOnly
                      placeholder="Paste these inside the <head> tag of your HTML..."
                      className="!bg-white/[0.01] !border-white/10 !text-[#00f2ff] !rounded-xl font-mono text-xs"
                    />
                  </Col>
                </Row>
              </Card>
            )
          }
        ]}
      />

      {/* ── MASSIVE 1000-WORD SEO ARTICLE ABOUT DEVELOPMENT SUITE WITH 3D EMOJIS ── */}
      <section className="mt-20 text-left select-text relative z-10">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2 space-y-12">
            
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                💻 The Science of Code Formatting & Minification 🚀
              </h2>
              <p className="text-gray-400 leading-relaxed text-base">
                Welcome to the **Developer & Formatter Suite** 🛠️. As modern developers build scalable web applications, managing code presentation, structures, and payload sizes becomes a critical task. This suite provides lightweight formatting and optimization tools for HTML, JSON, CSS, and XML files directly in your web browser.
              </p>
              <p className="text-gray-400 leading-relaxed text-base">
                When developers code, they use indentation, tabs, and spaces to make files human-readable. While this makes reading code easy, it adds extra byte weights. For instance, spaces and tab indents take up memory. This extra size translates to slower loading speeds for your end-users. 📊
              </p>
              <p className="text-gray-400 leading-relaxed text-base">
                Using code minifiers, we compress stylesheets by stripping out comments, extra line spaces, and tab gaps. This reduces file weight and makes page loading near-instantaneous. 🎨
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                🛡️ Local Client-Side Formatting Standard 🔒
              </h2>
              <p className="text-gray-400 leading-relaxed text-base">
                Many online formatters upload your raw JSON files containing private API key hashes, candidate credentials, or configuration blocks directly to external databases. This exposes sensitive keys to third-party databases, search crawler caches, and logs. ⚠️
              </p>
              <p className="text-gray-400 leading-relaxed text-base">
                AllSarkari Tools guarantees **100% Client-Side Processing** 💻. All parse routines, indentation rendering, HTML tags formatting, and CSS minification happen locally. Your keys and datasets never leave your device. 🛡️
              </p>
            </div>

          </div>

          {/* Right Column: Tips & Info */}
          <div className="space-y-8">
            <div className="p-8 bg-gradient-to-br from-[#1b103c]/60 to-[#0c0721]/90 rounded-[2.5rem] border border-[#7000ff]/20 shadow-2xl backdrop-blur-md">
              <h3 className="text-lg font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                💡 Developer Best Practices 📐
              </h3>
              <ul className="text-gray-400 text-xs space-y-4 leading-relaxed">
                <li>• <strong>JSON Indents:</strong> Use 2-space indentation for tiny client payloads.</li>
                <li>• <strong>CSS Minify:</strong> Always minify production CSS bundles to improve lighthouse scores.</li>
                <li>• <strong>Meta Tags:</strong> Proper Og:Title tags are essential for social media shares.</li>
                <li>• <strong>XML Validation:</strong> Ensure all tags match case-sensitivity rules.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-6 mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight flex items-center gap-3">
            ❓ Frequently Asked Questions (FAQ) 💬
          </h2>
          
          <div className="space-y-4">
            {[
              {
                q: "What is the difference between minification and compilation? ⚡",
                a: "Minification reduces file size by removing formatting characters (spaces, line breaks, comments) without altering code functionality. Compilation transforms source code from one language to another (e.g. TypeScript to JavaScript)."
              },
              {
                q: "Why does invalid JSON throw an error during formatting? ❌",
                a: "JSON has strict formatting rules, such as double quotes around property names and strings. If a comma is missing or quotes are single, standard parsers fail to read the tree, requiring manual fixing."
              },
              {
                q: "What are Meta Tags and why are they important for SEO? 🏷️",
                a: "Meta tags provide search engines with structured information about your website. Title and Description tags influence search snippets, while Open Graph tags specify how links look when shared on platforms like Facebook and Twitter."
              }
            ].map((faq, idx) => (
              <div key={idx} className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                <h4 className="text-white font-bold text-base md:text-lg mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary shrink-0" /> {faq.q}
                </h4>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed pl-4">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DevSuite;
