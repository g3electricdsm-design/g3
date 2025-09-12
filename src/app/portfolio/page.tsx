import Link from "next/link";
import Image from "next/image";
import { HomeIcon, BuildingOfficeIcon, BoltIcon, LightBulbIcon } from "@heroicons/react/24/outline";
import Navigation from "@/components/Navigation";
import { getAllProjects } from "@/data/projects";

export default function Portfolio() {
  // Get portfolio data from the centralized data file
  const portfolioItems = getAllProjects();

  const getSizeClasses = (size: string) => {
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Residential':
        return <HomeIcon className="h-5 w-5" />;
      case 'Commercial':
        return <BuildingOfficeIcon className="h-5 w-5" />;
      default:
        return <BoltIcon className="h-5 w-5" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Lighting':
        return <LightBulbIcon className="h-4 w-4" />;
      case 'Fans':
        return <BoltIcon className="h-4 w-4" />;
      default:
        return <BoltIcon className="h-4 w-4" />;
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
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button className="px-6 py-2 bg-purple text-white rounded-lg font-montserrat font-medium">
              All Projects
            </button>
            <button className="px-6 py-2 bg-white-smoke text-earle-black rounded-lg font-montserrat font-medium hover:bg-gray-200 transition-colors">
              Residential
            </button>
            <button className="px-6 py-2 bg-white-smoke text-earle-black rounded-lg font-montserrat font-medium hover:bg-gray-200 transition-colors">
              Commercial
            </button>
            <button className="px-6 py-2 bg-white-smoke text-earle-black rounded-lg font-montserrat font-medium hover:bg-gray-200 transition-colors">
              Lighting
            </button>
            <button className="px-6 py-2 bg-white-smoke text-earle-black rounded-lg font-montserrat font-medium hover:bg-gray-200 transition-colors">
              New Builds
            </button>
          </div>

          {/* Bento Box Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]">
            {portfolioItems.map((item) => (
              <Link
                key={item.id}
                href={`/portfolio/${item.id}`}
                className={`group relative overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer block ${getSizeClasses(item.size)}`}
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
                      <span className="text-purple-300">{getCategoryIcon(item.category)}</span>
                      <span className="font-montserrat text-sm font-medium">{item.category}</span>
                      <span className="text-white">•</span>
                      <span className="text-purple-300">{getTypeIcon(item.type)}</span>
                      <span className="font-montserrat text-sm font-medium">{item.type}</span>
                    </div>
                    <h3 className="font-montserrat text-lg font-semibold mb-1">{item.title}</h3>
                    <p className="font-raleway text-sm text-white">{item.description}</p>
                  </div>
                </div>

                {/* Always visible content for smaller items */}
                <div className="absolute bottom-4 left-4 right-4 text-white md:hidden">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-purple-300">{getCategoryIcon(item.category)}</span>
                    <span className="font-montserrat text-sm font-medium text-white">{item.category}</span>
                    <span className="text-white">•</span>
                    <span className="text-purple-300">{getTypeIcon(item.type)}</span>
                    <span className="font-montserrat text-sm font-medium text-white">{item.type}</span>
                  </div>
                  <h3 className="font-montserrat text-lg font-semibold mb-1 text-white">{item.title}</h3>
                </div>
              </Link>
            ))}
          </div>

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
      <footer className="py-12" style={{backgroundColor: '#70877F'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="font-montserrat text-2xl text-white mb-4">G3 Electric</h3>
            <p className="font-raleway text-white-smoke mb-4">Safe & Dependable Electrical Services</p>
            <div className="flex justify-center space-x-6">
              <Link href="/services" className="text-white-smoke hover:text-purple font-raleway">Services</Link>
              <Link href="/portfolio" className="text-purple font-raleway">Portfolio</Link>
              <Link href="/pricing" className="text-white-smoke hover:text-purple font-raleway">Pricing</Link>
              <Link href="/about" className="text-white-smoke hover:text-purple font-raleway">About</Link>
              <Link href="/contact" className="text-white-smoke hover:text-purple font-raleway">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
