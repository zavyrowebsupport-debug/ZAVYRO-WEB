export type ServiceId = 
  | 'web-design-dev'
  | 'web-redesign-opt'
  | 'seo-organic'
  | 'google-ads'
  | 'security-maintenance';

export interface ServiceDetail {
  id: ServiceId;
  number: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
  scopeItems: string[];
  deliverables: string[];
  businessImpact: string;
  idealFor: string;
  timeline: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: string;
  industry: string;
  year: string;
  image: string;
  shortSummary: string;
  challenge: string;
  solution: string;
  architecture: string[];
  highlights: string[];
  verifiedOutcomes: string[];
  deliverables: string[];
  techStack: string[];
}

export interface InsightArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  content: string[];
  keyTakeaways: string[];
  author: {
    name: string;
    role: string;
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  projectType: string;
  budgetRange: string;
  description: string;
  honeypot?: string; // spam protection
}

export interface EstimationInputs {
  projectType: 'business-corporate' | 'ecommerce-store' | 'web-redesign' | 'custom-webapp';
  pagesCount: '1-5' | '6-12' | '13-25' | '25+';
  seoTier: 'foundation' | 'advanced-growth' | 'none';
  adsSetup: boolean;
  securityMaintenance: 'none' | 'quarterly' | 'monthly-vip';
  deliverySpeed: 'standard' | 'accelerated';
}

export interface EstimationResult {
  estimatedMinEuro: number;
  estimatedMaxEuro: number;
  timelineWeeks: string;
  summaryRecommendations: string[];
}

export interface PricingPlan {
  id: string;
  number: string;
  name: string;
  priceUsd: number;
  tagline: string;
  popular?: boolean;
  features: string[];
  ctaLabel: string;
}
