"use client";

import { useState, useEffect, ReactNode } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Download, BrainCircuit, Eye, Code, FileText, Bot, Briefcase, Star, X, Zap, Target, Trophy, BookOpen, ChevronsRight, Video, Link as LinkIcon } from 'lucide-react';

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

interface ExperiencePoint {
    text: string;
    links?: {
        github: string;
        video: string;
    };
}

interface Experience {
    role: string;
    company: string;
    date: string;
    description: string;
    points: ExperiencePoint[];
}


// --- DATA ---
const projectsData: Project[] = [
  {
    title: "GExSent-MOE (MultiModal Classification)",
    shortDescription: "Multimodal sentiment analysis using a Mixture of Experts and Gated Attention.",
    longDescription: "Designed a novel multimodal classification model by integrating image and text modalities. This work employs a Mixture of Experts (MoE) module and an enhanced Gated Attention mechanism to capture both local and global contextual cues. It achieves state-of-the-art performance with a reduced parameter count by integrating a frozen CLIP image encoder and a ModernBERT text encoder.",
    image: "/assets/images/gexsent-moe.png",
    tags: ["CLIP", "BERT", "Mixture of Experts", "PyTorch", "IJCNN 2025"],
    link: "https://github.com/Subhanshusethi/GExSENT-MOE",
    status: "Accepted at IJCNN 2025",
    metrics: [{ label: "Status", value: "SOTA Performance", icon: <Star size={16} /> }, { label: "Core Tech", value: "Mixture of Experts", icon: <BrainCircuit size={16} /> }],
  },
  {
    title: "ContXCLIP (Image Captioning)",
    shortDescription: "Vision-language understanding with context-aware dual attention.",
    longDescription: "This project introduces ContXCLIP, featuring proposed dual-attention and context-preserving modules that integrate CLIP and GPT-2. The model's understanding is significantly enhanced via contrastive learning, resulting in improved semantic alignment for complex image-to-text generation tasks.",
    image: "/assets/images/contxclip.png",
    tags: ["CLIP", "GPT-2", "Attention Mechanism", "Contrastive Learning"],
    link: "https://github.com/Subhanshusethi/ContXCLIP",
    status: "Under Review (Elsevier)",
    metrics: [{ label: "BLEU-4 Score", value: "54", icon: <Target size={16} /> }, { label: "Method", value: "Dual Attention", icon: <Zap size={16} /> }],
  },
  {
    title: "Flipkart Grid Robotics (FMCG Products Feature Extractor)",
    shortDescription: "Production-ready VLM-based feature extractor for FMCG products.",
    longDescription: "As a finalist in the Flipkart Grid 5.0 Robotics Challenge (Top 10 of 19,000+ teams), I built a production-ready feature extractor for FMCG products. The solution leverages Visual Language Models (VLMs) like Qwen, alongside robust object counting and segmentation pipelines for zero-shot analysis of retail imagery. The project emphasized creating scalable, efficient, and highly accurate systems for real-world application.",
    video: "/assets/videos/flipkart-robotics.mp4",
    image: "/assets/images/flipkart.png",
    tags: ["VLM", "Zero-Shot", "Object Detection", "Docker", "TensorRT"],
    link: "https://github.com/siddyboii/flipkartgridrobotics",
    status: "National Finalist",
    metrics: [{ label: "F1 Score", value: "0.86", icon: <Target size={16} /> }, { label: "Performance", value: "-50% Proc. Time", icon: <Zap size={16} /> }],
  },
   {
    title: "Grammar Scoring Engine (Speech Classification)",
    shortDescription: "Fine-tuned Gemma 2B model for sophisticated grammar and fluency scoring.",
    longDescription: "Developed a specialized model for evaluating English proficiency by fine-tuning Google's Gemma 2B. This project focuses on nuanced grammar correction and fluency assessment, showcasing skills in transfer learning and model customization for specific NLP downstream tasks.",
    image: "/assets/images/grammar.png",
    tags: ["LLM", "Fine-tuning", "Gemma 2B", "NLP", "HuggingFace"],
    link: "https://github.com/Subhanshusethi/GrammarScoringEngine",
    status: "Personal Project",
    metrics: [{ label: "Model", value: "Gemma 2B", icon: <Bot size={16} /> }, { label: "Task", value: "Grammar Scoring", icon: <Zap size={16} /> }],
  },
  {
    title: "PDF Questing Answering",
    shortDescription: "An interactive RAG pipeline for querying PDF documents using Llama3.",
    longDescription: "Built a complete Question & Answering system leveraging a Retrieval-Augmented Generation (RAG) pipeline. This tool allows users to upload PDF documents and ask complex questions, receiving accurate, context-aware answers generated by a Llama3-powered backend.",
    image: "/assets/images/pdf.png",
    tags: ["RAG", "Llama3", "LangChain", "Streamlit", "PDF Processing"],
    link: "https://github.com/Subhanshusethi/PDF_QA_Llama3.2",
    status: "Personal Project",
    metrics: [{ label: "Architecture", value: "RAG", icon: <BrainCircuit size={16} /> }, { label: "Model", value: "Llama3", icon: <Bot size={16} /> }],
  }
];

