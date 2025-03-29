import { NextRequest, NextResponse } from 'next/server';

// Mock data for dashboard statistics
const dashboardStats = {
  totalSales: 12450,
  ticketsSold: 830,
  earlyBird: 500,
  regular: 330,
  lastMinute: 0,
  drinkCouponsIssued: 2490,
  drinkCouponsRedeemed: 875,
  revenue: {
    lastWeek: [1200, 980, 1500, 800, 1700, 2100, 1800],
    thisWeek: [1800, 2200, 1900, 2500, 1600, 0, 0]
  }
};

// Mock data for recent sales
const recentSales = [
  { id: 1, name: 'John Doe', email: 'john@example.com', tickets: 2, phase: 'Early Bird', total: '€20.00', date: '2025-03-29' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', tickets: 4, phase: 'Early Bird', total: '€40.00', date: '2025-03-28' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', tickets: 1, phase: 'Early Bird', total: '€10.00', date: '2025-03-28' },
  { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', tickets: 3, phase: 'Early Bird', total: '€30.00', date: '2025-03-27' },
  { id: 5, name: 'David Brown', email: 'david@example.com', tickets: 2, phase: 'Early Bird', total: '€20.00', date: '2025-03-27' },
  { id: 6, name: 'Emily Davis', email: 'emily@example.com', tickets: 5, phase: 'Early Bird', total: '€50.00', date: '2025-03-26' },
  { id: 7, name: 'Alex Wilson', email: 'alex@example.com', tickets: 2, phase: 'Early Bird', total: '€20.00', date: '2025-03-26' },
  { id: 8, name: 'Lisa Taylor', email: 'lisa@example.com', tickets: 3, phase: 'Early Bird', total: '€30.00', date: '2025-03-25' },
  { id: 9, name: 'Robert Martin', email: 'robert@example.com', tickets: 1, phase: 'Early Bird', total: '€10.00', date: '2025-03-25' },
  { id: 10, name: 'Jennifer Lee', email: 'jennifer@example.com', tickets: 2, phase: 'Early Bird', total: '€20.00', date: '2025-03-24' },
];

// Mock data for attendees
const attendees = recentSales.map(sale => ({
  id: sale.id,
  name: sale.name,
  email: sale.email,
  ticketCount: sale.tickets,
  ticketType: sale.phase,
  purchaseDate: sale.date,
  checkedIn: Math.random() > 0.7, // Randomly mark some as checked in
  drinkCoupons: {
    total: sale.tickets * 3,
    redeemed: Math.floor(Math.random() * (sale.tickets * 3))
  }
}));

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const dataType = searchParams.get('type');
  
  switch (dataType) {
    case 'stats':
      return NextResponse.json({ stats: dashboardStats });
    case 'sales':
      return NextResponse.json({ sales: recentSales });
    case 'attendees':
      return NextResponse.json({ attendees });
    default:
      return NextResponse.json({
        stats: dashboardStats,
        sales: recentSales.slice(0, 5), // Only return the 5 most recent sales for the overview
        attendees: attendees.slice(0, 5) // Only return the 5 most recent attendees for the overview
      });
  }
}
