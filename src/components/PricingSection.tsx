import React from 'react';
import { Check, ArrowUpRight, MessageSquare, Sparkles, ShieldCheck, HelpCircle } from 'lucide-react';
import { PRICING_PLANS, AGENCY_INFO } from '../data/agencyData';
import { PricingPlan } from '../types';
import { ScrollReveal } from './motion/ScrollReveal';
import { TiltCard } from './motion/TiltCard';
import { MagneticButton } from './motion/MagneticButton';

interface PricingSectionProps {
  onSelectPlan: (plan: PricingPlan) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  return (
    <section id="pricing" className="py-24 lg:py-32 bg-[#FAF9F5] relative overflow-hidden">
      {/* Subtle architectural grid guidelines */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="max-w-7xl mx-auto h-full px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 divide-x divide-neutral-200/60">
          <div className="h-full" />
          <div className="h-full hidden md:block" />
          <div className="h-full hidden md:block" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <ScrollReveal variant="fade-up" className="max-w-3xl mb-16 lg:mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-amber-800/60" />
            <span className="text-2xs uppercase tracking-widest text-amber-900 font-semibold">
              Transparent Investment
            </span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-neutral-900 leading-[1.08] mb-6">
            Predictable, Value-Driven{' '}
            <span className="italic font-normal text-amber-900">Website Packages</span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed">
            Every engagement is engineered for measurable digital return. Choose a package tailored to your commercial scale, backed by clean code, high speed, and bespoke aesthetics.
          </p>
        </ScrollReveal>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 items-stretch">
          {PRICING_PLANS.map((plan, index) => {
            const isPopular = plan.popular;

            return (
              <ScrollReveal
                key={plan.id}
                variant="fade-up"
                delayMs={index * 120}
                className="flex"
              >
                <TiltCard
                  maxTilt={isPopular ? 5 : 4}
                  glare={true}
                  className="w-full flex flex-col"
                >
                  <div
                    className={`relative w-full h-full flex flex-col justify-between p-8 sm:p-10 rounded-sm transition-all duration-300 ${
                      isPopular
                        ? 'bg-neutral-950 text-white shadow-2xl ring-1 ring-amber-500/40 relative z-20'
                        : 'bg-white/80 backdrop-blur-xs text-neutral-900 border border-neutral-200/90 shadow-sm hover:shadow-md hover:border-neutral-300 relative z-10'
                    }`}
                  >
                    {/* Top ambient highlight for popular card */}
                    {isPopular && (
                      <div
                        aria-hidden="true"
                        className="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"
                      />
                    )}

                    {/* Card Header & Badge */}
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-6">
                        <span
                          className={`text-xs font-mono tracking-widest font-semibold uppercase ${
                            isPopular ? 'text-amber-400' : 'text-neutral-400'
                          }`}
                        >
                          {plan.number} — PLAN
                        </span>

                        {isPopular && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-2xs font-semibold uppercase tracking-wider bg-amber-400/15 text-amber-300 border border-amber-400/30">
                            <Sparkles className="w-3 h-3 text-amber-300" />
                            MOST POPULAR
                          </span>
                        )}
                      </div>

                      {/* Plan Title */}
                      <h3
                        className={`font-editorial text-2xl sm:text-3xl font-light tracking-tight mb-2 ${
                          isPopular ? 'text-white' : 'text-neutral-950'
                        }`}
                      >
                        {plan.name}
                      </h3>

                      {/* Tagline */}
                      <p
                        className={`text-xs sm:text-sm leading-relaxed mb-6 min-h-[40px] ${
                          isPopular ? 'text-neutral-300' : 'text-neutral-600'
                        }`}
                      >
                        {plan.tagline}
                      </p>

                      {/* Price Display */}
                      <div
                        className={`py-5 border-y my-6 ${
                          isPopular ? 'border-neutral-800' : 'border-neutral-100'
                        }`}
                      >
                        <div className="flex items-baseline gap-1.5">
                          <span
                            className={`font-editorial text-5xl sm:text-6xl font-normal tracking-tight ${
                              isPopular ? 'text-white' : 'text-neutral-950'
                            }`}
                          >
                            ${plan.priceUsd}
                          </span>
                          <span
                            className={`text-xs uppercase tracking-wider font-semibold ${
                              isPopular ? 'text-amber-400' : 'text-amber-900'
                            }`}
                          >
                            USD
                          </span>
                        </div>
                        <span
                          className={`block text-2xs uppercase tracking-wider mt-1.5 ${
                            isPopular ? 'text-neutral-400' : 'text-neutral-500'
                          }`}
                        >
                          Turnkey package rate · Complete delivery
                        </span>
                      </div>

                      {/* Feature Checklist */}
                      <div className="space-y-3.5 mb-8">
                        <span
                          className={`block text-2xs font-semibold uppercase tracking-wider ${
                            isPopular ? 'text-neutral-400' : 'text-neutral-500'
                          }`}
                        >
                          Included Deliverables
                        </span>
                        <ul className="space-y-3">
                          {plan.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-3">
                              <span
                                className={`shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5 ${
                                  isPopular
                                    ? 'bg-amber-400/20 text-amber-300'
                                    : 'bg-amber-800/10 text-amber-900'
                                }`}
                              >
                                <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                              </span>
                              <span
                                className={`text-xs sm:text-sm leading-snug ${
                                  isPopular ? 'text-neutral-200' : 'text-neutral-700'
                                }`}
                              >
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="pt-6 border-t border-neutral-200/50 dark:border-neutral-800 space-y-3">
                      <MagneticButton strength={0.2} cursorText="SELECT">
                        <button
                          onClick={() => onSelectPlan(plan)}
                          className={`w-full py-3.5 px-6 rounded-sm text-xs font-semibold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 group shadow-2xs hover:shadow-md ${
                            isPopular
                              ? 'bg-white text-neutral-950 hover:bg-neutral-200'
                              : 'bg-neutral-900 text-white hover:bg-neutral-800'
                          }`}
                        >
                          <span>{plan.ctaLabel}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </button>
                      </MagneticButton>

                      {/* Secondary WhatsApp Direct Inquire */}
                      <a
                        href={`https://wa.me/${AGENCY_INFO.phoneRaw}?text=${encodeURIComponent(
                          `Hello ZAVYROWEB, I am interested in commissioning the ${plan.name} Plan ($${plan.priceUsd} USD) for our business website.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full py-2 px-3 text-center text-2xs tracking-wide font-medium flex items-center justify-center gap-1.5 transition-colors ${
                          isPopular
                            ? 'text-neutral-400 hover:text-emerald-400'
                            : 'text-neutral-500 hover:text-emerald-700'
                        }`}
                        aria-label={`Inquire about ${plan.name} on WhatsApp`}
                      >
                        <MessageSquare className="w-3 h-3 text-emerald-500" />
                        <span>Discuss this plan on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Scope Clarity & Disclaimers Accordion / Card */}
        <ScrollReveal variant="fade-up" delayMs={300} className="mt-16">
          <div className="p-6 sm:p-8 bg-neutral-100/70 border border-neutral-200/80 rounded-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-neutral-200">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-800 shrink-0" />
                <h4 className="text-sm font-semibold tracking-wide text-neutral-900 uppercase">
                  Transparent Scope &amp; Deliverables Policy
                </h4>
              </div>
              <span className="text-2xs text-neutral-500 uppercase tracking-wider font-mono">
                No Hidden Surprises · Clear Ownership
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-xs text-neutral-600 leading-relaxed">
              <div>
                <strong className="block text-neutral-900 font-semibold mb-1">
                  Turnkey Development Included
                </strong>
                Every plan includes custom responsive design, semantic coding, clean asset optimization, mobile testing, and full production deployment to your target environment.
              </div>
              <div>
                <strong className="block text-neutral-900 font-semibold mb-1">
                  100% Client Asset Ownership
                </strong>
                Upon project completion, you retain 100% full intellectual property and ownership of all custom code, design files, content, and production builds.
              </div>
              <div>
                <strong className="block text-neutral-900 font-semibold mb-1">
                  Domains &amp; Infrastructure
                </strong>
                Domain registration fees, third-party hosting infrastructure, and ongoing dedicated maintenance are client-managed or available as tailored optional monthly retainers.
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
