import React, { useState, useEffect } from 'react';
import { Mail, Phone, MessageSquare, Send, CheckCircle2, AlertCircle, ArrowUpRight, Lock } from 'lucide-react';
import { ContactFormData } from '../types';
import { validateContactForm, buildWhatsAppInquiryUrl, sanitizeInput } from '../utils/validation';
import { AGENCY_INFO } from '../data/agencyData';
import { ScrollReveal } from './motion/ScrollReveal';
import { MagneticButton } from './motion/MagneticButton';

interface ContactSectionProps {
  prefilledType?: string;
  prefilledBudget?: string;
  prefilledNotes?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  prefilledType,
  prefilledBudget,
  prefilledNotes,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: 'Website Design & Development',
    budgetRange: '€3,000 – €5,000',
    description: '',
    honeypot: '', // anti-bot spam trap
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<ContactFormData | null>(null);

  useEffect(() => {
    if (prefilledType) {
      setFormData((prev) => ({
        ...prev,
        projectType: prefilledType,
      }));
    }
    if (prefilledBudget) {
      setFormData((prev) => ({
        ...prev,
        budgetRange: prefilledBudget,
      }));
    }
    if (prefilledNotes) {
      setFormData((prev) => ({
        ...prev,
        description: prev.description ? `${prev.description}\n\n[Project Scope]: ${prefilledNotes}` : `[Project Scope]: ${prefilledNotes}`,
      }));
    }
  }, [prefilledType, prefilledBudget, prefilledNotes]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    // Sanitize values
    const cleanData: ContactFormData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      company: sanitizeInput(formData.company),
      phone: sanitizeInput(formData.phone),
      projectType: sanitizeInput(formData.projectType),
      budgetRange: sanitizeInput(formData.budgetRange),
      description: sanitizeInput(formData.description),
    };

