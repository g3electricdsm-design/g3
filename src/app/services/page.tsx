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
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-start mb-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-purple rounded-lg flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-montserrat text-2xl font-semibold text-earle-black mb-2">{service.title}</h3>
                      <p className="font-raleway text-gray-600 mb-3">{service.description}</p>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-montserrat font-medium ${
                        service.category === 'Residential' 
                          ? 'bg-green-100 text-green-800' 
                          : service.category === 'Commercial'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {service.category}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-montserrat text-lg font-semibold text-earle-black mb-4">What We Include:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center font-raleway text-gray-600">
                          <div className="w-2 h-2 bg-purple rounded-full mr-3 flex-shrink-0"></div>
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
            <h2 className="font-megrim text-4xl text-earle-black mb-4">{content.safety.title}</h2>
            <p className="font-raleway text-lg text-gray-600 max-w-3xl mx-auto">
              {content.safety.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.safety.features.map((feature, index) => {
              const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || ShieldCheckIcon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-purple rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-montserrat text-xl font-semibold text-earle-black mb-4">{feature.title}</h3>
                  <p className="font-raleway text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-megrim text-4xl text-earle-black mb-4">{content.process.title}</h2>
            <p className="font-raleway text-lg text-gray-600 max-w-3xl mx-auto">
              {content.process.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {content.process.steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-purple text-white rounded-full flex items-center justify-center mx-auto mb-4 font-montserrat font-bold text-xl">{index + 1}</div>
                <h3 className="font-montserrat text-lg font-semibold text-earle-black mb-2">{step.title}</h3>
                <p className="font-raleway text-gray-600">{step.description}</p>
              </div>
            ))}
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
      <footer className="bg-white-smoke py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="font-megrim text-2xl text-earle-black mb-4">G3 Electric</h3>
            <p className="font-raleway text-gray-600 mb-4">Safe & Dependable Electrical Services</p>
            <div className="flex justify-center space-x-6">
              <Link href="/services" className="text-purple font-raleway">Services</Link>
              <Link href="/portfolio" className="text-gray-600 hover:text-purple font-raleway">Portfolio</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-purple font-raleway">Pricing</Link>
              <Link href="/about" className="text-gray-600 hover:text-purple font-raleway">About</Link>
              <Link href="/contact" className="text-gray-600 hover:text-purple font-raleway">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
