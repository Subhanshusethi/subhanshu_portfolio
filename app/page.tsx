"use client";

import { useState, useEffect, ReactNode, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, Download, BrainCircuit, Eye, Code, Bot, Briefcase, Star, X, Zap, Target, Trophy, BookOpen, ChevronsRight, Video, ExternalLink, MapPin, Calendar } from 'lucide-react';

// --- TYPE DEFINITIONS ---
interface SectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
  id?: string;
  noTopPad?: boolean;
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
  },
  {
    title: "Optimized Object Pose Estimation Pipeline",
    shortDescription: "Real-time RGB-D vision pipeline for trolley detection and 3D pose estimation on CPU-only edge hardware.",
    longDescription: "Developed a real-time RGB-D vision pipeline for trolley detection and 3D pose estimation using YOLO (ONNX) in C++/ROS. Deployed on CPU-only edge hardware (Intel NUC), achieving stable 10–30 Hz inference for autonomous robotic alignment. The pipeline is optimized for low-latency, high-reliability performance in industrial environments.",
    image: "/assets/images/optipose.png",
    tags: ["YOLO", "ONNX", "C++", "ROS", "RGB-D", "Pose Estimation", "Intel NUC"],
    link: "https://github.com/Subhanshusethi/Object_Detection_PoseEstimation",
    status: "Nov 2025 – Feb 2026",
    metrics: [{ label: "Inference", value: "10–30 Hz", icon: <Zap size={16} /> }, { label: "Hardware", value: "CPU-Only Edge", icon: <Target size={16} /> }],
  },
  {
    title: "Scratch Detection – ML Deployment",
    shortDescription: "End-to-end automated ML pipeline with FastAPI, Docker, MLflow, and AWS deployment.",
    longDescription: "Designed an automated ML pipeline using FastAPI, Docker, and MLflow, integrating training, experiment tracking, and CI/CD. Deployed the containerized stack on AWS EC2 with Dockerized FastAPI services and S3-based dataset handling, enabling scalable and reproducible model deployment for scratch detection classification.",
    image: "/assets/images/scratch.png",
    tags: ["FastAPI", "Docker", "MLflow", "AWS EC2", "S3", "CI/CD", "Python"],
    link: "https://github.com/Subhanshusethi/classification-deploy",
    status: "Aug 2025 – Sept 2025",
    metrics: [{ label: "Infra", value: "AWS EC2 + S3", icon: <Trophy size={16} /> }, { label: "Stack", value: "FastAPI + MLflow", icon: <Code size={16} /> }],
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
  const [activeSection, setActiveSection] = useState('home');
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, 80]);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const sections = ['home', 'projects', 'experience', 'publications', 'skills'];
      const current = sections.find(id => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom > 120;
      }) || 'home';
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#080c14] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-t-cyan-400 border-cyan-400/20 animate-spin" />
      </div>
    );
  }

  const navItems = [
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'publications', label: 'Research' },
    { id: 'skills', label: 'Skills' },
  ];

  return (
    <div className="min-h-screen bg-[#080c14] text-gray-300 antialiased selection:bg-cyan-500/30 selection:text-white">

      {/* Ambient background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="absolute top-1/2 -right-60 w-[500px] h-[500px] rounded-full bg-violet-500/5 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-cyan-400/3 blur-[100px]" />
      </div>

      {/* Sticky Nav */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="fixed top-0 left-0 right-0 z-40 flex justify-center py-4 px-6"
      >
        <div className="flex items-center gap-1 bg-gray-900/70 backdrop-blur-xl border border-white/[0.08] rounded-full px-3 py-2 shadow-xl">
          {navItems.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${activeSection === item.id
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                : 'text-gray-400 hover:text-white'
                }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/SubhanshuCV.pdf"
            download
            className="ml-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-cyan-500 text-gray-900 hover:bg-cyan-400 transition-colors flex items-center gap-1.5"
          >
            <Download size={13} /> Resume
          </a>
        </div>
      </motion.nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HERO */}
        <motion.section
          id="home"
          ref={heroRef}
          style={{ opacity: heroOpacity, y: heroY }}
          className="min-h-screen flex items-center py-24 pt-32"
        >
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 w-full">

            {/* Text side */}
            <div className="flex-1 text-center md:text-left order-2 md:order-1">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-cyan-400 text-sm font-semibold tracking-[0.2em] uppercase mb-4"
              >
                Welcome, I&apos;m
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-5xl lg:text-7xl font-bold text-white tracking-tight leading-none"
              >
                Subhanshu
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
                  Sethi
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-5 text-lg text-gray-400 font-light max-w-lg mx-auto md:mx-0 leading-relaxed"
              >
                AI Engineer building systems that{' '}
                <span className="text-white font-medium">see, reason, and act</span>
                {' '}— from multimodal research to production robotics.
              </motion.p>

              {/* Highlight chips */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="mt-8 flex flex-wrap gap-2.5 justify-center md:justify-start"
              >
                {[
                  { icon: <Trophy size={13} />, text: '3rd Place — IMAV 2023, Germany' },
                  { icon: <Star size={13} />, text: 'IJCNN 2025 Publication' },
                  { icon: <Target size={13} />, text: 'Top 10 / 19k+ — Flipkart Grid' },
                ].map(chip => (
                  <span key={chip.text} className="inline-flex items-center gap-2 text-xs text-gray-400 bg-gray-800/60 border border-gray-700/60 px-3 py-1.5 rounded-full">
                    <span className="text-cyan-400">{chip.icon}</span>
                    {chip.text}
                  </span>
                ))}
              </motion.div>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="mt-8 flex items-center gap-3 justify-center md:justify-start"
              >
                <a href="https://github.com/subhanshusethi" target="_blank" rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-gray-800/60 border border-gray-700/60 text-gray-400 hover:text-white hover:border-gray-500 transition-all">
                  <Github size={18} />
                </a>
                <a href="https://www.linkedin.com/in/subhanshusethi/" target="_blank" rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-gray-800/60 border border-gray-700/60 text-gray-400 hover:text-white hover:border-gray-500 transition-all">
                  <Linkedin size={18} />
                </a>
                <a href="mailto:sethisubhanshu@gmail.com"
                  className="p-2.5 rounded-xl bg-gray-800/60 border border-gray-700/60 text-gray-400 hover:text-white hover:border-gray-500 transition-all">
                  <Mail size={18} />
                </a>
                <span className="w-px h-6 bg-gray-700 mx-1" />
                <a href="#projects" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors">
                  View my work <ChevronsRight size={15} />
                </a>
              </motion.div>
            </div>

            {/* Photo side */}
            <motion.div
              className="order-1 md:order-2 flex-shrink-0"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/25 to-violet-400/15 blur-2xl scale-110" />
                <div className="relative w-52 h-52 lg:w-64 lg:h-64 rounded-full overflow-hidden border border-white/10 shadow-2xl">
                  <Image
                    src="/assets/images/headshot.jpg"
                    alt="Subhanshu Sethi"
                    layout="fill"
                    objectFit="cover"
                    className="hover:scale-105 transition-transform duration-700"
                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/300x300/111827/7DD3FC?text=S.S'; }}
                  />
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap inline-flex items-center gap-1.5 text-xs text-gray-300 bg-gray-900 border border-gray-700 px-3 py-1.5 rounded-full shadow-lg">
                  <MapPin size={11} className="text-cyan-400" /> Delhi, India · Open to Work
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* PROJECTS */}
        <Section id="projects" title="Featured Projects" icon={<Eye className="text-cyan-400" size={22} />}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projectsData.map((project, i) => (
              <motion.div
                key={project.title}
                layoutId={`project-card-${project.title}`}
                onClick={() => setSelectedProject(project)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="group relative bg-gray-900/60 rounded-2xl border border-white/[0.06] cursor-pointer overflow-hidden hover:border-cyan-500/40 transition-all duration-300"
                whileHover={{ y: -4 }}
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-105 transition-transform duration-500 brightness-75 group-hover:brightness-90"
                    onError={(e) => { e.currentTarget.src = `https://placehold.co/400x225/0f172a/7DD3FC?text=${encodeURIComponent(project.title)}`; }}
                  />
                  <span className="absolute top-3 right-3 text-[11px] bg-black/60 backdrop-blur-sm text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                    {project.status}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-semibold text-white text-base leading-snug group-hover:text-cyan-300 transition-colors">{project.title}</h3>
                  <p className="mt-2 text-gray-500 text-sm leading-relaxed flex-grow">{project.shortDescription}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[11px] bg-gray-800 text-gray-400 px-2.5 py-0.5 rounded-md border border-gray-700/60">{tag}</span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-[11px] text-gray-600 px-2 py-0.5">+{project.tags.length - 3}</span>
                    )}
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-cyan-400 to-violet-400 group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </Section>

        <AnimatePresence>
          {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
        </AnimatePresence>

        {/* EXPERIENCE */}
        <Section id="experience" title="Professional Experience" icon={<Briefcase className="text-cyan-400" size={22} />}>
          <div className="space-y-5">
            {experienceData.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative bg-gray-900/50 rounded-2xl border border-white/[0.06] p-6 md:p-8 hover:border-gray-600/50 transition-colors overflow-hidden"
              >
                <div className="absolute left-0 top-5 bottom-5 w-[3px] rounded-full bg-gradient-to-b from-cyan-400 to-violet-400 opacity-50" />
                <div className="ml-5 md:flex md:items-start md:justify-between gap-4">
                  <div>
                    <h3 className="text-base font-semibold text-white">{exp.role}</h3>
                    <p className="text-cyan-400 text-sm mt-0.5">{exp.company}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-800 border border-gray-700 px-3 py-1 rounded-full mt-2 md:mt-0 flex-shrink-0">
                    <Calendar size={11} /> {exp.date}
                  </span>
                </div>
                <p className="ml-5 mt-3 text-gray-400 text-sm leading-relaxed">{exp.description}</p>
                <ul className="ml-5 mt-4 space-y-2">
                  {exp.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-cyan-400/50 flex-shrink-0" />
                      <span className="text-gray-400 text-sm leading-relaxed">
                        {point.text}
                        {point.links && (
                          <span className="ml-2 inline-flex items-center gap-2">
                            <a href={point.links.github} target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:text-cyan-300 text-xs font-medium inline-flex items-center gap-1 transition-colors">
                              <Github size={11} /> GitHub
                            </a>
                            <a href={point.links.video} target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:text-cyan-300 text-xs font-medium inline-flex items-center gap-1 transition-colors">
                              <Video size={11} /> Demo
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

        {/* PUBLICATIONS + ACHIEVEMENTS */}
        <div id="publications" className="grid md:grid-cols-2 gap-6 pb-12">
          <Section title="Research & Publications" icon={<BookOpen className="text-cyan-400" size={22} />} noTopPad>
            <div className="space-y-4">
              {publicationsData.map((pub, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-900/50 p-5 rounded-2xl border border-white/[0.06] hover:border-gray-600/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-medium text-white text-sm leading-snug">{pub.title}</p>
                    <span className={`flex-shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${pub.status === 'Accepted' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' : 'text-amber-400 bg-amber-500/10 border-amber-500/30'}`}>
                      {pub.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">{pub.journal}</p>
                </motion.div>
              ))}
            </div>
          </Section>

          <Section title="Achievements" icon={<Trophy className="text-cyan-400" size={22} />} noTopPad>
            <div className="space-y-4">
              {achievementsData.map((ach, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-900/50 p-5 rounded-2xl border border-white/[0.06] hover:border-gray-600/50 transition-colors flex items-center gap-4"
                >
                  <div className="text-2xl flex-shrink-0">{ach.icon}</div>
                  <div>
                    <p className="font-medium text-white text-sm">{ach.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{ach.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>

        {/* SKILLS */}
        <Section id="skills" title="Technical Skills" icon={<Code className="text-cyan-400" size={22} />}>
          <div className="space-y-8">
            {Object.entries(skillsData).map(([category, skills], ci) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.1 }}
              >
                <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500 mb-3">{category}</p>
                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => (
                    <span key={skill} className="text-sm text-gray-300 bg-gray-800/70 border border-gray-700/60 px-4 py-1.5 rounded-lg hover:border-cyan-500/40 hover:text-white transition-colors cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.06] mt-8">
        <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">© 2026 Subhanshu Sethi</p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/subhanshusethi" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-300 transition-colors"><Github size={16} /></a>
            <a href="https://www.linkedin.com/in/subhanshusethi/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-300 transition-colors"><Linkedin size={16} /></a>
            <a href="mailto:sethisubhanshu@gmail.com" className="text-gray-600 hover:text-gray-300 transition-colors"><Mail size={16} /></a>
          </div>
        </div>
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
      className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        layoutId={`project-card-${project.title}`}
        className="bg-[#0e1420] border border-white/[0.08] rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 md:p-8 sticky top-0 bg-[#0e1420]/90 backdrop-blur-sm z-10 border-b border-white/[0.06]">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white leading-snug">{project.title}</h2>
              <span className="mt-2 inline-block text-xs font-medium text-cyan-400 bg-cyan-500/10 border border-cyan-500/25 px-3 py-1 rounded-full">{project.status}</span>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl text-gray-500 hover:text-white hover:bg-gray-800 transition-all flex-shrink-0">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Media */}
        <div className="px-6 md:px-8 pt-6">
          {project.video ? (
            <video className="w-full h-auto rounded-2xl border border-white/[0.06]" controls autoPlay muted loop playsInline>
              <source src={project.video} type="video/mp4" />
            </video>
          ) : (
            <div className="relative w-full h-56 md:h-80 bg-gray-900/80 rounded-2xl overflow-hidden border border-white/[0.06]">
              <Image src={project.image} alt={project.title} layout="fill" objectFit="contain"
                onError={(e) => { e.currentTarget.src = `https://placehold.co/800x400/0f172a/7DD3FC?text=Preview`; }} />
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-6 md:p-8">
          <p className="text-gray-400 leading-relaxed text-sm">{project.longDescription}</p>

          {/* Metrics */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            {project.metrics.map(metric => (
              <div key={metric.label} className="bg-gray-900/60 border border-white/[0.06] p-4 rounded-xl flex items-center gap-3">
                <div className="text-cyan-400">{metric.icon}</div>
                <div>
                  <div className="text-xs text-gray-500">{metric.label}</div>
                  <div className="font-semibold text-white text-sm mt-0.5">{metric.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-6">
            <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-3">Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="text-xs bg-gray-800 text-gray-400 border border-gray-700/60 px-3 py-1 rounded-lg">{tag}</span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 pt-6 border-t border-white/[0.06]">
            <a href={project.link} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-900 font-semibold text-sm rounded-xl hover:bg-gray-100 transition-colors">
              <Github size={16} /> View on GitHub <ExternalLink size={13} className="text-gray-500" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// --- REUSABLE SECTION COMPONENT ---
function Section({ title, icon, children, className, id, noTopPad }: SectionProps) {
  return (
    <motion.section
      id={id}
      className={`${noTopPad ? 'pb-0' : 'py-12'} ${className ?? ''}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-3 mb-8">
        {icon}
        <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
        <div className="h-px flex-grow bg-gradient-to-r from-gray-700/80 to-transparent" />
      </div>
      {children}
    </motion.section>
  );
}
