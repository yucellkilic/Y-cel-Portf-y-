import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Play, RotateCcw, Activity, ShieldAlert, Cpu, HardDrive } from 'lucide-react';

export default function Interactive3DExperience() {
  const [fps, setFps] = useState(59.8);
  const [gravityState, setGravityState] = useState<'attract' | 'repel' | 'orbit'>('repel');

  // Live frame latency feedback updates
  useEffect(() => {
    const timer = setInterval(() => {
      setFps(60.0 - Math.random() * 0.4);
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      id="3d-sandbox-section" 
      className="relative min-h-screen w-full flex flex-col justify-center px-6 py-24 sm:px-12 md:py-32 overflow-hidden bg-gradient-to-b from-[#030304]/60 via-[#07070a]/90 to-[#030304]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center z-10">
        
        {/* Left Side: Heavy Holographic Narrative Panel */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse"></span>
            <span className="font-mono text-[9px] tracking-[0.3em] text-green-400 uppercase">
              MODULE 04 // WEBGL PARTICLE SYSTEM
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h2 className="font-heading text-4xl sm:text-6xl font-black tracking-tight text-white uppercase leading-none">
              HOLOGRAM MATRIX <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-white to-red-500">
                SANDBOX SPACE
              </span>
            </h2>

            <p className="font-sans text-sm sm:text-base text-gray-400 leading-relaxed font-light">
              This space functions as a GPU-accelerated workspace rendering mathematically structured vertices. These modules calculate 3D geometric transformations in real-time, corresponding to your mouse coordinates and active scroll speeds. 
            </p>

            <p className="font-sans text-xs sm:text-sm text-gray-500 leading-relaxed font-light">
              Use the tactile overlay cockpit on the bottom-left to adjust variables, modify movement speed, choose distinct neon presets, or trigger particle system modifications dynamically.
            </p>
          </motion.div>

          {/* Interactive Simulation Controls */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              id="gravity-attract-button"
              onClick={() => {
                setGravityState('attract');
                const sl = document.getElementById('speed-control-slider') as HTMLInputElement;
                if (sl) sl.value = "1.8";
              }}
              className={`flex items-center justify-center gap-2 font-mono text-[10px] tracking-widest uppercase px-5 py-3 rounded-full border transition-all duration-300 ${
                gravityState === 'attract'
                  ? 'bg-green-400 text-black border-green-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]'
                  : 'bg-white/5 text-gray-400 border-white/5 hover:border-white/15'
              }`}
            >
              Attract Nodes
            </button>
            <button
              id="gravity-repel-button"
              onClick={() => {
                setGravityState('repel');
                const sl = document.getElementById('speed-control-slider') as HTMLInputElement;
                if (sl) sl.value = "0.7";
              }}
              className={`flex items-center justify-center gap-2 font-mono text-[10px] tracking-widest uppercase px-5 py-3 rounded-full border transition-all duration-300 ${
                gravityState === 'repel'
                  ? 'bg-red-500 text-white border-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                  : 'bg-white/5 text-gray-400 border-white/5 hover:border-white/15'
              }`}
            >
              Repel Nodes
            </button>
            <button
              id="gravity-orbit-button"
              onClick={() => {
                setGravityState('orbit');
                const sl = document.getElementById('speed-control-slider') as HTMLInputElement;
                if (sl) sl.value = "1.0";
              }}
              className={`flex items-center justify-center gap-2 font-mono text-[10px] tracking-widest uppercase px-5 py-3 rounded-full border transition-all duration-300 ${
                gravityState === 'orbit'
                  ? 'bg-white text-black border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                  : 'bg-white/5 text-gray-400 border-white/5 hover:border-white/15'
              }`}
            >
              System Reset
            </button>
          </div>
        </div>

        {/* Right Side: Aerospace HUD Dashboard HUD */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Live Telemetry Card */}
          <div className="border border-white/5 rounded-xl bg-black/50 p-5 backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
              <span className="font-mono text-[9px] text-gray-500 uppercase">SYSTEM DIAGNOSTICS</span>
              <Activity className="h-3.5 w-3.5 text-green-400 animate-pulse" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between font-mono text-xs">
                <span className="text-gray-400">FRAME RATENCY</span>
                <span className="text-white font-bold">{fps.toFixed(1)} FPS</span>
              </div>
              <div className="w-full bg-white/5 h-[3px] rounded-full overflow-hidden">
                <div className="h-full bg-green-400 rounded-full" style={{ width: '99%' }}></div>
              </div>

              <div className="flex justify-between font-mono text-xs">
                <span className="text-gray-400">ACTIVE VERTICES</span>
                <span className="text-green-400">STABLE CORE</span>
              </div>
              <div className="flex justify-between font-mono text-xs">
                <span className="text-gray-400">BUFFER PIPELINE</span>
                <span className="text-red-400 font-semibold">GPU SECURE</span>
              </div>
            </div>
          </div>

          {/* Engine Health Card */}
          <div className="border border-white/5 rounded-xl bg-black/50 p-5 backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
              <span className="font-mono text-[9px] text-gray-500 uppercase">HOLOGRAPH ENGINE CORE</span>
              <Cpu className="h-3.5 w-3.5 text-red-500" />
            </div>

            <div className="space-y-2 font-mono text-[10px] text-gray-400">
              <div className="flex justify-between">
                <span>COORD SYNCS:</span>
                <span className="text-white">STABLE</span>
              </div>
              <div className="flex justify-between">
                <span>Z-DEPTH SHADING:</span>
                <span className="text-white">ACTIVE (FOG 0.28)</span>
              </div>
              <div className="flex justify-between">
                <span>BLOOM GLOW:</span>
                <span className="text-green-400">COMPILER_PASS</span>
              </div>
              <div className="flex justify-between">
                <span>QUANTUM SYNC:</span>
                <span className="text-red-400">MUTABLE</span>
              </div>
            </div>
          </div>

          {/* Graphic Waves simulated via SVGs */}
          <div className="sm:col-span-2 border border-white/5 rounded-xl bg-black/40 p-5 backdrop-blur-md">
            <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
              <span className="font-mono text-[9px] text-gray-500 uppercase">SPECTRUM DEVIATION OSCILLOSCOPE</span>
              <span className="font-mono text-[9px] text-green-400">SECURE FREQ LEVEL</span>
            </div>
            
            <svg viewBox="0 0 400 60" className="w-full h-12 stroke-green-400 stroke-[1.5] fill-none">
              <path d="M 0,30 Q 20,45 40,30 T 80,30 T 120,30 T 160,30 T 200,30 T 240,15 T 280,45 T 320,30 T 360,30 T 400,30" className="animate-pulse" />
              <path d="M 0,30 Q 20,15 40,30 T 80,30 T 120,45 T 160,15 T 200,30 T 240,30 T 280,30 T 320,45 T 360,15 T 400,30" className="opacity-30 stroke-red-500" />
            </svg>
          </div>

        </div>

      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
    </section>
  );
}
