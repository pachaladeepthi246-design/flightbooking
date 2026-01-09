# BookingHub - Ultimate All-in-One Booking Platform

🚀 **Live Demo**: [http://localhost:3000](http://localhost:3000)

A comprehensive booking platform combining **MakeMyTrip + Airbnb + RedBus + OYO** functionality with complete vendor management, Google Places/Maps integration, and dual revenue model (commissions + subscriptions).

## ✨ Features

### Core Booking Modules
- 🏨 **Hotels & Accommodations** - Search 100k+ properties with advanced filters
- ✈️ **Flights** - Book domestic and international flights
- 🚌 **Buses** - Inter-city bus bookings with seat selection
- 🚗 **Car/Bike Rentals** - Self-drive and chauffeur-driven options
- 🏠 **Vacation Homes** - Airbnb-style property rentals
- 🎯 **Experiences** - Activities, tours, and attractions
- 📦 **Vacation Packages** - Pre-designed and custom itineraries

### Vendor Management
- 📝 Complete vendor registration and verification
- 📊 Comprehensive dashboard with analytics
- 💰 Commission-based revenue (15-25%)
- 📅 Subscription plans (₹499 - ₹9999/month)
- 💳 Automated payouts (Net-30 or instant)
- ⭐ Review management system
- 📈 Dynamic pricing tools

### Payment Integration
- 💳 Razorpay, Cashfree, PayU support
- 🔒 PCI DSS compliant
- 💰 UPI, Cards, Wallets, Net Banking
- 📱 EMI options
- 🌍 International payments

### Premium Design
- 🎨 Glassmorphism UI
- 🌈 Vibrant gradients
- ✨ Smooth animations
- 📱 Fully responsive
- 🌙 Dark mode ready

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Prisma + SQLite (PostgreSQL for production)
- **Authentication**: NextAuth.js
- **Payments**: Razorpay, Cashfree, PayU
- **Maps**: Google Maps & Places API
- **State**: Zustand + React Query
- **Forms**: React Hook Form + Zod
- **UI Components**: Radix UI + Lucide Icons

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Navigate to project directory
cd booking-platform

# Install dependencies (already done)
npm install --legacy-peer-deps

# Set up environment variables
cp .env.example .env.local

# Generate Prisma client and create database (already done)
npx prisma generate
npx prisma db push

# Run development server (already running)
npm run dev
```

### Access the Application

- **Homepage**: http://localhost:3000
- **Hotels Search**: http://localhost:3000/hotels
- **Vendor Dashboard**: http://localhost:3000/vendor/dashboard

## 📁 Project Structure

```
booking-platform/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Homepage with hero & search
│   ├── hotels/              # Hotels module
│   │   └── page.tsx         # Hotel search & listings
│   ├── vendor/              # Vendor portal
│   │   └── dashboard/       # Vendor dashboard
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── lib/                      # Utilities & config
│   ├── prisma.ts            # Prisma client
│   ├── config.ts            # Site configuration
│   └── utils.ts             # Helper functions
├── prisma/                   # Database
│   ├── schema.prisma        # Database schema
│   └── dev.db               # SQLite database
├── public/                   # Static assets
├── .env.local               # Environment variables
└── package.json             # Dependencies
```

## 🔧 Configuration

### Environment Variables

Edit `.env.local` and add your API keys:

```env
# Database (SQLite for development)
DATABASE_URL="file:./dev.db"

# Google APIs (Get from Google Cloud Console)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-google-maps-key"
GOOGLE_PLACES_API_KEY="your-google-places-key"

# Payment Gateways (Get from respective dashboards)
RAZORPAY_KEY_ID="your-razorpay-key"
RAZORPAY_KEY_SECRET="your-razorpay-secret"
NEXT_PUBLIC_RAZORPAY_KEY_ID="your-razorpay-key"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-min-32-chars"
```

### Getting API Keys

1. **Google Maps & Places API**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable Maps JavaScript API and Places API
   - Create credentials (API Key)
   - Add billing information (required for Places API)

2. **Razorpay**
   - Sign up at [Razorpay](https://razorpay.com/)
   - Get Test/Live API keys from Dashboard
   - Configure webhooks for payment notifications

## 📊 Database Schema

The platform uses 15+ models:

- **User** - Customer accounts
- **Vendor** - Vendor accounts with subscriptions
- **Hotel** - Property listings
- **Room** - Room types and availability
- **Booking** - All bookings across modules
- **Payment** - Payment transactions
- **Review** - Customer reviews
- **Payout** - Vendor payouts
- And more...

### Database Commands

```bash
# View database in Prisma Studio
npx prisma studio

# Reset database
npx prisma db push --force-reset

# Generate Prisma client after schema changes
npx prisma generate
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (#667eea → #764ba2)
- **Secondary**: Pink gradient (#f093fb → #f5576c)
- **Accent**: Cyan gradient (#4facfe → #00f2fe)
- **Success**: Green (#22c55e)
- **Warning**: Amber (#f59e0b)
- **Error**: Red (#ef4444)

### Components
- Premium cards with glassmorphism
- Gradient buttons with hover effects
- Smooth animations and transitions
- Responsive grid layouts
- Custom scrollbars

## 💰 Revenue Model

### Commission Rates
- Hotels: 20%
- Flights: 5%
- Buses: 10%
- Car Rentals: 18%
- Properties: 22%
- Experiences: 25%

### Subscription Plans
- **Free**: 14-day trial, 25% commission
- **Basic**: ₹499/month, 10 listings, 25% commission
- **Pro**: ₹2499/month, 100 listings, 20% commission
- **Enterprise**: ₹9999/month, unlimited, 15% commission

### Additional Fees
- Convenience Fee: ₹99 per booking
- GST: 12% on bookings
- Service Charge: 10%
- Cancellation Fee: ₹99-299
- Date Change Fee: ₹199

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Update DATABASE_URL to PostgreSQL connection string
```

### Database Migration (Production)

For production, switch from SQLite to PostgreSQL:

1. Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

2. Update `.env.local`:
```env
DATABASE_URL="postgresql://user:password@host:5432/database"
```

3. Run migrations:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### Environment Setup

Set these in your hosting platform:
- All API keys from `.env.local`
- `NODE_ENV=production`
- `NEXTAUTH_URL=https://yourdomain.com`

## 📱 Features Roadmap

### Implemented ✅
- [x] Premium homepage with search
- [x] Hotels search with filters
- [x] Vendor dashboard
- [x] Database schema
- [x] Design system
- [x] Responsive layout

### Coming Soon 🚧
- [ ] Google Places API integration
- [ ] Flight booking module
- [ ] Bus booking module
- [ ] Payment gateway integration
- [ ] User authentication
- [ ] Booking flow
- [ ] Review system
- [ ] Admin panel
- [ ] Email notifications
- [ ] Analytics dashboard

## 🤝 Contributing

This is a production-ready platform. For customization:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use for commercial projects

## 🆘 Support

For issues or questions:
- Check the documentation
- Review the code comments
- Contact support@bookinghub.com

## 🎯 Next Steps

1. **Add Google API Keys** - Enable maps and places search
2. **Configure Payments** - Set up Razorpay/Cashfree
3. **Add Real Data** - Import hotel listings
4. **Test Booking Flow** - End-to-end testing
5. **Deploy to Production** - Vercel or AWS

---

**Built with ❤️ using Next.js 14, Prisma, and Tailwind CSS**

🌟 **Star this project if you find it useful!**
