import React, { useState } from 'react';
import { Card, Button, Input, Tabs, Typography, message, Spin, Alert, Select, Segmented } from 'antd';
import { Bot, Code, Eye, Copy, Download, Sparkles, Send, LayoutTemplate, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { websiteTemplates, categoryTemplates } from '../../utils/websiteTemplates';
import { websitePrompts, quickPrompts } from '../../utils/websitePrompts';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const AiWebsiteBuilder = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('saasLanding');
  const [selectedCategory, setSelectedCategory] = useState('Business');
  const [mode, setMode] = useState('template'); // 'template' or 'custom'

  const categories = Object.keys(categoryTemplates);
  const templatesInCategory = categoryTemplates[selectedCategory] || [];
  
  // Get templates for current category
  const getCategoryTemplates = () => {
    return templatesInCategory.map(key => ({
      key,
      name: websiteTemplates[key]?.name || key,
      ...websiteTemplates[key]
    }));
  };

  const selectedTemplateData = websiteTemplates[selectedTemplate] || websiteTemplates.saasLanding;

  const handleGenerate = () => {
    if (mode === 'custom' && !prompt.trim()) {
      message.error("Please describe the website you want to build.");
      return;
    }
    
    setIsGenerating(true);
    setResult(null);
    
    // Simulate AI generation time
    setTimeout(() => {
      setResult(
        mode === 'template' 
          ? selectedTemplateData.html 
          : selectedTemplateData.html // In real app, would generate based on prompt
      );
      setIsGenerating(false);
      message.success("Website generated successfully!");
    }, 3000);
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      message.success("Code copied to clipboard!");
    }
  };

  const handleDownload = () => {
    if (result) {
      const blob = new Blob([result], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'index.html';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleQuickPrompt = (quickPrompt) => {
    setPrompt(quickPrompt);
    setMode('custom');
  };

  return (
    <div className="max-w-7xl mx-auto py-24 px-4 min-h-screen">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6">
          <Bot size={16} className="text-primary" />
          <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">AI Tools</span>
        </div>
        <h1 className="responsive-title !text-white !mb-4 tracking-tighter uppercase">AI Website Builder</h1>
        <Paragraph className="!text-gray-400 text-lg">Choose a template or describe your perfect website</Paragraph>
      </div>

      {/* Mode Selector */}
      <div className="mb-8">
        <Segmented 
          value={mode} 
          onChange={setMode}
          options={[
            { label: <span className="px-4">📋 Use Template</span>, value: 'template' },
            { label: <span className="px-4">✨ Custom Design</span>, value: 'custom' }
          ]}
          className="bg-white/5 border-white/10"
          style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '4px' }}
        />
      </div>

      {/* Template Mode */}
      {mode === 'template' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Card className="glass-card !p-8 border-none">
            <div className="mb-6">
              <Text className="text-white font-bold text-lg block mb-4">📁 Select Category</Text>
              <Select
                value={selectedCategory}
                onChange={setSelectedCategory}
                className="w-full"
                options={categories.map(cat => ({ label: cat, value: cat }))}
                style={{ height: '44px' }}
              />
            </div>

            <div className="mb-6">
              <Text className="text-white font-bold text-lg block mb-4">🎨 Choose Template</Text>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getCategoryTemplates().map((template) => (
                  <motion.div
                    key={template.key}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedTemplate(template.key)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedTemplate === template.key
                        ? 'border-cyan-400 bg-cyan-400/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="text-xl font-bold text-white mb-2">{template.name}</div>
                    <div className="text-xs text-gray-400">{template.category}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Template Preview */}
            <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-lg">
              <Text className="text-white font-bold block mb-2">✨ Preview</Text>
              <Text className="text-gray-400 text-sm">{selectedTemplateData.name} - {selectedTemplateData.category}</Text>
            </div>

            <Button 
              type="primary" 
              size="large" 
              block 
              className="neon-button !h-14 !text-lg !font-bold flex items-center justify-center gap-2"
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? <><Spin size="small"/> Generating HTML/CSS...</> : <><Send size={20}/> Generate Website</>}
            </Button>
          </Card>
        </motion.div>
      )}

      {/* Custom Mode */}
      {mode === 'custom' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Card className="glass-card !p-8 mb-8 border-none">
            <div className="mb-4 flex items-center justify-between">
              <Text className="text-white font-bold flex items-center gap-2"><Sparkles size={18} className="text-primary"/> Describe Your Website</Text>
              <Text className="text-gray-500 text-xs">Be as descriptive as possible</Text>
            </div>
            <TextArea
              rows={5}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Build a modern landing page for an organic coffee shop. It should have a dark brown theme, a navigation bar, a hero section with a 'Order Now' button, and a 3-column features section..."
              className="bg-white/5 border-white/10 text-white placeholder-gray-600 mb-6 focus:border-primary/50 text-lg p-4 rounded-xl resize-none"
            />
            <Button 
              type="primary" 
              size="large" 
              block 
              className="neon-button !h-14 mt-5 !text-lg !font-bold flex items-center justify-center gap-2"
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? <><Spin size="small"/> Generating HTML/CSS...</> : <><Send size={20}/> Generate Website</>}
            </Button>
          </Card>

          {/* Quick Prompts */}
          <Card className="glass-card !p-6 border-none">
            <Text className="text-white font-bold block mb-4 flex items-center gap-2"><ChevronRight size={16}/> Quick Prompts</Text>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {quickPrompts.slice(0, 12).map((quickPrompt, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleQuickPrompt(quickPrompt)}
                  className="text-left px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-300 text-sm transition-all"
                >
                  {quickPrompt}
                </motion.button>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Results Section */}
      {isGenerating && (
        <div className="text-center py-20">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
            <Bot size={48} className="text-primary animate-bounce relative z-10" />
          </div>
          <Title level={4} className="!text-white">AI is writing code...</Title>
          <Text className="text-gray-400">Crafting your perfect website with HTML and CSS.</Text>
        </div>
      )}

      {result && !isGenerating && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="glass-card !p-0 overflow-hidden border-none shadow-[0_0_50px_rgba(0,242,255,0.1)]">
            <div className="flex items-center justify-between p-4 bg-white/5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <LayoutTemplate size={20} className="text-primary" />
                <Text className="text-white font-bold">Generation Complete</Text>
              </div>
              <div className="flex gap-2">
                <Button type="text" className="text-gray-400 hover:text-white flex items-center gap-2" onClick={handleCopy}>
                  <Copy size={16}/> Copy Code
                </Button>
                <Button type="primary" className="bg-primary/20 text-primary border-primary/30 hover:bg-primary hover:text-black flex items-center gap-2" onClick={handleDownload}>
                  <Download size={16}/> Download .html
                </Button>
              </div>
            </div>

            <Tabs 
              defaultActiveKey="preview" 
              centered
              className="ai-tabs"
              items={[
                {
                  key: 'preview',
                  label: <span className="flex items-center gap-2"><Eye size={16}/> Preview</span>,
                  children: (
                    <div className="p-4 bg-white w-full overflow-hidden" style={{ height: '500px' }}>
                      <iframe 
                        srcDoc={result} 
                        title="Website Preview" 
                        className="w-full h-full border-0 rounded-lg shadow-inner bg-white"
                      />
                    </div>
                  )
                },
                {
                  key: 'code',
                  label: <span className="flex items-center gap-2"><Code size={16}/> Source Code</span>,
                  children: (
                    <div className="p-0 bg-[#0d1117] relative">
                      <pre className="p-6 text-sm text-gray-300 font-mono overflow-auto m-0" style={{ height: '500px' }}>
                        <code>{result}</code>
                      </pre>
                    </div>
                  )
                }
              ]}
            />
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default AiWebsiteBuilder;
