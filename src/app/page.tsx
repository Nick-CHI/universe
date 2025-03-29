'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAppContext } from '@/lib/context';

export default function Home() {
  const { currentPhase } = useAppContext();
  const [daysLeft] = useState(60); // 2 months until festival

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="hero-section relative h-screen flex items-center justify-center">
        <div className="z-10 text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 glow-text">UNIVERSE</h1>
          <p className="text-xl md:text-2xl mb-8">The Ultimate Techno Experience</p>
          <div className="flex flex-col md:flex-row gap-6 justify-center mb-12">
            <div className="flex items-center justify-center">
              <span>In {daysLeft} days</span>
            </div>
            <div className="flex items-center justify-center">
              <span>Cosmic Arena</span>
            </div>
            <div className="flex items-center justify-center">
              <span>Top Techno DJs</span>
            </div>
          </div>
          <Link href="/tickets" className="btn-primary inline-block">
            Get Tickets Now
          </Link>
        </div>
      </div>

      {/* About Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#14142A] to-[#1E1E32]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center glow-text">About Universe Festival</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-lg mb-6">
                Universe is not just a festival; it's a journey through sound and light. Join us for an unforgettable 
                techno experience featuring world-class DJs, immersive light shows, and a community of music lovers.
              </p>
              <p className="text-lg">
                Our state-of-the-art sound systems and visually stunning stage designs create the perfect atmosphere 
                for losing yourself in the music. Universe Festival is where memories are made and boundaries are broken.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-full h-64 bg-gray-800 rounded-lg glow-border flex items-center justify-center">
                <span className="text-lg text-gray-400">Festival Image Placeholder</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-[#0A0A1A]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 glow-text">Ticket Pricing</h2>
          <p className="text-xl mb-12">Secure your spot at the best price</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="ticket-card p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-2">Early Bird</h3>
              <p className="text-3xl font-bold mb-4">€10</p>
              <p className="mb-6">Available now</p>
              <Link href="/tickets" className="btn-primary inline-block">
                Buy Now
              </Link>
            </div>
            
            <div className="ticket-card p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-2">Regular</h3>
              <p className="text-3xl font-bold mb-4">€15</p>
              <p className="mb-6">Coming soon</p>
              <button className="btn-primary opacity-50 cursor-not-allowed" disabled>
                Coming Soon
              </button>
            </div>
            
            <div className="ticket-card p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-2">Last Minute</h3>
              <p className="text-3xl font-bold mb-4">€20</p>
              <p className="mb-6">Coming soon</p>
              <button className="btn-primary opacity-50 cursor-not-allowed" disabled>
                Coming Soon
              </button>
            </div>
          </div>
          
          <p className="text-lg">
            All tickets include entry to the festival and 3 drink coupons
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0A1A] py-12 px-4 border-t border-purple-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 glow-text">UNIVERSE</h2>
          <p className="mb-8">The Ultimate Techno Experience</p>
          <div className="flex justify-center space-x-6 mb-8">
            <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
            <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
            <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
            <a href="#" className="text-gray-400 hover:text-white">Contact</a>
          </div>
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} Universe Festival. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
