'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Pixel {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
  velocity: {
    x: number;
    y: number;
  };
}

const colors = [
  '#6D0091', // purple
  '#B8860B', // phlox
  '#00FF00', // electric green
  '#00FFFF', // cyan
  '#FF00FF', // magenta
  '#FFFF00', // yellow
  '#FF6B00', // orange
  '#00BFFF', // deep sky blue
];

export default function PixelZapAnimation() {
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pixelIdRef = useRef(0);

  const createPixel = useCallback((x: number, y: number) => {
    const size = Math.random() * 4 + 2; // 2-6px
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 3 + 1; // 1-4px per frame
    
    return {
      id: pixelIdRef.current++,
      x,
      y,
      size,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0,
      maxLife: Math.random() * 60 + 30, // 30-90 frames
      velocity: {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed,
      },
    };
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
    
    if (isHovering) {
      // Create multiple pixels in a burst pattern
      const pixelCount = Math.random() * 3 + 2; // 2-5 pixels
      const newPixels: Pixel[] = [];
      
      for (let i = 0; i < pixelCount; i++) {
        const offsetX = (Math.random() - 0.5) * 20;
        const offsetY = (Math.random() - 0.5) * 20;
        newPixels.push(createPixel(x + offsetX, y + offsetY));
      }
      
      setPixels(prev => [...prev, ...newPixels]);
    }
  }, [isHovering, createPixel]);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isHovering, handleMouseMove]);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      setPixels(prevPixels => 
        prevPixels
          .map(pixel => ({
            ...pixel,
            x: pixel.x + pixel.velocity.x,
            y: pixel.y + pixel.velocity.y,
            life: pixel.life + 1,
            // Add some gravity and friction
            velocity: {
              x: pixel.velocity.x * 0.98,
              y: pixel.velocity.y * 0.98 + 0.1,
            },
          }))
          .filter(pixel => pixel.life < pixel.maxLife)
      );
    };

    const interval = setInterval(animate, 16); // ~60fps
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ 
        background: isHovering 
          ? 'radial-gradient(circle at 50% 50%, rgba(109, 0, 145, 0.05) 0%, transparent 70%)'
          : 'transparent'
      }}
    >
      <AnimatePresence>
        {pixels.map(pixel => (
          <motion.div
            key={pixel.id}
            className="absolute rounded-sm"
            style={{
              left: pixel.x - pixel.size / 2,
              top: pixel.y - pixel.size / 2,
              width: pixel.size,
              height: pixel.size,
              backgroundColor: pixel.color,
              boxShadow: `0 0 ${pixel.size * 2}px ${pixel.color}`,
            }}
            initial={{ 
              opacity: 1, 
              scale: 1,
              rotate: 0
            }}
            animate={{ 
              opacity: 1 - (pixel.life / pixel.maxLife),
              scale: 1 - (pixel.life / pixel.maxLife) * 0.5,
              rotate: pixel.life * 2,
            }}
            exit={{ 
              opacity: 0, 
              scale: 0,
            }}
            transition={{
              duration: 0.1,
              ease: "easeOut"
            }}
          />
        ))}
      </AnimatePresence>
      
      {/* Cursor trail effect */}
      {isHovering && (
        <motion.div
          className="absolute w-4 h-4 rounded-full pointer-events-none"
          style={{
            left: mousePosition.x - 8,
            top: mousePosition.y - 8,
            background: 'radial-gradient(circle, rgba(109, 0, 145, 0.8) 0%, rgba(109, 0, 145, 0.4) 50%, transparent 100%)',
            boxShadow: '0 0 20px rgba(109, 0, 145, 0.6)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </div>
  );
}
