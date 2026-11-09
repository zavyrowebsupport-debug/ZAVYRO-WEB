import React from 'react';
import { X, Shield, FileText } from 'lucide-react';
import { AGENCY_INFO } from '../data/agencyData';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-950/75 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      <div
        className="relative w-full max-w-3xl bg-[#FAF9F5] border border-neutral-300 rounded-sm shadow-2xl p-6 sm:p-10 my-8 text-neutral-900 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-6 border-b border-neutral-200">
          <div className="flex items-center gap-2">
            {isPrivacy ? (
              <Shield className="w-5 h-5 text-amber-800" />
            ) : (
              <FileText className="w-5 h-5 text-amber-800" />
            )}
            <h2 id="legal-modal-title" className="font-editorial text-2xl font-semibold text-neutral-900">
              {isPrivacy ? 'Privacy & Data Protection Policy' : 'Terms of Service & Engagement'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-500 hover:text-neutral-900 rounded-sm hover:bg-neutral-200/50 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-6 space-y-6 text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
          {isPrivacy ? (
            <>
              <p>
                <strong>Last Updated: January 2026.</strong> ZAVYROWEB (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to safeguarding the privacy and confidentiality of our clients, prospective clients, and website visitors.
              </p>
              <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider">
                1. Information We Collect
              </h3>
              <p>
                We only collect information voluntarily submitted through our project inquiry forms, direct email communications, or WhatsApp contact channels. This includes your name, email address, phone number, company name, and project specifications.
              </p>
              <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider">
                2. Use of Information
              </h3>
              <p>
                Collected data is used solely to assess project feasibility, deliver custom architectural proposals, and communicate regarding services. We never sell, lease, or monetize your contact details with external third-party advertisers.
              </p>
              <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider">
                3. Technical Security Standards
              </h3>
              <p>
                All data submitted through our website is encrypted in transit using industry-standard TLS/HTTPS protocols. We employ strict sanitization and anti-bot validation mechanisms to protect our systems and your communications.
              </p>
              <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider">
                4. Contact &amp; Data Rights
              </h3>
              <p>
                You may request access to, correction of, or permanent deletion of your inquiry data at any time by contacting our data protection lead at <a href={`mailto:${AGENCY_INFO.email}`} className="text-amber-800 underline">{AGENCY_INFO.email}</a>.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>Last Updated: January 2026.</strong> These Terms of Service govern all website visits, project estimations, and professional digital consulting engagements provided by ZAVYROWEB.
              </p>
              <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider">
                1. Scope of Work &amp; Sprint Commitments
              </h3>
              <p>
                Formal digital agency engagements are governed by individual Statements of Work (SOW) executed between ZAVYROWEB and the client, defining specific sprint milestones, deliverables, payment terms, and technical specifications.
              </p>
              <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider">
                2. Intellectual Property
              </h3>
              <p>
                Upon receipt of full payment according to the agreed contract milestones, all custom website source code, design assets, and production deliverables are assigned fully to the client. ZAVYROWEB retains the right to reference the completed work in our professional portfolio unless restricted by a signed Non-Disclosure Agreement (NDA).
              </p>
              <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider">
                3. Search Engine &amp; Performance Transparency
              </h3>
              <p>
                While ZAVYROWEB applies rigorous technical SEO standards, Schema.org entity graphs, and Core Web Vitals optimization, search rankings are subject to independent algorithmic changes by search engines (e.g., Google). We do not provide fraudulent ranking guarantees.
              </p>
              <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider">
                4. Governing Law
              </h3>
              <p>
                These terms and any disputes arising from website interactions are governed by international commercial standards and applicable statutory provisions. Direct inquiries may be submitted to <a href={`mailto:${AGENCY_INFO.email}`} className="text-amber-800 underline">{AGENCY_INFO.email}</a>.
              </p>
            </>
          )}
        </div>

        <div className="pt-6 border-t border-neutral-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 rounded-sm hover:bg-neutral-800 transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
