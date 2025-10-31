'use client';

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { StarIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
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
        
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="bg-white rounded-lg shadow-sm p-8 md:p-12 relative"
            key={currentTestimonialIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-6">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>
            
            <blockquote className="font-raleway text-lg md:text-xl mb-8 italic leading-relaxed text-earle-black">
              &ldquo;{currentTestimonial.text}&rdquo;
            </blockquote>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-purple shadow-lg">
                  <Image 
                    src={`/images/testimonials/${currentTestimonial.name.toLowerCase().replace(/\s+/g, '-')}.jpg`}
                    alt={`${currentTestimonial.name} - Customer testimonial`}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to initials if image doesn't exist
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-purple to-phlox flex items-center justify-center text-white font-montserrat font-bold text-xl">${currentTestimonial.name.split(' ').map(n => n[0]).join('')}</div>`;
                      }
                    }}
                  />
                </div>
                <div>
                  <div className="font-montserrat font-semibold text-lg text-earle-black">{currentTestimonial.name}</div>
                  <div className="font-raleway text-earle-black">{currentTestimonial.location}</div>
                  <div className="font-raleway font-medium text-purple">{currentTestimonial.project}</div>
                </div>
              </div>
              
              <button
                onClick={nextTestimonial}
                className="bg-purple text-white p-3 rounded-full hover:bg-phlox transition-colors shadow-md hover:shadow-lg border-2 border-purple focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-2"
                aria-label="Next testimonial"
                type="button"
              >
                <ChevronRightIcon className="h-6 w-6 text-white" />
              </button>
            </div>
            
            <div className="flex justify-center mt-6">
              <div className="flex space-x-2">
                {allTestimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonialIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-2 ${
                      index === currentTestimonialIndex ? 'bg-purple' : 'bg-gray-500'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                    type="button"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

