import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, Sparkles, CheckCircle2, ShieldCheck, Compass, Zap } from 'lucide-react';
import { AGENCY_INFO } from '../data/agencyData';
import { MagneticButton } from './motion/MagneticButton';
import { TiltCard } from './motion/TiltCard';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface HeroProps {
  onExploreServices: () => void;
  onViewWork: () => void;
  onStartProject: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreServices,
  onViewWork,
  onStartProject,
}) => {
  const [loaded, setLoaded] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    // Trigger smooth entrance sequence
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Split headline words for staggered cinematic reveal
  const headlineWords = [
    { text: 'Building', delay: 100 },
    { text: 'Digital', delay: 180 },
    { text: 'Experiences', delay: 260 },
    { text: 'That', delay: 340 },
    { text: 'Move', delay: 420 },
    { text: 'Businesses', delay: 500 },
    { text: 'Forward.', delay: 580 },
  ];

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Background ambient architectural tint with gentle breathing scale */}
      <div
        className="absolute top-0 right-0 -z-10 w-full max-w-4xl h-96 bg-gradient-to-b from-amber-100/30 via-neutral-100/20 to-transparent blur-3xl pointer-events-none transition-transform duration-1000"
        style={{
          transform: loaded ? 'scale(1)' : 'scale(0.85)',
          opacity: loaded ? 1 : 0,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Top editorial kicker with smooth slide-in */}
        <div
          className="flex items-center gap-2 mb-6 text-xs uppercase tracking-widest text-neutral-500 font-medium transition-all duration-700"
          style={{
            opacity: loaded || prefersReduced ? 1 : 0,
            transform: loaded || prefersReduced ? 'translate3d(0, 0, 0)' : 'translate3d(0, -12px, 0)',
          }}
        >
          <span>International Digital Agency</span>
          <span aria-hidden="true" className="text-neutral-300">·</span>
          <span>Bespoke Web &amp; Growth</span>
          <span aria-hidden="true" className="text-neutral-300">·</span>
          <span className="text-neutral-700">Casablanca &amp; Worldwide</span>
        </div>

        {/* Hero headline and supporting text grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12">
          <div className="lg:col-span-8">
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.08] tracking-tight text-neutral-900 balance flex flex-wrap gap-x-3.5 gap-y-1">
              {headlineWords.map((word, idx) => (
                <span key={idx} className="inline-block overflow-hidden py-1">
                  <span
                    className="inline-block transition-transform duration-800 will-change-transform"
                    style={{
                      transform: loaded || prefersReduced
                        ? 'translate3d(0, 0, 0)'
                        : 'translate3d(0, 115%, 0)',
                      transitionDelay: prefersReduced ? '0ms' : `${word.delay}ms`,
                      transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    {word.text}
                  </span>
                </span>
              ))}
            </h1>
          </div>

          <div
            className="lg:col-span-4 flex flex-col justify-between transition-all duration-900"
            style={{
              opacity: loaded || prefersReduced ? 1 : 0,
              transform: loaded || prefersReduced ? 'translate3d(0, 0, 0)' : 'translate3d(0, 24px, 0)',
              transitionDelay: prefersReduced ? '0ms' : '450ms',
            }}
          >
            <p className="text-base md:text-lg text-neutral-600 leading-relaxed font-normal mb-8">
              {AGENCY_INFO.subtext}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton strength={0.25} cursorText="EXPLORE">
                <button
                  onClick={onExploreServices}
                  className="shimmer-hover px-6 py-3.5 text-xs font-semibold tracking-wider uppercase text-white bg-neutral-900 rounded-sm hover:bg-neutral-800 transition-all duration-200 shadow-xs hover:shadow-md whitespace-nowrap group flex items-center gap-2"
                >
                  <span>Explore Our Services</span>
                  <ArrowDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />
                </button>
              </MagneticButton>

              <MagneticButton strength={0.2} cursorText="WORK">
                <button
                  onClick={onViewWork}
                  className="px-6 py-3.5 text-xs font-semibold tracking-wider uppercase text-neutral-800 bg-neutral-100 border border-neutral-300 rounded-sm hover:bg-neutral-200 hover:border-neutral-400 transition-all duration-200 whitespace-nowrap flex items-center gap-1.5"
                >
                  <span>View Our Work</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500" />
                </button>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Cinematic Studio Visual Container with 3D TiltCard & Floating Elements */}
        <div
          className="relative transition-all duration-1000"
          style={{
            opacity: loaded || prefersReduced ? 1 : 0,
            transform: loaded || prefersReduced ? 'translate3d(0, 0, 0) scale(1)' : 'translate3d(0, 35px, 0) scale(0.98)',
            transitionDelay: prefersReduced ? '0ms' : '550ms',
          }}
        >
          {/* Elegant floating architectural coordinates badge */}
          <div className="hidden sm:flex absolute -top-4 right-8 z-20 items-center gap-2 px-3.5 py-1.5 bg-neutral-900/90 text-amber-200 backdrop-blur-md rounded-full border border-amber-800/40 shadow-lg text-[11px] font-mono tracking-wider animate-subtle-float">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>33°35&apos;N 7°37&apos;W · Casablanca Digital Studio</span>
          </div>

          <TiltCard maxTilt={4} glare={true} className="rounded-sm overflow-hidden border border-neutral-200/90 shadow-xl group bg-neutral-900">
            <div className="relative overflow-hidden cursor-pointer" data-cursor-text="STUDIO">
              <img
                src={AGENCY_INFO.heroImage}
                alt="ZAVYROWEB Creative Digital Studio Workstation showcasing website platform"
                className="w-full h-[380px] sm:h-[480px] lg:h-[620px] object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                loading="eager"
                referrerPolicy="no-referrer"
              />

              {/* Discreet aesthetic scrim with subtle vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/20 to-transparent pointer-events-none" />

              {/* Bottom editorial badge */}
              <div className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10 lg:right-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-white z-10">
                <div className="max-w-md">
                  <span className="text-xs uppercase tracking-widest text-amber-200/90 font-medium block mb-1">
                    Studio Quality Guarantee
                  </span>
                  <p className="font-editorial text-xl sm:text-2xl text-neutral-100 font-normal leading-snug">
                    Precision engineering meets modern international visual direction.
                  </p>
                </div>

                <div className="flex items-center gap-6 text-xs text-neutral-300">
                  <div className="flex flex-col group/wa">
                    <span className="text-amber-300 font-semibold text-sm">Direct WhatsApp</span>
                    <a
                      href={`https://wa.me/${AGENCY_INFO.phoneRaw}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors underline decoration-neutral-500 group-hover/wa:decoration-white"
                    >
                      {AGENCY_INFO.phone}
                    </a>
                  </div>
                  <div className="flex flex-col group/mail">
                    <span className="text-amber-300 font-semibold text-sm">Direct Email</span>
                    <a
                      href={`mailto:${AGENCY_INFO.email}`}
                      className="hover:text-white transition-colors underline decoration-neutral-500 group-hover/mail:decoration-white"
                    >
                      {AGENCY_INFO.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Technical standards strip with staggered item reveal */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-b border-neutral-200/80 pb-10 mt-6 transition-all duration-700"
          style={{
            opacity: loaded || prefersReduced ? 1 : 0,
            transform: loaded || prefersReduced ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)',
            transitionDelay: prefersReduced ? '0ms' : '750ms',
          }}
        >
          <div className="flex flex-col group/card hover:translate-y-[-2px] transition-transform duration-200">
            <span className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Architecture</span>
            <span className="text-sm font-semibold text-neutral-900 group-hover/card:text-amber-800 transition-colors">Bespoke Production Code</span>
            <span className="text-xs text-neutral-500 mt-0.5">React, Next.js, TypeScript</span>
          </div>

          <div className="flex flex-col group/card hover:translate-y-[-2px] transition-transform duration-200">
            <span className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Performance</span>
            <span className="text-sm font-semibold text-neutral-900 group-hover/card:text-amber-800 transition-colors">Core Web Vitals 95+</span>
            <span className="text-xs text-neutral-500 mt-0.5">Sub-second global load times</span>
          </div>

          <div className="flex flex-col group/card hover:translate-y-[-2px] transition-transform duration-200">
            <span className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Organic Reach</span>
            <span className="text-sm font-semibold text-neutral-900 group-hover/card:text-amber-800 transition-colors">Semantic &amp; Schema SEO</span>
            <span className="text-xs text-neutral-500 mt-0.5">Built for search engine bots</span>
          </div>

          <div className="flex flex-col group/card hover:translate-y-[-2px] transition-transform duration-200">
            <span className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Communication</span>
            <span className="text-sm font-semibold text-neutral-900 group-hover/card:text-amber-800 transition-colors">Direct Senior Access</span>
            <span className="text-xs text-neutral-500 mt-0.5">No agency bureaucracy</span>
          </div>
        </div>
      </div>
    </section>
  );
};
