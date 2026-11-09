import React, { useEffect, useState, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const CustomCursor: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Target and current interpolated coordinates for silky 60fps lag
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on precise pointing devices (mouse/trackpad), not touch screens
    if (typeof window === 'undefined' || prefersReduced) return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    if (isTouch) return;

    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactiveEl = target.closest('button, a, input, select, textarea, [data-cursor], [role="button"]');
        if (interactiveEl) {
          setIsHovered(true);
          const customLabel = interactiveEl.getAttribute('data-cursor-text') || '';
          setCursorText(customLabel);
        } else {
          setIsHovered(false);
          setCursorText('');
        }
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // 60FPS RAF loop with smooth lerp
    const render = () => {
      // Lerp ring
      ring.current.x += (mouse.current.x - ring.current.x) * 0.18;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [prefersReduced, isVisible]);

  if (!enabled || prefersReduced) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Precision inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-neutral-900 transition-transform duration-75 will-change-transform"
      />

      {/* Trailing luxury ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border border-amber-800/60 transition-[width,height,margin,background-color] duration-200 flex items-center justify-center will-change-transform ${
          cursorText
            ? '-ml-8 -mt-8 w-16 h-16 bg-neutral-900/90 text-white border-transparent backdrop-blur-xs scale-100'
            : isHovered
            ? '-ml-5 -mt-5 w-10 h-10 bg-amber-800/10 border-amber-800 scale-110'
            : '-ml-3.5 -mt-3.5 w-7 h-7 bg-transparent'
        }`}
      >
        {cursorText && (
          <span className="text-[10px] font-semibold tracking-widest uppercase text-amber-200 select-none">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};
