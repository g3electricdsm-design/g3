'use client';

import Link from "next/link";
import { ArrowLeftIcon, UserIcon, BoltIcon } from "@heroicons/react/24/outline";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProjectDetailSkeleton from "@/components/ProjectDetailSkeleton";
import { getProjectById } from "@/data/projects";
import { getCategoryIcon, getTypeIcon } from "@/utils/icons";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function ProjectDetail() {
  const params = useParams();
  const pathname = usePathname();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const foundProject = await getProjectById(params.id as string);
        setProject(foundProject || null);
      } catch (error) {
        console.error('Error loading project:', error);
        setProject(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadProject();
  }, [params.id]);

  // Update document title and meta description
  useEffect(() => {
    if (project && !isLoading) {
      const titleText = project.seoTitle || `${project.title} | G3 Electric Portfolio`;
      
      // Update document title - try multiple methods to ensure it works
      if (typeof document !== 'undefined') {
        document.title = titleText;
        
        // Also update the title element directly
        const titleElement = document.querySelector('title');
        if (titleElement) {
          titleElement.textContent = titleText;
        }
      }

      // Update or create meta description
      let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.getElementsByTagName('head')[0].appendChild(metaDescription);
      }
      metaDescription.content = project.metaDescription || project.description || '';
    }
  }, [project, isLoading]);

  if (isLoading) {
    return (
      <>
        <Navigation currentPath="/portfolio" />
        <ProjectDetailSkeleton />
        <Footer currentPath="/portfolio" />
      </>
    );
  }

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


  return (
    <div className="min-h-screen bg-earle-black">
      {/* Navigation */}
      <Navigation currentPath="/portfolio" />

      {/* Header */}
      <section className="bg-gradient-to-br from-purple to-phlox text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Link 
              href="/portfolio" 
              className="flex items-center text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all font-raleway font-medium backdrop-blur-sm"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Portfolio
            </Link>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-purple-300">{getCategoryIcon(project.category, 'lg')}</span>
            <span className="font-raleway text-lg uppercase">{project.category}</span>
            <span className="text-white">•</span>
            <span className="text-purple-300">{getTypeIcon(project.type, 'lg')}</span>
            <span className="font-raleway text-lg uppercase">{project.type}</span>
          </div>
          <h1 className="font-megrim text-4xl md:text-5xl mb-4">{project.title}</h1>
          <p className="font-raleway text-lg md:text-xl max-w-3xl">{project.description}</p>
        </div>
      </section>

      {/* Project Details */}
      <section className="pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Project Image */}
              <div className="mb-8">
                <div className="aspect-video relative rounded-lg overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                  />
                </div>
              </div>

              {/* Project Description */}
              {project.overview && (
                <div className="mb-8">
                  <h2 className="font-montserrat text-2xl text-earle-black mb-4">Project Overview</h2>
                  <p className="font-raleway text-lg text-earle-black leading-relaxed">{project.overview}</p>
                </div>
              )}

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

              {/* Challenges */}
              <div className="mb-8">
                <h3 className="font-montserrat text-xl text-earle-black mb-3">Challenges</h3>
                <p className="font-raleway text-earle-black">{project.challenges}</p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white-smoke rounded-lg p-6 lg:sticky lg:top-8">
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
                    className="w-full btn-primary text-center block !text-white no-underline hover:!text-white"
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
      <Footer currentPath={pathname} />
    </div>
  );
}
