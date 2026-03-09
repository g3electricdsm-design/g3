import { Project, projects as defaultProjects } from '@/data/projects';
import { supabase, PROJECTS_TABLE } from './supabase';

// Database row type (snake_case)
interface ProjectRow {
  id: number;
  title: string;
  category: string;
  type: string;
  image: string;
  description: string;
  overview?: string | null;
  client: string;
  location: string;
  services: string[] | null;
  challenges: string;
  size: string;
  orientation?: string | null;
  additional_images?: string[] | null;
  slug?: string | null;
  seo_title?: string | null;
  meta_description?: string | null;
  created_at?: string;
  updated_at?: string;
}

// Storage interface - can be swapped for different backends
interface ProjectsStorage {
  getAll(): Promise<Project[]>;
  getById(idOrSlug: string): Promise<Project | null>;
  create(project: Project): Promise<Project>;
  update(project: Project): Promise<Project>;
  delete(id: number): Promise<boolean>;
}

// In-memory storage (for development/testing only)
// WARNING: This does NOT persist data - only use for local development
// For production, Supabase MUST be configured
class InMemoryStorage implements ProjectsStorage {
  private projects: Project[] = [...defaultProjects];

  async getAll(): Promise<Project[]> {
    return [...this.projects];
  }

  async getById(idOrSlug: string): Promise<Project | null> {
    const project = this.projects.find(p => 
      p.slug === idOrSlug || p.id.toString() === idOrSlug
    );
    return project || null;
  }

  async create(project: Project): Promise<Project> {
    if (!project.id || project.id === 0) {
      const maxId = this.projects.length > 0 
        ? Math.max(...this.projects.map(p => p.id))
        : 0;
      project.id = maxId + 1;
    }
    this.projects.push(project);
    return project;
  }

  async update(project: Project): Promise<Project> {
    const index = this.projects.findIndex(p => p.id === project.id);
    if (index === -1) {
      throw new Error('Project not found');
    }
    this.projects[index] = project;
    return project;
  }

  async delete(id: number): Promise<boolean> {
    const index = this.projects.findIndex(p => p.id === id);
    if (index === -1) {
      return false;
    }
    this.projects.splice(index, 1);
    return true;
  }
}

// Note: Vercel KV removed - using Supabase only for persistent storage
// In-memory storage is only for development/testing

// Supabase storage (for production)
// This will be used if Supabase environment variables are set
class SupabaseStorage implements ProjectsStorage {
  // Transform database row (snake_case) to Project (camelCase)
  private transformRow(row: ProjectRow): Project {
    return {
      id: row.id,
      title: row.title,
      category: row.category as 'Residential' | 'Commercial',
      type: row.type,
      image: row.image,
      description: row.description,
      overview: row.overview || undefined,
      client: row.client,
      location: row.location,
      services: row.services || [],
      challenges: row.challenges,
      size: row.size as
        | 'small'
        | 'medium'
        | 'large'
        | 'short'
        | 'square'
        | 'tall'
        | 'wide'
        | 'panoramic'
        | 'extraTall',
      orientation: (row.orientation as 'portrait' | 'landscape') || 'landscape',
      additionalImages: row.additional_images || undefined,
      slug: row.slug || undefined,
      seoTitle: row.seo_title || undefined,
      metaDescription: row.meta_description || undefined,
    };
  }

  // Transform Project (camelCase) to database row (snake_case)
  private transformProject(project: Project): Omit<ProjectRow, 'created_at' | 'updated_at'> {
    return {
      id: project.id,
      title: project.title,
      category: project.category,
      type: project.type,
      image: project.image,
      description: project.description,
      overview: project.overview,
      client: project.client,
      location: project.location,
      services: project.services,
      challenges: project.challenges,
      size: project.size,
      orientation: project.orientation || 'landscape',
      additional_images: project.additionalImages || [],
      slug: project.slug,
      seo_title: project.seoTitle,
      meta_description: project.metaDescription,
    };
  }

  async getAll(): Promise<Project[]> {
    if (!supabase) {
      console.warn('Supabase not initialized - check environment variables');
      throw new Error('Supabase not initialized. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
    }

    const { data, error } = await supabase
      .from(PROJECTS_TABLE)
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('Error fetching projects from Supabase:', error);
      // If table doesn't exist, try to initialize
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        console.warn('Projects table does not exist. Please run the SQL setup script in Supabase.');
        return [...defaultProjects];
      }
      // Fallback to default projects on error
      return [...defaultProjects];
    }

