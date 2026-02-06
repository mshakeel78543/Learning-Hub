# Vercel Deployment Guide - Complete Tutorial 🚀

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Prepare for Deployment](#prepare-for-deployment)
3. [Deploy via GitHub](#deploy-via-github)
4. [Deploy via Vercel CLI](#deploy-via-vercel-cli)
5. [Environment Variables](#environment-variables)
6. [Custom Domain](#custom-domain)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### What You Need:
- ✅ GitHub account
- ✅ Vercel account (free)
- ✅ Next.js project ready
- ✅ Git installed

### Create Accounts (Free):
1. **GitHub**: https://github.com/signup
2. **Vercel**: https://vercel.com/signup

---

## Prepare for Deployment

### 1. Clean Up Project

**Remove unnecessary files:**
```bash
# Delete node_modules (will be installed on Vercel)
Remove-Item -Recurse -Force node_modules

# Delete .next cache
Remove-Item -Recurse -Force .next
```

### 2. Verify package.json

```json
{
  "name": "api-hacking-learning-platform",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@emotion/react": "^11.11.3",
    "@emotion/styled": "^11.11.0",
    "@monaco-editor/react": "^4.6.0",
    "@mui/icons-material": "^5.15.10",
    "@mui/material": "^5.15.10",
    "axios": "^1.6.7",
    "next": "^14.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/node": "^20.11.19",
    "@types/react": "^18.2.55",
    "@types/react-dom": "^18.2.19",
    "eslint": "^8.56.0",
    "eslint-config-next": "^14.1.0",
    "typescript": "^5.3.3"
  }
}
```

### 3. Test Build Locally

```powershell
# Test if build works
npm run build

# If successful, you'll see:
# ✓ Compiled successfully
# ✓ Collecting page data
# ✓ Generating static pages
```

**Fix build errors before deploying!**

### 4. Create .gitignore

```bash
# .gitignore
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

---

## Deploy via GitHub (Recommended) 🎯

### Step 1: Initialize Git

```powershell
# Navigate to project
cd "C:\Program Files\USPTO Trademark Scraper\New Data\API Hacking"

# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: API Security Learning Platform"
```

### Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `api-security-platform` (or your choice)
3. Description: "API Security Learning Platform with Next.js"
4. Set to **Public** or **Private**
5. **Don't** initialize with README (already have one)
6. Click **Create repository**

### Step 3: Push to GitHub

```powershell
# Add remote origin (replace with YOUR username)
git remote add origin https://github.com/YOUR_USERNAME/api-security-platform.git

# Push code
git branch -M main
git push -u origin main
```

**Enter GitHub credentials when prompted**

### Step 4: Deploy on Vercel

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. **Import Git Repository**:
   - Click **"Import"** next to your repository
4. **Configure Project**:
   ```
   Framework Preset: Next.js
   Root Directory: ./
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```
5. **Environment Variables** (if needed):
   - Add any environment variables
   - Example: `NEXT_PUBLIC_API_URL`
6. Click **"Deploy"**

### Step 5: Wait for Deployment

```
Building...
▲ Vercel
⏳ Building... [====>   ] 45%
✓ Build completed in 2m 15s
✓ Deployed successfully!

🎉 Your site is live at:
https://your-project-name.vercel.app
```

---

## Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```powershell
# Install globally
npm install -g vercel
```

### Step 2: Login to Vercel

```powershell
# Login
vercel login

# Enter your email
# Check email for verification link
```

### Step 3: Deploy

```powershell
# Navigate to project
cd "C:\Program Files\USPTO Trademark Scraper\New Data\API Hacking"

# Deploy (first time)
vercel

# Follow prompts:
# ? Set up and deploy "..."? [Y/n] Y
# ? Which scope? Your Name
# ? Link to existing project? [y/N] N
# ? What's your project's name? api-security-platform
# ? In which directory is your code located? ./

# Deployment starts...
# ✓ Production: https://api-security-platform.vercel.app
```

### Step 4: Production Deployment

```powershell
# Deploy to production
vercel --prod
```

---

## Environment Variables

### 1. Create .env.local (Local Development)

```bash
# .env.local (Don't commit this!)
NEXT_PUBLIC_API_URL=http://localhost:3000
DATABASE_URL=postgresql://...
SECRET_KEY=your_secret_here
```

### 2. Add to Vercel Dashboard

1. Go to **Project Settings**
2. Click **Environment Variables**
3. Add variables:
   ```
   Key: NEXT_PUBLIC_API_URL
   Value: https://api.example.com
   Environment: Production, Preview, Development
   ```
4. Click **Save**

### 3. Access in Code

```typescript
// Client-side (must start with NEXT_PUBLIC_)
const apiUrl = process.env.NEXT_PUBLIC_API_URL

// Server-side only (API routes, Server Components)
const dbUrl = process.env.DATABASE_URL
```

---

## Custom Domain

### Step 1: Purchase Domain

- Namecheap: https://www.namecheap.com
- GoDaddy: https://www.godaddy.com
- Google Domains: https://domains.google

### Step 2: Add Domain to Vercel

1. Go to **Project Settings** → **Domains**
2. Click **Add**
3. Enter your domain: `yourdomain.com`
4. Click **Add**

### Step 3: Configure DNS

**Vercel provides DNS records:**

**Option A: Use Vercel Nameservers (Recommended)**
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

**Option B: Add A Record**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

**Add CNAME for www:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### Step 4: Wait for Propagation

- DNS changes take 24-48 hours
- Check status in Vercel dashboard
- When ready: ✓ Valid Configuration

---

## Automatic Deployments

### How it Works:

1. **Push to GitHub**:
   ```powershell
   git add .
   git commit -m "Update feature"
   git push origin main
   ```

2. **Vercel Auto-Deploys**:
   - Detects push
   - Builds project
   - Deploys automatically
   - Updates live site

3. **Preview Deployments**:
   ```powershell
   # Create feature branch
   git checkout -b feature/new-feature
   
   # Make changes
   git add .
   git commit -m "Add new feature"
   git push origin feature/new-feature
   
   # Vercel creates preview URL
   # https://your-project-git-feature-new-feature.vercel.app
   ```

---

## Project Settings on Vercel

### Build & Development Settings

```
Framework: Next.js
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Development Command: npm run dev
```

### Advanced Settings

**Node.js Version:**
```
18.x (Recommended)
```

**Environment Variables:**
```
NEXT_PUBLIC_API_URL
DATABASE_URL
SECRET_KEY
```

**Custom Build Command (if needed):**
```bash
npm install && npm run build
```

---

## Performance & Optimization

### 1. Edge Functions

```typescript
// app/api/hello/route.ts
export const runtime = 'edge' // Deploy to edge

export async function GET() {
  return new Response('Hello from Edge!')
}
```

### 2. ISR (Incremental Static Regeneration)

```typescript
// app/blog/[slug]/page.tsx
export const revalidate = 3600 // Revalidate every hour

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await fetchPost(params.slug)
  return <div>{post.title}</div>
}
```

### 3. Image Optimization

```typescript
import Image from 'next/image'

// Automatically optimized by Vercel
<Image 
  src="/hero.jpg" 
  width={1200} 
  height={600} 
  alt="Hero"
/>
```

---

## Monitoring & Analytics

### 1. Vercel Analytics

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### 2. Real-time Logs

1. Go to **Vercel Dashboard**
2. Select your project
3. Click **Functions** or **Edge Functions**
4. View real-time logs

---

## Troubleshooting

### Error: Build Failed

**Issue**: Build command failed
```
Error: Command "npm run build" exited with 1
```

**Solution**:
```powershell
# Test build locally first
npm run build

# Fix any TypeScript errors
npm run lint

# Check package.json scripts
```

---

### Error: Module Not Found

**Issue**: Cannot find module
```
Error: Cannot find module '@/components/Header'
```

**Solution**:
```json
// Check tsconfig.json paths
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

### Error: Environment Variables Not Working

**Issue**: `process.env.VARIABLE` is undefined

**Solution**:
1. Add `NEXT_PUBLIC_` prefix for client-side variables
2. Redeploy after adding env vars in Vercel
3. Check variable names (case-sensitive)

---

### Error: 404 on API Routes

**Issue**: API routes return 404

**Solution**:
```
Ensure file structure:
app/
└── api/
    └── users/
        └── route.ts  ✓ Correct

Not:
app/
└── api/
    └── users.ts  ✗ Wrong
```

---

### Slow Build Times

**Solution**:
```json
// next.config.js
module.exports = {
  experimental: {
    optimizeCss: true,
  },
  swcMinify: true, // Use SWC for faster minification
}
```

---

## Rollback Deployment

### Via Dashboard:
1. Go to **Deployments**
2. Find previous successful deployment
3. Click **···** → **Promote to Production**

### Via CLI:
```powershell
# List deployments
vercel ls

# Rollback to specific deployment
vercel rollback [deployment-url]
```

---

## Team Collaboration

### Invite Team Members:

1. Go to **Project Settings** → **Members**
2. Click **Invite**
3. Enter email address
4. Select role:
   - **Viewer**: Read-only access
   - **Developer**: Deploy & configure
   - **Owner**: Full access

---

## Cost & Limits (Free Tier)

### Vercel Free Tier Includes:
- ✅ Unlimited personal projects
- ✅ 100 GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ 100 deployments/day
- ✅ Preview deployments
- ✅ Analytics (basic)

### Pro Tier ($20/month):
- ✅ Team collaboration
- ✅ 1 TB bandwidth
- ✅ Advanced analytics
- ✅ Password protection
- ✅ Custom deployment retention

---

## Best Practices

### 1. Branch Strategy
```
main → Production deployment
develop → Preview deployment
feature/* → Preview deployments
```

### 2. Commit Messages
```bash
git commit -m "feat: add user authentication"
git commit -m "fix: resolve API timeout issue"
git commit -m "docs: update README"
```

### 3. Testing Before Deploy
```powershell
# Always test locally
npm run build
npm start

# Check for errors
npm run lint
```

### 4. Secure Environment Variables
- Never commit `.env` files
- Use different values for dev/prod
- Rotate secrets regularly

---

## Deployment Checklist ✅

Before deploying:
- [ ] Test build locally (`npm run build`)
- [ ] Fix all TypeScript errors
- [ ] Fix all linter errors
- [ ] Test all features work
- [ ] Add environment variables to Vercel
- [ ] Update README with deployment URL
- [ ] Configure custom domain (if needed)
- [ ] Set up analytics (optional)
- [ ] Test deployed site thoroughly

---

## Quick Commands Reference

```powershell
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs [deployment-url]

# List deployments
vercel ls

# Remove deployment
vercel rm [deployment-name]

# Pull environment variables
vercel env pull

# Link project
vercel link
```

---

## Resources

### Official Documentation:
- **Vercel Docs**: https://vercel.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Vercel CLI**: https://vercel.com/docs/cli

### Support:
- **Vercel Community**: https://github.com/vercel/vercel/discussions
- **Next.js Discord**: https://nextjs.org/discord

---

## Success! 🎉

Your Next.js app is now deployed on Vercel!

**Your URLs:**
- Production: `https://your-project.vercel.app`
- Preview: `https://your-project-git-branch.vercel.app`

**Next Steps:**
1. Share your deployment URL
2. Set up custom domain
3. Monitor analytics
4. Continue developing!

---

*Last Updated: February 2026*
*Vercel Platform: Latest*
