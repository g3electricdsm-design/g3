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
            <Link href="/" className="font-megrim text-2xl text-white focus:ring-2 focus:ring-purple focus:ring-offset-2 rounded">
              <span className="sr-only">G3 Electric</span>
              G3 Electric
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4" role="menubar">
              <Link 
                href="/" 
                className={`px-3 py-2 rounded-md text-sm font-medium focus:ring-2 focus:ring-purple focus:ring-offset-2 transition-colors ${
                  currentPath === '/' 
                    ? 'text-purple bg-purple/10' 
                    : 'text-white-smoke hover:text-purple'
                }`} 
                role="menuitem"
              >
                Home
              </Link>
              <Link 
                href="/services" 
                className={`px-3 py-2 rounded-md text-sm font-medium focus:ring-2 focus:ring-purple focus:ring-offset-2 transition-colors ${
                  currentPath.startsWith('/services') 
                    ? 'text-purple bg-purple/10' 
                    : 'text-white-smoke hover:text-purple'
                }`} 
                role="menuitem"
              >
                Services
              </Link>
              <Link 
                href="/portfolio" 
                className={`px-3 py-2 rounded-md text-sm font-medium focus:ring-2 focus:ring-purple focus:ring-offset-2 transition-colors ${
                  currentPath.startsWith('/portfolio') 
                    ? 'text-purple bg-purple/10' 
                    : 'text-white-smoke hover:text-purple'
                }`} 
                role="menuitem"
              >
                Portfolio
              </Link>
              <Link 
                href="/pricing" 
                className={`px-3 py-2 rounded-md text-sm font-medium focus:ring-2 focus:ring-purple focus:ring-offset-2 transition-colors ${
                  currentPath.startsWith('/pricing') 
                    ? 'text-purple bg-purple/10' 
                    : 'text-white-smoke hover:text-purple'
                }`} 
                role="menuitem"
              >
                Pricing
              </Link>
              <Link 
                href="/about" 
                className={`px-3 py-2 rounded-md text-sm font-medium focus:ring-2 focus:ring-purple focus:ring-offset-2 transition-colors ${
                  currentPath.startsWith('/about') 
                    ? 'text-purple bg-purple/10' 
                    : 'text-white-smoke hover:text-purple'
                }`} 
                role="menuitem"
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className={`px-3 py-2 rounded-md text-sm font-medium focus:ring-2 focus:ring-purple focus:ring-offset-2 transition-colors ${
                  currentPath.startsWith('/contact') 
                    ? 'text-purple bg-purple/10' 
                    : 'text-white-smoke hover:text-purple'
                }`} 
                role="menuitem"
              >
                Contact
              </Link>
              <Link 
                href="/pay" 
                className="bg-purple text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-phlox focus:ring-2 focus:ring-purple focus:ring-offset-2 transition-colors" 
                role="menuitem"
              >
                Pay Bill
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
