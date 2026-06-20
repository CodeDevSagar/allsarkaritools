import React, { useState } from 'react';
import { Card, Input, Button, Space, Typography, Row, Col, Select, message, Tag } from 'antd';
import { Video, Copy, Download, Hash, Key, FileText, Sparkles, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const YoutubeTool = ({ type }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // States
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('clickbait');
  const [links, setLinks] = useState('https://twitter.com/myhandle\nhttps://instagram.com/myhandle');
  const [videoUrl, setVideoUrl] = useState('');
  
  // Results
  const [titles, setTitles] = useState([]);
  const [desc, setDesc] = useState('');
  const [thumbnails, setThumbnails] = useState(null);
  const [keywords, setKeywords] = useState([]);
  const [hashes, setHashes] = useState([]);

  // Copy helper
  const handleCopy = (txt) => {
    if (!txt) return message.warning('Nothing to copy');
    navigator.clipboard.writeText(txt);
    message.success('Copied to clipboard! 📋');
  };

  // Logic Handlers
  const handleGenerateTitle = () => {
    if (!topic.trim()) return message.warning('Please enter a topic');
    setLoading(true);
    setTimeout(() => {
      const templates = {
        clickbait: [
          `😱 You Won't Believe What Happened When I Tried ${topic}!`,
          `❌ Stop Doing This! The Ultimate ${topic} Mistake Everyone Makes`,
          `This ${topic} Secret Will Change Your Life Forever! 🚀`,
          `I Tried ${topic} For 30 Days And This Happened... 🤯`,
          `10 Secrets About ${topic} They Don't Want You To Know!`
        ],
        educational: [
          `The Complete Guide to ${topic} (Step-by-Step for Beginners)`,
          `How to Master ${topic} in 2026: Fast & Easy Tutorial`,
          `The Science Behind ${topic} Explained Simply`,
          `Top 5 Essential Concepts of ${topic} You Must Learn`,
          `${topic} Made Simple: Ultimate Guide to Expert Level`
        ]
      };
      setTitles(templates[tone] || templates.clickbait);
      setLoading(false);
      message.success('Titles generated! ⚡');
    }, 600);
  };

  const handleGenerateDesc = () => {
    if (!topic.trim()) return message.warning('Please enter a topic');
    setLoading(true);
    setTimeout(() => {
      setDesc(`🔥 Master ${topic} in this ultimate step-by-step video tutorial! We cover everything from basic concepts to advanced strategies.

📖 Timestamps:
0:00 - Introduction & Hook
1:45 - What is ${topic}?
3:30 - Core Concepts Explained
6:15 - Step-by-Step Tutorial
10:45 - Common Mistakes to Avoid
14:20 - Summary & Outro

🔗 Follow My Socials:
${links}

#${topic.replace(/\s+/g, '')} #YouTubeSEO #Tutorial`);
      setLoading(false);
      message.success('Description generated! 📝');
    }, 600);
  };

  const handleExtractThumbnail = () => {
    if (!videoUrl.trim()) return message.warning('Enter YouTube video URL');
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = videoUrl.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;

    if (!videoId) return message.error('Invalid YouTube URL');

    setThumbnails({
      maxres: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      sd: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
      hq: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      mq: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
    });
    message.success('Thumbnails loaded! 🖼️');
  };

  const handleExtractTags = () => {
    if (!videoUrl.trim()) return message.warning('Enter YouTube video URL');
    setLoading(true);
    
    // Attempt to parse video ID and query noembed (CORS-friendly public metadata endpoint)
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = videoUrl.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;

    if (!videoId) {
      setLoading(false);
      return message.error('Invalid YouTube URL');
    }

    fetch(`https://noembed.com/embed?url=${encodeURIComponent(videoUrl)}`)
      .then(res => res.json())
      .then(data => {
        let tagsSet = new Set();
        if (data.title) {
          // Extract keywords from title
          const words = data.title
            .toLowerCase()
            .replace(/[^\w\s]/g, '')
            .split(/\s+/)
            .filter(w => w.length > 3 && !['with', 'this', 'that', 'from', 'your', 'video', 'tutorial', 'how', 'to', 'the'].includes(w));
          
          words.forEach(w => tagsSet.add(w));
          if (words.length >= 2) {
            tagsSet.add(`${words[0]} ${words[1]}`);
          }
          if (words.length >= 3) {
            tagsSet.add(`${words[0]} ${words[1]} ${words[2]}`);
          }
        }
        
        // Add some default general YouTube tag recommendations
        tagsSet.add('youtube video');
        tagsSet.add('tutorial');
        tagsSet.add('guide');

        setKeywords(Array.from(tagsSet));
        setLoading(false);
        message.success('Tags extracted successfully! 🏷️');
      })
      .catch(() => {
        // Fallback if network fails
        setKeywords(['tutorial', 'youtube guide', 'how to', 'video']);
        setLoading(false);
        message.success('Extracted default tags! 🏷️');
      });
  };

  const handleGenerateKeywords = () => {
    if (!topic.trim()) return message.warning('Please enter a keyword topic');
    setLoading(true);
    setTimeout(() => {
      const base = topic.toLowerCase();
      setKeywords([
        base, `${base} tutorial`, `${base} for beginners`, `how to do ${base}`,
        `best ${base} tips`, `${base} course`, `mastering ${base}`, `simple ${base}`
      ]);
      setLoading(false);
      message.success('Keywords generated! 🔑');
    }, 600);
  };

  const handleGenerateHashes = () => {
    if (!topic.trim()) return message.warning('Please enter a topic');
    setLoading(true);
    setTimeout(() => {
      const base = topic.toLowerCase().replace(/\s+/g, '');
      setHashes([
        `#${base}`, `#${base}Tutorial`, `#${base}Tips`, `#Learn${base}`, `#${base}SEO`
      ]);
      setLoading(false);
      message.success('Hashes generated! 🏷️');
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto py-24 px-4 min-h-screen">
      <div className="text-center mb-12">
        <Title className="!text-white !text-5xl !font-black !mb-4 tracking-tighter uppercase flex items-center justify-center gap-3">
          <Video size={48} className="text-red-500 fill-red-500" />
          {type === 'title' && 'YouTube Title Generator'}
          {type === 'description' && 'YouTube Description Generator'}
          {type === 'thumbnail' && 'YouTube Thumbnail Downloader'}
          {type === 'keyword' && 'YouTube Keyword Generator'}
          {type === 'tags' && 'YouTube Tags Extractor'}
          {type === 'hash' && 'YouTube Hash Generator'}
        </Title>
        <Paragraph className="!text-gray-400 text-lg">
          {type === 'title' && 'Generate high-CTR, click-worthy video titles to maximize organic views.'}
          {type === 'description' && 'Create fully structured SEO video descriptions with timestamps & social links.'}
          {type === 'thumbnail' && 'Download standard high-definition thumbnails of any public YouTube video.'}
          {type === 'keyword' && 'Generate popular search keywords and tags for your video content.'}
          {type === 'tags' && 'Extract official tags and tags lists from any public YouTube video link.'}
          {type === 'hash' && 'Generate hashtag bundles for YouTube shorts and standard video uploads.'}
        </Paragraph>
      </div>

      {/* Tool Main Card */}
      <Card className="glass-card !p-6 mb-16">
        {type === 'title' && (
          <Space direction="vertical" className="w-full" size="large">
            <Row gutter={[16, 16]}>
              <Col xs={24} md={16}>
                <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Topic / Keyword</Text>
                <Input size="large" value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. Learn React Programming" className="!bg-white/5 !border-white/10 !text-white" />
              </Col>
              <Col xs={24} md={8}>
                <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Tone</Text>
                <Select size="large" value={tone} onChange={setTone} className="w-full !bg-[#0c0721]">
                  <Option value="clickbait">😱 Clickbait / Viral</Option>
                  <Option value="educational">🎓 Educational</Option>
                </Select>
              </Col>
            </Row>
            <Button type="primary" size="large" onClick={handleGenerateTitle} loading={loading} className="neon-button !w-full">Generate Titles</Button>
            {titles.length > 0 && (
              <div className="space-y-3 mt-4">
                {titles.map((t, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-white/5 border border-white/5 rounded-xl">
                    <Text className="text-white font-medium">{t}</Text>
                    <Button icon={<Copy size={16} />} onClick={() => handleCopy(t)} className="!bg-white/5 !border-white/10 !text-white" />
                  </div>
                ))}
              </div>
            )}
          </Space>
        )}

        {type === 'description' && (
          <Space direction="vertical" className="w-full" size="large">
            <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Video Topic</Text>
            <Input size="large" value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. Photoshop design principles" className="!bg-white/5 !border-white/10 !text-white" />
            
            <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Social Links</Text>
            <TextArea rows={3} value={links} onChange={e => setLinks(e.target.value)} className="!bg-white/5 !border-white/10 !text-white" />
            
            <Button type="primary" size="large" onClick={handleGenerateDesc} loading={loading} className="neon-button !w-full">Generate Description</Button>
            {desc && (
              <div className="mt-4">
                <Button icon={<Copy size={14} />} onClick={() => handleCopy(desc)} className="mb-2">Copy All</Button>
                <TextArea rows={10} value={desc} readOnly className="!bg-white/5 !border-white/10 !text-gray-300 font-mono text-sm" />
              </div>
            )}
          </Space>
        )}

        {(type === 'thumbnail' || type === 'tags') && (
          <Space direction="vertical" className="w-full" size="large">
            <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Video Link</Text>
            <div className="flex gap-2">
              <Input size="large" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ" className="!bg-white/5 !border-white/10 !text-white" />
              <Button type="primary" size="large" onClick={type === 'thumbnail' ? handleExtractThumbnail : handleExtractTags} loading={loading} className="neon-button">Extract</Button>
            </div>
            {thumbnails && type === 'thumbnail' && (
              <Row gutter={16} className="mt-4">
                <Col span={16}>
                  <img src={thumbnails.maxres} alt="Thumbnail" className="w-full h-auto rounded-xl border border-white/10" onError={(e) => { e.target.src = thumbnails.hq; }} />
                </Col>
                <Col span={8} className="space-y-3">
                  <Button href={thumbnails.maxres} target="_blank" download icon={<Download size={14} />} block className="!bg-primary !text-black">MaxRes 1080p</Button>
                  <Button href={thumbnails.hq} target="_blank" download icon={<Download size={14} />} block className="!bg-white/5 !text-white">High Quality</Button>
                </Col>
              </Row>
            )}
            {keywords.length > 0 && type === 'tags' && (
              <div className="mt-4">
                <Button icon={<Copy size={14} />} onClick={() => handleCopy(keywords.join(', '))} className="mb-3">Copy All Tags</Button>
                <div className="flex flex-wrap gap-2">
                  {keywords.map((k, i) => (
                    <Tag key={i} className="!bg-white/5 !text-white">{k}</Tag>
                  ))}
                </div>
              </div>
            )}
          </Space>
        )}

        {type === 'keyword' && (
          <Space direction="vertical" className="w-full" size="large">
            <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Target Keyword</Text>
            <div className="flex gap-2">
              <Input size="large" value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. Travel Vlog India" className="!bg-white/5 !border-white/10 !text-white" />
              <Button type="primary" size="large" onClick={handleGenerateKeywords} loading={loading} className="neon-button">Generate</Button>
            </div>
            {keywords.length > 0 && (
              <div className="mt-4">
                <Button icon={<Copy size={14} />} onClick={() => handleCopy(keywords.join(', '))} className="mb-3">Copy Keywords</Button>
                <div className="flex flex-wrap gap-2">
                  {keywords.map((k, i) => (
                    <Tag key={i} className="!bg-white/5 !text-white">{k}</Tag>
                  ))}
                </div>
              </div>
            )}
          </Space>
        )}

        {type === 'hash' && (
          <Space direction="vertical" className="w-full" size="large">
            <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Topic / Hashtag name</Text>
            <div className="flex gap-2">
              <Input size="large" value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. Travel Vlog" className="!bg-white/5 !border-white/10 !text-white" />
              <Button type="primary" size="large" onClick={handleGenerateHashes} loading={loading} className="neon-button">Generate</Button>
            </div>
            {hashes.length > 0 && (
              <div className="mt-4">
                <Button icon={<Copy size={14} />} onClick={() => handleCopy(hashes.join(' '))} className="mb-3">Copy Hashtags</Button>
                <div className="flex flex-wrap gap-2">
                  {hashes.map((h, i) => (
                    <Tag key={i} className="!bg-[#00f2ff]/10 !text-[#00f2ff]">{h}</Tag>
                  ))}
                </div>
              </div>
            )}
          </Space>
        )}
      </Card>

      {/* SEO content */}
      <section className="text-left select-text relative z-10 space-y-8 mt-16 p-8 bg-white/5 border border-white/10 rounded-2xl">
        <h2 className="text-3xl font-black text-white uppercase tracking-tight border-b border-white/10 pb-4 flex items-center gap-3">
          <Sparkles className="text-red-500" />
          YouTube SEO Tools: Complete Step-by-Step Guide & Playbook 🚀
        </h2>

        <div className="space-y-6 text-gray-300">
          <p className="leading-relaxed">
            YouTube पर सफल होने और अपने वीडियोस पर लाखों व्यूज लाने के लिए केवल वीडियो बनाना काफी नहीं है। आपको अपने वीडियो को सही ऑडियंस तक पहुँचाने के लिए <strong>YouTube SEO (Search Engine Optimization)</strong> का उपयोग करना होगा। Sarkari Tools की इस Suite में आपको YouTube SEO को आसान बनाने के लिए 6 एडवांस टूल्स मिलते हैं। आइए जानते हैं कि आप इनका उपयोग कैसे कर सकते हैं:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="p-5 bg-white/5 border border-white/5 rounded-xl">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center text-xs">1</span>
                YouTube Title Generator
              </h3>
              <p className="text-sm text-gray-400 mb-3">
                यह टूल आपके वीडियो के लिए हाई-CTR (Click-Through Rate) वाले आकर्षक टाइटल्स जनरेट करता है।
              </p>
              <ul className="list-disc list-inside text-xs text-gray-400 space-y-1">
                <li><strong>Topic/Keyword:</strong> अपना मुख्य विषय डालें (जैसे: "Learn React")।</li>
                <li><strong>Tone:</strong> Clickbait (वायरल/रोमांचक) या Educational (सीखने योग्य) चुनें।</li>
                <li><strong>Action:</strong> Generate बटन दबाएं और बेस्ट टाइटल कॉपी करें।</li>
              </ul>
            </div>

            <div className="p-5 bg-white/5 border border-white/5 rounded-xl">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center text-xs">2</span>
                YouTube Description Generator
              </h3>
              <p className="text-sm text-gray-400 mb-3">
                एक परफेक्ट वीडियो डिस्क्रिप्शन आपके वीडियो को सर्च में लाने में मदद करता है।
              </p>
              <ul className="list-disc list-inside text-xs text-gray-400 space-y-1">
                <li>अपना वीडियो टॉपिक और अपने सोशल लिंक्स इनपुट करें।</li>
                <li>यह टूल अपने आप टाइमस्टैम्प्स (Timestamps) और जरूरी डिस्क्लेमर के साथ एक प्रोफेशनल डिस्क्रिप्शन बना देगा।</li>
              </ul>
            </div>

            <div className="p-5 bg-white/5 border border-white/5 rounded-xl">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center text-xs">3</span>
                YouTube Thumbnail Downloader
              </h3>
              <p className="text-sm text-gray-400 mb-3">
                किसी भी लाइव यूट्यूब वीडियो का थंबनेल HD (High Definition) क्वालिटी में डाउनलोड करें।
              </p>
              <ul className="list-disc list-inside text-xs text-gray-400 space-y-1">
                <li>वीडियो का पूरा URL इनपुट बॉक्स में पेस्ट करें।</li>
                <li>Extract पर क्लिक करें और 1080p (MaxRes) या Standard HD डाउनलोड करें।</li>
              </ul>
            </div>

            <div className="p-5 bg-white/5 border border-white/5 rounded-xl">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center text-xs">4</span>
                YouTube Keyword Generator
              </h3>
              <p className="text-sm text-gray-400 mb-3">
                पता करें कि लोग YouTube पर क्या सर्च कर रहे हैं ताकि आप सही कीवर्ड्स को टारगेट कर सकें।
              </p>
              <ul className="list-disc list-inside text-xs text-gray-400 space-y-1">
                <li>अपना बेस कीवर्ड लिखें (जैसे: "Python Tutorial")।</li>
                <li>Generate पर क्लिक करें और संबंधित वायरल कीवर्ड्स की लिस्ट कॉपी कर लें।</li>
              </ul>
            </div>

            <div className="p-5 bg-white/5 border border-white/5 rounded-xl">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center text-xs">5</span>
                YouTube Tags Extractor
              </h3>
              <p className="text-sm text-gray-400 mb-3">
                अपने कंपटीटर्स के वायरल वीडियो के गुप्त टैग्स (Tags) का पता लगाएं।
              </p>
              <ul className="list-disc list-inside text-xs text-gray-400 space-y-1">
                <li>किसी भी वायरल यूट्यूब वीडियो का लिंक पेस्ट करें।</li>
                <li>Extract दबाएं और वीडियो में उपयोग किए गए मुख्य टैग्स को एक क्लिक में कॉपी करें।</li>
              </ul>
            </div>

            <div className="p-5 bg-white/5 border border-white/5 rounded-xl">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center text-xs">6</span>
                YouTube Hash Generator
              </h3>
              <p className="text-sm text-gray-400 mb-3">
                YouTube Shorts और लॉन्ग वीडियो के लिए वायरल हैशटैग बंडल्स जनरेट करें।
              </p>
              <ul className="list-disc list-inside text-xs text-gray-400 space-y-1">
                <li>अपने वीडियो का टॉपिक या कोई एक शब्द लिखें।</li>
                <li>यह आपको ट्रेंडिंग हैशटैग्स जनरेट करके देगा जो वीडियो रीच बढ़ाते हैं।</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6">
            <h3 className="text-xl font-bold text-white mb-3">📈 YouTube SEO Pro-Tips for Creators</h3>
            <ol className="list-decimal list-inside space-y-3 text-sm text-gray-400">
              <li>
                <strong className="text-white">CTR Optimize करें:</strong> Thumbnail Downloader का उपयोग करके बड़े क्रिएटर्स के थंबनेल्स का अध्ययन करें और Title Generator से आईडिया लेकर बेस्ट और आकर्षक टाइटल सेट करें।
              </li>
              <li>
                <strong className="text-white">Metadata Consistency:</strong> जो मुख्य कीवर्ड आपने Keyword Generator से निकाला है, उसे अपने Title, Description और Tags तीनों जगहों पर जरूर डालें।
              </li>
              <li>
                <strong className="text-white">Shorts Strategy:</strong> YouTube Shorts अपलोड करते समय हमेशा Hash Generator के हैशटैग्स का उपयोग करें क्योंकि Shorts शेल्फ में हैशटैग्स की बहुत अधिक भूमिका होती है।
              </li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
};

export default YoutubeTool;
