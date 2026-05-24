import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(true);
  
  const mouseRef = useRef({ x: -100, y: -100 });
  const trailRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Check if device is desktop or touch
    const checkDevice = () => {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(isTouch || window.innerWidth < 768);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);

    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Check for elements wanting specific hover tags
      const hoverTag = target.getAttribute('data-cursor-tag') || 
                       target.closest('[data-cursor-tag]')?.getAttribute('data-cursor-tag');
      
      const isSelectable = target.tagName === 'BUTTON' || 
                           target.tagName === 'A' || 
                           target.closest('button') || 
                           target.closest('a') ||
                           target.getAttribute('role') === 'button' ||
                           target.classList.contains('interactive-node');

      if (hoverTag) {
        setHoveredState(hoverTag);
      } else if (isSelectable) {
        setHoveredState('link');
      } else {
        setHoveredState(null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    // Dynamic animation loop for cursor inertia trails
    let animationFrameId: number;
    const updateTrail = () => {
      const dx = mouseRef.current.x - trailRef.current.x;
      const dy = mouseRef.current.y - trailRef.current.y;
      
      trailRef.current.x += dx * 0.15;
      trailRef.current.y += dy * 0.15;
      
      setTrail({ x: trailRef.current.x, y: trailRef.current.y });
      animationFrameId = requestAnimationFrame(updateTrail);
    };
    updateTrail();

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  if (isMobile) return null;

  // Render highly responsive cyber-cursor layout
  const isLink = hoveredState === 'link';
  const hasTag = hoveredState && !isLink;

  return (
    <>
      {/* Precision Core Dot */}
      <div
        id="cyber-cursor-dot"
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 ease-out"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${hoveredState ? 0.3 : 1})`,
        }}
      />

      {/* Lag-trailing Cinematic Ring */}
      <div
        id="cyber-cursor-ring"
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
          isLink 
            ? 'w-16 h-16 bg-white/10 border border-white/20 mix-blend-difference scale-110' 
            : hasTag 
              ? 'w-24 h-24 bg-cyan-500/10 border border-cyan-400/40 mix-blend-normal' 
              : 'w-8 h-8 border border-white/40 mix-blend-difference'
        }`}
        style={{
          transform: `translate3d(${trail.x}px, ${trail.y}px, 0)`,
        }}
      >
        {hasTag && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[9px] tracking-widest text-cyan-300 font-bold uppercase animate-spin-slow">
            {hoveredState}
          </div>
        )}
      </div>
    </>
  );
}
