# 🚀 G3 Electric Deployment Guide

## Quick Deploy Commands

### Option 1: Standard Deploy (with cache clear)
```bash
npm run deploy
```

### Option 2: Full Deploy with Cache Clearing
```bash
npm run deploy:clear-cache
```

### Option 3: Manual Deploy with Force
```bash
vercel --prod --force --yes
```

## 🔧 Cache Clearing Methods

### Method 1: Force Redeploy (Recommended)
```bash
# This forces a fresh build and clears cache
vercel --prod --force --yes
```

### Method 2: Vercel Dashboard
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Find project: `g3-1un3n97yo-njt-designs-projects`
3. Go to "Deployments" tab
4. Click "..." next to latest deployment
5. Select "Redeploy"

### Method 3: Cache Busting URLs
After deployment, visit these URLs to clear cache:
- `https://g3-sandy.vercel.app?v=$(date +%s)`
- `https://g3-sandy.vercel.app?cache_bust=$(date +%s)`

## 📋 Pre-Deploy Checklist

- [ ] Code is committed to GitHub
- [ ] Local development server works (`npm run dev`)
- [ ] No linting errors (`npm run lint`)
- [ ] Build succeeds (`npm run build`)

## 🎯 Post-Deploy Verification

1. **Check deployment URL**
2. **Test mobile menu** (should be dark background)
3. **Verify all pages load**
4. **Check for any console errors**

## 🚨 Troubleshooting

### If cache persists:
1. Wait 5-10 minutes for CDN propagation
2. Try incognito/private browsing
3. Clear browser cache
4. Use cache-busting URLs

### If deployment fails:
1. Check Vercel logs
2. Verify environment variables
3. Ensure all dependencies are installed
4. Check for build errors

## 📞 Support

If you encounter issues:
1. Check Vercel dashboard for error logs
2. Verify GitHub repository is up to date
3. Ensure Vercel CLI is authenticated
