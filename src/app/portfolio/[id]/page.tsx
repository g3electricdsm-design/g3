import Link from "next/link";
import { UserIcon, BoltIcon } from "@heroicons/react/24/outline";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProjectImageGallery from "@/components/ProjectImageGallery";
import { getCategoryIcon, getTypeIcon } from "@/utils/icons";
import { storage } from "@/lib/projects-storage";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const revalidate = 60;

export async function generateStaticParams() {
  const projects = await storage.getAll();
  return projects.flatMap((project) => {
    const params = [{ id: project.id.toString() }];
    if (project.slug) params.push({ id: project.slug });
    return params;
  });
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const project = await storage.getById(id);
  if (!project) return { title: "Project Not Found" };

  const title = project.seoTitle || `${project.title} | G3 Electric Portfolio`;
  const description = project.metaDescription || project.description || "";

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function ProjectDetail(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const project = await storage.getById(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-earle-black">
      <Navigation currentPath="/portfolio" />

      <section className="bg-gradient-to-br from-purple to-phlox text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-purple-300">{getCategoryIcon(project.category, 'lg')}</span>
            <span className="font-raleway text-lg uppercase">{project.category}</span>
            <span className="text-white">•</span>
            <span className="text-purple-300">{getTypeIcon(project.type, 'lg')}</span>
            <span className="font-raleway text-lg uppercase">{project.type}</span>
          </div>
          <h1 className="!font-montserrat text-5xl md:text-6xl mb-4">{project.title}</h1>
          <p className="font-raleway text-lg md:text-xl max-w-3xl">{project.description}</p>
        </div>
      </section>

      <section className="pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <ProjectImageGallery
                mainImage={project.image}
                title={project.title}
                orientation={project.orientation}
                gallery={project.gallery}
              />

              {project.overview && (
                <div className="mb-8">
                  <h2 className="font-montserrat text-2xl text-earle-black mb-4">Project Overview</h2>
                  <p className="font-raleway text-lg text-earle-black leading-relaxed">{project.overview}</p>
                </div>
              )}

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

              <div className="mb-8">
                <h3 className="font-montserrat text-xl text-earle-black mb-3">Challenges</h3>
                <p className="font-raleway text-earle-black">{project.challenges}</p>
              </div>
            </div>

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

      <Footer currentPath="/portfolio" />
    </div>
  );
}
