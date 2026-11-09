import { EstimationInputs, EstimationResult } from '../types';

/**
 * Calculates a transparent, realistic investment range and timeline for project planning.
 * Reflects genuine international agency production tiers.
 */
export function calculateProjectEstimate(inputs: EstimationInputs): EstimationResult {
  let baseMin = 1800;
  let baseMax = 2800;
  let weeksMin = 2;
  let weeksMax = 4;
  const recommendations: string[] = [];

  // 1. Project Type
  switch (inputs.projectType) {
    case 'business-corporate':
      baseMin = 2200;
      baseMax = 3800;
      weeksMin = 3;
      weeksMax = 5;
      recommendations.push('Full brand alignment, bespoke responsive layouts, corporate compliance & CMS setup.');
      break;
    case 'ecommerce-store':
      baseMin = 3400;
      baseMax = 6200;
      weeksMin = 4;
      weeksMax = 7;
      recommendations.push('E-commerce catalog architecture, secure payment gateways, checkout optimization & inventory sync.');
      break;
    case 'web-redesign':
      baseMin = 2000;
      baseMax = 3600;
      weeksMin = 3;
      weeksMax = 5;
      recommendations.push('Modern UI overhaul, legacy data migration, Core Web Vitals cleanup & mobile UX modernization.');
      break;
    case 'custom-webapp':
      baseMin = 4500;
      baseMax = 8500;
      weeksMin = 5;
      weeksMax = 9;
      recommendations.push('Custom backend APIs, real-time database architecture, role-based auth & high-availability hosting.');
      break;
  }

  // 2. Page / Architecture Count
  switch (inputs.pagesCount) {
    case '1-5':
      // default
      break;
    case '6-12':
      baseMin += 800;
      baseMax += 1400;
      weeksMin += 1;
      weeksMax += 1;
      break;
    case '13-25':
      baseMin += 1600;
      baseMax += 2600;
      weeksMin += 2;
      weeksMax += 2;
      break;
    case '25+':
      baseMin += 2800;
      baseMax += 4500;
      weeksMin += 3;
      weeksMax += 4;
      break;
  }

  // 3. SEO Tier
  if (inputs.seoTier === 'foundation') {
    baseMin += 600;
    baseMax += 900;
    recommendations.push('Technical SEO setup: XML sitemaps, structured schema JSON-LD, metadata and search console indexing.');
  } else if (inputs.seoTier === 'advanced-growth') {
    baseMin += 1400;
    baseMax += 2200;
    recommendations.push('Comprehensive competitor audit, keyword mapping, semantic silo architecture, and high-intent landing page optimization.');
  }

  // 4. Google Ads & Tracking
  if (inputs.adsSetup) {
    baseMin += 750;
    baseMax += 1200;
    recommendations.push('Google Ads conversion tracking, GA4 event tagging, search campaign structure & ad copy split-testing.');
  }

  // 5. Security & Maintenance
  if (inputs.securityMaintenance === 'quarterly') {
    baseMin += 350;
    baseMax += 600;
    recommendations.push('Quarterly security patches, automated off-site backups, and SSL/DNS health checks.');
  } else if (inputs.securityMaintenance === 'monthly-vip') {
    baseMin += 750;
    baseMax += 1200;
    recommendations.push('24/7 uptime monitoring, monthly code security audits, immediate dependency updates & dedicated emergency support.');
  }

  // 6. Delivery Speed
  if (inputs.deliverySpeed === 'accelerated') {
    baseMin = Math.round(baseMin * 1.25);
    baseMax = Math.round(baseMax * 1.25);
    weeksMin = Math.max(2, Math.round(weeksMin * 0.7));
    weeksMax = Math.max(3, Math.round(weeksMax * 0.75));
    recommendations.push('Expedited sprint timeline with dedicated sprint developers and daily progress standups.');
  }

  return {
    estimatedMinEuro: baseMin,
    estimatedMaxEuro: baseMax,
    timelineWeeks: `${weeksMin}–${weeksMax} weeks`,
    summaryRecommendations: recommendations,
  };
}
