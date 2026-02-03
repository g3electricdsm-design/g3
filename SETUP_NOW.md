# Setup Persistent Storage - Step by Step

## ⚡ Quick Setup (5 minutes total)

### 1️⃣ Run SQL Script in Supabase (2 min)

**Copy this file:** `supabase-setup-complete.sql`

**Then:**
1. Go to [supabase.com](https://supabase.com) → Your Project
2. Click **"SQL Editor"** (left sidebar)
3. Click **"New Query"**
4. Paste the entire SQL script
5. Click **"Run"** (green button, bottom right)

✅ **Check:** Go to "Table Editor" → "projects" - should see 15 projects

---

### 2️⃣ Get Supabase Credentials (1 min)

1. In Supabase: **Settings** (⚙️) → **API**
2. Copy these:
   - **Project URL** → `https://xxxxx.supabase.co`
   - **anon public** key → `eyJ...` (long string)

---

### 3️⃣ Add to Vercel (2 min)

1. Go to [vercel.com](https://vercel.com) → Your Project
2. **Settings** → **Environment Variables**
3. Click **"Add New"**

   **First Variable:**
   - Key: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: (paste your Supabase URL)
   - ✅ Production, ✅ Preview, ✅ Development
   - **Save**

   **Second Variable:**
   - Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: (paste your anon key)
   - ✅ Production, ✅ Preview, ✅ Development
   - **Save**

---

### 4️⃣ Deploy

```bash
npm run deploy
```

Or just push to git if auto-deploy is enabled.

---

## ✅ Verify It Works

1. Visit your live site
2. Go to admin panel
3. Edit any project
4. Refresh page → changes should persist!
5. Check Supabase Table Editor → see your changes

---

## 🆘 Need Help?

- Detailed guide: `SUPABASE_SETUP.md`
- Troubleshooting: `DEPLOYMENT_CHECKLIST.md`
- Quick reference: `QUICK_SETUP.md`
