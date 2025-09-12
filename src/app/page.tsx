'use client';

import Link from "next/link";
import Image from "next/image";
import { BoltIcon, StarIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Navigation from "@/components/Navigation";
import { getContent } from "@/data/content";
import { getAllTestimonials } from "@/data/testimonials";
import { useState } from "react";

export default function Home() {
  const content = getContent().homepage;
  const allTestimonials = getAllTestimonials();
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  
  const currentTestimonial = allTestimonials[currentTestimonialIndex];
  
  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % allTestimonials.length);
  };
  return (
    <div className="min-h-screen bg-earle-black">
      {/* Navigation */}
      <Navigation currentPath="/" />

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/hero-electrical-project.jpg"
            alt="Professional electrical work - G3 Electric"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        {/* Hero Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-megrim text-6xl md:text-8xl lg:text-9xl mb-6 text-white drop-shadow-2xl">
              {content.hero.title}
            </h1>
            <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl mb-8 font-light text-white drop-shadow-xl">
              {content.hero.subtitle}
            </h2>
            <p className="font-raleway text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-white drop-shadow-lg">
              {content.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <Link 
                href="/contact" 
                className="btn-primary text-sm sm:text-lg shadow-2xl w-full sm:w-auto"
              >
                {content.hero.ctaPrimary}
              </Link>
              <Link 
                href="/portfolio" 
                className="btn-secondary text-sm sm:text-lg shadow-2xl border-white text-white hover:bg-white hover:text-purple w-full sm:w-auto"
              >
                {content.hero.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-earle-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat text-4xl text-white mb-4">{content.services.title}</h2>
            <p className="font-raleway text-lg text-white-smoke max-w-2xl mx-auto">
              {content.services.description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.services.items.map((service, index) => (
              <div key={index} className="bg-white-smoke rounded-lg shadow-sm text-center hover:shadow-md transition-shadow overflow-hidden">
                <div className="h-32 bg-gradient-to-br from-purple/20 to-phlox/20 flex items-center justify-center">
                  <BoltIcon className="h-12 w-12 text-purple" />
                </div>
                <div className="p-6">
                  <h3 className="font-montserrat text-xl font-semibold text-earle-black mb-2">{service.title}</h3>
                  <p className="font-raleway text-earle-black">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white-smoke">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat text-4xl text-earle-black mb-4">What Our Customers Say</h2>
            <p className="font-raleway text-lg text-earle-black max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say about our electrical services.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8 md:p-12 relative">
              <div className="flex items-center mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="font-raleway text-earle-black text-lg md:text-xl mb-8 italic leading-relaxed">
                "{currentTestimonial.text}"
              </blockquote>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple to-phlox rounded-full flex items-center justify-center text-white font-montserrat font-bold text-xl mr-4">
                    {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-montserrat font-semibold text-earle-black text-lg">{currentTestimonial.name}</div>
                    <div className="font-raleway text-earle-black opacity-75">{currentTestimonial.location}</div>
                    <div className="font-raleway text-purple font-medium">{currentTestimonial.project}</div>
                  </div>
                </div>
                
                <button
                  onClick={nextTestimonial}
                  className="bg-purple text-white p-3 rounded-full hover:bg-phlox transition-colors shadow-md hover:shadow-lg"
                  aria-label="Next testimonial"
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </button>
              </div>
              
              <div className="flex justify-center mt-6">
                <div className="flex space-x-2">
                  {allTestimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonialIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentTestimonialIndex ? 'bg-purple' : 'bg-gray-300'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-earle-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-montserrat text-4xl mb-6 text-white">{content.cta.title}</h2>
          <p className="font-raleway text-lg mb-8 max-w-2xl mx-auto text-white-smoke">
            {content.cta.description}
          </p>
          <Link 
            href="/contact" 
            className="btn-primary inline-block text-sm sm:text-base"
          >
            {content.cta.buttonText}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12" style={{backgroundColor: '#70877F'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="font-montserrat text-2xl text-white mb-4">G3 Electric</h3>
            <p className="font-raleway text-white-smoke mb-4">Safe & Dependable Electrical Services</p>
            <div className="flex justify-center space-x-6">
              <Link href="/services" className="text-white-smoke hover:text-purple font-raleway">Services</Link>
              <Link href="/portfolio" className="text-white-smoke hover:text-purple font-raleway">Portfolio</Link>
              <Link href="/pricing" className="text-white-smoke hover:text-purple font-raleway">Pricing</Link>
              <Link href="/about" className="text-white-smoke hover:text-purple font-raleway">About</Link>
              <Link href="/contact" className="text-white-smoke hover:text-purple font-raleway">Contact</Link>
              <Link href="/pay" className="text-purple hover:text-phlox font-raleway font-semibold">Pay Bill</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
