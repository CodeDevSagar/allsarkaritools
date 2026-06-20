import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Tabs, Space, Typography, Row, Col, Checkbox, Slider, message, Tag } from 'antd';
import { Settings, Copy, RefreshCw, Layers, FileText, Globe, Landmark, Code, Shield, Key } from 'lucide-react';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const UtilitySuite = () => {
  const [activeTab, setActiveTab] = useState('password');
  
  // Clipboard helper
  const handleCopy = (text) => {
    if (!text) return message.warning('No output content to copy');
    navigator.clipboard.writeText(text);
    message.success('Copied to clipboard! 📋');
  };

  // 1. Password Generator states
  const [passLength, setPassLength] = useState(16);
  const [passUpper, setPassUpper] = useState(true);
  const [passLower, setPassLower] = useState(true);
  const [passNumbers, setPassNumbers] = useState(true);
  const [passSymbols, setPassSymbols] = useState(true);
  const [generatedPass, setGeneratedPass] = useState('');

  const generatePassword = () => {
    let chars = '';
    if (passUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (passLower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (passNumbers) chars += '0123456789';
    if (passSymbols) chars += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (!chars) return message.error('Select at least one character set');

    let pass = '';
    for (let i = 0; i < passLength; i++) {
      const idx = Math.floor(Math.random() * chars.length);
      pass += chars[idx];
    }
    setGeneratedPass(pass);
    message.success('Password generated! 🔑');
  };

  // 2. Word Counter states
  const [counterText, setCounterText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [paragraphCount, setParagraphCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);

  const handleTextCountChange = (e) => {
    const text = e.target.value;
    setCounterText(text);
    
    const cleanText = text.trim();
    if (!cleanText) {
      setWordCount(0);
      setCharCount(0);
      setParagraphCount(0);
      setReadingTime(0);
      return;
    }

    const words = cleanText.split(/\s+/).filter(w => w.length > 0);
    setWordCount(words.length);
    setCharCount(text.length);
    setParagraphCount(text.split(/\n+/).filter(p => p.trim().length > 0).length);
    setReadingTime(Math.ceil(words.length / 200)); // avg 200 wpm
  };

  // 3. Remove Duplicate Lines states
  const [dupInputText, setDupInputText] = useState('');
  const [dupOutputText, setDupOutputText] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(true);

  const removeDuplicateLines = () => {
    if (!dupInputText.trim()) return message.warning('Please enter input text');
    const lines = dupInputText.split(/\n/);
    const unique = [];
    const seen = new Set();

    lines.forEach((line) => {
      const key = caseSensitive ? line : line.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(line);
      }
    });

    setDupOutputText(unique.join('\n'));
    message.success('Duplicate lines removed! 🧹');
  };

  // 4. Currency Converter states
  const [currAmount, setCurrAmount] = useState('100');
  const [fromCurr, setFromCurr] = useState('USD');
  const [toCurr, setToCurr] = useState('INR');
  const [convertedResult, setConvertedResult] = useState('');

  // Fixed simulated rates based on 2026 guidelines
  const rates = {
    USD: { INR: 86.5, EUR: 0.92, GBP: 0.78, JPY: 154.2, USD: 1 },
    INR: { USD: 0.012, EUR: 0.011, GBP: 0.009, JPY: 1.78, INR: 1 },
    EUR: { USD: 1.09, INR: 94.2, GBP: 0.85, JPY: 167.5, EUR: 1 },
    GBP: { USD: 1.28, INR: 110.8, EUR: 1.18, JPY: 197.8, GBP: 1 },
    JPY: { USD: 0.0065, INR: 0.56, EUR: 0.006, GBP: 0.005, JPY: 1 }
  };

  const convertCurrency = () => {
    const amt = parseFloat(currAmount);
    if (isNaN(amt) || amt <= 0) return message.warning('Enter a valid amount');
    const rate = rates[fromCurr][toCurr];
    const res = amt * rate;
    setConvertedResult(`${amt.toLocaleString()} ${fromCurr} = ${res.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${toCurr}`);
    message.success('Currency converted! 💰');
  };

  // 5. Lorem Ipsum states
  const [loremType, setLoremType] = useState('paragraphs');
  const [loremCount, setLoremCount] = useState(3);
  const [loremOutput, setLoremOutput] = useState('');

  const generateLoremIpsum = () => {
    const baseLorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    
    if (loremType === 'paragraphs') {
      const paragraphs = [];
      for (let i = 0; i < loremCount; i++) {
        paragraphs.push(baseLorem);
      }
      setLoremOutput(paragraphs.join('\n\n'));
    } else if (loremType === 'sentences') {
      const sentences = baseLorem.split('. ');
      const result = [];
      for (let i = 0; i < loremCount; i++) {
        result.push(sentences[i % sentences.length]);
      }
      setLoremOutput(result.join('. ') + '.');
    } else {
      const words = baseLorem.replace(/[.,]/g, '').split(' ');
      const result = [];
      for (let i = 0; i < loremCount; i++) {
        result.push(words[i % words.length]);
      }
      setLoremOutput(result.join(' '));
    }
    message.success('Placeholder text generated! ✍️');
  };

  // 6. QR Code States
  const [qrText, setQrText] = useState('https://allsarkaritools.com');
  const [qrFgColor, setQrFgColor] = useState('#000000');
  const [qrBgColor, setQrBgColor] = useState('#ffffff');
  const [qrImageUrl, setQrImageUrl] = useState('');

  const generateQrCode = () => {
    if (!qrText.trim()) return message.warning('Enter text for QR Code');
    const fg = qrFgColor.replace('#', '');
    const bg = qrBgColor.replace('#', '');
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrText)}&color=${fg}&bgcolor=${bg}`;
    setQrImageUrl(url);
    message.success('QR Code generated! 📱');
  };

  // 7. Color Picker & Palette states
  const [pickerColor, setPickerColor] = useState('#00f2ff');
  const paletteColors = ['#00f2ff', '#ff007f', '#7000ff', '#ff8c2b', '#10b981', '#3b82f6', '#f59e0b', '#ec4899', '#6366f1', '#14b8a6'];

  return (
    <div className="max-w-6xl mx-auto py-24 px-4 min-h-screen">
      <div className="text-center mb-16">
        <Title className="!text-white !text-5xl !font-black !mb-4 tracking-tighter uppercase flex items-center justify-center gap-3">
          <Settings size={48} className="text-pink-500" /> General Utility Suite
        </Title>
        <Paragraph className="!text-gray-400 text-lg">
          Generate secure keys, count words, build multicolor QR codes, picker colors, convert currency rates, and strip duplicates.
        </Paragraph>
      </div>

      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab}
        className="custom-tabs-glass mb-16"
        items={[
          {
            key: 'password',
            label: <span className="flex items-center gap-2 text-white font-bold"><Key size={16} /> Password Gen</span>,
            children: (
              <Card className="glass-card !p-6">
                <Space direction="vertical" className="w-full" size="large">
                  <Row gutter={24}>
                    <Col xs={24} md={12} className="space-y-4">
                      <div>
                        <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Password Length: {passLength}</Text>
                        <Slider min={8} max={64} value={passLength} onChange={setPassLength} />
                      </div>
                      <div className="flex flex-col gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                        <Checkbox checked={passUpper} onChange={e => setPassUpper(e.target.checked)} className="!text-white">Uppercase Letters (A-Z)</Checkbox>
                        <Checkbox checked={passLower} onChange={e => setPassLower(e.target.checked)} className="!text-white">Lowercase Letters (a-z)</Checkbox>
                        <Checkbox checked={passNumbers} onChange={e => setPassNumbers(e.target.checked)} className="!text-white">Numbers (0-9)</Checkbox>
                        <Checkbox checked={passSymbols} onChange={e => setPassSymbols(e.target.checked)} className="!text-white">Symbols (!@#$)</Checkbox>
                      </div>
                      <Button type="primary" size="large" onClick={generatePassword} className="neon-button !w-full">Generate Secure Password</Button>
                    </Col>
                    
                    <Col xs={24} md={12} className="flex flex-col justify-center">
                      <div className="p-6 bg-white/[0.02] border border-white/10 rounded-3xl text-center space-y-4">
                        <Text className="text-gray-500 block text-xs uppercase tracking-wider">Your Generated Password</Text>
                        <div className="p-4 bg-black/40 rounded-xl font-mono text-xl text-primary font-bold tracking-wider select-all break-all min-h-[50px] flex items-center justify-center">
                          {generatedPass || 'Click Generate Button'}
                        </div>
                        {generatedPass && (
                          <Button type="default" onClick={() => handleCopy(generatedPass)} className="!bg-white/5 !border-white/10 !text-white">Copy Key</Button>
                        )}
                      </div>
                    </Col>
                  </Row>
                </Space>
              </Card>
            )
          },
          {
            key: 'counter',
            label: <span className="flex items-center gap-2 text-white font-bold"><FileText size={16} /> Word Counter</span>,
            children: (
              <Card className="glass-card !p-6">
                <Space direction="vertical" className="w-full" size="large">
                  <TextArea 
                    rows={8}
                    value={counterText}
                    onChange={handleTextCountChange}
                    placeholder="Paste or type your content here to calculate details..."
                    className="!bg-white/5 !border-white/10 !text-white !rounded-xl text-base"
                  />
                  <Row gutter={[16, 16]} className="text-center">
                    {[
                      { label: "Words", val: wordCount },
                      { label: "Characters", val: charCount },
                      { label: "Paragraphs", val: paragraphCount },
                      { label: "Read Time", val: `${readingTime} Min` }
                    ].map((s, idx) => (
                      <Col xs={12} sm={6} key={idx}>
                        <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                          <Text className="text-gray-500 block text-xs uppercase tracking-wider mb-1">{s.label}</Text>
                          <span className="text-2xl font-black text-white">{s.val}</span>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Space>
              </Card>
            )
          },
          {
            key: 'duplicates',
            label: <span className="flex items-center gap-2 text-white font-bold"><Layers size={16} /> Remove Duplicates</span>,
            children: (
              <Card className="glass-card !p-6">
                <Row gutter={[24, 24]}>
                  <Col xs={24} md={12}>
                    <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Input Raw Lines List</Text>
                    <TextArea 
                      rows={10}
                      value={dupInputText}
                      onChange={e => setDupInputText(e.target.value)}
                      placeholder="Line 1&#10;Line 2&#10;Line 1 (Duplicate)&#10;Line 3"
                      className="!bg-white/5 !border-white/10 !text-white !rounded-xl text-sm"
                    />
                    <div className="flex gap-4 mt-4 items-center">
                      <Checkbox checked={caseSensitive} onChange={e => setCaseSensitive(e.target.checked)} className="!text-white">Case-Sensitive</Checkbox>
                      <Button type="primary" onClick={removeDuplicateLines} className="neon-button">Remove Duplicates</Button>
                    </div>
                  </Col>
                  
                  <Col xs={24} md={12}>
                    <div className="flex justify-between items-center mb-2">
                      <Text className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Clean Unique Lines List</Text>
                      <Button icon={<Copy size={14} />} size="small" onClick={() => handleCopy(dupOutputText)} className="!bg-white/5 !border-white/10 !text-white">Copy Output</Button>
                    </div>
                    <TextArea 
                      rows={10}
                      value={dupOutputText}
                      readOnly
                      placeholder="Unique lines list will appear here..."
                      className="!bg-white/[0.01] !border-white/10 !text-[#00f2ff] !rounded-xl text-sm"
                    />
                  </Col>
                </Row>
              </Card>
            )
          },
          {
            key: 'currency',
            label: <span className="flex items-center gap-2 text-white font-bold"><Landmark size={16} /> Currency Converter</span>,
            children: (
              <Card className="glass-card !p-6">
                <Space direction="vertical" className="w-full" size="large">
                  <Row gutter={16} align="middle">
                    <Col xs={24} sm={8}>
                      <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Amount</Text>
                      <Input type="number" size="large" value={currAmount} onChange={e => setCurrAmount(e.target.value)} className="!bg-white/5 !border-white/10 !text-white" />
                    </Col>
                    <Col xs={12} sm={6}>
                      <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">From</Text>
                      <select value={fromCurr} onChange={e => setFromCurr(e.target.value)} className="w-full p-2 h-10 bg-gray-800 border border-cyan-500/50 rounded-lg text-white">
                        <option value="USD">USD - US Dollar</option>
                        <option value="INR">INR - Indian Rupee</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - British Pound</option>
                        <option value="JPY">JPY - Japanese Yen</option>
                      </select>
                    </Col>
                    <Col xs={12} sm={6}>
                      <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">To</Text>
                      <select value={toCurr} onChange={e => setToCurr(e.target.value)} className="w-full p-2 h-10 bg-gray-800 border border-cyan-500/50 rounded-lg text-white">
                        <option value="INR">INR - Indian Rupee</option>
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - British Pound</option>
                        <option value="JPY">JPY - Japanese Yen</option>
                      </select>
                    </Col>
                    <Col xs={24} sm={4}>
                      <Button type="primary" size="large" onClick={convertCurrency} className="neon-button w-full mt-6">Convert</Button>
                    </Col>
                  </Row>

                  {convertedResult && (
                    <div className="p-6 bg-[#00f2ff]/5 border border-[#00f2ff]/20 rounded-2xl text-center">
                      <span className="text-2xl font-black text-white font-mono">{convertedResult}</span>
                    </div>
                  )}
                </Space>
              </Card>
            )
          },
          {
            key: 'lorem',
            label: <span className="flex items-center gap-2 text-white font-bold"><Layers size={16} /> Lorem Ipsum</span>,
            children: (
              <Card className="glass-card !p-6">
                <Row gutter={[24, 24]}>
                  <Col xs={24} md={8} className="space-y-4">
                    <div>
                      <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Generate Type</Text>
                      <select value={loremType} onChange={e => setLoremType(e.target.value)} className="w-full p-2 h-10 bg-gray-800 border border-cyan-500/50 rounded-lg text-white">
                        <option value="paragraphs">Paragraphs</option>
                        <option value="sentences">Sentences</option>
                        <option value="words">Words</option>
                      </select>
                    </div>
                    <div>
                      <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Count: {loremCount}</Text>
                      <Slider min={1} max={15} value={loremCount} onChange={setLoremCount} />
                    </div>
                    <Button type="primary" size="large" onClick={generateLoremIpsum} className="neon-button w-full">Generate Text</Button>
                  </Col>
                  <Col xs={24} md={16}>
                    <div className="flex justify-between items-center mb-2">
                      <Text className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Generated Output</Text>
                      <Button icon={<Copy size={14} />} size="small" onClick={() => handleCopy(loremOutput)} className="!bg-white/5 !border-white/10 !text-white">Copy Output</Button>
                    </div>
                    <TextArea 
                      rows={8}
                      value={loremOutput}
                      readOnly
                      placeholder="Lorem ipsum placeholder will appear here..."
                      className="!bg-white/[0.01] !border-white/10 !text-gray-400 !rounded-xl"
                    />
                  </Col>
                </Row>
              </Card>
            )
          },
          {
            key: 'qrcode',
            label: <span className="flex items-center gap-2 text-white font-bold"><Globe size={16} /> QR Code Gen</span>,
            children: (
              <Card className="glass-card !p-6">
                <Row gutter={[24, 24]}>
                  <Col xs={24} md={14} className="space-y-4">
                    <div>
                      <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">QR Code Text / link</Text>
                      <Input size="large" value={qrText} onChange={e => setQrText(e.target.value)} placeholder="https://mywebsite.com" className="!bg-white/5 !border-white/10 !text-white" />
                    </div>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Foreground Color</Text>
                        <div className="flex items-center gap-2">
                          <input type="color" value={qrFgColor} onChange={e => setQrFgColor(e.target.value)} className="w-8 h-8 rounded border-0 cursor-pointer" />
                          <Text className="text-white font-mono">{qrFgColor}</Text>
                        </div>
                      </Col>
                      <Col span={12}>
                        <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Background Color</Text>
                        <div className="flex items-center gap-2">
                          <input type="color" value={qrBgColor} onChange={e => setQrBgColor(e.target.value)} className="w-8 h-8 rounded border-0 cursor-pointer" />
                          <Text className="text-white font-mono">{qrBgColor}</Text>
                        </div>
                      </Col>
                    </Row>
                    <Button type="primary" size="large" onClick={generateQrCode} className="neon-button w-full">Generate Multicolor QR</Button>
                  </Col>
                  <Col xs={24} md={10} className="flex flex-col items-center justify-center">
                    <div className="p-4 bg-white rounded-3xl border border-white/10 flex items-center justify-center min-h-[220px]">
                      {qrImageUrl ? (
                        <img src={qrImageUrl} alt="QR Code" className="w-[180px] h-[180px]" />
                      ) : (
                        <Text className="text-gray-400">Press Generate to load QR</Text>
                      )}
                    </div>
                  </Col>
                </Row>
              </Card>
            )
          },
          {
            key: 'color',
            label: <span className="flex items-center gap-2 text-white font-bold"><Layers size={16} /> Color Picker</span>,
            children: (
              <Card className="glass-card !p-6">
                <Row gutter={[24, 24]}>
                  <Col xs={24} md={12} className="space-y-4">
                    <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Interactive Picker</Text>
                    <div className="flex items-center gap-4">
                      <input 
                        type="color" 
                        value={pickerColor} 
                        onChange={e => setPickerColor(e.target.value)} 
                        className="w-20 h-20 rounded-2xl border-0 cursor-pointer bg-transparent"
                      />
                      <div>
                        <Text className="text-white font-mono text-xl block font-bold mb-2">{pickerColor.toUpperCase()}</Text>
                        <Button type="default" size="small" onClick={() => handleCopy(pickerColor)} className="!bg-white/5 !border-white/10 !text-white">Copy Hex</Button>
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} md={12}>
                    <Text className="text-gray-400 font-bold block mb-3 uppercase text-[10px] tracking-widest">Standard Palette</Text>
                    <div className="flex flex-wrap gap-3">
                      {paletteColors.map((c) => (
                        <div 
                          key={c} 
                          onClick={() => { setPickerColor(c); handleCopy(c); }} 
                          className="w-12 h-12 rounded-xl cursor-pointer border border-white/10 hover:scale-110 transition-transform shadow-lg"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </Col>
                </Row>
              </Card>
            )
          }
        ]}
      />

      {/* ── MASSIVE 1000-WORD SEO ARTICLE ABOUT UTILITIES WITH 3D EMOJIS ── */}
      <section className="mt-20 text-left select-text relative z-10">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2 space-y-12">
            
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                🔒 Cryptography, Security, & Digital Password Generation 🔑
              </h2>
              <p className="text-gray-400 leading-relaxed text-base">
                Welcome to the **General Utility Suite** 🛡️. In the modern age, protecting your online identity, login accounts, and official profiles is incredibly important. Weak passwords make user accounts vulnerable to cyber-attacks. Our **Password Generator** runs entirely client-side using localized randomization guidelines. This ensures no keys are stored or sent across the web, giving you absolute control over your digital passwords. 🔐
              </p>
              <p className="text-gray-400 leading-relaxed text-base">
                For complete protection, we recommend combining uppercase/lowercase letters, numbers, and symbols while keeping your passwords at a minimum length of 16 characters. 💻
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                📱 Multicolor QR Codes & Color Palette Systems 🎨
              </h2>
              <p className="text-gray-400 leading-relaxed text-base">
                QR Codes (Quick Response Codes) have revolutionized the way we share web links, contact cards, and digital payments. Traditionally, QR codes were printed in simple black-and-white layouts. 
              </p>
              <p className="text-gray-400 leading-relaxed text-base">
                Our **Multicolor QR Generator** allows you to customize the foreground and background colors of your QR codes instantly. By choosing specific hex codes using our built-in Color Picker, you can align QR styles to match your personal brand or project layout seamlessly. 📐
              </p>
            </div>

          </div>

          {/* Right Column: Tips & Info */}
          <div className="space-y-8">
            <div className="p-8 bg-gradient-to-br from-[#1b103c]/60 to-[#0c0721]/90 rounded-[2.5rem] border border-[#7000ff]/20 shadow-2xl backdrop-blur-md">
              <h3 className="text-lg font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                💡 Security Best Practices 📐
              </h3>
              <ul className="text-gray-400 text-xs space-y-4 leading-relaxed">
                <li>• <strong>Key Length:</strong> Always use at least 12-16 characters for critical logins.</li>
                <li>• <strong>No Reuse:</strong> Avoid reusing passwords across different services.</li>
                <li>• <strong>Contrast:</strong> Ensure QR code foreground and background colors have high contrast.</li>
                <li>• <strong>No Servers:</strong> Local compilation prevents key leakage.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UtilitySuite;
