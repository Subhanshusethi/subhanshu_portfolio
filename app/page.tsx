"use client";

import { useState, useEffect, ReactNode } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Download, BrainCircuit, Eye, Code, FileText, Bot, Briefcase, Star, X, Zap, Target } from 'lucide-react';

// --- TYPE DEFINITIONS ---
interface SectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}

interface Project {
  title: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  video?: string;
  tags: string[];
  link: string;
  status: string;
  metrics: { label: string; value: string; icon: ReactNode }[];
}

// --- DATA ---
const projectsData: Project[] = [
  {
    title: "GExSent-MOE",
    shortDescription: "Multimodal sentiment analysis using a Mixture of Experts and Gated Attention.",
    longDescription: "Designed a novel multimodal classification model by integrating image and text modalities. This work employs a Mixture of Experts (MoE) module and an enhanced Gated Attention mechanism to capture both local and global contextual cues. It achieves state-of-the-art performance with a reduced parameter count by integrating a frozen CLIP image encoder and a ModernBERT text encoder.",
    image: "/assets/images/gexsent-moe.png", // Placeholder path
    tags: ["CLIP", "BERT", "Mixture of Experts", "PyTorch"],
    link: "https://github.com/Subhanshusethi/GExSENT-MOE",
    status: "Accepted at IJCNN 2025",
    metrics: [
        { label: "Status", value: "SOTA Performance", icon: <Star size={16} /> },
        { label: "Core Tech", value: "Mixture of Experts", icon: <BrainCircuit size={16} /> }
    ],
  },
  {
    title: "ContXCLIP",
    shortDescription: "Vision-language understanding with context-aware dual attention.",
    longDescription: "This project introduces ContXCLIP, featuring proposed dual-attention and context-preserving modules that integrate CLIP and GPT-2. The model's understanding is significantly enhanced via contrastive learning, resulting in improved semantic alignment for complex image-to-text generation tasks.",
    image: "/assets/images/contxclip.png", // Placeholder path
    tags: ["CLIP", "GPT-2", "Attention Mechanism", "Contrastive Learning"],
    link: "https://github.com/Subhanshusethi/ContXCLIP",
    status: "Under Review (Elsevier)",
     metrics: [
        { label: "BLEU-4 Score", value: "54", icon: <Target size={16} /> },
        { label: "Method", value: "Dual Attention", icon: <Zap size={16} /> }
    ],
  },
  {
    title: "Flipkart Grid Robotics",
    shortDescription: "Production-ready VLM-based feature extractor for FMCG products.",
    longDescription: "As a finalist in the Flipkart Grid 5.0 Robotics Challenge (Top 10 of 19,000+ teams), I built a production-ready feature extractor for FMCG products. The solution leverages Visual Language Models (VLMs) like Qwen, alongside robust object counting and segmentation pipelines for zero-shot analysis of retail imagery. The project emphasized creating scalable, efficient, and highly accurate systems for real-world application.",
    video: "/assets/videos/flipkart-robotics.mp4",
    image: "/assets/images/flipkart-placeholder.png", // A fallback image if video doesn't load
    tags: ["VLM", "Zero-Shot", "Object Detection", "Docker"],
    link: "https://github.com/siddyboii/flipkartgridrobotics",
    status: "National Finalist",
    metrics: [
        { label: "F1 Score", value: "0.86", icon: <Target size={16} /> },
        { label: "Performance", value: "-50% Proc. Time", icon: <Zap size={16} /> }
    ],
  }
];


