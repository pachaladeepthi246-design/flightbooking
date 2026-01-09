# 🚀 Deployment Guide - BookingHub Platform

## Quick Deploy to Vercel (5 minutes)

### Step 1: Prepare for Deployment

```bash
# Make sure everything is committed
cd /Users/mac/antigravity_project01/project01/booking-platform
git init
git add .
git commit -m "Initial commit - BookingHub platform"
```

### Step 2: Create GitHub Repository

```bash
# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/booking-platform.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `.next`

5. Add Environment Variables:
```env
DATABASE_URL=your-postgresql-url
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-secret-key-min-32-chars
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-key
GOOGLE_PLACES_API_KEY=your-key
RAZORPAY_KEY_ID=your-key
RAZORPAY_KEY_SECRET=your-secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your-key
```

6. Click "Deploy"

### Step 4: Set Up Production Database

#### Option A: Vercel Postgres (Easiest)

```bash
# Install Vercel CLI
npm i -g vercel

# Link project
vercel link

# Create Postgres database
vercel postgres create

# Get connection string
vercel env pull .env.production
```

#### Option B: Supabase (Free Tier)

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Get connection string from Settings → Database
4. Add to Vercel environment variables

#### Option C: Railway (Free Tier)

1. Go to [railway.app](https://railway.app)
2. Create new PostgreSQL database
3. Copy connection string
4. Add to Vercel environment variables

### Step 5: Run Database Migrations

```bash
# Update schema for PostgreSQL
# Edit prisma/schema.prisma:
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

# Generate and push
npx prisma generate
npx prisma db push

# Or create migration
npx prisma migrate deploy
```

### Step 6: Verify Deployment

1. Visit your Vercel URL
2. Test homepage loading
3. Test hotel search
4. Test vendor dashboard
5. Check database connection

---

## Alternative: Deploy to AWS

### Prerequisites
- AWS Account
- AWS CLI installed
- Docker installed

### Step 1: Containerize Application

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Step 2: Deploy to AWS ECS

```bash
# Build and push to ECR
aws ecr create-repository --repository-name booking-platform
docker build -t booking-platform .
docker tag booking-platform:latest YOUR_ECR_URL/booking-platform:latest
docker push YOUR_ECR_URL/booking-platform:latest

# Create ECS cluster and service
aws ecs create-cluster --cluster-name booking-platform-cluster
# ... (follow AWS ECS documentation)
```

---

## Alternative: Deploy to DigitalOcean

### Step 1: Create Droplet

1. Go to DigitalOcean
2. Create Ubuntu 22.04 droplet
3. SSH into droplet

### Step 2: Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y
```

### Step 3: Deploy Application

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/booking-platform.git
cd booking-platform

# Install dependencies
npm install --legacy-peer-deps

# Set up environment
cp .env.example .env.local
nano .env.local  # Edit with your values

# Build application
npm run build

# Start with PM2
pm2 start npm --name "booking-platform" -- start
pm2 save
pm2 startup
```

### Step 4: Configure Nginx

```bash
# Install Nginx
sudo apt install nginx -y

# Create config
sudo nano /etc/nginx/sites-available/booking-platform
```

Add:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/booking-platform /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Install SSL with Let's Encrypt
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com
```

---

## Environment Variables Checklist

### Required for Production

- [x] `DATABASE_URL` - PostgreSQL connection string
- [x] `NEXTAUTH_URL` - Your production URL
- [x] `NEXTAUTH_SECRET` - Random 32+ character string

### Optional but Recommended

- [ ] `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - For maps
- [ ] `GOOGLE_PLACES_API_KEY` - For hotel search
- [ ] `RAZORPAY_KEY_ID` - For payments
- [ ] `RAZORPAY_KEY_SECRET` - For payments
- [ ] `RESEND_API_KEY` - For emails

### Generate Secrets

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Verify database connection
- [ ] Test hotel search functionality
- [ ] Test vendor dashboard
- [ ] Configure custom domain
- [ ] Set up SSL certificate
- [ ] Configure email notifications
- [ ] Set up monitoring (Sentry)
- [ ] Configure analytics
- [ ] Test payment gateway
- [ ] Set up automated backups
- [ ] Configure CDN for images
- [ ] Test mobile responsiveness
- [ ] Set up staging environment
- [ ] Configure CI/CD pipeline

---

## Monitoring & Maintenance

### Set Up Monitoring

1. **Vercel Analytics** (Built-in)
   - Automatically enabled
   - View in Vercel dashboard

2. **Sentry** (Error Tracking)
```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

3. **Uptime Monitoring**
   - Use UptimeRobot or Pingdom
   - Monitor https://your-domain.com

### Database Backups

```bash
# Automated daily backups
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql

# Restore from backup
psql $DATABASE_URL < backup-20260109.sql
```

### Performance Optimization

1. Enable caching in `next.config.js`
2. Optimize images with Next.js Image
3. Use CDN for static assets
4. Enable compression
5. Monitor Core Web Vitals

---

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install --legacy-peer-deps
npm run build
```

### Database Connection Issues

```bash
# Test connection
npx prisma db pull

# Reset database
npx prisma migrate reset
```

### Environment Variables Not Loading

```bash
# Verify in Vercel dashboard
vercel env ls

# Pull latest
vercel env pull
```

---

## Cost Estimation

### Vercel + Vercel Postgres
- **Hobby**: Free (limited)
- **Pro**: $20/month + database costs
- **Estimated**: $30-50/month for small scale

### AWS
- **EC2 t3.small**: $15/month
- **RDS PostgreSQL**: $15/month
- **Load Balancer**: $20/month
- **Estimated**: $50-100/month

### DigitalOcean
- **Droplet (2GB)**: $12/month
- **Managed Database**: $15/month
- **Estimated**: $30-40/month

---

## Support

For deployment issues:
1. Check Vercel deployment logs
2. Review database connection
3. Verify environment variables
4. Check application logs
5. Contact support if needed

**Happy Deploying! 🚀**
