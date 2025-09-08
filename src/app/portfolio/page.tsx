import Link from "next/link";
import { ArrowLeftIcon, HomeIcon, BuildingOfficeIcon, BoltIcon, LightBulbIcon } from "@heroicons/react/24/outline";

export default function Portfolio() {
  // Sample portfolio data - in a real app, this would come from a CMS or database
  const portfolioItems = [
    {
      id: 1,
      title: "Modern Kitchen Lighting",
      category: "Residential",
      type: "Lighting",
      image: "/api/placeholder/600/400",
      description: "Custom LED under-cabinet lighting installation",
      size: "large"
    },
    {
      id: 2,
      title: "Office Building Wiring",
      category: "Commercial",
      type: "New Build",
      image: "/api/placeholder/400/300",
      description: "Complete electrical infrastructure for new office complex",
      size: "medium"
    },
    {
      id: 3,
      title: "Smart Home Integration",
      category: "Residential",
      type: "Outlets & Controls",
      image: "/api/placeholder/400/500",
      description: "Smart switches and outlet installation throughout home",
      size: "medium"
    },
    {
      id: 4,
      title: "Retail Store Lighting",
      category: "Commercial",
      type: "Lighting",
      image: "/api/placeholder/300/200",
      description: "Energy-efficient LED lighting for retail space",
      size: "small"
    },
    {
      id: 5,
      title: "Ceiling Fan Installation",
      category: "Residential",
      type: "Fans",
      image: "/api/placeholder/300/200",
      description: "Multiple ceiling fan installations with smart controls",
      size: "small"
    },
    {
      id: 6,
      title: "Restaurant Electrical",
      category: "Commercial",
      type: "New Build",
      image: "/api/placeholder/600/300",
      description: "Complete electrical system for new restaurant build",
      size: "large"
    },
    {
      id: 7,
      title: "Outdoor Lighting System",
      category: "Residential",
      type: "Lighting",
      image: "/api/placeholder/400/300",
      description: "Landscape and security lighting installation",
      size: "medium"
    },
    {
      id: 8,
      title: "Warehouse Lighting",
      category: "Commercial",
      type: "Lighting",
      image: "/api/placeholder/300/200",
      description: "High-bay LED lighting for industrial warehouse",
      size: "small"
    }
  ];

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
                <Link href="/portfolio" className="text-purple px-3 py-2 rounded-md text-sm font-medium">Portfolio</Link>
                <Link href="/pricing" className="text-earle-black hover:text-purple px-3 py-2 rounded-md text-sm font-medium">Pricing</Link>
                <Link href="/about" className="text-earle-black hover:text-purple px-3 py-2 rounded-md text-sm font-medium">About</Link>
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
          <h1 className="font-megrim text-5xl md:text-6xl mb-4">Our Portfolio</h1>
          <p className="font-raleway text-lg md:text-xl max-w-3xl">
            See our recent work showcasing safe, dependable electrical solutions for both residential and commercial projects.
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20">
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
              <div
                key={item.id}
                className={`group relative overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer ${getSizeClasses(item.size)}`}
              >
                {/* Image placeholder with proper aspect ratio */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple/20 to-phlox/20 flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <div className="w-16 h-16 bg-purple/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <BoltIcon className="h-8 w-8 text-purple" />
                    </div>
                    <div className="font-montserrat text-sm font-medium">{item.title}</div>
                    <div className="font-raleway text-xs text-gray-500 mt-1">{item.category}</div>
                  </div>
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-purple-300">{getCategoryIcon(item.category)}</span>
                      <span className="font-montserrat text-sm font-medium">{item.category}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-purple-300">{getTypeIcon(item.type)}</span>
                      <span className="font-montserrat text-sm font-medium">{item.type}</span>
                    </div>
                    <h3 className="font-montserrat text-lg font-semibold mb-1">{item.title}</h3>
                    <p className="font-raleway text-sm text-gray-200">{item.description}</p>
                  </div>
                </div>

                {/* Always visible content for smaller items */}
                <div className="absolute bottom-4 left-4 right-4 text-white md:hidden">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-purple-300">{getCategoryIcon(item.category)}</span>
                    <span className="font-montserrat text-sm font-medium">{item.category}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-purple-300">{getTypeIcon(item.type)}</span>
                    <span className="font-montserrat text-sm font-medium">{item.type}</span>
                  </div>
                  <h3 className="font-montserrat text-lg font-semibold mb-1">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <h2 className="font-megrim text-3xl text-earle-black mb-4">Like What You See?</h2>
            <p className="font-raleway text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
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
      <footer className="bg-white-smoke py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="font-megrim text-2xl text-earle-black mb-4">G3 Electric</h3>
            <p className="font-raleway text-gray-600 mb-4">Safe & Dependable Electrical Services</p>
            <div className="flex justify-center space-x-6">
              <Link href="/services" className="text-gray-600 hover:text-purple font-raleway">Services</Link>
              <Link href="/portfolio" className="text-purple font-raleway">Portfolio</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-purple font-raleway">Pricing</Link>
              <Link href="/about" className="text-gray-600 hover:text-purple font-raleway">About</Link>
              <Link href="/contact" className="text-gray-600 hover:text-purple font-raleway">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
