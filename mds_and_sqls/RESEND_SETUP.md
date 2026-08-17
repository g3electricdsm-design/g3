# Resend Email Setup for G3 Electric Contact Form

## 🎯 What This Does
When someone submits the contact form on your website, an email will be sent to **njthrockmorton@gmail.com** with all the quote details.

## 📋 Setup Steps

### Step 1: Create a Resend Account
1. Go to https://resend.com
2. Sign up for a free account (100 emails/day free)
3. Verify your email address

### Step 2: Get Your API Key
1. Go to **API Keys** in the Resend dashboard
2. Click **Create API Key**
3. Name it: "G3 Electric Website"
4. Copy the API key (starts with `re_...`)

### Step 3: Add API Key to Vercel
1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Add a new variable:
   ```
   Name: RESEND_API_KEY
   Value: re_your_api_key_here
   ```
3. Select **Production**, **Preview**, and **Development**
4. Click **Save**

### Step 4: Verify Domain (Optional - for better deliverability)
1. In Resend dashboard, go to **Domains**
2. Add your domain: `g3electricdsm.com`
3. Follow DNS setup instructions
4. Once verified, update the `from` address in `/src/app/api/contact/route.ts`:
   ```typescript
   from: 'G3 Electric <quotes@g3electricdsm.com>'
   ```

## 🧪 Testing

### Test Locally:
1. Add to your `.env.local` file:
   ```
   RESEND_API_KEY=re_your_api_key_here
   ```
2. Restart your dev server
3. Submit a test contact form
4. Check **njthrockmorton@gmail.com** for the email

### Test in Production:
1. Deploy your changes to Vercel
2. Go to your live website
3. Submit a test contact form
4. Check **njthrockmorton@gmail.com**

## 📧 Email Format

You'll receive emails with:
- Customer name, email, phone
- Project type and description
- Budget and timeline
- Services needed
- Additional message
- Submission timestamp

## 💰 Pricing

- **Free**: 100 emails/day, 3,000/month
- **Pro**: $20/month for 50,000 emails/month
- Perfect for a small business contact form!

## 🔧 Troubleshooting

**Not receiving emails?**
1. Check Vercel environment variables are set
2. Check Resend dashboard logs for delivery status
3. Check spam folder
4. Verify API key is correct

**Getting errors?**
1. Check Vercel function logs
2. Make sure RESEND_API_KEY is set in production
3. Contact support if issues persist

## 📚 Documentation
- Resend Docs: https://resend.com/docs
- Resend Dashboard: https://resend.com/overview
