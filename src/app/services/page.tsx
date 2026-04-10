import Link from "next/link";
import { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getContent } from "@/data/content";
import { AnimatedServiceIcon } from "@/components/ServiceIcons";

export const metadata: Metadata = {
  title: "Electrical Services - Lighting, Wiring & Repairs",
  description:
    "Professional electrical services in Des Moines: lighting installation, residential wiring, commercial electrical, panel upgrades, and 24/7 emergency repairs. Licensed & insured.",
  alternates: { canonical: '/services' },
  openGraph: {
    title: "Electrical Services by G3 Electric - Des Moines",
    description:
      "Lighting installation, residential wiring, commercial electrical work, and emergency repairs by licensed Des Moines electricians.",
  },
};

function ServicesJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'G3 Electric Services',
    itemListElement: [
      {
        '@type': 'Service',
        position: 1,
        name: 'Lighting Installation & Design',
        description: 'Custom lighting solutions including LED upgrades, smart lighting, outdoor landscape lighting, and fixture installation.',
        provider: { '@type': 'Electrician', name: 'G3 Electric' },
        areaServed: { '@type': 'City', name: 'Des Moines' },
      },
      {
        '@type': 'Service',
        position: 2,
        name: 'Residential Electrical Work',
        description: 'Complete home electrical services including panel upgrades, outlet installation, ceiling fans, GFCI outlets, and surge protection.',
        provider: { '@type': 'Electrician', name: 'G3 Electric' },
        areaServed: { '@type': 'City', name: 'Des Moines' },
      },
      {
        '@type': 'Service',
        position: 3,
        name: 'Commercial Electrical Services',
        description: 'Professional electrical solutions for businesses including main service installation, office wiring, emergency lighting, and energy management.',
        provider: { '@type': 'Electrician', name: 'G3 Electric' },
        areaServed: { '@type': 'City', name: 'Des Moines' },
      },
      {
        '@type': 'Service',
        position: 4,
        name: 'Safety & Education',
        description: 'Electrical safety inspections, code compliance verification, homeowner education, and emergency repair services.',
        provider: { '@type': 'Electrician', name: 'G3 Electric' },
        areaServed: { '@type': 'City', name: 'Des Moines' },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function Services() {
  const content = getContent().services;

  return (
    <div className="min-h-screen bg-earle-black">
      <ServicesJsonLd />
      {/* Navigation */}
      <Navigation currentPath="/services" />

      {/* Header */}
      <section className="bg-gradient-to-br from-purple to-phlox text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-megrim text-5xl md:text-6xl mb-4">{content.hero.title}</h1>
          <p className="font-raleway text-lg md:text-xl max-w-3xl">
            {content.hero.description}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pt-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-8">
            {content.services.map((service, index) => {
              return (
                <div key={index} className="w-full max-w-[1200px] bg-earle-black border border-white/10 rounded-2xl px-6 md:pl-8 md:pr-12 lg:pr-24 py-8 hover:border-purple/50 hover:shadow-xl transition-all shadow-lg">
                  <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between gap-6">
                    <div className="w-[180px] h-[180px] md:w-[300px] md:h-[300px] lg:w-[450px] lg:h-[450px] bg-purple/10 rounded-2xl flex items-center justify-center flex-shrink-0 relative overflow-clip p-[10%] order-first md:order-last">
                      <AnimatedServiceIcon serviceId={service.id} className="w-full h-full" />
                    </div>

                    <div className="flex flex-col items-center md:items-start gap-5 md:max-w-[600px] text-center md:text-left w-full">
                      <div className="flex flex-col gap-2">
                        <h3 className="font-montserrat text-2xl font-semibold text-white">{service.title}</h3>
                        <p className="font-raleway text-white-smoke">{service.description}</p>
                      </div>
                      
                      <div className="flex flex-col items-center md:items-start gap-4 w-full">
                        <h4 className="font-montserrat text-lg font-semibold text-white">What We Include:</h4>
                        <ul className="flex flex-col items-center md:items-start gap-2 w-full">
                          {service.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center font-raleway text-white-smoke">
                              <span
                                style={{ backgroundColor: '#C636FF', width: 6, height: 6, borderRadius: '50%', flexShrink: 0, marginRight: 12, display: 'inline-block' }}
                                aria-hidden="true"
                              />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
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
            <h2 className="font-montserrat text-4xl text-earle-black mb-4">Our Process</h2>
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
          <h2 className="font-montserrat text-4xl mb-6">{content.cta.title}</h2>
          <p className="font-raleway text-lg mb-8 max-w-2xl mx-auto">
            {content.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/contact" 
              className="btn-primary w-full sm:w-auto text-sm sm:text-base"
            >
              Get a Free Electrical Estimate
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
      <Footer currentPath="/services" />
    </div>
  );
}
