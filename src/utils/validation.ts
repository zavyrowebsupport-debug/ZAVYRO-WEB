import { ContactFormData } from '../types';

export interface ValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof ContactFormData, string>>;
}

/**
 * Validates the contact and inquiry submission form with strict spam prevention.
 */
export function validateContactForm(data: ContactFormData): ValidationResult {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};

  // Honeypot spam check - must remain completely empty for human users
  if (data.honeypot && data.honeypot.trim().length > 0) {
    return {
      isValid: false,
      errors: { honeypot: 'Automated submission detected.' },
    };
  }

  // Name validation
  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Please provide your full name (minimum 2 characters).';
  } else if (data.name.trim().length > 100) {
    errors.name = 'Name is too long (maximum 100 characters).';
  }

  // Email validation (RFC 5322 compliant regex approximation)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please provide a valid business or personal email address.';
  }

  // Phone validation (Optional but if provided must match phone patterns)
  if (data.phone && data.phone.trim().length > 0) {
    const cleanPhone = data.phone.replace(/[\s\-()]/g, '');
    const phoneRegex = /^\+?[0-9]{8,18}$/;
    if (!phoneRegex.test(cleanPhone)) {
      errors.phone = 'Please enter a valid phone number (minimum 8 digits, e.g. +212 769 154 458 or 0769154458).';
    }
  }

  // Project type validation
  if (!data.projectType || data.projectType.trim().length === 0) {
    errors.projectType = 'Please select a project type.';
  }

  // Description validation
  if (!data.description || data.description.trim().length < 15) {
    errors.description = 'Please describe your project briefly (at least 15 characters).';
  } else if (data.description.trim().length > 3000) {
    errors.description = 'Project description exceeds 3000 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Generates an official pre-filled WhatsApp click-to-chat URL for ZAVYROWEB.
 * Agency WhatsApp: 0769154458 (International: +212769154458)
 */
export function buildWhatsAppInquiryUrl(params?: {
  name?: string;
  projectType?: string;
  budgetRange?: string;
  customMessage?: string;
}): string {
  const internationalNumber = '212769154458';
  
  let text = 'Hello ZAVYROWEB team, I would like to discuss a digital project with you.';
  if (params?.name) {
    text = `Hello ZAVYROWEB team, my name is ${params.name.trim()}.`;
  }
  if (params?.projectType) {
    text += ` I am interested in: ${params.projectType}.`;
  }
  if (params?.budgetRange) {
    text += ` Estimated budget: ${params.budgetRange}.`;
  }
  if (params?.customMessage) {
    text += ` Message: ${params.customMessage.trim()}`;
  }

  return `https://wa.me/${internationalNumber}?text=${encodeURIComponent(text)}`;
}

/**
 * Sanitizes text to prevent XSS injection.
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}
