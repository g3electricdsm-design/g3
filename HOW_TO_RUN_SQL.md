# How to Run the SQL Script in Supabase

Follow these steps to set up your projects table in Supabase:

## Step 1: Open Supabase Dashboard

1. Go to [supabase.com](https://supabase.com)
2. Sign in to your account
3. Click on your project (the one you created for G3 Electric)

## Step 2: Open SQL Editor

1. In the left sidebar, look for **"SQL Editor"** (it has a database icon)
2. Click on **"SQL Editor"**
3. You'll see a code editor with a query box

## Step 3: Create a New Query

1. Click the **"New Query"** button (usually at the top left)
2. Or click in the empty query editor area

## Step 4: Copy the SQL Script

1. Open the file `supabase-setup-complete.sql` in your project
2. Select all the text (Cmd+A on Mac, Ctrl+A on Windows)
3. Copy it (Cmd+C on Mac, Ctrl+C on Windows)

## Step 5: Paste and Run

1. Paste the SQL script into the Supabase SQL Editor (Cmd+V or Ctrl+V)
2. Review the script to make sure it pasted correctly
3. Click the **"Run"** button (usually green, at the bottom right)
   - OR press **Cmd+Enter** (Mac) or **Ctrl+Enter** (Windows)

## Step 6: Wait for Execution

- The script will run and you'll see a success message
- It may take a few seconds to complete
- You should see: "Success. No rows returned" or similar

## Step 7: Verify It Worked

1. Go to **"Table Editor"** in the left sidebar
2. Click on the **"projects"** table
3. You should see 15 projects listed
4. Click on any project to see its details

## Troubleshooting

### If you get an error:

**Error: "relation 'projects' already exists"**
- The table already exists. You can either:
  - Drop it first: `DROP TABLE projects CASCADE;` then run the script again
  - Or just run the INSERT statements if you only need the data

**Error: "permission denied"**
- Make sure you're logged in as the project owner
- Check that you have the correct permissions

**Error: "syntax error"**
- Make sure you copied the entire script
- Check that there are no extra characters or formatting issues
- Try copying and pasting again

### Alternative: Run in Parts

If the full script fails, you can run it in sections:

1. **First, create the table** (lines 1-23)
2. **Then create indexes** (lines 25-29)
3. **Then set up RLS** (lines 31-52)
4. **Then create triggers** (lines 54-67)
5. **Finally, insert data** (lines 69-83)

## Quick Copy-Paste Method

The easiest way:

1. Open `supabase-setup-complete.sql` in your code editor
2. Select all (Cmd+A / Ctrl+A)
3. Copy (Cmd+C / Ctrl+C)
4. Go to Supabase → SQL Editor
5. Paste (Cmd+V / Ctrl+V)
6. Click "Run"

That's it! Your projects table will be created with all the default projects.
