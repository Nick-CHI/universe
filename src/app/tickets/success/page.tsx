'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaTicketAlt, FaGlassCheers, FaCheck, FaDownload } from 'react-icons/fa';

interface Ticket {
  id: string;
  type: string;
  purchaseDate: string;
  valid: boolean;
}

interface Coupon {
  id: string;
  type: string;
  redeemed: boolean;
}

interface SessionData {
  success: boolean;
  customer: any;
  tickets: Ticket[];
  coupons: Coupon[];
  orderId: string;
}

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setError('No session ID found');
      setLoading(false);
      return;
    }

    const fetchSessionData = async () => {
      try {
        const response = await fetch(`/api/stripe/session?session_id=${sessionId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch session data');
        }
        const data = await response.json();
        setSessionData(data);
      } catch (err) {
        setError('Error retrieving your order details. Please contact support.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionData();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0A0A1A] to-[#14142A]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error || !sessionData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0A0A1A] to-[#14142A]">
        <div className="ticket-card p-8 rounded-lg max-w-md w-full text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="mb-6">{error || 'Unable to process your order'}</p>
          <Link href="/tickets" className="btn-primary inline-block">
            Return to Tickets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A1A] to-[#14142A] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="ticket-card p-8 rounded-lg text-center mb-8">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCheck className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl font-bold mb-2 glow-text">Payment Successful!</h1>
          <p className="text-xl mb-6">Thank you for purchasing tickets to Universe Festival</p>
          <div className="text-sm text-gray-400 mb-2">Order ID: {sessionData.orderId}</div>
          <div className="text-sm text-gray-400">
            {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
          </div>
        </div>

        {/* Tickets */}
        <div className="ticket-card p-8 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <FaTicketAlt className="mr-2 text-purple-400" />
            Your Tickets
          </h2>
          <div className="space-y-4">
            {sessionData.tickets.map((ticket) => (
              <div key={ticket.id} className="p-4 bg-[#1A1A2E] rounded-lg border border-purple-900">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold">{ticket.type} Ticket</h3>
                  <span className="text-green-500 text-sm">Valid</span>
                </div>
                <div className="text-sm text-gray-400 mb-2">Ticket ID: {ticket.id}</div>
                <div className="text-sm text-gray-400">Purchase Date: {new Date(ticket.purchaseDate).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 px-4 bg-purple-700 hover:bg-purple-600 rounded-lg font-medium transition-colors flex items-center justify-center">
            <FaDownload className="mr-2" />
            Download Tickets
          </button>
        </div>

        {/* Drink Coupons */}
        <div className="ticket-card p-8 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <FaGlassCheers className="mr-2 text-purple-400" />
            Your Drink Coupons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sessionData.coupons.map((coupon) => (
              <div key={coupon.id} className="p-4 bg-[#1A1A2E] rounded-lg border border-purple-900 text-center">
                <div className="text-xl font-bold mb-2">Drink Coupon</div>
                <div className="text-xs text-gray-400 mb-1">ID: {coupon.id}</div>
                <div className="text-xs text-gray-400">Status: Not Redeemed</div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 px-4 bg-purple-700 hover:bg-purple-600 rounded-lg font-medium transition-colors flex items-center justify-center">
            <FaDownload className="mr-2" />
            Download Coupons
          </button>
        </div>

        {/* Next Steps */}
        <div className="ticket-card p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">What's Next?</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-purple-700 flex items-center justify-center mr-3 mt-0.5">1</div>
              <div>
                <h3 className="font-bold mb-1">Check Your Email</h3>
                <p className="text-sm text-gray-400">We've sent your tickets and drink coupons to your email address.</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-purple-700 flex items-center justify-center mr-3 mt-0.5">2</div>
              <div>
                <h3 className="font-bold mb-1">Save Your Tickets</h3>
                <p className="text-sm text-gray-400">Download and save your tickets to present at the entrance.</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-purple-700 flex items-center justify-center mr-3 mt-0.5">3</div>
              <div>
                <h3 className="font-bold mb-1">Get Ready to Party</h3>
                <p className="text-sm text-gray-400">Prepare for an unforgettable techno experience at Universe Festival!</p>
              </div>
            </li>
          </ul>
          <div className="mt-8 flex justify-center">
            <Link href="/" className="btn-primary">
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
