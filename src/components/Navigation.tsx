import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

interface NavigationProps {
  currentPath: string;
}

export default function Navigation({ currentPath }: NavigationProps) {
  return (
    <nav className="bg-earle-black shadow-sm border-b border-gray-200" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="focus:ring-2 focus:ring-purple focus:ring-offset-2 rounded transition-all duration-300 ease-in-out transform hover:scale-105 hover:drop-shadow-lg">
              <span className="sr-only">G3 Electric</span>
              <Image
                src="/logos/g3-electric-white-sm.svg"
                alt="G3 Electric"
                width={48}
                height={38}
                className="w-12 h-auto"
                priority
              />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4" role="menubar">
              <Link 
                href="/services" 
                className={`px-3 py-2 text-base font-medium font-montserrat focus:ring-2 focus:ring-purple focus:ring-offset-2 transition-colors duration-200 border-b-2 ${
                  currentPath.startsWith('/services') 
                    ? 'text-white border-phlox' 
                    : 'text-white-smoke border-transparent hover:text-phlox'
                }`} 
                role="menuitem"
              >
                Services
              </Link>
              <Link 
                href="/portfolio" 
                className={`px-3 py-2 text-base font-medium font-montserrat focus:ring-2 focus:ring-purple focus:ring-offset-2 transition-colors duration-200 border-b-2 ${
                  currentPath.startsWith('/portfolio') 
                    ? 'text-white border-phlox' 
                    : 'text-white-smoke border-transparent hover:text-phlox'
                }`} 
                role="menuitem"
              >
                Portfolio
              </Link>
              <Link 
                href="/about" 
                className={`px-3 py-2 text-base font-medium font-montserrat focus:ring-2 focus:ring-purple focus:ring-offset-2 transition-colors duration-200 border-b-2 ${
                  currentPath.startsWith('/about') 
                    ? 'text-white border-phlox' 
                    : 'text-white-smoke border-transparent hover:text-phlox'
                }`} 
                role="menuitem"
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className={`px-3 py-2 text-base font-medium font-montserrat focus:ring-2 focus:ring-purple focus:ring-offset-2 transition-colors duration-200 border-b-2 ${
                  currentPath.startsWith('/contact') 
                    ? 'text-white border-phlox' 
                    : 'text-white-smoke border-transparent hover:text-phlox'
                }`} 
                role="menuitem"
              >
                Contact
              </Link>
            </div>
          </div>
          
          {/* Mobile menu */}
          <MobileMenu currentPath={currentPath} />
        </div>
      </div>
    </nav>
  );
}
