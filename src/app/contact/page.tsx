'use client';

import Link from "next/link";
import { useState } from "react";
import { ArrowLeftIcon, PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from "@heroicons/react/24/outline";
import Navigation from "@/components/Navigation";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    description: '',
    budget: '',
    services: [] as string[],
    timeline: '',
    workArea: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      services: checked 
        ? [...prev.services, value]
        : prev.services.filter(service => service !== value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your quote request! We\'ll get back to you within 24 hours.');
  };

  return (
    <div className="min-h-screen bg-earle-black">
      {/* Navigation */}
      <Navigation currentPath="/contact" />

      {/* Header */}
      <section className="bg-gradient-to-br from-purple to-phlox text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Link href="/" className="flex items-center text-white hover:text-white-smoke transition-colors">
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </div>
          <h1 className="font-megrim text-5xl md:text-6xl mb-4">Get Your Free Quote</h1>
          <p className="font-raleway text-lg md:text-xl max-w-3xl">
            Ready to start your electrical project? Fill out the form below and we&apos;ll get back to you within 24 hours with a detailed quote.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-earle-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="font-montserrat text-3xl text-white mb-8">Contact Information</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <PhoneIcon className="h-6 w-6 text-purple mr-4 mt-1" />
                  <div>
                    <h3 className="font-montserrat text-lg font-semibold text-earle-black">Phone</h3>
                    <p className="font-raleway text-earle-black">(555) 123-4567</p>
                    <p className="font-raleway text-sm text-earle-black">Available 7 days a week</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <EnvelopeIcon className="h-6 w-6 text-purple mr-4 mt-1" />
                  <div>
                    <h3 className="font-montserrat text-lg font-semibold text-earle-black">Email</h3>
                    <p className="font-raleway text-earle-black">info@g3electric.com</p>
                    <p className="font-raleway text-sm text-earle-black">We respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPinIcon className="h-6 w-6 text-purple mr-4 mt-1" />
                  <div>
                    <h3 className="font-montserrat text-lg font-semibold text-earle-black">Service Area</h3>
                    <p className="font-raleway text-earle-black">Local and surrounding areas</p>
                    <p className="font-raleway text-sm text-earle-black">Contact us for specific locations</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <ClockIcon className="h-6 w-6 text-purple mr-4 mt-1" />
                  <div>
                    <h3 className="font-montserrat text-lg font-semibold text-earle-black">Business Hours</h3>
                    <p className="font-raleway text-earle-black">Monday - Friday: 7:00 AM - 6:00 PM</p>
                    <p className="font-raleway text-earle-black">Saturday: 8:00 AM - 4:00 PM</p>
                    <p className="font-raleway text-earle-black">Sunday: Emergency calls only</p>
                  </div>
                </div>
              </div>

              {/* Calendly Integration Placeholder */}
                <div className="bg-white-smoke p-6 rounded-lg border border-hookers-green/20">
                  <h3 className="font-montserrat text-xl font-semibold text-earle-black mb-4">Schedule a Consultation</h3>
                  <p className="font-raleway text-earle-black mb-4">
                    Prefer to schedule a specific time? Use our online booking system to find a time that works for you.
                  </p>
                  <button className="btn-primary focus:ring-2 focus:ring-purple focus:ring-offset-2 w-full sm:w-auto text-sm sm:text-base">
                    Book Online
                  </button>
                  <p className="font-raleway text-sm text-earle-black mt-2">
                    *Calendly integration coming soon
                  </p>
                </div>
            </div>

            {/* Quote Request Form */}
            <div>
              <h2 className="font-montserrat text-3xl text-earle-black mb-8">Request a Quote</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block font-montserrat text-sm font-medium text-earle-black mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-purple font-raleway text-earle-black"
                      placeholder="Your full name"
                      aria-describedby="name-error"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-montserrat text-sm font-medium text-earle-black mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-purple font-raleway text-earle-black"
                      placeholder="your.email@example.com"
                      aria-describedby="email-error"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block font-montserrat text-sm font-medium text-earle-black mb-2">
                    Phone Number
                  </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-purple font-raleway text-earle-black"
                      placeholder="(555) 123-4567"
                      aria-describedby="phone-error"
                    />
                </div>

                {/* Project Details */}
                <div>
                  <label htmlFor="projectType" className="block font-montserrat text-sm font-medium text-earle-black mb-2">
                    Project Type *
                  </label>
                    <select
                      id="projectType"
                      name="projectType"
                      required
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-purple font-raleway text-earle-black"
                      aria-describedby="projectType-error"
                    >
                    <option value="">Select project type</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="both">Both</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="description" className="block font-montserrat text-sm font-medium text-earle-black mb-2">
                    Project Description
                  </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-purple font-raleway text-earle-black"
                      placeholder="Please describe your project in detail..."
                      aria-describedby="description-error"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="budget" className="block font-montserrat text-sm font-medium text-earle-black mb-2">
                      Estimated Budget
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-purple font-raleway text-earle-black"
                      aria-describedby="budget-error"
                    >
                      <option value="">Select budget range</option>
                      <option value="under-1000">Under $1,000</option>
                      <option value="1000-5000">$1,000 - $5,000</option>
                      <option value="5000-10000">$5,000 - $10,000</option>
                      <option value="10000-25000">$10,000 - $25,000</option>
                      <option value="over-25000">Over $25,000</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="timeline" className="block font-montserrat text-sm font-medium text-earle-black mb-2">
                      Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-purple font-raleway text-earle-black"
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
                  <label htmlFor="workArea" className="block font-montserrat text-sm font-medium text-earle-black mb-2">
                    Size of Work Area
                  </label>
                    <input
                      type="text"
                      id="workArea"
                      name="workArea"
                      value={formData.workArea}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-purple font-raleway text-earle-black"
                      placeholder="e.g., 200 sq ft, entire house, 3 rooms, etc."
                      aria-describedby="workArea-error"
                    />
                </div>

                {/* Services Needed */}
                <div>
                  <label className="block font-montserrat text-sm font-medium text-earle-black mb-3">
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
                        <span className="ml-2 font-raleway text-sm text-earle-black">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block font-montserrat text-sm font-medium text-earle-black mb-2">
                    Additional Message
                  </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-purple font-raleway text-earle-black"
                      placeholder="Any additional information or questions..."
                      aria-describedby="message-error"
                    />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full text-sm sm:text-base focus:ring-2 focus:ring-purple focus:ring-offset-2"
                >
                  Request Free Quote
                </button>

                <p className="font-raleway text-sm text-earle-black text-center">
                  * Required fields. We&apos;ll respond within 24 hours.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white-smoke py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="font-montserrat text-2xl text-earle-black mb-4">G3 Electric</h3>
            <p className="font-raleway text-earle-black mb-4">Safe & Dependable Electrical Services</p>
            <div className="flex justify-center space-x-6">
              <Link href="/services" className="text-earle-black hover:text-purple font-raleway">Services</Link>
              <Link href="/portfolio" className="text-earle-black hover:text-purple font-raleway">Portfolio</Link>
              <Link href="/pricing" className="text-earle-black hover:text-purple font-raleway">Pricing</Link>
              <Link href="/about" className="text-earle-black hover:text-purple font-raleway">About</Link>
              <Link href="/contact" className="text-purple font-raleway">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
