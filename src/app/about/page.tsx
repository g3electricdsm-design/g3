'use client';

import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedCounter from "@/components/AnimatedCounter";
import { getContent } from "@/data/content";

const CREDENTIALS = [
  "Licensed & insured",
  "Safety-first approach",
  "Code compliance guaranteed",
  "Quality materials only",
  "Honest, transparent pricing",
] as const;

export default function About() {
  const content = getContent().about;

  return (
    <div className="min-h-screen bg-earle-black">
      <Navigation currentPath="/about" />

      <section className="bg-gradient-to-br from-purple to-phlox text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-megrim text-5xl md:text-6xl mb-4">{content.hero.title}</h1>
          <p className="font-raleway text-lg md:text-xl max-w-3xl">
            {content.hero.description}
          </p>
        </div>
      </section>

      <section className="pt-10 pb-20 bg-earle-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat text-4xl text-white mb-4">By the Numbers</h2>
            <p className="font-raleway text-lg text-white-smoke max-w-3xl mx-auto">
              Our track record speaks for itself—safety, quality, and customer satisfaction in every project.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="font-montserrat text-4xl md:text-5xl font-black text-purple mb-2">
                <AnimatedCounter end={10} suffix="+" duration={1800} className="inline-block" />
              </div>
              <div className="font-montserrat text-lg font-semibold text-white">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="font-montserrat text-4xl md:text-5xl font-black text-purple mb-2">
                <AnimatedCounter end={1000} suffix="+" duration={2200} className="inline-block" />
              </div>
              <div className="font-montserrat text-lg font-semibold text-white">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="font-montserrat text-4xl md:text-5xl font-black text-purple mb-2">
                <AnimatedCounter end={100} suffix="%" duration={1500} className="inline-block" />
              </div>
              <div className="font-montserrat text-lg font-semibold text-white">Safety Record</div>
            </div>
            <div className="text-center">
              <div className="font-montserrat text-4xl md:text-5xl font-black text-purple mb-2">24/7</div>
              <div className="font-montserrat text-lg font-semibold text-white">Emergency Service</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white-smoke">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            <div className="relative min-h-[280px] lg:min-h-[420px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/hero-electrical-project.jpg"
                alt="Electrical work by G3 Electric"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="font-montserrat text-sm font-semibold uppercase tracking-widest text-purple mb-3">
                Our Story
              </p>
              <h2 className="font-montserrat text-3xl md:text-4xl font-semibold text-earle-black mb-4">
                {content.mission.title}
              </h2>
              <p className="font-raleway text-lg text-earle-black/90 mb-8">
                {content.mission.description}
              </p>
              <ul className="space-y-0 border-l-2 border-purple/40 pl-6">
                {CREDENTIALS.map((line) => (
                  <li
                    key={line}
                    className="font-raleway text-earle-black py-2 border-b border-earle-black/10 last:border-b-0"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-purple to-phlox text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <Image
              src="/icons/safety-goggles.svg"
              alt=""
              width={72}
              height={72}
              className="h-[72px] w-[72px] brightness-0 invert"
            />
          </div>
          <h2 className="font-montserrat text-4xl mb-6">Our Safety Commitment</h2>
          <p className="font-raleway text-lg md:text-xl">
            We don&apos;t just follow safety protocols—we live them. Every member of our team is trained in the latest safety
            procedures, and we continuously invest in education and equipment to ensure your family&apos;s protection.
          </p>
        </div>
      </section>

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
              Contact Our Electricians
            </Link>
          </div>
        </div>
      </section>

      <Footer currentPath="/about" />
    </div>
  );
}
