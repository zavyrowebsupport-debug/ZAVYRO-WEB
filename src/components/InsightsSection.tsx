import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight, BookOpen, Clock } from 'lucide-react';
import { INSIGHTS_ARTICLES } from '../data/agencyData';
import { InsightArticle } from '../types';
import { ArticleModal } from './ArticleModal';
import { ScrollReveal } from './motion/ScrollReveal';
import { TiltCard } from './motion/TiltCard';
import { MagneticButton } from './motion/MagneticButton';

interface InsightsSectionProps {
  onStartProject: () => void;
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({ onStartProject }) => {
  const [selectedArticle, setSelectedArticle] = useState<InsightArticle | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Articles' },
    { id: 'dev', label: 'Web Development' },
    { id: 'seo', label: 'SEO' },
    { id: 'ads', label: 'Google Ads' },
  ];

  const filteredArticles = INSIGHTS_ARTICLES.filter((art) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'dev') return art.category.toLowerCase().includes('development');
    if (activeFilter === 'seo') return art.category.toLowerCase().includes('seo');
    if (activeFilter === 'ads') return art.category.toLowerCase().includes('ads');
    return true;
  });

  return (
    <section id="insights" className="py-24 lg:py-32 bg-[#F6F5F0] border-t border-neutral-200/90 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header with ScrollReveal */}
        <ScrollReveal variant="fade-up" delayMs={50}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-neutral-300">
            <div>
              <div className="text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-3">
                07 — Research &amp; Intelligence
              </div>
              <h2 className="font-editorial text-4xl sm:text-5xl font-semibold text-neutral-900 tracking-tight">
                Agency Insights &amp; Perspectives
              </h2>
            </div>

            {/* Interactive filter tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-neutral-200/60 rounded-md self-start md:self-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-sm transition-all duration-200 whitespace-nowrap ${
                    activeFilter === cat.id
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

        {/* Articles Grid: 2 columns on desktop with TiltCard & ScrollReveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {filteredArticles.map((article, idx) => (
            <ScrollReveal
              key={article.id}
              variant="fade-up"
              delayMs={idx * 100}
            >
              <TiltCard maxTilt={3} glare={false} className="h-full">
                <article
                  onClick={() => setSelectedArticle(article)}
                  data-cursor-text="READ"
                  className="p-8 sm:p-10 bg-white border border-neutral-200/80 rounded-sm shadow-2xs hover:border-neutral-400 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between h-full group"
                >
                  <div>
                    {/* Unboxed metadata line */}
                    <div className="flex items-center gap-2 text-xs text-neutral-500 mb-4">
                      <span className="font-medium text-amber-800">{article.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.date}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.readTime}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-neutral-900 group-hover:text-amber-800 transition-colors mb-4 leading-snug">
                      {article.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-sm text-neutral-600 leading-relaxed font-normal mb-6">
                      {article.summary}
                    </p>
                  </div>

                  {/* Read button */}
                  <div className="pt-6 border-t border-neutral-100 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-900 group-hover:text-amber-800 transition-colors flex items-center gap-1.5">
                      <span>Read Full Article</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>

                    <span className="text-xs text-neutral-400">
                      By {article.author.name}
                    </span>
                  </div>
                </article>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Detail Modal */}
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          onConsultation={onStartProject}
        />
      </div>
    </section>
  );
};
