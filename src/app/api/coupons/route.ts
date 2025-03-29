import { NextRequest, NextResponse } from 'next/server';

// Mock database for coupons
let coupons = [
  // These will be populated from successful purchases
];

export interface Coupon {
  id: string;
  type: string;
  redeemed: boolean;
  redeemedAt?: string;
  orderId: string;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const couponId = searchParams.get('id');
  
  if (couponId) {
    // Return a specific coupon
    const coupon = coupons.find(c => c.id === couponId);
    
    if (!coupon) {
      return NextResponse.json(
        { error: 'Coupon not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ coupon });
  }
  
  // Return all coupons
  return NextResponse.json({ coupons });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { couponsData, orderId } = body;
    
    if (!couponsData || !Array.isArray(couponsData) || !orderId) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }
    
    // Create new coupons
    const newCoupons = couponsData.map((coupon, index) => ({
      id: `DRINK-${orderId}-${index + 1}`,
      type: 'Drink',
      redeemed: false,
      orderId
    }));
    
    // Add to our "database"
    coupons = [...coupons, ...newCoupons];
    
    return NextResponse.json({ 
      success: true, 
      coupons: newCoupons 
    });
  } catch (error) {
    console.error('Error creating coupons:', error);
    return NextResponse.json(
      { error: 'Error creating coupons' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { couponId } = body;
    
    if (!couponId) {
      return NextResponse.json(
        { error: 'Coupon ID is required' },
        { status: 400 }
      );
    }
    
    // Find the coupon
    const couponIndex = coupons.findIndex(c => c.id === couponId);
    
    if (couponIndex === -1) {
      return NextResponse.json(
        { error: 'Coupon not found' },
        { status: 404 }
      );
    }
    
    // Check if already redeemed
    if (coupons[couponIndex].redeemed) {
      return NextResponse.json(
        { error: 'Coupon already redeemed' },
        { status: 400 }
      );
    }
    
    // Mark as redeemed
    coupons[couponIndex] = {
      ...coupons[couponIndex],
      redeemed: true,
      redeemedAt: new Date().toISOString()
    };
    
    return NextResponse.json({ 
      success: true, 
      coupon: coupons[couponIndex] 
    });
  } catch (error) {
    console.error('Error redeeming coupon:', error);
    return NextResponse.json(
      { error: 'Error redeeming coupon' },
      { status: 500 }
    );
  }
}
