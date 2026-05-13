# 🎨 Website Template Guide
## How to Duplicate This Site for New Clients

This guide will help you clone and customize this website template for new clients. The G3 Electric website is built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, **Supabase**, and **Resend**.

---

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Project Setup](#project-setup)
3. [Branding Customization](#branding-customization)
4. [Content Updates](#content-updates)
5. [Database Setup](#database-setup)
6. [Email Configuration](#email-configuration)
7. [Deployment](#deployment)
8. [Post-Launch Checklist](#post-launch-checklist)

---

## 🛠️ Prerequisites

Before you start, make sure you have:
- Node.js 18+ installed
- Git installed
- A Vercel account (free)
- A Supabase account (free)
- A Resend account (free)
- Client's branding assets (logo, colors, content)

---

## 🚀 Project Setup

### **Step 1: Clone the Repository**

```bash
# Clone from GitHub
git clone https://github.com/g3electricdsm-design/g3.git client-website
cd client-website

# Remove old git history and start fresh
rm -rf .git
git init
git add .
git commit -m "Initial commit - [Client Name] website"

# Create new GitHub repo and push
git remote add origin https://github.com/your-username/client-website.git
git push -u origin main
```

### **Step 2: Install Dependencies**

```bash
npm install
```

### **Step 3: Create Environment File**

Create `.env.local` in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Resend
RESEND_API_KEY=your_resend_api_key_here
```

### **Step 4: Test Locally**

```bash
npm run dev
# Visit http://localhost:3000
```

---

## 🎨 Branding Customization

### **1. Update Colors**

**File:** `/tailwind.config.ts`

```typescript
extend: {
  colors: {
    'purple': '#6D0091',        // Primary color
    'earle-black': '#242729',   // Dark background
    'white-smoke': '#F2F2F2',   // Light background
    'hookers-green': '#748680', // Accent color
    'phlox': '#C636FF',         // Secondary/hover color
  },
}
```

**Replace with client's brand colors:**
```typescript
extend: {
  colors: {
    'primary': '#YOUR_PRIMARY_COLOR',
    'dark': '#YOUR_DARK_COLOR',
    'light': '#YOUR_LIGHT_COLOR',
    'accent': '#YOUR_ACCENT_COLOR',
    'secondary': '#YOUR_SECONDARY_COLOR',
  },
}
```

**Then find/replace throughout the project:**
- `purple` → `primary`
- `earle-black` → `dark`
- `phlox` → `secondary`

### **2. Update Fonts**

**File:** `/src/app/layout.tsx`

```typescript
import { Megrim, Montserrat, Raleway } from "next/font/google";

const megrim = Megrim({...});      // Decorative headers
const montserrat = Montserrat({...}); // Headings
const raleway = Raleway({...});       // Body text
```

**Replace with client's fonts** (search Google Fonts):
```typescript
import { YourDisplayFont, YourHeadingFont, YourBodyFont } from "next/font/google";
```

### **3. Add Logo**

**Files to add:**
- `/public/logo.svg` or `/public/logo.png`
- `/public/favicon.ico`

**Update in:** `/src/components/Navigation.tsx`

```typescript
<Image 
  src="/logo.svg" 
  alt="Client Name" 
  width={120} 
  height={40} 
/>
```

### **4. Update Company Name**

**Find and replace throughout project:**
- "G3 Electric" → "Client Company Name"
- "G3 Electric Des Moines" → "Client Company Full Name"
- "g3electricdsm.com" → "clientdomain.com"

**Files to update:**
- `/src/app/layout.tsx` - metadata
- `/src/components/Navigation.tsx` - company name
- `/src/components/Footer.tsx` - company info
- All page titles and descriptions

---

## 📝 Content Updates

### **1. Homepage Content**

**File:** `/src/app/page.tsx`

Update:
- Hero section headline and description
- Services section
- Testimonials
- Call-to-action text

### **2. About Page**

**File:** `/src/app/about/page.tsx`

Update:
- Company history
- Team members
- Mission/values
- Service area

### **3. Services**

**File:** `/src/data/services.ts`

```typescript
export const services = [
  {
    id: 1,
    title: "Service Name",
    icon: ServiceIcon,
    description: "Service description",
    features: ["Feature 1", "Feature 2"]
  },
  // Add client's services
];
```

### **4. Contact Information**

**Files to update:**
- `/src/components/Footer.tsx` - address, phone, email
- `/src/app/contact/page.tsx` - contact details
- `/src/config/email.ts` - recipient email

```typescript
// Update in Footer.tsx
<p>123 Client Street</p>
<p>City, State 12345</p>
<p>(555) 123-4567</p>
<p>contact@clientdomain.com</p>
```

### **5. Social Media Links**

**File:** `/src/components/Footer.tsx`

```typescript
// Update social media URLs
<a href="https://facebook.com/clientpage">Facebook</a>
<a href="https://instagram.com/clienthandle">Instagram</a>
```

---

## 🗄️ Database Setup

### **Step 1: Create Supabase Project**

1. Go to https://supabase.com
2. Create new project
3. Name it: "[Client Name] Website"
4. Choose region closest to client
5. Set strong database password

### **Step 2: Run SQL Setup**

1. In Supabase, go to **SQL Editor**
2. Run the file: `/supabase-setup-complete.sql`
3. This creates the `projects` table with all columns

### **Step 3: Add Initial Projects**

**File:** `/src/data/projects.ts`

Replace the default projects array with client's projects:

```typescript
export const projects: Project[] = [
  {
    id: 1,
    title: "Client Project 1",
    category: "Residential", // or "Commercial"
    type: "Service Type",
    image: "/images/portfolio/project1.jpg",
    description: "Short description for preview",
    overview: "Detailed project description",
    client: "Client Name",
    location: "City, State",
    services: ["Service 1", "Service 2"],
    challenges: "Project challenges",
    size: "square", // square, tall, wide, panoramic, extraTall, short
    orientation: "landscape", // or "portrait"
    slug: "project-slug",
    seoTitle: "Project Name | Client Company",
    metaDescription: "Project description for SEO"
  },
  // Add more projects
];
```

### **Step 4: Upload Project Images**

1. Add images to `/public/images/portfolio/`
2. Optimize images (max 2000px width)
3. Use descriptive filenames: `client-project-name.jpg`

### **Step 5: Get Supabase Credentials**

1. Supabase Dashboard → **Settings** → **API**
2. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 📧 Email Configuration

### **Step 1: Create Resend Account**

1. Go to https://resend.com
2. Sign up for free account
3. Verify email

### **Step 2: Get API Key**

1. Resend Dashboard → **API Keys**
2. Create API Key: "[Client Name] Website"
3. Copy the key → `RESEND_API_KEY`

### **Step 3: Update Recipient Email**

**File:** `/src/config/email.ts`

```typescript
export const emailConfig = {
  recipientEmail: 'client@clientdomain.com', // Client's email
  // ...
};
```

### **Step 4: (Optional) Verify Custom Domain**

1. Resend Dashboard → **Domains** → **Add Domain**
2. Enter: `clientdomain.com`
3. Copy DNS records
4. Add records in Vercel (see RESEND_SETUP.md)
5. Update `from` address in `/src/app/api/contact/route.ts`:

```typescript
from: 'Client Name <quotes@clientdomain.com>'
```

---

## 🚀 Deployment

### **Step 1: Push to GitHub**

```bash
git add .
git commit -m "Customized for [Client Name]"
git push origin main
```

### **Step 2: Deploy to Vercel**

1. Go to https://vercel.com
2. Click **Import Project**
3. Select your GitHub repository
4. Click **Deploy**

### **Step 3: Add Environment Variables**

In Vercel Dashboard → Project → **Settings** → **Environment Variables**:

Add these variables for **Production**, **Preview**, and **Development**:

```
NEXT_PUBLIC_SUPABASE_URL = your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY = your_supabase_anon_key
RESEND_API_KEY = your_resend_api_key
```

### **Step 4: Connect Custom Domain**

1. Vercel Dashboard → **Settings** → **Domains**
2. Add domain: `clientdomain.com`
3. Follow DNS setup instructions
4. Add these DNS records at domain registrar:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### **Step 5: Redeploy**

After adding environment variables:
1. Vercel Dashboard → **Deployments**
2. Click **...** on latest deployment
3. Click **Redeploy**

---

## ✅ Post-Launch Checklist

### **Testing**
- [ ] All pages load correctly
- [ ] Navigation works
- [ ] Contact form sends emails
- [ ] Admin panel works (if applicable)
- [ ] Mobile responsive
- [ ] Fast page load times

### **SEO**
- [ ] Update meta descriptions on all pages
- [ ] Add Google Analytics (optional)
- [ ] Submit sitemap to Google Search Console
- [ ] Test with Lighthouse (aim for 90+ score)

### **Security**
- [ ] All environment variables are secret
- [ ] Supabase RLS policies enabled
- [ ] No API keys in code
- [ ] HTTPS enabled

### **Content**
- [ ] All placeholder text replaced
- [ ] Client's contact info correct
- [ ] Social media links work
- [ ] All images optimized
- [ ] Portfolio projects added

### **Performance**
- [ ] Images optimized (WebP format)
- [ ] No console errors
- [ ] Fast Time to First Byte (TTFB)

---

## 🎯 Common Customizations

### **Add New Page**

```bash
# Create new page
mkdir src/app/new-page
touch src/app/new-page/page.tsx

# Add to navigation
# Edit: src/components/Navigation.tsx
```

### **Change Portfolio Grid Layout**

**File:** `/src/app/portfolio/page.tsx`

Modify `getSizeClasses()` function to change tile sizes.

### **Add New Service**

**File:** `/src/data/services.ts`

Add new service object to the array.

### **Customize Contact Form Fields**

**File:** `/src/app/contact/page.tsx`

Add/remove form fields as needed.

---

## 📚 Additional Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Resend Docs**: https://resend.com/docs
- **Vercel Docs**: https://vercel.com/docs

---

## 🆘 Troubleshooting

### **Build Errors**
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### **Database Not Working**
- Check Supabase environment variables in Vercel
- Verify SQL setup script ran successfully
- Check Supabase logs for errors

### **Emails Not Sending**
- Verify RESEND_API_KEY in Vercel
- Check Resend dashboard logs
- Verify recipient email is correct

### **Styling Issues**
- Clear browser cache
- Check Tailwind classes are correct
- Run `npm run build` to test production build

---

## 💰 Pricing Breakdown

**Free Tier:**
- ✅ Vercel: Free for 100GB bandwidth/month
- ✅ Supabase: Free for 500MB database, 2GB storage
- ✅ Resend: Free for 3,000 emails/month

**Paid (if needed):**
- Vercel Pro: $20/month
- Supabase Pro: $25/month
- Resend Pro: $20/month

---

## 📞 Support

If you run into issues:
1. Check the documentation links above
2. Search GitHub issues
3. Contact the original developer

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
