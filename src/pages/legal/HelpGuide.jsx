import React from 'react';
import { Typography, Card, Space, Collapse, Tag } from 'antd';
import { HelpCircle, BookOpen, Check, HelpCircle as QuestionIcon } from 'lucide-react';

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

const HelpGuide = () => {
  const faqs = [
    { 
      q: "How to resize my photo for UPSC/SSC?", 
      a: "Go to Image Resizer, upload your photo, and select the 'UPSC' or 'SSC' preset. The tool will automatically adjust the quality to keep it under 50KB or 20KB as required." 
    },
    { 
      q: "Is it safe to draw my signature here?", 
      a: "Yes. Our Signature Maker is 100% client-side. The drawing data never leaves your browser window. Once you download the PNG, the data is wiped from your memory." 
    },
    { 
      q: "The PDF Merger says my file is encrypted. What to do?", 
      a: "We have updated our tool to support encrypted files. You can now merge them directly. If it still fails, ensure the file isn't password protected for opening." 
    },
    { 
      q: "How to get a NEET Post Card size photo?", 
      a: "Use the Passport Photo Studio, select 'NEET Post Card' from the format list, and it will generate the perfect 4x6 inch layout for you." 
    },
  ];

  return (
    <div className="max-w-5xl mx-auto py-24 px-4 min-h-screen">
      <div className="text-center mb-16">
        <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <BookOpen size={40} className="text-primary" />
        </div>
        <h1 className="responsive-title !text-white !mb-4 tracking-tighter uppercase">Help & Guide</h1>
        <Paragraph className="!text-gray-400 text-lg">Master the Sarkari Tools platform with these quick tips.</Paragraph>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <Card className="glass-card !p-8 border-none bg-primary/5">
          <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6">
            <Check className="text-primary" size={24} />
          </div>
          <Title level={4} className="!text-white !mb-4">Pro Tip: Local Saving</Title>
          <Paragraph className="!text-gray-400">
            Always download your results immediately. Since we don't store your data on our server, your work will be lost if you refresh the page without downloading.
          </Paragraph>
        </Card>

        <Card className="glass-card !p-8 border-none bg-secondary/5">
          <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mb-6">
            <QuestionIcon className="text-secondary" size={24} />
          </div>
          <Title level={4} className="!text-white !mb-4">Need More Help?</Title>
          <Paragraph className="!text-gray-400">
            If you encounter any issues with specific government portals, check our 'Govt Form Helper' for direct official links and contact info.
          </Paragraph>
        </Card>
      </div>

      <Title level={2} className="!text-white !mb-8 !font-black uppercase tracking-widest text-center">Frequently Asked Questions</Title>
      
      <Collapse 
        ghost 
        accordion 
        expandIcon={({ isActive }) => <HelpCircle className={`transition-all ${isActive ? 'text-primary rotate-180' : 'text-gray-600'}`} size={20} />}
        className="help-collapse"
      >
        {faqs.map((faq, i) => (
          <Panel 
            header={<span className="text-white font-bold text-lg">{faq.q}</span>} 
            key={i}
            className="mb-4 bg-white/2 border border-white/5 rounded-2xl overflow-hidden"
          >
            <Paragraph className="!text-gray-500 text-base pl-8 pb-4">
              {faq.a}
            </Paragraph>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default HelpGuide;
