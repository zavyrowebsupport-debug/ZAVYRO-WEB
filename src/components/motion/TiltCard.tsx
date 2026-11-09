import React, { useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // max tilt degrees (default 6)
  glare?: boolean;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 5,
  glare = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, isHovered: false });
  const prefersReduced = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = x / rect.width;
    const percentY = y / rect.height;

    // Invert rotateX so moving cursor down tilts bottom away
    const rotateX = (0.5 - percentY) * maxTilt * 2;
    const rotateY = (percentX - 0.5) * maxTilt * 2;

    setTilt({
      rotateX,
      rotateY,
      glareX: percentX * 100,
      glareY: percentY * 100,
      isHovered: true,
    });
  };

  const handleMouseLeave = () => {
    setTilt((prev) => ({
      ...prev,
      rotateX: 0,
      rotateY: 0,
      isHovered: false,
    }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1200px',
      }}
      className={`relative ${className}`}
    >
      <div
        style={{
          transform: prefersReduced
            ? 'none'
            : `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) ${tilt.isHovered ? 'scale3d(1.01, 1.01, 1.01)' : 'scale3d(1, 1, 1)'}`,
          transition: tilt.isHovered
            ? 'transform 0.12s ease-out'
            : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          transformStyle: 'preserve-3d',
        }}
        className="w-full h-full relative will-change-transform"
      >
        {children}

        {/* Subtle specular lighting sheen */}
        {glare && tilt.isHovered && !prefersReduced && (
          <div
            className="pointer-events-none absolute inset-0 rounded-sm opacity-35 transition-opacity duration-300 mix-blend-soft-light"
            style={{
              background: `radial-gradient(circle 350px at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 248, 220, 0.4), transparent 80%)`,
            }}
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
};
