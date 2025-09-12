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

  const createPixel = (x: number, y: number) => {
    const size = Math.random() * 4 + 2;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 3 + 1;
    
    return {
      id: pixelIdRef.current++,
      x,
      y,
      size,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0,
      maxLife: Math.random() * 60 + 30,
      velocity: {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed,
      },
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isHovering) return;
    
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create pixels
    const pixelCount = Math.random() * 3 + 2;
    const newPixels: Pixel[] = [];
    
    for (let i = 0; i < pixelCount; i++) {
      const offsetX = (Math.random() - 0.5) * 20;
      const offsetY = (Math.random() - 0.5) * 20;
      newPixels.push(createPixel(x + offsetX, y + offsetY));
    }
    
    setPixels(prev => [...prev, ...newPixels]);
  };

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
            velocity: {
              x: pixel.velocity.x * 0.98,
              y: pixel.velocity.y * 0.98 + 0.1,
            },
          }))
          .filter(pixel => pixel.life < pixel.maxLife)
      );
    };

    const interval = setInterval(animate, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-50"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        console.log('Mouse entered');
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        console.log('Mouse left');
        setIsHovering(false);
      }}
    >
      {/* Debug info */}
      <div className="fixed top-4 right-4 bg-red-500 text-white p-2 rounded text-xs pointer-events-auto z-50">
        Pixels: {pixels.length} | Hover: {isHovering ? 'Yes' : 'No'}
      </div>
      
      {/* Pixels */}
      {pixels.map(pixel => (
        <div
          key={pixel.id}
          className="absolute rounded-sm"
          style={{
            left: pixel.x - pixel.size / 2,
            top: pixel.y - pixel.size / 2,
            width: pixel.size,
            height: pixel.size,
            backgroundColor: pixel.color,
            boxShadow: `0 0 ${pixel.size * 2}px ${pixel.color}`,
            opacity: 1 - (pixel.life / pixel.maxLife),
            transform: `scale(${1 - (pixel.life / pixel.maxLife) * 0.5})`,
          }}
        />
      ))}
    </div>
  );
}
