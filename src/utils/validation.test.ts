import test from 'node:test';
import assert from 'node:assert/strict';
import { validateContactForm, buildWhatsAppInquiryUrl, sanitizeInput } from './validation';
import { ContactFormData } from '../types';

test('validateContactForm passes valid contact information', () => {
  const validData: ContactFormData = {
    name: 'Karim Bennani',
    email: 'karim@example.com',
    company: 'Atlas Innovations',
    phone: '+212 769 154 458',
    projectType: 'Website Redesign & Optimization',
    budgetRange: '€3,000 – €5,000',
    description: 'We need to redesign our corporate platform with modern UX and faster loading times.',
  };

  const result = validateContactForm(validData);
  assert.equal(result.isValid, true);
  assert.equal(Object.keys(result.errors).length, 0);
});

test('validateContactForm rejects empty required fields', () => {
  const invalidData: ContactFormData = {
    name: '',
    email: 'invalid-email',
    company: '',
    phone: '123',
    projectType: '',
    budgetRange: '',
    description: 'Too short',
  };

  const result = validateContactForm(invalidData);
  assert.equal(result.isValid, false);
  assert.ok(result.errors.name);
  assert.ok(result.errors.email);
  assert.ok(result.errors.phone);
  assert.ok(result.errors.projectType);
  assert.ok(result.errors.description);
});

test('validateContactForm blocks honeypot spam bot submissions', () => {
  const spamData: ContactFormData = {
    name: 'Bot Spammer',
    email: 'spam@bot.org',
    company: 'Bot Inc',
    phone: '+12345678901',
    projectType: 'Website Design & Development',
    budgetRange: '€5,000+',
    description: 'Legitimate looking long description for testing spam bot detection.',
    honeypot: 'http://spam-link.ru',
  };

  const result = validateContactForm(spamData);
  assert.equal(result.isValid, false);
  assert.equal(result.errors.honeypot, 'Automated submission detected.');
});

test('buildWhatsAppInquiryUrl formats correct agency phone and encoded text', () => {
  const url = buildWhatsAppInquiryUrl({
    name: 'Sarah',
    projectType: 'E-commerce Platform',
    budgetRange: '€5,000+',
  });

  assert.ok(url.startsWith('https://wa.me/212769154458?text='));
  assert.ok(url.includes('Sarah'));
  assert.ok(url.includes('E-commerce'));
});

test('sanitizeInput escapes HTML control characters', () => {
  const dirty = '<script>alert("hack")</script>&foo';
  const clean = sanitizeInput(dirty);
  assert.equal(clean, '&lt;script&gt;alert(&quot;hack&quot;)&lt;/script&gt;&amp;foo');
});
