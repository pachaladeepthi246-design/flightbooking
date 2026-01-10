# Vercel Environment Variables

Copy and paste these values into your Vercel Project Settings > Environment Variables.

## Core Configuration
NEXTAUTH_URL=https://your-deployment-url.vercel.app
NEXTAUTH_SECRET=[GENERATE_SECURE_RANDOM_STRING] (Use: openssl rand -base64 32)
NODE_ENV=production

## Database
# Connect your Vercel Postgres or Supabase database
DATABASE_URL=postgres://user:password@host:port/database?sslmode=require

## Google Maps & Places
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
GOOGLE_PLACES_API_KEY=

## Payment Gateway (Razorpay)
NEXT_PUBLIC_RAZORPAY_KEY_ID=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

## Email Service (Resend)
RESEND_API_KEY=
EMAIL_FROM=onboarding@resend.dev

## Redis (Optional - for caching)
# If using Vercel KV or Upstash
KV_URL=
KV_REST_API_URL=
KV_REST_API_TOKEN=
KV_REST_API_READ_ONLY_TOKEN=
