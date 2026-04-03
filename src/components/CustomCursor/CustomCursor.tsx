"use client";

import { useEffect, useRef, useState } from "react";

const SpiderSVG = ({ isMoving }: { isMoving: boolean }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={`w-full h-full block ${isMoving ? "animate-spider-move" : ""}`} 
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="currentColor">
      <ellipse cx="50" cy="65" rx="14" ry="22" />
      <circle cx="50" cy="38" r="11" />
      <path d="M 45 30 L 46 22 L 48 28 Z" />
      <path d="M 55 30 L 54 22 L 52 28 Z" />
    </g>
    
    <g className={isMoving ? "animate-spider-scurry-left origin-center" : "origin-center"} stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M 42 36 L 25 22 L 15 28" />
      <path d="M 40 40 L 20 40 L 10 50" />
      <path d="M 40 45 L 20 56 L 15 72" />
      <path d="M 42 49 L 32 75 L 22 92" />
    </g>
    
    <g className={isMoving ? "animate-spider-scurry-right origin-center" : "origin-center"} stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M 58 36 L 75 22 L 85 28" />
      <path d="M 60 40 L 80 40 L 90 50" />
      <path d="M 60 45 L 80 56 L 85 72" />
      <path d="M 58 49 L 68 75 L 78 92" />
    </g>
  </svg>
);

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const moveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);
  const particleIdRef = useRef(0);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let animFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      setIsMoving(true);
      if (moveTimeoutRef.current) clearTimeout(moveTimeoutRef.current);
      moveTimeoutRef.current = setTimeout(() => setIsMoving(false), 100);

      const target = e.target as HTMLElement;
      const isInteractive = target.closest("a, button, [data-cursor-hover]");
      setIsHovering(!!isInteractive);
    };

    const onMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      const id = particleIdRef.current++;
      setParticles(prev => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== id));
      }, 700);
    };

    const onMouseUp = () => setIsClicking(false);

    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }

      animFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    animFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(animFrameId);
      if (moveTimeoutRef.current) clearTimeout(moveTimeoutRef.current);
    };
  }, []);

  return (
    <div className="hidden md:block">
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-[99999] will-change-transform drop-shadow-[0_0_10px_rgba(34,197,94,0.6)] transition-[width,height,top,left,color] duration-150 ${
          isHovering 
            ? "w-12 h-12 -top-6 -left-6 text-green-300" 
            : "w-8 h-8 -top-4 -left-4 text-green-400"
        } ${isClicking ? "animate-spider-squish text-green-300" : ""}`}
      >
        <SpiderSVG isMoving={isMoving} />
      </div>
      
      {particles.map(p => (
        <div
          key={p.id}
          className="fixed top-0 left-0 pointer-events-none z-[99997]"
          style={{ transform: `translate(${p.x}px, ${p.y}px)` }}
        >
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-green-500 animate-particle-burst origin-top-left"
              style={{ "--angle": `${i * 45}deg` } as React.CSSProperties}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
