import Link from "next/link";
import { 
  ArrowLeftIcon, 
  LightBulbIcon, 
  CpuChipIcon, 
  PowerIcon, 
  HomeIcon, 
  BuildingOfficeIcon, 
  AcademicCapIcon,
  ShieldCheckIcon,
  BoltIcon,
  WrenchScrewdriverIcon
} from "@heroicons/react/24/outline";
import Navigation from "@/components/Navigation";
import { getContent } from "@/data/content";

export default function Services() {
  const content = getContent().services;
  
  const iconMap = {
    LightBulbIcon,
    CpuChipIcon,
    PowerIcon,
    HomeIcon,
    BuildingOfficeIcon,
    AcademicCapIcon,
    ShieldCheckIcon,
    BoltIcon,
    WrenchScrewdriverIcon
  };

  return (
    <div className="min-h-screen bg-earle-black">
      {/* Navigation */}
      <Navigation currentPath="/services" />

      {/* Header */}
      <section className="bg-gradient-to-br from-purple to-phlox text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Link href="/" className="flex items-center text-white hover:text-white-smoke transition-colors">
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </div>
          <h1 className="font-megrim text-5xl md:text-6xl mb-4">{content.hero.title}</h1>
          <p className="font-raleway text-lg md:text-xl max-w-3xl">
            {content.hero.description}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {content.services.map((service, index) => {
              const IconComponent = iconMap[service.icon as keyof typeof iconMap] || LightBulbIcon;
              return (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow shadow-md">
                  <div className="flex items-start mb-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-purple rounded-lg flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-montserrat text-2xl font-semibold text-earle-black mb-2" style={{color: '#242729'}}>{service.title}</h3>
                      <p className="font-raleway text-earle-black mb-3" style={{color: '#242729'}}>{service.description}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-montserrat text-lg font-semibold text-earle-black mb-4" style={{color: '#242729'}}>What We Include:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center font-raleway text-earle-black" style={{color: '#242729'}}>
                          <div className="w-2 h-2 bg-purple rounded-full mr-3 flex-shrink-0" style={{backgroundColor: '#6D0091'}}></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Safety & Quality Section */}
      <section className="py-20 bg-white-smoke">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-megrim text-4xl text-earle-black mb-4">Safety & Quality Guarantee</h2>
            <p className="font-raleway text-lg text-earle-black max-w-3xl mx-auto">
              Your safety is our #1 priority. Every project is completed with the highest standards of safety and quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheckIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-montserrat text-xl font-semibold text-earle-black mb-4">Licensed & Insured</h3>
              <p className="font-raleway text-earle-black">Fully licensed electricians with comprehensive insurance coverage</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple rounded-full flex items-center justify-center mx-auto mb-6">
                <BoltIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-montserrat text-xl font-semibold text-earle-black mb-4">Code Compliance</h3>
              <p className="font-raleway text-earle-black">All work meets or exceeds local electrical codes and standards</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple rounded-full flex items-center justify-center mx-auto mb-6">
                <WrenchScrewdriverIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-montserrat text-xl font-semibold text-earle-black mb-4">Quality Materials</h3>
              <p className="font-raleway text-earle-black">We use only the highest quality materials and components</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-megrim text-4xl text-earle-black mb-4">Our Process</h2>
            <p className="font-raleway text-lg text-earle-black max-w-3xl mx-auto">
              From initial consultation to project completion, we ensure a smooth and safe experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple text-white rounded-full flex items-center justify-center mx-auto mb-4 font-montserrat font-bold text-xl">1</div>
              <h3 className="font-montserrat text-lg font-semibold text-earle-black mb-2">Free Consultation</h3>
              <p className="font-raleway text-earle-black">We assess your needs and provide a detailed quote</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple text-white rounded-full flex items-center justify-center mx-auto mb-4 font-montserrat font-bold text-xl">2</div>
              <h3 className="font-montserrat text-lg font-semibold text-earle-black mb-2">Planning & Design</h3>
              <p className="font-raleway text-earle-black">We create a detailed plan ensuring safety and efficiency</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple text-white rounded-full flex items-center justify-center mx-auto mb-4 font-montserrat font-bold text-xl">3</div>
              <h3 className="font-montserrat text-lg font-semibold text-earle-black mb-2">Professional Installation</h3>
              <p className="font-raleway text-earle-black">Licensed electricians complete your project safely</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple text-white rounded-full flex items-center justify-center mx-auto mb-4 font-montserrat font-bold text-xl">4</div>
              <h3 className="font-montserrat text-lg font-semibold text-earle-black mb-2">Quality Assurance</h3>
              <p className="font-raleway text-earle-black">We test everything and ensure code compliance</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-earle-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-megrim text-4xl mb-6">{content.cta.title}</h2>
          <p className="font-raleway text-lg mb-8 max-w-2xl mx-auto">
            {content.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/contact" 
              className="btn-primary w-full sm:w-auto text-sm sm:text-base"
            >
              {content.cta.buttonText}
            </Link>
            <Link 
              href="/portfolio" 
              className="btn-secondary border-white text-white hover:bg-white hover:text-purple w-full sm:w-auto text-sm sm:text-base"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12" style={{backgroundColor: '#70877F'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="font-megrim text-2xl text-white mb-4">G3 Electric</h3>
            <p className="font-raleway text-white-smoke mb-4">Safe & Dependable Electrical Services</p>
            <div className="flex justify-center space-x-6">
              <Link href="/services" className="text-purple font-raleway">Services</Link>
              <Link href="/portfolio" className="text-white-smoke hover:text-purple font-raleway">Portfolio</Link>
              <Link href="/pricing" className="text-white-smoke hover:text-purple font-raleway">Pricing</Link>
              <Link href="/about" className="text-white-smoke hover:text-purple font-raleway">About</Link>
              <Link href="/contact" className="text-white-smoke hover:text-purple font-raleway">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
