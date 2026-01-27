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
    name: 'Analyse & Strukturierungsdiagnose',
    description: 'Vollständige Bestandsaufnahme Ihrer Unternehmenssituation inkl. konkreter Krisenstrategie, Kapitalmarktzugang-Analyse, schriftlichem Analysebericht (15-20 Seiten), persönlichem Beratungsgespräch (60 Min) und Follow-up nach 2 Wochen.',
    price: 299000, // €2.990,00 in cents
    currency: 'eur',
  },
  HANDBUCH: {
    id: 'handbuch',
    name: 'Handbuch Immobilienprojektentwickler',
    description: 'Expertenwissen für Immobilienprojektentwickler: Kapitalmarktzugang, Finanzierungsstrategien, CLN-Strukturen, Anleihen und Zertifikate.',
    price: 2990, // €29,90 in cents
    currency: 'eur',
  },
} as const;

export type ProductId = keyof typeof PRODUCTS;