    // Simulate secure transmission
    setTimeout(() => {
      setSubmittedData(cleanData);
      setIsSubmitting(false);
    }, 600);
  };

  const handleOpenWhatsAppFromForm = () => {
    const target = submittedData || formData;
    const url = buildWhatsAppInquiryUrl({
      name: target.name || undefined,
      projectType: target.projectType || undefined,
      budgetRange: target.budgetRange || undefined,
      customMessage: target.description || undefined,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-[#FAF9F5] border-t border-neutral-200/90 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Headline and Direct Channels (5 cols) with ScrollReveal */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <ScrollReveal variant="fade-up" delayMs={50}>
              <div>
                <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-3">
                  08 — Project Inquiries
                </div>
                <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-semibold text-neutral-900 tracking-tight mb-6">
                  Let's Build Something Exceptional.
                </h2>
                <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal mb-8">
                  Tell us about your project. Our team will help you identify the right digital solution.
                </p>

                {/* Direct channels */}
                <div className="space-y-6 pt-6 border-t border-neutral-300">
                  {/* Phone / WhatsApp */}
                  <div className="flex items-start gap-4 group/item">
                    <div className="p-3 bg-neutral-100 rounded-sm text-neutral-800 group-hover/item:bg-neutral-200 transition-colors">
                      <MessageSquare className="w-5 h-5 text-emerald-700" />
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider text-neutral-500 font-semibold block mb-0.5">
                        Phone &amp; WhatsApp Direct Line
                      </span>
                      <a
                        href={`https://wa.me/${AGENCY_INFO.phoneRaw}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-semibold text-neutral-900 hover:text-emerald-700 transition-colors block"
                      >
                        {AGENCY_INFO.phone} <span className="text-xs text-neutral-500 font-normal">({AGENCY_INFO.phoneInternational})</span>
                      </a>
                      <span className="text-xs text-neutral-500">
                        Direct WhatsApp messaging available 7 days a week
                      </span>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4 group/item">
                    <div className="p-3 bg-neutral-100 rounded-sm text-neutral-800 group-hover/item:bg-neutral-200 transition-colors">
                      <Mail className="w-5 h-5 text-neutral-800" />
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider text-neutral-500 font-semibold block mb-0.5">
                        Direct Agency Email
                      </span>
                      <a
                        href={`mailto:${AGENCY_INFO.email}`}
                        className="text-base font-semibold text-neutral-900 hover:text-amber-800 transition-colors block"
                      >
                        {AGENCY_INFO.email}
                      </a>
                      <span className="text-xs text-neutral-500">
                        Guaranteed response within 24 business hours
                      </span>
                    </div>
                  </div>

                  {/* Security pledge */}
                  <div className="flex items-center gap-2 pt-4 text-xs text-neutral-500">
                    <Lock className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Strict confidentiality. Mutual NDAs honored for enterprise scopes.</span>
                  </div>
                </div>
              </div>

              {/* Quick WhatsApp Action Banner */}
              <div className="mt-8 p-6 bg-emerald-50/70 border border-emerald-200/80 rounded-sm hover:border-emerald-300 transition-colors">
                <div className="text-xs font-semibold uppercase tracking-wider text-emerald-900 mb-1">
                  Prefer immediate messaging?
                </div>
                <p className="text-xs text-emerald-800/80 mb-3">
                  Skip the form and chat with our agency leadership directly on WhatsApp.
                </p>
                <a
                  href={`https://wa.me/${AGENCY_INFO.phoneRaw}?text=${encodeURIComponent('Hello ZAVYROWEB team, I would like to discuss a new digital project.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-900 hover:text-emerald-950 underline decoration-emerald-400 group/wa"
                >
                  <span>Open ZAVYROWEB WhatsApp ({AGENCY_INFO.phone})</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/wa:translate-x-0.5 group-hover/wa:-translate-y-0.5" />
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Interactive Form or Success State (7 cols) with ScrollReveal */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-sm border border-neutral-200/90 shadow-2xs">
            <ScrollReveal variant="fade-up" delayMs={150}>
              {submittedData ? (
                <div className="py-8 text-center space-y-6 animate-fadeIn">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto transform transition-transform duration-500 scale-100">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div>
                    <h3 className="font-editorial text-3xl font-semibold text-neutral-900 mb-2">
                      Inquiry Received, {submittedData.name}.
                    </h3>
                    <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                      Thank you for reaching out to ZAVYROWEB. A senior member of our team is reviewing your project details and will respond to <strong className="text-neutral-900">{submittedData.email}</strong> within 24 hours.
                    </p>
                  </div>

                  <div className="p-6 bg-[#FAF9F5] border border-neutral-200 rounded-sm text-left max-w-md mx-auto text-xs space-y-2 text-neutral-700 shadow-2xs">
                    <div><strong>Selected Scope:</strong> {submittedData.projectType}</div>
                    <div><strong>Budget Range:</strong> {submittedData.budgetRange}</div>
                    {submittedData.company && <div><strong>Company:</strong> {submittedData.company}</div>}
                    {submittedData.phone && <div><strong>Phone:</strong> {submittedData.phone}</div>}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                    <MagneticButton strength={0.2} cursorText="WHATSAPP">
                      <button
                        type="button"
                        onClick={handleOpenWhatsAppFromForm}
                        className="w-full sm:w-auto px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-800 rounded-sm transition-colors flex items-center justify-center gap-2 shadow-xs"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Also Send Copy to WhatsApp</span>
                      </button>
                    </MagneticButton>

                    <button
                      type="button"
                      onClick={() => {
                        setSubmittedData(null);
                        setFormData({
                          name: '',
                          email: '',
                          company: '',
                          phone: '',
                          projectType: 'Website Design & Development',
                          budgetRange: '€3,000 – €5,000',
                          description: '',
                          honeypot: '',
                        });
                      }}
                      className="w-full sm:w-auto px-5 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-700 bg-neutral-200 hover:bg-neutral-300 rounded-sm transition-colors"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Honeypot field for anti-bot spam defense (hidden from human users) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="hp_field">Do not fill this field</label>
                    <input
                      id="hp_field"
                      type="text"
                      name="honeypot"
                      value={formData.honeypot}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="contact_name" className="block text-xs uppercase tracking-wider font-semibold text-neutral-900 mb-2">
                        Your Full Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="contact_name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Marc Dubois"
                        className={`w-full px-4 py-3 bg-[#FAF9F5] border text-sm text-neutral-900 rounded-sm focus:outline-hidden focus:border-neutral-900 transition-colors ${
                          errors.name ? 'border-red-500 bg-red-50/20' : 'border-neutral-300'
                        }`}
                        required
                      />
                      {errors.name && (
                        <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="contact_email" className="block text-xs uppercase tracking-wider font-semibold text-neutral-900 mb-2">
                        Email Address <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="contact_email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@company.com"
                        className={`w-full px-4 py-3 bg-[#FAF9F5] border text-sm text-neutral-900 rounded-sm focus:outline-hidden focus:border-neutral-900 transition-colors ${
                          errors.email ? 'border-red-500 bg-red-50/20' : 'border-neutral-300'
                        }`}
                        required
                      />
                      {errors.email && (
                        <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Company */}
                    <div>
                      <label htmlFor="contact_company" className="block text-xs uppercase tracking-wider font-semibold text-neutral-900 mb-2">
                        Company / Organization
                      </label>
                      <input
                        id="contact_company"
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="e.g. Atlas Ventures"
                        className="w-full px-4 py-3 bg-[#FAF9F5] border border-neutral-300 text-sm text-neutral-900 rounded-sm focus:outline-hidden focus:border-neutral-900 transition-colors"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="contact_phone" className="block text-xs uppercase tracking-wider font-semibold text-neutral-900 mb-2">
                        Phone / WhatsApp Number
                      </label>
                      <input
                        id="contact_phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +212 769 154 458"
                        className={`w-full px-4 py-3 bg-[#FAF9F5] border text-sm text-neutral-900 rounded-sm focus:outline-hidden focus:border-neutral-900 transition-colors ${
                          errors.phone ? 'border-red-500 bg-red-50/20' : 'border-neutral-300'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Project Type */}
                    <div>
                      <label htmlFor="contact_project_type" className="block text-xs uppercase tracking-wider font-semibold text-neutral-900 mb-2">
                        Project Type <span className="text-red-600">*</span>
                      </label>
                      <select
                        id="contact_project_type"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#FAF9F5] border border-neutral-300 text-sm text-neutral-900 rounded-sm focus:outline-hidden focus:border-neutral-900 transition-colors"
                      >
                        <option value="Website Design & Development">Website Design &amp; Development</option>
                        <option value="Website Redesign & Optimization">Website Redesign &amp; Optimization</option>
                        <option value="SEO & Organic Growth">SEO &amp; Organic Growth</option>
                        <option value="Google Ads & Digital Advertising">Google Ads &amp; Digital Advertising</option>
                        <option value="Website Security & Maintenance">Website Security &amp; Maintenance</option>
                        <option value="Comprehensive Growth Partnership">Comprehensive Growth Partnership</option>
                      </select>
                    </div>

                    {/* Budget Range */}
                    <div>
                      <label htmlFor="contact_budget" className="block text-xs uppercase tracking-wider font-semibold text-neutral-900 mb-2">
                        Estimated Budget Range
                      </label>
                      <select
                        id="contact_budget"
                        name="budgetRange"
                        value={formData.budgetRange}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#FAF9F5] border border-neutral-300 text-sm text-neutral-900 rounded-sm focus:outline-hidden focus:border-neutral-900 transition-colors"
                      >
                        <option value="€2,000 – €3,500">€2,000 – €3,500</option>
                        <option value="€3,500 – €6,000">€3,500 – €6,000</option>
                        <option value="€6,000 – €10,000">€6,000 – €10,000</option>
                        <option value="€10,000+">€10,000+ (Enterprise)</option>
                        <option value="Flexible / Needs Advisory">Flexible / Needs Advisory</option>
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label htmlFor="contact_desc" className="block text-xs uppercase tracking-wider font-semibold text-neutral-900 mb-2">
                      Project Description &amp; Objectives <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="contact_desc"
                      name="description"
                      rows={4}
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Tell us about your brand, current challenges, target audience, and desired launch timeline..."
                      className={`w-full px-4 py-3 bg-[#FAF9F5] border text-sm text-neutral-900 rounded-sm focus:outline-hidden focus:border-neutral-900 transition-colors ${
                        errors.description ? 'border-red-500 bg-red-50/20' : 'border-neutral-300'
                      }`}
                      required
                    />
                    {errors.description && (
                      <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.description}
                      </p>
                    )}
                  </div>

                  {/* Submit button with Magnetic effect and Shimmer */}
                  <div className="pt-2">
                    <MagneticButton strength={0.2} cursorText="SEND" className="w-full">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="shimmer-hover w-full py-3.5 px-6 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 rounded-sm transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                      >
                        {isSubmitting ? (
                          <span>Verifying &amp; Sending...</span>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Submit Project Inquiry</span>
                          </>
                        )}
                      </button>
                    </MagneticButton>
                    <p className="text-2xs text-neutral-400 text-center mt-3">
                      By submitting this inquiry, your information is protected by our strict privacy policy. Never shared with third parties.
                    </p>
                  </div>
                </form>
              )}
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
