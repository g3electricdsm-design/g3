import Link from "next/link";
import { ShieldCheckIcon, BoltIcon, HomeIcon, BuildingOfficeIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="font-megrim text-2xl text-purple">G3 Electric</h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/" className="text-earle-black hover:text-purple px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                <Link href="/services" className="text-earle-black hover:text-purple px-3 py-2 rounded-md text-sm font-medium">Services</Link>
                <Link href="/portfolio" className="text-earle-black hover:text-purple px-3 py-2 rounded-md text-sm font-medium">Portfolio</Link>
                <Link href="/pricing" className="text-earle-black hover:text-purple px-3 py-2 rounded-md text-sm font-medium">Pricing</Link>
                <Link href="/about" className="text-earle-black hover:text-purple px-3 py-2 rounded-md text-sm font-medium">About</Link>
                <Link href="/contact" className="text-earle-black hover:text-purple px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
                <Link href="/pay" className="bg-purple text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-phlox transition-colors">Pay Bill</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple to-phlox text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-megrim text-5xl md:text-6xl mb-6">
            Safe & Dependable
          </h2>
          <h3 className="font-montserrat text-2xl md:text-3xl mb-8 font-light">
            Electrical Services You Can Trust
          </h3>
          <p className="font-raleway text-lg md:text-xl mb-10 max-w-3xl mx-auto">
            Your family&apos;s safety is our #1 priority. Professional electrical services for residential and commercial projects with the dependability you deserve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-white text-purple px-8 py-3 rounded-lg font-montserrat font-semibold hover:bg-white-smoke transition-colors"
            >
              Get Free Quote
            </Link>
            <Link 
              href="/portfolio" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-montserrat font-semibold hover:bg-white hover:text-purple transition-colors"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-white-smoke">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-megrim text-4xl text-earle-black mb-4">Our Services</h2>
            <p className="font-raleway text-lg text-gray-600 max-w-2xl mx-auto">
              From residential lighting to commercial builds, we handle all your electrical needs with safety and precision.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
              <BoltIcon className="h-12 w-12 text-purple mx-auto mb-4" />
              <h3 className="font-montserrat text-xl font-semibold text-earle-black mb-2">Lighting</h3>
              <p className="font-raleway text-gray-600">Custom lighting solutions for every space</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
              <HomeIcon className="h-12 w-12 text-purple mx-auto mb-4" />
              <h3 className="font-montserrat text-xl font-semibold text-earle-black mb-2">Residential</h3>
              <p className="font-raleway text-gray-600">Safe electrical work for your home</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
              <BuildingOfficeIcon className="h-12 w-12 text-purple mx-auto mb-4" />
              <h3 className="font-montserrat text-xl font-semibold text-earle-black mb-2">Commercial</h3>
              <p className="font-raleway text-gray-600">Professional commercial electrical services</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
              <ShieldCheckIcon className="h-12 w-12 text-purple mx-auto mb-4" />
              <h3 className="font-montserrat text-xl font-semibold text-earle-black mb-2">Safety First</h3>
              <p className="font-raleway text-gray-600">Education and safety for your family</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-earle-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-megrim text-4xl mb-6">Ready to Get Started?</h2>
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
      <footer className="bg-white-smoke py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="font-megrim text-2xl text-earle-black mb-4">G3 Electric</h3>
            <p className="font-raleway text-gray-600 mb-4">Safe & Dependable Electrical Services</p>
            <div className="flex justify-center space-x-6">
              <Link href="/services" className="text-gray-600 hover:text-purple font-raleway">Services</Link>
              <Link href="/portfolio" className="text-gray-600 hover:text-purple font-raleway">Portfolio</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-purple font-raleway">Pricing</Link>
              <Link href="/about" className="text-gray-600 hover:text-purple font-raleway">About</Link>
              <Link href="/contact" className="text-gray-600 hover:text-purple font-raleway">Contact</Link>
              <Link href="/pay" className="text-purple hover:text-phlox font-raleway font-semibold">Pay Bill</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
