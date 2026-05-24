import React, { useEffect, useState, useRef } from 'react';
import { ActiveScene } from './types';
import CinematicCanvas from './components/CinematicCanvas';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import Interactive3DExperience from './components/Interactive3DExperience';
import ProjectShowcase from './components/ProjectShowcase';
import ContactSection from './components/ContactSection';

export default function App() {
  const [currentScene, setCurrentScene] = useState<ActiveScene>('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  // References to sections for perfect quick navigation scroll
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const webglRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollY / docHeight : 0;
      setScrollProgress(progress);

      // Determine active scene based on scroll thresholds
      if (progress < 0.12) {
        setCurrentScene('hero');
      } else if (progress >= 0.12 && progress < 0.32) {
        setCurrentScene('about');
      } else if (progress >= 0.32 && progress < 0.52) {
        setCurrentScene('services');
      } else if (progress >= 0.52 && progress < 0.72) {
        setCurrentScene('webgl');
      } else if (progress >= 0.72 && progress < 0.90) {
        setCurrentScene('projects');
      } else {
        setCurrentScene('contact');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run initially
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (scene: ActiveScene) => {
    let targetElement: HTMLElement | null = null;
    switch (scene) {
      case 'hero': targetElement = heroRef.current; break;
      case 'about': targetElement = aboutRef.current; break;
      case 'services': targetElement = servicesRef.current; break;
      case 'webgl': targetElement = webglRef.current; break;
      case 'projects': targetElement = projectsRef.current; break;
      case 'contact': targetElement = contactRef.current; break;
    }

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleServiceColorSelect = (colorPreset: string) => {
    // Canvas can listen or adapt to preset variables immediately
    console.log(`Commanding node color sync: ${colorPreset}`);
  };

  return (
    <div className="relative min-h-screen bg-[#030304] text-white selection:bg-cyan-400 selection:text-black font-sans overflow-x-hidden antialiased">
      
      {/* Immersive Client-side Custom Inertia Cursor */}
      <CustomCursor />

      {/* Floating Global Progress and Nav controllers */}
      <Navigation 
        currentScene={currentScene} 
        onNavigate={handleNavigate} 
        scrollProgress={scrollProgress} 
      />

      {/* 3D Morphing Cinematic Canvas System Background */}
      <div className="fixed inset-0 z-0 h-screen w-screen pointer-events-none">
        <CinematicCanvas 
          currentScene={currentScene} 
          scrollProgress={scrollProgress} 
          currentProjectIndex={currentProjectIndex}
        />
      </div>

      {/* Screen Sections Stack */}
      <main className="relative z-10 w-full flex flex-col">
        
        {/* Intro Hero view */}
        <div ref={heroRef} className="snap-start min-h-screen">
          <HeroSection onScrollClick={() => handleNavigate('about')} />
        </div>

        {/* Identity block */}
        <div ref={aboutRef} className="snap-start min-h-screen select-none">
          <AboutSection />
        </div>

        {/* Capabilities spec grids */}
        <div ref={servicesRef} className="snap-start min-h-screen">
          <ServicesSection onServiceSelect={handleServiceColorSelect} />
        </div>

        {/* WebGL interactive Sandbox */}
        <div ref={webglRef} className="snap-start min-h-screen">
          <Interactive3DExperience />
        </div>

        {/* Projects showcases */}
        <div ref={projectsRef} className="snap-start min-h-screen">
          <ProjectShowcase onProjectChange={(idx) => setCurrentProjectIndex(idx)} />
        </div>

        {/* Cinematic form & greetings outro */}
        <div ref={contactRef} className="snap-start min-h-screen">
          <ContactSection />
        </div>

      </main>

      {/* Global Minimal Bottom Footer */}
      <footer id="global-minimal-footer" className="relative z-10 w-full border-t border-white/5 bg-black py-8 px-6 sm:px-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-center select-none">
        <span className="font-mono text-[9px] text-gray-500 tracking-wider">
          DESIGNED FOR EMOTIONAL DEPTH & RAW EFFICIENCY // CODES COMPILING CLEANLY
        </span>
        <span className="font-mono text-[10px] text-gray-400">
          © {new Date().getFullYear()} YÜCEL KILIÇ. SYSTEM BUILT IN STANTON.
        </span>
      </footer>

    </div>
  );
}

