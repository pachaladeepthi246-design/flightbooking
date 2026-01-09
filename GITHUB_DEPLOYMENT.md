# 🚀 GitHub & Vercel Deployment Instructions

## ✅ Code Committed Successfully!

**65 files committed** with 15,308 lines of code!

---

## 📋 Next Steps

### Step 1: Create GitHub Repository

1. Go to: https://github.com/new
2. **Repository name**: `flightbooking`
3. **Description**: "Complete all-in-one booking platform for hotels, flights, buses, cars, homes & experiences"
4. **Visibility**: Public or Private (your choice)
5. **DO NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

### Step 2: Get Repository URL

After creating, copy the repository URL:
```
https://github.com/YOUR_USERNAME/flightbooking.git
```

### Step 3: Commands to Run

Once you have the URL, run these commands:

```bash
cd /Users/mac/antigravity_project01/project01/booking-platform

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/flightbooking.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Deploy to Vercel

1. Go to: https://vercel.com/new
2. Import your GitHub repository: `flightbooking`
3. Configure:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next
4. Add Environment Variables (from .env.example)
5. Click "Deploy"

---

## 🔑 Required Environment Variables for Vercel

```env
DATABASE_URL=your-postgresql-url
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-secret-key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-key
RAZORPAY_KEY_ID=your-key
RAZORPAY_KEY_SECRET=your-secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your-key
RESEND_API_KEY=your-key
```

---

## 📍 What You'll Get

After deployment:
- **GitHub Repo**: https://github.com/YOUR_USERNAME/flightbooking
- **Vercel App**: https://flightbooking-xxx.vercel.app
- **Production URL**: Your custom domain (optional)

---

**Reply with your GitHub repository URL and I'll help you complete the deployment!** 🚀
