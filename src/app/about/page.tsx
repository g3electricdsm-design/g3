'use client';

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { 
  ShieldCheckIcon, 
  BoltIcon, 
  HeartIcon, 
  StarIcon,
  CheckBadgeIcon,
  ClockIcon,
  UserGroupIcon
} from "@heroicons/react/24/outline";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Employee from "@/components/Employee";
import AnimatedCounter from "@/components/AnimatedCounter";
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
          <h1 className="font-megrim text-5xl md:text-6xl mb-4">{content.hero.title}</h1>
          <p className="font-raleway text-lg md:text-xl max-w-3xl">
            {content.hero.description}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="pt-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat text-4xl text-earle-black mb-4">By the Numbers</h2>
            <p className="font-raleway text-lg text-earle-black max-w-3xl mx-auto">
              Our track record speaks for itself—safety, quality, and customer satisfaction in every project.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="font-montserrat text-4xl md:text-5xl font-black text-purple mb-2">
                <AnimatedCounter end={10} suffix="+" duration={1800} className="inline-block" />
              </div>
              <div className="font-montserrat text-lg font-semibold text-earle-black">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="font-montserrat text-4xl md:text-5xl font-black text-purple mb-2">
                <AnimatedCounter end={1000} suffix="+" duration={2200} className="inline-block" />
              </div>
              <div className="font-montserrat text-lg font-semibold text-earle-black">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="font-montserrat text-4xl md:text-5xl font-black text-purple mb-2">
                <AnimatedCounter end={100} suffix="%" duration={1500} className="inline-block" />
              </div>
              <div className="font-montserrat text-lg font-semibold text-earle-black">Safety Record</div>
            </div>
            <div className="text-center">
              <div className="font-montserrat text-4xl md:text-5xl font-black text-purple mb-2">24/7</div>
              <div className="font-montserrat text-lg font-semibold text-earle-black">Emergency Service</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose & Values Combined Section */}
      <section className="py-20 bg-white-smoke">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Why Choose G3 Electric - Left Column */}
            <div className="bg-purple p-8 rounded-lg">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BoltIcon className="h-12 w-12 text-white" />
                </div>
                <h3 className="font-montserrat text-2xl font-semibold text-white mb-4">Why Choose G3 Electric?</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center font-raleway text-white">
                  <CheckBadgeIcon className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                  Licensed & Insured
                </li>
                <li className="flex items-center font-raleway text-white">
                  <CheckBadgeIcon className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                  Safety-First Approach
                </li>
                <li className="flex items-center font-raleway text-white">
                  <CheckBadgeIcon className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                  Code Compliance Guaranteed
                </li>
                <li className="flex items-center font-raleway text-white">
                  <CheckBadgeIcon className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                  Quality Materials Only
                </li>
                <li className="flex items-center font-raleway text-white">
                  <CheckBadgeIcon className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                  Honest, Transparent Pricing
                </li>
              </ul>
            </div>

            {/* Our Values - Right Column */}
            <div className="bg-purple p-8 rounded-lg">
              <div className="text-center mb-8">
                <h3 className="font-montserrat text-2xl font-semibold text-white mb-4">Our Values</h3>
                <p className="font-raleway text-white">
                  These core values guide everything we do and ensure you receive the best possible service.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.values.map((value, index) => {
                  const IconComponent = iconMap[value.icon as keyof typeof iconMap] || ShieldCheckIcon;
                  return (
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <h4 className="font-montserrat text-lg font-semibold text-white mb-2">{value.title}</h4>
                      <p className="font-raleway text-sm text-white">{value.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Hidden for now */}
      {false && (
      <section className="py-20 bg-white-smoke">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat text-4xl text-earle-black mb-4">Meet Our Team</h2>
            <p className="font-raleway text-lg text-earle-black max-w-3xl mx-auto">
              Licensed professionals dedicated to your safety and satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Employee
              headshot="/images/testimonials/nick.jpg"
              employee_name="Nick Johnson"
              yearsOfExperience={15}
              certification="Master Electrician BA from University of Grandview"
            />
            <Employee
              headshot="/images/testimonials/mike-chen.jpg"
              employee_name="Mike Chen"
              yearsOfExperience={12}
              certification="Master Electrician BA from University of Grandview"
            />
          </div>
        </div>
      </section>
      )}

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
              href="/portfolio" 
              className="btn-secondary border-white text-white hover:bg-white hover:text-purple w-full sm:w-auto text-sm sm:text-base"
            >
              View Our Work
            </Link>
            <Link 
              href="/contact" 
              className="btn-primary w-full sm:w-auto text-sm sm:text-base"
            >
              Get Free Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer currentPath="/about" />
    </div>
  );
}

