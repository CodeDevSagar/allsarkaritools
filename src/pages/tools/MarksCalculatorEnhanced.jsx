import React, { useState } from 'react';
import { Plus, Trash2, TrendingUp } from 'lucide-react';
import { Input, Button, Row, Col } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedCard from '../../components/AnimatedCard';
import GradientButton from '../../components/GradientButton';

const MarksCalculatorEnhanced = () => {
  const [subjects, setSubjects] = useState([
    { id: 1, name: 'English', marks: 0, total: 100 },
    { id: 2, name: 'Mathematics', marks: 0, total: 100 },
  ]);

  const [nextId, setNextId] = useState(3);

  const addSubject = () => {
    setSubjects([...subjects, { id: nextId, name: '', marks: 0, total: 100 }]);
    setNextId(nextId + 1);
  };

  const removeSubject = (id) => {
    setSubjects(subjects.filter(s => s.id !== id));
  };

  const updateSubject = (id, field, value) => {
    setSubjects(subjects.map(s =>
      s.id === id ? { ...s, [field]: field === 'name' ? value : Number(value) } : s
    ));
  };

  const totalMarks = subjects.reduce((sum, s) => sum + s.marks, 0);
  const totalPossible = subjects.reduce((sum, s) => sum + s.total, 0);
  const percentage = totalPossible > 0 ? ((totalMarks / totalPossible) * 100).toFixed(2) : 0;
  const average = subjects.length > 0 ? (totalMarks / subjects.length).toFixed(2) : 0;

  const getGrade = (percent) => {
    if (percent >= 90) return { grade: 'A+', color: 'text-green-400' };
    if (percent >= 80) return { grade: 'A', color: 'text-green-400' };
    if (percent >= 70) return { grade: 'B', color: 'text-blue-400' };
    if (percent >= 60) return { grade: 'C', color: 'text-yellow-400' };
    if (percent >= 40) return { grade: 'D', color: 'text-orange-400' };
    return { grade: 'F', color: 'text-red-400' };
  };

  const { grade, color } = getGrade(percentage);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-black mb-4">📈 Marks Calculator</h1>
          <p className="text-gray-400 text-lg">Calculate percentage, average, and grade</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Stats Section */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <AnimatedCard className="glass p-6 rounded-xl text-center">
              <p className="text-gray-400 text-sm mb-2">Total Marks</p>
              <p className="text-3xl font-black text-cyan-400">{totalMarks}</p>
            </AnimatedCard>

            <AnimatedCard className="glass p-6 rounded-xl text-center">
              <p className="text-gray-400 text-sm mb-2">Out of</p>
              <p className="text-3xl font-black text-blue-400">{totalPossible}</p>
            </AnimatedCard>

            <AnimatedCard className="glass p-6 rounded-xl text-center">
              <p className="text-gray-400 text-sm mb-2">Percentage</p>
              <p className="text-3xl font-black text-purple-400">{percentage}%</p>
            </AnimatedCard>

            <AnimatedCard className={`glass p-6 rounded-xl text-center border border-green-500/30 bg-green-500/10`}>
              <p className="text-gray-400 text-sm mb-2">Grade</p>
              <p className={`text-3xl font-black ${color}`}>{grade}</p>
            </AnimatedCard>
          </motion.div>

          {/* Input Section */}
          <AnimatedCard delay={0.1} className="glass p-8 rounded-xl">
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp size={24} className="text-purple-400" />
                <h2 className="text-2xl font-bold">Add Subjects</h2>
              </div>

              <AnimatePresence>
                {subjects.map((subject, idx) => (
                  <motion.div
                    key={subject.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="p-4 bg-gray-900/50 rounded-lg border border-gray-700/50"
                  >
                    <Row gutter={16} className="mb-3">
                      <Col span={10}>
                        <Input
                          placeholder="Subject Name"
                          value={subject.name}
                          onChange={(e) => updateSubject(subject.id, 'name', e.target.value)}
                          className="!bg-gray-900 !border-cyan-500/30 !text-white"
                        />
                      </Col>
                      <Col span={7}>
                        <Input
                          type="number"
                          placeholder="Marks"
                          value={subject.marks}
                          onChange={(e) => updateSubject(subject.id, 'marks', e.target.value)}
                          className="!bg-gray-900 !border-cyan-500/30 !text-white"
                        />
                      </Col>
                      <Col span={7}>
                        <Input
                          type="number"
                          placeholder="Total"
                          value={subject.total}
                          onChange={(e) => updateSubject(subject.id, 'total', e.target.value)}
                          className="!bg-gray-900 !border-cyan-500/30 !text-white"
                        />
                      </Col>
                    </Row>
                    <div className="flex justify-between items-center">
                      <span className="text-cyan-400 font-bold">
                        {((subject.marks / subject.total) * 100).toFixed(1)}%
                      </span>
                      <Button
                        danger
                        size="small"
                        icon={<Trash2 size={16} />}
                        onClick={() => removeSubject(subject.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <GradientButton onClick={addSubject} className="w-full mt-4">
                <Plus size={18} className="inline mr-2" /> Add Subject
              </GradientButton>
            </motion.div>
          </AnimatedCard>

          {/* Analysis Section */}
          <AnimatedCard delay={0.2} className="glass p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-6">📊 Analysis</h2>
            <div className="space-y-4">
              <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/30">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Average Marks per Subject</span>
                  <span className="text-cyan-400 font-black text-xl">{average}</span>
                </div>
              </div>
              <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Number of Subjects</span>
                  <span className="text-purple-400 font-black text-xl">{subjects.length}</span>
                </div>
              </div>
              <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Overall Percentage</span>
                  <span className="text-green-400 font-black text-xl">{percentage}%</span>
                </div>
              </div>
            </div>
          </AnimatedCard>
        </motion.div>
      </div>
    </div>
  );
};

export default MarksCalculatorEnhanced;
