"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Download, BrainCircuit, Eye, Code, FileText, Bot, Briefcase, Star } from 'lucide-react';

// Main Component for the Portfolio Page
export default function Portfolio() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const projects = [
    {
      title: "GExSent-MOE",
      description: "A novel Mixture of Experts (MOE) based module and Gated Attention to combine CLIP-based visual features and ModernBERT-based textual features for robust sentiment analysis.",
      tags: ["CLIP", "BERT", "Mixture of Experts", "IJCNN 2025"],
      link: "https://github.com/Subhanshusethi/GExSENT-MOE",
      status: "Accepted at IJCNN 2025"
    },
    {
      title: "ContXCLIP",
      description: "Proposed dual-attention and context-preserving modules integrating CLIP + GPT-2, enhanced via contrastive learning for richer vision-language understanding.",
      tags: ["CLIP", "GPT-2", "Attention Mechanism", "Elsevier"],
      link: "https://github.com/Subhanshusethi/ContXCLIP",
      status: "Under Review"
    },
    {
      title: "Flipkart Grid Robotics Challenge",
      description: "A production-ready feature extractor for FMCG products using VLMs like Qwen, with object counting and segmentation for zero-shot retail imagery analysis.",
      tags: ["VLM", "Zero-Shot", "Object Detection", "Finalist"],
      link: "https://github.com/siddyboii/flipkartgridrobotics",
      status: "Top 10/19,000+ Teams"
    }
  ];

  const experience = [
      {
        role: "Computer Vision Intern",
        company: "Novus Hi-Tech",
        date: "June 2024 – Present",
        description: "Implemented deep learning-based object detection and tracking systems (YOLO, ByteTrack, Kalman filters), improving accuracy by 20% on NVIDIA edge devices. Accelerated pose estimation pipelines using RANSAC & TensorRT for real-time performance on autonomous pallet picker robots."
      }
  ];
  
  const publications = [
      {
        title: "GEXSent: Gated Experts for Robust Sentiment Analysis Across Modalities",
        journal: "Accepted at IJCNN, Rome, Italy, 2025"
      },
      {
        title: "ContXCLIP: Contextual Attention for Vision-Language Understanding",
        journal: "Under review at Signal Processing: Image Communication (Elsevier)"
      }
  ];

  if (!mounted) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans antialiased">
      <main className="max-w-5xl mx-auto p-4 sm:p-6 md:p-8">
        {/* Header Section */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
            Subhanshu Sethi
          </h1>
          <p className="mt-4 text-lg md:text-xl text-cyan-400">
            AI Engineer | Computer Vision | Multimodal Learning
          </p>
          <div className="mt-6 flex justify-center items-center gap-6">
            <motion.a whileHover={{ scale: 1.1, y: -2 }} href="https://github.com/subhanshusethi" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
              <Github size={24} />
            </motion.a>
            <motion.a whileHover={{ scale: 1.1, y: -2 }} href="https://linkedin.com/in/subhanshusethi" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
              <Linkedin size={24} />
            </motion.a>
            <motion.a whileHover={{ scale: 1.1, y: -2 }} href="mailto:sethisubhanshu@gmail.com" className="text-gray-400 hover:text-cyan-400 transition-colors">
              <Mail size={24} />
            </motion.a>
          </div>
          <motion.div
             whileHover={{ scale: 1.05 }}
             className="mt-8"
          >
             <a
              href="/SubhanshuCV.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 text-gray-900 font-semibold rounded-lg shadow-lg hover:bg-cyan-400 transition-all duration-300"
            >
              <Download size={20}/>
              Download Resume
            </a>
          </motion.div>
        </motion.header>

        {/* About Me Section */}
        <Section title="About Me" icon={<BrainCircuit className="text-cyan-400"/>}>
            <p className="text-lg leading-relaxed text-gray-300">
              I am a final-year Electrical Engineering student at Delhi Technological University (DTU) with a passion for building intelligent systems at the intersection of computer vision and natural language processing. My work focuses on multimodal learning, leveraging models like CLIP, BERT, and GPT to create robust AI solutions. With publications at top-tier conferences like IJCNN, I am dedicated to pushing the boundaries of AI research and application.
            </p>
        </Section>
        
        {/* Experience Section */}
        <Section title="Experience" icon={<Briefcase className="text-cyan-400"/>}>
            <div className="space-y-6">
                {experience.map((exp, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-gray-800/50 p-6 rounded-lg border border-gray-700"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                               <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                               <p className="text-cyan-400 font-medium">{exp.company}</p>
                            </div>
                            <span className="text-sm text-gray-400">{exp.date}</span>
                        </div>
                        <p className="mt-3 text-gray-300">{exp.description}</p>
                    </motion.div>
                ))}
            </div>
        </Section>

        {/* Projects Section */}
        <Section title="Projects" icon={<Eye className="text-cyan-400"/>}>
          <div className="grid md:grid-cols-2 gap-6">
            <AnimatePresence>
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0, 255, 255, 0.1)" }}
                className="bg-gray-800/50 p-6 rounded-lg flex flex-col justify-between border border-gray-700"
              >
                <div>
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                   <span className="text-xs font-medium text-cyan-400 bg-cyan-900/50 px-2 py-1 rounded-full">{project.status}</span>
                  <p className="mt-3 text-gray-300 text-sm leading-relaxed">{project.description}</p>
                </div>
                <div className="mt-4">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map(tag => (
                            <span key={tag} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-md">{tag}</span>
                        ))}
                    </div>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline inline-flex items-center gap-1 font-semibold">
                    GitHub Repo <Github size={16}/>
                  </a>
                </div>
              </motion.div>
            ))}
            </AnimatePresence>
          </div>
        </Section>

        {/* Publications Section */}
        <Section title="Publications" icon={<FileText className="text-cyan-400"/>}>
            <div className="space-y-4">
                {publications.map((pub, index) => (
                     <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-gray-800/50 p-4 rounded-lg border border-gray-700"
                    >
                       <p className="font-semibold text-white">{pub.title}</p>
                       <p className="text-sm text-cyan-400">{pub.journal}</p>
                    </motion.div>
                ))}
            </div>
        </Section>


        {/* Skills Section */}
        <Section title="Skills" icon={<Bot className="text-cyan-400"/>}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-center">
                {["Python", "C++", "PyTorch", "TensorFlow", "Transformers", "OpenCV", "TensorRT", "Docker", "SQL", "LLM Finetuning", "Quantization", "MLOps"].map((skill, index) => (
                    <motion.div 
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="bg-gray-800/50 p-4 rounded-lg border border-gray-700"
                    >
                        <p className="font-medium text-white">{skill}</p>
                    </motion.div>
                ))}
            </div>
        </Section>
        
        {/* Contact Section */}
        <Section title="Get In Touch" icon={<Mail className="text-cyan-400"/>}>
             <p className="text-lg text-center text-gray-300 max-w-xl mx-auto">
                I'm always open to discussing new projects, research collaborations, or opportunities. Feel free to reach out!
            </p>
             <div className="mt-6 text-center">
                <motion.a 
                    whileHover={{ scale: 1.05 }}
                    href="mailto:sethisubhanshu@gmail.com" 
                    className="inline-block px-8 py-3 bg-cyan-500 text-gray-900 font-semibold rounded-lg shadow-lg hover:bg-cyan-400 transition-all duration-300">
                    Say Hello
                </motion.a>
            </div>
        </Section>

      </main>
       <footer className="text-center py-6 border-t border-gray-800">
            <p className="text-gray-500">Designed & Built by Subhanshu Sethi</p>
        </footer>
    </div>
  );
}

// A reusable section component
function Section({ title, icon, children }) {
  return (
    <motion.section 
        className="py-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-3 mb-8">
        {icon}
        <h2 className="text-3xl font-bold text-white tracking-tight">{title}</h2>
      </div>
      {children}
    </motion.section>
  );
}
