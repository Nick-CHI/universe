'use client';

import { useState, useEffect } from 'react';
import { FaGlassCheers, FaTicketAlt, FaQrCode } from 'react-icons/fa';
import Link from 'next/link';
import CouponCard from '@/components/CouponCard';

interface Coupon {
  id: string;
  type: string;
  redeemed: boolean;
  redeemedAt?: string;
  orderId: string;
}

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        // In a real app, this would fetch the user's coupons
        // For demo purposes, we'll create some mock coupons
        const mockOrderId = `order_${Math.random().toString(36).substring(2, 10)}_${Date.now()}`;
        const mockCoupons = Array.from({ length: 3 }, (_, i) => ({
          id: `DRINK-${mockOrderId}-${i + 1}`,
          type: 'Drink',
          redeemed: i === 0, // First one is already redeemed for demo
          orderId: mockOrderId
        }));
        
        // Create coupons in our API
        const response = await fetch('/api/coupons', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            couponsData: mockCoupons,
            orderId: mockOrderId
          }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch coupons');
        }
        
        const data = await response.json();
        setCoupons(data.coupons);
      } catch (err) {
        console.error('Error fetching coupons:', err);
        setError('Failed to load your drink coupons. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  const handleRedeemCoupon = (couponId: string) => {
    setCoupons(prevCoupons => 
      prevCoupons.map(coupon => 
        coupon.id === couponId 
          ? { ...coupon, redeemed: true, redeemedAt: new Date().toISOString() } 
          : coupon
      )
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0A0A1A] to-[#14142A]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A1A] to-[#14142A]">
      {/* Header */}
      <header className="py-6 px-4 border-b border-purple-900">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold glow-text">UNIVERSE</Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-purple-400 transition-colors">Home</Link>
            <Link href="/tickets" className="hover:text-purple-400 transition-colors">Tickets</Link>
            <Link href="/coupons" className="text-purple-400 font-bold">My Coupons</Link>
            <Link href="#" className="hover:text-purple-400 transition-colors">Info</Link>
          </nav>
        </div>
      </header>

      {/* Coupons Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-center glow-text">Your Drink Coupons</h1>
          <p className="text-xl text-center mb-12">Redeem these at the festival bars</p>
          
          {error ? (
            <div className="ticket-card p-8 rounded-lg text-center">
              <div className="text-red-500 text-5xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
              <p className="mb-6">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="btn-primary"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              {/* Coupon Stats */}
              <div className="ticket-card p-6 rounded-lg mb-8">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-purple-400">{coupons.length}</div>
                    <div className="text-sm text-gray-400">Total Coupons</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-500">
                      {coupons.filter(c => c.redeemed).length}
                    </div>
                    <div className="text-sm text-gray-400">Redeemed</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-400">
                      {coupons.filter(c => !c.redeemed).length}
                    </div>
                    <div className="text-sm text-gray-400">Available</div>
                  </div>
                </div>
              </div>
              
              {/* Coupons Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {coupons.map((coupon) => (
                  <CouponCard
                    key={coupon.id}
                    id={coupon.id}
                    redeemed={coupon.redeemed}
                    onRedeem={handleRedeemCoupon}
                  />
                ))}
              </div>
              
              {/* Instructions */}
              <div className="ticket-card p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <FaGlassCheers className="mr-2 text-purple-400" />
                  How to Use Your Coupons
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-purple-900 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">At the Festival</h3>
                      <p className="text-gray-300">
                        When you're ready to get a drink, open this page on your phone and show it to the bartender.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-purple-900 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Redeem Your Coupon</h3>
                      <p className="text-gray-300">
                        Click the "Redeem Coupon" button when the bartender is ready to serve you. This will mark the coupon as used.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-purple-900 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Enjoy Your Drink!</h3>
                      <p className="text-gray-300">
                        Once redeemed, the coupon will be marked as used and cannot be used again. Enjoy your drink responsibly!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-[#0A0A1A] py-8 px-4 border-t border-purple-900">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} Universe Festival. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
