import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Cpu, Sparkles, Binary } from 'lucide-react';

interface HeroSectionProps {
  onScrollClick: () => void;
}

export default function HeroSection({ onScrollClick }: HeroSectionProps) {
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cinematic initial luxury counting loader
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (loadingPercent < 100) {
      timer = setTimeout(() => {
        setLoadingPercent(prev => Math.min(100, prev + Math.floor(Math.random() * 15) + 5));
      }, 55);
    } else {
      setIsLoaded(true);
    }
    return () => clearTimeout(timer);
  }, [loadingPercent]);

  return (
    <section 
      id="hero-section" 
      className="relative min-h-screen w-full flex flex-col justify-between px-6 py-24 sm:px-12 sm:py-32 overflow-hidden"
    >
      {/* Cyber-Grid Overlay System */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      {/* Luxury Loading Transition Screen */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 bg-[#030304] flex flex-col justify-between p-8 sm:p-16">
          <div className="flex justify-between font-mono text-[9px] tracking-[0.3em] text-gray-500">
            <span>YÜCEL KILIÇ // DIRECT SERVICES</span>
            <span>INITIALIZING ENGINE CORE</span>
          </div>

          <div className="flex flex-col gap-6 max-w-xl">
            <h1 className="font-heading text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-none">
              CRAFTING<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-white to-red-500">
                THE NEXT SYSTEM
              </span>
            </h1>
            <p className="font-mono text-[11px] text-gray-400 leading-relaxed uppercase tracking-wider">
              Preparing high-fidelity 3D projection mathematical matrices, audio-wave spatializer nodes, and interactive environments.
            </p>
          </div>

          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-2">
              <div className="h-[2px] w-48 bg-white/5 relative overflow-hidden">
                <div 
                  className="absolute left-0 top-0 h-full bg-green-400 transition-all duration-300"
                  style={{ width: `${loadingPercent}%` }}
                />
              </div>
              <span className="font-mono text-[10px] text-gray-500 tracking-widest uppercase">
                LOAD SYNCING STATE
              </span>
            </div>
            <div className="font-mono text-5xl sm:text-7xl font-bold tracking-tight text-white select-none">
              {loadingPercent}%
            </div>
          </div>
        </div>
      )}

      {/* Top Margin Note */}
      <div className="w-full flex justify-between items-start pointer-events-none z-10">
        <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 border border-white/5 rounded-full bg-white/[0.02] backdrop-blur-md">
          <Cpu className="h-3.5 w-3.5 text-green-400 animate-spin-slow" />
          <span className="font-mono text-[9px] tracking-widest text-green-400 uppercase">
            AESTHETIC DEVIATION v3.14
          </span>
        </div>
        <div className="font-mono text-[9px] tracking-widest text-right text-gray-500 leading-relaxed uppercase">
          [ SPATIAL NODE POSITION ]<br />
          LATENCY: 14MS // BUILT TO CONSOLE
        </div>
      </div>

      {/* Massive Cinematic Visual Headline Grouping */}
      <div className="my-auto max-w-5xl z-10">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400"></span>
            <span className="font-mono text-[10px] tracking-[0.3em] text-green-400 uppercase">
              CREATIVE DEVELOPER & AUTOMATION ARCHITECT
            </span>
          </div>

          <h1 className="font-heading text-6xl sm:text-8xl md:text-[9.5rem] font-black tracking-tight text-white leading-[0.85] selection:bg-green-500 selection:text-black">
            YÜCEL<br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-neutral-400"> KILIÇ</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6">
            <p className="md:col-span-6 font-sans text-sm sm:text-base text-gray-300 leading-relaxed font-light">
              Engineering high-fidelity visual interfaces, serverless microservice automations, scalable SaaS products, and custom AI ecosystems. We bypass standard solutions to craft award-worthy experiences.
            </p>
            
            <div className="md:col-span-6 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[11px] text-gray-400 uppercase">
              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-green-400" />
                <span>Premium Web Design</span>
              </div>
              <div className="flex items-center gap-2">
                <Binary className="h-3.5 w-3.5 text-white" />
                <span>Next-Gen Automations</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="h-3.5 w-3.5 text-red-500" />
                <span>Advanced AI Integration</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Interactive Meta Tray */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-white/5 pt-8 z-10">
        <div className="flex gap-12 text-left font-mono">
          <div>
            <span className="block text-gray-500 text-[9px] tracking-wider">AVAILABLE FOR</span>
            <span className="text-white text-[11px] tracking-widest font-bold">ELITE COLLABORATION</span>
          </div>
          <div>
            <span className="block text-gray-500 text-[9px] tracking-wider">PRIMARY LOCATION</span>
            <span className="text-white text-[11px] tracking-widest font-bold">ISTANBUL / REMOTE</span>
          </div>
        </div>

        {/* Floating Scroll Initiator */}
        <motion.button
          id="hero-scroll-trigger"
          onClick={onScrollClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          data-cursor-tag="SCROLL DOWN"
          className="flex items-center gap-4 px-6 py-4 rounded-full border border-white/10 hover:border-green-400 group transition-all duration-300 bg-black/60 backdrop-blur-md"
        >
          <span className="font-mono text-[9px] text-gray-400 group-hover:text-green-400 tracking-widest uppercase transition-colors">
            ENTERING THE REALM
          </span>
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white text-black group-hover:bg-green-400 transition-colors">
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </div>
        </motion.button>
      </div>
    </section>
  );
}
