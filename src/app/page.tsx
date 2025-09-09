import Link from "next/link";
import { ShieldCheckIcon, BoltIcon, HomeIcon, BuildingOfficeIcon } from "@heroicons/react/24/outline";
import Navigation from "@/components/Navigation";

export default function Home() {
  return (
    <div className="min-h-screen bg-earle-black">
      {/* Navigation */}
      <Navigation currentPath="/" />

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Huge Background Image Placeholder */}
        <div className="absolute inset-0 w-full h-full">
          {/* Placeholder for lighting project hero image */}
          <div className="w-full h-full bg-gradient-to-br from-earle-black via-purple/30 to-phlox/30 flex items-center justify-center">
            {/* Image placeholder with lighting project visual */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple/20 to-phlox/20">
              <div className="absolute inset-0 bg-black/40"></div>
              {/* Simulated lighting elements */}
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/20 rounded-full blur-xl"></div>
              <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-phlox/30 rounded-full blur-lg"></div>
              <div className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-purple/40 rounded-full blur-md"></div>
              <div className="absolute bottom-1/4 right-1/4 w-28 h-28 bg-white/10 rounded-full blur-xl"></div>
            </div>
            {/* Placeholder text for image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white/60">
                <div className="text-6xl mb-4">💡</div>
                <p className="font-montserrat text-xl">Lighting Project Hero Image</p>
                <p className="font-raleway text-sm mt-2">Professional electrical work showcase</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Hero Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-megrim text-6xl md:text-8xl lg:text-9xl mb-6 text-white drop-shadow-2xl">
              Safe & Dependable
            </h1>
            <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl mb-8 font-light text-white drop-shadow-xl">
              Electrical Services You Can Trust
            </h2>
            <p className="font-raleway text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-white drop-shadow-lg">
              Your family&apos;s safety is our #1 priority. Professional electrical services for residential and commercial projects with the dependability you deserve.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                href="/contact" 
                className="bg-white text-purple px-10 py-4 rounded-lg font-montserrat font-semibold hover:bg-white-smoke transition-colors text-lg shadow-2xl"
              >
                Get Free Quote
              </Link>
              <Link 
                href="/portfolio" 
                className="border-2 border-white text-white px-10 py-4 rounded-lg font-montserrat font-semibold hover:bg-white hover:text-purple transition-colors text-lg shadow-2xl"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-earle-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat text-4xl text-white mb-4">Our Services</h2>
            <p className="font-raleway text-lg text-white-smoke max-w-2xl mx-auto">
              From residential lighting to commercial builds, we handle all your electrical needs with safety and precision.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white-smoke rounded-lg shadow-sm text-center hover:shadow-md transition-shadow overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-purple/20 to-phlox/20 flex items-center justify-center">
                <BoltIcon className="h-12 w-12 text-purple" />
              </div>
              <div className="p-6">
                <h3 className="font-montserrat text-xl font-semibold text-earle-black mb-2">Lighting</h3>
                <p className="font-raleway text-gray-600">Custom lighting solutions for every space</p>
              </div>
            </div>
            
            <div className="bg-white-smoke rounded-lg shadow-sm text-center hover:shadow-md transition-shadow overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-hookers-green/20 to-purple/20 flex items-center justify-center">
                <HomeIcon className="h-12 w-12 text-hookers-green" />
              </div>
              <div className="p-6">
                <h3 className="font-montserrat text-xl font-semibold text-earle-black mb-2">Residential</h3>
                <p className="font-raleway text-gray-600">Safe electrical work for your home</p>
              </div>
            </div>
            
            <div className="bg-white-smoke rounded-lg shadow-sm text-center hover:shadow-md transition-shadow overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-earle-black/20 to-hookers-green/20 flex items-center justify-center">
                <BuildingOfficeIcon className="h-12 w-12 text-earle-black" />
              </div>
              <div className="p-6">
                <h3 className="font-montserrat text-xl font-semibold text-earle-black mb-2">Commercial</h3>
                <p className="font-raleway text-gray-600">Professional commercial electrical services</p>
              </div>
            </div>
            
            <div className="bg-white-smoke rounded-lg shadow-sm text-center hover:shadow-md transition-shadow overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-phlox/20 to-purple/20 flex items-center justify-center">
                <ShieldCheckIcon className="h-12 w-12 text-phlox" />
              </div>
              <div className="p-6">
                <h3 className="font-montserrat text-xl font-semibold text-earle-black mb-2">Safety First</h3>
                <p className="font-raleway text-gray-600">Education and safety for your family</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-earle-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-montserrat text-4xl mb-6">Ready to Get Started?</h2>
          <p className="font-raleway text-lg mb-8 max-w-2xl mx-auto">
            Contact us today for a free quote. Your safety and satisfaction are our top priorities.
          </p>
          <Link 
            href="/contact" 
            className="bg-purple text-white px-8 py-3 rounded-lg font-montserrat font-semibold hover:bg-phlox transition-colors inline-block"
          >
            Request Quote
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-earle-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="font-montserrat text-2xl text-white mb-4">G3 Electric</h3>
            <p className="font-raleway text-white-smoke mb-4">Safe & Dependable Electrical Services</p>
            <div className="flex justify-center space-x-6">
              <Link href="/services" className="text-white-smoke hover:text-purple font-raleway">Services</Link>
              <Link href="/portfolio" className="text-white-smoke hover:text-purple font-raleway">Portfolio</Link>
              <Link href="/pricing" className="text-white-smoke hover:text-purple font-raleway">Pricing</Link>
              <Link href="/about" className="text-white-smoke hover:text-purple font-raleway">About</Link>
              <Link href="/contact" className="text-white-smoke hover:text-purple font-raleway">Contact</Link>
              <Link href="/pay" className="text-purple hover:text-phlox font-raleway font-semibold">Pay Bill</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