const experienceData: Experience[] = [
    {
        role: "Computer Vision Intern",
        company: "Novus Hi-Tech",
        date: "Jun 2024 – Present",
        description: "Engineered and productionized real-time computer vision pipelines for autonomous pallet picker robots.",
        points: [
            { text: "Improved object detection and pose estimation accuracy by 20% using YOLO, ByteTrack, and Kalman filters." },
            { text: "Accelerated inference speed on NVIDIA edge devices using TensorRT and ONNX." },
            { text: "Developed and deployed scalable, Dockerized solutions in a production environment." }
        ]
    },
    {
        role: "Avionics Technician",
        company: "Team UAS-DTU",
        date: "2022 – 2023",
        description: "Key contributor to the avionics subsystem for quadcopter and fixed-wing UAVs, mentoring 10+ members.",
        points: [
            {
                text: "Developed system for an autonomous lane-following system using classical Computer Vision.",
                links: {
                    github: "https://github.com/Subhanshusethi/line-follwing-drone",
                    video: "/assets/videos/lane-following.mp4"
                }
            },
            {
                text: "Developed a real-time facial tracking system to automate camera-work for online lectures.",
                links: {
                    github: "https://github.com/Subhanshusethi/Real-time-tracking-system",
                    video: "/assets/videos/face-tracking.mp4"
                }
            },
            { text: "Secured 3rd place as team lead in an inter-university Robot Soccer Competition." }
        ]
    }
];

const publicationsData = [
    {
        title: "GEXSent: Gated Experts for Robust Sentiment Analysis Across Modalities",
        journal: "Accepted at International Joint Conference on Neural Networks (IJCNN), 2025",
        status: "Accepted"
    },
    {
        title: "ContXCLIP: Contextual Attention for Vision-Language Understanding",
        journal: "Under review at Signal Processing: Image Communication (Elsevier)",
        status: "Under Review"
    }
];

const achievementsData = [
    { title: "Flipkart Grid Robotics Challenge 2024", detail: "National Finalist (Top 10 of 19,000+ teams)", icon: <Trophy color="#FFD700" /> },
    { title: "International Micro Aerial Vehicle (IMAV) 2023", detail: "3rd Place Worldwide, Aachen, Germany", icon: <Trophy color="#C0C0C0" /> },
    { title: "ICUAS 2025 Competition", detail: "6th Place Worldwide, CBRNe Disaster Rescue", icon: <Trophy color="#CD7F32" /> },
];

