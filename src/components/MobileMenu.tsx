'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

interface MobileMenuProps {
  currentPath: string;
}

export default function MobileMenu({ currentPath }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isCurrentPath = (path: string) => {
    return currentPath.startsWith(path);
  };

  return (
    <div className="md:hidden">
      <style jsx>{`
        @keyframes particleIn {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(-20px);
            filter: blur(10px) brightness(200%);
          }
          15% {
            opacity: 0.2;
            transform: scale(0.5) translateY(-15px) rotate(5deg);
            filter: blur(8px) brightness(180%);
          }
          30% {
            opacity: 0.4;
            transform: scale(0.7) translateY(-10px) rotate(-3deg);
            filter: blur(6px) brightness(160%);
          }
          45% {
            opacity: 0.6;
            transform: scale(0.85) translateY(-5px) rotate(2deg);
            filter: blur(4px) brightness(140%);
          }
          60% {
            opacity: 0.8;
            transform: scale(0.95) translateY(-2px) rotate(-1deg);
            filter: blur(2px) brightness(120%);
          }
          75% {
            opacity: 0.9;
            transform: scale(0.98) translateY(-1px) rotate(0.5deg);
            filter: blur(1px) brightness(110%);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0) rotate(0deg);
            filter: blur(0px) brightness(100%);
          }
        }
        
        @keyframes particleOut {
          0% {
            opacity: 1;
            transform: scale(1) translateY(0) rotate(0deg);
            filter: blur(0px) brightness(100%);
          }
          15% {
            opacity: 0.9;
            transform: scale(0.98) translateY(-1px) rotate(0.5deg);
            filter: blur(1px) brightness(110%);
          }
          30% {
            opacity: 0.8;
            transform: scale(0.95) translateY(-2px) rotate(-1deg);
            filter: blur(2px) brightness(120%);
          }
          45% {
            opacity: 0.6;
            transform: scale(0.85) translateY(-5px) rotate(2deg);
            filter: blur(4px) brightness(140%);
          }
          60% {
            opacity: 0.4;
            transform: scale(0.7) translateY(-10px) rotate(-3deg);
            filter: blur(6px) brightness(160%);
          }
          75% {
            opacity: 0.2;
            transform: scale(0.5) translateY(-15px) rotate(5deg);
            filter: blur(8px) brightness(180%);
          }
          100% {
            opacity: 0;
            transform: scale(0.3) translateY(-20px);
            filter: blur(10px) brightness(200%);
          }
        }
      `}</style>
      {/* Mobile menu button */}
      <button
        type="button"
        className={`inline-flex items-center justify-center p-2 rounded-md text-white-smoke focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple transition-all duration-200 ${
          isOpen 
            ? 'bg-purple/20 text-purple shadow-lg' 
            : 'hover:text-purple hover:bg-purple/10'
        }`}
        aria-controls="mobile-menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="sr-only">Open main menu</span>
        {isOpen ? (
          <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
        ) : (
          <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
        )}
      </button>

      {/* Mobile menu with smooth transitions */}
      <div
        className={`absolute top-16 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ 
          backgroundColor: '#242729', 
          zIndex: 9999, 
          position: 'absolute',
          borderBottom: '2px solid #6D0091',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          width: '100%',
          left: '0',
          right: '0',
          animation: isOpen ? 'particleIn 0.7s ease-in-out' : 'particleOut 0.7s ease-in-out'
        }}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navigation.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-700 ease-in-out ${
                isCurrentPath(item.href)
                  ? 'text-white bg-purple/30 border-l-4 border-purple shadow-md'
                  : 'text-white hover:text-white hover:bg-purple/20 hover:shadow-sm'
              } ${isOpen ? 'opacity-100' : 'opacity-0'}`}
              style={{ 
                color: isCurrentPath(item.href) ? '#ffffff' : '#ffffff',
                transitionDelay: isOpen ? `${index * 50}ms` : '0ms'
              }}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
