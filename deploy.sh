#!/bin/bash

# BookingHub Deployment Script
# This script will help you push to GitHub and deploy to Vercel

echo "🚀 BookingHub Deployment Script"
echo "================================"
echo ""

# Step 1: GitHub Repository Setup
echo "📋 Step 1: Create GitHub Repository"
echo "-----------------------------------"
echo "1. Go to: https://github.com/new"
echo "2. Repository name: flightbooking"
echo "3. Description: Complete all-in-one booking platform"
echo "4. Visibility: Public or Private"
echo "5. DO NOT initialize with README"
echo "6. Click 'Create repository'"
echo ""
read -p "Press Enter after creating the repository..."
echo ""

# Step 2: Get Repository URL
echo "📍 Step 2: Enter Your GitHub Repository URL"
echo "-------------------------------------------"
read -p "Enter your GitHub repository URL (e.g., https://github.com/username/flightbooking.git): " REPO_URL
echo ""

# Step 3: Add Remote and Push
echo "⬆️  Step 3: Pushing to GitHub..."
echo "-------------------------------"

# Add remote
git remote remove origin 2>/dev/null
git remote add origin "$REPO_URL"

# Push to GitHub
git branch -M main
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to GitHub!"
    echo ""
else
    echo "❌ Failed to push to GitHub. Please check your credentials."
    exit 1
fi

# Step 4: Vercel Deployment
echo "🌐 Step 4: Deploy to Vercel"
echo "---------------------------"
echo "1. Go to: https://vercel.com/new"
echo "2. Import your repository: flightbooking"
echo "3. Framework Preset: Next.js"
echo "4. Root Directory: ./"
echo "5. Build Command: npm run build"
echo "6. Output Directory: .next"
echo ""
echo "7. Add these Environment Variables:"
echo "   - DATABASE_URL"
echo "   - NEXTAUTH_URL"
echo "   - NEXTAUTH_SECRET"
echo "   - NEXT_PUBLIC_GOOGLE_MAPS_API_KEY"
echo "   - RAZORPAY_KEY_ID"
echo "   - RAZORPAY_KEY_SECRET"
echo "   - NEXT_PUBLIC_RAZORPAY_KEY_ID"
echo "   - RESEND_API_KEY"
echo ""
echo "8. Click 'Deploy'"
echo ""
read -p "Press Enter after deployment completes..."
echo ""

# Step 5: Get Deployment URL
echo "🎉 Step 5: Your Deployment URLs"
echo "--------------------------------"
read -p "Enter your Vercel deployment URL (e.g., https://flightbooking-xxx.vercel.app): " VERCEL_URL
echo ""

# Summary
echo "✅ DEPLOYMENT COMPLETE!"
echo "======================="
echo ""
echo "📍 Your URLs:"
echo "   GitHub: $REPO_URL"
echo "   Vercel: $VERCEL_URL"
echo ""
echo "🎊 Your BookingHub platform is now live!"
echo ""
echo "Next steps:"
echo "1. Set up PostgreSQL database"
echo "2. Run: npx prisma migrate deploy"
echo "3. Test all features"
echo "4. Configure custom domain (optional)"
echo ""
echo "🚀 Happy launching!"
