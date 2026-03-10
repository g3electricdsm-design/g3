import { MetadataRoute } from 'next';
import { storage } from '@/lib/projects-storage';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://g3electricdsm.com';

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
  ];

  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    const projects = await storage.getAll();
    projectRoutes = projects.map((project) => ({
      url: `${baseUrl}/portfolio/${project.slug || project.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error('Error generating sitemap project routes:', error);
  }

  return [...staticRoutes, ...projectRoutes];
}
