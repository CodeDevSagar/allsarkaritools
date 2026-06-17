import React, { useState } from 'react';
import { Typography, Card, Space, Input, Button, Row, Col, message } from 'antd';
import { Mail, MessageSquare, Send, MapPin, Globe } from 'lucide-react';
import AdSlot from '../../components/AdSlot';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!name.trim()) return message.error('Please enter your name');
    if (!email.trim() || !email.includes('@')) return message.error('Please enter a valid email address');
    if (!msg.trim()) return message.error('Please enter your message');

    setLoading(true);
    message.loading({ content: 'Sending message...', key: 'send_msg' });

    setTimeout(() => {
      setLoading(false);
      message.success({ content: 'Message sent successfully! We will get back to you soon.', key: 'send_msg' });
      setName('');
      setEmail('');
      setMsg('');
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto py-24 px-4 min-h-screen">
      <div className="text-center mb-16">
        <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <MessageSquare size={40} className="text-accent" />
        </div>
        <h1 className="responsive-title !text-white !mb-4 tracking-tighter uppercase">Get In Touch</h1>
        <Paragraph className="!text-gray-400 text-lg">We'd love to hear from you. Feedback and suggestions are welcome.</Paragraph>
      </div>

      <Row gutter={[32, 32]}>
        <Col xs={24} lg={10}>
          <Card className="glass-card !p-8 border-none h-full">
            <Title level={3} className="!text-white !mb-8">Contact Info</Title>
            <Space direction="vertical" size="xl" className="w-full">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center">
                  <Mail className="text-primary" size={24} />
                </div>
                <div>
                  <Text className="text-gray-500 uppercase font-black text-[10px] tracking-widest block mb-1">Email Us</Text>
                  <Text className="text-white font-bold text-lg">sagarmandal358@gmail.com</Text>
                </div>
              </div>

              <div className="flex items-center mt-5 gap-6">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center">
                  <Globe className="text-secondary" size={24} />
                </div>
                <div>
                  <Text className="text-gray-500 uppercase font-black text-[10px]  tracking-widest block mb-1">Our Platform</Text>
                  <Text className="text-white font-bold text-lg">codeeducationhub.com</Text>
                </div>
              </div>

              <div className="flex items-center mt-5 gap-6">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center">
                  <MapPin className="text-accent" size={24} />
                </div>
                <div>
                  <Text className="text-gray-500 uppercase font-black text-[10px] tracking-widest block mb-1">Location</Text>
                  <Text className="text-white font-bold text-lg">Bihar, India</Text>
                </div>
              </div>
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={14}>
          <Card className="glass-card !p-8 border-none">
            <Title level={3} className="!text-white !mb-8">Send a Message</Title>
            <Space direction="vertical" size="large" className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Text className="text-gray-500 uppercase font-black text-[10px] tracking-widest block mb-2">Name</Text>
                  <Input 
                    size="large" 
                    className="!bg-white/5 !border-white/10 !text-white !h-14 !rounded-xl" 
                    placeholder="Your Name" 
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>
                <div>
                  <Text className="text-gray-500 uppercase font-black text-[10px] tracking-widest block mb-2">Email</Text>
                  <Input 
                    size="large" 
                    className="!bg-white/5 !border-white/10 !text-white !h-14 !rounded-xl" 
                    placeholder="Email Address" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Text className="text-gray-500 uppercase font-black text-[10px] tracking-widest block mb-2">Message</Text>
                <TextArea 
                  rows={6} 
                  className="!bg-white/5 !border-white/10 !text-white !rounded-xl" 
                  placeholder="How can we help?" 
                  value={msg}
                  onChange={e => setMsg(e.target.value)}
                />
              </div>
              <Button 
                type="primary" 
                block 
                size="large" 
                className="neon-button !h-16 !text-lg" 
                icon={<Send size={18} />}
                onClick={handleSubmit}
                loading={loading}
              >
                Send Message Now
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>

      <AdSlot slot="1122334455" />
    </div>
  );
};

export default ContactUs;
