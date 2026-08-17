# Supabase Setup Instructions

This guide will walk you through setting up Supabase for persistent project storage.

## Why Supabase?

- ✅ You're already familiar with it
- ✅ Full PostgreSQL database (more powerful than KV)
- ✅ Better for complex queries and relationships
- ✅ Generous free tier (500 MB database, 2 GB bandwidth)
- ✅ Easy to scale as your project grows

## Step-by-Step Setup

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click **"New Project"**
4. Fill in the details:
   - **Name**: `g3-projects` (or any name you prefer)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free tier is perfect to start
5. Click **"Create new project"**
6. Wait 1-2 minutes for provisioning

### 2. Create the Projects Table

Once your project is ready:

1. Go to **"Table Editor"** in the left sidebar
2. Click **"New Table"**
3. Name it: `projects`
4. Click **"Save"**

### 3. Add Columns to the Table

Click **"Add Column"** for each of these:

| Column Name | Type | Default | Nullable | Description |
|------------|------|---------|----------|-------------|
| `id` | `int8` | - | ❌ | Primary Key (check "Is Primary Key") |
| `title` | `text` | - | ❌ | Project title |
| `category` | `text` | - | ❌ | Residential or Commercial |
| `type` | `text` | - | ❌ | Project type |
| `image` | `text` | - | ❌ | Image URL |
| `description` | `text` | - | ❌ | Short description |
| `overview` | `text` | - | ✅ | Detailed overview |
| `client` | `text` | - | ❌ | Client name |
| `location` | `text` | - | ❌ | Location |
| `services` | `jsonb` | `[]` | ❌ | Array of services |
| `challenges` | `text` | - | ❌ | Project challenges |
| `size` | `text` | - | ❌ | small, medium, or large |
| `slug` | `text` | - | ✅ | URL slug |
| `seoTitle` | `text` | - | ✅ | SEO title tag |
| `metaDescription` | `text` | - | ✅ | Meta description |

**Important Settings:**
- Set `id` as Primary Key
- Make `id` auto-increment (in column settings, enable "Is Identity")
- For `services`, set the default value to `[]` (empty JSON array)

### 4. Get Your API Keys

1. Go to **"Settings"** (gear icon) → **"API"**
2. You'll see:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (starts with `eyJ...`)

### 5. Add Environment Variables to Vercel

1. Go to your Vercel project dashboard
2. Go to **Settings** → **Environment Variables**
3. Add these two variables:

   **Variable 1:**
   - **Name**: `NEXT_PUBLIC_SUPABASE_URL`
   - **Value**: Your Project URL from Supabase
   - **Environments**: ✅ Production, ✅ Preview, ✅ Development

   **Variable 2:**
   - **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value**: Your `anon public` key from Supabase
   - **Environments**: ✅ Production, ✅ Preview, ✅ Development

4. Click **"Save"** for each variable

### 6. Set Up Row Level Security (RLS)

For security, we need to allow public read access but restrict writes:

1. In Supabase, go to **"Authentication"** → **"Policies"**
2. Click on the `projects` table
3. Click **"New Policy"**
4. Create a policy for **SELECT** (read):
   - **Policy Name**: `Allow public read access`
   - **Allowed Operation**: `SELECT`
   - **Policy Definition**: `true` (allows everyone to read)
   - Click **"Save"**

5. For writes (INSERT, UPDATE, DELETE), you can either:
   - **Option A**: Allow public writes (simpler, but less secure)
     - Create policies with `true` for INSERT, UPDATE, DELETE
   - **Option B**: Use service role key (more secure, recommended)
     - Keep RLS enabled
     - Use service role key in API routes (server-side only)

### 7. Initialize Default Projects (Optional)

The code will automatically initialize default projects when the table is empty. But if you want to do it manually:

1. Go to **"Table Editor"** → `projects` table
2. Click **"Insert"** → **"Insert row"**
3. Copy the default projects from `src/data/projects.ts`
4. Paste them one by one, or use the SQL editor to bulk insert

### 8. Redeploy Your Application

After adding environment variables:

```bash
npm run deploy
```

Or push to git to trigger a new deployment.

## Testing

1. Go to your admin panel
2. Edit a project
3. Check Supabase **"Table Editor"** → `projects` table
4. You should see your changes!

## Security Best Practices

### Option 1: Public Read, Authenticated Write (Recommended)

1. Keep RLS enabled
2. Allow public SELECT (read)
3. For writes, use the **service role key** in your API routes:
   - Add `SUPABASE_SERVICE_ROLE_KEY` to Vercel environment variables
   - Update `src/lib/supabase.ts` to use service role for server-side operations

### Option 2: Public Read and Write (Simpler, Less Secure)

- Allow public access to all operations
- Good for development, but consider securing writes in production

## Troubleshooting

### "Supabase not initialized" error

- Check that environment variables are set in Vercel
- Make sure variable names are exactly: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Redeploy after adding variables

### "relation 'projects' does not exist"

- Make sure you created the `projects` table in Supabase
- Check the table name matches `PROJECTS_TABLE` in the code

### "permission denied for table projects"

- Check your RLS policies
- Make sure SELECT is allowed for public/anonymous users
- For writes, either allow public writes or use service role key

### Data not persisting

- Check Supabase dashboard → Table Editor to see if data is being saved
- Check Vercel logs for errors
- Verify environment variables are set correctly

## Next Steps

Once set up, your projects will:
- ✅ Persist across all users and devices
- ✅ Be accessible from anywhere
- ✅ Scale easily as you grow
- ✅ Allow complex queries if needed later

## Migration from localStorage

If you have existing projects in localStorage:
1. Export them from browser DevTools → Application → Local Storage
2. Import them into Supabase using the Table Editor or SQL editor
