import React from 'react';
import { X, ExternalLink, CheckCircle2, Cpu, BarChart3, Layers, ArrowRight } from 'lucide-react';
import { CaseStudy } from '../types';

interface ProjectModalProps {
  project: CaseStudy | null;
  onClose: () => void;
  onStartSimilarProject: (projectName: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onStartSimilarProject,
}) => {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-950/75 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
    >
      <div
        className="relative w-full max-w-4xl bg-[#FAF9F5] border border-neutral-300 rounded-sm shadow-2xl p-6 sm:p-10 my-8 text-neutral-900 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between pb-6 border-b border-neutral-200">
          <div className="flex items-center gap-3 text-xs text-neutral-500 font-medium">
            <span>Case Study</span>
            <span aria-hidden="true">·</span>
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>Completed {project.year}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-500 hover:text-neutral-900 rounded-sm hover:bg-neutral-200/50 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Project Title & Summary */}
        <div className="pt-6 pb-6">
          <div className="text-xs uppercase tracking-widest text-amber-800 font-semibold mb-2">
            Client: {project.client}
          </div>
          <h2 id="case-study-title" className="font-editorial text-3xl sm:text-5xl font-semibold mb-4 text-neutral-900">
            {project.title}
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            {project.shortSummary}
          </p>
        </div>

        {/* High-res project mockup image */}
        <div className="my-6 rounded-sm overflow-hidden border border-neutral-200 bg-neutral-900 shadow-md">
          <img
            src={project.image}
            alt={`${project.title} case study website mockup by ZAVYROWEB`}
            className="w-full h-auto max-h-[480px] object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Challenge & Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-y border-neutral-200">
          <div>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-neutral-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-600 rounded-full" />
              The Business Challenge
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-neutral-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-600 rounded-full" />
              The Architectural Solution
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Technical Highlights & Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-b border-neutral-200">
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-900 mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-800" />
              Engineering Architecture
            </h4>
            <ul className="space-y-2.5">
              {project.architecture.map((arch, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-neutral-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 shrink-0 mt-2" />
                  <span>{arch}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-amber-800" />
              Verified Performance &amp; UX
            </h4>
            <ul className="space-y-2.5">
              {project.verifiedOutcomes.map((metric, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-neutral-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-medium text-neutral-900">{metric}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tech Stack Tags (unboxed or minimal) */}
        <div className="py-6 flex flex-wrap items-center gap-2 text-xs text-neutral-500">
          <span className="font-semibold text-neutral-800">Technology Stack:</span>
          {project.techStack.map((tech, idx) => (
            <React.Fragment key={idx}>
              <span className="text-neutral-700">{tech}</span>
              {idx < project.techStack.length - 1 && <span aria-hidden="true">·</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Footer actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-neutral-200">
          <span className="text-xs text-neutral-500">
            Verified case study published by ZAVYROWEB Digital Agency
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
                onStartSimilarProject(project.title);
              }}
              className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 rounded-sm transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
            >
              Request Similar Project
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
