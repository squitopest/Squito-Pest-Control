"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const target = e.target as HTMLElement;
      const isInteractive = target.closest("a, button, input, [data-cursor-hover]");
      setIsHovering(!!isInteractive);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const animate = () => {
      // Instantly track dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Smoothly interpolate ring
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
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
    };
  }, []);

  return (
    <div className="hidden md:block pointer-events-none z-[99999] fixed inset-0">
      {/* Center Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-green-500 transition-transform duration-100 ${
          isHovering ? "scale-0" : "scale-100"
        }`}
      />
      
      {/* Outer Interpolated Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border border-green-500 transition-all duration-300 ease-out flex items-center justify-center ${
          isHovering 
            ? "w-12 h-12 bg-green-500/10 backdrop-blur-[2px]" 
            : "w-8 h-8 bg-transparent"
        } ${
          isClicking 
            ? "scale-50 border-green-400 bg-green-500/30" 
            : "scale-100"
        }`}
      >
        {isClicking && (
          <div className="absolute w-full h-full rounded-full border-2 border-green-400 animate-ping opacity-50" />
        )}
      </div>
    </div>
  );
}
