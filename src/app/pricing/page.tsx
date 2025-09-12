import Link from "next/link";
import { Metadata } from "next";
import { 
  ArrowLeftIcon, 
  CheckIcon, 
  BoltIcon, 
  HomeIcon, 
  BuildingOfficeIcon,
  LightBulbIcon,
  CpuChipIcon,
  PowerIcon,
  AcademicCapIcon
} from "@heroicons/react/24/outline";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Electrical Service Pricing | G3 Electric Des Moines",
  description: "Transparent electrical service pricing in Des Moines, IA. Free estimates for residential and commercial electrical work. Licensed master electricians with competitive rates.",
  keywords: "electrical pricing Des Moines, electrician cost Iowa, electrical service rates, free electrical estimate, electrical contractor pricing, electrical repair cost",
};

export default function Pricing() {
  const servicePricing = [
    {
      icon: LightBulbIcon,
      title: "Lighting Installation",
      description: "Custom lighting solutions for every space",
      residential: {
        basic: "$150-300",
        premium: "$300-600",
        description: "Per fixture installation"
      },
      commercial: {
        basic: "$200-400",
        premium: "$400-800",
        description: "Per fixture installation"
      },
      includes: [
        "Fixture installation",
        "Wiring and connections",
        "Switch installation",
        "Code compliance check",
        "1-year warranty"
      ]
    },
    {
      icon: CpuChipIcon,
      title: "Ceiling Fans",
      description: "Professional ceiling fan installation",
      residential: {
        basic: "$200-350",
        premium: "$350-500",
        description: "Per fan installation"
      },
      commercial: {
        basic: "N/A",
        premium: "N/A",
        description: "Residential only"
      },
      includes: [
        "Fan installation",
        "Electrical connections",
        "Remote control setup",
        "Safety inspection",
        "1-year warranty"
      ]
    },
    {
      icon: PowerIcon,
      title: "Outlet & Switch Installation",
      description: "Safe and reliable electrical outlets",
      residential: {
        basic: "$100-200",
        premium: "$200-350",
        description: "Per outlet/switch"
      },
      commercial: {
        basic: "$150-250",
        premium: "$250-400",
        description: "Per outlet/switch"
      },
      includes: [
        "Outlet installation",
        "GFCI upgrades",
        "USB outlet options",
        "Code compliance",
        "1-year warranty"
      ]
    },
    {
      icon: HomeIcon,
      title: "Residential Builds",
      description: "Complete electrical for new homes",
      residential: {
        basic: "$8,000-15,000",
        premium: "$15,000-25,000",
        description: "Full home electrical"
      },
      commercial: {
        basic: "N/A",
        premium: "N/A",
        description: "Residential only"
      },
      includes: [
        "Complete home wiring",
        "Electrical panel installation",
        "Outdoor electrical",
        "Smart home pre-wiring",
        "5-year warranty"
      ]
    },
    {
      icon: BuildingOfficeIcon,
      title: "Commercial Builds",
      description: "Professional commercial electrical",
      residential: {
        basic: "N/A",
        premium: "N/A",
        description: "Commercial only"
      },
      commercial: {
        basic: "$15,000-30,000",
        premium: "$30,000-50,000+",
        description: "Commercial electrical"
      },
      includes: [
        "Commercial wiring",
        "Emergency lighting",
        "Panel upgrades",
        "Code compliance",
        "3-year warranty"
      ]
    },
    {
      icon: AcademicCapIcon,
      title: "Homeowner Education",
      description: "Electrical safety and maintenance training",
      residential: {
        basic: "$100-200",
        premium: "$200-300",
        description: "Per session"
      },
      commercial: {
        basic: "$200-400",
        premium: "$400-600",
        description: "Per session"
      },
      includes: [
        "Safety basics",
        "Circuit breaker education",
        "Emergency procedures",
        "Maintenance schedule",
        "Take-home materials"
      ]
    }
  ];

  const pricingTiers = [
    {
      name: "Basic",
      description: "Essential electrical services",
      color: "gray",
      features: [
        "Standard materials",
        "Basic installation",
        "Code compliance",
        "1-year warranty",
        "Standard scheduling"
      ]
    },
    {
      name: "Premium",
      description: "Enhanced service with quality materials",
      color: "purple",
      features: [
        "High-quality materials",
        "Expert installation",
        "Code compliance +",
        "Extended warranty",
        "Priority scheduling",
        "Smart home integration"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-earle-black">
      {/* Navigation */}
      <Navigation currentPath="/pricing" />

      {/* Header */}
      <section className="bg-gradient-to-br from-purple to-phlox text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Link href="/" className="flex items-center text-white hover:text-white-smoke transition-colors">
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </div>
          <h1 className="font-megrim text-5xl md:text-6xl mb-4">Pricing</h1>
          <p className="font-raleway text-lg md:text-xl max-w-3xl">
            Transparent, honest pricing for all your electrical needs. No hidden fees, no surprises—just quality work at fair prices.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat text-4xl text-white mb-4">Service Tiers</h2>
            <p className="font-raleway text-lg text-white-smoke max-w-3xl mx-auto">
              Choose the level of service that best fits your needs and budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <div key={index} className={`p-8 rounded-lg border-2 ${
                tier.color === 'purple' 
                  ? 'border-purple bg-purple/10' 
                  : 'border-gray-300 bg-white'
              }`}>
                <div className="text-center mb-6">
                  <h3 className={`font-montserrat text-2xl font-semibold mb-2 ${
                    tier.color === 'purple' ? 'text-purple' : 'text-earle-black'
                  }`}>
                    {tier.name}
                  </h3>
                  <p className="font-raleway text-earle-black">{tier.description}</p>
                </div>
                
                <ul className="space-y-3">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckIcon className={`h-5 w-5 mr-3 ${
                        tier.color === 'purple' ? 'text-purple' : 'text-earle-black'
                      }`} />
                      <span className="font-raleway text-earle-black">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Pricing */}
      <section className="py-20 bg-white-smoke">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat text-4xl text-earle-black mb-4 font-bold">Service Pricing</h2>
            <p className="font-raleway text-lg text-earle-black max-w-3xl mx-auto">
              Detailed pricing for our most common services. All prices include materials, labor, and warranty.
            </p>
          </div>

          <div className="space-y-8">
            {servicePricing.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-8">
                <div className="flex items-start mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple rounded-lg flex items-center justify-center">
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-montserrat text-2xl font-semibold text-earle-black mb-2" style={{color: '#242729'}}>{service.title}</h3>
                    <p className="font-raleway text-earle-black" style={{color: '#242729'}}>{service.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Residential Pricing */}
                  <div className="bg-hookers-green/10 p-6 rounded-lg border border-hookers-green/20">
                    <div className="flex items-center mb-4">
                      <HomeIcon className="h-6 w-6 text-hookers-green mr-2" />
                      <h4 className="font-montserrat text-lg font-semibold text-hookers-green">Residential</h4>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="font-raleway text-earle-black" style={{color: '#242729'}}>Basic:</span>
                        <span className="font-montserrat font-semibold text-earle-black" style={{color: '#242729'}}>{service.residential.basic}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-raleway text-earle-black" style={{color: '#242729'}}>Premium:</span>
                        <span className="font-montserrat font-semibold text-purple" style={{color: '#6D0091'}}>{service.residential.premium}</span>
                      </div>
                    </div>
                    <p className="font-raleway text-sm text-earle-black" style={{color: '#242729'}}>{service.residential.description}</p>
                  </div>

                  {/* Commercial Pricing */}
                  <div className="bg-earle-black/10 p-6 rounded-lg border border-earle-black/20">
                    <div className="flex items-center mb-4">
                      <BuildingOfficeIcon className="h-6 w-6 text-earle-black mr-2" />
                      <h4 className="font-montserrat text-lg font-semibold text-earle-black">Commercial</h4>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="font-raleway text-earle-black" style={{color: '#242729'}}>Basic:</span>
                        <span className="font-montserrat font-semibold text-earle-black" style={{color: '#242729'}}>{service.commercial.basic}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-raleway text-earle-black" style={{color: '#242729'}}>Premium:</span>
                        <span className="font-montserrat font-semibold text-purple" style={{color: '#6D0091'}}>{service.commercial.premium}</span>
                      </div>
                    </div>
                    <p className="font-raleway text-sm text-earle-black" style={{color: '#242729'}}>{service.commercial.description}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-montserrat text-lg font-semibold text-earle-black mb-3" style={{color: '#242729'}}>What&apos;s Included:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {service.includes.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center">
                        <CheckIcon className="h-4 w-4 text-purple mr-2 flex-shrink-0" style={{color: '#6D0091'}} />
                        <span className="font-raleway text-sm text-earle-black" style={{color: '#242729'}}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-montserrat text-3xl text-earle-black mb-6" style={{color: '#242729'}}>Pricing Information</h2>
              <div className="space-y-4 font-raleway text-earle-black" style={{color: '#242729'}}>
                <p>
                  <strong>Free Estimates:</strong> All quotes are provided at no cost with no obligation. 
                  We believe in transparent pricing and honest communication.
                </p>
                <p>
                  <strong>No Hidden Fees:</strong> The price we quote is the price you pay. No surprise charges, 
                  no last-minute additions—just honest, upfront pricing.
                </p>
                <p>
                  <strong>Warranty Included:</strong> All work comes with our comprehensive warranty. 
                  We stand behind our work and will make it right if anything goes wrong.
                </p>
                <p>
                  <strong>Emergency Service:</strong> Emergency electrical repairs are available 24/7. 
                  Emergency rates apply for after-hours service.
                </p>
              </div>
            </div>

            <div className="bg-purple-50 p-8 rounded-lg">
              <h3 className="font-montserrat text-2xl font-semibold text-earle-black mb-6" style={{color: '#242729'}}>Why Our Pricing is Fair</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <BoltIcon className="h-5 w-5 text-purple mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-montserrat font-semibold text-earle-black" style={{color: '#242729'}}>Licensed Professionals</h4>
                    <p className="font-raleway text-sm text-earle-black" style={{color: '#242729'}}>You&apos;re paying for skilled, licensed electricians, not handymen</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <BoltIcon className="h-5 w-5 text-purple mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-montserrat font-semibold text-earle-black" style={{color: '#242729'}}>Quality Materials</h4>
                    <p className="font-raleway text-sm text-earle-black" style={{color: '#242729'}}>We use only the highest quality materials and components</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <BoltIcon className="h-5 w-5 text-purple mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-montserrat font-semibold text-earle-black" style={{color: '#242729'}}>Safety First</h4>
                    <p className="font-raleway text-sm text-earle-black" style={{color: '#242729'}}>Every project includes safety inspections and code compliance</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <BoltIcon className="h-5 w-5 text-purple mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-montserrat font-semibold text-earle-black" style={{color: '#242729'}}>Peace of Mind</h4>
                    <p className="font-raleway text-sm text-earle-black" style={{color: '#242729'}}>Comprehensive warranty and ongoing support</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-earle-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-montserrat text-4xl mb-6">Ready for Your Free Quote?</h2>
          <p className="font-raleway text-lg mb-8 max-w-2xl mx-auto">
            Get a detailed, no-obligation quote for your electrical project. We&apos;ll provide transparent pricing and answer all your questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-purple text-white px-8 py-3 rounded-lg font-montserrat font-semibold hover:bg-phlox transition-colors"
            >
              Get Free Quote
            </Link>
            <Link 
              href="/services" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-montserrat font-semibold hover:bg-white hover:text-purple transition-colors"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-hookers-green py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="font-megrim text-2xl text-white mb-4">G3 Electric</h3>
            <p className="font-raleway text-white-smoke mb-4">Safe & Dependable Electrical Services</p>
            <div className="flex justify-center space-x-6">
              <Link href="/services" className="text-white-smoke hover:text-purple font-raleway">Services</Link>
              <Link href="/portfolio" className="text-white-smoke hover:text-purple font-raleway">Portfolio</Link>
              <Link href="/pricing" className="text-purple font-raleway">Pricing</Link>
              <Link href="/about" className="text-white-smoke hover:text-purple font-raleway">About</Link>
              <Link href="/contact" className="text-white-smoke hover:text-purple font-raleway">Contact</Link>
            </div>
            <div className="mt-6 pt-4 border-t border-white/20">
              <p className="text-white-smoke text-sm">
                This digital experience was built by{' '}
                <a 
                  href="https://sensory.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-purple hover:text-phlox transition-colors font-medium"
                >
                  Sensory
                </a>
                , a UX-first company.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
