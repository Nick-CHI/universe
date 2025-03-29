'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  // Mock data for dashboard
  const [salesData] = useState({
    totalSales: 12450,
    ticketsSold: 830,
    earlyBird: 500,
    regular: 330,
    lastMinute: 0,
  });

  const [recentSales] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', tickets: 2, phase: 'Early Bird', total: '€20.00', date: '2025-03-29' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', tickets: 4, phase: 'Early Bird', total: '€40.00', date: '2025-03-28' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', tickets: 1, phase: 'Early Bird', total: '€10.00', date: '2025-03-28' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', tickets: 3, phase: 'Early Bird', total: '€30.00', date: '2025-03-27' },
    { id: 5, name: 'David Brown', email: 'david@example.com', tickets: 2, phase: 'Early Bird', total: '€20.00', date: '2025-03-27' },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A1A] to-[#14142A]">
      {/* Dashboard Header */}
      <header className="py-6 px-4 border-b border-purple-900">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold glow-text">UNIVERSE</Link>
          <div className="flex items-center space-x-4">
            <span className="text-gray-400">Admin Dashboard</span>
            <div className="w-10 h-10 rounded-full bg-purple-700 flex items-center justify-center">
              <span>👤</span>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Organizer Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="ticket-card p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-900 flex items-center justify-center mr-4">
                <span>🎟️</span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-400">Tickets Sold</h3>
                <p className="text-2xl font-bold">{salesData.ticketsSold}</p>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Early Bird: {salesData.earlyBird}</span>
              <span className="text-gray-400">Regular: {salesData.regular}</span>
              <span className="text-gray-400">Last Minute: {salesData.lastMinute}</span>
            </div>
          </div>
          
          <div className="ticket-card p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-900 flex items-center justify-center mr-4">
                <span>📊</span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-400">Total Sales</h3>
                <p className="text-2xl font-bold">€{salesData.totalSales.toLocaleString()}</p>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              <span>Average ticket price: €{(salesData.totalSales / salesData.ticketsSold).toFixed(2)}</span>
            </div>
          </div>
          
          <div className="ticket-card p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-900 flex items-center justify-center mr-4">
                <span>🍹</span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-400">Drink Coupons</h3>
                <p className="text-2xl font-bold">{salesData.ticketsSold * 3}</p>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              <span>3 coupons per ticket</span>
            </div>
          </div>
          
          <div className="ticket-card p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-900 flex items-center justify-center mr-4">
                <span>👥</span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-400">Capacity</h3>
                <p className="text-2xl font-bold">{Math.round((salesData.ticketsSold / 2000) * 100)}%</p>
              </div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${Math.round((salesData.ticketsSold / 2000) * 100)}%` }}></div>
            </div>
            <div className="text-sm text-gray-400 mt-2">
              <span>{salesData.ticketsSold} of 2000 tickets sold</span>
            </div>
          </div>
        </div>
        
        {/* Recent Sales Table */}
        <div className="ticket-card rounded-lg overflow-hidden mb-8">
          <div className="p-6 border-b border-purple-900">
            <h2 className="text-xl font-bold">Recent Sales</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#1A1A2E] text-left">
                <tr>
                  <th className="py-4 px-6 font-medium">Customer</th>
                  <th className="py-4 px-6 font-medium">Email</th>
                  <th className="py-4 px-6 font-medium">Tickets</th>
                  <th className="py-4 px-6 font-medium">Phase</th>
                  <th className="py-4 px-6 font-medium">Total</th>
                  <th className="py-4 px-6 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentSales.map((sale) => (
                  <tr key={sale.id} className="border-t border-purple-900">
                    <td className="py-4 px-6">{sale.name}</td>
                    <td className="py-4 px-6">{sale.email}</td>
                    <td className="py-4 px-6">{sale.tickets}</td>
                    <td className="py-4 px-6">{sale.phase}</td>
                    <td className="py-4 px-6">{sale.total}</td>
                    <td className="py-4 px-6">{sale.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 text-center">
            <button className="text-purple-400 hover:text-purple-300">View All Sales</button>
          </div>
        </div>
        
        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="ticket-card p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
            <div className="space-y-4">
              <button className="w-full py-3 px-4 bg-purple-700 hover:bg-purple-600 rounded-lg font-medium transition-colors">
                Export Attendee List
              </button>
              <button className="w-full py-3 px-4 bg-purple-700 hover:bg-purple-600 rounded-lg font-medium transition-colors">
                Generate Drink Coupons
              </button>
              <button className="w-full py-3 px-4 bg-purple-700 hover:bg-purple-600 rounded-lg font-medium transition-colors">
                Send Email to Attendees
              </button>
            </div>
          </div>
          
          <div className="ticket-card p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Pricing Phase Control</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-[#1A1A2E] rounded-lg">
                <div>
                  <h4 className="font-medium">Early Bird</h4>
                  <p className="text-sm text-gray-400">€10.00</p>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 text-green-500">Active</span>
                  <div className="w-12 h-6 bg-green-500 rounded-full relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-[#1A1A2E] rounded-lg">
                <div>
                  <h4 className="font-medium">Regular</h4>
                  <p className="text-sm text-gray-400">€15.00</p>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 text-gray-400">Inactive</span>
                  <div className="w-12 h-6 bg-gray-700 rounded-full relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1"></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-[#1A1A2E] rounded-lg">
                <div>
                  <h4 className="font-medium">Last Minute</h4>
                  <p className="text-sm text-gray-400">€20.00</p>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 text-gray-400">Inactive</span>
                  <div className="w-12 h-6 bg-gray-700 rounded-full relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
