'use client';

import { useState } from "react";
import { EnvelopeIcon, MapPinIcon, ClockIcon } from "@heroicons/react/24/outline";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    description: '',
    budget: '',
    services: [] as string[],
    timeline: '',
    workArea: '',
    message: ''
  });


  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      services: checked 
        ? [...prev.services, value]
        : prev.services.filter(service => service !== value)
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return '';
      case 'projectType':
        if (!value) return 'Project type is required';
        return '';
      default:
        return '';
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    newErrors.name = validateField('name', formData.name);
    newErrors.email = validateField('email', formData.email);
    newErrors.projectType = validateField('projectType', formData.projectType);
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing, then validate new value
    // Only validate in real-time if there was a previous error (after user has made an error)
    const previousError = errors[name];
    if (previousError) {
      const newError = validateField(name, value);
      setErrors(prev => {
        const updatedErrors = { ...prev };
        if (newError) {
          // Re-add error if validation still fails
          updatedErrors[name] = newError;
        } else {
          // Remove error if validation passes
          delete updatedErrors[name];
        }
        return updatedErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrors({});

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setErrors({});
        // Reset form
        setFormData({
          name: '',
          email: '',
          projectType: '',
          description: '',
          budget: '',
          services: [],
          timeline: '',
          workArea: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-earle-black">
      {/* Navigation */}
      <Navigation currentPath="/contact" />

      {/* Header */}
      <section className="bg-earle-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-megrim text-5xl md:text-6xl mb-4">Contact G3</h1>
          <p className="font-raleway text-lg md:text-xl max-w-3xl">
            Ready to start your electrical project? Fill out the form below and we&apos;ll get back to you within 24 hours with a detailed quote.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="pt-10 pb-20 bg-earle-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {/* Quote Request Form */}
            <div>
              <h2 className="font-montserrat text-3xl text-white-smoke mb-8">Request a Quote</h2>
              
              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                  <p className="font-montserrat font-medium">Thank you for your quote request!</p>
                  <p className="font-raleway text-sm mt-1">We&apos;ll get back to you within 24 hours.</p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  <p className="font-montserrat font-medium">There was an error sending your message.</p>
                  <p className="font-raleway text-sm mt-1">Please try again or contact us directly.</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block font-montserrat text-sm font-medium text-white-smoke mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple focus:border-purple font-montserrat bg-white text-earle-black placeholder:text-gray-500 ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Your full name"
                      aria-describedby="name-error"
                      aria-invalid={errors.name ? 'true' : 'false'}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1 text-sm text-red-600 font-raleway" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-montserrat text-sm font-medium text-white-smoke mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple focus:border-purple font-montserrat bg-white text-earle-black placeholder:text-gray-500 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="your.email@example.com"
                      aria-describedby="email-error"
                      aria-invalid={errors.email ? 'true' : 'false'}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-sm text-red-600 font-raleway" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Project Details */}
                <div>
                  <label htmlFor="projectType" className="block font-montserrat text-sm font-medium text-white-smoke mb-2">
                    Project Type *
                  </label>
                    <select
                      id="projectType"
                      name="projectType"
                      required
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple focus:border-purple font-montserrat bg-white text-earle-black ${
                        errors.projectType ? 'border-red-500' : 'border-gray-300'
                      }`}
                      aria-describedby="projectType-error"
                      aria-invalid={errors.projectType ? 'true' : 'false'}
                    >
                    <option value="">Select project type</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="both">Both</option>
                  </select>
                  {errors.projectType && (
                    <p id="projectType-error" className="mt-1 text-sm text-red-600 font-raleway" role="alert">
                      {errors.projectType}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="description" className="block font-montserrat text-sm font-medium text-white-smoke mb-2">
                    Project Description
                  </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-purple font-montserrat bg-white text-earle-black placeholder:text-gray-500"
                      placeholder="Please describe your project in detail..."
                      aria-describedby="description-error"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="budget" className="block font-montserrat text-sm font-medium text-white-smoke mb-2">
                      Estimated Budget
                    </label>
                    <input
                      type="text"
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-purple font-montserrat bg-white text-earle-black placeholder:text-gray-500"
                      aria-describedby="budget-error"
                    />
                  </div>
                  <div>
                    <label htmlFor="timeline" className="block font-montserrat text-sm font-medium text-white-smoke mb-2">
                      Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-purple font-montserrat bg-white text-earle-black"
                      aria-describedby="timeline-error"
                    >
                      <option value="">Select timeline</option>
                      <option value="asap">ASAP</option>
                      <option value="1-2-weeks">1-2 weeks</option>
                      <option value="1-month">Within 1 month</option>
                      <option value="2-3-months">2-3 months</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="workArea" className="block font-montserrat text-sm font-medium text-white-smoke mb-2">
                    Size of Work Area
                  </label>
                    <input
                      type="text"
                      id="workArea"
                      name="workArea"
                      value={formData.workArea}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-purple font-montserrat bg-white text-earle-black placeholder:text-gray-500"
                      placeholder="e.g., 200 sq ft, entire house, 3 rooms, etc."
                      aria-describedby="workArea-error"
                    />
                </div>

                {/* Services Needed */}
                <div>
                  <label className="block font-montserrat text-sm font-medium text-white-smoke mb-3">
                    Services Needed (select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      'Lighting Installation',
                      'Ceiling Fans',
                      'Outlet Installation',
                      'New Homeowner Education',
                      'Commercial Builds',
                      'Residential Builds',
                      'Electrical Repairs',
                      'Smart Home Integration'
                    ].map((service) => (
                      <label key={service} className="flex items-center">
                        <input
                          type="checkbox"
                          value={service}
                          checked={formData.services.includes(service)}
                          onChange={handleCheckboxChange}
                          className="h-4 w-4 text-purple focus:ring-purple border-gray-300 rounded"
                        />
                        <span className="ml-2 font-raleway text-sm text-white-smoke">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block font-montserrat text-sm font-medium text-white-smoke mb-2">
                    Additional Message
                  </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-purple font-montserrat bg-white text-earle-black placeholder:text-gray-500"
                      placeholder="Any additional information or questions..."
                      aria-describedby="message-error"
                    />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full text-sm sm:text-base focus:ring-2 focus:ring-purple"
                >
                  {isSubmitting ? 'Sending...' : 'Request Free Quote'}
                </button>

                <p className="font-raleway text-sm text-white-smoke/80 text-center">
                  * Required fields. We&apos;ll respond within 24 hours.
                </p>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="font-montserrat text-3xl text-white mb-8">Contact Information</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <EnvelopeIcon className="h-6 w-6 text-purple mr-4 mt-1" />
                  <div>
                    <h3 className="font-montserrat text-lg font-semibold text-white-smoke">Email</h3>
                    <p className="font-raleway text-white-smoke">
                      <a href="mailto:g3electricdsm@gmail.com" className="font-medium text-purple hover:text-phlox">
                        g3electricdsm@gmail.com
                      </a>
                    </p>
                    <p className="font-raleway text-sm text-white-smoke/80">For general inquiries, reach out to us at </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPinIcon className="h-6 w-6 text-purple mr-4 mt-1" />
                  <div>
                    <h3 className="font-montserrat text-lg font-semibold text-white-smoke">Service Area</h3>
                    <p className="font-raleway text-white-smoke">We proudly serve Central Iowa and surrounding communities.</p>
                    <p className="font-raleway text-sm text-white-smoke/80">Please reach out for specific locations.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <ClockIcon className="h-6 w-6 text-purple mr-4 mt-1" />
                  <div>
                    <h3 className="font-montserrat text-lg font-semibold text-white-smoke">Business Hours</h3>
                    <p className="font-raleway text-white-smoke">Monday-Friday 8am-5pm</p>
                    <p className="font-raleway text-white-smoke">Saturdays, Sundays, and anything outside the scheduled working hours are reserved for emergencies.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white-smoke p-6 rounded-lg border border-hookers-green/20">
                <h3 className="font-montserrat text-xl font-semibold text-earle-black mb-4">Schedule a Consultation</h3>
                <p className="font-raleway text-earle-black mb-4">
                  Prefer to schedule a specific time? Use our online booking system to find a time that works for you.
                </p>
                <button 
                  disabled
                  className="btn-primary focus:ring-2 focus:ring-purple w-full sm:w-auto text-sm sm:text-base"
                >
                  Book Online
                </button>
                <p className="font-raleway text-sm text-earle-black mt-2">
                  *Calendly integration coming soon
                </p>
              </div>
            </div>
        </div>
      </section>

      {/* Footer */}
      <Footer currentPath="/contact" />
    </div>
  );
}
