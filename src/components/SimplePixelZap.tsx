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

const colors = ['#6D0091', '#B8860B', '#00FF00', '#00FFFF', '#FF00FF', '#FFFF00', '#FF6B00', '#00BFFF'];

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
        maxLife: Math.random() * 15 + 5, // Much shorter life (5-20 frames)
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
      console.log('Mouse entered page');
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      console.log('Mouse left page');
      setIsHovering(false);
    };

    // Add global event listeners
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    document.addEventListener('mousemove', handleMouseMove, true);

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      document.removeEventListener('mousemove', handleMouseMove, true);
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
              x: pixel.velocity.x * 0.85, // More friction for quick stop
              y: pixel.velocity.y * 0.85 + 0.2, // Slight gravity
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
      className="fixed inset-0 pointer-events-none z-50"
      style={{ 
        background: 'transparent'
      }}
    >
      {/* Debug info */}
      <div className="fixed top-4 right-4 bg-red-500 text-white p-2 rounded text-xs pointer-events-auto z-50">
        Pixels: {pixels.length} | Hover: {isHovering ? 'Yes' : 'No'}
      </div>
      
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
            boxShadow: `0 0 ${pixel.size * 4}px ${pixel.color}, 0 0 ${pixel.size * 8}px ${pixel.color}40`,
            opacity: Math.max(0, 1 - (pixel.life / pixel.maxLife) * 2), // Quick fade
            transform: `scale(${1 + Math.sin(pixel.life * 0.5) * 0.3})`, // Pulsing effect
            filter: 'brightness(1.5) contrast(1.2)',
          }}
        />
      ))}
    </div>
  );
}
