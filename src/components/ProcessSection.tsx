import React from 'react';
import { PROCESS_STEPS } from '../data/agencyData';
import { ArrowRight, Check } from 'lucide-react';
import { ScrollReveal } from './motion/ScrollReveal';

export const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="py-24 lg:py-32 bg-[#FAF9F5] border-t border-neutral-200/90 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header with ScrollReveal */}
        <ScrollReveal variant="fade-up" delayMs={50}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-neutral-300">
            <div>
              <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-3">
                04 — Methodology &amp; Execution
              </div>
              <h2 className="font-editorial text-4xl sm:text-5xl font-semibold text-neutral-900 tracking-tight">
                Our Four-Step Delivery Process
              </h2>
            </div>
            <p className="max-w-md text-sm md:text-base text-neutral-600 leading-relaxed font-normal">
              A disciplined, transparent delivery framework engineered to minimize revisions, guarantee schedule adherence, and eliminate technical surprises.
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Process Steps with Staggered Cascading Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROCESS_STEPS.map((step, idx) => (
            <ScrollReveal
              key={step.step}
              variant="fade-up"
              delayMs={idx * 120}
            >
              <div
                className="relative p-8 bg-white border border-neutral-200/90 rounded-sm shadow-2xs flex flex-col justify-between h-full group hover:border-neutral-400 hover:shadow-md transition-all duration-300"
              >
                <div>
                  {/* Step number and phase indicator */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-editorial text-3xl font-light text-amber-800 group-hover:scale-105 transition-transform origin-left inline-block">
                      {step.step}.
                    </span>
                    <span className="text-2xs uppercase tracking-widest text-neutral-400 font-semibold group-hover:text-amber-800 transition-colors">
                      Phase {idx + 1}
                    </span>
                  </div>

                  {/* Step name & tagline */}
                  <h3 className="font-editorial text-2xl font-semibold text-neutral-900 mb-2 group-hover:text-neutral-950 transition-colors">
                    {step.name}
                  </h3>
                  <p className="text-xs font-medium text-amber-900/80 mb-4 leading-normal">
                    {step.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Deliverables */}
                <div className="pt-4 border-t border-neutral-100">
                  <div className="text-2xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                    Key Deliverables
                  </div>
                  <ul className="space-y-1.5 text-xs text-neutral-700">
                    {step.deliverables.map((deliv, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2 group/deliv">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 group-hover/deliv:scale-110 transition-transform" />
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
