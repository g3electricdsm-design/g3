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

export default function Services() {
  const services = [
    {
      icon: LightBulbIcon,
      title: "Lighting Solutions",
      description: "Custom lighting design and installation for every space",
      features: [
        "LED lighting upgrades",
        "Under-cabinet lighting",
        "Recessed lighting installation",
        "Outdoor landscape lighting",
        "Smart lighting systems",
        "Chandelier and pendant installation"
      ],
      category: "Both"
    },
    {
      icon: CpuChipIcon,
      title: "Ceiling Fans",
      description: "Professional ceiling fan installation and repair",
      features: [
        "New ceiling fan installation",
        "Fan replacement and upgrades",
        "Smart fan controls",
        "Fan repair and maintenance",
        "Wiring for multiple fans",
        "Remote control installation"
      ],
      category: "Residential"
    },
    {
      icon: PowerIcon,
      title: "Outlet & Electrical Controls",
      description: "Safe and reliable electrical outlet and control solutions",
      features: [
        "New outlet installation",
        "GFCI outlet upgrades",
        "USB outlet installation",
        "Smart outlet controls",
        "Electrical panel upgrades",
        "Circuit breaker installation"
      ],
      category: "Both"
    },
    {
      icon: AcademicCapIcon,
      title: "New Homeowner Education",
      description: "Essential electrical knowledge for new homeowners",
      features: [
        "Electrical safety basics",
        "Circuit breaker education",
        "Outlet safety guidelines",
        "Emergency procedures",
        "Maintenance schedules",
        "Energy efficiency tips"
      ],
      category: "Residential"
    },
    {
      icon: BuildingOfficeIcon,
      title: "Commercial Builds",
      description: "Complete electrical systems for commercial properties",
      features: [
        "Office building wiring",
        "Retail space electrical",
        "Restaurant electrical systems",
        "Warehouse lighting",
        "Emergency lighting systems",
        "Commercial panel upgrades"
      ],
      category: "Commercial"
    },
    {
      icon: HomeIcon,
      title: "Residential Builds",
      description: "Full electrical installation for new homes",
      features: [
        "New home wiring",
        "Electrical panel installation",
        "Whole house surge protection",
        "Smart home pre-wiring",
        "Outdoor electrical systems",
        "Code compliance assurance"
      ],
      category: "Residential"
    }
  ];

  const safetyFeatures = [
    {
      icon: ShieldCheckIcon,
      title: "Licensed & Insured",
      description: "Fully licensed electricians with comprehensive insurance coverage"
    },
    {
      icon: BoltIcon,
      title: "Code Compliance",
      description: "All work meets or exceeds local electrical codes and standards"
    },
    {
      icon: WrenchScrewdriverIcon,
      title: "Quality Materials",
      description: "We use only the highest quality materials and components"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="font-megrim text-2xl text-purple">G3 Electric</Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/" className="text-earle-black hover:text-purple px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                <Link href="/services" className="text-purple px-3 py-2 rounded-md text-sm font-medium">Services</Link>
                <Link href="/portfolio" className="text-earle-black hover:text-purple px-3 py-2 rounded-md text-sm font-medium">Portfolio</Link>
                <Link href="/pricing" className="text-earle-black hover:text-purple px-3 py-2 rounded-md text-sm font-medium">Pricing</Link>
                <Link href="/about" className="text-earle-black hover:text-purple px-3 py-2 rounded-md text-sm font-medium">About</Link>
                <Link href="/contact" className="text-earle-black hover:text-purple px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="bg-gradient-to-br from-purple to-phlox text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Link href="/" className="flex items-center text-white hover:text-white-smoke transition-colors">
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </div>
          <h1 className="font-megrim text-5xl md:text-6xl mb-4">Our Services</h1>
          <p className="font-raleway text-lg md:text-xl max-w-3xl">
            Professional electrical services for residential and commercial projects. Safety and dependability are our top priorities.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-start mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple rounded-lg flex items-center justify-center">
                      <service.icon className="h-6 w-6 text-white" />
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
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Quality Section */}
      <section className="py-20 bg-white-smoke">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-megrim text-4xl text-earle-black mb-4">Safety & Quality Guarantee</h2>
            <p className="font-raleway text-lg text-gray-600 max-w-3xl mx-auto">
              Your safety is our #1 priority. Every project is completed with the highest standards of safety and quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {safetyFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-purple rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-montserrat text-xl font-semibold text-earle-black mb-4">{feature.title}</h3>
                <p className="font-raleway text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-megrim text-4xl text-earle-black mb-4">Our Process</h2>
            <p className="font-raleway text-lg text-gray-600 max-w-3xl mx-auto">
              From initial consultation to project completion, we ensure a smooth and safe experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple text-white rounded-full flex items-center justify-center mx-auto mb-4 font-montserrat font-bold text-xl">1</div>
              <h3 className="font-montserrat text-lg font-semibold text-earle-black mb-2">Free Consultation</h3>
              <p className="font-raleway text-gray-600">We assess your needs and provide a detailed quote</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple text-white rounded-full flex items-center justify-center mx-auto mb-4 font-montserrat font-bold text-xl">2</div>
              <h3 className="font-montserrat text-lg font-semibold text-earle-black mb-2">Planning & Design</h3>
              <p className="font-raleway text-gray-600">We create a detailed plan ensuring safety and efficiency</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple text-white rounded-full flex items-center justify-center mx-auto mb-4 font-montserrat font-bold text-xl">3</div>
              <h3 className="font-montserrat text-lg font-semibold text-earle-black mb-2">Professional Installation</h3>
              <p className="font-raleway text-gray-600">Licensed electricians complete your project safely</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple text-white rounded-full flex items-center justify-center mx-auto mb-4 font-montserrat font-bold text-xl">4</div>
              <h3 className="font-montserrat text-lg font-semibold text-earle-black mb-2">Quality Assurance</h3>
              <p className="font-raleway text-gray-600">We test everything and ensure code compliance</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-earle-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-megrim text-4xl mb-6">Ready to Get Started?</h2>
          <p className="font-raleway text-lg mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and quote. Let's discuss how we can help with your electrical needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-purple text-white px-8 py-3 rounded-lg font-montserrat font-semibold hover:bg-phlox transition-colors"
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
