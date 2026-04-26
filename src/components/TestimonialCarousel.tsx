'use client';
/* eslint-disable @next/next/no-img-element */

import { useState, useEffect, useCallback } from "react";
import { getAllTestimonials, getAllTestimonialsSync, Testimonial } from "@/data/testimonials";
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function TestimonialCarousel() {
  const [allTestimonials, setAllTestimonials] = useState<Testimonial[]>(getAllTestimonialsSync());
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    getAllTestimonials()
      .then((data) => setAllTestimonials(data))
      .catch(console.error);
  }, []);

  const current = allTestimonials[currentIndex];

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % allTestimonials.length);
  }, [allTestimonials.length]);

  const previous = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? allTestimonials.length - 1 : prev - 1
    );
  }, [allTestimonials.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") previous();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, previous]);

  if (!current) return null;

  return (
    <section className="py-20 bg-earle-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-montserrat text-4xl font-semibold text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="font-raleway text-lg text-white-smoke max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our satisfied
            customers have to say about our electrical services.
          </p>
        </div>

        {/* Card */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="rounded-2xl border border-white/10 border-t-2 border-t-purple overflow-hidden"
        >
          <div className="flex flex-col md:flex-row">
            {/* Left — text content */}
            <div className="flex flex-col justify-between gap-8 p-8 md:p-10 md:w-1/2">
              <div className="space-y-4">
                <h3 className="font-montserrat text-2xl font-semibold text-white leading-tight">
                  {current.title}
                </h3>
                <p className="font-raleway text-base text-white-smoke leading-relaxed">
                  &ldquo;{current.text}&rdquo;
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="font-montserrat text-sm font-semibold text-white">
                    {current.name}
                  </p>
                  <p className="font-raleway text-sm text-white-smoke/70">
                    {current.location} &mdash; {current.project}
                  </p>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={previous}
                    aria-label="Previous testimonial"
                    className="shrink-0 p-2 rounded-lg border-2 border-purple/50 text-white hover:bg-purple/20 hover:border-purple transition-colors"
                  >
                    <ChevronLeftIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next testimonial"
                    className="btn-primary shrink-0 px-5 py-2 text-sm"
                  >
                    <span className="inline-flex items-center gap-2 whitespace-nowrap">
                      Next
                      <ChevronRightIcon className="h-4 w-4 shrink-0" aria-hidden />
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right — image panel */}
            {(current.image || current.image2) && (
              <div className="md:w-1/2 min-h-[280px] md:min-h-0">
                {current.imageMode === "before-after" && current.image && current.image2 ? (
                  <div className="flex h-full min-h-[280px]">
                    {/* Before */}
                    <div className="relative flex-1 overflow-hidden">
                      <img
                        src={current.image}
                        alt={`${current.name} — Before`}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                      <span className="absolute bottom-3 left-3 bg-earle-black/80 text-white text-sm font-montserrat font-semibold px-5 py-2 rounded-full backdrop-blur-sm">
                        Before
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="w-px bg-white/20 shrink-0" />

                    {/* After */}
                    <div className="relative flex-1 overflow-hidden">
                      <img
                        src={current.image2}
                        alt={`${current.name} — After`}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                      <span className="absolute bottom-3 left-3 bg-purple/90 text-white text-sm font-montserrat font-semibold px-5 py-2 rounded-full backdrop-blur-sm">
                        After
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="relative h-full min-h-[280px]">
                    {current.image && (
                      <img
                        src={current.image}
                        alt={`${current.name} — Customer testimonial`}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
