# Production Deployment Guide

## 🚀 Quick Start

This guide will help you deploy BookingHub to production in under 30 minutes.

---

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database (Supabase/AWS RDS/DigitalOcean)
- Domain name (optional but recommended)
- API keys (Google, Razorpay, Resend)

---

## Option 1: Deploy to Vercel (Recommended - Easiest)

### Step 1: Prepare Your Repository

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"

# Push to GitHub
git remote add origin https://github.com/yourusername/bookinghub.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Select your GitHub repository
4. Configure environment variables (see below)
5. Click "Deploy"

### Step 3: Configure Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/database

# NextAuth
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-secret-32-chars-min

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Google APIs
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-maps-key
GOOGLE_PLACES_API_KEY=your-places-key

# Razorpay
RAZORPAY_KEY_ID=your-key-id
RAZORPAY_KEY_SECRET=your-key-secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your-key-id

# Email
RESEND_API_KEY=your-resend-key
EMAIL_FROM=BookingHub <noreply@yourdomain.com>
```

### Step 4: Run Database Migrations

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Run migrations
vercel env pull .env.local
npx prisma migrate deploy
```

### Step 5: Configure Domain

1. Go to Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for SSL certificate (automatic)

---

## Option 2: Deploy to AWS

### Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Route 53  │────▶│  CloudFront  │────▶│   EC2/ECS   │
│   (DNS)     │     │    (CDN)     │     │   (App)     │
└─────────────┘     └──────────────┘     └─────────────┘
                                                │
                                                ▼
                                         ┌─────────────┐
                                         │   RDS       │
                                         │ (PostgreSQL)│
                                         └─────────────┘
```

### Step 1: Set Up RDS Database

```bash
# Create PostgreSQL database
aws rds create-db-instance \
  --db-instance-identifier bookinghub-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username admin \
  --master-user-password your-password \
  --allocated-storage 20
```

### Step 2: Deploy with Docker

```bash
# Build Docker image
docker build -t bookinghub .

# Tag for ECR
docker tag bookinghub:latest your-account.dkr.ecr.region.amazonaws.com/bookinghub:latest

# Push to ECR
docker push your-account.dkr.ecr.region.amazonaws.com/bookinghub:latest

# Deploy to ECS
aws ecs create-service \
  --cluster bookinghub-cluster \
  --service-name bookinghub-service \
  --task-definition bookinghub-task \
  --desired-count 2
```

### Step 3: Configure Load Balancer

```bash
# Create Application Load Balancer
aws elbv2 create-load-balancer \
  --name bookinghub-alb \
  --subnets subnet-xxx subnet-yyy \
  --security-groups sg-xxx

# Create target group
aws elbv2 create-target-group \
  --name bookinghub-targets \
  --protocol HTTP \
  --port 3000 \
  --vpc-id vpc-xxx
```

---

## Option 3: Deploy to DigitalOcean

### Step 1: Create Droplet

```bash
# Using doctl CLI
doctl compute droplet create bookinghub \
  --size s-2vcpu-4gb \
  --image ubuntu-22-04-x64 \
  --region blr1 \
  --ssh-keys your-ssh-key-id
```

### Step 2: Install Dependencies

```bash
# SSH into droplet
ssh root@your-droplet-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Install PM2
npm install -g pm2

# Install Nginx
apt-get install -y nginx
```

### Step 3: Deploy Application

```bash
# Clone repository
git clone https://github.com/yourusername/bookinghub.git
cd bookinghub

# Install dependencies
npm install

# Build application
npm run build

# Start with PM2
pm2 start npm --name "bookinghub" -- start
pm2 save
pm2 startup
```

### Step 4: Configure Nginx

```nginx
server {
    listen 80;
    server_name yourdomain.com;

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

### Step 5: SSL with Let's Encrypt

```bash
# Install Certbot
apt-get install -y certbot python3-certbot-nginx

# Get SSL certificate
certbot --nginx -d yourdomain.com

# Auto-renewal
certbot renew --dry-run
```

---

## Database Migration

### From SQLite to PostgreSQL

```bash
# 1. Export data from SQLite
npx prisma db push

# 2. Update DATABASE_URL to PostgreSQL
DATABASE_URL="postgresql://user:password@host:5432/database"

# 3. Run migrations
npx prisma migrate deploy

# 4. Seed database (if needed)
npx prisma db seed
```

---

## Post-Deployment Checklist

### Essential

- [ ] Database migrations completed
- [ ] Environment variables configured
- [ ] SSL certificate installed
- [ ] Domain DNS configured
- [ ] Health check endpoint working
- [ ] Payment gateway tested
- [ ] Email notifications working

### Security

- [ ] HTTPS enforced
- [ ] Security headers configured
- [ ] Rate limiting enabled
- [ ] CORS configured
- [ ] API keys rotated
- [ ] Database backups enabled

### Monitoring

- [ ] Error tracking (Sentry) configured
- [ ] Analytics (Google Analytics) installed
- [ ] Uptime monitoring enabled
- [ ] Log aggregation configured
- [ ] Performance monitoring active

### Performance

- [ ] CDN configured
- [ ] Image optimization enabled
- [ ] Caching strategy implemented
- [ ] Database indexes created
- [ ] API response times < 500ms

---

## Monitoring & Maintenance

### Health Check Endpoint

Create `/api/health/route.ts`:

```typescript
export async function GET() {
  return Response.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
}
```

### Database Backups

```bash
# Automated daily backups
0 2 * * * pg_dump -h localhost -U postgres bookinghub > /backups/bookinghub-$(date +\%Y\%m\%d).sql
```

### Log Rotation

```bash
# PM2 log rotation
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

---

## Scaling

### Horizontal Scaling

```bash
# Increase PM2 instances
pm2 scale bookinghub 4

# Or use cluster mode
pm2 start npm --name "bookinghub" -i max -- start
```

### Database Scaling

- Enable read replicas
- Implement connection pooling
- Add Redis caching layer
- Optimize slow queries

---

## Troubleshooting

### Common Issues

**Build Fails**
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

**Database Connection Error**
```bash
# Test connection
npx prisma db pull

# Check connection string
echo $DATABASE_URL
```

**502 Bad Gateway**
```bash
# Check if app is running
pm2 status

# Restart app
pm2 restart bookinghub
```

---

## Support

For deployment issues:
- Check logs: `pm2 logs bookinghub`
- Monitor errors: Sentry dashboard
- Database status: `npx prisma studio`

---

**Deployment Time: 15-30 minutes**
**Difficulty: Easy (Vercel) to Medium (AWS)**
