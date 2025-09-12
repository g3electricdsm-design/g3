import Link from "next/link";
import { Metadata } from "next";
import { 
  ArrowLeftIcon, 
  ShieldCheckIcon, 
  BoltIcon, 
  HeartIcon, 
  StarIcon,
  CheckBadgeIcon,
  ClockIcon,
  UserGroupIcon
} from "@heroicons/react/24/outline";
import Navigation from "@/components/Navigation";
import { getContent } from "@/data/content";

export const metadata: Metadata = {
  title: "About G3 Electric | Master Electricians Des Moines",
  description: "Learn about G3 Electric, licensed master electricians serving Des Moines, IA. 15+ years of experience in residential and commercial electrical services. Safety, quality, and reliability.",
  keywords: "about G3 Electric, master electrician Des Moines, electrical contractor Iowa, licensed electrician, electrical company, electrical services history",
};

export default function About() {
  const content = getContent().about;
  
  const iconMap = {
    ShieldCheckIcon,
    BoltIcon,
    HeartIcon,
    StarIcon,
    CheckBadgeIcon,
    ClockIcon,
    UserGroupIcon
  };

  return (
    <div className="min-h-screen bg-earle-black">
      {/* Navigation */}
      <Navigation currentPath="/about" />

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

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-montserrat text-4xl text-white mb-6">{content.mission.title}</h2>
              <div className="space-y-4 font-raleway text-white-smoke">
                <p>{content.mission.description}</p>
              </div>
            </div>
            <div className="bg-white-smoke p-8 rounded-lg">
              <div className="text-center">
                <div className="w-24 h-24 bg-purple rounded-full flex items-center justify-center mx-auto mb-6">
                  <BoltIcon className="h-12 w-12 text-white" />
                </div>
                <h3 className="font-montserrat text-2xl font-semibold text-earle-black mb-4">Why Choose G3 Electric?</h3>
                <ul className="space-y-3 text-left">
                  <li className="flex items-center font-raleway text-earle-black">
                    <CheckBadgeIcon className="h-5 w-5 text-purple mr-3 flex-shrink-0" />
                    Licensed & Insured
                  </li>
                  <li className="flex items-center font-raleway text-earle-black">
                    <CheckBadgeIcon className="h-5 w-5 text-purple mr-3 flex-shrink-0" />
                    Safety-First Approach
                  </li>
                  <li className="flex items-center font-raleway text-earle-black">
                    <CheckBadgeIcon className="h-5 w-5 text-purple mr-3 flex-shrink-0" />
                    Code Compliance Guaranteed
                  </li>
                  <li className="flex items-center font-raleway text-earle-black">
                    <CheckBadgeIcon className="h-5 w-5 text-purple mr-3 flex-shrink-0" />
                    Quality Materials Only
                  </li>
                  <li className="flex items-center font-raleway text-earle-black">
                    <CheckBadgeIcon className="h-5 w-5 text-purple mr-3 flex-shrink-0" />
                    Honest, Transparent Pricing
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white-smoke">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat text-4xl text-earle-black mb-4">Our Values</h2>
            <p className="font-raleway text-lg text-earle-black max-w-3xl mx-auto">
              These core values guide everything we do and ensure you receive the best possible service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.values.map((value, index) => {
              const IconComponent = iconMap[value.icon as keyof typeof iconMap] || ShieldCheckIcon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-purple rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-montserrat text-xl font-semibold text-earle-black mb-4">{value.title}</h3>
                  <p className="font-raleway text-earle-black">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat text-4xl text-earle-black mb-4">By the Numbers</h2>
            <p className="font-raleway text-lg text-earle-black max-w-3xl mx-auto">
              Our track record speaks for itself—safety, quality, and customer satisfaction in every project.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="font-megrim text-4xl md:text-5xl text-purple mb-2">15+</div>
              <div className="font-montserrat text-lg font-semibold text-earle-black">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="font-megrim text-4xl md:text-5xl text-purple mb-2">500+</div>
              <div className="font-montserrat text-lg font-semibold text-earle-black">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="font-megrim text-4xl md:text-5xl text-purple mb-2">100%</div>
              <div className="font-montserrat text-lg font-semibold text-earle-black">Safety Record</div>
            </div>
            <div className="text-center">
              <div className="font-megrim text-4xl md:text-5xl text-purple mb-2">24/7</div>
              <div className="font-montserrat text-lg font-semibold text-earle-black">Emergency Service</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white-smoke">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat text-4xl text-earle-black mb-4">Meet Our Team</h2>
            <p className="font-raleway text-lg text-earle-black max-w-3xl mx-auto">
              Licensed professionals dedicated to your safety and satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm text-center overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-purple/20 to-phlox/20 flex items-center justify-center">
                  <div className="w-24 h-24 bg-purple/30 rounded-full flex items-center justify-center">
                    <UserGroupIcon className="h-12 w-12 text-purple" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-montserrat text-xl font-semibold text-earle-black mb-2">{member.name}</h3>
                  <p className="font-raleway text-purple font-medium mb-2">{member.role}</p>
                  <p className="font-raleway text-earle-black text-sm mb-4">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Commitment */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-purple to-phlox rounded-lg p-8 md:p-12 text-white text-center">
            <ShieldCheckIcon className="h-16 w-16 mx-auto mb-6" />
            <h2 className="font-montserrat text-4xl mb-6">Our Safety Commitment</h2>
            <p className="font-raleway text-lg md:text-xl mb-8 max-w-4xl mx-auto">
              We don&apos;t just follow safety protocols—we live them. Every member of our team is trained in the latest safety 
              procedures, and we continuously invest in education and equipment to ensure your family&apos;s protection.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div>
                <ClockIcon className="h-8 w-8 mx-auto mb-4" />
                <h3 className="font-montserrat text-lg font-semibold mb-2">Continuous Training</h3>
                <p className="font-raleway text-sm">Regular safety updates and certification renewals</p>
              </div>
              <div>
                <CheckBadgeIcon className="h-8 w-8 mx-auto mb-4" />
                <h3 className="font-montserrat text-lg font-semibold mb-2">Code Compliance</h3>
                <p className="font-raleway text-sm">All work meets or exceeds local electrical codes</p>
              </div>
              <div>
                <StarIcon className="h-8 w-8 mx-auto mb-4" />
                <h3 className="font-montserrat text-lg font-semibold mb-2">Quality Assurance</h3>
                <p className="font-raleway text-sm">Thorough testing and inspection of all work</p>
              </div>
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
              Get Free Quote
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
      <footer className="bg-hookers-green py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="font-megrim text-2xl text-white mb-4">G3 Electric</h3>
            <p className="font-raleway text-white-smoke mb-4">Safe & Dependable Electrical Services</p>
            <div className="flex justify-center space-x-6">
              <Link href="/services" className="text-white-smoke hover:text-purple font-raleway">Services</Link>
              <Link href="/portfolio" className="text-white-smoke hover:text-purple font-raleway">Portfolio</Link>
              <Link href="/pricing" className="text-white-smoke hover:text-purple font-raleway">Pricing</Link>
              <Link href="/about" className="text-purple font-raleway">About</Link>
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
