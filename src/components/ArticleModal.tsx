import React from 'react';
import { X, Clock, Calendar, User, ArrowRight, Share2, Check } from 'lucide-react';
import { InsightArticle } from '../types';

interface ArticleModalProps {
  article: InsightArticle | null;
  onClose: () => void;
  onConsultation: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onConsultation,
}) => {
  if (!article) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-950/75 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-title"
    >
      <div
        className="relative w-full max-w-3xl bg-[#FAF9F5] border border-neutral-300 rounded-sm shadow-2xl p-6 sm:p-12 my-8 text-neutral-900 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top metadata bar */}
        <div className="flex items-center justify-between pb-6 border-b border-neutral-200">
          <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
            <span className="text-amber-800 font-semibold">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.date}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-500 hover:text-neutral-900 rounded-sm hover:bg-neutral-200/50 transition-colors"
            aria-label="Close article"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title */}
        <div className="pt-8 pb-6">
          <h1 id="article-modal-title" className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold text-neutral-900 leading-tight mb-4">
            {article.title}
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal italic border-l-2 border-amber-800 pl-4 py-1">
            {article.summary}
          </p>
        </div>

        {/* Author information */}
        <div className="flex items-center gap-3 py-4 border-y border-neutral-200 text-xs text-neutral-600 mb-8">
          <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-2xs uppercase">
            ZW
          </div>
          <div>
            <div className="font-semibold text-neutral-900">{article.author.name}</div>
            <div className="text-neutral-500">{article.author.role}</div>
          </div>
        </div>

        {/* Article Body Paragraphs */}
        <div className="space-y-6 text-sm sm:text-base text-neutral-800 leading-relaxed font-normal">
          {article.content.map((paragraph, idx) => (
            <p key={idx} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Key Takeaways Box */}
        <div className="my-8 p-6 bg-white rounded-sm border border-neutral-200 shadow-2xs">
          <h3 className="text-xs uppercase tracking-wider font-semibold text-neutral-900 mb-4 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            Key Strategic Takeaways
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-neutral-700">
            {article.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-800 shrink-0 mt-2" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-neutral-200">
          <div className="text-xs text-neutral-500">
            Published in ZAVYROWEB Digital Engineering Insights
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-neutral-700 bg-neutral-200 hover:bg-neutral-300 rounded-sm transition-colors"
            >
              Done Reading
            </button>
            <button
              onClick={() => {
                onClose();
                onConsultation();
              }}
              className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 rounded-sm transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
            >
              Discuss Architecture With Our Team
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
