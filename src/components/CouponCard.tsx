'use client';

import { useState } from 'react';
import { FaGlassCheers, FaCheck, FaTimes } from 'react-icons/fa';

interface CouponProps {
  id: string;
  redeemed: boolean;
  onRedeem: (id: string) => void;
}

export default function CouponCard({ id, redeemed, onRedeem }: CouponProps) {
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRedeem = async () => {
    if (redeemed) return;
    
    try {
      setIsRedeeming(true);
      setError(null);
      
      // Call the API to redeem the coupon
      const response = await fetch('/api/coupons', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ couponId: id }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to redeem coupon');
      }
      
      // Notify parent component
      onRedeem(id);
    } catch (err) {
      console.error('Error redeeming coupon:', err);
      setError(err instanceof Error ? err.message : 'Failed to redeem coupon');
    } finally {
      setIsRedeeming(false);
    }
  };

  return (
    <div className={`p-4 bg-[#1A1A2E] rounded-lg border ${redeemed ? 'border-gray-700' : 'border-purple-900'} text-center relative`}>
      {redeemed && (
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
          <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold transform -rotate-12">
            Redeemed
          </div>
        </div>
      )}
      
      <div className="mb-3">
        <FaGlassCheers className={`text-3xl mx-auto ${redeemed ? 'text-gray-500' : 'text-purple-400'}`} />
      </div>
      
      <div className="text-xl font-bold mb-2">Drink Coupon</div>
      <div className="text-xs text-gray-400 mb-3">ID: {id}</div>
      
      {error && (
        <div className="text-red-500 text-xs mb-2">{error}</div>
      )}
      
      <button
        onClick={handleRedeem}
        disabled={redeemed || isRedeeming}
        className={`w-full py-2 px-3 rounded-lg font-medium text-sm transition-colors flex items-center justify-center ${
          redeemed
            ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
            : 'bg-purple-700 hover:bg-purple-600 text-white'
        }`}
      >
        {isRedeeming ? (
          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
        ) : redeemed ? (
          <FaCheck className="mr-1" />
        ) : (
          <FaGlassCheers className="mr-1" />
        )}
        {isRedeeming ? 'Processing...' : redeemed ? 'Redeemed' : 'Redeem Coupon'}
      </button>
    </div>
  );
}
