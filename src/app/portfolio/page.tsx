'use client';

import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PortfolioSkeleton from "@/components/PortfolioSkeleton";
import { getAllProjects, Project } from "@/data/projects";
import { getCategoryIcon, getTypeIcon } from "@/utils/icons";
import { useState, useEffect } from "react";

export default function Portfolio() {
  const [portfolioItems, setPortfolioItems] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Smart grid packing: sort items to minimize gaps
  const sortForOptimalPacking = (projects: Project[]) => {
    // Priority order: place larger/wider items first to minimize gaps
    return [...projects].sort((a, b) => {
      const sizeOrder: Record<string, number> = {
        'panoramic': 1,  // 3 cols - place first
        'wide': 2,       // 2 cols
        'extraTall': 3,  // 6 rows
        'tall': 4,       // 3 rows
        'square': 5,     // 2 rows
        'short': 6,      // 1 row
        'large': 2,      // back-compat
        'medium': 5,     // back-compat
        'small': 6,      // back-compat
      };
      
      const orderA = sizeOrder[a.size] || 5;
      const orderB = sizeOrder[b.size] || 5;
      
      return orderA - orderB;
    });
  };

  // Refresh portfolio data when component mounts or when data might have changed
  useEffect(() => {
    const refreshData = async () => {
      setIsLoading(true);
      try {
        const projects = await getAllProjects();
        const sorted = sortForOptimalPacking(projects);
        setPortfolioItems(sorted);
      } catch (error) {
        console.error('Error loading projects:', error);
        // Fallback to sync version
        const { getAllProjectsSync } = await import('@/data/projects');
        const fallbackProjects = getAllProjectsSync();
        setPortfolioItems(sortForOptimalPacking(fallbackProjects));
      } finally {
        setIsLoading(false);
      }
    };

    // Refresh on mount
    refreshData();

    // Refresh when window regains focus (user returns from admin)
    window.addEventListener('focus', refreshData);

    return () => {
      window.removeEventListener('focus', refreshData);
    };
  }, []);

  const getSizeClasses = (item: Project) => {
    const normalize = (size: Project['size']) => {
      // Back-compat mapping
      if (size === 'small') return 'short';
      if (size === 'medium') return 'square';
      if (size === 'large') return 'wide';
      return size;
    };

    const size = normalize(item.size);
    console.log(`🎨 Rendering ${item.title}: size="${item.size}" → normalized="${size}", orientation="${item.orientation}"`);
    // Note: orientation affects image cropping, not tile sizing.

    // Figma proportions (node `61:1243`):
    // - short: ~189px
    // - square: 384px
    // - tall portrait: 617px (≈ square + short + gap)
    // We approximate using grid rows: md:auto-rows-[180px] + gap-6 (24px)
    // - short: 1 row = 180px
    // - square: 2 rows = 180*2 + 24 = 384px
    // - tall: 3 rows = 180*3 + 48 = 588px (matches the "square + short" intent)
    const spanToClasses = (span: 1 | 2 | 3 | 6) => {
      if (span === 6) return { base: 'row-span-6', md: 'md:row-span-6' };
      if (span === 3) return { base: 'row-span-3', md: 'md:row-span-3' };
      if (span === 2) return { base: 'row-span-2', md: 'md:row-span-2' };
      return { base: 'row-span-1', md: 'md:row-span-1' };
    };

    const effectiveSize = size;

    if (effectiveSize === 'panoramic') {
      const s = spanToClasses(2);
      return `${s.base} md:col-span-3 ${s.md}`;
    }

    if (effectiveSize === 'wide') {
      const s = spanToClasses(2);
      return `${s.base} md:col-span-2 ${s.md}`;
    }

    if (effectiveSize === 'extraTall') {
      const s = spanToClasses(6);
      return `${s.base} md:col-span-1 ${s.md}`;
    }

    if (effectiveSize === 'tall') {
      const s = spanToClasses(3);
      return `${s.base} md:col-span-1 ${s.md}`;
    }

    if (effectiveSize === 'short') {
      const s = spanToClasses(1);
      return `${s.base} md:col-span-1 ${s.md}`;
    }

    // square
    const s = spanToClasses(2);
    return `${s.base} md:col-span-1 ${s.md}`;
  };


  return (
    <div className="min-h-screen bg-earle-black">
      {/* Navigation */}
      <Navigation currentPath="/portfolio" />

      {/* Header */}
      <section className="bg-gradient-to-br from-purple to-phlox text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-megrim text-5xl md:text-6xl mb-4">Portfolio</h1>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[220px] md:auto-rows-[180px]" style={{ gridAutoFlow: 'dense' }}>
            {portfolioItems.map((item) => (
              <Link
                key={item.id}
                href={`/portfolio/${item.slug || item.id}`}
                className={`group relative overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer block ${getSizeClasses(item)}`}
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
