import Stripe from 'stripe';

// Stripe configuration
export const STRIPE_CONFIG = {
  secretKey: process.env.STRIPE_SECRET_KEY ?? process.env.STRIPE_PRIVATE_KEY ?? '',
  publishableKey: process.env.VITE_STRIPE_PUBLISHABLE_KEY ?? '',
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? '',
};

// Initialize Stripe client
export const stripe = new Stripe(STRIPE_CONFIG.secretKey, {
  apiVersion: '2025-12-15.clover',
});

// Product definitions for Krisenberatung Portal
export const PRODUCTS = {
  ANALYSIS: {
    id: 'analysis',
    name: 'Problemanalyse',
    description: 'Umfassende Analyse Ihrer Unternehmenssituation inkl. Handlungsempfehlungen',
    price: 49900, // €499,00 in cents
    currency: 'eur',
  },
  HANDBUCH: {
    id: 'handbuch',
    name: 'Handbuch für Unternehmensoptimierung',
    description: 'Private Debt – Wie Sie über den Private-Debt-Markt Refinanzierungskapital gewinnen. 28 Seiten Expertenwissen mit 9 Kapiteln und 5 Anhängen.',
    price: 2990, // €29,90 in cents
    currency: 'eur',
  },
} as const;

export type ProductId = keyof typeof PRODUCTS;
