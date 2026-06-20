import React from 'react';
import { ConfigProvider, theme, App as AntdApp } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ImageResizer from './pages/tools/ImageResizer';
import SignatureMaker from './pages/tools/SignatureMaker';
import PassportPhotoMaker from './pages/tools/PassportPhotoMaker';
import PDFTools from './pages/tools/PDFTools';
import ResumeBuilder from './pages/ResumeBuilder';
import AllTools from './pages/AllTools';
import AgeCalculator from './pages/tools/AgeCalculator';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import JpgToPdf from './pages/tools/JpgToPdf';
import FormHelper from './pages/tools/FormHelper';
import OfficeTools from './pages/tools/OfficeTools';
import DocumentConverter from './pages/tools/DocumentConverter';
import PdfSecurity from './pages/tools/PdfSecurity';
import PdfCompressor from './pages/tools/PdfCompressor';
import BgRemover from './pages/tools/BgRemover';
import TypingTest from './pages/tools/TypingTest';
import AiWebsiteBuilder from './pages/tools/AiWebsiteBuilder';
import PdfWatermark from './pages/tools/PdfWatermark';
import PdfRotate from './pages/tools/PdfRotate';
import HtmlToPdf from './pages/tools/HtmlToPdf';
import PdfPageNumber from './pages/tools/PdfPageNumber';
import PdfEdit from './pages/tools/PdfEdit';
import PdfCrop from './pages/tools/PdfCrop';
import SalarySlabs from './pages/tools/SalarySlabs';
import VideoToPdf from './pages/tools/VideoToPdf';
import AboutUs from './pages/AboutUs';

// New Dispatchers
import YoutubeTool from './pages/tools/YoutubeTool';
import DevTool from './pages/tools/DevTool';
import UtilTool from './pages/tools/UtilTool';


// Legal Pages
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import TermsOfUse from './pages/legal/TermsOfUse';
import ContactUs from './pages/legal/ContactUs';
import HelpGuide from './pages/legal/HelpGuide';

import './index.css';

const App = () => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#00f2ff',
          borderRadius: 8,
          colorBgContainer: '#141414',
        },
      }}
    >
      <AntdApp>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tools" element={<AllTools />} />
                <Route path="/image-resizer" element={<ImageResizer />} />
                <Route path="/signature-maker" element={<SignatureMaker />} />
                <Route path="/passport-photo-maker" element={<PassportPhotoMaker />} />
                <Route path="/pdf-tools" element={<PDFTools />} />
                <Route path="/resume-builder" element={<ResumeBuilder />} />
                <Route path="/age-calculator" element={<AgeCalculator />} />
                <Route path="/jpg-to-pdf" element={<JpgToPdf />} />
                <Route path="/form-helper" element={<FormHelper />} />
                <Route path="/office-tools" element={<OfficeTools />} />
                <Route path="/ai-website-builder" element={<AiWebsiteBuilder />} />
                <Route path="/document-converter" element={<DocumentConverter />} />
                <Route path="/pdf-security" element={<PdfSecurity />} />
                <Route path="/pdf-compressor" element={<PdfCompressor />} />
                <Route path="/bg-remover" element={<BgRemover />} />
                <Route path="/typing-test" element={<TypingTest />} />
                <Route path="/pdf-watermark" element={<PdfWatermark />} />
                <Route path="/pdf-rotate" element={<PdfRotate />} />
                <Route path="/html-to-pdf" element={<HtmlToPdf />} />
                <Route path="/pdf-page-number" element={<PdfPageNumber />} />
                <Route path="/pdf-edit" element={<PdfEdit />} />
                <Route path="/pdf-crop" element={<PdfCrop />} />
                <Route path="/salary-slabs" element={<SalarySlabs />} />
                <Route path="/video-to-pdf" element={<VideoToPdf />} />
                
                {/* YouTube Tools */}
                <Route path="/youtube-title" element={<YoutubeTool type="title" />} />
                <Route path="/youtube-description" element={<YoutubeTool type="description" />} />
                <Route path="/youtube-thumbnail" element={<YoutubeTool type="thumbnail" />} />
                <Route path="/youtube-keyword" element={<YoutubeTool type="keyword" />} />
                <Route path="/youtube-tags" element={<YoutubeTool type="tags" />} />
                <Route path="/youtube-hash" element={<YoutubeTool type="hash" />} />

                {/* Developer Tools */}
                <Route path="/json-formatter" element={<DevTool type="json" />} />
                <Route path="/html-formatter" element={<DevTool type="html" />} />
                <Route path="/xml-formatter" element={<DevTool type="xml" />} />
                <Route path="/css-minifier" element={<DevTool type="css-minify" />} />
                <Route path="/css-beautifier" element={<DevTool type="css-beautify" />} />
                <Route path="/meta-tag-generator" element={<DevTool type="meta" />} />

                {/* General Utilities */}
                <Route path="/password-generator" element={<UtilTool type="password" />} />
                <Route path="/word-counter" element={<UtilTool type="counter" />} />
                <Route path="/remove-duplicate-lines" element={<UtilTool type="duplicates" />} />
                <Route path="/currency-converter" element={<UtilTool type="currency" />} />
                <Route path="/lorem-ipsum" element={<UtilTool type="lorem" />} />
                <Route path="/qr-generator" element={<UtilTool type="qrcode" />} />
                <Route path="/color-picker" element={<UtilTool type="color" />} />

                
                {/* Legal Routes */}
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-use" element={<TermsOfUse />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/help-guide" element={<HelpGuide />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AntdApp>
    </ConfigProvider>
  );
};

export default App;
