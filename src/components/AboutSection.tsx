import React from 'react';
import { motion } from 'motion/react';
import { Shield, Settings, Zap, Terminal, Plus, Cpu, Code2 } from 'lucide-react';

export default function AboutSection() {
  const identityStats = [
    { label: "AUTOMATION EFFICIENCY", val: "99.8%", desc: "Error-free systemic scripts", highlightColor: "green" },
    { label: "AI PIPELINE STREAMING", val: "12X", desc: "Data processing speedup factor", highlightColor: "white" },
    { label: "ELITE PROJECTS CONSTRUCTED", val: "40+", desc: "Custom SaaS & custom designer platforms", highlightColor: "red" },
    { label: "AVERAGE LOAD TIMINGS", val: "0.24s", desc: "Optimized client side visual builds", highlightColor: "green" }
  ];

  return (
    <section 
      id="about-section" 
      className="relative min-h-screen w-full flex flex-col justify-center px-6 py-24 sm:px-12 md:py-32 overflow-hidden bg-gradient-to-b from-transparent via-[#040406]/50 to-transparent"
    >
      {/* Structural blueprint visual lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center z-10">
        
        {/* Left Side: Elegant Kinetic Storytelling */}
        <div className="lg:col-span-7 space-y-8">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] text-green-400 border border-green-500/30 px-2.5 py-1 rounded bg-green-400/5 tracking-widest uppercase">
              BIOMETRIC IDENTITY DETECTED
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="font-heading text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              REDEFINING DATA DEVIATION WITH <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-white to-red-500">
                COGNITIVE SYSTEMS
              </span>
            </h2>

            <p className="font-sans text-base sm:text-lg text-gray-300 font-light leading-relaxed">
              Yücel Kılıç operates at the rare intersection of highly conceptual visual aesthetics and hard-bitten automation engineering. As a creative developer and SaaS engineer, he constructs systems that translate complex business ideas into seamless digital realities.
            </p>

            <blockquote className="border-l-2 border-green-400 pl-6 my-6 font-mono text-xs text-gray-400 uppercase leading-loose tracking-wide">
              "We do not build simple software. We implement autonomous digital engines that execute with elite precision and beautiful layout choreography."
            </blockquote>

            <p className="font-sans text-sm text-gray-400 leading-relaxed font-light">
              By combining cutting-edge AI pipelines with robust serverless microservices, Yücel constructs digital tools that automate the tedious, empower the creative, and deliver breathtaking interactive user experiences. Standard development is dead; adaptive engineering rules.
            </p>
          </motion.div>

          {/* Quick HUD Terminal Output */}
          <div className="border border-white/5 rounded-xl bg-black/60 p-5 font-mono text-xs text-gray-400 space-y-2 max-w-xl shadow-inner backdrop-blur">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2 text-[10px] text-red-400">
              <span className="flex items-center gap-2"><Terminal className="h-3 w-3" /> HOST_TERMINAL_SESSION</span>
              <span className="text-green-400">STATE: ACTIVE</span>
            </div>
            <div className="text-green-400/90">&gt; npm run boot:cognitive-intelligence</div>
            <div>[OK] Loading pipeline models... (740ms)</div>
            <div>[OK] Establishing neural grid connection...</div>
            <div className="text-white">&gt; status: Yücel is fully operational and coding your vision.</div>
          </div>
        </div>

        {/* Right Side: Interactive Holographic Status Modules */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {identityStats.map((stat, i) => (
            <motion.div
              id={`identity-stat-card-${i}`}
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ 
                y: -5, 
                borderColor: stat.highlightColor === 'green' ? 'rgba(34,197,94,0.4)' : stat.highlightColor === 'red' ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.4)' 
              }}
              className="group relative p-5 rounded-xl border border-white/5 bg-black/40 backdrop-blur-md transition-all duration-300 cursor-pointer"
            >
              {/* Dynamic corner accents to make it look highly futuristic */}
              <Plus className={`absolute top-0 right-0 h-3.5 w-3.5 text-white/10 group-hover:rotate-90 transition-all ${
                stat.highlightColor === 'green' ? 'group-hover:text-green-400' : stat.highlightColor === 'red' ? 'group-hover:text-red-500' : 'group-hover:text-white'
              }`} />
              <Plus className={`absolute bottom-0 left-0 h-3.5 w-3.5 text-white/10 group-hover:rotate-90 transition-all ${
                stat.highlightColor === 'green' ? 'group-hover:text-green-400' : stat.highlightColor === 'red' ? 'group-hover:text-red-500' : 'group-hover:text-white'
              }`} />
              
              <div className="font-mono text-[9px] text-gray-500 tracking-wider mb-2 uppercase group-hover:text-white transition-colors">
                {stat.label}
              </div>
              <div className={`font-sans text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight group-hover:scale-105 origin-left transition-transform duration-300 ${
                stat.highlightColor === 'green' ? 'text-green-400' : stat.highlightColor === 'red' ? 'text-red-400' : 'text-white'
              }`}>
                {stat.val}
              </div>
              <p className="font-mono text-[10px] text-gray-400 leading-normal">
                {stat.desc}
              </p>
            </motion.div>
          ))}

          {/* Bonus blueprint diagnostic ring */}
          <div className="sm:col-span-2 border border-white/5 rounded-xl bg-gradient-to-r from-green-950/10 to-red-950/10 p-5 flex items-center justify-between gap-6 backdrop-blur">
            <div className="space-y-1">
              <span className="font-mono text-[9px] text-green-400 tracking-widest block">INTELLIGENT PROCESS ENGINE</span>
              <p className="text-xs text-gray-400">Autonomous workflow networks synced globally via high-performance script handlers.</p>
            </div>
            <div className="relative h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-full border-2 border-dashed border-red-500/40 animate-spin-slow">
              <Code2 className="h-5 w-5 text-red-500 animate-pulse" />
            </div>
          </div>

        </div>

      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    </section>
  );
}
