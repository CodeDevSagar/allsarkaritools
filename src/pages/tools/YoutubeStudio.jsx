import React, { useState } from 'react';
import { Card, Input, Button, Tabs, Space, Typography, Row, Col, Select, message, Tag } from 'antd';
import { Search, Copy, Download, Hash, Key, Video, FileText, Sparkles, HelpCircle } from 'lucide-react';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const YoutubeStudio = () => {
  const [activeTab, setActiveTab] = useState('title');
  const [loading, setLoading] = useState(false);

  // Title Generator states
  const [titleTopic, setTitleTopic] = useState('');
  const [titleTone, setTitleTone] = useState('clickbait');
  const [generatedTitles, setGeneratedTitles] = useState([]);

  // Description Generator states
  const [descTopic, setDescTopic] = useState('');
  const [descLinks, setDescLinks] = useState('https://twitter.com/myhandle\nhttps://instagram.com/myhandle');
  const [generatedDesc, setGeneratedDesc] = useState('');

  // Thumbnail states
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnails, setThumbnails] = useState(null);

  // Tags & Keywords states
  const [keywordTopic, setKeywordTopic] = useState('');
  const [generatedTags, setGeneratedTags] = useState([]);

  // Hash states
  const [hashTopic, setHashTopic] = useState('');
  const [generatedHashes, setGeneratedHashes] = useState([]);

  // Helper: Copy to Clipboard
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    message.success('Copied to clipboard! 📋');
  };

  // Generate Titles
  const generateTitlesList = () => {
    if (!titleTopic.trim()) return message.warning('Please enter a topic');
    setLoading(true);
    setTimeout(() => {
      const templates = {
        clickbait: [
          `😱 You Won't Believe What Happened When I Tried ${titleTopic}!`,
          `❌ Stop Doing This! The Ultimate ${titleTopic} Mistake Everyone Makes`,
          `This ${titleTopic} Secret Will Change Your Life Forever! 🚀`,
          `I Tried ${titleTopic} For 30 Days And This Happened... 🤯`,
          `10 Secrets About ${titleTopic} They Don't Want You To Know!`
        ],
        educational: [
          `The Complete Guide to ${titleTopic} (Step-by-Step for Beginners)`,
          `How to Master ${titleTopic} in 2026: Fast & Easy Tutorial`,
          `The Science Behind ${titleTopic} Explained Simply`,
          `Top 5 Essential Concepts of ${titleTopic} You Must Learn`,
          `${titleTopic} Made Simple: Ultimate Guide to Expert Level`
        ],
        gaming: [
          `🔥 Breaking ${titleTopic}! The New Meta is INSANE!`,
          `Can I Beat This Challenge Using ONLY ${titleTopic}? 🎮`,
          `How to Play ${titleTopic} Like a PRO: Tips and Tricks`,
          `Rating All ${titleTopic} Strategies From Worst to Best!`,
          `This ${titleTopic} Build is Completely BROKEN! 🏆`
        ],
        review: [
          `Is ${titleTopic} Actually Worth It? (Honest Review after 6 Months)`,
          `The Truth About ${titleTopic}: Watch This Before You Buy!`,
          `Is ${titleTopic} a Scam or Legit? In-Depth Analysis 🔍`,
          `Top 3 ${titleTopic} Alternatives You Need to See`,
          `We Tested ${titleTopic} So You Don't Have To!`
        ]
      };
      setGeneratedTitles(templates[titleTone] || templates.clickbait);
      setLoading(false);
      message.success('Titles generated successfully! ⚡');
    }, 800);
  };

  // Generate Description
  const generateDescriptionText = () => {
    if (!descTopic.trim()) return message.warning('Please enter a topic');
    setLoading(true);
    setTimeout(() => {
      const desc = `🔥 Master ${descTopic} in this ultimate step-by-step video tutorial! We cover everything from the basic concepts to advanced strategies so you can get the best results.

📖 Timestamps:
0:00 - Introduction & Hook
1:45 - What is ${descTopic}?
3:30 - Core Concepts Explained
6:15 - Step-by-Step Tutorial
10:45 - Common Mistakes to Avoid
14:20 - Summary & Outro

🔗 Follow My Socials:
${descLinks || 'https://linktr.ee/myhandle'}

💡 About This Channel:
We create high-quality educational videos to help you master new skills and tools. Don't forget to subscribe for more weekly tutorials!

#${descTopic.replace(/\s+/g, '')} #YouTubeSEO #Tutorial`;
      setGeneratedDesc(desc);
      setLoading(false);
      message.success('Description generated! 📝');
    }, 800);
  };

  // Extract Thumbnail
  const extractThumbnailUrls = () => {
    if (!videoUrl.trim()) return message.warning('Please enter a YouTube video URL');
    
    // Regular expression to parse YouTube ID
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = videoUrl.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;

    if (!videoId) {
      return message.error('Invalid YouTube URL! Please check the link.');
    }

    setThumbnails({
      maxres: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      sd: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
      hq: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      mq: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
      default: `https://img.youtube.com/vi/${videoId}/default.jpg`
    });
    message.success('Thumbnails extracted! 🖼️');
  };

  // Generate Keywords
  const generateKeywordsList = () => {
    if (!keywordTopic.trim()) return message.warning('Please enter a keyword topic');
    setLoading(true);
    setTimeout(() => {
      const base = keywordTopic.toLowerCase();
      const tags = [
        base,
        `${base} tutorial`,
        `${base} for beginners`,
        `how to do ${base}`,
        `best ${base} tips`,
        `${base} course`,
        `mastering ${base}`,
        `simple ${base}`,
        `${base} tools`,
        `learn ${base} online`,
        `${base} strategies`,
        `${base} step by step`
      ];
      setGeneratedTags(tags);
      setLoading(false);
      message.success('Keywords generated! 🔑');
    }, 800);
  };

  // Generate Hashes
  const generateHashesList = () => {
    if (!hashTopic.trim()) return message.warning('Please enter a topic');
    setLoading(true);
    setTimeout(() => {
      const base = hashTopic.toLowerCase().replace(/\s+/g, '');
      const hashes = [
        `#${base}`,
        `#${base}Tutorial`,
        `#${base}Tips`,
        `#Learn${base}`,
        `#${base}SEO`,
        `#YouTube${base}`,
        `#HowTo${base}`,
        `#${base}Guide`
      ];
      setGeneratedHashes(hashes);
      setLoading(false);
      message.success('Hashes generated! 🏷️');
    }, 800);
  };

  return (
    <div className="max-w-6xl mx-auto py-24 px-4 min-h-screen">
      <div className="text-center mb-16">
        <Title className="!text-white !text-5xl !font-black !mb-4 tracking-tighter uppercase flex items-center justify-center gap-3">
          <Video size={48} className="text-red-500 fill-red-500" /> YouTube SEO Studio
        </Title>
        <Paragraph className="!text-gray-400 text-lg">
          Generate high-CTR titles, optimized descriptions, keyword tags, hashtag bundles, and extract thumbnails locally.
        </Paragraph>
      </div>

      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab}
        className="custom-tabs-glass mb-16"
        items={[
          {
            key: 'title',
            label: <span className="flex items-center gap-2 text-white font-bold"><Sparkles size={16} /> Title Generator</span>,
            children: (
              <Card className="glass-card !p-6">
                <Space direction="vertical" className="w-full" size="large">
                  <Row gutter={[16, 16]}>
                    <Col xs={24} md={16}>
                      <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Video Topic / Main Keywords</Text>
                      <Input 
                        size="large"
                        placeholder="e.g. Learn Python Programming"
                        value={titleTopic}
                        onChange={e => setTitleTopic(e.target.value)}
                        className="!bg-white/5 !border-white/10 !text-white !rounded-xl"
                      />
                    </Col>
                    <Col xs={24} md={8}>
                      <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Tone Style</Text>
                      <Select 
                        size="large" 
                        value={titleTone} 
                        onChange={setTitleTone} 
                        className="w-full !bg-[#0c0721] !border-white/10 !text-white custom-select-glow"
                        dropdownClassName="!bg-[#0c0721] !border-white/10 !text-white"
                      >
                        <Option value="clickbait">😱 Clickbait / Viral</Option>
                        <Option value="educational">🎓 Educational / Tutorial</Option>
                        <Option value="gaming">🎮 Gaming / Hype</Option>
                        <Option value="review">🔍 Review / Honest</Option>
                      </Select>
                    </Col>
                  </Row>
                  
                  <Button 
                    type="primary" 
                    size="large" 
                    onClick={generateTitlesList} 
                    loading={loading}
                    className="neon-button !h-12 !text-base"
                  >
                    Generate High-CTR Titles
                  </Button>

                  {generatedTitles.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Suggested Titles</Text>
                      {generatedTitles.map((t, idx) => (
                        <div key={idx} className="flex justify-between items-center p-4 bg-white/[0.02] border border-white/5 rounded-xl gap-4 hover:border-primary/30 transition-all">
                          <Text className="text-white font-medium">{t}</Text>
                          <Button 
                            icon={<Copy size={16} />} 
                            type="default" 
                            onClick={() => handleCopy(t)}
                            className="!bg-white/5 !border-white/10 !text-white hover:!text-primary hover:!border-primary"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </Space>
              </Card>
            )
          },
          {
            key: 'desc',
            label: <span className="flex items-center gap-2 text-white font-bold"><FileText size={16} /> Description Generator</span>,
            children: (
              <Card className="glass-card !p-6">
                <Space direction="vertical" className="w-full" size="large">
                  <div>
                    <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Video Topic / Summary</Text>
                    <Input 
                      size="large"
                      placeholder="e.g. Photoshop course for UI designers"
                      value={descTopic}
                      onChange={e => setDescTopic(e.target.value)}
                      className="!bg-white/5 !border-white/10 !text-white !rounded-xl"
                    />
                  </div>
                  <div>
                    <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Social Links / Channel Handles</Text>
                    <TextArea 
                      rows={3}
                      placeholder="Enter links, one per line..."
                      value={descLinks}
                      onChange={e => setDescLinks(e.target.value)}
                      className="!bg-white/5 !border-white/10 !text-white !rounded-xl font-mono text-sm"
                    />
                  </div>
                  
                  <Button 
                    type="primary" 
                    size="large" 
                    onClick={generateDescriptionText} 
                    loading={loading}
                    className="neon-button !h-12 !text-base"
                  >
                    Generate SEO Description
                  </Button>

                  {generatedDesc && (
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-2">
                        <Text className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Output Description</Text>
                        <Button 
                          icon={<Copy size={14} className="mr-1" />} 
                          size="small" 
                          onClick={() => handleCopy(generatedDesc)}
                          className="!bg-white/5 !border-white/10 !text-white hover:!text-primary"
                        >
                          Copy All
                        </Button>
                      </div>
                      <TextArea 
                        rows={12} 
                        value={generatedDesc} 
                        readOnly 
                        className="!bg-white/[0.01] !border-white/10 !text-gray-300 !rounded-xl font-mono text-sm leading-relaxed"
                      />
                    </div>
                  )}
                </Space>
              </Card>
            )
          },
          {
            key: 'thumbnail',
            label: <span className="flex items-center gap-2 text-white font-bold"><Video size={16} /> Thumbnail Extractor</span>,
            children: (
              <Card className="glass-card !p-6">
                <Space direction="vertical" className="w-full" size="large">
                  <div>
                    <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">YouTube Video Link</Text>
                    <div className="flex gap-2">
                      <Input 
                        size="large"
                        placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                        value={videoUrl}
                        onChange={e => setVideoUrl(e.target.value)}
                        className="!bg-white/5 !border-white/10 !text-white !rounded-xl flex-1"
                      />
                      <Button 
                        type="primary" 
                        size="large" 
                        onClick={extractThumbnailUrls}
                        className="neon-button !h-10"
                      >
                        Extract
                      </Button>
                    </div>
                  </div>

                  {thumbnails && (
                    <div className="mt-4 space-y-6">
                      <Text className="text-gray-400 font-bold block uppercase text-[10px] tracking-widest">Extracted Thumbnails</Text>
                      
                      <Row gutter={[16, 16]}>
                        <Col xs={24} md={16}>
                          <div className="p-2 bg-white/5 rounded-2xl border border-white/10">
                            <img src={thumbnails.maxres} alt="Max Resolution" className="w-full h-auto rounded-xl object-contain" onError={(e) => { e.target.src = thumbnails.hq; }} />
                          </div>
                        </Col>
                        
                        <Col xs={24} md={8} className="space-y-4">
                          <div>
                            <Text className="text-white font-bold block text-base mb-1">Max Resolution (1080p)</Text>
                            <Button href={thumbnails.maxres} target="_blank" download icon={<Download size={16} />} block className="!bg-primary !border-none !text-black font-black">
                              Download MaxRes
                            </Button>
                          </div>
                          <div>
                            <Text className="text-white font-bold block text-base mb-1">Standard Definition (SD)</Text>
                            <Button href={thumbnails.sd} target="_blank" download icon={<Download size={16} />} block className="!bg-white/5 !border-white/10 !text-white">
                              Download SD
                            </Button>
                          </div>
                          <div>
                            <Text className="text-white font-bold block text-base mb-1">High Quality (HQ)</Text>
                            <Button href={thumbnails.hq} target="_blank" download icon={<Download size={16} />} block className="!bg-white/5 !border-white/10 !text-white">
                              Download HQ
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  )}
                </Space>
              </Card>
            )
          },
          {
            key: 'keywords',
            label: <span className="flex items-center gap-2 text-white font-bold"><Key size={16} /> Keyword & Tags</span>,
            children: (
              <Card className="glass-card !p-6">
                <Space direction="vertical" className="w-full" size="large">
                  <div>
                    <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Target Keyword / Topic</Text>
                    <div className="flex gap-2">
                      <Input 
                        size="large"
                        placeholder="e.g. DIY Room Decor"
                        value={keywordTopic}
                        onChange={e => setKeywordTopic(e.target.value)}
                        className="!bg-white/5 !border-white/10 !text-white !rounded-xl flex-1"
                        onPressEnter={generateKeywordsList}
                      />
                      <Button 
                        type="primary" 
                        size="large" 
                        onClick={generateKeywordsList} 
                        loading={loading}
                        className="neon-button !h-10"
                      >
                        Generate
                      </Button>
                    </div>
                  </div>

                  {generatedTags.length > 0 && (
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-4">
                        <Text className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Suggested Keywords & Tags</Text>
                        <Button 
                          icon={<Copy size={14} />} 
                          size="small" 
                          onClick={() => handleCopy(generatedTags.join(', '))}
                          className="!bg-white/5 !border-white/10 !text-white hover:!text-primary"
                        >
                          Copy Tags List
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                        {generatedTags.map((tag, idx) => (
                          <Tag key={idx} className="!bg-[#ff007f]/10 !text-[#ff3b7e] !border-[#ff007f]/30 px-3 py-1.5 rounded-lg text-sm font-semibold hover:scale-105 transition-transform cursor-pointer" onClick={() => handleCopy(tag)}>
                            {tag}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  )}
                </Space>
              </Card>
            )
          },
          {
            key: 'hash',
            label: <span className="flex items-center gap-2 text-white font-bold"><Hash size={16} /> Hash Generator</span>,
            children: (
              <Card className="glass-card !p-6">
                <Space direction="vertical" className="w-full" size="large">
                  <div>
                    <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Target Topic for Hashtags</Text>
                    <div className="flex gap-2">
                      <Input 
                        size="large"
                        placeholder="e.g. Travel Vlog India"
                        value={hashTopic}
                        onChange={e => setHashTopic(e.target.value)}
                        className="!bg-white/5 !border-white/10 !text-white !rounded-xl flex-1"
                        onPressEnter={generateHashesList}
                      />
                      <Button 
                        type="primary" 
                        size="large" 
                        onClick={generateHashesList} 
                        loading={loading}
                        className="neon-button !h-10"
                      >
                        Generate
                      </Button>
                    </div>
                  </div>

                  {generatedHashes.length > 0 && (
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-4">
                        <Text className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Suggested Hashtags</Text>
                        <Button 
                          icon={<Copy size={14} />} 
                          size="small" 
                          onClick={() => handleCopy(generatedHashes.join(' '))}
                          className="!bg-white/5 !border-white/10 !text-white hover:!text-primary"
                        >
                          Copy Hashtags
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                        {generatedHashes.map((h, idx) => (
                          <Tag key={idx} className="!bg-[#00f2ff]/10 !text-[#00f2ff] !border-[#00f2ff]/30 px-3 py-1.5 rounded-lg text-sm font-mono hover:scale-105 transition-transform cursor-pointer" onClick={() => handleCopy(h)}>
                            {h}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  )}
                </Space>
              </Card>
            )
          }
        ]}
      />

      {/* ── MASSIVE 1000-WORD SEO ARTICLE ABOUT YOUTUBE SEO WITH 3D EMOJIS ── */}
      <section className="mt-20 text-left select-text relative z-10">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2 space-y-12">
            
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                📹 YouTube Algorithm & Video SEO Optimization 🚀
              </h2>
              <p className="text-gray-400 leading-relaxed text-base">
                Welcome to the professional-grade **YouTube SEO Studio** 📈. YouTube is currently the second-largest search engine in the world, processing billions of search queries every single day. However, getting your video discovered on the platform is not just about recording high-quality videos; it requires optimizing the **Video Metadata** 🔍. Metadata consists of your video's title, description, tags, hashtags, and thumbnail structures.
              </p>
              <p className="text-gray-400 leading-relaxed text-base">
                When you publish a video, the YouTube crawling algorithm reads these metadata fields to understand the context and target audience of your content. If you leave these fields empty or optimize them incorrectly, your video might not show up in search results or recommended panels, leading to low click-through rates (CTR) and views. 📊
              </p>
              <p className="text-gray-400 leading-relaxed text-base">
                Our YouTube SEO Studio provides creators with a fully local tool to generate titles, descriptions, keyword tags, hashtag bundles, and extract high-resolution thumbnails instantly. By using these tools, you can ensure your channel is fully optimized for index crawlers and recommendation algorithms. 🛠️
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                🏆 Crafting High-CTR Titles & Descriptions 📝
              </h2>
              <p className="text-gray-400 leading-relaxed text-base">
                The **Video Title** is the most crucial piece of metadata. It has two main roles: capturing the attention of human viewers (high CTR) and matching search engine keywords (SEO). A great title should find a balance between clickbait curiosity and clear description. 🎓
              </p>
              <p className="text-gray-400 leading-relaxed text-base">
                Using our **Title Generator**, you can quickly generate ideas for four different styles: Clickbait, Educational, Gaming, and Review. This helps you target the right audience and increase your video's visibility in search and suggested columns. 🎨
              </p>
              <p className="text-gray-400 leading-relaxed text-base">
                Similarly, your **Video Description** should be well-structured. A professional description needs a clear introduction hook containing your primary keywords, followed by organized timestamp links (which help Google index your video chapters), social media links, and hashtag bundles. This layout makes your content easier to read and browse. ⚙️
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                🏷️ The Importance of Keywords, Tags, & Hashtags 🔑
              </h2>
              <p className="text-gray-400 leading-relaxed text-base">
                While tags are less critical than titles and descriptions today, they still play an important role in helping YouTube categorize your content and resolve common spelling errors. **Hashtags**, on the other hand, allow users to find related videos across the entire platform. 🌐
              </p>
              <p className="text-gray-400 leading-relaxed text-base">
                Our **Keyword and Hash Generators** help you build tag lists and hashtag bundles. Sticking to relevant tags rather than spamming unrelated keywords helps protect your video from being flagged by spam filters and ensures it ranks for the correct search queries. 🛡️
              </p>
            </div>

          </div>

          {/* Right Column: Tips & Info */}
          <div className="space-y-8">
            <div className="p-8 bg-gradient-to-br from-[#1b103c]/60 to-[#0c0721]/90 rounded-[2.5rem] border border-[#7000ff]/20 shadow-2xl backdrop-blur-md">
              <h3 className="text-lg font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                💡 SEO Best Practices 📐
              </h3>
              <ul className="text-gray-400 text-xs space-y-4 leading-relaxed">
                <li>• <strong>Title Length:</strong> Keep your video titles below 60 characters so they don't get cut off in search layouts.</li>
                <li>• <strong>Keywords Placement:</strong> Put your main keyword near the beginning of your title and description.</li>
                <li>• <strong>Timestamps:</strong> Always include a <code>0:00</code> timestamp to enable Google Search Chapters.</li>
                <li>• <strong>Hashtags Limit:</strong> Stick to 3-5 relevant hashtags per video. Avoid spamming.</li>
              </ul>
            </div>

            <div className="p-8 bg-white/[0.01] border border-white/5 rounded-[2.5rem] space-y-4">
              <h4 className="text-white font-bold text-base flex items-center gap-2">
                🔒 Privacy First Guarantee 🛡️
              </h4>
              <p className="text-gray-500 text-xs leading-relaxed">
                This studio operates 100% locally in your web browser. No search topics, video links, or generated tags are sent to external servers or databases.
              </p>
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
                q: "What is CTR (Click-Through Rate) and why does it matter? 📈",
                a: "CTR is the percentage of viewers who click on your video after seeing its thumbnail and title. A high CTR indicates that your thumbnail and title are engaging, which signals the YouTube algorithm to suggest your video to more people."
              },
              {
                q: "How do video timestamps help with Google Search indexing? 📄",
                a: "When you add structured timestamps in your video description, search engines can index specific parts of your video as 'Key Moments.' This allows your video to appear in Google search results for highly specific queries."
              },
              {
                q: "Can I extract the thumbnail of any YouTube video? 🖼️",
                a: "Yes. By pasting any public YouTube video URL, our tool extracts the direct URLs to the image assets hosted on Google's content delivery network (CDN). This allows you to view or download the thumbnails instantly."
              },
              {
                q: "How many tags should I add to my YouTube videos? 🏷️",
                a: "We recommend adding between 10 to 15 highly relevant tags. Focus on a mix of broad category tags (e.g. 'coding') and specific long-tail keywords (e.g. 'learn Python step by step'). Avoid using misleading tags, as it violates search policies."
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

export default YoutubeStudio;
