import React from 'react';
import { AGENCY_PILLARS } from '../data/agencyData';
import { ScrollReveal } from './motion/ScrollReveal';
import { TiltCard } from './motion/TiltCard';
import { MagneticButton } from './motion/MagneticButton';

interface WhyZavyroProps {
  onStartConsultation: () => void;
}

export const WhyZavyro: React.FC<WhyZavyroProps> = ({ onStartConsultation }) => {
  return (
    <section id="why-us" className="py-24 lg:py-32 bg-[#F6F5F0] border-t border-neutral-200/90 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header with ScrollReveal */}
        <ScrollReveal variant="fade-up" delayMs={50}>
          <div className="max-w-3xl mb-16">
            <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-3">
              03 — Philosophy &amp; Standards
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-semibold text-neutral-900 tracking-tight mb-6">
              More Than an Agency. Your Digital Growth Partner.
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
              We partner with businesses that reject generic templates and demand digital platforms built with genuine technical craftsmanship, strategic design discipline, and measurable commercial impact.
            </p>
          </div>
        </ScrollReveal>

        {/* Pillars Grid with staggered reveals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {AGENCY_PILLARS.map((pillar, idx) => (
            <ScrollReveal
              key={idx}
              variant="fade-up"
              delayMs={idx * 70}
            >
              <TiltCard
                maxTilt={3.5}
                glare={false}
                className="h-full"
              >
                <div
                  className="p-8 bg-white border border-neutral-200/80 rounded-sm shadow-2xs hover:border-neutral-400 hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full group"
                >
                  <div>
                    <span className="font-editorial text-2xl font-light text-neutral-400 group-hover:text-amber-800 transition-colors block mb-4">
                      0{idx + 1}.
                    </span>
                    <h3 className="font-editorial text-2xl font-semibold text-neutral-900 group-hover:text-neutral-950 transition-colors mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs text-neutral-400 font-medium">
                    <span>Standardized Practice</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-amber-800 group-hover:text-amber-700 transition-colors">Verified Quality</span>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}

          {/* Integrated Agency Card */}
          <ScrollReveal variant="fade-up" delayMs={500}>
            <div className="p-8 bg-neutral-900 text-white rounded-sm border border-neutral-800 shadow-md flex flex-col justify-between h-full relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/20 transition-colors" />

              <div className="relative z-10">
                <span className="font-editorial text-2xl font-light text-amber-300 block mb-4">
                  08.
                </span>
                <h3 className="font-editorial text-2xl font-semibold text-white mb-3">
                  Direct Senior Engagement
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                  When you partner with ZAVYROWEB, your project is guided directly by our principal engineers and creative directors. No junior handoffs.
                </p>
              </div>

              <div className="mt-6 relative z-10">
                <MagneticButton strength={0.2} cursorText="CONSULT" className="w-full">
                  <button
                    onClick={onStartConsultation}
                    className="shimmer-hover w-full py-3.5 text-xs font-semibold uppercase tracking-wider text-neutral-950 bg-white hover:bg-[#E8DFC9] rounded-sm transition-all text-center shadow-xs"
                  >
                    Book an Intro Consultation
                  </button>
                </MagneticButton>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
