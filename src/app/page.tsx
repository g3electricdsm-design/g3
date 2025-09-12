'use client';

import Link from "next/link";
import Image from "next/image";
import { BoltIcon, StarIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Navigation from "@/components/Navigation";
import PixelZapAnimation from "@/components/PixelZapAnimation";
import { getContent } from "@/data/content";
import { getAllTestimonials } from "@/data/testimonials";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'animate.css';

export default function Home() {
  const content = getContent().homepage;
  const allTestimonials = getAllTestimonials();
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  
  const currentTestimonial = allTestimonials[currentTestimonialIndex];
  
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  }, []);
  
  // Scroll-based animations for parallax effects
  const { scrollYProgress } = useScroll();
  
  // Hero parallax - background moves slower than content
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  
  // Services section parallax
  const servicesY = useTransform(scrollYProgress, [0.2, 0.8], [0, -50]);
  const servicesOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  
  // Testimonials parallax
  const testimonialsY = useTransform(scrollYProgress, [0.4, 0.9], [0, -30]);
  const testimonialsScale = useTransform(scrollYProgress, [0.4, 0.9], [1, 1.05]);
  
  // CTA section parallax
  const ctaY = useTransform(scrollYProgress, [0.6, 1], [0, -40]);
  const ctaOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  
  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % allTestimonials.length);
  };
  return (
    <div className="min-h-screen bg-earle-black">
      {/* Pixel Zap Animation */}
      <PixelZapAnimation />
      
      {/* Navigation */}
      <Navigation currentPath="/" />

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Hero Background Image with Enhanced Parallax */}
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ y: heroY, scale: heroScale }}
        >
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
        </motion.div>
        
        {/* Hero Content Overlay with Staggered Animations */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1 
              className="font-megrim text-6xl md:text-8xl lg:text-9xl mb-6 text-white drop-shadow-2xl"
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 1.2, 
                ease: "easeOut",
                delay: 0.2
              }}
            >
              {content.hero.title}
            </motion.h1>
            <motion.h2 
              className="font-montserrat text-3xl md:text-4xl lg:text-5xl mb-8 font-light text-white drop-shadow-xl"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 1, 
                ease: "easeOut",
                delay: 0.6
              }}
            >
              {content.hero.subtitle}
            </motion.h2>
            <motion.p 
              className="font-raleway text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-white drop-shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 1, 
                ease: "easeOut",
                delay: 1
              }}
            >
              {content.hero.description}
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 1, 
                ease: "easeOut",
                delay: 1.4
              }}
            >
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(109, 0, 145, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Link 
                  href="/contact" 
                  className="btn-primary text-sm sm:text-lg shadow-2xl w-full sm:w-auto block"
                >
                  {content.hero.ctaPrimary}
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(255, 255, 255, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Link 
                  href="/portfolio" 
                  className="btn-secondary text-sm sm:text-lg shadow-2xl border-white text-white hover:bg-white hover:text-purple w-full sm:w-auto block"
                >
                  {content.hero.ctaSecondary}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Preview with Parallax Effects */}
      <motion.section 
        className="py-20 bg-earle-black relative overflow-hidden"
        style={{ y: servicesY }}
      >
        {/* Background parallax elements */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{ 
            background: "radial-gradient(circle at 20% 50%, rgba(109, 0, 145, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(109, 0, 145, 0.2) 0%, transparent 50%)",
            y: useTransform(scrollYProgress, [0.2, 0.8], [0, -100])
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-16"
            data-aos="fade-up"
            data-aos-duration="1000"
            style={{ opacity: servicesOpacity }}
          >
            <h2 className="font-montserrat text-4xl text-white mb-4">{content.services.title}</h2>
            <p className="font-raleway text-lg text-white-smoke max-w-2xl mx-auto">
              {content.services.description}
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.services.items.map((service, index) => (
              <motion.div 
                key={index} 
                className="bg-white-smoke rounded-lg shadow-sm text-center hover:shadow-md transition-shadow overflow-hidden"
                data-aos="fade-up"
                data-aos-delay={index * 200}
                data-aos-duration="800"
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20 
                }}
              >
                <motion.div 
                  className="h-32 bg-gradient-to-br from-purple/20 to-phlox/20 flex items-center justify-center"
                  whileHover={{ 
                    background: "linear-gradient(135deg, rgba(109, 0, 145, 0.3), rgba(109, 0, 145, 0.5))"
                  }}
                >
                  <motion.div
                    whileHover={{ 
                      rotate: 360,
                      scale: 1.2
                    }}
                    transition={{ 
                      duration: 0.6,
                      ease: "easeInOut"
                    }}
                  >
                    <BoltIcon className="h-12 w-12 text-purple" />
                  </motion.div>
                </motion.div>
                <div className="p-6">
                  <h3 className="font-montserrat text-xl font-semibold text-earle-black mb-2">{service.title}</h3>
                  <p className="font-raleway text-earle-black">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section with Parallax */}
      <motion.section 
        className="py-20 bg-white-smoke relative overflow-hidden"
        style={{ y: testimonialsY, scale: testimonialsScale }}
      >
        {/* Floating background elements */}
        <motion.div 
          className="absolute top-10 left-10 w-32 h-32 bg-purple/5 rounded-full"
          style={{ 
            y: useTransform(scrollYProgress, [0.4, 0.9], [0, -80]),
            x: useTransform(scrollYProgress, [0.4, 0.9], [0, 20])
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-24 h-24 bg-phlox/5 rounded-full"
          style={{ 
            y: useTransform(scrollYProgress, [0.4, 0.9], [0, 60]),
            x: useTransform(scrollYProgress, [0.4, 0.9], [0, -30])
          }}
        />
        
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
            <div className="bg-white rounded-lg shadow-sm p-8 md:p-12 relative">
              <div className="flex items-center mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="font-raleway text-lg md:text-xl mb-8 italic leading-relaxed" style={{color: '#242729'}}>
                &ldquo;{currentTestimonial.text}&rdquo;
              </blockquote>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-purple shadow-lg">
                    <Image 
                      src={`/images/testimonials/${currentTestimonial.name.toLowerCase().replace(' ', '-')}.jpg`}
                      alt={currentTestimonial.name}
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
                    <div className="font-montserrat font-semibold text-lg" style={{color: '#242729'}}>{currentTestimonial.name}</div>
                    <div className="font-raleway" style={{color: '#242729'}}>{currentTestimonial.location}</div>
                    <div className="font-raleway font-medium" style={{color: '#6D0091'}}>{currentTestimonial.project}</div>
                  </div>
                </div>
                
                <button
                  onClick={nextTestimonial}
                  className="bg-purple text-white p-3 rounded-full hover:bg-phlox transition-colors shadow-md hover:shadow-lg border-2 border-purple"
                  aria-label="Next testimonial"
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
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentTestimonialIndex ? 'bg-purple' : 'bg-gray-500'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section with Parallax */}
      <motion.section 
        className="py-20 bg-earle-black text-white relative overflow-hidden"
        style={{ y: ctaY, opacity: ctaOpacity }}
      >
        {/* Animated background gradient */}
        <motion.div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(45deg, rgba(109, 0, 145, 0.1) 0%, rgba(109, 0, 145, 0.05) 50%, rgba(109, 0, 145, 0.1) 100%)",
            y: useTransform(scrollYProgress, [0.6, 1], [0, -60])
          }}
        />
        
        {/* Floating particles */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple/30 rounded-full"
          style={{ 
            y: useTransform(scrollYProgress, [0.6, 1], [0, -40]),
            x: useTransform(scrollYProgress, [0.6, 1], [0, 30])
          }}
        />
        <motion.div 
          className="absolute top-3/4 right-1/4 w-3 h-3 bg-phlox/40 rounded-full"
          style={{ 
            y: useTransform(scrollYProgress, [0.6, 1], [0, 50]),
            x: useTransform(scrollYProgress, [0.6, 1], [0, -20])
          }}
        />
        <motion.div 
          className="absolute top-1/2 right-1/3 w-1 h-1 bg-white/50 rounded-full"
          style={{ 
            y: useTransform(scrollYProgress, [0.6, 1], [0, -20]),
            x: useTransform(scrollYProgress, [0.6, 1], [0, 40])
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2 
            className="font-montserrat text-4xl mb-6 text-white"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            {content.cta.title}
          </motion.h2>
          <motion.p 
            className="font-raleway text-lg mb-8 max-w-2xl mx-auto text-white-smoke"
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="1000"
          >
            {content.cta.description}
          </motion.p>
          <motion.div
            data-aos="fade-up"
            data-aos-delay="400"
            data-aos-duration="1000"
          >
            <Link 
              href="/contact" 
              className="btn-primary inline-block text-sm sm:text-base"
            >
              {content.cta.buttonText}
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-12" style={{backgroundColor: '#70877F'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="font-megrim text-2xl text-white mb-4">G3 Electric</h3>
            <p className="font-raleway text-white-smoke mb-4">Safe & Dependable Electrical Services</p>
            <div className="flex justify-center space-x-6">
              <Link href="/services" className="text-white-smoke hover:text-purple font-raleway">Services</Link>
              <Link href="/portfolio" className="text-white-smoke hover:text-purple font-raleway">Portfolio</Link>
              <Link href="/pricing" className="text-white-smoke hover:text-purple font-raleway">Pricing</Link>
              <Link href="/about" className="text-white-smoke hover:text-purple font-raleway">About</Link>
              <Link href="/contact" className="text-white-smoke hover:text-purple font-raleway">Contact</Link>
              <Link href="/pay" className="text-purple hover:text-phlox font-raleway font-semibold">Pay Bill</Link>
            </div>
            <div className="mt-6 pt-4 border-t border-white/20">
              <p className="text-white-smoke text-sm">
                This digital experience was built by{' '}
                <a 
                  href="https://sensory.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-purple hover:text-phlox transition-colors font-medium"
                >
                  Sensory
                </a>
                , a UX-first company.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