    // If no projects in database, initialize with defaults
    if (!data || data.length === 0) {
      console.log('No projects found in database, initializing with defaults...');
      await this.initializeDefaults();
      return [...defaultProjects];
    }

    // Transform snake_case to camelCase
    return data.map(row => this.transformRow(row));
  }

  async getById(idOrSlug: string): Promise<Project | null> {
    if (!supabase) {
      throw new Error('Supabase not initialized');
    }

    // Try to find by slug first, then by ID
    const { data, error } = await supabase
      .from(PROJECTS_TABLE)
      .select('*')
      .or(`slug.eq.${idOrSlug},id.eq.${idOrSlug}`)
      .single();

    if (error || !data) {
      return null;
    }

    return this.transformRow(data);
  }

  private stripUnknownColumn(
    row: Record<string, unknown>,
    errorMessage: string
  ): Record<string, unknown> | null {
    const match = errorMessage.match(/Could not find the '(\w+)' column/);
    if (match) {
      const col = match[1];
      const { [col]: _, ...rest } = row;
      return rest;
    }
    return null;
  }

  async create(project: Project): Promise<Project> {
    if (!supabase) {
      throw new Error('Supabase not initialized');
    }

    // Generate ID if not provided
    if (!project.id || project.id === 0) {
      const allProjects = await this.getAll();
      const maxId = allProjects.length > 0 
        ? Math.max(...allProjects.map(p => p.id))
        : 0;
      project.id = maxId + 1;
    }

    // Transform camelCase to snake_case for database
    let dbRow: Record<string, unknown> = this.transformProject(project);

    let { data, error } = await supabase
      .from(PROJECTS_TABLE)
      .insert(dbRow)
      .select()
      .single();

    if (error?.code === 'PGRST204') {
      const stripped = this.stripUnknownColumn(dbRow, error.message);
      if (stripped) {
        dbRow = stripped;
        ({ data, error } = await supabase
          .from(PROJECTS_TABLE)
          .insert(dbRow)
          .select()
          .single());
      }
    }

    if (error) {
      throw new Error(`Failed to create project: ${error.message}`);
    }

    return this.transformRow(data);
  }

  async update(project: Project): Promise<Project> {
    if (!supabase) {
      throw new Error('Supabase not initialized');
    }

    if (!project.id) {
      throw new Error('Project ID is required');
    }

    // Transform camelCase to snake_case for database
    const dbRow = this.transformProject(project);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...initialUpdateData } = dbRow;
    let updateData: Record<string, unknown> = initialUpdateData;

    let { data, error } = await supabase
      .from(PROJECTS_TABLE)
      .update(updateData)
      .eq('id', project.id)
      .select()
      .single();

    if (error?.code === 'PGRST204') {
      const stripped = this.stripUnknownColumn(updateData, error.message);
      if (stripped) {
        updateData = stripped;
        ({ data, error } = await supabase
          .from(PROJECTS_TABLE)
          .update(updateData)
          .eq('id', project.id)
          .select()
          .single());
      }
    }

    if (error) {
      console.error('Supabase update error:', error);
      if (error.code === 'PGRST116') {
        throw new Error('Project not found');
      }
      throw new Error(`Failed to update project: ${error.message} (code: ${error.code})`);
    }

    if (!data) {
      throw new Error('Project not found');
    }

    return this.transformRow(data);
  }

  async delete(id: number): Promise<boolean> {
    if (!supabase) {
      throw new Error('Supabase not initialized');
    }

    const { error } = await supabase
      .from(PROJECTS_TABLE)
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting project:', error);
      return false;
    }

    return true;
  }

  // Initialize database with default projects
  private async initializeDefaults(): Promise<void> {
    if (!supabase) {
      return;
    }

    // Check if any projects exist
    const { count } = await supabase
      .from(PROJECTS_TABLE)
      .select('*', { count: 'exact', head: true });

    // Only insert defaults if table is empty
    if (count === 0) {
      // Transform default projects to snake_case
      const dbRows = defaultProjects.map(p => this.transformProject(p));
      const { error } = await supabase
        .from(PROJECTS_TABLE)
        .insert(dbRows);

      if (error) {
        console.error('Error initializing default projects:', error);
      }
    }
  }
}

// Export the storage instance
// Supabase is required for production persistence
// InMemoryStorage is only for development/testing (won't persist)
export const storage: ProjectsStorage = supabase
  ? new SupabaseStorage()
  : new InMemoryStorage();

// Log warning in production if Supabase is not configured
if (process.env.NODE_ENV === 'production' && !supabase) {
  console.error('⚠️  WARNING: Supabase not configured! Changes will NOT persist.');
  console.error('   Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel environment variables.');
}
