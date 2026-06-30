import React, { useState } from 'react';
import { Card, Input, Button, Tabs, Space, Typography, Row, Col, Select, message, Tag } from 'antd';
import { Bot, Copy, RefreshCw, PenTool, Sparkles, BookOpen, Star, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ToolContent from '../../components/ToolContent';
import { generateLocalStory } from '../../utils/localStoryEngine';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const AiToolsSuite = ({ defaultTab = 'writer' }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [loading, setLoading] = useState(false);
  const [outputText, setOutputText] = useState('');

  // AI Writer states
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('professional');
  const [contentType, setContentType] = useState('paragraph');

  // AI Story Generator states
  const [storyPrompt, setStoryPrompt] = useState('');
  const [genre, setGenre] = useState('Fantasy Story');
  const [storyLang, setStoryLang] = useState('English');
  const [storyLength, setStoryLength] = useState('short');

  // Name Meaning states
  const [userName, setUserName] = useState('');
  const [nameData, setNameData] = useState(null);

  const handleCopy = (text) => {
    if (!text) return message.warning('No content to copy');
    navigator.clipboard.writeText(text);
    message.success('Copied to clipboard! 📋');
  };

  // Simulated AI Writer
  const handleWrite = () => {
    if (!topic.trim()) return message.warning('Please enter a topic or keyword');
    setLoading(true);
    setOutputText('');

    setTimeout(() => {
      const intros = {
        professional: `In today's fast-paced digital environment, ${topic} stands as a significant cornerstone of strategic development.`,
        creative: `Imagine a world where ${topic} isn't just an idea, but a living, breathing landscape of endless possibilities.`,
        casual: `Let's talk about ${topic}. Honestly, it is one of the most interesting things happening right now in our daily lives.`,
      };

      const bodies = {
        professional: `From a structural standpoint, analyzing the core components of ${topic} reveals critical insights into efficiency and innovation. Industry leaders consistently highlight its impact on workflow refinement.`,
        creative: `It dances between the borders of curiosity and practical design, weaving together threads of innovation that redefine how we perceive our daily challenges.`,
        casual: `It's not just a trend; it's a huge shift in how we handle tasks, solve problems, and connect with other creators in the workspace.`,
      };

      const conclusions = {
        professional: `Ultimately, maintaining a forward-looking approach toward ${topic} will determine long-term success and growth.`,
        creative: `Thus, ${topic} remains a beacon of inspiration, reminding us that the future belongs to those who dare to build.`,
        casual: `In short, keeping an eye on ${topic} is definitely worth your time. Let's see where this road takes us!`,
      };

      const result = `${intros[tone]}\n\n${bodies[tone]}\n\n${conclusions[tone]}`;
      setOutputText(result);
      setLoading(false);
      message.success('Content generated! ✍️');
    }, 1200);
  };

  // Simulated AI Story Generator
  const handleStoryGenerate = () => {
    if (!storyPrompt.trim()) return message.warning('Please enter a story prompt');
    setLoading(true);
    setOutputText('');

    setTimeout(() => {
      try {
        const storyOutput = generateLocalStory({
          prompt: storyPrompt,
          genre,
          length: storyLength,
          language: storyLang
        });
        setOutputText(storyOutput);
        message.success('Story generated! 📖');
      } catch (err) {
        message.error('Failed to generate story.');
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  // Name Meaning Finder Logic
  const handleNameMeaning = () => {
    if (!userName.trim()) return message.warning('Please enter a name');
    setLoading(true);
    setNameData(null);

    setTimeout(() => {
      const name = userName.trim().toUpperCase();
      const firstLetter = name.charAt(0);

      // Predefined positive acronym meanings
      const lettersDb = {
        A: { trait: 'Ambitious', desc: 'Always striving for excellence and new heights.' },
        B: { trait: 'Bold', desc: 'Courageous in facing challenges with a warm heart.' },
        C: { trait: 'Charismatic', desc: 'Attracts positivity and inspires people around.' },
        D: { trait: 'Dynamic', desc: 'Adaptable, energetic, and highly focused.' },
        E: { trait: 'Empathetic', desc: 'Highly sensitive to the needs and feelings of others.' },
        F: { trait: 'Friendly', desc: 'Brings joy and comfortable vibes to any room.' },
        G: { trait: 'Generous', desc: 'Believes in sharing and supporting community growth.' },
        H: { trait: 'Honest', desc: 'Value integrity and trust above everything else.' },
        I: { trait: 'Inspiring', desc: 'Leads by example with creative ideas.' },
        J: { trait: 'Joyful', desc: 'Spreads laughter and looks at the bright side.' },
        K: { trait: 'Kind', desc: 'Compassionate soul who builds lasting relationships.' },
        L: { trait: 'Loyal', desc: 'A dedicated friend you can always count on.' },
        M: { trait: 'Mindful', desc: 'Values balance, wisdom, and inner peace.' },
        N: { trait: 'Noble', desc: 'Acts with grace, dignity, and honorable intent.' },
        O: { trait: 'Optimistic', desc: 'Brings hope and bright solutions to challenges.' },
        P: { trait: 'Passionate', desc: 'Drives tasks with extreme dedication and focus.' },
        Q: { trait: 'Quick-witted', desc: 'Sharp mind that captures humor and strategies.' },
        R: { trait: 'Resilient', desc: 'Recovers from setbacks stronger than ever.' },
        S: { trait: 'Sincere', desc: 'Authentic and true in expressions and promises.' },
        T: { trait: 'Trustworthy', desc: 'A pillar of strength and support for loved ones.' },
        U: { trait: 'Unique', desc: 'Possesses a special style that stands out.' },
        V: { trait: 'Vibrant', desc: 'Full of life, color, and positive aura.' },
        W: { trait: 'Wise', desc: 'Deep thinker who offers mature guidance.' },
        X: { trait: 'Xenial', desc: 'Hospitable, welcoming, and warm to visitors.' },
        Y: { trait: 'Youthful', desc: 'Maintains fresh, curious, and energetic spirits.' },
        Z: { trait: 'Zealous', desc: 'Drives actions with great enthusiasm.' }
      };

      const defaultLetterData = { trait: 'Unique', desc: 'Possesses a special spark that stands out.' };
      const mainTrait = lettersDb[firstLetter] || defaultLetterData;

      // Lucky parameter deterministic calculations
      let sum = 0;
      for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);

      setNameData({
        name: userName,
        firstLetter,
        personality: mainTrait.trait,
        personalityDesc: mainTrait.desc,
        luckyNumber: (sum % 9) + 1,
        luckyColor: ['Gold', 'Emerald Green', 'Royal Blue', 'Crimson Red', 'Purple', 'Orange', 'Cyan'][sum % 7],
        traitScore: 80 + (sum % 21),
      });

      setLoading(false);
      message.success('Name meaning loaded! 🌟');
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto py-24 px-4 min-h-screen">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6 backdrop-blur-md">
          <Bot size={16} className="text-primary animate-pulse" />
          <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">AI Suite • Dynamic Generation</span>
        </div>
        <h1 className="responsive-title !text-white !mb-4 tracking-tighter uppercase">AI Utilities Suite</h1>
        <Paragraph className="!text-gray-400 text-lg sm:text-xl">
          Generate articles, build stories, and find name personality details instantly.
        </Paragraph>
      </div>

      <Tabs
        activeKey={activeTab}
        onChange={(key) => { setActiveTab(key); setOutputText(''); setNameData(null); }}
        className="custom-tabs-glass mb-16"
        items={[
          {
            key: 'writer',
            label: <span className="flex items-center gap-2 text-white font-bold"><PenTool size={16} /> AI Writer</span>,
            children: (
              <Card className="glass-card !p-8">
                <Row gutter={[32, 32]}>
                  <Col xs={24} md={12}>
                    <Space direction="vertical" className="w-full" size="large">
                      <div>
                        <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Topic / Keyword</Text>
                        <Input 
                          placeholder="e.g. Remote Work, Electric Cars" 
                          value={topic} 
                          onChange={e => setTopic(e.target.value)} 
                          className="!bg-white/5 !border-white/10 !text-white !rounded-xl !h-12"
                        />
                      </div>

                      <Row gutter={16}>
                        <Col span={12}>
                          <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Tone</Text>
                          <Select value={tone} onChange={setTone} className="w-full !bg-[#0c0721] !border-white/10 !text-white custom-select-glow">
                            <Option value="professional">Professional</Option>
                            <Option value="creative">Creative</Option>
                            <Option value="casual">Casual</Option>
                          </Select>
                        </Col>
                        <Col span={12}>
                          <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Length</Text>
                          <Select value={contentType} onChange={setContentType} className="w-full !bg-[#0c0721] !border-white/10 !text-white custom-select-glow">
                            <Option value="paragraph">Short Paragraph</Option>
                            <Option value="article">Full Draft</Option>
                          </Select>
                        </Col>
                      </Row>

                      <Button type="primary" size="large" onClick={handleWrite} loading={loading} className="neon-button !w-full !h-14">
                        Generate Content
                      </Button>
                    </Space>
                  </Col>

                  <Col xs={24} md={12}>
                    <div className="flex justify-between items-center mb-2">
                      <Text className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Generated Output</Text>
                      <Button size="small" icon={<Copy size={12} />} onClick={() => handleCopy(outputText)} className="!bg-white/5 !border-white/10 !text-white">Copy Output</Button>
                    </div>
                    <TextArea 
                      rows={20}
                      value={outputText}
                      readOnly
                      placeholder="Your generated content will appear here..."
                      className="!bg-white/[0.01] !border-white/10 !text-cyan-300 !rounded-xl font-mono text-sm leading-relaxed !min-h-[480px]"
                    />
                  </Col>
                </Row>
              </Card>
            )
          },
          {
            key: 'story',
            label: <span className="flex items-center gap-2 text-white font-bold"><BookOpen size={16} /> AI Story Generator</span>,
            children: (
              <Card className="glass-card !p-8">
                <Row gutter={[32, 32]}>
                  <Col xs={24} md={12}>
                    <Space direction="vertical" className="w-full" size="large">
                      <div>
                        <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Story Prompt / Premise</Text>
                        <Input 
                          placeholder="e.g. A mysterious map, The last spaceship" 
                          value={storyPrompt} 
                          onChange={e => setStoryPrompt(e.target.value)} 
                          className="!bg-white/5 !border-white/10 !text-white !rounded-xl !h-12"
                        />
                      </div>

                      <div>
                        <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Story Genre</Text>
                        <Select value={genre} onChange={setGenre} className="w-full !bg-[#0c0721] !border-white/10 !text-white custom-select-glow">
                          <Option value="Love Story">❤️ Love Story</Option>
                          <Option value="Romantic Story">✨ Romantic Story</Option>
                          <Option value="Friendship Story">🤝 Friendship Story</Option>
                          <Option value="Family Story">🏠 Family Story</Option>
                          <Option value="Motivational Story">🔥 Motivational Story</Option>
                          <Option value="Adventure Story">🗺️ Adventure Story</Option>
                          <Option value="Horror Story">👻 Horror Story</Option>
                          <Option value="Mystery Story">🔍 Mystery Story</Option>
                          <Option value="Thriller Story">⚡ Thriller Story</Option>
                          <Option value="Fantasy Story">🦄 Fantasy Story</Option>
                          <Option value="Historical Story">🏛️ Historical Story</Option>
                          <Option value="War Story">🛡️ War Story</Option>
                          <Option value="Science Fiction Story">🚀 Science Fiction Story</Option>
                          <Option value="Biography Style Story">👤 Biography Style Story</Option>
                          <Option value="Political Story">🗳️ Political Story</Option>
                          <Option value="Educational Story">🎓 Educational Story</Option>
                          <Option value="Children's Story">🧸 Children's Story</Option>
                          <Option value="Business Story">📈 Business Story</Option>
                          <Option value="Inspirational Story">💡 Inspirational Story</Option>
                        </Select>
                      </div>

                      <Row gutter={16}>
                        <Col span={12}>
                          <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Language</Text>
                          <Select value={storyLang} onChange={setStoryLang} className="w-full !bg-[#0c0721] !border-white/10 !text-white">
                            <Option value="English">🇬🇧 English</Option>
                            <Option value="Hindi">🇮🇳 Hindi</Option>
                            <Option value="Hinglish">🗣️ Hinglish</Option>
                          </Select>
                        </Col>
                        <Col span={12}>
                          <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Length</Text>
                          <Select value={storyLength} onChange={setStoryLength} className="w-full !bg-[#0c0721] !border-white/10 !text-white">
                            <Option value="short">Short (~500 words)</Option>
                            <Option value="medium">Medium (~1000 words)</Option>
                            <Option value="long">Long (~2000+ words)</Option>
                          </Select>
                        </Col>
                      </Row>

                      <Button type="primary" size="large" onClick={handleStoryGenerate} loading={loading} className="neon-button !w-full !h-14">
                        Generate Story
                      </Button>
                    </Space>
                  </Col>

                  <Col xs={24} md={12}>
                    <div className="flex justify-between items-center mb-2">
                      <Text className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Story Book</Text>
                      <Button size="small" icon={<Copy size={12} />} onClick={() => handleCopy(outputText)} className="!bg-white/5 !border-white/10 !text-white">Copy Story</Button>
                    </div>
                    <TextArea 
                      rows={20}
                      value={outputText}
                      readOnly
                      placeholder="Your story will render here..."
                      className="!bg-white/[0.01] !border-white/10 !text-pink-300 !rounded-xl font-mono text-sm leading-relaxed !min-h-[480px]"
                    />
                  </Col>
                </Row>
              </Card>
            )
          },
          {
            key: 'name',
            label: <span className="flex items-center gap-2 text-white font-bold"><Star size={16} /> Name Meaning Finder</span>,
            children: (
              <Card className="glass-card !p-8">
                <Row gutter={[32, 32]}>
                  <Col xs={24} md={12}>
                    <Space direction="vertical" className="w-full" size="large">
                      <div>
                        <Text className="text-gray-400 font-bold block mb-2 uppercase text-[10px] tracking-widest">Enter Your Name</Text>
                        <Input 
                          placeholder="e.g. Sagar" 
                          value={userName} 
                          onChange={e => setUserName(e.target.value)} 
                          className="!bg-white/5 !border-white/10 !text-white !rounded-xl !h-12"
                        />
                      </div>

                      <Button type="primary" size="large" onClick={handleNameMeaning} loading={loading} className="neon-button !w-full !h-14">
                        Find Meaning
                      </Button>
                    </Space>
                  </Col>

                  <Col xs={24} md={12}>
                    <AnimatePresence mode="wait">
                      {nameData ? (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }} 
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="p-6 bg-gradient-to-br from-[#1b103c]/60 to-[#0c0721]/90 border border-[#7000ff]/20 rounded-[2.5rem] space-y-4"
                        >
                          <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                            <div className="w-14 h-14 bg-primary/20 border border-primary/30 rounded-full flex items-center justify-center text-primary text-2xl font-black">
                              {nameData.firstLetter}
                            </div>
                            <div>
                              <Title level={4} className="!text-white !m-0">{nameData.name}</Title>
                              <Tag className="!bg-primary/10 !border-primary/20 !text-primary mt-1">{nameData.personality}</Tag>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <Text className="text-gray-500 text-[10px] uppercase tracking-widest block">Personality Trait</Text>
                              <Text className="text-gray-300 text-sm">{nameData.personalityDesc}</Text>
                            </div>

                            <Row gutter={16}>
                              <Col span={12}>
                                <Text className="text-gray-500 text-[10px] uppercase tracking-widest block">Lucky Number</Text>
                                <Text className="text-white font-black text-xl">{nameData.luckyNumber}</Text>
                              </Col>
                              <Col span={12}>
                                <Text className="text-gray-500 text-[10px] uppercase tracking-widest block">Lucky Color</Text>
                                <Text className="text-white font-black text-xl">{nameData.luckyColor}</Text>
                              </Col>
                            </Row>

                            <div>
                              <Text className="text-gray-500 text-[10px] uppercase tracking-widest block">Compatibility Score</Text>
                              <Text className="text-green-400 font-black text-xl">{nameData.traitScore}%</Text>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-16 text-gray-500 border border-dashed border-white/5 rounded-2xl">
                          <HelpCircle size={40} className="text-gray-700 mb-2 animate-bounce" />
                          <Text className="text-gray-500 text-sm">Enter your name and find personality traits.</Text>
                        </div>
                      )}
                    </AnimatePresence>
                  </Col>
                </Row>
              </Card>
            )
          }
        ]}
      />

      <ToolContent toolKey="ai-suite" />
    </div>
  );
};

export default AiToolsSuite;
