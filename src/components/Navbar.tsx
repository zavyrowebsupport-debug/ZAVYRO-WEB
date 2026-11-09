import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, MessageSquare, Mail, Phone } from 'lucide-react';
import { AGENCY_INFO } from '../data/agencyData';
import { MagneticButton } from './motion/MagneticButton';

interface NavbarProps {
  onStartProject: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onStartProject, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Projects', href: '#projects' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Process', href: '#process' },
    { label: 'Estimator', href: '#estimator' },
    { label: 'Insights', href: '#insights' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF9F5]/92 backdrop-blur-md border-b border-neutral-200/80 shadow-xs py-3'
            : 'bg-transparent py-5'
        }`}
      >
        {/* Subtle scroll progress hairline indicator */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-amber-800/40 via-amber-700 to-amber-900 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark with hover interaction */}
          <a
            href="#"
            className="text-xl md:text-2xl font-bold tracking-tight text-neutral-900 whitespace-nowrap shrink-0 flex items-center gap-2 group"
          >
            <span className="font-editorial text-2xl md:text-3xl font-semibold tracking-wider text-neutral-900 group-hover:text-amber-900 transition-colors">
              ZAVYRO<span className="text-amber-800/80 font-normal group-hover:text-amber-700 transition-colors">WEB</span>
            </span>
          </a>

          {/* Zone 2: 4-5 clean single-line text navigation links with animated underline */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`whitespace-nowrap shrink-0 transition-colors hover:text-neutral-950 relative py-1 group/nav ${
                    isActive ? 'text-neutral-950 font-semibold' : ''
                  }`}
                >
                  <span>{link.label}</span>
                  {/* Smooth animated underline */}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900 rounded-full transition-transform duration-300 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover/nav:scale-x-100 group-hover/nav:bg-neutral-400'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action with MagneticButton */}
          <div className="flex items-center gap-4 shrink-0">
            <MagneticButton strength={0.25} cursorText="START">
              <button
                onClick={onStartProject}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wide uppercase text-neutral-900 bg-white border border-neutral-300 rounded-sm hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-200 shadow-2xs hover:shadow-sm whitespace-nowrap shrink-0 group/cta"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
              </button>
            </MagneticButton>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-700 hover:text-neutral-950 transition-colors focus:outline-hidden"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer with smooth slide-up animation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-neutral-950/60 backdrop-blur-xs flex flex-col justify-end animate-fadeIn">
          <div className="bg-[#FAF9F5] border-t border-neutral-300 p-6 rounded-t-2xl max-h-[85vh] overflow-y-auto transform transition-transform duration-300 animate-slideUp">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
              <span className="font-editorial text-2xl font-bold tracking-wider text-neutral-900">
                ZAVYRO<span className="text-amber-800/80">WEB</span>
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-neutral-600 hover:text-neutral-900"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-neutral-800 hover:text-neutral-950 py-1 transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-neutral-400" />
                </a>
              ))}
            </nav>

            <div className="pt-4 border-t border-neutral-200 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onStartProject();
                }}
                className="w-full py-3.5 text-center text-xs font-semibold tracking-wider uppercase text-white bg-neutral-900 rounded-sm hover:bg-neutral-800 transition-colors"
              >
                Start a Project
              </button>

              <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-neutral-600">
                <a
                  href={`https://wa.me/${AGENCY_INFO.phoneRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-neutral-100 rounded-sm hover:bg-neutral-200 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  WhatsApp
                </a>
                <a
                  href={`mailto:${AGENCY_INFO.email}`}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-neutral-100 rounded-sm hover:bg-neutral-200 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-neutral-700" />
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
