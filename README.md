# G3 Electric - Des Moines Electrical Services

A modern, responsive website for G3 Electric, a professional electrical services company serving the Des Moines area.

## 🌐 **Live Website**
**Production URL:** https://g3electricdsm.com  
**Staging URL:** https://g3-1un3n97yo-njt-designs-projects.vercel.app

## ✨ **Features**

### **Customer-Facing Features**
- **Responsive Design** - Works on all devices (desktop, tablet, mobile)
- **Interactive Navigation** - Smooth hover effects and animations
- **Portfolio Showcase** - Bento box layout displaying electrical projects
- **Service Pages** - Detailed electrical services with pricing
- **Contact Forms** - Lead generation with email integration
- **Payment Portal** - Online bill payment system
- **Testimonials** - Customer reviews and ratings
- **Pixel Zap Animation** - Interactive homepage animation with brand colors

### **Admin Features**
- **Project Management** - Add, edit, and manage portfolio projects
- **Form Entry Management** - View and manage customer inquiries
- **Image Upload** - Drag-and-drop image uploads for projects
- **Status Tracking** - Track lead status and add admin notes

## 🎨 **Design System**

### **Brand Colors**
- **Primary Purple:** `#6D0091`
- **Secondary Phlox:** `#C636FF`
- **Accent Green:** `#70877F` (Hookers Green)
- **Light Accent:** `#F2F2F2` (White Smoke)
- **Dark Accent:** `#242729` (Earle Black)

### **Typography**
- **Headings:** Megrim (display font)
- **Body Text:** Montserrat (primary)
- **Secondary:** Raleway (accent)

## 🛠️ **Technical Stack**

- **Framework:** Next.js 15 with App Router
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion + AOS (Animate On Scroll)
- **Icons:** Heroicons
- **Deployment:** Vercel
- **Email:** Configurable (Formspree, Resend, SendGrid, SMTP)

## 📧 **Email Configuration**

Contact form submissions are sent to: `info@g3electricdsm.com`

### **Email Setup Options:**
1. **Formspree** (easiest) - Just paste form ID
2. **Resend** (simple) - API key setup
3. **SendGrid** (professional) - Full email service
4. **Gmail SMTP** (free) - Requires app password

See `EMAIL_SETUP.md` for detailed setup instructions.

## 🚀 **Development**

### **Local Development**
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### **Build for Production**
```bash
npm run build
npm start
```

### **Deploy to Vercel**
```bash
npx vercel --prod
```

## 📁 **Project Structure**

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard
│   ├── contact/           # Contact page
│   ├── portfolio/         # Portfolio pages
│   ├── services/          # Services page
│   └── api/               # API routes
├── components/            # Reusable components
├── data/                  # Static data files
└── config/                # Configuration files
```

## 🔧 **Configuration**

### **Email Settings**
Update `src/config/email.ts` with your email configuration:
```typescript
export const emailConfig = {
  recipientEmail: 'info@g3electricdsm.com',
  // ... other settings
};
```

### **Brand Colors**
Update `tailwind.config.ts` to modify brand colors.

## 📱 **Pages**

- **Homepage** (`/`) - Hero section, services preview, testimonials
- **Services** (`/services`) - Electrical services with pricing
- **Portfolio** (`/portfolio`) - Project showcase with bento layout
- **About** (`/about`) - Company information and team
- **Contact** (`/contact`) - Contact form and business info
- **Pricing** (`/pricing`) - Service pricing and packages
- **Pay Bill** (`/pay`) - Online payment portal
- **Admin** (`/admin`) - Project and form management

## 🎯 **SEO Features**

- **Meta Tags** - Optimized for Des Moines electrical services
- **Structured Data** - Local business markup
- **Performance** - Optimized images and code splitting
- **Accessibility** - WCAG compliant design

## 🔒 **Security**

- **HTTPS** - SSL certificate via Vercel
- **Form Validation** - Client and server-side validation
- **Input Sanitization** - XSS protection
- **CSRF Protection** - Built-in Next.js security

## 📊 **Analytics Ready**

The site is ready for Google Analytics, Google Tag Manager, or other analytics platforms.

## 🆘 **Support**

For technical support or questions about the website, contact the development team.

---

**Built with ❤️ for G3 Electric - Des Moines' Premier Electrical Services**