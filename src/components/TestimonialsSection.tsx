import React from 'react';
import { ShieldCheck, Lock, CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react';
import { AGENCY_INFO } from '../data/agencyData';
import { ScrollReveal } from './motion/ScrollReveal';
import { MagneticButton } from './motion/MagneticButton';

interface TestimonialsSectionProps {
  onRequestReferences: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  onRequestReferences,
}) => {
  return (
    <section className="py-24 lg:py-32 bg-[#FAF9F5] border-t border-neutral-200/90 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header with ScrollReveal */}
        <ScrollReveal variant="fade-up" delayMs={50}>
          <div className="max-w-3xl mb-16">
            <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-3">
              06 — Trust &amp; Integrity
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl font-semibold text-neutral-900 tracking-tight mb-4">
              Authentic Client Endorsements &amp; References
            </h2>
            <p className="text-base text-neutral-600 leading-relaxed font-normal">
              We adhere to a strict authenticity policy: we do not publish anonymous or fabricated testimonials. Every client relationship we maintain is backed by verifiable project delivery.
            </p>
          </div>
        </ScrollReveal>

        {/* Elegant Placeholder & Verification Protocol Container with ScrollReveal */}
        <ScrollReveal variant="fade-up" delayMs={150}>
          <div className="p-8 sm:p-12 bg-white border border-neutral-200/90 rounded-sm shadow-2xs hover:border-neutral-300 transition-colors">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Col: Verification statement */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-800 font-semibold mb-4">
                  <ShieldCheck className="w-4 h-4 text-amber-800" />
                  Verified Reference Verification Protocol
                </div>

                <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-neutral-900 mb-4 leading-snug">
                  Speak directly with the founders and business leaders we build for.
                </h3>

                <p className="text-sm text-neutral-600 leading-relaxed mb-6 font-normal">
                  Because many of our clients operate in competitive luxury, automotive, and high-growth e-commerce sectors under mutual non-disclosure agreements, we connect qualified prospective clients with verified peer references upon request during our discovery consultations.
                </p>

                {/* Verified track records */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-100 text-xs text-neutral-700">
                  <div className="flex items-start gap-2 group/t">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 group-hover/t:scale-110 transition-transform" />
                    <span>100% on-time milestone delivery</span>
                  </div>
                  <div className="flex items-start gap-2 group/t">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 group-hover/t:scale-110 transition-transform" />
                    <span>Direct senior engineer access</span>
                  </div>
                  <div className="flex items-start gap-2 group/t">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 group-hover/t:scale-110 transition-transform" />
                    <span>Zero fabricated marketing reviews</span>
                  </div>
                </div>
              </div>

              {/* Right Col: Action Box */}
              <div className="lg:col-span-5 bg-[#FAF9F5] p-6 sm:p-8 rounded-sm border border-neutral-200 flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-neutral-500 font-semibold block mb-2">
                    Client Collaboration Desk
                  </span>
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed mb-6">
                    Are you considering partnering with ZAVYROWEB for a strategic web build, redesign, or SEO campaign? Request a direct introduction to a past client in your domain.
                  </p>
                </div>

                <div className="space-y-3">
                  <MagneticButton strength={0.2} cursorText="REF" className="w-full">
                    <button
                      type="button"
                      onClick={onRequestReferences}
                      className="shimmer-hover w-full py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 transition-colors rounded-sm flex items-center justify-center gap-2 shadow-xs"
                    >
                      <span>Request Reference Introduction</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </MagneticButton>

                  <a
                    href={`mailto:${AGENCY_INFO.email}?subject=Client%20Reference%20Inquiry%20-%20ZAVYROWEB`}
                    className="w-full py-2.5 px-4 text-xs font-medium text-neutral-600 hover:text-neutral-900 text-center block transition-colors underline decoration-neutral-300"
                  >
                    Contact support directly at {AGENCY_INFO.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