const skillsData = {
    "Languages & Frameworks": ["Python", "C++", "PyTorch", "TensorFlow", "Transformers", "OpenCV"],
    "MLOps & Tools": ["Docker", "Git/GitHub", "TensorRT", "ONNX", "ROS", "Weights & Biases"],
    "Core Concepts": ["LLM Fine-tuning", "RAG", "Quantization", "Mixture of Experts", "Attention Mechanisms", "Object Detection", "Segmentation"],
};


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
            I build intelligent systems that see and understand the world—grounded in the mathematical first principles of computer vision and deep learning. As a final-year student at DTU, I’m driven by a deep curiosity to solve complex, real-world problems by bridging foundational research with deployable AI and robotics solutions. My work spans from designing perception pipelines to developing scalable models that integrate seamlessly into real-world systems.
            </p>
            <div className="mt-8 flex justify-center md:justify-start items-center gap-4">
               <a href="/SubhanshuCV.pdf" download className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-500 text-gray-900 font-semibold rounded-lg shadow-lg hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105">
                <Download size={20}/> Resume
              </a>
              <a href="https://github.com/subhanshusethi" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors p-2"><Github /></a>
              <a href="https://www.linkedin.com/in/subhanshus/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors p-2"><Linkedin /></a>
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

        <Section title="Featured Projects" icon={<Eye className="text-cyan-400"/>}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectsData.map((project) => (
                <motion.div
                  key={project.title}
                  layoutId={`project-card-${project.title}`}
                  onClick={() => setSelectedProject(project)}
                  className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 cursor-pointer hover:border-cyan-400 transition-all group flex flex-col"
                  whileHover={{ y: -5, boxShadow: "0px 10px 30px rgba(0, 255, 255, 0.1)" }}
                >
                    <div className="relative h-48 w-full overflow-hidden rounded-md mb-4">
                        <Image
                            src={project.image}
                            alt={`${project.title} preview`}
                            layout="fill"
                            objectFit="cover"
                            className="group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => { e.currentTarget.src = `https://placehold.co/400x225/1F2937/7DD3FC?text=${project.title.replace(' ', '+')}`; }}
                        />
                    </div>
                    <div className="flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-white flex-grow">{project.title}</h3>
                      <p className="mt-2 text-gray-400 text-sm">{project.shortDescription}</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-700/50 flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-md">{tag}</span>
                        ))}
                    </div>
                </motion.div>
              ))}
          </div>
        </Section>
        
        <AnimatePresence>
            {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
        </AnimatePresence>
        
        <Section title="Professional Experience" icon={<Briefcase className="text-cyan-400"/>}>
            <div className="relative border-l-2 border-cyan-800/50 pl-8 space-y-12">
                {experienceData.map((exp, index) => (
                     <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                     >
                        <div className="absolute -left-[11px] top-1 h-5 w-5 rounded-full bg-cyan-500 border-4 border-gray-900"></div>
                        <p className="text-sm font-semibold text-cyan-400">{exp.date}</p>
                        <h3 className="text-xl font-bold text-white mt-1">{exp.role} <span className="text-gray-400 font-medium">@ {exp.company}</span></h3>
                        <p className="mt-2 text-gray-300">{exp.description}</p>
                        <ul className="mt-3 space-y-2">
                           {exp.points.map((point, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <ChevronsRight className="text-cyan-400 mt-1 flex-shrink-0" size={16}/>
                                    <span className="text-gray-400">
                                        {point.text}
                                        {point.links && (
                                            <span className="ml-2 inline-flex items-center gap-3">
                                                <a href={point.links.github} target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:underline text-xs font-semibold inline-flex items-center gap-1">
                                                    <Github size={12}/> GitHub
                                                </a>
                                                <a href={point.links.video} target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:underline text-xs font-semibold inline-flex items-center gap-1">
                                                    <Video size={12}/> Demo
                                                </a>
                                            </span>
                                        )}
                                    </span>
                                </li>
                           ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </Section>

        <div className="grid md:grid-cols-2 gap-8">
            <Section title="Publications" icon={<BookOpen className="text-cyan-400"/>}>
                 <div className="space-y-4">
                    {publicationsData.map((pub, index) => (
                        <div key={index} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                           <p className="font-semibold text-white">{pub.title}</p>
                           <p className="text-sm text-cyan-400 mt-1">{pub.journal}</p>
                        </div>
                    ))}
                </div>
            </Section>
            <Section title="Achievements" icon={<Trophy className="text-cyan-400"/>}>
                 <div className="space-y-4">
                    {achievementsData.map((ach, index) => (
                        <div key={index} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 flex items-center gap-4">
                           <div>{ach.icon}</div>
                           <div>
                                <p className="font-semibold text-white">{ach.title}</p>
                                <p className="text-sm text-gray-400">{ach.detail}</p>
                           </div>
                        </div>
                    ))}
                </div>
            </Section>
        </div>
        
        <Section title="Technical Skills" icon={<Bot className="text-cyan-400"/>}>
            <div className="space-y-6">
                {Object.entries(skillsData).map(([category, skills]) =>(
                    <div key={category}>
                        <h4 className="font-semibold text-cyan-400 mb-3">{category}</h4>
                        <div className="flex flex-wrap gap-3">
                            {skills.map(skill => (
                                <span key={skill} className="bg-gray-800 text-gray-300 px-4 py-2 rounded-md font-medium border border-gray-700">{skill}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Section>
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
                className="bg-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 md:p-8 sticky top-0 bg-gray-800/80 backdrop-blur-sm z-10">
                    <div className="flex justify-between items-start">
                        <h2 className="text-3xl font-bold text-white">{project.title}</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                            <X size={28}/>
                        </button>
                    </div>
                     <span className="text-sm font-medium text-cyan-400 bg-cyan-900/50 px-2.5 py-1 rounded-full mt-2 inline-block">{project.status}</span>
                </div>
                
                <div className="px-6 md:px-8">
                  {project.video ? (
                      <video className="w-full h-auto rounded-lg" controls autoPlay muted loop playsInline>
                          <source src={project.video} type="video/mp4" />
                          Your browser does not support the video tag.
                      </video>
                  ) : (
                      <div className="relative w-full h-64 md:h-96 bg-gray-900 rounded-lg overflow-hidden">
                          <Image src={project.image} alt={project.title} layout="fill" objectFit="contain" onError={(e) => { e.currentTarget.src = `https://placehold.co/800x400/1F2937/7DD3FC?text=Architecture`; }}/>
                      </div>
                  )}
                </div>
                
                <div className="p-6 md:p-8">
                     <p className="text-gray-300 leading-relaxed text-base">{project.longDescription}</p>
                    
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {project.metrics.map(metric => (
                            <div key={metric.label} className="bg-gray-900/70 p-4 rounded-lg flex items-center gap-4 border border-gray-700">
                                <div className="text-cyan-400">{metric.icon}</div>
                                <div>
                                    <div className="text-sm text-gray-400">{metric.label}</div>
                                    <div className="font-bold text-white text-lg">{metric.value}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8">
                         <h4 className="font-semibold text-white mb-3">Technologies Used:</h4>
                         <div className="flex flex-wrap gap-2">
                             {project.tags.map(tag => (
                                 <span key={tag} className="text-sm bg-gray-700 text-gray-300 px-3 py-1.5 rounded-md">{tag}</span>
                             ))}
                         </div>
                    </div>

                    <div className="mt-8 border-t border-gray-700 pt-6">
                       <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 text-gray-900 font-semibold rounded-lg shadow-lg hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105">
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
        className={`py-12 ${className}`}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-4 mb-10">
        {icon}
        <h2 className="text-3xl font-bold text-white tracking-tight">{title}</h2>
        <div className="h-px flex-grow bg-gray-700/50"></div>
      </div>
      {children}
    </motion.section>
  );
}
