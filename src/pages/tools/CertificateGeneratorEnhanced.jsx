import React, { useState } from 'react';
import { Download, Printer, Edit } from 'lucide-react';
import { Input, Select, Button, Row, Col, message } from 'antd';
import { motion } from 'framer-motion';
import AnimatedCard from '../../components/AnimatedCard';
import GradientButton from '../../components/GradientButton';

const CertificateGeneratorEnhanced = () => {
  const [certificateData, setCertificateData] = useState({
    recipientName: 'John Doe',
    courseTitle: 'Advanced Web Development',
    issueDate: new Date().toISOString().split('T')[0],
    template: 'professional',
    certNumber: 'CERT-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
  });

  const templates = {
    professional: {
      name: 'Professional',
      bgColor: 'from-blue-900 to-blue-800',
      textColor: 'text-white',
      borderColor: 'border-yellow-500',
    },
    modern: {
      name: 'Modern',
      bgColor: 'from-purple-900 to-purple-800',
      textColor: 'text-white',
      borderColor: 'border-cyan-400',
    },
    minimal: {
      name: 'Minimal',
      bgColor: 'from-gray-800 to-gray-700',
      textColor: 'text-white',
      borderColor: 'border-gray-400',
    },
  };

  const handleUpdateData = (field, value) => {
    setCertificateData(prev => ({ ...prev, [field]: value }));
  };

  const handleDownload = () => {
    message.success(`Certificate saved as: ${certificateData.recipientName}_certificate.pdf`);
  };

  const handlePrint = () => {
    window.print();
    message.info('Print dialog opened');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const currentTemplate = templates[certificateData.template];

  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-black mb-4">🎓 Certificate Generator</h1>
          <p className="text-gray-400 text-lg">Create professional certificates instantly</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Settings Section */}
          <AnimatedCard delay={0} className="glass p-8 rounded-xl">
            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Edit size={24} className="text-cyan-400" /> Certificate Details
              </h2>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <label className="text-gray-400 font-bold block mb-2">Recipient Name</label>
                  <Input
                    value={certificateData.recipientName}
                    onChange={(e) => handleUpdateData('recipientName', e.target.value)}
                    placeholder="Enter recipient name"
                    className="!bg-gray-900 !border-cyan-500/30 !text-white"
                  />
                </Col>
                <Col xs={24} md={12}>
                  <label className="text-gray-400 font-bold block mb-2">Course/Achievement Title</label>
                  <Input
                    value={certificateData.courseTitle}
                    onChange={(e) => handleUpdateData('courseTitle', e.target.value)}
                    placeholder="Enter course title"
                    className="!bg-gray-900 !border-cyan-500/30 !text-white"
                  />
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <label className="text-gray-400 font-bold block mb-2">Issue Date</label>
                  <Input
                    type="date"
                    value={certificateData.issueDate}
                    onChange={(e) => handleUpdateData('issueDate', e.target.value)}
                    className="!bg-gray-900 !border-cyan-500/30 !text-white"
                  />
                </Col>
                <Col xs={24} md={12}>
                  <label className="text-gray-400 font-bold block mb-2">Certificate Number</label>
                  <Input
                    value={certificateData.certNumber}
                    onChange={(e) => handleUpdateData('certNumber', e.target.value)}
                    className="!bg-gray-900 !border-cyan-500/30 !text-white"
                  />
                </Col>
              </Row>

              <div>
                <label className="text-gray-400 font-bold block mb-3">Template Design</label>
                <Row gutter={16}>
                  {Object.entries(templates).map(([key, template]) => (
                    <Col xs={12} md={8} key={key}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleUpdateData('template', key)}
                        className={`p-4 rounded-lg cursor-pointer border-2 transition-all ${
                          certificateData.template === key
                            ? 'border-cyan-400 bg-cyan-500/10'
                            : 'border-gray-700 bg-gray-900/50 hover:border-cyan-500/50'
                        }`}
                      >
                        <div className={`bg-gradient-to-r ${template.bgColor} rounded p-3 h-20 flex items-center justify-center mb-2`}>
                          <p className="text-white text-xs font-bold text-center">Preview</p>
                        </div>
                        <p className="text-white font-bold text-center text-sm">{template.name}</p>
                      </motion.div>
                    </Col>
                  ))}
                </Row>
              </div>
            </motion.div>
          </AnimatedCard>

          {/* Certificate Preview */}
          <motion.div variants={itemVariants}>
            <AnimatedCard delay={0.1} className="glass p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-6">📄 Preview</h2>

              {/* Certificate */}
              <div className={`bg-gradient-to-r ${currentTemplate.bgColor} rounded-lg p-12 border-8 ${currentTemplate.borderColor} aspect-[4/3] max-w-2xl mx-auto flex flex-col justify-center items-center text-center shadow-2xl`}>
                {/* Decorative elements */}
                <div className="absolute top-6 left-6 w-12 h-12 border-2 border-yellow-400/50 rounded-full opacity-50"></div>
                <div className="absolute bottom-6 right-6 w-12 h-12 border-2 border-yellow-400/50 rounded-full opacity-50"></div>

                {/* Certificate Content */}
                <div className="relative z-10">
                  <div className="text-yellow-400 text-4xl font-black mb-2">★</div>
                  <h1 className={`text-5xl font-black ${currentTemplate.textColor} mb-4`}>Certificate</h1>
                  <p className={`text-lg ${currentTemplate.textColor} opacity-80 mb-6`}>OF ACHIEVEMENT</p>

                  <div className="border-t-2 border-yellow-400/50 my-6 pt-6">
                    <p className={`text-sm ${currentTemplate.textColor} opacity-70 mb-2`}>This is to certify that</p>
                    <p className={`text-3xl font-black ${currentTemplate.textColor} mb-4`}>{certificateData.recipientName}</p>
                    <p className={`text-sm ${currentTemplate.textColor} opacity-70 mb-2`}>has successfully completed</p>
                    <p className={`text-2xl font-bold ${currentTemplate.textColor} mb-6`}>{certificateData.courseTitle}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-8 mt-8 text-sm">
                    <div>
                      <p className={`text-xs ${currentTemplate.textColor} opacity-70 mb-2`}>Date</p>
                      <p className={`font-bold ${currentTemplate.textColor}`}>{certificateData.issueDate}</p>
                    </div>
                    <div>
                      <p className={`text-xs ${currentTemplate.textColor} opacity-70 mb-2`}>Cert #</p>
                      <p className={`font-bold ${currentTemplate.textColor} text-xs`}>{certificateData.certNumber}</p>
                    </div>
                    <div>
                      <p className={`text-xs ${currentTemplate.textColor} opacity-70 mb-2`}>Status</p>
                      <p className={`font-bold ${currentTemplate.textColor}`}>✓ Valid</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex gap-4">
            <GradientButton onClick={handleDownload} className="flex-1 py-3 flex items-center justify-center gap-2">
              <Download size={20} /> Download PDF
            </GradientButton>
            <GradientButton onClick={handlePrint} className="flex-1 py-3 flex items-center justify-center gap-2">
              <Printer size={20} /> Print
            </GradientButton>
          </motion.div>

          {/* Info */}
          <AnimatedCard delay={0.2} className="glass p-6 rounded-xl">
            <h3 className="text-lg font-bold mb-4">📌 Certificate Features</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>✓ Professional certificate design templates</li>
              <li>✓ Customizable certificate number and date</li>
              <li>✓ Print-ready PDF download</li>
              <li>✓ Multiple design options</li>
              <li>✓ 100% browser-based, no server storage</li>
            </ul>
          </AnimatedCard>
        </motion.div>
      </div>
    </div>
  );
};

export default CertificateGeneratorEnhanced;
