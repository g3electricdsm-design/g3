import { Project } from '@/data/projects';

const API_BASE = '/api/projects';

// API client for projects
export const projectsAPI = {
  // Get all projects
  async getAll(): Promise<Project[]> {
    try {
      const response = await fetch(API_BASE);
      const result = await response.json();
      if (result.success) {
        return result.data;
      }
      throw new Error(result.error || 'Failed to fetch projects');
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Fallback to default projects if API fails
      const { projects } = await import('@/data/projects');
      return projects;
    }
  },

  // Get project by ID or slug
  async getById(idOrSlug: string): Promise<Project | null> {
    try {
      const response = await fetch(`${API_BASE}/${idOrSlug}`);
      const result = await response.json();
      if (result.success) {
        return result.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching project:', error);
      return null;
    }
  },

  // Create a new project
  async create(project: Project): Promise<Project> {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    });
    const result = await response.json();
    if (result.success) {
      return result.data;
    }
    throw new Error(result.error || 'Failed to create project');
  },

  // Update an existing project
  async update(project: Project): Promise<Project> {
    const response = await fetch(API_BASE, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    });
    const result = await response.json();
    if (result.success) {
      return result.data;
    }
    throw new Error(result.error || 'Failed to update project');
  },

  // Delete a project
  async delete(id: number): Promise<boolean> {
    const response = await fetch(`${API_BASE}?id=${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    return result.success;
  },
};
