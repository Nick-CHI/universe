import { NextResponse } from 'next/server';

// Mock data for pricing phases
export const pricingPhases = [
  {
    id: 'early-bird',
    name: 'Early Bird',
    price: 10,
    currency: 'EUR',
    active: true,
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
  },
  {
    id: 'regular',
    name: 'Regular',
    price: 15,
    currency: 'EUR',
    active: false,
    endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(), // 45 days from now
  },
  {
    id: 'late',
    name: 'Last Minute',
    price: 20,
    currency: 'EUR',
    active: false,
    endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days from now (event date)
  },
];

export async function GET() {
  return NextResponse.json({ pricingPhases });
}
