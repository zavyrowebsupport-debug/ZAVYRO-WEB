import React from 'react';
import { X, Check, ArrowRight, Clock, Target, Layers, ShieldCheck } from 'lucide-react';
import { ServiceDetail } from '../types';

interface ServiceModalProps {
  service: ServiceDetail | null;
  onClose: () => void;
  onRequestService: (serviceName: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
  onRequestService,
}) => {
  if (!service) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-950/70 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
    >
      <div
        className="relative w-full max-w-3xl bg-[#FAF9F5] border border-neutral-300 rounded-sm shadow-2xl p-6 sm:p-10 my-8 text-neutral-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with service number and close button */}
        <div className="flex items-center justify-between pb-6 border-b border-neutral-200">
          <div className="flex items-center gap-3">
            <span className="font-editorial text-2xl font-bold text-amber-800">
              {service.number}
            </span>
            <span className="text-xs uppercase tracking-widest text-neutral-500 font-medium">
              Service Specification
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-500 hover:text-neutral-900 rounded-sm hover:bg-neutral-200/50 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title and description */}
        <div className="pt-6 pb-6">
          <h2 id="service-modal-title" className="font-editorial text-3xl sm:text-4xl font-semibold mb-3">
            {service.title}
          </h2>
          <p className="text-base text-neutral-600 leading-relaxed">
            {service.fullDescription}
          </p>
        </div>

        {/* Scope breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 border-y border-neutral-200">
          <div>
            <div className="flex items-center gap-2 mb-4 text-xs uppercase tracking-wider font-semibold text-neutral-900">
              <Layers className="w-4 h-4 text-amber-800" />
              Core Scope Capabilities
            </div>
            <ul className="space-y-2.5">
              {service.scopeItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-neutral-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4 text-xs uppercase tracking-wider font-semibold text-neutral-900">
              <ShieldCheck className="w-4 h-4 text-amber-800" />
              Verified Deliverables
            </div>
            <ul className="space-y-2.5">
              {service.deliverables.map((deliv, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-neutral-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 shrink-0 mt-2" />
                  <span>{deliv}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Business Impact & Ideal For */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 bg-white/70 p-6 rounded-sm border border-neutral-200 my-6">
          <div className="sm:col-span-2">
            <span className="text-xs uppercase tracking-wider text-neutral-500 font-medium block mb-1">
              Business Outcome
            </span>
            <p className="text-sm text-neutral-800 font-medium">
              {service.businessImpact}
            </p>
          </div>

          <div>
            <span className="text-xs uppercase tracking-wider text-neutral-500 font-medium block mb-1">
              Estimated Timeline
            </span>
            <p className="text-sm font-semibold text-neutral-900 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-800" />
              {service.timeline}
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-200">
          <span className="text-xs text-neutral-500">
            Target Audience: <strong className="text-neutral-700 font-medium">{service.idealFor}</strong>
          </span>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-neutral-700 bg-neutral-200 hover:bg-neutral-300 rounded-sm transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onRequestService(service.title);
              }}
              className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 rounded-sm transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
            >
              Inquire About This Service
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
