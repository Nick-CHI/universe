'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAppContext } from '@/lib/context';

export default function TicketsPage() {
  const { ticketCount, setTicketCount, currentPhase } = useAppContext();
  const [countdown] = useState({
    days: 30,
    hours: 12,
    minutes: 45,
    seconds: 20
  });

  const handleTicketChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTicketCount(parseInt(e.target.value));
  };

  const handleCheckout = () => {
    // In a real app, this would redirect to Stripe
    alert(`Processing checkout for ${ticketCount} tickets at €${currentPhase.price} each`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A1A] to-[#14142A]">
      {/* Header */}
      <header className="py-6 px-4 border-b border-purple-900">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold glow-text">UNIVERSE</Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-purple-400 transition-colors">Home</Link>
            <Link href="/tickets" className="text-purple-400 font-bold">Tickets</Link>
            <Link href="/dashboard" className="hover:text-purple-400 transition-colors">Dashboard</Link>
          </nav>
        </div>
      </header>

      {/* Ticket Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center glow-text">Get Your Tickets</h1>
          <p className="text-xl text-center mb-12">Secure your spot at the ultimate techno experience</p>
          
          {/* Countdown Timer */}
          <div className="mb-12 text-center">
            <p className="text-lg mb-2">Current Phase: <span className="text-purple-400 font-bold">{currentPhase.name}</span></p>
            <p className="text-sm mb-4">Price increases in:</p>
            <div className="flex justify-center space-x-4">
              <div className="text-center">
                <div className="countdown-timer">{countdown.days}</div>
                <div className="text-sm text-gray-400">Days</div>
              </div>
              <div className="text-center">
                <div className="countdown-timer">{countdown.hours}</div>
                <div className="text-sm text-gray-400">Hours</div>
              </div>
              <div className="text-center">
                <div className="countdown-timer">{countdown.minutes}</div>
                <div className="text-sm text-gray-400">Minutes</div>
              </div>
              <div className="text-center">
                <div className="countdown-timer">{countdown.seconds}</div>
                <div className="text-sm text-gray-400">Seconds</div>
              </div>
            </div>
          </div>
          
          {/* Pricing Phases */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="ticket-card p-8 rounded-lg text-center ring-2 ring-purple-500 glow-border">
              <h3 className="text-2xl font-bold mb-2">Early Bird</h3>
              <p className="text-3xl font-bold mb-4">€10</p>
              <ul className="mb-6 text-left">
                <li className="flex items-center mb-2">
                  <span className="mr-2">🎟️</span>
                  <span>Festival entry</span>
                </li>
                <li className="flex items-center mb-2">
                  <span className="mr-2">🍹</span>
                  <span>3 drink coupons</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">📅</span>
                  <span>Valid for all festival days</span>
                </li>
              </ul>
              <button className="w-full py-3 px-4 rounded-lg font-bold transition-all duration-300 bg-purple-600 hover:bg-purple-700 text-white">
                Select
              </button>
              <p className="mt-2 text-sm text-purple-400">Current phase</p>
            </div>
            
            <div className="ticket-card p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-2">Regular</h3>
              <p className="text-3xl font-bold mb-4">€15</p>
              <ul className="mb-6 text-left">
                <li className="flex items-center mb-2">
                  <span className="mr-2">🎟️</span>
                  <span>Festival entry</span>
                </li>
                <li className="flex items-center mb-2">
                  <span className="mr-2">🍹</span>
                  <span>3 drink coupons</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">📅</span>
                  <span>Valid for all festival days</span>
                </li>
              </ul>
              <button className="w-full py-3 px-4 rounded-lg font-bold transition-all duration-300 bg-gray-700 text-gray-400 cursor-not-allowed" disabled>
                Coming Soon
              </button>
            </div>
            
            <div className="ticket-card p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-2">Last Minute</h3>
              <p className="text-3xl font-bold mb-4">€20</p>
              <ul className="mb-6 text-left">
                <li className="flex items-center mb-2">
                  <span className="mr-2">🎟️</span>
                  <span>Festival entry</span>
                </li>
                <li className="flex items-center mb-2">
                  <span className="mr-2">🍹</span>
                  <span>3 drink coupons</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">📅</span>
                  <span>Valid for all festival days</span>
                </li>
              </ul>
              <button className="w-full py-3 px-4 rounded-lg font-bold transition-all duration-300 bg-gray-700 text-gray-400 cursor-not-allowed" disabled>
                Coming Soon
              </button>
            </div>
          </div>
          
          {/* Checkout Section */}
          <div className="max-w-md mx-auto ticket-card p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-6 text-center">Complete Your Order</h3>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Number of Tickets</label>
              <select 
                className="w-full bg-[#1A1A2E] border border-purple-900 rounded-lg py-3 px-4"
                value={ticketCount}
                onChange={handleTicketChange}
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
            <div className="mb-6 p-4 bg-[#1A1A2E] rounded-lg">
              <div className="flex justify-between mb-2">
                <span>Tickets ({ticketCount} x €{currentPhase.price})</span>
                <span>€{(ticketCount * currentPhase.price).toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Drink Coupons</span>
                <span>Included</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-purple-900">
                <span>Total</span>
                <span>€{(ticketCount * currentPhase.price).toFixed(2)}</span>
              </div>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full btn-primary flex items-center justify-center"
            >
              <span className="mr-2">🔒</span>
              Proceed to Checkout
            </button>
            <p className="mt-4 text-sm text-center text-gray-400">
              You'll receive your tickets and drink coupons via email after purchase
            </p>
          </div>
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
