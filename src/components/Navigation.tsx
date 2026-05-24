import React, { useEffect, useState, useRef } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { ActiveScene } from '../types';

interface NavigationProps {
  currentScene: ActiveScene;
  onNavigate: (scene: ActiveScene) => void;
  scrollProgress: number;
}

export default function Navigation({ currentScene, onNavigate, scrollProgress }: NavigationProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Audio Web Nodes references
  const audioCtxRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const osc3Ref = useRef<OscillatorNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);

  // Frequency spectrum simulation levels for beautiful SVG animation
  const [frequencies, setFrequencies] = useState<number[]>([4, 4, 4, 4, 4, 4, 4, 4]);

  const toggleSound = () => {
    if (isPlaying) {
      if (gainRef.current && audioCtxRef.current) {
        gainRef.current.gain.setValueAtTime(gainRef.current.gain.value, audioCtxRef.current.currentTime);
        gainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 1.2);
        setTimeout(() => {
          setIsPlaying(false);
        }, 1300);
      }
    } else {
      try {
        if (!audioCtxRef.current) {
          const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
          audioCtxRef.current = new AudioContextClass();

          const filter = audioCtxRef.current.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(220, audioCtxRef.current.currentTime);
          filter.Q.setValueAtTime(4, audioCtxRef.current.currentTime);
          filterRef.current = filter;

          const gain = audioCtxRef.current.createGain();
          gain.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
          gainRef.current = gain;

          filter.connect(gain);
          gain.connect(audioCtxRef.current.destination);

          const osc1 = audioCtxRef.current.createOscillator();
          osc1.type = 'sawtooth';
          osc1.frequency.setValueAtTime(73.42, audioCtxRef.current.currentTime);
          osc1Ref.current = osc1;

          const osc2 = audioCtxRef.current.createOscillator();
          osc2.type = 'triangle';
          osc2.frequency.setValueAtTime(110.00, audioCtxRef.current.currentTime);
          osc2Ref.current = osc2;

          const osc3 = audioCtxRef.current.createOscillator();
          osc3.type = 'sine';
          osc3.frequency.setValueAtTime(138.59, audioCtxRef.current.currentTime);
          osc3Ref.current = osc3;

          osc1.connect(filter);
          osc2.connect(filter);
          osc3.connect(filter);

          const lfo = audioCtxRef.current.createOscillator();
          lfo.type = 'sine';
          lfo.frequency.setValueAtTime(0.12, audioCtxRef.current.currentTime);

          const lfoGain = audioCtxRef.current.createGain();
          lfoGain.gain.setValueAtTime(80, audioCtxRef.current.currentTime);

          lfo.connect(lfoGain);
          lfoGain.connect(filter.frequency);

          lfoRef.current = lfo;

          osc1.start();
          osc2.start();
          osc3.start();
          lfo.start();
        }

        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }

        if (gainRef.current && audioCtxRef.current) {
          gainRef.current.gain.setValueAtTime(gainRef.current.gain.value, audioCtxRef.current.currentTime);
          gainRef.current.gain.linearRampToValueAtTime(0.35, audioCtxRef.current.currentTime + 1.5);
          setIsPlaying(true);
        }
      } catch (err) {
        console.error('Core Sound Synthesis could not initialize: ', err);
      }
    }
  };

  useEffect(() => {
    let animId: number;
    const animateSoundWaves = () => {
      if (isPlaying) {
        setFrequencies(prev => prev.map(() => Math.floor(Math.random() * 22) + 4));
      } else {
        setFrequencies(prev => prev.map(val => val > 4 ? val - 1 : 4));
      }
      animId = requestAnimationFrame(animateSoundWaves);
    };
    animateSoundWaves();
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  const navLinks: { label: string; scene: ActiveScene; desc: string }[] = [
    { label: 'INTRO', scene: 'hero', desc: 'Cinematic Atmosphere' },
    { label: 'IDENTITY', scene: 'about', desc: 'Who is Yücel?' },
    { label: 'SERVICES', scene: 'services', desc: 'Craft & Capabilities' },
    { label: 'SANDBOX', scene: 'webgl', desc: '3D Node Field' },
    { label: 'PORTFOLIO', scene: 'projects', desc: 'Luxury Products' },
    { label: 'CONTRACT', scene: 'contact', desc: 'Let\'s Craft' },
  ];

  return (
    <>
      <header id="global-nav-header" className="fixed top-0 left-0 w-full z-50 px-6 py-5 sm:px-12 sm:py-7 flex items-center justify-between pointer-events-auto select-none">
        
        {/* Futuristic Monogram Branding */}
        <div 
          id="nav-logo"
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-4 cursor-pointer group"
          data-cursor-tag="HOME"
        >
          <div className="relative flex items-center justify-center w-9 h-9 border border-white/20 rounded-full bg-black/40 overflow-hidden transition-all duration-500 group-hover:border-green-400 group-hover:scale-105">
            <span className="font-mono text-sm tracking-wider text-white group-hover:text-green-400 transition-colors">Y</span>
            <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-green-400 to-red-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-xs font-bold tracking-[0.25em] text-white">YÜCEL KILIÇ</span>
            <span className="font-mono text-[9px] text-gray-500 tracking-wider">CREATIVE AUT. ENG ©2026</span>
          </div>
        </div>

        {/* Desktop Balanced Central Navigation */}
        <nav id="desktop-nav-menu" className="hidden md:flex items-center gap-1.5 px-2 py-1.5 border border-white/10 rounded-full bg-black/60 backdrop-blur-xl">
          {navLinks.map((link) => {
            const isActive = currentScene === link.scene;
            return (
              <button
                id={`desktop-nav-${link.scene}`}
                key={link.scene}
                onClick={() => onNavigate(link.scene)}
                className={`relative px-4 py-2 text-[10px] font-mono tracking-widest uppercase rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'text-black font-semibold' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-white rounded-full -z-10 animate-fade-in" style={{ boxShadow: '0 0 12px rgba(255,255,255,0.25)' }} />
                )}
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right side controls: Ambient Synthesis Toggle and Mobile Hamburger */}
        <div id="nav-controls-container" className="flex items-center gap-4">
          
          {/* Audio Synth Active Controller */}
          <button
            id="synth-sound-scaper"
            onClick={toggleSound}
            data-cursor-tag={isPlaying ? 'MUTE ATMOSPHERE' : 'SOUNDSCAPE'}
            className={`flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-300 hover:border-green-400`}
          >
            {/* Live sound bar animations */}
            <div className="flex items-end gap-[2px] h-3 w-7">
              {frequencies.map((h, i) => (
                <div
                  key={i}
                  className="w-[2px] rounded-t bg-green-400 transition-all duration-100"
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>
            
            <span className="hidden sm:inline font-mono text-[9px] tracking-widest text-gray-400 uppercase">
              {isPlaying ? 'ACTIVE' : 'SOUNDSCAPE'}
            </span>

            {isPlaying ? (
              <Volume2 className="h-3.5 w-3.5 text-green-400" />
            ) : (
              <VolumeX className="h-3.5 w-3.5 text-gray-400" />
            )}
          </button>

          {/* Contact Button */}
          <button
            id="nav-quick-cta"
            onClick={() => onNavigate('contact')}
            className="hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black font-mono text-[9px] font-bold tracking-widest uppercase transition-all duration-300 hover:bg-green-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)]"
          >
            COLLAB
            <ArrowUpRight className="h-3 w-3" />
          </button>

          {/* Mobile hamburger toggle */}
          <button
            id="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 border border-white/10 rounded-full bg-black/40 text-white"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>

        </div>
      </header>

      {/* Futuristic Fullscreen Mobile Navigation Drawer */}
      <div
        id="mobile-nav-drawer"
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col justify-center px-12 transition-all duration-700 md:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-8'
        }`}
      >
        <div className="space-y-8 max-w-md w-full mx-auto">
          <div className="border-b border-white/10 pb-4">
            <span className="font-mono text-[10px] tracking-widest text-green-400 uppercase">EXPERIENCE DIALS</span>
          </div>
          <nav className="flex flex-col gap-5">
            {navLinks.map((link, idx) => {
              const isActive = currentScene === link.scene;
              return (
                <button
                  id={`mobile-nav-${link.scene}`}
                  key={link.scene}
                  className="text-left group flex items-baseline gap-4 focus:outline-none"
                  onClick={() => {
                    onNavigate(link.scene);
                    setMobileMenuOpen(false);
                  }}
                >
                  <span className="font-mono text-[11px] text-green-500/80">0{idx + 1}</span>
                  <div className="flex flex-col">
                    <span className={`text-3xl font-bold tracking-tight transition-all duration-300 ${
                      isActive ? 'text-green-400 pl-2' : 'text-white hover:text-green-300'
                    }`}>
                      {link.label}
                    </span>
                    <span className="font-mono text-[10px] text-gray-500 mt-1">{link.desc}</span>
                  </div>
                </button>
              );
            })}
          </nav>

          <div className="pt-8 border-t border-white/10">
            <button
              id="mobile-collab-cta"
              onClick={() => {
                onNavigate('contact');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl border border-green-400/30 bg-green-500/10 text-green-300 font-mono text-xs tracking-widest uppercase font-bold"
            >
              Let's Build The Future
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Global Progress Bar Tracking */}
      <div id="scroll-level-progress-shell" className="fixed top-0 left-0 w-full h-[3px] bg-white/5 z-50 pointer-events-none">
        <div 
          id="scroll-level-progress-bar"
          className="h-full bg-gradient-to-r from-green-400 via-white to-red-500 transition-all duration-200"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
    </>
  );
}
