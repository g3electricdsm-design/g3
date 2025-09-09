import Link from "next/link";
import { ShieldCheckIcon, BoltIcon, HomeIcon, BuildingOfficeIcon } from "@heroicons/react/24/outline";
import Navigation from "@/components/Navigation";
import { getContent } from "@/data/content";

export default function Home() {
  const content = getContent().homepage;
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
              {content.hero.title}
            </h1>
            <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl mb-8 font-light text-white drop-shadow-xl">
              {content.hero.subtitle}
            </h2>
            <p className="font-raleway text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-white drop-shadow-lg">
              {content.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                href="/contact" 
                className="btn-primary text-lg shadow-2xl"
              >
                {content.hero.primaryButton}
              </Link>
              <Link 
                href="/portfolio" 
                className="btn-secondary text-lg shadow-2xl border-white text-white hover:bg-white hover:text-purple"
              >
                {content.hero.secondaryButton}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-earle-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat text-4xl text-white mb-4">{content.services.title}</h2>
            <p className="font-raleway text-lg text-white-smoke max-w-2xl mx-auto">
              {content.services.description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.services.items.map((service, index) => (
              <div key={index} className="bg-white-smoke rounded-lg shadow-sm text-center hover:shadow-md transition-shadow overflow-hidden">
                <div className="h-32 bg-gradient-to-br from-purple/20 to-phlox/20 flex items-center justify-center">
                  <BoltIcon className="h-12 w-12 text-purple" />
                </div>
                <div className="p-6">
                  <h3 className="font-montserrat text-xl font-semibold text-earle-black mb-2">{service.title}</h3>
                  <p className="font-raleway text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-earle-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-montserrat text-4xl mb-6">{content.cta.title}</h2>
          <p className="font-raleway text-lg mb-8 max-w-2xl mx-auto">
            {content.cta.description}
          </p>
          <Link 
            href="/contact" 
            className="btn-primary inline-block"
          >
            {content.cta.buttonText}
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
