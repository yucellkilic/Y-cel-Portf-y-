import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, X, Calendar, Plus, BarChart2, ShieldCheck, Zap } from 'lucide-react';
import { Project } from '../types';

interface ProjectShowcaseProps {
  onProjectChange: (index: number) => void;
}

export default function ProjectShowcase({ onProjectChange }: ProjectShowcaseProps) {
  const [activeProject, setActiveProject] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: "aether-engine",
      title: "AETHER PIPELINE ENGINE",
      category: "AUTONOMOUS SYSTEM LOGISTICS // GREEN GRID",
      description: "A super low-latency autonomous workflow core engineered to link decoupled corporate services. Processes over 1.4 million monthly web requests with zero systemic failures.",
      tech: ["TypeScript", "Node.js", "Redis", "Kafka", "Google Cloud Functions"],
      year: "2026",
      color: "#22c55e", // cyber green
      stats: [
        { label: "THROUGHPUT RATIO", value: "3,200 requests/sec" },
        { label: "LATENCY REDUCTION", value: "85% faster routes" },
        { label: "SECURITY AUDIT PASS", value: "99.999% secure uptime" }
      ],
      hologramType: 'sphere'
    },
    {
      id: "nebula-saas",
      title: "NEBULA WORKSPACE",
      category: "ENTERPRISE B2B SAAS COGNITIVE UNIT",
      description: "An elite, secure multi-tenant cloud operations dashboard letting teams synchronize distributed data vaults with zero-knowledge hardware-level encryption.",
      tech: ["React", "Tailwind 4", "Vite", "WebCrypto API", "PostgreSQL"],
      year: "2025",
      color: "#ffffff", // Pure cosmic white
      stats: [
        { label: "ENTERPRISE TENANTS", value: "240+ synchronized" },
        { label: "DATABASE INGEST FACTOR", value: "20GB/sec parallel stream" },
        { label: "ZERO LEAK RATING", value: "A+ certified vault" }
      ],
      hologramType: 'torus'
    },
    {
      id: "chronotech-systems",
      title: "CHRONOTECH DISPATCH ENGINE",
      category: "SERVERLESS TASK COORDINATOR // RED ZONE",
      description: "A self-healing distributed cron runner platform utilizing complex threaded pools to process heavy system commands, database cleanups, and automatic newsletter funnels on autopilot.",
      tech: ["Node.js", "Docker", "Express", "MongoDB", "RabbitMQ"],
      year: "2025",
      color: "#ef4444", // laser red
      stats: [
        { label: "CRON DISPATCH ACCURACY", value: "99.9999% on scheduled" },
        { label: "HEAL-BACK ACTION RATIO", value: "Self-caps in <15ms" },
        { label: "MEMORY PROFILE REDUCTS", value: "48% memory saved" }
      ],
      hologramType: 'wave'
    },
    {
      id: "omniai-workspace",
      title: "OMNI COGNITIVE SUITE",
      category: "VECTOR NEURAL MATRICES // HYBRID PIPELINE",
      description: "An AI Agent orchestrator utilizing deep context caching, automated context vectors, and fine-tuned predictive modeling layers to process massive CRM logs securely.",
      tech: ["Python", "TensorFlow", "FastAPI", "Pinecone VectorDB", "Gemini Pro"],
      year: "2026",
      color: "#22c55e", // cyber green
      stats: [
        { label: "TOKEN INGEST SPEED", value: "150k contexts/sec" },
        { label: "MODEL RESPONSE LATENCY", value: "Under 110ms flat speed" },
        { label: "REDUCTION IN CLIENT TICKETS", value: "-74% ticket overhead" }
      ],
      hologramType: 'dna'
    },
    {
      id: "luxor-studio",
      title: "LUXOR GRAPHIC LABS",
      category: "LUXURY DIGITAL ENGINE // RED ACCENT",
      description: "A stunning, GPU-accelerated immersive design container showcase presenting architectural real-estate graphics inside raw browser environments smoothly.",
      tech: ["HTML5 Canvas", "WebGL", "GSAP ScrollTrigger", "CSS Shaders", "Inter"],
      year: "2025",
      color: "#ef4444", // laser red
      stats: [
        { label: "RENDER SPEEDS", value: "Locked solid 60fps" },
        { label: "VISUAL SATISFACTION RATIO", value: "100% award score rating" },
        { label: "BANDWIDTH COMPRESSION", value: "-64% initial image weight" }
      ],
      hologramType: 'sphere'
    }
  ];

  const handleProjectHover = (index: number) => {
    setActiveProject(index);
    onProjectChange(index);
  };

  const getThemeHoverBadge = (color: string) => {
    if (color === '#22c55e') return 'group-hover:bg-green-400 group-hover:border-green-400';
    if (color === '#ef4444') return 'group-hover:bg-red-500 group-hover:border-red-500';
    return 'group-hover:bg-white group-hover:border-white';
  };

  return (
    <section 
      id="portal-projects-section" 
      className="relative min-h-screen w-full flex flex-col justify-center px-6 py-24 sm:px-12 md:py-32 overflow-hidden bg-[#030304]"
    >
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="max-w-7xl mx-auto w-full z-10 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b border-white/5 pb-8">
          <div className="space-y-3">
            <span className="font-mono text-[9px] text-green-400 tracking-[0.3em] uppercase block">PORTFOLIO WORKSCALE</span>
            <h2 className="font-heading text-4xl sm:text-5xl font-black tracking-tight text-white uppercase sm:leading-none">
              AWARDED CREATIONS
            </h2>
          </div>
          <p className="max-w-md font-sans text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
            A selective breakdown of elite digital engines built for scalable industries. Hover over each project node to align the backgrounds and system metrics.
          </p>
        </div>

        {/* Dynamic Project Showcasing Split-Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Interstellar Lists Hover Deck */}
          <div className="lg:col-span-6 flex flex-col gap-1.5">
            {projects.map((proj, idx) => {
              const worksActive = idx === activeProject;
              return (
                <div
                  id={`project-listing-card-${proj.id}`}
                  key={proj.id}
                  onMouseEnter={() => handleProjectHover(idx)}
                  onClick={() => setSelectedProject(proj)}
                  className={`group p-6 border rounded-xl cursor-pointer transition-all duration-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden ${
                    worksActive
                      ? 'bg-gradient-to-r from-black via-slate-950/20 to-black border-white/20 shadow-xl'
                      : 'bg-black/20 border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <span className="font-mono text-xs text-gray-500">0{idx + 1}</span>
                    <div className="flex flex-col">
                      <span className="font-sans text-base font-bold text-white tracking-tight">
                        {proj.title}
                      </span>
                      <span className="font-mono text-[9px] text-gray-500 uppercase mt-0.5 tracking-wider">
                        {proj.category}
                      </span>
                    </div>
                  </div>

                  {/* Tech stack bubbles on list */}
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] text-gray-400 border border-white/10 rounded px-2 py-0.5">
                      {proj.year}
                    </span>
                    <div className={`h-7 w-7 rounded-lg border border-white/10 flex items-center justify-center bg-white/5 group-hover:text-black transition-all ${getThemeHoverBadge(proj.color)}`}>
                      <Plus className="h-3.5 w-3.5 animate-pulse" />
                    </div>
                  </div>

                  {/* Active background glowing blur ball */}
                  {worksActive && (
                    <div 
                      className="absolute right-0 bottom-0 w-24 h-24 blur-3xl opacity-25 -z-10 rounded-full transition-all duration-500"
                      style={{ backgroundColor: proj.color }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Side: Micro Spec Monitor display */}
          <div className="lg:col-span-6">
            <div className="border border-white/10 rounded-xl bg-black/80 backdrop-blur pb-6 p-5 sm:p-7 relative select-none">
              
              {/* Dynamic corner markings */}
              <div className="absolute top-3 right-3 font-mono text-[8px] text-gray-500">DIAG_MATRIX_LOCK_v4</div>
              <div className="absolute top-0 left-0 w-8 h-px bg-green-400"></div>
              <div className="absolute top-0 left-0 w-px h-8 bg-green-400"></div>

              {/* Specs Header */}
              <div className="space-y-4 mb-6 border-b border-white/5 pb-4">
                <span className="font-mono text-[9px] uppercase tracking-widest text-green-400 block">ACTIVE NODE BENCHMARKS</span>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight uppercase">
                  {projects[activeProject].title}
                </h3>
              </div>

              {/* Specs Items Grid */}
              <div className="space-y-5">
                {projects[activeProject].stats.map((stat, i) => (
                  <div id={`spec-benchmark-item-${i}`} key={stat.label} className="space-y-1.5">
                    <div className="flex justify-between items-baseline font-mono text-[10px]">
                      <span className="text-gray-400 uppercase tracking-wider">{stat.label}</span>
                      <span className="text-white font-bold tracking-widest">{stat.value}</span>
                    </div>
                    <div className="w-full bg-white/5 h-[3px] rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: i === 0 ? '94%' : i === 1 ? '82%' : '100%',
                          backgroundColor: projects[activeProject].color 
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex gap-4">
                <button
                  id="project-blueprint-toggle"
                  onClick={() => setSelectedProject(projects[activeProject])}
                  className="flex-1 flex items-center justify-center gap-2 py-3 border border-green-400/30 bg-green-500/10 text-green-400 rounded-lg font-mono text-xs font-bold tracking-wider hover:bg-green-400 hover:text-black transition-all"
                >
                  Initiate Blueprint Specs
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* IMMERSIVE LUXURY FULLSCREEN DRAWERS FOR BLUEPRINT SPECIFICATIONS */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            id="fullscreen-blueprint-drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#030304]/95 backdrop-blur-2xl flex items-center justify-end pointer-events-auto"
          >
            {/* Ambient Back Glow Backdrop */}
            <div 
              className="absolute left-1/4 top-1/4 w-[450px] h-[450px] rounded-full blur-[220px] opacity-20 -z-10 transition-all duration-500"
              style={{ backgroundColor: selectedProject.color }}
            />

            {/* Content panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className="w-full max-w-2xl h-full border-l border-white/10 bg-black/90 p-8 sm:p-12 overflow-y-auto flex flex-col justify-between relative animate-fade-in"
            >
              
              <div>
                <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-green-400" />
                    <span className="font-mono text-xs text-gray-400">PROJECT CORE MATRIX // EST. {selectedProject.year}</span>
                  </div>
                  <button
                    id="close-blueprint-drawer"
                    onClick={() => setSelectedProject(null)}
                    className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-green-400 hover:text-green-400 transition-colors cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-8">
                  <div className="space-y-3">
                    <span className="font-mono text-xs text-green-400 uppercase tracking-widest">{selectedProject.category}</span>
                    <h2 className="font-heading text-4xl sm:text-5xl font-black text-white tracking-tight uppercase leading-none">
                      {selectedProject.title}
                    </h2>
                  </div>

                  <p className="font-sans text-base sm:text-lg text-gray-300 font-light leading-relaxed">
                    {selectedProject.description}
                  </p>

                  {/* Benchmark Performance Widgets */}
                  <div className="space-y-4">
                    <span className="block font-mono text-[9px] text-gray-500 uppercase">SYSTEM METRIC READINGS</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {selectedProject.stats.map((stat, i) => (
                        <div id={`drawer-spec-badge-${i}`} key={stat.label} className="p-4 border border-white/10 bg-black rounded-xl flex flex-col justify-between">
                          <span className="font-mono text-[9px] text-gray-500 tracking-wider uppercase mb-3 block">{stat.label}</span>
                          <span className="font-sans text-lg font-bold text-white tracking-tight">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech stack highlights */}
                  <div className="space-y-3">
                    <span className="block font-mono text-[9px] text-gray-500 uppercase">APPLIED SOFTWARE INFRASTRUCTURE</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((tc) => (
                        <span 
                          key={tc} 
                          className="font-mono text-[10px] text-green-400 px-3 py-1.5 rounded-lg border border-green-500/20 bg-green-500/5 hover:bg-green-400 hover:text-black transition-colors"
                        >
                          {tc}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Simulated system execution blocks */}
                  <div className="space-y-3">
                    <span className="block font-mono text-[9px] text-gray-500 uppercase">CORE STACK BOOT CHRONICLE</span>
                    <div className="rounded-xl bg-[#07070a] border border-white/5 p-4 font-mono text-[10px] text-green-400/90 leading-relaxed overflow-x-auto space-y-1">
                      <div>&gt; initialize_project_vector --id {selectedProject.id}</div>
                      <div className="text-gray-500">[TRACE] Syncing secure core memory blocks... (14ms)</div>
                      <div className="text-gray-500">[TRACE] Encrypted tenant clusters detected...</div>
                      <div className="text-green-400">&gt; SUCCESS_VECTOR: system compiled cleanly under standard parameters.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form buttons */}
              <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4">
                <button
                  id="drawer-collab-trigger"
                  onClick={() => {
                    setSelectedProject(null);
                    const el = document.getElementById('contact-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-4 bg-white text-black font-mono text-xs font-bold tracking-widest uppercase rounded-xl hover:bg-green-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all"
                >
                  COLLABORATE ON CORES
                  <ArrowUpRight className="h-4 w-4" />
                </button>
                <button
                  id="drawer-dismiss-trigger"
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-4 border border-white/10 text-white rounded-xl font-mono text-xs uppercase tracking-widest hover:bg-white/[0.05] transition-colors"
                >
                  DISMISS NODE
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
