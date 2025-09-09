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
import Navigation from "@/components/Navigation";
import { getContent } from "@/data/content";

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
          <h1 className="font-megrim text-5xl md:text-6xl mb-4">{content.title}</h1>
          <p className="font-raleway text-lg md:text-xl max-w-3xl">
            {content.description}
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-montserrat text-4xl text-earle-black mb-6">{content.story.title}</h2>
              <div className="space-y-4 font-raleway text-gray-600">
                {content.story.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="bg-white-smoke p-8 rounded-lg">
              <div className="text-center">
                <div className="w-24 h-24 bg-purple rounded-full flex items-center justify-center mx-auto mb-6">
                  <BoltIcon className="h-12 w-12 text-white" />
                </div>
                <h3 className="font-montserrat text-2xl font-semibold text-earle-black mb-4">{content.whyChoose.title}</h3>
                <ul className="space-y-3 text-left">
                  {content.whyChoose.features.map((feature, index) => (
                    <li key={index} className="flex items-center font-raleway text-gray-600">
                      <CheckBadgeIcon className="h-5 w-5 text-purple mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
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
            <h2 className="font-montserrat text-4xl text-earle-black mb-4">{content.values.title}</h2>
            <p className="font-raleway text-lg text-gray-600 max-w-3xl mx-auto">
              {content.values.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.values.items.map((value, index) => {
              const IconComponent = iconMap[value.icon as keyof typeof iconMap] || ShieldCheckIcon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-purple rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-montserrat text-xl font-semibold text-earle-black mb-4">{value.title}</h3>
                  <p className="font-raleway text-gray-600">{value.description}</p>
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
            <h2 className="font-montserrat text-4xl text-earle-black mb-4">{content.stats.title}</h2>
            <p className="font-raleway text-lg text-gray-600 max-w-3xl mx-auto">
              {content.stats.description}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {content.stats.items.map((stat, index) => (
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
            <h2 className="font-montserrat text-4xl text-earle-black mb-4">{content.team.title}</h2>
            <p className="font-raleway text-lg text-gray-600 max-w-3xl mx-auto">
              {content.team.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.team.members.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm text-center overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-purple/20 to-phlox/20 flex items-center justify-center">
                  <div className="w-24 h-24 bg-purple/30 rounded-full flex items-center justify-center">
                    <UserGroupIcon className="h-12 w-12 text-purple" />
                  </div>
                </div>
                <div className="p-6">
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
            <h2 className="font-montserrat text-4xl mb-6">{content.safetyCommitment.title}</h2>
            <p className="font-raleway text-lg md:text-xl mb-8 max-w-4xl mx-auto">
              {content.safetyCommitment.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {content.safetyCommitment.features.map((feature, index) => {
                const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || ClockIcon;
                return (
                  <div key={index}>
                    <IconComponent className="h-8 w-8 mx-auto mb-4" />
                    <h3 className="font-montserrat text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="font-raleway text-sm">{feature.description}</p>
                  </div>
                );
              })}
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="btn-primary"
            >
              {content.cta.primaryButton}
            </Link>
            <Link 
              href="/portfolio" 
              className="btn-secondary border-white text-white hover:bg-white hover:text-purple"
            >
              {content.cta.secondaryButton}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white-smoke py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="font-montserrat text-2xl text-earle-black mb-4">G3 Electric</h3>
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
