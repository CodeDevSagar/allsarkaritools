import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Form, Input, Button, Tabs, Space, message, Modal, Segmented } from 'antd';
import { Download, Eye, Plus, Trash2, Copy, RefreshCw } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';
import GradientButton from '../components/GradientButton';
import AnimatedCard from '../components/AnimatedCard';

const ResumeBuilder = () => {
  const [form] = Form.useForm();
  const [template, setTemplate] = useState('modern');
  const [sections, setSections] = useState({
    personal: {
      fullName: 'Sagar Kumar',
      email: 'sagarmandal358@gmail.com',
      phone: '+91 9304480813',
      location: 'Bhagalpur, Bihar, India',
      summary: 'Highly motivated professional with strong technical skills...'
    },
    experience: [
      {
        id: 1,
        position: 'Senior Developer',
        company: 'Tech Company',
        duration: 'Jan 2022 - Present',
        description: 'Led development of key features, mentored team members'
      }
    ],
    education: [
      {
        id: 1,
        degree: 'Bachelor of Technology',
        institution: 'Your University',
        year: '2020',
        grade: '8.5 CGPA'
      }
    ],
    skills: [
      { id: 1, category: 'Languages', items: 'JavaScript, Python, Java, C++' },
      { id: 2, category: 'Frameworks', items: 'React, Node.js, Django, Spring' }
    ],
    projects: [
      {
        id: 1,
        title: 'Project Name',
        description: 'Brief description of the project',
        technologies: 'React, Node.js, MongoDB'
      }
    ],
    certifications: [
      { id: 1, name: 'AWS Solutions Architect', issuer: 'Amazon' }
    ]
  });

  const [preview, setPreview] = useState(false);
  const resumeRef = useRef();

  // Add new entry functions
  const addExperience = () => {
    setSections({
      ...sections,
      experience: [
        ...sections.experience,
        { id: Date.now(), position: '', company: '', duration: '', description: '' }
      ]
    });
  };

  const addEducation = () => {
    setSections({
      ...sections,
      education: [
        ...sections.education,
        { id: Date.now(), degree: '', institution: '', year: '', grade: '' }
      ]
    });
  };

  const addSkill = () => {
    setSections({
      ...sections,
      skills: [...sections.skills, { id: Date.now(), category: '', items: '' }]
    });
  };

  const addProject = () => {
    setSections({
      ...sections,
      projects: [
        ...sections.projects,
        { id: Date.now(), title: '', description: '', technologies: '' }
      ]
    });
  };

  const addCertification = () => {
    setSections({
      ...sections,
      certifications: [...sections.certifications, { id: Date.now(), name: '', issuer: '' }]
    });
  };

  // Remove functions
  const removeExperience = (id) => {
    setSections({
      ...sections,
      experience: sections.experience.filter(e => e.id !== id)
    });
  };

  const removeEducation = (id) => {
    setSections({
      ...sections,
      education: sections.education.filter(e => e.id !== id)
    });
  };

  const removeSkill = (id) => {
    setSections({
      ...sections,
      skills: sections.skills.filter(s => s.id !== id)
    });
  };

  const removeProject = (id) => {
    setSections({
      ...sections,
      projects: sections.projects.filter(p => p.id !== id)
    });
  };

  const removeCertification = (id) => {
    setSections({
      ...sections,
      certifications: sections.certifications.filter(c => c.id !== id)
    });
  };

  // Update functions
  const updatePersonal = (field, value) => {
    setSections({
      ...sections,
      personal: { ...sections.personal, [field]: value }
    });
  };

  const updateExperience = (id, field, value) => {
    setSections({
      ...sections,
      experience: sections.experience.map(e => e.id === id ? { ...e, [field]: value } : e)
    });
  };

  const updateEducation = (id, field, value) => {
    setSections({
      ...sections,
      education: sections.education.map(e => e.id === id ? { ...e, [field]: value } : e)
    });
  };

  const updateSkill = (id, field, value) => {
    setSections({
      ...sections,
      skills: sections.skills.map(s => s.id === id ? { ...s, [field]: value } : s)
    });
  };

  const updateProject = (id, field, value) => {
    setSections({
      ...sections,
      projects: sections.projects.map(p => p.id === id ? { ...p, [field]: value } : p)
    });
  };

  const updateCertification = (id, field, value) => {
    setSections({
      ...sections,
      certifications: sections.certifications.map(c => c.id === id ? { ...c, [field]: value } : c)
    });
  };

  // Download PDF
  const downloadPDF = async () => {
    try {
      const element = resumeRef.current;
      if (!element) {
        message.error('Resume element not found');
        return;
      }
      
      message.loading({ content: 'Generating PDF...', key: 'pdf_gen' });
      
      // Use scale for high definition print resolution
      const canvas = await html2canvas(element, { 
        scale: 2, 
        useCORS: true, 
        backgroundColor: '#ffffff',
        windowWidth: 794,
        windowHeight: 1123
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate aspect ratio
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * pageWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${sections.personal.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
      message.success({ content: 'Resume downloaded successfully!', key: 'pdf_gen' });
    } catch (error) {
      console.error(error);
      message.error({ content: 'Failed to download resume', key: 'pdf_gen' });
    }
  };

  // Resume Templates
  const ModernTemplate = () => (
    <div className="bg-white text-black p-8 text-left w-full">
      {/* Header */}
      <div className="text-center mb-6 border-b-2 border-gray-300 pb-4">
        <h1 className="text-3xl font-bold text-blue-600 mb-1">{sections.personal.fullName}</h1>
        <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-600 mt-2">
          <span>📧 {sections.personal.email}</span>
          <span>📱 {sections.personal.phone}</span>
          <span>📍 {sections.personal.location}</span>
        </div>
      </div>

      {/* Summary */}
      {sections.personal.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 border-b border-gray-200 pb-1 mb-2">Professional Summary</h2>
          <p className="text-xs text-gray-700 leading-relaxed">{sections.personal.summary}</p>
        </div>
      )}

      {/* Experience */}
      {sections.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 border-b border-gray-200 pb-1 mb-3">Experience</h2>
          {sections.experience.map(exp => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start text-xs">
                <div>
                  <h3 className="font-bold text-gray-800">{exp.position}</h3>
                  <p className="text-gray-600 font-medium">{exp.company}</p>
                </div>
                <span className="text-gray-500 font-semibold">{exp.duration}</span>
              </div>
              <p className="text-xs text-gray-700 mt-1 leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {sections.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 border-b border-gray-200 pb-1 mb-3">Education</h2>
          {sections.education.map(edu => (
            <div key={edu.id} className="mb-3 text-xs">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.institution}</p>
                </div>
                <div className="text-right text-gray-600">
                  <p className="font-semibold">{edu.year}</p>
                  <p className="text-blue-600 font-bold">{edu.grade}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {sections.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 border-b border-gray-200 pb-1 mb-3">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-700">
            {sections.skills.map(skill => (
              <div key={skill.id} className="mb-1">
                <strong className="text-gray-800">{skill.category}:</strong> {skill.items}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {sections.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 border-b border-gray-200 pb-1 mb-3">Projects</h2>
          {sections.projects.map(project => (
            <div key={project.id} className="mb-4 text-xs">
              <h3 className="font-bold text-gray-800">{project.title}</h3>
              <p className="text-gray-700 leading-relaxed mt-1">{project.description}</p>
              <p className="text-xs text-blue-600 font-semibold mt-1">Technologies: {project.technologies}</p>
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {sections.certifications.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-blue-600 border-b border-gray-200 pb-1 mb-3">Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-700">
            {sections.certifications.map(cert => (
              <div key={cert.id} className="mb-1">
                <strong className="text-gray-800">{cert.name}</strong> - {cert.issuer}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const MinimalistTemplate = () => (
    <div className="bg-white text-black p-8 text-left w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-black mb-1 tracking-tight text-gray-900">{sections.personal.fullName}</h1>
        <div className="flex flex-wrap gap-4 text-xs text-gray-600 font-medium">
          <span>{sections.personal.email}</span>
          <span>{sections.personal.phone}</span>
          <span>{sections.personal.location}</span>
        </div>
      </div>

      {sections.personal.summary && (
        <div className="mb-6 border-t pt-4">
          <p className="text-xs text-gray-700 leading-relaxed">{sections.personal.summary}</p>
        </div>
      )}

      {sections.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold mb-3 tracking-widest uppercase border-b pb-1 text-gray-900">EXPERIENCE</h2>
          {sections.experience.map(exp => (
            <div key={exp.id} className="mb-4 text-xs">
              <p className="font-bold text-gray-800">{exp.position} • {exp.company}</p>
              <p className="text-gray-500 font-semibold mb-1">{exp.duration}</p>
              <p className="text-gray-700 leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {sections.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold mb-3 tracking-widest uppercase border-b pb-1 text-gray-900">EDUCATION</h2>
          {sections.education.map(edu => (
            <div key={edu.id} className="mb-3 text-xs">
              <p className="font-bold text-gray-800">{edu.degree}</p>
              <p className="text-gray-600">{edu.institution} • {edu.year} ({edu.grade})</p>
            </div>
          ))}
        </div>
      )}

      {sections.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold mb-3 tracking-widest uppercase border-b pb-1 text-gray-900">SKILLS</h2>
          <div className="space-y-1 text-xs text-gray-700">
            {sections.skills.map(skill => (
              <p key={skill.id}><strong>{skill.category}:</strong> {skill.items}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const ProfessionalTemplate = () => (
    <div className="bg-white text-black p-8 text-left w-full flex gap-6">
      {/* Sidebar (Left Column) */}
      <div className="w-1/3 border-r pr-6 flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-black text-[#1e3a8a]">{sections.personal.fullName}</h1>
          <p className="text-[10px] text-gray-500 font-semibold mt-1">Applicant</p>
        </div>
        <div className="text-[11px] text-gray-600 space-y-2">
          <h4 className="font-bold text-[#1e3a8a] uppercase text-xs">Contact Info</h4>
          <p className="break-all">📧 {sections.personal.email}</p>
          <p>📱 {sections.personal.phone}</p>
          <p>📍 {sections.personal.location}</p>
        </div>
        {sections.skills.length > 0 && (
          <div className="text-[11px] text-gray-600 space-y-2">
            <h4 className="font-bold text-[#1e3a8a] uppercase text-xs">Skills</h4>
            {sections.skills.map(skill => (
              <div key={skill.id} className="mb-2">
                <p className="font-bold text-gray-700">{skill.category}</p>
                <p className="text-gray-500 text-[10px]">{skill.items}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Body (Right Column) */}
      <div className="w-2/3 space-y-6">
        {sections.personal.summary && (
          <div>
            <h3 className="font-bold text-sm text-[#1e3a8a] border-b-2 border-[#1e3a8a] pb-1 mb-2">SUMMARY</h3>
            <p className="text-xs text-gray-700 leading-relaxed">{sections.personal.summary}</p>
          </div>
        )}
        {sections.experience.length > 0 && (
          <div>
            <h3 className="font-bold text-sm text-[#1e3a8a] border-b-2 border-[#1e3a8a] pb-1 mb-3">EXPERIENCE</h3>
            {sections.experience.map(exp => (
              <div key={exp.id} className="mb-4 text-xs">
                <div className="flex justify-between font-bold text-gray-800">
                  <span>{exp.position}</span>
                  <span className="text-[#1e3a8a]">{exp.duration}</span>
                </div>
                <p className="text-gray-500 italic mb-1">{exp.company}</p>
                <p className="text-gray-700 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        )}
        {sections.education.length > 0 && (
          <div>
            <h3 className="font-bold text-sm text-[#1e3a8a] border-b-2 border-[#1e3a8a] pb-1 mb-3">EDUCATION</h3>
            {sections.education.map(edu => (
              <div key={edu.id} className="mb-3 text-xs">
                <div className="flex justify-between font-bold">
                  <span>{edu.degree}</span>
                  <span className="text-[#1e3a8a]">{edu.year}</span>
                </div>
                <p className="text-gray-600">{edu.institution} • {edu.grade}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const CreativeTemplate = () => (
    <div className="bg-white text-black w-full text-left">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-500 p-8 text-white">
        <h1 className="text-3xl font-black tracking-tight">{sections.personal.fullName}</h1>
        <div className="flex flex-wrap gap-4 text-xs mt-2 opacity-90 font-medium">
          <span>📧 {sections.personal.email}</span>
          <span>📱 {sections.personal.phone}</span>
          <span>📍 {sections.personal.location}</span>
        </div>
      </div>

      <div className="p-8 grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          {sections.personal.summary && (
            <div>
              <h2 className="text-base font-bold text-teal-600 border-b pb-1 mb-2">ABOUT ME</h2>
              <p className="text-xs text-gray-700 leading-relaxed">{sections.personal.summary}</p>
            </div>
          )}
          {sections.experience.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-teal-600 border-b pb-1 mb-3">WORK HISTORY</h2>
              {sections.experience.map(exp => (
                <div key={exp.id} className="mb-4 text-xs">
                  <h3 className="font-bold text-gray-800">{exp.position} <span className="text-teal-600">@ {exp.company}</span></h3>
                  <p className="text-gray-500 font-semibold mb-1">{exp.duration}</p>
                  <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="col-span-1 space-y-6">
          {sections.skills.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-teal-600 border-b pb-1 mb-2">EXPERTISE</h2>
              <div className="space-y-2 text-xs">
                {sections.skills.map(skill => (
                  <div key={skill.id}>
                    <p className="font-bold text-gray-800">{skill.category}</p>
                    <p className="text-gray-600 text-[10px]">{skill.items}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {sections.education.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-teal-600 border-b pb-1 mb-2">EDUCATION</h2>
              {sections.education.map(edu => (
                <div key={edu.id} className="mb-3 text-xs">
                  <p className="font-bold text-gray-800">{edu.degree}</p>
                  <p className="text-gray-600">{edu.institution}</p>
                  <p className="text-[10px] text-teal-600 font-bold">{edu.year} ({edu.grade})</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const ExecutiveTemplate = () => (
    <div className="bg-white text-black p-8 text-left w-full font-serif">
      <div className="text-center mb-8">
        <h1 className="text-4xl uppercase tracking-widest text-[#7f1d1d] font-bold mb-2">{sections.personal.fullName}</h1>
        <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-600 italic">
          <span>{sections.personal.email}</span>
          <span>•</span>
          <span>{sections.personal.phone}</span>
          <span>•</span>
          <span>{sections.personal.location}</span>
        </div>
      </div>

      <div className="space-y-6">
        {sections.personal.summary && (
          <div>
            <h2 className="text-xs tracking-widest uppercase font-bold text-[#7f1d1d] border-b mb-2">Executive Summary</h2>
            <p className="text-xs text-gray-700 leading-relaxed italic">{sections.personal.summary}</p>
          </div>
        )}

        {sections.experience.length > 0 && (
          <div>
            <h2 className="text-xs tracking-widest uppercase font-bold text-[#7f1d1d] border-b mb-3">Professional Experience</h2>
            {sections.experience.map(exp => (
              <div key={exp.id} className="mb-4 text-xs">
                <div className="flex justify-between font-bold text-gray-900 mb-1">
                  <span>{exp.position} — {exp.company}</span>
                  <span>{exp.duration}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {sections.education.length > 0 && (
          <div>
            <h2 className="text-xs tracking-widest uppercase font-bold text-[#7f1d1d] border-b mb-3">Academic Credentials</h2>
            {sections.education.map(edu => (
              <div key={edu.id} className="mb-3 text-xs flex justify-between">
                <div>
                  <p className="font-bold text-gray-900">{edu.degree}</p>
                  <p className="text-gray-600">{edu.institution}</p>
                </div>
                <div className="text-right text-gray-600">
                  <p>{edu.year}</p>
                  <p className="font-bold text-[#7f1d1d]">{edu.grade}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const AcademicTemplate = () => (
    <div className="bg-white text-black p-8 text-left w-full font-serif">
      <div className="border-b-2 border-black pb-4 mb-6">
        <h1 className="text-3xl font-bold text-center uppercase tracking-tight">{sections.personal.fullName}</h1>
        <p className="text-xs text-center text-gray-600 mt-2">
          {sections.personal.email} | {sections.personal.phone} | {sections.personal.location}
        </p>
      </div>

      <div className="space-y-6">
        {sections.personal.summary && (
          <div>
            <h2 className="text-sm font-bold uppercase mb-2 border-b">Research Interests / Profile</h2>
            <p className="text-xs text-gray-700 leading-relaxed">{sections.personal.summary}</p>
          </div>
        )}

        {sections.education.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase mb-3 border-b">Education</h2>
            {sections.education.map(edu => (
              <div key={edu.id} className="mb-3 text-xs">
                <div className="flex justify-between font-bold">
                  <span>{edu.degree}</span>
                  <span>{edu.year}</span>
                </div>
                <p className="text-gray-700">{edu.institution} • Grade: {edu.grade}</p>
              </div>
            ))}
          </div>
        )}

        {sections.experience.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase mb-3 border-b">Academic & Professional Appointments</h2>
            {sections.experience.map(exp => (
              <div key={exp.id} className="mb-4 text-xs">
                <div className="flex justify-between font-bold">
                  <span>{exp.position}</span>
                  <span>{exp.duration}</span>
                </div>
                <p className="text-gray-600 font-semibold">{exp.company}</p>
                <p className="text-gray-700 leading-relaxed mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {sections.projects.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase mb-3 border-b">Key Research Projects</h2>
            {sections.projects.map(project => (
              <div key={project.id} className="mb-3 text-xs">
                <p className="font-bold text-gray-900">{project.title}</p>
                <p className="text-gray-700 leading-relaxed">{project.description}</p>
                <p className="text-[10px] text-gray-500 font-bold">Methods/Tech: {project.technologies}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const ElegantTemplate = () => (
    <div className="bg-white text-black p-8 text-left w-full">
      {/* Top Header */}
      <div className="flex justify-between items-end border-b pb-4 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-[#374151] tracking-tight">{sections.personal.fullName}</h1>
          <p className="text-xs text-gray-500 mt-1">Professional Resume</p>
        </div>
        <div className="text-[10px] text-gray-500 font-semibold text-right">
          <p>📧 {sections.personal.email}</p>
          <p>📱 {sections.personal.phone}</p>
          <p>📍 {sections.personal.location}</p>
        </div>
      </div>

      <div className="space-y-6">
        {sections.personal.summary && (
          <div>
            <h2 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Overview</h2>
            <p className="text-xs text-gray-700 leading-relaxed">{sections.personal.summary}</p>
          </div>
        )}

        {sections.experience.length > 0 && (
          <div>
            <h2 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-3">Timeline & Experience</h2>
            <div className="border-l-2 border-gray-200 pl-4 space-y-4 ml-2">
              {sections.experience.map(exp => (
                <div key={exp.id} className="relative text-xs">
                  {/* Timeline dot */}
                  <div className="absolute -left-[22px] top-1 w-2.5 h-2.5 bg-gray-400 rounded-full border-2 border-white" />
                  <div className="flex justify-between font-bold text-gray-800">
                    <span>{exp.position} @ {exp.company}</span>
                    <span className="text-gray-500">{exp.duration}</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed mt-1">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {sections.education.length > 0 && (
          <div>
            <h2 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-3">Academic Background</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-700">
              {sections.education.map(edu => (
                <div key={edu.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <p className="font-bold text-gray-800">{edu.degree}</p>
                  <p className="text-gray-500">{edu.institution}</p>
                  <p className="text-[10px] text-gray-400 font-bold mt-1">{edu.year} • Grade: {edu.grade}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return <ModernTemplate />;
      case 'minimalist':
        return <MinimalistTemplate />;
      case 'professional':
        return <ProfessionalTemplate />;
      case 'creative':
        return <CreativeTemplate />;
      case 'executive':
        return <ExecutiveTemplate />;
      case 'academic':
        return <AcademicTemplate />;
      case 'elegant':
        return <ElegantTemplate />;
      default:
        return <ModernTemplate />;
    }
  };

  const tabs = [
    {
      key: 'personal',
      label: '👤 Personal',
      children: (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Full Name"
              value={sections.personal.fullName}
              onChange={(e) => updatePersonal('fullName', e.target.value)}
              className="ant-input-lg"
            />
            <Input
              placeholder="Email"
              value={sections.personal.email}
              onChange={(e) => updatePersonal('email', e.target.value)}
              className="ant-input-lg"
            />
            <Input
              placeholder="Phone"
              value={sections.personal.phone}
              onChange={(e) => updatePersonal('phone', e.target.value)}
              className="ant-input-lg"
            />
            <Input
              placeholder="Location"
              value={sections.personal.location}
              onChange={(e) => updatePersonal('location', e.target.value)}
              className="ant-input-lg"
            />
          </div>
          <Input.TextArea
            placeholder="Professional Summary"
            value={sections.personal.summary}
            onChange={(e) => updatePersonal('summary', e.target.value)}
            rows={4}
            className="mt-4"
          />
        </motion.div>
      )
    },
    {
      key: 'experience',
      label: '💼 Experience',
      children: (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <AnimatePresence>
            {sections.experience.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-cyan-900/20 p-4 rounded-lg mb-4 border border-cyan-500/30"
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold">Experience {idx + 1}</h4>
                  <Button
                    danger
                    size="small"
                    icon={<Trash2 size={16} />}
                    onClick={() => removeExperience(exp.id)}
                  />
                </div>
                <Input
                  placeholder="Job Position"
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                  className="mb-2"
                />
                <Input
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  className="mb-2"
                />
                <Input
                  placeholder="Duration (e.g., Jan 2022 - Present)"
                  value={exp.duration}
                  onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                  className="mb-2"
                />
                <Input.TextArea
                  placeholder="Description"
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                  rows={3}
                />
              </motion.div>
            ))}
          </AnimatePresence>
          <GradientButton onClick={addExperience} className="w-full mt-4">
            <Plus size={18} className="inline mr-2" /> Add Experience
          </GradientButton>
        </motion.div>
      )
    },
    {
      key: 'education',
      label: '🎓 Education',
      children: (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <AnimatePresence>
            {sections.education.map((edu, idx) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-purple-900/20 p-4 rounded-lg mb-4 border border-purple-500/30"
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold">Education {idx + 1}</h4>
                  <Button
                    danger
                    size="small"
                    icon={<Trash2 size={16} />}
                    onClick={() => removeEducation(edu.id)}
                  />
                </div>
                <Input
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  className="mb-2"
                />
                <Input
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                  className="mb-2"
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Year"
                    value={edu.year}
                    onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                  />
                  <Input
                    placeholder="CGPA/Grade"
                    value={edu.grade}
                    onChange={(e) => updateEducation(edu.id, 'grade', e.target.value)}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <GradientButton onClick={addEducation} className="w-full mt-4">
            <Plus size={18} className="inline mr-2" /> Add Education
          </GradientButton>
        </motion.div>
      )
    },
    {
      key: 'skills',
      label: '🛠️ Skills',
      children: (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <AnimatePresence>
            {sections.skills.map((skill, idx) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-green-900/20 p-4 rounded-lg mb-4 border border-green-500/30"
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold">Skill Group {idx + 1}</h4>
                  <Button
                    danger
                    size="small"
                    icon={<Trash2 size={16} />}
                    onClick={() => removeSkill(skill.id)}
                  />
                </div>
                <Input
                  placeholder="Category (e.g., Languages)"
                  value={skill.category}
                  onChange={(e) => updateSkill(skill.id, 'category', e.target.value)}
                  className="mb-2"
                />
                <Input.TextArea
                  placeholder="Skills (comma separated)"
                  value={skill.items}
                  onChange={(e) => updateSkill(skill.id, 'items', e.target.value)}
                  rows={2}
                />
              </motion.div>
            ))}
          </AnimatePresence>
          <GradientButton onClick={addSkill} className="w-full mt-4">
            <Plus size={18} className="inline mr-2" /> Add Skill Group
          </GradientButton>
        </motion.div>
      )
    },
    {
      key: 'projects',
      label: '🚀 Projects',
      children: (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <AnimatePresence>
            {sections.projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-yellow-900/20 p-4 rounded-lg mb-4 border border-yellow-500/30"
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold">Project {idx + 1}</h4>
                  <Button
                    danger
                    size="small"
                    icon={<Trash2 size={16} />}
                    onClick={() => removeProject(project.id)}
                  />
                </div>
                <Input
                  placeholder="Project Title"
                  value={project.title}
                  onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                  className="mb-2"
                />
                <Input.TextArea
                  placeholder="Description"
                  value={project.description}
                  onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                  rows={2}
                  className="mb-2"
                />
                <Input
                  placeholder="Technologies Used"
                  value={project.technologies}
                  onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
          <GradientButton onClick={addProject} className="w-full mt-4">
            <Plus size={18} className="inline mr-2" /> Add Project
          </GradientButton>
        </motion.div>
      )
    },
    {
      key: 'certifications',
      label: '🏆 Certifications',
      children: (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <AnimatePresence>
            {sections.certifications.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-blue-900/20 p-4 rounded-lg mb-4 border border-blue-500/30"
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold">Certification {idx + 1}</h4>
                  <Button
                    danger
                    size="small"
                    icon={<Trash2 size={16} />}
                    onClick={() => removeCertification(cert.id)}
                  />
                </div>
                <Input
                  placeholder="Certification Name"
                  value={cert.name}
                  onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                  className="mb-2"
                />
                <Input
                  placeholder="Issuer"
                  value={cert.issuer}
                  onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
          <GradientButton onClick={addCertification} className="w-full mt-4">
            <Plus size={18} className="inline mr-2" /> Add Certification
          </GradientButton>
        </motion.div>
      )
    }
  ];

  return (
    <div className="bg-[#080415] min-h-screen text-white relative overflow-hidden font-sans pb-20 pt-12">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#7000ff]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-0 w-[600px] h-[600px] bg-[#00f2ff]/10 rounded-full blur-[150px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black mb-4 tracking-tight leading-none">
            Resume Builder <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff3b7e] via-[#ff8c2b] to-[#00f2ff] drop-shadow-[0_0_30px_rgba(0,242,255,0.2)]">Pro</span>
          </h1>
          <p className="text-xl text-gray-400 font-medium">Create a professional resume in minutes</p>
        </div>

        {/* Template Selector */}
        <div className="mb-8 text-center">
          <label className="text-lg font-semibold mr-4">Choose Template:</label>
          <Segmented
            value={template}
            onChange={setTemplate}
            options={[
              { label: '✨ Modern', value: 'modern' },
              { label: '📄 Minimal', value: 'minimalist' },
              { label: '💼 Corporate', value: 'professional' },
              { label: '🎨 Creative', value: 'creative' },
              { label: '👑 Executive', value: 'executive' },
              { label: '📚 Academic', value: 'academic' },
              { label: '⭐ Elegant', value: 'elegant' }
            ]}
            size="large"
            className="!bg-[#0c0721] !border-white/10 !text-white"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <AnimatedCard className="bg-gradient-to-b from-[#1b0e36] to-[#0a0518] border border-white/5 hover:border-[#00f2ff]/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_60px_rgba(0,242,255,0.15)] rounded-[2.5rem] p-8 transition-all duration-500">
              <Tabs items={tabs} />
              <div className="flex gap-3 mt-6">
                <GradientButton onClick={() => setPreview(!preview)} className="flex-1">
                  <Eye size={18} className="inline mr-2" />
                  {preview ? 'Hide' : 'Preview'}
                </GradientButton>
                <GradientButton onClick={downloadPDF} className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600">
                  <Download size={18} className="inline mr-2" />
                  Download PDF
                </GradientButton>
              </div>
            </AnimatedCard>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <AnimatedCard className="bg-gradient-to-b from-[#1b0e36] to-[#0a0518] border border-white/5 rounded-[2.5rem] p-6 max-h-96 overflow-y-auto">
                <h3 className="font-bold mb-4 text-center">Preview</h3>
                <div className="bg-white text-black p-3 rounded-lg text-sm max-h-80 overflow-hidden">
                  {renderTemplate()}
                </div>
              </AnimatedCard>
            </div>
          </div>
        </div>

        {/* Hidden full-size container for high-quality PDF generation */}
        <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', width: '794px' }}>
          <div ref={resumeRef} className="p-8 bg-white text-black w-[794px] min-h-[1123px] relative flex flex-col justify-start">
            {renderTemplate()}
          </div>
        </div>

        {/* Full Preview Modal */}
        {preview && (
          <Modal
            title="Resume Preview"
            open={preview}
            onCancel={() => setPreview(false)}
            width="90%"
            bodyStyle={{ maxHeight: '80vh', overflow: 'auto' }}
            footer={null}
          >
            <div className="bg-white p-4 rounded-lg">
              {renderTemplate()}
            </div>
          </Modal>
        )}
        {/* ── ATS RESUME COMPREHENSIVE SEO CONTENT SECTION (AdSense & SEO Optimized) ── */}
        <section className="py-20 mt-16 border-t border-white/5 text-left select-text">
          <div className="space-y-12 max-w-7xl mx-auto">
            {/* Section 1 */}
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
                💼 Ultimate Guide: How to Build a Professional ATS-Friendly Resume
              </h2>
              <p className="text-gray-300 leading-relaxed text-base">
                Whether you are applying for private corporate roles, PSU hires, or government contracts, your resume is the very first point of contact with recruiters. In today's digital hiring landscape, more than 75% of resumes are screened by an **Applicant Tracking System (ATS)** before ever reaching a human resource manager. An ATS is an automated software application that parses resume content, filters candidates based on keywords, and ranks profiles by relevance. If your resume format is complex, uses unreadable fonts, or lacks structural tags, the scanner will fail to read it, leading to instant rejection.
              </p>
              <p className="text-gray-300 leading-relaxed text-base">
                Our <strong>Resume Builder Pro</strong> is designed with custom ATS-friendly layouts that ensure your resume passes scanner parses cleanly. By using a single-column or clear table layout, standard system fonts, and logical section hierarchies, our templates allow text reading engines to extract details (experience, education, and skills) instantly.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-[#00f2ff] tracking-tight uppercase">
                📝 Essential Resume Sections and Best Practices
              </h3>
              <p className="text-gray-300 leading-relaxed text-base">
                To build a strong resume, make sure you optimize the following core sections:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-gray-300">
                <li>
                  <strong>Contact Information:</strong> Include your full name, phone number, email address, and professional links (such as LinkedIn or GitHub). Avoid putting personal details like religion, age, or marital status unless explicitly requested by government portal applications.
                </li>
                <li>
                  <strong>Professional Summary:</strong> A concise 3-4 sentence paragraph that highlights your primary skills, experience years, and career goals. Avoid generic statements and focus on quantitative metrics.
                </li>
                <li>
                  <strong>Work Experience:</strong> List your roles in reverse chronological order. Use action verbs (such as Developed, Managed, Coordinated, Optimized) and include measurable achievements (e.g., 'Boosted server rendering efficiency by 25%').
                </li>
                <li>
                  <strong>Education & Certifications:</strong> State your degree, institution name, graduation year, and GPA/CGPA. Add professional certifications (like AWS, PMP, or Cisco) to boost keyword match scores.
                </li>
                <li>
                  <strong>Skills Matrix:</strong> Group your skills by category (e.g., Languages, Tools, Methodologies). This makes it easy for both scanners and recruiters to quickly assess your technical competencies.
                </li>
              </ul>
            </div>

            {/* Section 3: FAQs */}
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-[#ff8c2b] tracking-tight uppercase">
                ❓ Resume Builder FAQs
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    q: "What makes a resume ATS-friendly?",
                    a: "An ATS-friendly resume avoids decorative graphic columns, tables, headers, footers, or images. It uses standard text headers (Education, Experience) and clean system fonts (Arial, Times New Roman) that text parsers can read without errors."
                  },
                  {
                    q: "Should I include my photograph on my resume?",
                    a: "For most corporate and international applications, photographs are discouraged as they can trigger compliance issues regarding hiring bias. However, some specific government contract posts in India might ask for it. Choose Minimalist/Academic templates in those cases."
                  },
                  {
                    q: "How long should my resume be?",
                    a: "A standard, single-page resume is best for applicants with less than 5-8 years of experience. Keep descriptions criteria-oriented to fit standard sizes."
                  },
                  {
                    q: "Can I edit my resume after downloading it?",
                    a: "Our tool processes all inputs in real-time. You can fill out the form, click preview, adjust templates, and download a fresh PDF copy anytime."
                  },
                  {
                    q: "Does this builder save my personal information?",
                    a: "No. All details entered in our builder are processed locally in your browser memory. We do not host your information on databases, ensuring total data privacy."
                  },
                  {
                    q: "How should I name my resume file before sending?",
                    a: "Save your file as 'FullName_Resume.pdf' (e.g. Sagar_Kumar_Resume.pdf) instead of generic terms like 'resume.pdf' to help recruiters locate it easily."
                  }
                ].map((faq, idx) => (
                  <div key={idx} className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-2">
                    <h4 className="text-white font-bold text-sm">💡 {faq.q}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default ResumeBuilder;
