import React, { useState } from 'react';
import { ArrowUpRight, Check, Sparkles, ChevronRight, Layers } from 'lucide-react';
import { SERVICES_DATA } from '../data/agencyData';
import { ServiceDetail } from '../types';
import { ServiceModal } from './ServiceModal';
import { ScrollReveal } from './motion/ScrollReveal';
import { MagneticButton } from './motion/MagneticButton';

interface ServicesSectionProps {
  onSelectServiceForInquiry: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForInquiry,
}) => {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  return (
    <section id="services" className="py-24 lg:py-32 bg-[#F6F5F0] border-t border-neutral-200/90 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header with ScrollReveal */}
        <ScrollReveal variant="fade-up" delayMs={50}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-neutral-300">
            <div>
              <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-3">
                01 — Capabilities &amp; Disciplines
              </div>
              <h2 className="font-editorial text-4xl sm:text-5xl font-semibold text-neutral-900 tracking-tight">
                Bespoke Digital Services
              </h2>
            </div>
            <p className="max-w-md text-sm md:text-base text-neutral-600 leading-relaxed font-normal">
              We provide end-to-end digital craft — from initial architectural design to technical SEO and conversion-focused paid advertising.
            </p>
          </div>
        </ScrollReveal>

        {/* Services List / Asymmetrical Layout with staggered entrance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-12 divide-y divide-neutral-300/80">
            {SERVICES_DATA.map((service, idx) => (
              <ScrollReveal
                key={service.id}
                variant="fade-up"
                delayMs={idx * 80}
              >
                <div
                  className="py-10 group transition-all duration-300 hover:bg-white/80 px-4 sm:px-8 rounded-sm hover:shadow-xs relative"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Service Number & Title with smooth hover slide */}
                    <div className="lg:col-span-5 transition-transform duration-300 group-hover:translate-x-1">
                      <div className="flex items-baseline gap-4 mb-3">
                        <span className="font-editorial text-2xl font-light text-neutral-400 group-hover:text-amber-800 transition-colors">
                          {service.number}.
                        </span>
                        <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-neutral-900 group-hover:text-amber-900 transition-colors">
                          {service.title}
                        </h3>
                      </div>
                      <p className="text-sm text-neutral-600 leading-relaxed max-w-sm pl-9">
                        {service.shortDescription}
                      </p>
                    </div>

                    {/* Scope bullets */}
                    <div className="lg:col-span-5 pl-0 sm:pl-9 lg:pl-0">
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-700">
                        {service.scopeItems.map((item, sIdx) => (
                          <li key={sIdx} className="flex items-center gap-2 group/item">
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 group-hover:bg-amber-700 transition-colors shrink-0 group-hover/item:scale-125" />
                            <span className="group-hover/item:text-neutral-950 transition-colors">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Interactive Trigger Button with Magnetic effect */}
                    <div className="lg:col-span-2 flex items-center justify-start lg:justify-end pt-2 lg:pt-0">
                      <MagneticButton strength={0.2} cursorText="SPEC">
                        <button
                          onClick={() => setSelectedService(service)}
                          className="shimmer-hover inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-900 bg-white border border-neutral-300 py-2.5 px-4 rounded-sm hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all shadow-2xs hover:shadow-sm whitespace-nowrap"
                        >
                          <span>Specifications</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </MagneticButton>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Bottom Banner with ScrollReveal & Shimmer */}
        <ScrollReveal variant="fade-up" delayMs={200}>
          <div className="mt-16 p-8 bg-neutral-900 text-white rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md relative overflow-hidden group">
            {/* Ambient accent light */}
            <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-amber-500/10 to-transparent pointer-events-none" />

            <div className="relative z-10">
              <h4 className="font-editorial text-2xl font-semibold mb-1">
                Have a custom or multi-discipline requirement?
              </h4>
              <p className="text-xs sm:text-sm text-neutral-400">
                We frequently architect integrated solutions combining bespoke web redesign with technical SEO and Google Ads.
              </p>
            </div>

            <div className="relative z-10 shrink-0">
              <MagneticButton strength={0.25} cursorText="CUSTOM">
                <button
                  onClick={() => onSelectServiceForInquiry('Custom Integrated Digital Solution')}
                  className="shimmer-hover px-6 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-950 bg-[#E8DFC9] hover:bg-white transition-all duration-200 rounded-sm whitespace-nowrap shadow-sm hover:shadow-md"
                >
                  Discuss Custom Scope
                </button>
              </MagneticButton>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Detail Modal */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onRequestService={(name) => onSelectServiceForInquiry(name)}
      />
    </section>
  );
};
