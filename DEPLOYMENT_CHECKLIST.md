# Deployment Checklist

Before deploying, make sure you've completed these steps:

## ✅ Pre-Deployment Checklist

### 1. Supabase Setup
- [ ] Created Supabase project
- [ ] Ran the SQL script (`supabase-setup-complete.sql`) in Supabase SQL Editor
- [ ] Verified projects table exists with 15 default projects
- [ ] Got your Supabase URL and anon key from Settings → API

### 2. Vercel Environment Variables
- [ ] Added `NEXT_PUBLIC_SUPABASE_URL` to Vercel
  - Go to Vercel → Your Project → Settings → Environment Variables
  - Add the variable for Production, Preview, and Development
- [ ] Added `NEXT_PUBLIC_SUPABASE_ANON_KEY` to Vercel
  - Same location as above
  - Add for all environments

### 3. Code is Ready
- [x] All code changes committed
- [x] No linter errors
- [x] All imports are correct

## 🚀 Deployment Steps

1. **Commit all changes:**
   ```bash
   git add -A
   git commit -m "Add Supabase integration for persistent project storage"
   git push
   ```

2. **Deploy to Vercel:**
   ```bash
   npm run deploy
   ```
   
   OR push to your main branch (if auto-deploy is enabled)

3. **Verify deployment:**
   - Check Vercel deployment logs for any errors
   - Visit your live site
   - Test the admin panel - edit a project
   - Check if changes persist after refresh

## ⚠️ Important Notes

### If Environment Variables Are Missing:
- The app will fall back to in-memory storage
- Changes won't persist across deployments
- You'll see console warnings about Supabase not being configured

### If Supabase Table Doesn't Exist:
- The app will try to initialize with default projects
- But it's better to run the SQL script first

### Testing After Deployment:
1. Go to admin panel
2. Edit a project
3. Navigate away and come back
4. Changes should persist
5. Check Supabase Table Editor to verify data is being saved

## 🔍 Troubleshooting

### Projects not loading?
- Check browser console for errors
- Check Vercel function logs
- Verify environment variables are set correctly
- Check Supabase dashboard for connection issues

### Changes not persisting?
- Verify Supabase environment variables are set
- Check Supabase RLS policies allow writes
- Look at Vercel function logs for API errors
- Verify the projects table exists in Supabase

### Getting "Supabase not initialized"?
- Environment variables not set in Vercel
- Variable names must be exactly: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Redeploy after adding variables
