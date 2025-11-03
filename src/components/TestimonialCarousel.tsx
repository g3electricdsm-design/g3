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
          <div className="flex gap-[72px] items-stretch overflow-hidden pl-[33px] pr-0 pb-8 max-h-[477px]">
            {/* Left side - Text content and button */}
            <div className="flex flex-col gap-[72px] items-start justify-center shrink-0 w-full md:w-[600px]">
              <div className="flex flex-col gap-[22px] items-start">
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
              
              {/* Next button */}
              <button
                onClick={nextTestimonial}
                className="bg-earle-black text-white px-[10px] py-[10px] rounded-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-hookers-green"
                aria-label="Next testimonial"
                type="button"
              >
                <span className="font-montserrat font-bold text-lg">Next</span>
              </button>
            </div>
            
            {/* Right side - Image (bleeds to edge) */}
            <div 
              className="overflow-hidden relative shrink-0 w-full md:w-[495px] hidden md:block h-[476px]"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="absolute inset-0 overflow-hidden">
                {/* Primary image */}
                {currentTestimonial.image && (
                  <img
                    src={currentTestimonial.image}
                    alt={`${currentTestimonial.name} - Customer testimonial`}
                    className={`absolute h-[143.73%] left-[-1.62%] top-[-43.73%] w-[103.59%] object-cover transition-opacity duration-1000 ease-in-out ${isHovering && currentTestimonial.image2 ? 'opacity-0' : 'opacity-100'}`}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                )}
                {/* Hover image */}
                {currentTestimonial.image2 && (
                  <img
                    src={currentTestimonial.image2}
                    alt={`${currentTestimonial.name} - After`}
                    className={`absolute h-[143.73%] left-[-1.62%] top-[-43.73%] w-[103.59%] object-cover transition-opacity duration-1000 ease-in-out ${isHovering ? 'opacity-100' : 'opacity-0'}`}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