// --- MAIN COMPONENT ---
export default function Portfolio() {
  const [mounted, setMounted] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans antialiased">
      <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* --- HEADER --- */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 py-16"
        >
          <div className="md:w-3/5 text-center md:text-left">
            <h1 className="text-5xl lg:text-6xl font-bold text-white tracking-tight">
              Subhanshu Sethi
            </h1>
            <p className="mt-4 text-lg lg:text-xl text-cyan-400">
              AI Engineer | Computer Vision | Multimodal Research
            </p>
            <p className="mt-4 max-w-xl text-gray-300">
             Final-year DTU student passionate about building intelligent systems at the intersection of vision and language. Driven by a desire to solve complex problems, from developing SOTA models for academic publication to engineering production-ready robotics solutions.
            </p>
            <div className="mt-8 flex justify-center md:justify-start items-center gap-4">
               <a href="/SubhanshuCV.pdf" download className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-500 text-gray-900 font-semibold rounded-lg shadow-lg hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105">
                <Download size={20}/> Resume
              </a>
              <a href="https://github.com/subhanshusethi" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors p-2"><Github /></a>
              <a href="https://linkedin.com/in/subhanshusethi" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors p-2"><Linkedin /></a>
              <a href="mailto:sethisubhanshu@gmail.com" className="text-gray-400 hover:text-cyan-400 transition-colors p-2"><Mail /></a>
            </div>
          </div>
          <motion.div 
            className="md:w-2/5 flex justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
             <div className="relative w-64 h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-cyan-400/50 shadow-2xl shadow-cyan-500/20">
              <Image
                src="/assets/images/headshot.jpg"
                alt="Subhanshu Sethi"
                layout="fill"
                objectFit="cover"
                className="transform hover:scale-110 transition-transform duration-500"
                onError={(e) => { e.currentTarget.src = 'https://placehold.co/300x300/111827/7DD3FC?text=S.S'; }}
              />
            </div>
          </motion.div>
        </motion.header>

        {/* --- PROJECTS --- */}
        <Section title="Featured Projects" icon={<Eye className="text-cyan-400"/>}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectsData.map((project) => (
                <motion.div
                  key={project.title}
                  layoutId={`project-card-${project.title}`}
                  onClick={() => setSelectedProject(project)}
                  className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 cursor-pointer hover:border-cyan-400 transition-all group"
                  whileHover={{ y: -5, boxShadow: "0px 10px 30px rgba(0, 255, 255, 0.1)" }}
                >
                    <div className="relative h-40 w-full overflow-hidden rounded-md mb-4">
                        <Image
                            src={project.image}
                            alt={`${project.title} preview`}
                            layout="fill"
                            objectFit="cover"
                            className="group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x200/1F2937/7DD3FC?text=Project'; }}
                        />
                    </div>
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    <p className="mt-2 text-gray-400 text-sm">{project.shortDescription}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-md">{tag}</span>
                        ))}
                    </div>
                </motion.div>
              ))}
          </div>
        </Section>
        
        <AnimatePresence>
            {selectedProject && (
                <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
            )}
        </AnimatePresence>

        {/* Other sections can go here */}

      </main>
      <footer className="text-center py-8 border-t border-gray-800 mt-12">
        <p className="text-gray-500">Designed & Built by Subhanshu Sethi</p>
      </footer>
    </div>
  );
}

// --- MODAL COMPONENT ---
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <motion.div
                layoutId={`project-card-${project.title}`}
                className="bg-gray-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
            >
                <div className="p-6 md:p-8">
                    <div className="flex justify-between items-start">
                        <h2 className="text-3xl font-bold text-white">{project.title}</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                            <X size={28}/>
                        </button>
                    </div>
                     <span className="text-sm font-medium text-cyan-400 bg-cyan-900/50 px-2.5 py-1 rounded-full mt-2 inline-block">{project.status}</span>
                </div>
                
                {project.video ? (
                    <video className="w-full h-auto" controls autoPlay muted loop playsInline>
                        <source src={project.video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <div className="relative w-full h-64 md:h-80 bg-gray-900">
                        <Image src={project.image} alt={project.title} layout="fill" objectFit="contain" onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x400/1F2937/7DD3FC?text=Architecture'; }}/>
                    </div>
                )}
                
                <div className="p-6 md:p-8">
                     <p className="text-gray-300 leading-relaxed">{project.longDescription}</p>
                    
                    <div className="mt-6 grid grid-cols-2 gap-4">
                        {project.metrics.map(metric => (
                            <div key={metric.label} className="bg-gray-900/70 p-4 rounded-lg flex items-center gap-3">
                                <div className="text-cyan-400">{metric.icon}</div>
                                <div>
                                    <div className="text-sm text-gray-400">{metric.label}</div>
                                    <div className="font-bold text-white">{metric.value}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6">
                         <h4 className="font-semibold text-white mb-3">Technologies Used:</h4>
                         <div className="flex flex-wrap gap-2">
                             {project.tags.map(tag => (
                                 <span key={tag} className="text-sm bg-gray-700 text-gray-300 px-3 py-1 rounded-md">{tag}</span>
                             ))}
                         </div>
                    </div>

                    <div className="mt-8">
                       <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-500 text-gray-900 font-semibold rounded-lg shadow-lg hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105">
                            View on GitHub <Github size={18}/>
                        </a>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// --- REUSABLE SECTION COMPONENT ---
function Section({ title, icon, children, className }: SectionProps) {
  return (
    <motion.section 
        className={`py-16 ${className}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-4 mb-8">
        {icon}
        <h2 className="text-3xl font-bold text-white tracking-tight">{title}</h2>
      </div>
      {children}
    </motion.section>
  );
}

