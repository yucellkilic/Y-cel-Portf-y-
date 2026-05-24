import React, { useEffect, useRef, useState } from 'react';
import { ActiveScene } from '../types';

interface CinematicCanvasProps {
  currentScene: ActiveScene;
  scrollProgress: number;
  currentProjectIndex: number;
}

interface Particle {
  x: number;
  y: number;
  z: number;
  
  tx: number;
  ty: number;
  tz: number;
  
  cx: number;
  cy: number;
  cz: number;

  color: string;
  size: number;
  phase: number;
  connectionGroup?: number; // enables structured wireframe linking
}

export default function CinematicCanvas({ currentScene, scrollProgress, currentProjectIndex }: CinematicCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const [particleSpeed, setParticleSpeed] = useState(1.0);
  const [noiseIntensity, setNoiseIntensity] = useState(0.4);
  const [activePreset, setActivePreset] = useState<'emerald' | 'crimson' | 'cyber' | 'monochrome'>('emerald');
  const [isMobile, setIsMobile] = useState(false);

  const scrollRef = useRef(0);
  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  // Handle responsive check
  useEffect(() => {
    const checkResponsive = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkResponsive();
    window.addEventListener('resize', checkResponsive);
    return () => window.removeEventListener('resize', checkResponsive);
  }, []);

  // Saturated Red, Saturated Green, and Pure White colorway palette mapping
  const getPresetColors = (preset: typeof activePreset, index: number) => {
    switch (preset) {
      case 'crimson':
        // Vivid Saturated Laser Red
        return index % 3 === 0 
          ? `rgba(239, 68, 68, ${Math.random() * 0.4 + 0.6})` // laser red
          : index % 3 === 1
            ? `rgba(254, 226, 226, ${Math.random() * 0.3 + 0.5})` // soft white
            : `rgba(248, 113, 113, ${Math.random() * 0.4 + 0.6})`; // glow red
      case 'cyber':
        // Crimson and Emerald fusion
        return index % 2 === 0 
          ? `rgba(34, 197, 94, ${Math.random() * 0.5 + 0.5})` // emerald green
          : `rgba(239, 68, 68, ${Math.random() * 0.5 + 0.5})`; // laser red
      case 'monochrome':
        return `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.6})`;
      case 'emerald':
      default:
        // High-density Cyber Green with White sparklers
        return index % 4 === 0 
          ? `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})` // bright white
          : index % 4 === 1
            ? `rgba(34, 197, 94, ${Math.random() * 0.5 + 0.5})` // cyber green
            : `rgba(16, 185, 129, ${Math.random() * 0.4 + 0.6})`; // emerald green
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Camera perspective states
    let cameraZ = 1200;
    let cameraAngleX = 0;
    let cameraAngleY = 0;

    const particles: Particle[] = [];
    // Lower count on mobile for absolute buttery 60fps render loops
    const count = isMobile ? 650 : 1300; 

    // 1. Scene 1 - Holographic Sphere with detailed orbital equator rings
    const buildSphere = (p: Particle, i: number) => {
      const radius = isMobile ? 180 : 300;
      
      // Let's reserve 30% of the particles to form spinning orbital flat rings
      if (i > count * 0.70) {
        const theta = (i / (count * 0.3)) * Math.PI * 2;
        const ringRad = radius * 1.35;
        p.tx = ringRad * Math.cos(theta);
        p.ty = (Math.random() - 0.5) * 8; // completely flat
        p.tz = ringRad * Math.sin(theta);
        p.connectionGroup = 101; // Marked for custom ring rendering
      } else {
        const phi = Math.acos(-1 + (2 * i) / (count * 0.7));
        const theta = Math.sqrt(count * 0.7 * Math.PI) * phi;
        p.tx = radius * Math.sin(phi) * Math.cos(theta);
        p.ty = radius * Math.sin(phi) * Math.sin(theta);
        p.tz = radius * Math.cos(phi);
        p.connectionGroup = 100;
      }
    };

    // 2. Scene 2 - Immersive double helix DNA stream
    const buildHelix = (p: Particle, i: number) => {
      const helixHeight = isMobile ? 550 : 900;
      const t = (i / count) * helixHeight - (helixHeight / 2);
      const angle = (i / count) * Math.PI * 10; // spirals
      const radius = isMobile ? 100 : 160;

      // Double helix strand bifurcation
      const strand = i % 2 === 0 ? 0 : Math.PI;

      p.tx = radius * Math.cos(angle + strand);
      p.ty = t;
      p.tz = radius * Math.sin(angle + strand);
      p.connectionGroup = i % 2; // Separate left & right strands
    };

    // 3. Scene 3 - Parametric Trefoil Torus Knot structure
    const buildTorusKnot = (p: Particle, i: number) => {
      const theta = (i / count) * Math.PI * 2 * 3; // frequency coils
      const R = isMobile ? 150 : 260; // Major scale
      const r = isMobile ? 45 : 80;   // Minor scale

      // Trefoil Knot parametric mathematical coordinates
      const x = R * (Math.sin(theta) + 2 * Math.sin(2 * theta));
      const y = R * (Math.cos(theta) - 2 * Math.cos(2 * theta));
      const z = -R * Math.sin(3 * theta);

      p.tx = x * 0.6;
      p.ty = y * 0.6;
      p.tz = z * 0.6;
      p.connectionGroup = Math.floor(theta / 0.1) % 4; // structural segments
    };

    // 4. Scene 4 - Immersive quantum Tesseract / Rotating Cube framework
    const buildTesseract = (p: Particle, i: number) => {
      // Form 8 core corners, then layout connecting edge rows
      const size = isMobile ? 160 : 250;
      const section = i % 8;
      
      // Compute 3D corners dynamically
      const x = (section & 1) ? size : -size;
      const y = (section & 2) ? size : -size;
      const z = (section & 4) ? size : -size;

      // Inject minor structural variance to outline the cube edges beautifully
      const ratio = Math.random();
      const face = Math.floor(Math.random() * 3);
      
      if (face === 0) {
        p.tx = x * ratio;
        p.ty = y;
        p.tz = z;
      } else if (face === 1) {
        p.tx = x;
        p.ty = y * ratio;
        p.tz = z;
      } else {
        p.tx = x;
        p.ty = y;
        p.tz = z * ratio;
      }
      p.connectionGroup = section;
    };

    // 5. Scene 5 - Intricate floating Web Constellation System
    const buildConstellation = (p: Particle, i: number) => {
      const clusters = 6;
      const clusterId = i % clusters;
      const angle = (clusterId / clusters) * Math.PI * 2;
      const radius = isMobile ? 160 : 340;
      
      const cx = Math.cos(angle) * radius;
      const cy = Math.sin(angle) * radius;
      const cz = (i % 3 === 0) ? -200 : 200;

      const spread = isMobile ? 80 : 130;
      p.tx = cx + (Math.random() - 0.5) * spread;
      p.ty = cy + (Math.random() - 0.5) * spread;
      p.tz = cz + (Math.random() - 0.5) * spread;
      p.connectionGroup = clusterId;
    };

    // 6. Scene 6 - Super-Velocity Hyper-space flight tunnel (Red/Green/White starburst)
    const buildWarp = (p: Particle, i: number) => {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 380 + 10;
      p.tx = r * Math.cos(angle);
      p.ty = r * Math.sin(angle);
      p.tz = (Math.random() - 0.5) * 2400; // Super deep tunnel stretch
      p.connectionGroup = undefined;
    };

    // Boot particles inside context
    for (let i = 0; i < count; i++) {
      particles.push({
        x: 0,
        y: 0,
        z: 0,
        tx: 0,
        ty: 0,
        tz: 0,
        cx: (Math.random() - 0.5) * 3500,
        cy: (Math.random() - 0.5) * 3500,
        cz: (Math.random() - 0.5) * 3500,
        color: getPresetColors(activePreset, i),
        size: Math.random() * 2.5 + 1.0,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const updateParticlesTarget = (scene: ActiveScene, projIndex: number) => {
      for (let i = 0; i < count; i++) {
        const p = particles[i];
        p.color = getPresetColors(activePreset, i);
        
        // Dynamically override specific colors to highlight WHITE, GREEN & RED
        if (scene === 'projects') {
          const projectColors = [
            `rgba(34, 197, 94, ${Math.random() * 0.4 + 0.6})`, // Cyber Green
            `rgba(239, 68, 68, ${Math.random() * 0.4 + 0.6})`,  // Laser Red
            `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.6})`, // pure cosmic white
            `rgba(34, 197, 94, ${Math.random() * 0.3 + 0.7})`, 
            `rgba(239, 68, 68, ${Math.random() * 0.3 + 0.7})`
          ];
          const chosenColor = projectColors[projIndex % projectColors.length];
          p.color = i % 4 === 0 ? chosenColor : `rgba(255, 255, 255, 0.2)`;
        }

        switch (scene) {
          case 'hero': buildSphere(p, i); break;
          case 'about': buildHelix(p, i); break;
          case 'services': buildTorusKnot(p, i); break;
          case 'webgl': buildTesseract(p, i); break;
          case 'projects': buildConstellation(p, i); break;
          case 'contact': buildWarp(p, i); break;
        }
      }
    };

    updateParticlesTarget(currentScene, currentProjectIndex);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.tx = (e.clientX - width / 2) / (width / 2);
      mouseRef.current.ty = (e.clientY - height / 2) / (height / 2);
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Frame rendering loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Inertia tracking
      mouseRef.current.x += (mouseRef.current.tx - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.ty - mouseRef.current.y) * 0.08;

      let targetRotX = mouseRef.current.y * 0.20;
      let targetRotY = mouseRef.current.x * 0.20;

      const currentScroll = scrollRef.current;
      targetRotY += currentScroll * Math.PI * 1.6;
      targetRotX += Math.sin(currentScroll * Math.PI) * 0.25;

      cameraAngleX += (targetRotX - cameraAngleX) * 0.05;
      cameraAngleY += (targetRotY - cameraAngleY) * 0.05;

      let targetZ = 1200;
      switch (currentScene) {
        case 'hero': targetZ = isMobile ? 800 : 1200 + Math.sin(Date.now() * 0.0004) * 40; break;
        case 'about': targetZ = isMobile ? 750 : 1100; break;
        case 'services': targetZ = isMobile ? 800 : 1250; break;
        case 'webgl': targetZ = isMobile ? 700 : 900; break;
        case 'projects': targetZ = isMobile ? 850 : 1300; break;
        case 'contact': targetZ = 850 - currentScroll * 600; break; // Fly directly inside
      }
      cameraZ += (targetZ - cameraZ) * 0.06;

      const cosX = Math.cos(cameraAngleX);
      const sinX = Math.sin(cameraAngleX);
      const cosY = Math.cos(cameraAngleY);
      const sinY = Math.sin(cameraAngleY);

      // We'll queue particles for depth sorting
      interface QueueItem {
        x2d: number;
        y2d: number;
        size: number;
        color: string;
        depth: number;
        sourceIndex: number;
        cg?: number;
      }
      const renderQueue: QueueItem[] = [];

      for (let i = 0; i < count; i++) {
        const p = particles[i];
        p.phase += 0.015 * particleSpeed;

        // Custom realtime coordinate animations depending on active scene state
        if (currentScene === 'about') {
          // Slowly rotate double helix strands
          const angle = (i / count) * Math.PI * 10 + p.phase * 0.5;
          const radius = isMobile ? 100 : 160;
          const strand = i % 2 === 0 ? 0 : Math.PI;
          p.tx = radius * Math.cos(angle + strand);
          p.tz = radius * Math.sin(angle + strand);
        } else if (currentScene === 'services') {
          // Ripple torus waves
          const kTheta = (i / count) * Math.PI * 2 * 3;
          const offset = Math.sin(p.phase * 2 + kTheta) * (20 + noiseIntensity * 25);
          p.ty = (p.ty + Math.sin(p.phase) * 0.2);
        } else if (currentScene === 'webgl') {
          // Pulsate rotation on Tesseract t-axis
          const tSize = isMobile ? 160 : 250;
          const morph = Math.sin(p.phase * 0.7) * (15 + noiseIntensity * 20);
          if (p.connectionGroup !== undefined) {
            p.tx = p.connectionGroup & 1 ? tSize + morph : -tSize - morph;
          }
        } else if (currentScene === 'contact') {
          // Dynamic forward stars progression
          p.tz += 12 * particleSpeed;
          if (p.tz > 800) {
            p.tz = -1200; // Reset star depth
          }
        }

        // Elastic transition morphing
        p.cx += (p.tx - p.cx) * (0.05 * particleSpeed);
        p.cy += (p.ty - p.cy) * (0.05 * particleSpeed);
        p.cz += (p.tz - p.cz) * (0.05 * particleSpeed);

        let rx = p.cx;
        let ry = p.cy;
        let rz = p.cz;

        // Apply magnetic mouse reaction
        const mouseWorldX = mouseRef.current.x * (isMobile ? 350 : 650);
        const mouseWorldY = mouseRef.current.y * (isMobile ? 250 : 450);
        const dx = rx - mouseWorldX;
        const dy = ry - mouseWorldY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 250) {
          const force = (250 - dist) * 0.16;
          rx += (dx / dist) * force;
          ry += (dy / dist) * force;
        }

        // Apply 3D coordinate matrices math
        const x1 = rx * cosY - rz * sinY;
        const z1 = rx * sinY + rz * cosY;

        const y2 = ry * cosX - z1 * sinX;
        const z2 = ry * sinX + z1 * cosX;

        const finalZ = z2 + cameraZ;
        if (finalZ <= 50) continue;

        const scale = 500 / finalZ;
        const x2d = width / 2 + x1 * scale;
        const y2d = height / 2 + y2 * scale;

        const brightness = Math.max(0.1, Math.min(1.0, 1 - finalZ / 2200));
        const finalSize = p.size * scale * (brightness * 1.5);

        if (x2d >= 0 && x2d <= width && y2d >= 0 && y2d <= height) {
          const finalColor = p.color.replace(/[\d.]+\)$/, `${brightness})`);

          renderQueue.push({
            x2d,
            y2d,
            size: finalSize,
            color: finalColor,
            depth: finalZ,
            sourceIndex: i,
            cg: p.connectionGroup
          });
        }
      }

      // Painters sorting
      renderQueue.sort((a, b) => b.depth - a.depth);

      // WebGL line connector wireframes drawing
      // We draw connection lines between close neighbors of matching groups to render complex physical geometries!
      if (['about', 'services', 'webgl', 'projects'].includes(currentScene)) {
        ctx.lineWidth = 0.5;
        const maxDist = isMobile ? 35 : 55;

        for (let a = 0; a < renderQueue.length; a += isMobile ? 4 : 2) {
          const itemA = renderQueue[a];
          if (itemA.cg === undefined) continue;

          for (let b = a + 1; b < Math.min(renderQueue.length, a + (isMobile ? 12 : 24)); b++) {
            const itemB = renderQueue[b];
            
            // Nodes must match connection groups (e.g., DNA strand or Cube corner edge lines)
            if (itemA.cg === itemB.cg) {
              const dx = itemA.x2d - itemB.x2d;
              const dy = itemA.y2d - itemB.y2d;
              const d = Math.sqrt(dx*dx + dy*dy);

              if (d < maxDist) {
                // Fade line opacity depending on proximity
                const lineAlpha = (1 - d / maxDist) * 0.18;
                ctx.strokeStyle = itemA.color.replace(/[\d.]+\)$/, `${lineAlpha})`);
                ctx.beginPath();
                ctx.moveTo(itemA.x2d, itemA.y2d);
                ctx.lineTo(itemB.x2d, itemB.y2d);
                ctx.stroke();
              }
            }
          }
        }
      }

      // Render actual particle spheres
      for (const item of renderQueue) {
        ctx.beginPath();
        ctx.arc(item.x2d, item.y2d, item.size, 0, Math.PI * 2);
        ctx.fillStyle = item.color;
        
        // Dynamic bloom glow on saturated models
        if (currentScene === 'webgl' && item.size > 2.8) {
          ctx.shadowColor = item.color;
          ctx.shadowBlur = 10;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    updateParticlesTarget(currentScene, currentProjectIndex);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [currentScene, currentProjectIndex, activePreset, particleSpeed, noiseIntensity, isMobile]);

  return (
    <div id="particle-canvas-container" ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-auto bg-[#030304]">
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full opacity-80" />
      
      {/* Cinematic Depth Overlays */}
      <div className="absolute inset-0 pointer-events-none bg-radial-vignette opacity-70" style={{ backgroundImage: 'radial-gradient(circle, transparent 20%, rgba(3,3,4,0.95) 90%)' }}></div>
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#030304] to-transparent pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[#030304] to-transparent pointer-events-none"></div>

      {/* Control Panel: User can modify parameters of Section 4 WebGL Sandbox directly */}
      {currentScene === 'webgl' && (
        <div 
          id="sandbox-controls" 
          className="absolute z-40 px-5 py-4 border rounded-xl shadow-2xl bottom-6 left-4 sm:bottom-10 sm:left-12 bg-black/90 backdrop-blur-md border-white/10 w-[280px] sm:w-[320px] select-none transition-all duration-500 animate-slide-up"
        >
          <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
            <span className="font-mono text-[9px] tracking-wider text-green-400 uppercase font-semibold">TESSERACT STACK LOCK</span>
            <span className="flex h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse"></span>
          </div>

          <div className="space-y-3.5">
            <div>
              <div className="flex justify-between font-mono text-[10px] mb-1.5 text-gray-400">
                <span>SYSTEM ACCELERATION</span>
                <span className="text-white text-xs">{particleSpeed.toFixed(1)}x</span>
              </div>
              <input 
                id="speed-control-slider"
                type="range" 
                min="0.2" 
                max="2.5" 
                step="0.1"
                value={particleSpeed}
                onChange={(e) => setParticleSpeed(parseFloat(e.target.value))}
                className="w-full accent-green-400 bg-white/10 h-1 rounded-lg cursor-pointer max-w-full"
              />
            </div>

            <div>
              <div className="flex justify-between font-mono text-[10px] mb-1.5 text-gray-400">
                <span>WARP DENSITY</span>
                <span className="text-white text-xs">{(noiseIntensity * 100).toFixed(0)}%</span>
              </div>
              <input 
                id="noise-control-slider"
                type="range" 
                min="0.0" 
                max="1.5" 
                step="0.05"
                value={noiseIntensity}
                onChange={(e) => setNoiseIntensity(parseFloat(e.target.value))}
                className="w-full accent-green-400 bg-white/10 h-1 rounded-lg cursor-pointer max-w-full"
              />
            </div>

            <div>
              <span className="block font-mono text-[10px] mb-1.5 text-gray-400">SYSTEM HIGH-CONTRAST PALETTE</span>
              <div className="grid grid-cols-4 gap-1.5">
                {(['emerald', 'crimson', 'cyber', 'monochrome'] as const).map((preset) => (
                  <button
                    id={`color-preset-${preset}`}
                    key={preset}
                    onClick={() => setActivePreset(preset)}
                    className={`font-mono text-[8px] py-1 border rounded uppercase tracking-wider text-center transition-all ${
                      activePreset === preset 
                        ? 'bg-green-500 text-black border-green-400 font-bold' 
                        : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-3.5 text-[8px] font-mono text-gray-500 text-center leading-relaxed">
            Drag mouse over background to command quantum gravity arrays
          </div>
        </div>
      )}
    </div>
  );
}
