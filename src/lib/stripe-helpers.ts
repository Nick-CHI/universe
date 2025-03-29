// This file contains Stripe-related utility functions
import { loadStripe } from '@stripe/stripe-js';

// Replace with your Stripe publishable key when in production
export const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_51OxYzKLkjM8iOpqwertyu1234567890abcdefghijklmn';

// Initialize Stripe
export const getStripe = async () => {
  const stripe = await loadStripe(stripePublishableKey);
  return stripe;
};

// Format price for Stripe (converts to cents)
export const formatAmountForStripe = (amount: number, currency: string) => {
  const numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  });
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency = true;
  for (const part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false;
    }
  }
  return zeroDecimalCurrency ? amount : Math.round(amount * 100);
};

// Generate a unique order ID
export const generateOrderId = () => {
  return `order_${Math.random().toString(36).substring(2, 15)}_${Date.now()}`;
};
