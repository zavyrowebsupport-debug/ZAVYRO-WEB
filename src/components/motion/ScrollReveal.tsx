import React, { useRef, useEffect, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-up' | 'mask-up';
  delayMs?: number;
  durationMs?: number;
  threshold?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  variant = 'fade-up',
  delayMs = 0,
  durationMs = 700,
  threshold = 0.15,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (elementRef.current) {
              observer.unobserve(elementRef.current);
            }
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const el = elementRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [threshold, prefersReduced]);

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  // Variants CSS transforms
  const getInitialStyle = (): React.CSSProperties => {
    switch (variant) {
      case 'fade-up':
        return {
          opacity: 0,
          transform: 'translate3d(0, 36px, 0)',
        };
      case 'mask-up':
        return {
          opacity: 0,
          transform: 'translate3d(0, 50px, 0) scale(0.98)',
        };
      case 'fade-in':
        return {
          opacity: 0,
        };
      case 'slide-left':
        return {
          opacity: 0,
          transform: 'translate3d(40px, 0, 0)',
        };
      case 'slide-right':
        return {
          opacity: 0,
          transform: 'translate3d(-40px, 0, 0)',
        };
      case 'scale-up':
        return {
          opacity: 0,
          transform: 'scale3d(0.94, 0.94, 1)',
        };
      default:
        return { opacity: 0, transform: 'translate3d(0, 30px, 0)' };
    }
  };

  const activeStyle: React.CSSProperties = {
    opacity: 1,
    transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1)',
    transition: `opacity ${durationMs}ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, transform ${durationMs}ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms`,
  };

  return (
    <div
      ref={elementRef}
      style={isVisible ? activeStyle : getInitialStyle()}
      className={`will-change-[transform,opacity] ${className}`}
    >
      {children}
    </div>
  );
};
