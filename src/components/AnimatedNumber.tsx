'use client';

import { useState, useEffect, useRef } from 'react';

interface AnimatedNumberProps {
  target: number;
  suffix?: string;
  duration?: number;
  slowEnd?: boolean;
}

export default function AnimatedNumber({ target, suffix = '', duration = 2000, slowEnd = false }: AnimatedNumberProps) {
  const [count, setCount] = useState(1);
  const hasStartedRef = useRef(false);
  const observerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const startCounting = () => {
      const startTime = Date.now();
      const startValue = 1;
      const endValue = target;

      const easeOutSlow = (t: number) => {
        if (t < 0.6) {
          return t * 0.6 / 0.6;
        } else {
          const remaining = t - 0.6;
          const remainingProgress = remaining / 0.4;
          return 0.6 + (remainingProgress * remainingProgress * remainingProgress * 0.4);
        }
      };

      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

      const easingFunction = slowEnd ? easeOutSlow : easeOutCubic;

      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easedProgress = easingFunction(progress);
        const currentValue = Math.floor(startValue + (endValue - startValue) * easedProgress);

        const displayValue = Math.min(currentValue, endValue);
        setCount(displayValue);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setCount(endValue);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    };

    const node = observerRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStartedRef.current) {
            hasStartedRef.current = true;
            startCounting();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [target, duration, slowEnd]);

  return (
    <div ref={observerRef} className="font-montserrat text-4xl md:text-5xl font-black text-purple mb-2">
      {count}{suffix}
    </div>
  );
}
