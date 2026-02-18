import { NextRequest, NextResponse } from 'next/server';
import { emailConfig } from '@/config/email';
import { Resend } from 'resend';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitizeString(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

function validateContactForm(data: Record<string, unknown>): { valid: boolean; error?: string } {
  const name = sanitizeString(data.name, 100);
  const email = sanitizeString(data.email, 254);
  const message = sanitizeString(data.message ?? data.description, 5000);

  if (!name) return { valid: false, error: 'Name is required' };
  if (!email) return { valid: false, error: 'Email address is required' };
  if (!EMAIL_REGEX.test(email)) return { valid: false, error: 'Invalid email address' };
  if (!message) return { valid: false, error: 'Message is required' };

  return { valid: true };
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    const validation = validateContactForm(formData);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, message: validation.error },
        { status: 400 }
      );
    }

    // Extract and sanitize all form data
    const name        = sanitizeString(formData.name, 100);
    const email       = sanitizeString(formData.email, 254);
    const phone       = sanitizeString(formData.phone, 30);
    const projectType = sanitizeString(formData.projectType, 100);
    const description = sanitizeString(formData.description, 5000);
    const budget      = sanitizeString(formData.budget, 100);
    const timeline    = sanitizeString(formData.timeline, 100);
    const workArea    = sanitizeString(formData.workArea, 200);
    const message     = sanitizeString(formData.message ?? formData.description, 5000);

    const rawServices = formData.services;
    const services = Array.isArray(rawServices)
      ? rawServices.map(s => sanitizeString(s, 100)).filter(Boolean)
      : [];

    // Get recipient email from configuration
    const recipientEmail = emailConfig.recipientEmail;

    // Build email content from sanitized values
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
- Services Needed: ${services.length > 0 ? services.join(', ') : 'None selected'}

Additional Message:
${message || 'No additional message'}

---
Submitted on: ${new Date().toLocaleString()}
Source: G3 Electric Website Contact Form
    `;

    // For now, we'll use a simple email service
    // You can replace this with your preferred email service (SendGrid, Nodemailer, etc.)
    
    // Send email using the configured service
    const emailResult = await sendEmail({
      to: recipientEmail,
      subject: `New Contact Form Submission from ${name}`,
      text: emailContent
    });

    if (emailResult.success) {
      // Also store in your local database/state for admin panel
      // This would integrate with your existing formEntries system
      
      return NextResponse.json({ 
        success: true, 
        message: 'Thank you for your quote request! We&apos;ll get back to you within 24 hours.' 
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

// Initialize Resend with API key from environment variables
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Email sending function using Resend
async function sendEmail({ to, subject, text }: {
  to: string;
  subject: string;
  text: string;
}) {
  try {
    // Check if Resend is configured
    if (!resend) {
      console.warn('⚠️  Resend API key not configured. Set RESEND_API_KEY in environment variables.');
      console.log('Email would be sent to:', to);
      console.log('Subject:', subject);
      console.log('Content:', text);
      return { success: false, error: 'Email service not configured' };
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'G3 Electric <quotes@g3electricdsm.com>',
      to: [to],
      subject: subject,
      text: text,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error: error.message };
    }

    console.log('✅ Email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}
