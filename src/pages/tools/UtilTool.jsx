import React, { useState } from 'react';
import { Card, Input, Button, Space, Typography, Row, Col, Checkbox, Slider, message, Tag } from 'antd';
import { Settings, Copy, Download, Layers, FileText, Globe, Landmark, Lock, Wand2 } from 'lucide-react';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const UtilTool = ({ type }) => {
  const [loading, setLoading] = useState(false);

  // States
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  // Password states
  const [passLength, setPassLength] = useState(16);
  const [passUpper, setPassUpper] = useState(true);
  const [passLower, setPassLower] = useState(true);
  const [passNumbers, setPassNumbers] = useState(true);
  const [passSymbols, setPassSymbols] = useState(true);

  // Word Counter states
  const [stats, setStats] = useState({ words: 0, chars: 0, paras: 0, wpm: 0 });

  // Duplicates states
  const [caseSensitive, setCaseSensitive] = useState(true);

  // Currency Converter states
  const [amount, setAmount] = useState('100');
  const [fromCurr, setFromCurr] = useState('USD');
  const [toCurr, setToCurr] = useState('INR');
  const [currencyResult, setCurrencyResult] = useState('');

  // Lorem states
  const [loremType, setLoremType] = useState('paragraphs');
  const [loremCount, setLoremCount] = useState(3);

  // QR Code States
  const [qrText, setQrText] = useState('https://allsarkaritools.com');
  const [qrFgColor, setQrFgColor] = useState('#000000');
  const [qrBgColor, setQrBgColor] = useState('#ffffff');
  const [qrImageUrl, setQrImageUrl] = useState('');

  // Color picker states
  const [pickedColor, setPickedColor] = useState('#00f2ff');

  // Copy helper
  const handleCopy = (txt) => {
    if (!txt) return message.warning('Nothing to copy');
    navigator.clipboard.writeText(txt);
    message.success('Copied to clipboard! 📋');
  };

  // 20 Premium Preset Color boxes for QR code foreground/background pairs
  const qrPresets = [
    { name: 'Midnight Cyan', fg: '#00f2ff', bg: '#080415' },
    { name: 'Neon Hype', fg: '#ff007f', bg: '#0c0721' },
    { name: 'Sunset Glow', fg: '#ff8c2b', bg: '#1b103c' },
    { name: 'Emerald Vault', fg: '#10b981', bg: '#051b14' },
    { name: 'Deep Sapphire', fg: '#3b82f6', bg: '#0a1128' },
    { name: 'Golden Amber', fg: '#f59e0b', bg: '#1c1917' },
    { name: 'Royal Velvet', fg: '#7000ff', bg: '#080415' },
    { name: 'Sakura Petal', fg: '#ec4899', bg: '#1f1625' },
    { name: 'Oceanic Teal', fg: '#14b8a6', bg: '#0f172a' },
    { name: 'Crimson Wine', fg: '#ef4444', bg: '#1e1b4b' },
    { name: 'Lime Carbon', fg: '#84cc16', bg: '#18181b' },
    { name: 'Neon Gold', fg: '#fbbf24', bg: '#060606' },
    { name: 'Dark Mode Classic', fg: '#ffffff', bg: '#121212' },
    { name: 'Standard QR', fg: '#000000', bg: '#ffffff' },
    { name: 'Cyber Violet', fg: '#8b5cf6', bg: '#090514' },
    { name: 'Orchid Dream', fg: '#d946ef', bg: '#12021c' },
    { name: 'Nordic Snow', fg: '#0284c7', bg: '#f8fafc' },
    { name: 'Warm Leather', fg: '#b45309', bg: '#fef3c7' },
    { name: 'Forest Moss', fg: '#15803d', bg: '#f0fdf4' },
    { name: 'Lava Rock', fg: '#dc2626', bg: '#121212' }
  ];

  // Logic functions
  const handleGeneratePassword = () => {
    let chars = '';
    if (passUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (passLower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (passNumbers) chars += '0123456789';
    if (passSymbols) chars += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (!chars) return message.error('Select at least one option');

    let pass = '';
    for (let i = 0; i < passLength; i++) {
      pass += chars[Math.floor(Math.random() * chars.length)];
    }
    setOutputText(pass);
    message.success('Secure password created! 🔑');
  };

  const handleWordCounter = (e) => {
    const text = e.target.value;
    setInputText(text);
    const clean = text.trim();
    if (!clean) {
      setStats({ words: 0, chars: 0, paras: 0, wpm: 0 });
      return;
    }
    const words = clean.split(/\s+/).filter(w => w.length > 0);
    setStats({
      words: words.length,
      chars: text.length,
      paras: text.split(/\n+/).filter(p => p.trim().length > 0).length,
      wpm: Math.ceil(words.length / 200)
    });
  };

  const handleRemoveDuplicates = () => {
    if (!inputText.trim()) return message.warning('Enter text first');
    const lines = inputText.split(/\n/);
    const seen = new Set();
    const unique = [];
    lines.forEach(line => {
      const key = caseSensitive ? line : line.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(line);
      }
    });
    setOutputText(unique.join('\n'));
    message.success('Duplicates removed! 🧹');
  };

  const handleLorem = () => {
    const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    if (loremType === 'paragraphs') {
      setOutputText(Array(loremCount).fill(lorem).join('\n\n'));
    } else {
      setOutputText(lorem.split('. ').slice(0, loremCount).join('. ') + '.');
    }
    message.success('Placeholder text created! ✍️');
  };

  const handleCurrency = () => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) return message.warning('Enter valid amount');
    const rates = {
      USD: { INR: 86.5, EUR: 0.92, GBP: 0.78 },
      INR: { USD: 0.012, EUR: 0.011, GBP: 0.009 }
    };
    const rate = rates[fromCurr]?.[toCurr] || 1;
    const res = amt * rate;
    setCurrencyResult(`${amt} ${fromCurr} = ${res.toFixed(2)} ${toCurr}`);
    message.success('Currency converted! 💰');
  };

  const handleGenerateQR = () => {
    if (!qrText.trim()) return message.warning('Enter text for QR');
    const fg = qrFgColor.replace('#', '');
    const bg = qrBgColor.replace('#', '');
    setQrImageUrl(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrText)}&color=${fg}&bgcolor=${bg}`);
    message.success('QR Code updated! 📱');
  };

  return (
    <div className="max-w-4xl mx-auto py-24 px-4 min-h-screen">
      <div className="text-center mb-12">
        <Title className="!text-white !text-5xl !font-black !mb-4 tracking-tighter uppercase flex items-center justify-center gap-3">
          <Settings size={48} className="text-pink-500" />
          {type === 'password' && 'Password Generator'}
          {type === 'counter' && 'Word Counter'}
          {type === 'duplicates' && 'Remove Duplicate Lines'}
          {type === 'currency' && 'Currency Converter'}
          {type === 'lorem' && 'Lorem Ipsum Generator'}
          {type === 'qrcode' && 'Multicolor QR Code Generator'}
          {type === 'color' && 'Color Picker & Palette Explorer'}
        </Title>
        <Paragraph className="!text-gray-400 text-lg">
          {type === 'password' && 'Generate secure passwords locally inside your browser.'}
          {type === 'counter' && 'Count text statistics including words, characters, and read time.'}
          {type === 'duplicates' && 'Clean list collections by stripping out all repeating lines.'}
          {type === 'currency' && 'Convert global currency conversion indices based on target rates.'}
          {type === 'lorem' && 'Generate random placeholder text sentences or paragraphs instantly.'}
          {type === 'qrcode' && 'Design custom QR codes with rounded corners and gradient color boxes.'}
          {type === 'color' && 'Pick color values, copy hex codes, and browse harmonious palettes.'}
        </Paragraph>
      </div>

      <Card className="glass-card !p-6 mb-16">
        {type === 'password' && (
          <Row gutter={24}>
            <Col xs={24} md={12} className="space-y-4">
              <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Password Length: {passLength}</Text>
              <Slider min={8} max={64} value={passLength} onChange={setPassLength} />
              <div className="flex flex-col gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                <Checkbox checked={passUpper} onChange={e => setPassUpper(e.target.checked)} className="!text-white">Uppercase (A-Z)</Checkbox>
                <Checkbox checked={passLower} onChange={e => setPassLower(e.target.checked)} className="!text-white">Lowercase (a-z)</Checkbox>
                <Checkbox checked={passNumbers} onChange={e => setPassNumbers(e.target.checked)} className="!text-white">Numbers (0-9)</Checkbox>
                <Checkbox checked={passSymbols} onChange={e => setPassSymbols(e.target.checked)} className="!text-white">Symbols (!@#$)</Checkbox>
              </div>
              <Button type="primary" size="large" onClick={handleGeneratePassword} className="neon-button !w-full">Generate Password</Button>
            </Col>
            <Col xs={24} md={12} className="flex flex-col justify-center">
              <div className="p-6 bg-white/5 border border-white/10 rounded-3xl text-center space-y-4">
                <Text className="text-gray-400 block text-xs">Generated Password</Text>
                <div className="p-4 bg-black/40 rounded-xl font-mono text-lg text-primary select-all break-all min-h-[50px]">{outputText || 'Click Generate'}</div>
                {outputText && <Button onClick={() => handleCopy(outputText)}>Copy</Button>}
              </div>
            </Col>
          </Row>
        )}

        {type === 'counter' && (
          <Space direction="vertical" className="w-full" size="large">
            <TextArea rows={8} value={inputText} onChange={handleWordCounter} placeholder="Paste your text here to count..." className="!bg-white/5 !border-white/10 !text-white text-base" />
            <Row gutter={[16, 16]} className="text-center">
              {[{ label: "Words", val: stats.words }, { label: "Chars", val: stats.chars }, { label: "Paras", val: stats.paras }, { label: "Reading Time", val: `${stats.wpm} Min` }].map((s, idx) => (
                <Col xs={12} sm={6} key={idx}>
                  <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                    <Text className="text-gray-500 block text-xs mb-1">{s.label}</Text>
                    <span className="text-2xl font-black text-white">{s.val}</span>
                  </div>
                </Col>
              ))}
            </Row>
          </Space>
        )}

        {type === 'duplicates' && (
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <TextArea rows={10} value={inputText} onChange={e => setInputText(e.target.value)} placeholder="Line 1&#10;Line 2&#10;Line 1" className="!bg-white/5 !border-white/10 !text-white text-sm" />
              <div className="flex gap-4 mt-4 align-center">
                <Checkbox checked={caseSensitive} onChange={e => setCaseSensitive(e.target.checked)} className="!text-white">Case-Sensitive</Checkbox>
                <Button type="primary" onClick={handleRemoveDuplicates} className="neon-button">Clean</Button>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="flex justify-between items-center mb-2">
                <Text className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Result</Text>
                <Button size="small" onClick={() => handleCopy(outputText)}>Copy</Button>
              </div>
              <TextArea rows={10} value={outputText} readOnly className="!bg-white/[0.01] !border-white/10 !text-primary text-sm" />
            </Col>
          </Row>
        )}

        {type === 'currency' && (
          <Space direction="vertical" className="w-full" size="large">
            <Row gutter={16} align="middle">
              <Col xs={24} sm={8}>
                <Input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="!bg-white/5 !border-white/10 !text-white" />
              </Col>
              <Col xs={12} sm={6}>
                <select value={fromCurr} onChange={e => setFromCurr(e.target.value)} className="w-full p-2 h-10 bg-gray-800 border border-cyan-500/50 rounded-lg text-white">
                  <option value="USD">USD</option>
                  <option value="INR">INR</option>
                </select>
              </Col>
              <Col xs={12} sm={6}>
                <select value={toCurr} onChange={e => setToCurr(e.target.value)} className="w-full p-2 h-10 bg-gray-800 border border-cyan-500/50 rounded-lg text-white">
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                </select>
              </Col>
              <Col xs={24} sm={4}>
                <Button type="primary" size="large" onClick={handleCurrency} className="neon-button w-full">Convert</Button>
              </Col>
            </Row>
            {currencyResult && (
              <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl text-center">
                <span className="text-2xl font-black text-white font-mono">{currencyResult}</span>
              </div>
            )}
          </Space>
        )}

        {type === 'lorem' && (
          <Row gutter={[24, 24]}>
            <Col xs={24} md={8} className="space-y-4">
              <select value={loremType} onChange={e => setLoremType(e.target.value)} className="w-full p-2 h-10 bg-gray-800 border border-cyan-500/50 rounded-lg text-white">
                <option value="paragraphs">Paragraphs</option>
                <option value="sentences">Sentences</option>
              </select>
              <Slider min={1} max={10} value={loremCount} onChange={setLoremCount} />
              <Button type="primary" onClick={handleLorem} className="neon-button w-full">Generate</Button>
            </Col>
            <Col xs={24} md={16}>
              <TextArea rows={8} value={outputText} readOnly className="!bg-white/5 !border-white/10 !text-gray-300" />
            </Col>
          </Row>
        )}

        {type === 'qrcode' && (
          <Row gutter={[24, 24]}>
            <Col xs={24} md={14} className="space-y-6">
              <div>
                <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">QR Code text / URL Link</Text>
                <Input size="large" value={qrText} onChange={e => setQrText(e.target.value)} placeholder="https://example.com" className="!bg-white/5 !border-white/10 !text-white" />
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

              <div>
                <Text className="text-gray-400 font-bold block mb-3 uppercase text-[10px] tracking-widest">🎨 20 Premium Preset Color Schemes</Text>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {qrPresets.map((preset, idx) => (
                    <div 
                      key={idx}
                      onClick={() => { setQrFgColor(preset.fg); setQrBgColor(preset.bg); }}
                      className="p-2 border border-white/5 hover:border-primary/40 rounded-xl cursor-pointer transition-all flex flex-col justify-between"
                      style={{ background: `linear-gradient(135deg, ${preset.bg} 0%, ${preset.bg} 60%, ${preset.fg} 100%)` }}
                    >
                      <span className="text-[10px] font-black text-white truncate block mb-1">{preset.name}</span>
                      <div className="flex gap-1 items-center">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: preset.fg }} />
                        <div className="w-2.5 h-2.5 rounded-full border border-white/10" style={{ backgroundColor: preset.bg }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button type="primary" size="large" onClick={handleGenerateQR} className="neon-button !w-full">Generate QR Code</Button>
            </Col>

            <Col xs={24} md={10} className="flex flex-col items-center justify-center">
              {/* Premium rounded-square frame with double borders and neon shadow */}
              <div className="relative p-6 bg-gradient-to-br from-white/[0.03] to-white/[0.08] border-2 border-dashed border-[#7000ff]/30 rounded-[3rem] shadow-[0_0_50px_rgba(112,0,255,0.25)] flex items-center justify-center min-h-[260px] min-w-[260px]">
                <div className="absolute inset-2 border border-white/5 rounded-[2.6rem] pointer-events-none" />
                {qrImageUrl ? (
                  <img src={qrImageUrl} alt="QR Code" className="w-[180px] h-[180px] rounded-[1.5rem] object-contain" />
                ) : (
                  <Text className="text-gray-400">Click Generate QR Code</Text>
                )}
              </div>
            </Col>
          </Row>
        )}

        {type === 'color' && (
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12} className="space-y-4">
              <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Interactive Picker</Text>
              <div className="flex items-center gap-4">
                <input type="color" value={pickedColor} onChange={e => setPickedColor(e.target.value)} className="w-20 h-20 rounded-2xl border-0 cursor-pointer bg-transparent" />
                <div>
                  <Text className="text-white font-mono text-xl block font-bold mb-2">{pickedColor.toUpperCase()}</Text>
                  <Button size="small" onClick={() => handleCopy(pickedColor)}>Copy Hex</Button>
                </div>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <Text className="text-gray-400 font-bold block mb-3 uppercase text-[10px] tracking-widest">Palette Colors</Text>
              <div className="flex flex-wrap gap-3">
                {['#00f2ff', '#ff007f', '#7000ff', '#ff8c2b', '#10b981', '#3b82f6', '#f59e0b', '#ec4899'].map(c => (
                  <div key={c} onClick={() => { setPickedColor(c); handleCopy(c); }} className="w-12 h-12 rounded-xl cursor-pointer border border-white/10 hover:scale-110 transition-all" style={{ backgroundColor: c }} />
                ))}
              </div>
            </Col>
          </Row>
        )}
      </Card>

      {/* SEO content */}
      <section className="text-left select-text relative z-10 space-y-8 mt-16 p-8 bg-white/5 border border-white/10 rounded-2xl">
        <h2 className="text-3xl font-black text-white uppercase tracking-tight border-b border-white/10 pb-4 flex items-center gap-3">
          <Wand2 className="text-pink-500" />
          General Utilities: Complete User Guide & How-To Instructions ⚙️
        </h2>

        <div className="space-y-6 text-gray-300">
          <p className="leading-relaxed">
            Sarkari Tools की इस General Utilities Suite में दैनिक जीवन, ब्लॉगिंग और सामान्य आईटी कार्यों को आसान बनाने के लिए 7 शक्तिशाली माइक्रो-टूल्स दिए गए हैं। ये टूल्स बेहद तेज़ हैं और आपके डेटा की गोपनीयता को बनाए रखने के लिए 100% ब्राउज़र में ही रन होते हैं।
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="p-5 bg-white/5 border border-white/5 rounded-xl">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                Password Generator (सुरक्षित पासवर्ड बनाएं)
              </h3>
              <p className="text-sm text-gray-400">
                सोशल मीडिया या बैंकिंग के लिए हैक-प्रूफ रैंडम पासवर्ड बनाएं।
              </p>
              <ul className="list-disc list-inside text-xs text-gray-400 mt-2 space-y-1">
                <li>Slider से पासवर्ड की लंबाई (8 से 64 कैरेक्टर) चुनें।</li>
                <li>Uppercase, Lowercase, Numbers, और Symbols के टिक बॉक्स सेट करें।</li>
                <li><strong>Generate</strong> पर क्लिक करें और सुरक्षित पासवर्ड को कॉपी करें।</li>
              </ul>
            </div>

            <div className="p-5 bg-white/5 border border-white/5 rounded-xl">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                Word Counter (शब्द और वर्ण काउंटर)
              </h3>
              <p className="text-sm text-gray-400">
                अपने निबंध, ब्लॉग पोस्ट या किसी भी टेक्स्ट के शब्द, कैरेक्टर, पैराग्राफ और अनुमानित पठन समय को लाइव ट्रैक करें।
              </p>
              <ul className="list-disc list-inside text-xs text-gray-400 mt-2 space-y-1">
                <li>टेक्स्ट बॉक्स में लिखना या पेस्ट करना शुरू करें।</li>
                <li>सभी आँकड़े रियल-टाइम में नीचे अपडेट होते रहेंगे।</li>
              </ul>
            </div>

            <div className="p-5 bg-white/5 border border-white/5 rounded-xl">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                Remove Duplicate Lines (डुप्लिकेट लाइन हटाएं)
              </h3>
              <p className="text-sm text-gray-400">
                ईमेल लिस्ट, डेटा फाइल्स या किसी भी लाइन-बाय-लाइन लिस्ट से डुप्लिकेट एंट्रीज को एक क्लिक में साफ़ करें।
              </p>
              <ul className="list-disc list-inside text-xs text-gray-400 mt-2 space-y-1">
                <li>अपनी लिस्ट को इनपुट बॉक्स में पेस्ट करें।</li>
                <li>Case-Sensitive (अक्षर के आकार के अनुसार) विकल्प चुनें और <strong>Clean</strong> पर क्लिक करें।</li>
              </ul>
            </div>

            <div className="p-5 bg-white/5 border border-white/5 rounded-xl">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                Multicolor QR Code Generator
              </h3>
              <p className="text-sm text-gray-400">
                वेबसाइट लिंक्स, वाईफाई पासवर्ड या टेक्स्ट के लिए सुंदर और कलरफुल QR कोड्स डिज़ाइन करें।
              </p>
              <ul className="list-disc list-inside text-xs text-gray-400 mt-2 space-y-1">
                <li>वह टेक्स्ट या URL डालें जिसका QR कोड बनाना है।</li>
                <li>Foreground (आगे का) और Background (पीछे का) रंग चुनें या हमारे 20 प्रीमियम प्रीसेट डिज़ाइन में से कोई एक चुनें।</li>
                <li><strong>Generate</strong> पर क्लिक करके नया डिज़ाइन लोड करें।</li>
              </ul>
            </div>

            <div className="p-5 bg-white/5 border border-white/5 rounded-xl">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                Lorem Ipsum & Color Picker
              </h3>
              <p className="text-sm text-gray-400">
                डिजाइनिंग और कोडिंग से जुड़े टूल्स:
              </p>
              <ul className="list-disc list-inside text-xs text-gray-400 mt-2 space-y-1">
                <li><strong>Lorem Ipsum Generator:</strong> मॉकअप डिज़ाइन के लिए रैंडम प्लेसहोल्डर पैराग्राफ जनरेट करें।</li>
                <li><strong>Color Picker:</strong> कलर बॉक्स पर क्लिक करके किसी भी मनपसंद रंग का HEX कोड प्राप्त करें और कॉपी करें।</li>
              </ul>
            </div>

            <div className="p-5 bg-white/5 border border-white/5 rounded-xl">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                Currency Converter
              </h3>
              <p className="text-sm text-gray-400">
                USD से INR या INR से USD जैसी मुद्राओं के मूल्यों को आसानी से बदलें और कन्वर्ट करें।
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UtilTool;
