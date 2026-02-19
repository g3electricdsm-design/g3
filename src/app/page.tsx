'use client';

import Link from "next/link";
import Image from "next/image";
import { BoltIcon } from "@heroicons/react/24/outline";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedNumber from "@/components/AnimatedNumber";
import { getContent } from "@/data/content";
import { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import 'aos/dist/aos.css';

const TestimonialCarousel = dynamic(
  () => import("@/components/TestimonialCarousel"),
  { ssr: false }
);

const SimplePixelZap = dynamic(
  () => import("@/components/SimplePixelZap"),
  { ssr: false, loading: () => null }
);

export default function Home() {
  const content = getContent().homepage;
  
  useEffect(() => {
    import('aos').then((AOS) => {
      AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
      });
    });
  }, []);
  
  // Scroll-based animations for parallax effects
  const { scrollYProgress } = useScroll();
  
  // Hero parallax - background moves slower than content
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  
  // Services section (no scroll-based opacity so content stays visible)
  
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
        <div className="absolute inset-0 flex items-start justify-center pt-20 sm:pt-28 md:pt-36 lg:pt-44">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1 
              className="font-megrim text-fluid-hero mb-6 text-white drop-shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 1.2, 
                ease: "easeOut",
                delay: 0.2
              }}
            >
              {content.hero.title}
            </motion.h1>
            <motion.h2 
              className="font-montserrat text-fluid-sub mb-8 font-normal text-white drop-shadow-xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 1, 
                ease: "easeOut",
                delay: 0.4
              }}
            >
              {content.hero.subtitle}
            </motion.h2>
            <motion.p 
              className="font-raleway text-fluid-body mb-12 max-w-4xl mx-auto text-white drop-shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 1, 
                ease: "easeOut",
                delay: 0.6
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
                delay: 0.8
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
      <section className="py-20 bg-earle-black relative overflow-hidden">
        {/* Background gradient */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{ 
            background: "radial-gradient(circle at 20% 50%, rgba(109, 0, 145, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(109, 0, 145, 0.2) 0%, transparent 50%)"
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
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
                className="bg-white-smoke rounded-lg text-center overflow-hidden border border-white/10 shadow-lg hover:border-purple/50 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                whileHover={{ 
                  y: -3,
                  scale: 1.01
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                  delay: index * 0.06
                }}
              >
                <motion.div className="relative h-40 sm:h-44 overflow-hidden bg-earle-black">
                  {service.image ? (
                    <Image
                      src={service.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-purple/60 to-phlox/60 flex items-center justify-center">
                      <BoltIcon className="h-12 w-12 text-purple" />
                    </div>
                  )}
                </motion.div>
                <div className="p-6">
                  <h3 className="font-montserrat text-xl font-semibold text-earle-black mb-2">{service.title}</h3>
                  <p className="font-raleway text-earle-black">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* By the Numbers Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <AnimatedNumber target={10} suffix="+" duration={4000} slowEnd={true} />
              <div className="font-montserrat text-lg font-semibold text-white">Years Experience</div>
            </div>
            <div className="text-center">
              <AnimatedNumber target={1000} suffix="+" duration={3000} />
              <div className="font-montserrat text-lg font-semibold text-white">Projects Completed</div>
            </div>
            <div className="text-center">
              <AnimatedNumber target={100} suffix="%" duration={4000} slowEnd={true} />
              <div className="font-montserrat text-lg font-semibold text-white">Safety Record</div>
            </div>
            <div className="text-center">
              <div className="font-montserrat text-4xl md:text-5xl font-black text-purple mb-2">24/7</div>
              <div className="font-montserrat text-lg font-semibold text-white">Emergency Service</div>
            </div>
          </div>
        </div>
      </section>

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
