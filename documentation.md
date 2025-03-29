# Universe Techno Festival - Documentation

## Overview
Universe is a techno festival ticket platform with the following features:
- Ticket sales with three pricing phases (€10, €15, €20)
- Stripe payment integration
- Drink coupon system (3 coupons per ticket)
- Organizer dashboard for sales tracking and management

## Project Structure
- `/src/app/` - Main application pages
- `/src/components/` - Reusable UI components
- `/src/lib/` - Utility functions and context providers

## Key Features

### Ticket System
- Three pricing phases:
  - Early Bird: €10
  - Regular: €15
  - Last Minute: €20
- Countdown timer showing time until next pricing phase
- Ability to purchase multiple tickets

### Stripe Integration
- Secure payment processing
- Checkout flow with order summary
- Success page after purchase

### Drink Coupon System
- 3 drink coupons automatically generated per ticket
- Unique coupon codes for verification
- Coupon management in the organizer dashboard

### Organizer Dashboard
- Sales statistics and revenue tracking
- Attendee management
- Drink coupon usage monitoring
- Pricing phase control

## Setup Instructions

### Environment Variables
Create a `.env.local` file with the following variables:
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_APP_URL=your_app_url
```

### Installation
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment
The application is configured for deployment to Vercel:
1. Connect your GitHub repository to Vercel
2. Set up the environment variables
3. Deploy the application

## Customization
- Update festival details in `/src/app/page.tsx`
- Modify pricing phases in `/src/lib/context.tsx`
- Customize styling in `/src/app/globals.css`

## Future Enhancements
- User authentication system
- Email notifications for ticket purchases
- QR code scanning for drink coupon redemption
- Analytics dashboard for sales trends
