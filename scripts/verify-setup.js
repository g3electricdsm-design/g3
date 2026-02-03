#!/usr/bin/env node

/**
 * Setup Verification Script
 * Checks if Supabase is properly configured
 */

const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY'
];

console.log('🔍 Checking Supabase Configuration...\n');

let allSet = true;

requiredEnvVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`✅ ${varName} is set`);
    // Show first/last few chars for security
    const preview = value.length > 20 
      ? `${value.substring(0, 10)}...${value.substring(value.length - 10)}`
      : '***';
    console.log(`   Preview: ${preview}`);
  } else {
    console.log(`❌ ${varName} is NOT set`);
    allSet = false;
  }
  console.log('');
});

if (allSet) {
  console.log('✅ All environment variables are set!');
  console.log('✅ Your app is ready for persistent storage with Supabase\n');
  console.log('Next steps:');
  console.log('1. Make sure you ran the SQL script in Supabase');
  console.log('2. Deploy your application');
  console.log('3. Test by editing a project in the admin panel\n');
} else {
  console.log('❌ Missing environment variables!\n');
  console.log('To set them up:');
  console.log('1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables');
  console.log('2. Add NEXT_PUBLIC_SUPABASE_URL (your Supabase project URL)');
  console.log('3. Add NEXT_PUBLIC_SUPABASE_ANON_KEY (your Supabase anon key)');
  console.log('4. Redeploy your application\n');
  console.log('See SUPABASE_SETUP.md for detailed instructions.\n');
}

process.exit(allSet ? 0 : 1);
