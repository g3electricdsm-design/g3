import Link from "next/link";
import { ArrowLeftIcon, HomeIcon, BuildingOfficeIcon, BoltIcon, LightBulbIcon, CalendarIcon, ClockIcon, UserIcon } from "@heroicons/react/24/outline";
import Navigation from "@/components/Navigation";
import { getProjectById } from "@/data/projects";

interface ProjectDetailProps {
  params: {
    id: string;
  };
}

export default function ProjectDetail({ params }: ProjectDetailProps) {
  const project = getProjectById(params.id);

  if (!project) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation currentPath="/portfolio" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="font-megrim text-4xl text-earle-black mb-4">Project Not Found</h1>
            <p className="font-raleway text-lg text-earle-black mb-8">The project you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/portfolio" className="btn-primary">
              Back to Portfolio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Residential':
        return <HomeIcon className="h-6 w-6" />;
      case 'Commercial':
        return <BuildingOfficeIcon className="h-6 w-6" />;
      default:
        return <BoltIcon className="h-6 w-6" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Lighting':
        return <LightBulbIcon className="h-5 w-5" />;
      case 'Fans':
        return <BoltIcon className="h-5 w-5" />;
      default:
        return <BoltIcon className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-earle-black">
      {/* Navigation */}
      <Navigation currentPath="/portfolio" />

      {/* Header */}
      <section className="bg-gradient-to-br from-purple to-phlox text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Link href="/portfolio" className="flex items-center text-white hover:text-white-smoke transition-colors">
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Portfolio
            </Link>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-purple-300">{getCategoryIcon(project.category)}</span>
            <span className="font-montserrat text-lg">{project.category}</span>
            <span className="text-white">•</span>
            <span className="text-purple-300">{getTypeIcon(project.type)}</span>
            <span className="font-montserrat text-lg">{project.type}</span>
          </div>
          <h1 className="font-megrim text-4xl md:text-5xl mb-4">{project.title}</h1>
          <p className="font-raleway text-lg md:text-xl max-w-3xl">{project.description}</p>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Project Image */}
              <div className="mb-8">
                <div className="aspect-video bg-gradient-to-br from-purple/20 to-phlox/20 rounded-lg flex items-center justify-center">
                  <div className="text-center text-earle-black">
                    <div className="w-20 h-20 bg-purple/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <BoltIcon className="h-10 w-10 text-purple" />
                    </div>
                    <div className="font-montserrat text-lg font-medium">{project.title}</div>
                    <div className="font-raleway text-sm text-earle-black mt-2">{project.category} • {project.type}</div>
                  </div>
                </div>
              </div>

              {/* Project Description */}
              <div className="mb-8">
                <h2 className="font-montserrat text-2xl text-earle-black mb-4">Project Overview</h2>
                <p className="font-raleway text-lg text-earle-black leading-relaxed">{project.fullDescription}</p>
              </div>

              {/* Services Provided */}
              <div className="mb-8">
                <h2 className="font-montserrat text-2xl text-earle-black mb-4">Services Provided</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.services.map((service, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white-smoke rounded-lg">
                      <div className="w-2 h-2 bg-purple rounded-full"></div>
                      <span className="font-raleway text-earle-black">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Challenges & Results */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-montserrat text-xl text-earle-black mb-3">Challenges</h3>
                  <p className="font-raleway text-earle-black">{project.challenges}</p>
                </div>
                <div>
                  <h3 className="font-montserrat text-xl text-earle-black mb-3">Results</h3>
                  <p className="font-raleway text-earle-black">{project.results}</p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white-smoke rounded-lg p-6 sticky top-8">
                <h3 className="font-montserrat text-xl text-earle-black mb-6">Project Details</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple/10 rounded-lg flex items-center justify-center">
                      <UserIcon className="h-5 w-5 text-purple" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-raleway text-sm font-medium text-earle-black mb-1">Client</div>
                      <div className="font-montserrat text-earle-black text-lg">{project.client}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple/10 rounded-lg flex items-center justify-center">
                      <CalendarIcon className="h-5 w-5 text-purple" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-raleway text-sm font-medium text-earle-black mb-1">Completed</div>
                      <div className="font-montserrat text-earle-black text-lg">{project.completed}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple/10 rounded-lg flex items-center justify-center">
                      <ClockIcon className="h-5 w-5 text-purple" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-raleway text-sm font-medium text-earle-black mb-1">Duration</div>
                      <div className="font-montserrat text-earle-black text-lg">{project.duration}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple/10 rounded-lg flex items-center justify-center">
                      <BoltIcon className="h-5 w-5 text-purple" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-raleway text-sm font-medium text-earle-black mb-1">Location</div>
                      <div className="font-montserrat text-earle-black text-lg">{project.location}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-300">
                  <Link 
                    href="/contact" 
                    className="w-full btn-primary text-center block"
                  >
                    Start Your Project
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-hookers-green py-12">
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
