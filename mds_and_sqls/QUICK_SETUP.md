# Quick Setup Guide for Persistent Storage

Follow these steps to enable persistent storage with Supabase:

## Step 1: Run SQL Script in Supabase (2 minutes)

1. Go to your Supabase project: [supabase.com](https://supabase.com)
2. Click **"SQL Editor"** in the left sidebar
3. Click **"New Query"**
4. Open `supabase-setup-complete.sql` from this project
5. Copy all contents (Cmd+A, Cmd+C)
6. Paste into Supabase SQL Editor (Cmd+V)
7. Click **"Run"** button

✅ **Verify:** Go to "Table Editor" → "projects" - you should see 15 projects

## Step 2: Get Your Supabase Credentials (1 minute)

1. In Supabase, go to **Settings** (gear icon) → **API**
2. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

## Step 3: Add Environment Variables to Vercel (2 minutes)

1. Go to [vercel.com](https://vercel.com) → Your Project
2. Go to **Settings** → **Environment Variables**
3. Add **Variable 1:**
   - **Name:** `NEXT_PUBLIC_SUPABASE_URL`
   - **Value:** Your Supabase Project URL
   - **Environments:** ✅ Production, ✅ Preview, ✅ Development
   - Click **"Save"**

4. Add **Variable 2:**
   - **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value:** Your Supabase anon public key
   - **Environments:** ✅ Production, ✅ Preview, ✅ Development
   - Click **"Save"**

## Step 4: Deploy (1 minute)

```bash
npm run deploy
```

Or push to git if auto-deploy is enabled.

## Step 5: Verify It Works

1. Go to your live site
2. Log into admin panel
3. Edit a project
4. Refresh the page - changes should persist!
5. Check Supabase Table Editor - you should see your changes

## Troubleshooting

### "Supabase not initialized" error?
- Environment variables not set in Vercel
- Make sure variable names are EXACTLY: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Redeploy after adding variables

### Changes not saving?
- Check Supabase RLS policies (should allow public read/write)
- Check Vercel function logs for errors
- Verify the `projects` table exists in Supabase

### Need help?
- Check `SUPABASE_SETUP.md` for detailed instructions
- Check Vercel deployment logs
- Check Supabase logs in the dashboard

## Quick Verification

After setup, you can verify everything is configured:

```bash
npm run verify-setup
```

This will check if your environment variables are set (works locally with `.env.local` file).
