'use client';

import { useState, useEffect } from 'react';
import { FaGlassCheers, FaQrCode, FaDownload } from 'react-icons/fa';
import Link from 'next/link';

interface CouponVerificationProps {
  params: {
    id: string;
  };
}

interface Coupon {
  id: string;
  type: string;
  redeemed: boolean;
  redeemedAt?: string;
  orderId: string;
}

export default function CouponVerificationPage({ params }: CouponVerificationProps) {
  const { id } = params;
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        const response = await fetch(`/api/coupons?id=${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch coupon');
        }
        
        const data = await response.json();
        setCoupon(data.coupon);
      } catch (err) {
        console.error('Error fetching coupon:', err);
        setError('Failed to load coupon information. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCoupon();
    } else {
      setError('Invalid coupon ID');
      setLoading(false);
    }
  }, [id]);

  const handleVerifyCoupon = async () => {
    if (!coupon || coupon.redeemed) return;
    
    try {
      setVerifying(true);
      
      const response = await fetch('/api/coupons', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ couponId: id }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to verify coupon');
      }
      
      const data = await response.json();
      setCoupon(data.coupon);
    } catch (err) {
      console.error('Error verifying coupon:', err);
      setError('Failed to verify coupon. Please try again.');
    } finally {
      setVerifying(false);
    }
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
          <div className="text-sm text-gray-400">Coupon Verification</div>
        </div>
      </header>

      {/* Verification Section */}
      <section className="py-16 px-4">
        <div className="max-w-md mx-auto">
          {error ? (
            <div className="ticket-card p-8 rounded-lg text-center">
              <div className="text-red-500 text-5xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold mb-4">Verification Failed</h2>
              <p className="mb-6">{error}</p>
              <Link href="/coupons" className="btn-primary inline-block">
                Back to Coupons
              </Link>
            </div>
          ) : coupon ? (
            <div className="ticket-card p-8 rounded-lg text-center">
              <div className="mb-6">
                <FaGlassCheers className={`text-6xl mx-auto ${coupon.redeemed ? 'text-gray-500' : 'text-purple-400'}`} />
              </div>
              
              <h1 className="text-3xl font-bold mb-2">Drink Coupon</h1>
              <p className="text-gray-400 mb-6">ID: {coupon.id}</p>
              
              <div className="w-48 h-48 mx-auto bg-white p-2 rounded-lg mb-6">
                <div className="w-full h-full flex items-center justify-center bg-[#1A1A2E]">
                  <FaQrCode className="text-6xl text-white" />
                </div>
              </div>
              
              <div className={`text-xl font-bold mb-6 ${coupon.redeemed ? 'text-red-500' : 'text-green-500'}`}>
                {coupon.redeemed ? 'ALREADY REDEEMED' : 'VALID'}
              </div>
              
              {coupon.redeemed && coupon.redeemedAt && (
                <div className="text-sm text-gray-400 mb-6">
                  Redeemed on {new Date(coupon.redeemedAt).toLocaleString()}
                </div>
              )}
              
              <button
                onClick={handleVerifyCoupon}
                disabled={coupon.redeemed || verifying}
                className={`w-full py-3 px-4 rounded-lg font-bold transition-all duration-300 mb-4 ${
                  coupon.redeemed 
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
              >
                {verifying ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Verifying...
                  </div>
                ) : coupon.redeemed ? (
                  'Already Redeemed'
                ) : (
                  'Verify & Redeem'
                )}
              </button>
              
              <Link href="/coupons" className="text-purple-400 hover:text-purple-300">
                Back to All Coupons
              </Link>
            </div>
          ) : (
            <div className="ticket-card p-8 rounded-lg text-center">
              <div className="text-red-500 text-5xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold mb-4">Coupon Not Found</h2>
              <p className="mb-6">The coupon you're looking for doesn't exist or has been removed.</p>
              <Link href="/coupons" className="btn-primary inline-block">
                Back to Coupons
              </Link>
            </div>
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
