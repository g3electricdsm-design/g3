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
            <Link href="/" className="font-megrim text-2xl text-white focus:ring-2 focus:ring-purple focus:ring-offset-2 rounded transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-phlox hover:drop-shadow-lg">
              <span className="sr-only">G3 Electric</span>
              G3 Electric
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4" role="menubar">
              <Link 
                href="/services" 
                className={`px-3 py-2 rounded-md text-base font-medium focus:ring-2 focus:ring-purple focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105 ${
                  currentPath.startsWith('/services') 
                    ? 'text-white bg-gradient-to-r from-purple to-phlox shadow-lg shadow-purple/25' 
                    : 'text-white-smoke hover:text-white hover:bg-purple/20 hover:shadow-md hover:shadow-purple/10'
                }`} 
                role="menuitem"
              >
                Services
              </Link>
              <Link 
                href="/portfolio" 
                className={`px-3 py-2 rounded-md text-base font-medium focus:ring-2 focus:ring-purple focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105 ${
                  currentPath.startsWith('/portfolio') 
                    ? 'text-white bg-gradient-to-r from-purple to-phlox shadow-lg shadow-purple/25' 
                    : 'text-white-smoke hover:text-white hover:bg-purple/20 hover:shadow-md hover:shadow-purple/10'
                }`} 
                role="menuitem"
              >
                Portfolio
              </Link>
              <Link 
                href="/about" 
                className={`px-3 py-2 rounded-md text-base font-medium focus:ring-2 focus:ring-purple focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105 ${
                  currentPath.startsWith('/about') 
                    ? 'text-white bg-gradient-to-r from-purple to-phlox shadow-lg shadow-purple/25' 
                    : 'text-white-smoke hover:text-white hover:bg-purple/20 hover:shadow-md hover:shadow-purple/10'
                }`} 
                role="menuitem"
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className={`px-3 py-2 rounded-md text-base font-medium focus:ring-2 focus:ring-purple focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105 ${
                  currentPath.startsWith('/contact') 
                    ? 'text-white bg-gradient-to-r from-purple to-phlox shadow-lg shadow-purple/25' 
                    : 'text-white-smoke hover:text-white hover:bg-purple/20 hover:shadow-md hover:shadow-purple/10'
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
