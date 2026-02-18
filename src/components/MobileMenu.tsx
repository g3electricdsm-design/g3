'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileMenuProps {
  currentPath: string;
}

export default function MobileMenu({ currentPath }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
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

      {/* Mobile menu - Full screen overlay with slide-in animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'calc(100dvh - 64px)' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed top-16 left-0 right-0 z-50 overflow-hidden"
            style={{ backgroundColor: '#242729' }}
            id="mobile-menu"
          >
            <div className="flex items-center justify-center h-full px-4 overflow-y-auto">
              <div className="flex flex-col space-y-12">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className={`text-5xl text-white font-montserrat transition-all duration-300 ${
                      isCurrentPath(item.href) 
                        ? 'font-bold' 
                        : 'font-normal group-hover:font-bold'
                    }`}>
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
