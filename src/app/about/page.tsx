import Link from "next/link";
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

export default function About() {
  const values = [
    {
      icon: ShieldCheckIcon,
      title: "Safety First",
      description: "Your family&apos;s safety is our #1 priority. Every project is completed with the highest safety standards and code compliance."
    },
    {
      icon: BoltIcon,
      title: "Dependability",
      description: "We show up on time, complete projects as promised, and stand behind our work with comprehensive warranties."
    },
    {
      icon: HeartIcon,
      title: "Community Focus",
      description: "We&apos;re proud to serve our local community with honest, reliable electrical services that families can trust."
    },
    {
      icon: CheckBadgeIcon,
      title: "Quality Work",
      description: "We use only the highest quality materials and employ skilled, licensed electricians for every project."
    }
  ];

  const stats = [
    { number: "15+", label: "Years Experience" },
    { number: "500+", label: "Projects Completed" },
    { number: "100%", label: "Safety Record" },
    { number: "24/7", label: "Emergency Service" }
  ];

  const team = [
    {
      name: "John Smith",
      role: "Master Electrician & Owner",
      experience: "15+ years",
      specialties: ["Residential", "Commercial", "Safety Training"]
    },
    {
      name: "Sarah Johnson",
      role: "Senior Electrician",
      experience: "12+ years",
      specialties: ["Smart Home", "Lighting Design", "Code Compliance"]
    },
    {
      name: "Mike Davis",
      role: "Electrician",
      experience: "8+ years",
      specialties: ["Commercial", "Industrial", "Emergency Repairs"]
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
                <Link href="/services" className="text-earle-black hover:text-purple px-3 py-2 rounded-md text-sm font-medium">Services</Link>
                <Link href="/portfolio" className="text-earle-black hover:text-purple px-3 py-2 rounded-md text-sm font-medium">Portfolio</Link>
                <Link href="/pricing" className="text-earle-black hover:text-purple px-3 py-2 rounded-md text-sm font-medium">Pricing</Link>
                <Link href="/about" className="text-purple px-3 py-2 rounded-md text-sm font-medium">About</Link>
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
          <h1 className="font-megrim text-5xl md:text-6xl mb-4">About G3 Electric</h1>
          <p className="font-raleway text-lg md:text-xl max-w-3xl">
            Safe, dependable electrical services you can trust. Your family&apos;s safety is our #1 priority.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-megrim text-4xl text-earle-black mb-6">Our Story</h2>
              <div className="space-y-4 font-raleway text-gray-600">
                <p>
                  G3 Electric was founded with a simple mission: to provide safe, dependable electrical services that families can trust. 
                  After 15+ years in the electrical industry, we&apos;ve seen too many homeowners left with subpar work and safety concerns.
                </p>
                <p>
                  We believe that electrical work isn&apos;t just about wires and circuits—it&apos;s about protecting what matters most: your family, 
                  your home, and your peace of mind. That&apos;s why safety is at the heart of everything we do.
                </p>
                <p>
                  From small residential projects to large commercial builds, we approach every job with the same commitment to quality, 
                  safety, and customer satisfaction. Our licensed electricians are not just skilled technicians—they&apos;re safety advocates 
                  who take pride in protecting your home and family.
                </p>
              </div>
            </div>
            <div className="bg-white-smoke p-8 rounded-lg">
              <div className="text-center">
                <div className="w-24 h-24 bg-purple rounded-full flex items-center justify-center mx-auto mb-6">
                  <BoltIcon className="h-12 w-12 text-white" />
                </div>
                <h3 className="font-montserrat text-2xl font-semibold text-earle-black mb-4">Why Choose G3 Electric?</h3>
                <ul className="space-y-3 text-left">
                  <li className="flex items-center font-raleway text-gray-600">
                    <CheckBadgeIcon className="h-5 w-5 text-purple mr-3 flex-shrink-0" />
                    Licensed & Insured
                  </li>
                  <li className="flex items-center font-raleway text-gray-600">
                    <CheckBadgeIcon className="h-5 w-5 text-purple mr-3 flex-shrink-0" />
                    Safety-First Approach
                  </li>
                  <li className="flex items-center font-raleway text-gray-600">
                    <CheckBadgeIcon className="h-5 w-5 text-purple mr-3 flex-shrink-0" />
                    Code Compliance Guaranteed
                  </li>
                  <li className="flex items-center font-raleway text-gray-600">
                    <CheckBadgeIcon className="h-5 w-5 text-purple mr-3 flex-shrink-0" />
                    Quality Materials Only
                  </li>
                  <li className="flex items-center font-raleway text-gray-600">
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
            <h2 className="font-megrim text-4xl text-earle-black mb-4">Our Values</h2>
            <p className="font-raleway text-lg text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do and ensure you receive the best possible service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-purple rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-montserrat text-xl font-semibold text-earle-black mb-4">{value.title}</h3>
                <p className="font-raleway text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-megrim text-4xl text-earle-black mb-4">By the Numbers</h2>
            <p className="font-raleway text-lg text-gray-600 max-w-3xl mx-auto">
              Our track record speaks for itself—safety, quality, and customer satisfaction in every project.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-megrim text-4xl md:text-5xl text-purple mb-2">{stat.number}</div>
                <div className="font-montserrat text-lg font-semibold text-earle-black">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white-smoke">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-megrim text-4xl text-earle-black mb-4">Meet Our Team</h2>
            <p className="font-raleway text-lg text-gray-600 max-w-3xl mx-auto">
              Licensed professionals dedicated to your safety and satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-20 h-20 bg-purple rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserGroupIcon className="h-10 w-10 text-white" />
                </div>
                <h3 className="font-montserrat text-xl font-semibold text-earle-black mb-2">{member.name}</h3>
                <p className="font-raleway text-purple font-medium mb-2">{member.role}</p>
                <p className="font-raleway text-gray-600 text-sm mb-4">{member.experience}</p>
                <div>
                  <h4 className="font-montserrat text-sm font-semibold text-earle-black mb-2">Specialties:</h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {member.specialties.map((specialty, specIndex) => (
                      <span key={specIndex} className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-raleway rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
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
            <h2 className="font-megrim text-4xl mb-6">Our Safety Commitment</h2>
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
          <h2 className="font-megrim text-4xl mb-6">Ready to Work With Us?</h2>
          <p className="font-raleway text-lg mb-8 max-w-2xl mx-auto">
            Experience the G3 Electric difference. Safe, dependable electrical services you can trust for your family and business.
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
              <Link href="/services" className="text-gray-600 hover:text-purple font-raleway">Services</Link>
              <Link href="/portfolio" className="text-gray-600 hover:text-purple font-raleway">Portfolio</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-purple font-raleway">Pricing</Link>
              <Link href="/about" className="text-purple font-raleway">About</Link>
              <Link href="/contact" className="text-gray-600 hover:text-purple font-raleway">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
