'use client';

import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PortfolioSkeleton from "@/components/PortfolioSkeleton";
import { getAllProjects } from "@/data/projects";
import { getCategoryIcon, getTypeIcon } from "@/utils/icons";
import { useState, useEffect } from "react";

export default function Portfolio() {
  const [portfolioItems, setPortfolioItems] = useState(getAllProjects());
  const [isLoading, setIsLoading] = useState(false);

  // Refresh portfolio data when component mounts or when data might have changed
  useEffect(() => {
    const refreshData = () => {
      setIsLoading(true);
      // Simulate a brief delay for smoother UX
      setTimeout(() => {
        setPortfolioItems(getAllProjects());
        setIsLoading(false);
      }, 300);
    };

    // Refresh on mount
    refreshData();

    // Refresh when window regains focus (user returns from admin)
    window.addEventListener('focus', refreshData);

    return () => {
      window.removeEventListener('focus', refreshData);
    };
  }, []);

  const getSizeClasses = (size: string, index: number) => {
    // First project spans 3 columns wide
    if (index === 0) {
      return 'md:col-span-3 md:row-span-2';
    }
    
    switch (size) {
      case 'large':
        return 'md:col-span-2 md:row-span-2';
      case 'medium':
        return 'md:col-span-1 md:row-span-1';
      case 'small':
        return 'md:col-span-1 md:row-span-1';
      default:
        return 'md:col-span-1 md:row-span-1';
    }
  };


  return (
    <div className="min-h-screen bg-earle-black">
      {/* Navigation */}
      <Navigation currentPath="/portfolio" />

      {/* Header */}
      <section className="bg-gradient-to-br from-purple to-phlox text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-megrim text-5xl md:text-6xl mb-4">Our Portfolio</h1>
          <p className="font-raleway text-lg md:text-xl max-w-3xl">
            See our recent work showcasing safe, dependable electrical solutions for both residential and commercial projects.
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 bg-earle-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Bento Box Grid */}
          {isLoading ? (
            <PortfolioSkeleton />
          ) : portfolioItems.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="font-montserrat text-3xl text-white mb-4">No Projects Yet</h2>
              <p className="font-raleway text-lg text-white-smoke mb-8 max-w-2xl mx-auto">
                We&apos;re busy working on amazing projects! Check back soon to see our portfolio, or contact us to discuss your next electrical project.
              </p>
              <Link 
                href="/contact" 
                className="bg-purple text-white px-8 py-3 rounded-lg font-montserrat font-semibold hover:bg-phlox transition-colors inline-block"
              >
                Get Started
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
            {portfolioItems.map((item, index) => (
              <Link
                key={item.id}
                href={`/portfolio/${item.id}`}
                className={`group relative overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer block ${getSizeClasses(item.size, index)}`}
              >
                {/* Project Image */}
                <div className="absolute inset-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-purple-300">{getCategoryIcon(item.category, 'md')}</span>
                      <span className="font-raleway text-sm font-medium uppercase">{item.category}</span>
                      <span className="text-white">•</span>
                      <span className="text-purple-300">{getTypeIcon(item.type, 'md')}</span>
                      <span className="font-raleway text-sm font-medium uppercase">{item.type}</span>
                    </div>
                    <h3 className="font-montserrat text-lg font-semibold mb-1">{item.title}</h3>
                    <p className="font-raleway text-sm text-white">{item.description}</p>
                  </div>
                </div>

                {/* Always visible content for smaller items */}
                <div className="absolute bottom-4 left-4 right-4 text-white md:hidden">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-purple-300">{getCategoryIcon(item.category, 'md')}</span>
                    <span className="font-raleway text-sm font-medium text-white uppercase">{item.category}</span>
                    <span className="text-white">•</span>
                    <span className="text-purple-300">{getTypeIcon(item.type, 'md')}</span>
                    <span className="font-raleway text-sm font-medium text-white uppercase">{item.type}</span>
                  </div>
                  <h3 className="font-montserrat text-lg font-semibold mb-1 text-white">{item.title}</h3>
                </div>
              </Link>
            ))}
          </div>
          )}

          {/* CTA Section */}
          <div className="text-center mt-16">
            <h2 className="font-montserrat text-3xl text-white mb-4">Like What You See?</h2>
            <p className="font-raleway text-lg text-white-smoke mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss your next electrical project. We&apos;re committed to delivering the same quality and safety standards you see in our portfolio.
            </p>
            <Link 
              href="/contact" 
              className="bg-purple text-white px-8 py-3 rounded-lg font-montserrat font-semibold hover:bg-phlox transition-colors inline-block"
            >
              Start Your Project
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer currentPath="/portfolio" />
    </div>
  );
}
