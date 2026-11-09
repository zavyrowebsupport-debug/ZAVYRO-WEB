import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { WhyZavyro } from './components/WhyZavyro';
import { ProcessSection } from './components/ProcessSection';
import { ProjectEstimator } from './components/ProjectEstimator';
import { TestimonialsSection } from './components/TestimonialsSection';
import { InsightsSection } from './components/InsightsSection';
import { PricingSection } from './components/PricingSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModals';
import { CustomCursor } from './components/motion/CustomCursor';
import { AnimatedGoldCanvas } from './components/motion/AnimatedGoldCanvas';
import { MagneticButton } from './components/motion/MagneticButton';
import { MessageSquare, ArrowUp, X, Shield } from 'lucide-react';
import { AGENCY_INFO } from './data/agencyData';
import { PricingPlan } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [cookieConsentDismissed, setCookieConsentDismissed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('zavyro_cookie_dismissed') === 'true';
    } catch {
      return false;
    }
  });

  // Prefilled contact form values from estimator or service selection
  const [contactPrefills, setContactPrefills] = useState<{
    type?: string;
    budget?: string;
    notes?: string;
  }>({});

  // Active section tracking via intersection observer
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      const sectionIds = ['services', 'pricing', 'projects', 'why-us', 'process', 'estimator', 'insights', 'contact'];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartProject = () => {
    scrollToSection('contact');
  };

  const handleSelectPlan = (plan: PricingPlan) => {
    setContactPrefills({
      type: `${plan.name} Plan ($${plan.priceUsd} USD)`,
      budget: `$${plan.priceUsd} USD`,
      notes: `Inquiring about commissioning the ${plan.name} Plan ($${plan.priceUsd} USD). Target scope includes: ${plan.features.slice(0, 3).join(', ')}.`,
    });
    scrollToSection('contact');
  };

  const handleSelectServiceForInquiry = (serviceName: string) => {
    setContactPrefills({
      type: serviceName,
      notes: `Inquiry regarding ${serviceName} specifications and deliverables.`,
    });
    scrollToSection('contact');
  };

  const handleStartSimilarProject = (projectName: string) => {
    setContactPrefills({
      type: `Platform similar to ${projectName}`,
      notes: `Interested in a bespoke digital platform inspired by the ${projectName} case study.`,
    });
    scrollToSection('contact');
  };

  const handleApplyEstimate = (type: string, budget: string, notes: string) => {
    setContactPrefills({
      type,
      budget,
      notes,
    });
    scrollToSection('contact');
  };

  const handleDismissCookies = () => {
    setCookieConsentDismissed(true);
    try {
      localStorage.setItem('zavyro_cookie_dismissed', 'true');
    } catch {
      // storage unavailable
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-neutral-900 selection:bg-[#E8DFC9] selection:text-neutral-900 relative">
      {/* Luxury Desktop Custom Cursor */}
      <CustomCursor />

      {/* Restrained Ambient Particle & Lighting Canvas */}
      <AnimatedGoldCanvas />

      {/* Primary Sticky Top Bar */}
      <Navbar
        onStartProject={handleStartProject}
        activeSection={activeSection}
      />

      {/* Main Content Area */}
      <main className="flex-grow relative z-10">
        <Hero
          onExploreServices={() => scrollToSection('services')}
          onViewWork={() => scrollToSection('projects')}
          onStartProject={handleStartProject}
        />

        <ServicesSection
          onSelectServiceForInquiry={handleSelectServiceForInquiry}
        />

        <PricingSection
          onSelectPlan={handleSelectPlan}
        />

        <PortfolioSection
          onStartSimilarProject={handleStartSimilarProject}
        />

        <WhyZavyro
          onStartConsultation={handleStartProject}
        />

        <ProcessSection />

        <ProjectEstimator
          onApplyEstimateToContact={handleApplyEstimate}
        />

        <TestimonialsSection
          onRequestReferences={() => {
            setContactPrefills({
              type: 'Client Reference Inquiry',
              notes: 'Requesting a direct introduction to a verified client reference in our industry before commissioning.',
            });
            scrollToSection('contact');
          }}
        />

        <InsightsSection
          onStartProject={handleStartProject}
        />

        <ContactSection
          prefilledType={contactPrefills.type}
          prefilledBudget={contactPrefills.budget}
          prefilledNotes={contactPrefills.notes}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
        onSelectService={handleSelectServiceForInquiry}
      />

      {/* Legal Modals (Privacy & Terms) */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      {/* Subtle Cookie Notice Banner */}
      {!cookieConsentDismissed && (
        <aside
          aria-label="Cookie consent banner"
          className="fixed bottom-4 left-4 right-4 sm:left-6 sm:max-w-md z-40 p-4 bg-neutral-900 text-white rounded-sm shadow-xl border border-neutral-800 text-xs flex flex-col gap-3"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 font-medium text-amber-200">
              <Shield className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Privacy &amp; Technical Cookies</span>
            </div>
            <button
              onClick={handleDismissCookies}
              className="text-neutral-400 hover:text-white"
              aria-label="Dismiss cookie notice"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-neutral-300 text-2xs leading-relaxed">
            We use essential technical cookies to analyze performance and ensure secure inquiry handling. By using our site, you agree to our{' '}
            <button
              onClick={() => setLegalModalType('privacy')}
              className="underline text-amber-300 hover:text-white"
            >
              Privacy Policy
            </button>.
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={handleDismissCookies}
              className="px-3 py-1.5 text-2xs uppercase tracking-wider font-semibold bg-white text-neutral-950 rounded-xs hover:bg-neutral-200 transition-colors"
            >
              Acknowledge &amp; Accept
            </button>
          </div>
        </aside>
      )}

      {/* Floating Action Controls (Back to Top & Direct WhatsApp) */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-center gap-3">
        {showScrollTop && (
          <MagneticButton strength={0.3} cursorText="TOP">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-10 h-10 rounded-full bg-white/90 text-neutral-800 border border-neutral-300 shadow-md flex items-center justify-center hover:bg-neutral-950 hover:text-white hover:border-neutral-950 transition-all duration-200"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </MagneticButton>
        )}

        <MagneticButton strength={0.25} cursorText="CHAT">
          <a
            href={`https://wa.me/${AGENCY_INFO.phoneRaw}?text=${encodeURIComponent('Hello ZAVYROWEB team, I would like to inquire about a digital project.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-2 py-2.5 px-4 bg-neutral-900 text-white rounded-full shadow-lg border border-neutral-700 hover:bg-emerald-800 hover:border-emerald-700 transition-all duration-200"
            aria-label="Chat directly on WhatsApp"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400 group-hover:text-white transition-colors" />
            <span className="text-xs font-semibold tracking-wide whitespace-nowrap">
              WhatsApp Desk
            </span>
          </a>
        </MagneticButton>
      </div>
    </div>
  );
}
