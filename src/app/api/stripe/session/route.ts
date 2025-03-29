import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_51OxYzKLkjM8iOpqwertyu1234567890abcdefghijklmn', {
  apiVersion: '2023-10-16',
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('session_id');
  
  if (!sessionId) {
    return NextResponse.json(
      { error: 'Missing session_id parameter' },
      { status: 400 }
    );
  }
  
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (!session) {
      return NextResponse.json(
        { error: 'No session found' },
        { status: 404 }
      );
    }
    
    // Generate ticket and coupon data
    const ticketQuantity = parseInt(session.metadata?.ticketQuantity || '1');
    const drinkCoupons = parseInt(session.metadata?.drinkCoupons || '3');
    const pricingPhase = session.metadata?.pricingPhase || 'Standard';
    const orderId = session.metadata?.orderId || '';
    
    // Generate unique ticket codes
    const tickets = Array.from({ length: ticketQuantity }, (_, i) => ({
      id: `TICKET-${orderId}-${i + 1}`,
      type: pricingPhase,
      purchaseDate: new Date().toISOString(),
      valid: true
    }));
    
    // Generate unique drink coupon codes
    const coupons = Array.from({ length: drinkCoupons }, (_, i) => ({
      id: `DRINK-${orderId}-${i + 1}`,
      type: 'Drink',
      redeemed: false
    }));
    
    return NextResponse.json({
      success: true,
      customer: session.customer_details,
      tickets,
      coupons,
      orderId
    });
  } catch (error) {
    console.error('Error retrieving session:', error);
    return NextResponse.json(
      { error: 'Error retrieving session' },
      { status: 500 }
    );
  }
}
