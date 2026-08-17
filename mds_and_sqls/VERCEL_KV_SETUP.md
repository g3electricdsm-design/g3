# Vercel KV Setup Instructions

This guide will walk you through setting up Vercel KV (Redis) for persistent project storage.

## What is Vercel KV?

Vercel KV is a Redis-compatible database that provides fast, persistent storage for your application. It's perfect for storing project data that needs to be shared across all users and devices.

## Step-by-Step Setup

### Method 1: Via Vercel Marketplace (Recommended)

1. **Go to Vercel Marketplace:**
   - Visit [vercel.com/marketplace](https://vercel.com/marketplace)
   - Or go to your Vercel dashboard → Your project → **"Integrations"** tab

2. **Find Upstash Redis:**
   - Search for "Upstash Redis" in the marketplace
   - Click on the Upstash Redis integration

3. **Install the Integration:**
   - Click **"Add Integration"** or **"Install"**
   - Select your project (g3)
   - Follow the setup wizard

4. **Create Database:**
   - The wizard will guide you to create a new Upstash Redis database
   - Choose a name (e.g., `g3-projects`)
   - Select a region closest to your users
   - Click **"Create"**

5. **Environment Variables:**
   - The integration automatically adds these environment variables:
     - `KV_REST_API_URL`
     - `KV_REST_API_TOKEN`
   - These are added automatically - no manual setup needed!

### Method 2: Via Vercel Dashboard Storage Tab

1. **Go to Your Vercel Dashboard:**
   - Visit [vercel.com](https://vercel.com) and log in
   - Navigate to your project (g3)
   - Click on your project to open it

2. **Navigate to Storage:**
   - Click on the **"Storage"** tab in the top navigation
   - If you don't see it, go to **"Settings"** → **"Storage"**

3. **Create a KV Database:**
   - Click **"Create Database"**
   - Select **"KV"** or **"Upstash Redis"**
   - Enter a name (e.g., `g3-projects`)
   - Choose a region
   - Click **"Create"**

### 4. Wait for Provisioning

- Vercel will provision your KV database (usually takes 1-2 minutes)
- You'll see a success message when it's ready

### 5. Environment Variables (Automatic)

Vercel automatically adds these environment variables to your project:
- `KV_REST_API_URL` - The URL to connect to your KV database
- `KV_REST_API_TOKEN` - The authentication token

**You don't need to manually add these** - Vercel does it automatically!

### 6. Verify Environment Variables

To verify the variables were added:
1. Go to **Settings** → **Environment Variables**
2. You should see:
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
3. Both should be available for **Production**, **Preview**, and **Development** environments

### 7. Redeploy Your Application

After the KV database is created, you need to redeploy:

**Option A: Via Vercel Dashboard**
1. Go to the **"Deployments"** tab
2. Click the **"..."** menu on your latest deployment
3. Click **"Redeploy"**

**Option B: Via Command Line**
```bash
npm run deploy
```

**Option C: Push to Git**
```bash
git commit --allow-empty -m "Trigger redeploy for KV"
git push
```

### 8. Test It Out

After redeployment:
1. Go to your admin panel
2. Edit a project
3. The changes should now persist across:
   - Different browsers
   - Different devices
   - Page refreshes
   - Different users

## Pricing

Vercel KV has a **free tier** that includes:
- 256 MB storage
- 10,000 requests per day
- Perfect for small to medium projects

For larger projects, paid plans start at $0.20/GB storage and $0.20 per 1M requests.

## Troubleshooting

### KV Not Working?

1. **Check Environment Variables:**
   - Go to Settings → Environment Variables
   - Verify `KV_REST_API_URL` and `KV_REST_API_TOKEN` exist
   - Make sure they're enabled for the right environments

2. **Check Deployment Logs:**
   - Go to Deployments → Click on latest deployment → View logs
   - Look for any errors related to KV connection

3. **Verify KV Database Status:**
   - Go to Storage tab
   - Make sure your KV database shows as "Active" or "Ready"

4. **Check Application Code:**
   - The code automatically detects KV if environment variables are set
   - If KV isn't configured, it falls back to in-memory storage (which won't persist)

### Still Having Issues?

- Check the Vercel KV documentation: https://vercel.com/docs/storage/vercel-kv
- Check your Vercel project logs for error messages
- Make sure you've redeployed after creating the KV database

## Alternative: Using a Different Database

If you prefer to use a different database (Supabase, MongoDB, PostgreSQL, etc.):

1. Update `src/lib/projects-storage.ts`
2. Implement the `ProjectsStorage` interface with your database client
3. Replace the storage export with your implementation

The API routes will automatically use your new storage implementation.
