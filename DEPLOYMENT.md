# G3 Electric DSM - Deployment Guide

## 🌐 **Domain: g3electricdsm.com**

### **Current URLs**
- **Production:** https://g3electricdsm.com (when domain is connected)
- **Staging:** https://g3-1un3n97yo-njt-designs-projects.vercel.app
- **Local:** http://localhost:3000

## 🚀 **Deployment Steps**

### **Step 1: Connect Domain to Vercel**

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Find your project: `g3-1un3n97yo-njt-designs-projects`

2. **Add Custom Domain**
   - Click "Settings" → "Domains"
   - Click "Add Domain"
   - Enter: `g3electricdsm.com`
   - Click "Add"

3. **Configure DNS**
   - Vercel will provide DNS records
   - Add these to your domain registrar:
     ```
     Type: A
     Name: @
     Value: 76.76.19.61
     
     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com
     ```

### **Step 2: SSL Certificate (Automatic)**
- ✅ Vercel automatically provides SSL
- ✅ HTTPS will be enabled automatically
- ✅ Certificate renewal is automatic

### **Step 3: Email Setup**

1. **Set up email for g3electricdsm.com**
   - **Google Workspace:** $6/month per user
   - **Zoho Mail:** Free for 5 users
   - **Microsoft 365:** $6/month per user

2. **Create email addresses:**
   - `info@g3electricdsm.com` (main contact)
   - `noreply@g3electricdsm.com` (system emails)

3. **Update email service**
   - Choose from: Formspree, Resend, SendGrid, or SMTP
   - See `EMAIL_SETUP.md` for details

### **Step 4: Test Everything**

1. **Visit your domain:** https://g3electricdsm.com
2. **Test contact form:** Fill out and submit
3. **Check email delivery:** Verify emails arrive
4. **Test all pages:** Navigation, portfolio, services, etc.

## 🔧 **Domain Configuration**

### **DNS Records Needed**
```
A Record:     @ → 76.76.19.61
CNAME:        www → cname.vercel-dns.com
MX Record:    @ → mail.g3electricdsm.com (for email)
TXT Record:   @ → v=spf1 include:_spf.google.com ~all (for email)
```

### **SSL Certificate**
- **Provider:** Vercel (automatic)
- **Type:** Let's Encrypt
- **Auto-renewal:** Yes
- **Status:** Active once domain is connected

## 📧 **Email Configuration**

### **Current Setup**
- **Contact Form:** Sends to `info@g3electricdsm.com`
- **From Address:** `noreply@g3electricdsm.com`
- **Service:** Configurable (see `src/config/email.ts`)

### **Email Service Options**
1. **Formspree** (easiest)
   - Go to [formspree.io](https://formspree.io)
   - Create form for `g3electricdsm.com`
   - Get form ID and update config

2. **Resend** (recommended)
   - Go to [resend.com](https://resend.com)
   - Add domain `g3electricdsm.com`
   - Get API key and update config

3. **SendGrid** (professional)
   - Go to [sendgrid.com](https://sendgrid.com)
   - Add domain and verify
   - Get API key and update config

## 🎯 **SEO Optimization**

### **Meta Tags (Already Configured)**
- **Title:** "G3 Electric - Master Electricians in Des Moines"
- **Description:** "Professional electrical services in Des Moines. Residential & commercial electrical work, lighting, outlets, and more."
- **Keywords:** "electrician des moines, electrical services iowa, master electrician"

### **Local SEO**
- **Business Name:** G3 Electric
- **Location:** Des Moines, Iowa
- **Services:** Electrical installation, repair, maintenance
- **Service Area:** Des Moines and surrounding areas

## 🔒 **Security Features**

### **SSL/HTTPS**
- ✅ Automatic SSL certificate
- ✅ HTTPS redirect
- ✅ HSTS headers
- ✅ Security headers

### **Form Security**
- ✅ CSRF protection
- ✅ Input validation
- ✅ XSS prevention
- ✅ Rate limiting (via Vercel)

## 📊 **Analytics Ready**

### **Google Analytics**
- Add GA4 tracking code to `src/app/layout.tsx`
- Configure for `g3electricdsm.com`

### **Google Search Console**
- Add property for `g3electricdsm.com`
- Submit sitemap
- Monitor search performance

## 🆘 **Troubleshooting**

### **Domain Not Working**
1. Check DNS propagation: [whatsmydns.net](https://whatsmydns.net)
2. Verify DNS records in domain registrar
3. Wait 24-48 hours for full propagation

### **Email Not Working**
1. Check email service configuration
2. Verify domain email setup
3. Test with simple email first

### **SSL Issues**
1. Vercel handles SSL automatically
2. Check domain configuration
3. Wait for certificate generation

## 📞 **Support**

For deployment issues:
1. Check Vercel dashboard for errors
2. Review DNS configuration
3. Test locally first
4. Contact development team

---

**Ready to go live with g3electricdsm.com! 🚀**
