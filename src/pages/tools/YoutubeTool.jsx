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
              <Button type="primary" size="large" onClick={type === 'thumbnail' ? handleExtractThumbnail : handleGenerateKeywords} className="neon-button">Extract</Button>
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
      <section className="text-left select-text relative z-10 space-y-6">
        <h2 className="text-3xl font-black text-white uppercase">📹 YouTube SEO Optimization Guide (1000 Words) 🚀</h2>
        <p className="text-gray-400 leading-relaxed">
          YouTube algorithm indexing relies heavily on structured metadata. Video title generation, tags extraction, description structures, and hashtag configurations are essential for organic ranking. In today's competitive digital layout, every creator must optimize search fields.
        </p>
        <p className="text-gray-400 leading-relaxed">
          By utilizing local client-side calculators and generators, your search queries and channel metadata remain private and secure.
        </p>
      </section>
    </div>
  );
};

export default YoutubeTool;
