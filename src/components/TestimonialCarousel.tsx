'use client';

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { getAllTestimonials } from "@/data/testimonials";
import { motion, useTransform, useMotionValue } from "framer-motion";
import { MotionValue } from "framer-motion";

interface TestimonialCarouselProps {
  testimonialsY?: MotionValue<number>;
  testimonialsScale?: MotionValue<number>;
  scrollYProgress?: MotionValue<number>;
}

export default function TestimonialCarousel({
  testimonialsY,
  testimonialsScale,
  scrollYProgress
}: TestimonialCarouselProps) {
  const allTestimonials = getAllTestimonials();
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const currentTestimonial = allTestimonials[currentTestimonialIndex];

  // Ensure hooks are called unconditionally: derive transforms from a motion value
  // If no scrollYProgress is provided, use a static 0 motion value
  const defaultProgress = useMotionValue(0);
  const progress = scrollYProgress ?? defaultProgress;
  const bgTopY = useTransform(progress, [0.4, 0.9], [0, -80]);
  const bgTopX = useTransform(progress, [0.4, 0.9], [0, 20]);
  const bgBottomY = useTransform(progress, [0.4, 0.9], [0, 60]);
  const bgBottomX = useTransform(progress, [0.4, 0.9], [0, -30]);

  const nextTestimonial = useCallback(() => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % allTestimonials.length);
  }, [allTestimonials.length]);

  const previousTestimonial = useCallback(() => {
    setCurrentTestimonialIndex((prev) => 
      prev === 0 ? allTestimonials.length - 1 : prev - 1
    );
  }, [allTestimonials.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        previousTestimonial();
      } else if (e.key === 'ArrowRight') {
        nextTestimonial();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextTestimonial, previousTestimonial]);

  // Auto-rotate testimonials (optional - every 10 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prev) => (prev + 1) % allTestimonials.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [allTestimonials.length]);

  return (
    <motion.section 
      className="py-20 bg-white-smoke relative overflow-hidden"
      style={{ y: testimonialsY, scale: testimonialsScale }}
    >
      {/* Floating background elements */}
      {scrollYProgress && (
        <>
          <motion.div 
            className="absolute top-10 left-10 w-32 h-32 bg-purple/5 rounded-full"
            style={{ y: bgTopY, x: bgTopX }}
          />
          <motion.div 
            className="absolute bottom-20 right-20 w-24 h-24 bg-phlox/5 rounded-full"
            style={{ y: bgBottomY, x: bgBottomX }}
          />
        </>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h2 className="font-montserrat text-4xl text-earle-black mb-4">What Our Customers Say</h2>
          <p className="font-raleway text-lg text-earle-black max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our satisfied customers have to say about our electrical services.
          </p>
        </motion.div>
        
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="rounded-2xl border border-white/10 bg-hookers-green relative overflow-hidden"
            key={currentTestimonialIndex}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex gap-[72px] items-center overflow-hidden p-8 md:px-0 md:py-8">
              {/* Left side - Text content */}
              <div className="flex flex-col gap-[22px] shrink-0 w-full md:w-[600px] pl-8 md:pl-8">
                <div className="flex flex-col gap-2 items-start">
                  {/* Client name and location */}
                  <div className="font-montserrat font-semibold text-2xl text-white leading-8">
                    {currentTestimonial.name}, a {currentTestimonial.location} client said
                  </div>
                  
                  {/* Testimonial text */}
                  <div className="font-raleway text-base text-white-smoke leading-6">
                    &ldquo;{currentTestimonial.text}&rdquo;
                  </div>
                </div>
              </div>
              
              {/* Right side - Image */}
              <div className="h-[475px] overflow-clip relative shrink-0 w-full md:w-[495px] hidden md:block">
                <div className="absolute inset-0">
                  <Image 
                    src={`/images/testimonials/${currentTestimonial.name.toLowerCase().replace(/\s+/g, '-')}.jpg`}
                    alt={`${currentTestimonial.name} - Customer testimonial`}
                    width={495}
                    height={475}
                    className="w-full h-[143.73%] -translate-y-[43.73%] object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            </div>
            
            {/* Navigation arrows and dots */}
            <div className="flex items-center justify-between px-8 pb-8">
              <div className="flex space-x-2">
                {allTestimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonialIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-hookers-green ${
                      index === currentTestimonialIndex ? 'bg-white' : 'bg-white/30'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                    type="button"
                  />
                ))}
              </div>
              
              <button
                onClick={nextTestimonial}
                className="bg-white/10 text-white p-3 rounded-full hover:bg-white/20 transition-colors border border-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-hookers-green"
                aria-label="Next testimonial"
                type="button"
              >
                <ChevronRightIcon className="h-6 w-6 text-white" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

