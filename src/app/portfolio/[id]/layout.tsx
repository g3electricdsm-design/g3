import { Metadata } from 'next';
import { storage } from '@/lib/projects-storage';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const project = await storage.getById(id);

    if (!project) {
      return {
        title: 'Project Not Found',
        description: 'The requested project could not be found.',
      };
    }

    const title =
      project.seoTitle || `${project.title} - Electrical Project`;
    const description =
      project.metaDescription ||
      project.description ||
      `View the ${project.title} project by G3 Electric in ${project.location}.`;

    return {
      title,
      description,
      alternates: {
        canonical: `/portfolio/${project.slug || project.id}`,
      },
      openGraph: {
        title: `${project.title} | G3 Electric Portfolio`,
        description,
        images: project.image ? [{ url: project.image }] : undefined,
      },
    };
  } catch {
    return {
      title: 'Portfolio Project',
      description: 'View this electrical project by G3 Electric in Des Moines.',
    };
  }
}

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
