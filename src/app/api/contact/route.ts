import { NextRequest, NextResponse } from 'next/server';
import { emailConfig } from '@/config/email';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    
    // Extract form data
    const {
      name,
      email,
      phone,
      projectType,
      description,
      budget,
      services,
      timeline,
      workArea,
      message
    } = formData;

    // Get recipient email from configuration
    const recipientEmail = emailConfig.recipientEmail;
    
    // Create email content
    const emailContent = `
New Contact Form Submission - G3 Electric

Customer Information:
- Name: ${name}
- Email: ${email}
- Phone: ${phone || 'Not provided'}

Project Details:
- Project Type: ${projectType || 'Not specified'}
- Description: ${description || 'Not provided'}
- Budget: ${budget || 'Not specified'}
- Timeline: ${timeline || 'Not specified'}
- Work Area: ${workArea || 'Not specified'}
- Services Needed: ${services && services.length > 0 ? services.join(', ') : 'None selected'}

Additional Message:
${message || 'No additional message'}

---
Submitted on: ${new Date().toLocaleString()}
Source: G3 Electric Website Contact Form
    `;

    // For now, we'll use a simple email service
    // You can replace this with your preferred email service (SendGrid, Nodemailer, etc.)
    
    // Example using a simple email service (you'll need to configure this)
    const emailResult = await sendEmail({
      to: recipientEmail,
      subject: `New Contact Form Submission from ${name}`,
      text: emailContent,
      from: 'noreply@g3electric.com' // You can customize this
    });

    if (emailResult.success) {
      // Also store in your local database/state for admin panel
      // This would integrate with your existing formEntries system
      
      return NextResponse.json({ 
        success: true, 
        message: 'Thank you for your quote request! We\'ll get back to you within 24 hours.' 
      });
    } else {
      throw new Error('Failed to send email');
    }

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'There was an error sending your message. Please try again.' },
      { status: 500 }
    );
  }
}

// Simple email sending function - replace with your preferred email service
async function sendEmail({ to, subject, text }: {
  to: string;
  subject: string;
  text: string;
}) {
  // Option 1: Using Nodemailer (requires additional setup)
  // Option 2: Using SendGrid (requires API key)
  // Option 3: Using Resend (simple setup)
  // Option 4: Using a webhook service like Formspree or Netlify Forms
  
  // For now, let's use a simple console log and return success
  // Replace this with actual email sending logic
  console.log('Email would be sent to:', to);
  console.log('Subject:', subject);
  console.log('Content:', text);
  
  return { success: true };
}
