import React, { useState, useMemo } from 'react';
import { Calculator, MessageSquare, ArrowRight, Check, Clock, Sparkles } from 'lucide-react';
import { EstimationInputs } from '../types';
import { calculateProjectEstimate } from '../utils/pricing';
import { buildWhatsAppInquiryUrl } from '../utils/validation';
import { ScrollReveal } from './motion/ScrollReveal';
import { MagneticButton } from './motion/MagneticButton';

interface ProjectEstimatorProps {
  onApplyEstimateToContact: (projectType: string, budgetRange: string, notes: string) => void;
}

export const ProjectEstimator: React.FC<ProjectEstimatorProps> = ({
  onApplyEstimateToContact,
}) => {
  const [inputs, setInputs] = useState<EstimationInputs>({
    projectType: 'business-corporate',
    pagesCount: '6-12',
    seoTier: 'foundation',
    adsSetup: false,
    securityMaintenance: 'quarterly',
    deliverySpeed: 'standard',
  });

  const estimate = useMemo(() => calculateProjectEstimate(inputs), [inputs]);

  const handleSendToWhatsApp = () => {
    const projectTypeName = {
      'business-corporate': 'Corporate Business Website',
      'ecommerce-store': 'E-Commerce Storefront',
      'web-redesign': 'Website Redesign & Optimization',
      'custom-webapp': 'Custom Web Application',
    }[inputs.projectType];

    const budget = `€${estimate.estimatedMinEuro.toLocaleString()} – €${estimate.estimatedMaxEuro.toLocaleString()}`;
    const customMessage = `Configured scope: ${inputs.pagesCount} pages, SEO: ${inputs.seoTier}, Ads: ${inputs.adsSetup ? 'Yes' : 'No'}, Maintenance: ${inputs.securityMaintenance}. Timeline: ${estimate.timelineWeeks}.`;

    const url = buildWhatsAppInquiryUrl({
      projectType: projectTypeName,
      budgetRange: budget,
      customMessage,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleApplyToForm = () => {
    const projectTypeName = {
      'business-corporate': 'Website Design & Development (Corporate)',
      'ecommerce-store': 'Website Design & Development (E-Commerce)',
      'web-redesign': 'Website Redesign & Optimization',
      'custom-webapp': 'Custom Web Application Development',
    }[inputs.projectType];

    const budget = `€${estimate.estimatedMinEuro.toLocaleString()} – €${estimate.estimatedMaxEuro.toLocaleString()}`;
    const notes = `Interactive estimate: Scope of ${inputs.pagesCount} pages with ${inputs.seoTier} SEO tier, ${inputs.adsSetup ? 'including Google Ads setup' : 'without ads setup'}, and ${inputs.securityMaintenance} maintenance. Estimated timeline: ${estimate.timelineWeeks}.`;

    onApplyEstimateToContact(projectTypeName, budget, notes);
  };

  return (
    <section id="estimator" className="py-24 lg:py-32 bg-[#F6F5F0] border-t border-neutral-200/90 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header with ScrollReveal */}
        <ScrollReveal variant="fade-up" delayMs={50}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-neutral-300">
            <div>
              <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-3">
                05 — Transparency &amp; Planning
              </div>
              <h2 className="font-editorial text-4xl sm:text-5xl font-semibold text-neutral-900 tracking-tight">
                Interactive Scope &amp; Budget Estimator
              </h2>
            </div>
            <p className="max-w-md text-sm md:text-base text-neutral-600 leading-relaxed font-normal">
              Configure your technical requirements to receive an immediate, realistic investment range and delivery timeline based on international agency standards.
            </p>
          </div>
        </ScrollReveal>

        {/* Estimator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Controls Column (7 cols) with ScrollReveal */}
          <div className="lg:col-span-7 space-y-8 bg-white p-8 sm:p-10 rounded-sm border border-neutral-200/90 shadow-2xs">
            {/* 1. Project Type */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-900 mb-3">
                1. Project Architecture &amp; Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'business-corporate', label: 'Corporate Website', desc: 'Bespoke business presence' },
                  { id: 'ecommerce-store', label: 'E-Commerce Platform', desc: 'Catalog, cart & checkout' },
                  { id: 'web-redesign', label: 'Website Redesign', desc: 'Modernize legacy platform' },
                  { id: 'custom-webapp', label: 'Custom Web Application', desc: 'Portals, SaaS & dashboards' },
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setInputs({ ...inputs, projectType: type.id as any })}
                    className={`p-4 text-left border rounded-sm transition-all duration-200 ${
                      inputs.projectType === type.id
                        ? 'border-neutral-950 bg-neutral-900 text-white shadow-xs scale-[1.01]'
                        : 'border-neutral-200 bg-[#FAF9F5] text-neutral-800 hover:border-neutral-400'
                    }`}
                  >
                    <div className="text-sm font-semibold">{type.label}</div>
                    <div className={`text-xs mt-1 ${inputs.projectType === type.id ? 'text-neutral-300' : 'text-neutral-500'}`}>
                      {type.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Page & Template Scope */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-900 mb-3">
                2. Page &amp; Layout Complexity
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: '1-5', label: '1–5 Pages' },
                  { id: '6-12', label: '6–12 Pages' },
                  { id: '13-25', label: '13–25 Pages' },
                  { id: '25+', label: '25+ Pages' },
                ].map((scope) => (
                  <button
                    key={scope.id}
                    type="button"
                    onClick={() => setInputs({ ...inputs, pagesCount: scope.id as any })}
                    className={`py-3 px-2 text-center border rounded-sm text-xs font-semibold transition-all duration-200 ${
                      inputs.pagesCount === scope.id
                        ? 'border-neutral-950 bg-neutral-900 text-white shadow-2xs scale-[1.02]'
                        : 'border-neutral-200 bg-[#FAF9F5] text-neutral-700 hover:border-neutral-400'
                    }`}
                  >
                    {scope.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. SEO Tier */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-900 mb-3">
                3. Search Engine Optimization (SEO) Tier
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'foundation', label: 'Technical SEO', desc: 'Semantic markup & Schema.org' },
                  { id: 'advanced-growth', label: 'Growth Architecture', desc: 'Keyword mapping & content silos' },
                  { id: 'none', label: 'Standard Baseline', desc: 'Default semantic HTML' },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setInputs({ ...inputs, seoTier: tier.id as any })}
                    className={`p-3 text-left border rounded-sm transition-all duration-200 ${
                      inputs.seoTier === tier.id
                        ? 'border-neutral-950 bg-neutral-900 text-white shadow-2xs scale-[1.01]'
                        : 'border-neutral-200 bg-[#FAF9F5] text-neutral-800 hover:border-neutral-400'
                    }`}
                  >
                    <div className="text-xs font-semibold">{tier.label}</div>
                    <div className={`text-2xs mt-1 ${inputs.seoTier === tier.id ? 'text-neutral-300' : 'text-neutral-500'}`}>
                      {tier.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Google Ads & Maintenance */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-neutral-200">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-900 mb-2">
                  Google Ads &amp; Conversion Tracking
                </label>
                <button
                  type="button"
                  onClick={() => setInputs({ ...inputs, adsSetup: !inputs.adsSetup })}
                  className={`w-full p-3 text-left border rounded-sm text-xs font-semibold transition-all duration-200 flex items-center justify-between ${
                    inputs.adsSetup
                      ? 'border-neutral-950 bg-neutral-900 text-white shadow-2xs'
                      : 'border-neutral-200 bg-[#FAF9F5] text-neutral-700 hover:border-neutral-400'
                  }`}
                >
                  <span>Google Ads Campaign Setup</span>
                  <span className={`text-2xs uppercase tracking-wider px-2 py-0.5 rounded-xs transition-colors ${inputs.adsSetup ? 'bg-amber-800 text-white' : 'bg-neutral-200 text-neutral-600'}`}>
                    {inputs.adsSetup ? 'Selected' : 'Optional'}
                  </span>
                </button>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-900 mb-2">
                  Delivery Speed
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setInputs({ ...inputs, deliverySpeed: 'standard' })}
                    className={`py-3 text-center border rounded-sm text-xs font-semibold transition-all duration-200 ${
                      inputs.deliverySpeed === 'standard'
                        ? 'border-neutral-950 bg-neutral-900 text-white'
                        : 'border-neutral-200 bg-[#FAF9F5] text-neutral-700 hover:border-neutral-400'
                    }`}
                  >
                    Standard Pace
                  </button>
                  <button
                    type="button"
                    onClick={() => setInputs({ ...inputs, deliverySpeed: 'accelerated' })}
                    className={`py-3 text-center border rounded-sm text-xs font-semibold transition-all duration-200 ${
                      inputs.deliverySpeed === 'accelerated'
                        ? 'border-neutral-950 bg-neutral-900 text-white'
                        : 'border-neutral-200 bg-[#FAF9F5] text-neutral-700 hover:border-neutral-400'
                    }`}
                  >
                    Accelerated Sprint
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary Column (5 cols) with Sticky & Smooth Update transitions */}
          <div className="lg:col-span-5 bg-neutral-900 text-white p-8 sm:p-10 rounded-sm border border-neutral-800 shadow-xl sticky top-24 relative overflow-hidden group">
            {/* Ambient accent light */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between pb-6 border-b border-neutral-800">
              <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Estimated Investment Range
              </span>
              <Calculator className="w-4 h-4 text-neutral-400" />
            </div>

            <div className="py-8 relative z-10">
              <div className="font-editorial text-4xl sm:text-5xl font-semibold text-white tracking-tight tabular-nums transition-all duration-300">
                €{estimate.estimatedMinEuro.toLocaleString()} – €{estimate.estimatedMaxEuro.toLocaleString()}
              </div>
              <div className="text-xs text-neutral-400 mt-2 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Estimated Timeline: <strong className="text-white font-medium">{estimate.timelineWeeks}</strong></span>
              </div>
            </div>

            {/* Key Deliverables Included in this scope */}
            <div className="space-y-3 pb-8 border-b border-neutral-800 relative z-10">
              <span className="text-2xs uppercase tracking-wider text-neutral-400 font-semibold block">
                Scope Inclusions
              </span>
              <ul className="space-y-2 text-xs text-neutral-300">
                {estimate.summaryRecommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs with Magnetic Buttons */}
            <div className="pt-6 space-y-3 relative z-10">
              <MagneticButton strength={0.2} cursorText="APPLY" className="w-full">
                <button
                  type="button"
                  onClick={handleApplyToForm}
                  className="shimmer-hover w-full py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-neutral-950 bg-[#E8DFC9] hover:bg-white transition-all duration-200 rounded-sm flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Apply Scope to Project Inquiry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </MagneticButton>

              <MagneticButton strength={0.15} cursorText="CHAT" className="w-full">
                <button
                  type="button"
                  onClick={handleSendToWhatsApp}
                  className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-800 hover:bg-neutral-700 transition-all duration-200 rounded-sm flex items-center justify-center gap-2 border border-neutral-700"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Discuss Estimate on WhatsApp</span>
                </button>
              </MagneticButton>

              <p className="text-2xs text-neutral-400 text-center pt-2">
                Formal project contracts include clear milestone billing and guaranteed sprint commitments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
