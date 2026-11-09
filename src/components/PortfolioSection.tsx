import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight, Layers, Sparkles } from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '../data/agencyData';
import { CaseStudy } from '../types';
import { ProjectModal } from './ProjectModal';
import { TiltCard } from './motion/TiltCard';
import { MagneticButton } from './motion/MagneticButton';
import { ScrollReveal } from './motion/ScrollReveal';

interface PortfolioSectionProps {
  onStartSimilarProject: (projectName: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  onStartSimilarProject,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<CaseStudy | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'automotive', label: 'Automotive' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'fashion', label: 'Fashion & Lifestyle' },
  ];

  const filteredProjects = PORTFOLIO_PROJECTS.filter((p) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'automotive') return p.category.toLowerCase().includes('automotive');
    if (activeCategory === 'ecommerce') return p.category.toLowerCase().includes('commerce');
    if (activeCategory === 'fashion') return p.category.toLowerCase().includes('fashion');
    return true;
  });

  return (
    <section id="projects" className="py-24 lg:py-32 bg-[#FAF9F5] border-t border-neutral-200/90 relative overflow-hidden">
      {/* Decorative ambient gradient backdrop */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-amber-100/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-neutral-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header with ScrollReveal */}
        <ScrollReveal variant="fade-up" delayMs={50}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-neutral-300">
            <div>
              <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-3">
                02 — Client Work &amp; Portfolio
              </div>
              <h2 className="font-editorial text-4xl sm:text-5xl font-semibold text-neutral-900 tracking-tight">
                Selected Digital Projects
              </h2>
            </div>

            {/* Interactive filter tabs (functional buttons) */}
            <div className="flex items-center gap-1.5 p-1 bg-neutral-200/60 rounded-md self-start md:self-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-sm transition-all duration-200 whitespace-nowrap ${
                    activeCategory === cat.id
                      ? 'bg-neutral-900 text-white shadow-xs scale-[1.02]'
                      : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200/80'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Projects Grid: 2 columns on desktop with 3D Tilt Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {filteredProjects.map((project, idx) => (
            <ScrollReveal
              key={project.id}
              variant={idx % 2 === 0 ? 'fade-up' : 'mask-up'}
              delayMs={idx * 100}
            >
              <TiltCard
                maxTilt={4.5}
                glare={true}
                className="h-full"
              >
                <article
                  className="group flex flex-col h-full bg-white border border-neutral-200/90 rounded-sm overflow-hidden shadow-xs hover:shadow-xl hover:border-neutral-400 transition-all duration-300"
                >
                  {/* Image Preview Container with zoom & custom cursor trigger */}
                  <div
                    className="relative overflow-hidden aspect-[4/3] bg-neutral-950 cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                    data-cursor-text="VIEW"
                  >
                    <img
                      src={project.image}
                      alt={`${project.title} website designed by ZAVYROWEB`}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />

                    {/* Subtle dark gradient scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/50 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300" />

                    {/* Hover indicator pill */}
                    <div className="absolute inset-0 bg-neutral-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="px-5 py-2.5 bg-neutral-900/90 text-white text-xs uppercase tracking-wider font-semibold rounded-sm backdrop-blur-xs flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 shadow-md">
                        Open Case Study
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-8 flex flex-col flex-grow justify-between">
                    <div>
                      {/* Unboxed Metadata Line with typographic separators */}
                      <div className="flex items-center gap-2 text-xs text-neutral-500 mb-3">
                        <span className="font-medium text-amber-800">{project.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.industry}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.year}</span>
                      </div>

                      {/* Project Title with smooth color transition */}
                      <h3
                        onClick={() => setSelectedProject(project)}
                        className="font-editorial text-2xl sm:text-3xl font-semibold text-neutral-900 mb-3 cursor-pointer group-hover:text-amber-800 transition-colors"
                      >
                        {project.title}
                      </h3>

                      {/* Summary */}
                      <p className="text-sm text-neutral-600 leading-relaxed font-normal mb-6">
                        {project.shortSummary}
                      </p>

                      {/* Highlights list */}
                      <div className="mb-6 pt-4 border-t border-neutral-100">
                        <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                          Key Highlights
                        </div>
                        <ul className="space-y-1.5 text-xs text-neutral-700">
                          {project.highlights.slice(0, 3).map((h, hIdx) => (
                            <li key={hIdx} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 group-hover:bg-amber-700 transition-colors shrink-0" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Card Actions with Magnetic Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                      <MagneticButton strength={0.2} cursorText="CASE">
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-900 hover:text-amber-800 transition-colors group/btn"
                        >
                          <span>Explore Case Study</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                        </button>
                      </MagneticButton>

                      <button
                        onClick={() => onStartSimilarProject(project.title)}
                        className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors underline decoration-neutral-300"
                      >
                        Start Similar
                      </button>
                    </div>
                  </div>
                </article>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Project Case Study Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onStartSimilarProject={(name) => onStartSimilarProject(name)}
        />
      </div>
    </section>
  );
};
