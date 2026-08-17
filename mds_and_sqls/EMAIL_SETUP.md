# Email Setup Guide for G3 Electric Contact Form

## Quick Setup (Easiest Option)

### 1. Update Your Email Address
Edit the file `src/config/email.ts` and change this line:
```typescript
recipientEmail: 'your-email@example.com', // UPDATE THIS WITH YOUR ACTUAL EMAIL
```
To your actual email address:
```typescript
recipientEmail: 'info@g3electric.com', // Your actual email
```

### 2. Choose an Email Service

#### Option A: Formspree (Recommended - Easiest)
1. Go to [formspree.io](https://formspree.io)
2. Sign up for a free account
3. Create a new form
4. Copy your form ID
5. Update `src/config/email.ts` with your form ID
6. Done! No coding required.

#### Option B: Resend (Simple Setup)
1. Go to [resend.com](https://resend.com)
2. Sign up and get your API key
3. Update `src/config/email.ts` with your API key
4. Update the API route to use Resend

#### Option C: SendGrid (Professional)
1. Go to [sendgrid.com](https://sendgrid.com)
2. Create account and get API key
3. Update `src/config/email.ts` with your API key
4. Update the API route to use SendGrid

#### Option D: Gmail SMTP (Free but requires setup)
1. Enable 2-factor authentication on your Gmail
2. Generate an "App Password"
3. Update `src/config/email.ts` with your Gmail credentials
4. Update the API route to use SMTP

## Current Status
Right now, the contact form will:
- ✅ Accept form submissions
- ✅ Show success/error messages
- ✅ Reset the form after successful submission
- ⚠️ Log email content to console (not actually send emails)

## Next Steps
1. Update your email address in `src/config/email.ts`
2. Choose and configure an email service
3. Test the contact form
4. Deploy to production

## Testing
1. Go to `/contact` on your website
2. Fill out the contact form
3. Submit the form
4. Check your email (or console logs for now)

## Support
If you need help setting up any of these email services, let me know which option you'd prefer and I can help you implement it!
