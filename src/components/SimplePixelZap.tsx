'use client';

import { useEffect, useRef, useState } from 'react';

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
  '#6D0091', // purple - primary brand color
  '#C636FF', // phlox - secondary brand color  
  '#70877F', // hookers-green - accent color
  '#F2F2F2', // white-smoke - light accent
  '#6D0091', // purple again for more variety
  '#C636FF', // phlox again for more variety
  '#70877F', // hookers-green again for more variety
];

export default function SimplePixelZap() {
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pixelIdRef = useRef(0);
  const lastZapTime = useRef(0);

  // Global mouse event listeners
  useEffect(() => {
    const createPixel = (x: number, y: number) => {
      const size = Math.random() * 3 + 1; // Smaller particles
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 4; // Faster movement
      
      return {
        id: pixelIdRef.current++,
        x,
        y,
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
        maxLife: Math.random() * 25 + 15, // Longer life (15-40 frames)
        velocity: {
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed,
        },
      };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering) return;
      
      const now = Date.now();
      // Throttle zaps to every 50ms for burst effect
      if (now - lastZapTime.current < 50) return;
      lastZapTime.current = now;
      
      const x = e.clientX;
      const y = e.clientY;
      
      // Only create particles if mouse is within viewport bounds
      if (x < 0 || y < 0 || x > window.innerWidth || y > window.innerHeight) return;
      
      // Create zap burst - more particles, tighter spread
      const pixelCount = Math.random() * 8 + 4; // 4-12 particles per burst
      const newPixels: Pixel[] = [];
      
      for (let i = 0; i < pixelCount; i++) {
        const offsetX = (Math.random() - 0.5) * 12; // Tighter spread
        const offsetY = (Math.random() - 0.5) * 12;
        newPixels.push(createPixel(x + offsetX, y + offsetY));
      }
      
      setPixels(prev => [...prev, ...newPixels]);
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    // Add global event listeners with capture phase to ensure they work everywhere
    document.addEventListener('mouseenter', handleMouseEnter, { capture: true, passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { capture: true, passive: true });
    document.addEventListener('mousemove', handleMouseMove, { capture: true, passive: true });
    
    // Also add to window to ensure full coverage
    window.addEventListener('mouseenter', handleMouseEnter, { capture: true, passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { capture: true, passive: true });
    window.addEventListener('mousemove', handleMouseMove, { capture: true, passive: true });

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter, { capture: true });
      document.removeEventListener('mouseleave', handleMouseLeave, { capture: true });
      document.removeEventListener('mousemove', handleMouseMove, { capture: true });
      
      window.removeEventListener('mouseenter', handleMouseEnter, { capture: true });
      window.removeEventListener('mouseleave', handleMouseLeave, { capture: true });
      window.removeEventListener('mousemove', handleMouseMove, { capture: true });
    };
  }, [isHovering]);

  // Animation loop - faster for zaps
  useEffect(() => {
    const animate = () => {
      setPixels(prevPixels => 
        prevPixels
          .map(pixel => ({
            ...pixel,
            x: pixel.x + pixel.velocity.x,
            y: pixel.y + pixel.velocity.y,
            life: pixel.life + 1,
            velocity: {
              x: pixel.velocity.x * 0.88, // Less friction for longer movement
              y: pixel.velocity.y * 0.88 + 0.1, // Reduced gravity
            },
          }))
          .filter(pixel => pixel.life < pixel.maxLife)
      );
    };

    const interval = setInterval(animate, 8); // Faster animation (120fps)
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      style={{ 
        background: 'transparent',
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
    >
      
      {/* Zap Particles */}
      {pixels.map(pixel => (
        <div
          key={pixel.id}
          className="absolute"
          style={{
            left: pixel.x - pixel.size / 2,
            top: pixel.y - pixel.size / 2,
            width: pixel.size,
            height: pixel.size,
            backgroundColor: pixel.color,
            borderRadius: '50%',
            boxShadow: `0 0 ${pixel.size * 6}px ${pixel.color}, 0 0 ${pixel.size * 12}px ${pixel.color}60, 0 0 ${pixel.size * 18}px ${pixel.color}30`,
            opacity: Math.max(0, 1 - (pixel.life / pixel.maxLife) * 2), // Quick fade
            transform: `scale(${1 + Math.sin(pixel.life * 0.8) * 0.4})`, // Enhanced pulsing
            filter: 'brightness(1.8) contrast(1.4) saturate(1.2)',
            border: `1px solid ${pixel.color}80`,
          }}
        />
      ))}
    </div>
  );
}
