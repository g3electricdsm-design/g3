import Link from "next/link";

interface FooterProps {
  currentPath: string;
}

export default function Footer({ currentPath }: FooterProps) {
  const isActive = (path: string) => currentPath === path;
  
  return (
    <footer className="bg-earle-black py-12 border-t border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="font-megrim text-2xl text-white mb-4">G3 Electric</h3>
          <p className="font-raleway text-white-smoke mb-4">Safe & Dependable Electrical Services</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            <Link 
              href="/services" 
              className={`font-raleway transition-colors ${
                isActive('/services') 
                  ? 'text-purple' 
                  : 'text-white-smoke hover:text-purple'
              }`}
            >
              Services
            </Link>
            <Link 
              href="/portfolio" 
              className={`font-raleway transition-colors ${
                isActive('/portfolio') || currentPath.startsWith('/portfolio/')
                  ? 'text-purple' 
                  : 'text-white-smoke hover:text-purple'
              }`}
            >
              Portfolio
            </Link>
            <Link 
              href="/about" 
              className={`font-raleway transition-colors ${
                isActive('/about') 
                  ? 'text-purple' 
                  : 'text-white-smoke hover:text-purple'
              }`}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`font-raleway transition-colors ${
                isActive('/contact') 
                  ? 'text-purple' 
                  : 'text-white-smoke hover:text-purple'
              }`}
            >
              Contact
            </Link>
          </div>
          <div className="mt-6 pt-4 border-t border-white/20">
            <p className="text-white-smoke text-sm mb-2">
              © {new Date().getFullYear()} G3 Electric. All rights reserved.
            </p>
            <p className="text-white-smoke text-sm">
              This digital experience was built by{' '}
              <a 
                href="https://www.counterbalance.digital" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple hover:text-phlox transition-colors font-medium underline"
              >
                Counterbalance
              </a>
              , a UX-first company.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

