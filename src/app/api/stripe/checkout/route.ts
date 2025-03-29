import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { formatAmountForStripe, generateOrderId } from '@/lib/stripe-helpers';
import { pricingPhases } from '@/app/api/pricing/route';

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_51OxYzKLkjM8iOpqwertyu1234567890abcdefghijklmn', {
  apiVersion: '2023-10-16',
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { quantity, pricePhaseId } = body;
    
    // Find the active pricing phase
    const activePhase = pricingPhases.find(phase => phase.active);
    
    if (!activePhase) {
      return NextResponse.json(
        { error: 'No active pricing phase found' },
        { status: 400 }
      );
    }
    
    // Validate that the requested phase is the active one
    if (pricePhaseId !== activePhase.id) {
      return NextResponse.json(
        { error: 'Selected pricing phase is not currently active' },
        { status: 400 }
      );
    }
    
    // Calculate the amount in cents
    const amount = formatAmountForStripe(activePhase.price * quantity, activePhase.currency);
    
    // Generate a unique order ID
    const orderId = generateOrderId();
    
    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: activePhase.currency.toLowerCase(),
            product_data: {
              name: `Universe Festival - ${activePhase.name} Ticket`,
              description: 'Includes entry to the festival and 3 drink coupons',
            },
            unit_amount: formatAmountForStripe(activePhase.price, activePhase.currency),
          },
          quantity: quantity,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/tickets/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/tickets`,
      metadata: {
        orderId,
        ticketQuantity: quantity.toString(),
        pricingPhase: activePhase.name,
        drinkCoupons: (quantity * 3).toString(), // 3 drink coupons per ticket
      },
    });
    
    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}
