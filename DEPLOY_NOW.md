# 🚀 Complete Deployment Guide

## ✅ What's Done

- ✅ GitHub repository created: https://github.com/pachaladeepthi246-design/flightbooking
- ✅ All code committed locally (65 files, 15,308 lines)
- ✅ Git remote configured

## ⚠️ Authentication Issue

The push failed due to GitHub authentication. You need to authenticate with the correct GitHub account.

---

## 📋 Complete Deployment Steps

### Step 1: Authenticate with GitHub

Choose one of these methods:

#### Option A: Using Personal Access Token (Recommended)

1. **Generate Token**:
   - Go to: https://github.com/settings/tokens/new
   - Note: "BookingHub Deployment"
   - Expiration: 90 days
   - Scopes: Select `repo` (full control)
   - Click "Generate token"
   - **Copy the token** (you won't see it again!)

2. **Push with Token**:
```bash
cd /Users/mac/antigravity_project01/project01/booking-platform

# Remove old remote
git remote remove origin

# Add remote with token
git remote add origin https://YOUR_TOKEN@github.com/pachaladeepthi246-design/flightbooking.git

# Push
git push -u origin main
```

#### Option B: Using SSH (Alternative)

1. **Generate SSH Key** (if you don't have one):
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

2. **Add SSH Key to GitHub**:
   - Copy key: `cat ~/.ssh/id_ed25519.pub`
   - Go to: https://github.com/settings/keys
   - Click "New SSH key"
   - Paste and save

3. **Push with SSH**:
```bash
cd /Users/mac/antigravity_project01/project01/booking-platform

# Remove old remote
git remote remove origin

# Add SSH remote
git remote add origin git@github.com:pachaladeepthi246-design/flightbooking.git

# Push
git push -u origin main
```

---

### Step 2: Deploy to Vercel

Once code is pushed to GitHub:

1. **Go to Vercel**:
   - Visit: https://vercel.com/new
   - Sign in with GitHub

2. **Import Repository**:
   - Click "Import Git Repository"
   - Select: `pachaladeepthi246-design/flightbooking`
   - Click "Import"

3. **Configure Project**:
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Add Environment Variables**:

Click "Environment Variables" and add these:

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/database

# NextAuth
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Google APIs
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-maps-key
GOOGLE_PLACES_API_KEY=your-places-key

# Razorpay
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your-razorpay-key-id

# Email
RESEND_API_KEY=your-resend-api-key
EMAIL_FROM=BookingHub <noreply@yourdomain.com>
```

5. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes for build
   - Get your deployment URL!

---

### Step 3: Set Up Database

1. **Create PostgreSQL Database**:

   **Option A: Vercel Postgres** (Easiest)
   - Go to Vercel Dashboard → Storage → Create Database
   - Select PostgreSQL
   - Copy connection string
   - Add to environment variables

   **Option B: Supabase** (Free tier)
   - Go to: https://supabase.com
   - Create new project
   - Get connection string from Settings → Database
   - Add to environment variables

2. **Run Migrations**:
```bash
# Install Vercel CLI
npm i -g vercel

# Pull environment variables
vercel env pull

# Run migrations
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate
```

---

### Step 4: Test Deployment

1. Visit your Vercel URL
2. Test these features:
   - Homepage loads
   - Search pages work
   - Login/Signup (after adding NextAuth secret)
   - API health check: `/api/health`

---

## 🔑 Quick Commands Reference

### Generate Secrets

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Generate JWT_SECRET
openssl rand -base64 32
```

### Database Commands

```bash
# Run migrations
npx prisma migrate deploy

# Open Prisma Studio
npx prisma studio

# Reset database (dev only)
npx prisma migrate reset
```

### Vercel Commands

```bash
# Deploy to production
vercel --prod

# View logs
vercel logs

# List deployments
vercel ls
```

---

## 📍 Your URLs

After deployment, you'll have:

- **GitHub**: https://github.com/pachaladeepthi246-design/flightbooking
- **Vercel**: https://flightbooking-xxx.vercel.app (after deployment)
- **Custom Domain**: (optional, configure in Vercel)

---

## ✅ Deployment Checklist

- [ ] Push code to GitHub (using token or SSH)
- [ ] Import repository to Vercel
- [ ] Add all environment variables
- [ ] Deploy to production
- [ ] Set up PostgreSQL database
- [ ] Run Prisma migrations
- [ ] Test all features
- [ ] Configure custom domain (optional)
- [ ] Enable monitoring (Sentry)

---

## 🆘 Troubleshooting

### Build Fails
- Check environment variables are set
- Verify DATABASE_URL is correct
- Check build logs in Vercel

### Database Connection Error
- Verify DATABASE_URL format
- Check database is accessible
- Run migrations: `npx prisma migrate deploy`

### Authentication Not Working
- Verify NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches your domain
- Verify OAuth credentials

---

## 🎊 Next Steps After Deployment

1. Get API keys (Google, Razorpay, Resend)
2. Test all booking flows
3. Add custom domain
4. Enable monitoring
5. Start marketing!

---

**Need help? All documentation is in the repository!**

- README.md - Getting started
- DEPLOYMENT.md - Detailed deployment guide
- PRODUCTION_DEPLOY.md - Production setup
- .env.example - All environment variables

🚀 **Happy deploying!**
