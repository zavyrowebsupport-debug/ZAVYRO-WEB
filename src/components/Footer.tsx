import React from 'react';
import { ArrowUpRight, MessageSquare, Mail, Phone, Globe, Shield, Terminal } from 'lucide-react';
import { AGENCY_INFO, SERVICES_DATA } from '../data/agencyData';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onSelectService: (serviceName: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacy,
  onOpenTerms,
  onSelectService,
}) => {
  return (
    <footer className="bg-neutral-950 text-white pt-20 pb-12 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-neutral-800">
          {/* Brand & Agency Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <a href="#" className="inline-block">
              <span className="font-editorial text-3xl font-bold tracking-wider text-white">
                ZAVYRO<span className="text-amber-400 font-normal">WEB</span>
              </span>
            </a>

            <p className="text-sm text-neutral-400 leading-relaxed font-normal max-w-sm">
              ZAVYROWEB is a premium international digital agency. We architect, design, develop, and optimize high-performance websites, technical SEO strategies, and digital growth engines for ambitious businesses worldwide.
            </p>

            <div className="flex flex-col gap-2 pt-2 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>Headquartered in Casablanca · Global Client Reach</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Enterprise Security &amp; ISO 27001 Standards Aware</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Pricing Plans
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Client Projects
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-white transition-colors">
                  Why ZAVYROWEB
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-white transition-colors">
                  Methodology
                </a>
              </li>
              <li>
                <a href="#estimator" className="hover:text-white transition-colors">
                  Project Estimator
                </a>
              </li>
              <li>
                <a href="#insights" className="hover:text-white transition-colors">
                  Insights &amp; Articles
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Services (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-4">
              Core Disciplines
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              {SERVICES_DATA.map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => onSelectService(service.title)}
                    className="hover:text-white text-left transition-colors"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Direct Line (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-4">
              Direct Agency Desk
            </h4>

            <div className="text-xs text-neutral-400 space-y-3">
              <div>
                <span className="block text-2xs uppercase tracking-wider text-neutral-500 mb-0.5">
                  Phone &amp; WhatsApp
                </span>
                <a
                  href={`https://wa.me/${AGENCY_INFO.phoneRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-white hover:text-amber-400 transition-colors block"
                >
                  {AGENCY_INFO.phone}
                </a>
                <span className="text-2xs text-neutral-500">
                  {AGENCY_INFO.phoneInternational}
                </span>
              </div>

              <div>
                <span className="block text-2xs uppercase tracking-wider text-neutral-500 mb-0.5">
                  Agency Email
                </span>
                <a
                  href={`mailto:${AGENCY_INFO.email}`}
                  className="text-sm font-semibold text-white hover:text-amber-400 transition-colors block"
                >
                  {AGENCY_INFO.email}
                </a>
              </div>

              <div>
                <span className="block text-2xs uppercase tracking-wider text-neutral-500 mb-0.5">
                  Office Hours
                </span>
                <span className="text-neutral-300 block">
                  {AGENCY_INFO.workingHours}
                </span>
              </div>
            </div>

            {/* Social media links */}
            <div className="pt-2">
              <span className="block text-2xs uppercase tracking-wider text-neutral-500 mb-2">
                Connect With Us
              </span>
              <div className="flex items-center gap-3 text-xs text-neutral-400">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  aria-label="LinkedIn profile"
                >
                  LinkedIn
                </a>
                <span aria-hidden="true">·</span>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  aria-label="Twitter / X profile"
                >
                  X (Twitter)
                </a>
                <span aria-hidden="true">·</span>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  aria-label="GitHub organization"
                >
                  GitHub
                </a>
                <span aria-hidden="true">·</span>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  aria-label="Instagram profile"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            &copy; {new Date().getFullYear()} ZAVYROWEB. All rights reserved. International Digital Agency.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-neutral-300 transition-colors"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={onOpenTerms}
              className="hover:text-neutral-300 transition-colors"
            >
              Terms of Service
            </button>
            <span aria-hidden="true">·</span>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-300 transition-colors"
            >
              XML Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
