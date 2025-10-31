'use client';

import Link from "next/link";
import Image from "next/image";
import { BoltIcon } from "@heroicons/react/24/outline";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import SimplePixelZap from "@/components/SimplePixelZap";
import { getContent } from "@/data/content";
import { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'animate.css';

export default function Home() {
  const content = getContent().homepage;
  
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
  return (
    <div className="min-h-screen bg-earle-black">
      {/* Pixel Zap Animation */}
      <SimplePixelZap />
      
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
            src="/images/bathroom-lighting.jpeg"
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
        <div className="absolute inset-0 flex items-start justify-center pt-[200px]">
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
                  className="h-32 bg-gradient-to-br from-purple/60 to-phlox/60 flex items-center justify-center"
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

      {/* Testimonials Section */}
      <TestimonialCarousel 
        testimonialsY={testimonialsY}
        testimonialsScale={testimonialsScale}
        scrollYProgress={scrollYProgress}
      />

      {/* CTA Section */}
      <section className="py-20 bg-earle-black text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-montserrat text-4xl mb-6 text-white">
            {content.cta.title}
          </h2>
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
      <Footer currentPath="/" />
    </div>
  );
}
