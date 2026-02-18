'use client';
/* eslint-disable @next/next/no-img-element */

import { useState, useEffect, useCallback } from "react";
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
  const [isHovering, setIsHovering] = useState(false);
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

  return (
    <motion.section 
      className="py-20 relative overflow-hidden bg-earle-black"
      style={testimonialsY && testimonialsScale ? { y: testimonialsY, scale: testimonialsScale } : undefined}
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
          <h2 className="font-montserrat text-4xl text-white mb-4">What Our Customers Say</h2>
          <p className="font-raleway text-lg text-white-smoke max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our satisfied customers have to say about our electrical services.
          </p>
        </motion.div>
        
        <motion.div 
          className="rounded-2xl border border-white/10 relative overflow-hidden testimonial-bg"
          key={currentTestimonialIndex}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-16 items-stretch overflow-hidden p-6 lg:p-8">
            {/* Left side - Text content and button */}
            <div className="flex flex-col gap-8 lg:gap-12 items-start justify-center w-full lg:flex-[55]">
              <div className="flex flex-col gap-5 items-start">
                <div className="flex flex-col gap-2 items-start">
                  <div className="font-montserrat font-semibold text-xl sm:text-2xl text-white leading-7 sm:leading-8">
                    {currentTestimonial.name}, a {currentTestimonial.location} client said
                  </div>
                  
                  <div className="font-raleway text-sm sm:text-base text-white-smoke leading-6">
                    &ldquo;{currentTestimonial.text}&rdquo;
                  </div>
                </div>
              </div>
              
              <button
                onClick={nextTestimonial}
                className="bg-earle-black text-white px-3 py-2.5 rounded-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-hookers-green"
                aria-label="Next testimonial"
                type="button"
              >
                <span className="font-montserrat font-bold text-lg">Next</span>
              </button>
            </div>
            
            {/* Right side - Image */}
            <div 
              className="overflow-hidden relative hidden lg:flex lg:flex-[45] min-h-[320px] rounded-lg"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {currentTestimonial.image && (
                <img
                  src={currentTestimonial.image}
                  alt={`${currentTestimonial.name} - Customer testimonial`}
                  className={`w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${isHovering && currentTestimonial.image2 ? 'opacity-0' : 'opacity-100'}`}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              )}
              {currentTestimonial.image2 && (
                <img
                  src={currentTestimonial.image2}
                  alt={`${currentTestimonial.name} - After`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${isHovering ? 'opacity-100' : 'opacity-0'}`}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

