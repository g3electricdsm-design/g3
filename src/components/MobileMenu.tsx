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
    { name: 'Pay Bill', href: '/pay' },
  ];

  const isCurrentPath = (path: string) => {
    return currentPath.startsWith(path);
  };

  return (
    <div className="md:hidden">
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

      {/* Mobile menu - CACHE BUSTING VERSION */}
      <div
        className={`${isOpen ? 'block' : 'hidden'} absolute top-16 left-0 right-0 z-50`}
        style={{ 
          backgroundColor: '#1a1a1a', 
          opacity: 1, 
          zIndex: 9999, 
          position: 'absolute',
          borderBottom: '2px solid #6D0091',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                isCurrentPath(item.href)
                  ? 'text-white bg-purple/30 border-l-4 border-purple shadow-md'
                  : 'text-white hover:text-white hover:bg-purple/20 hover:shadow-sm'
              }`}
              style={{ color: isCurrentPath(item.href) ? '#ffffff' : '#ffffff' }}
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
