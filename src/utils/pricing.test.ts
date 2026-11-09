import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateProjectEstimate } from './pricing';
import { EstimationInputs } from '../types';

test('calculateProjectEstimate computes baseline corporate website', () => {
  const inputs: EstimationInputs = {
    projectType: 'business-corporate',
    pagesCount: '1-5',
    seoTier: 'none',
    adsSetup: false,
    securityMaintenance: 'none',
    deliverySpeed: 'standard',
  };

  const result = calculateProjectEstimate(inputs);
  assert.equal(result.estimatedMinEuro, 2200);
  assert.equal(result.estimatedMaxEuro, 3800);
  assert.equal(result.timelineWeeks, '3–5 weeks');
  assert.ok(result.summaryRecommendations.length > 0);
});

test('calculateProjectEstimate adjusts pricing for e-commerce with advanced SEO and speed', () => {
  const inputs: EstimationInputs = {
    projectType: 'ecommerce-store',
    pagesCount: '6-12',
    seoTier: 'advanced-growth',
    adsSetup: true,
    securityMaintenance: 'monthly-vip',
    deliverySpeed: 'accelerated',
  };

  const result = calculateProjectEstimate(inputs);
  // Base 3400 + 800 (pages) + 1400 (seo) + 750 (ads) + 750 (sec) = 7100 * 1.25 = 8875
  assert.ok(result.estimatedMinEuro > 6000);
  assert.ok(result.estimatedMaxEuro > 10000);
  assert.ok(result.summaryRecommendations.some((r) => r.includes('E-commerce')));
  assert.ok(result.summaryRecommendations.some((r) => r.includes('Expedited')));
});

test('PRICING_PLANS contains the exact 3 packages with correct USD rates', async () => {
  const { PRICING_PLANS } = await import('../data/agencyData');
  assert.equal(PRICING_PLANS.length, 3);

  // 01 Starter
  const starter = PRICING_PLANS.find((p) => p.id === 'starter');
  assert.ok(starter);
  assert.equal(starter.number, '01');
  assert.equal(starter.name, 'Starter');
  assert.equal(starter.priceUsd, 150);
  assert.equal(starter.ctaLabel, 'Get Started');
  assert.equal(starter.popular, false);
  assert.ok(starter.features.includes('Up to 5 pages'));
  assert.ok(starter.features.includes('WhatsApp integration'));

  // 02 Professional
  const professional = PRICING_PLANS.find((p) => p.id === 'professional');
  assert.ok(professional);
  assert.equal(professional.number, '02');
  assert.equal(professional.name, 'Professional');
  assert.equal(professional.priceUsd, 250);
  assert.equal(professional.ctaLabel, 'Choose Professional');
  assert.equal(professional.popular, true);
  assert.ok(professional.features.includes('Up to 10 pages'));
  assert.ok(professional.features.includes('Google Analytics integration'));

  // 03 Business Premium
  const premium = PRICING_PLANS.find((p) => p.id === 'business-premium');
  assert.ok(premium);
  assert.equal(premium.number, '03');
  assert.equal(premium.name, 'Business Premium');
  assert.equal(premium.priceUsd, 400);
  assert.equal(premium.ctaLabel, 'Get Premium');
  assert.equal(premium.popular, false);
  assert.ok(premium.features.includes('Up to 15 pages'));
  assert.ok(premium.features.includes('Google Search Console setup'));
  assert.ok(premium.features.includes('Enhanced security configuration'));
});
