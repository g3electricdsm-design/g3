// Email Configuration for G3 Electric Contact Forms
// Update this file with your email settings

export const emailConfig = {
  // Your email address where contact form submissions will be sent
  recipientEmail: 'your-email@example.com', // UPDATE THIS WITH YOUR ACTUAL EMAIL
  
  // Email service configuration
  service: {
    // Choose one of these options:
    
    // Option 1: Simple SMTP (requires email provider setup)
    smtp: {
      host: 'smtp.gmail.com', // or your email provider's SMTP server
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'your-email@gmail.com', // your email
        pass: 'your-app-password' // your app password (not regular password)
      }
    },
    
    // Option 2: SendGrid (recommended for production)
    sendGrid: {
      apiKey: 'your-sendgrid-api-key' // Get this from SendGrid dashboard
    },
    
    // Option 3: Resend (simple setup)
    resend: {
      apiKey: 'your-resend-api-key' // Get this from Resend dashboard
    },
    
    // Option 4: Formspree (easiest setup, no coding required)
    formspree: {
      formId: 'your-formspree-form-id' // Get this from Formspree
    }
  },
  
  // Email templates
  templates: {
    contactForm: {
      subject: 'New Contact Form Submission - G3 Electric',
      from: 'noreply@g3electric.com', // You can customize this
      replyTo: '{{customerEmail}}' // This will use the customer's email as reply-to
    }
  }
};

// Example usage:
// To update your email address, just change the recipientEmail above
// For example: recipientEmail: 'info@g3electric.com'
