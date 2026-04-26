import { Testimonial, testimonials as defaultTestimonials } from '@/data/testimonials';
import { supabase, TESTIMONIALS_TABLE } from './supabase';

interface TestimonialRow {
  id: number;
  name: string;
  location: string;
  project: string;
  rating: number;
  title: string;
  text: string;
  image_mode: string;
  image?: string | null;
  image2?: string | null;
  created_at?: string;
  updated_at?: string;
}

interface TestimonialsStorage {
  getAll(): Promise<Testimonial[]>;
  getById(id: string): Promise<Testimonial | null>;
  create(testimonial: Testimonial): Promise<Testimonial>;
  update(testimonial: Testimonial): Promise<Testimonial>;
  delete(id: number): Promise<boolean>;
}

class InMemoryStorage implements TestimonialsStorage {
  private items: Testimonial[] = [...defaultTestimonials];

  async getAll(): Promise<Testimonial[]> {
    return [...this.items];
  }

  async getById(id: string): Promise<Testimonial | null> {
    return this.items.find(t => t.id.toString() === id) || null;
  }

  async create(testimonial: Testimonial): Promise<Testimonial> {
    if (!testimonial.id || testimonial.id === 0) {
      const maxId = this.items.length > 0
        ? Math.max(...this.items.map(t => t.id))
        : 0;
      testimonial.id = maxId + 1;
    }
    this.items.push(testimonial);
    return testimonial;
  }

  async update(testimonial: Testimonial): Promise<Testimonial> {
    const index = this.items.findIndex(t => t.id === testimonial.id);
    if (index === -1) {
      throw new Error('Testimonial not found');
    }
    this.items[index] = testimonial;
    return testimonial;
  }

  async delete(id: number): Promise<boolean> {
    const index = this.items.findIndex(t => t.id === id);
    if (index === -1) return false;
    this.items.splice(index, 1);
    return true;
  }
}

class SupabaseStorage implements TestimonialsStorage {
  private transformRow(row: TestimonialRow): Testimonial {
    return {
      id: row.id,
      name: row.name,
      location: row.location,
      project: row.project,
      rating: row.rating,
      title: row.title,
      text: row.text,
      imageMode: row.image_mode as 'single' | 'before-after',
      image: row.image || undefined,
      image2: row.image2 || undefined,
    };
  }

  private transformTestimonial(t: Testimonial): Omit<TestimonialRow, 'created_at' | 'updated_at'> {
    return {
      id: t.id,
      name: t.name,
      location: t.location,
      project: t.project,
      rating: t.rating,
      title: t.title,
      text: t.text,
      image_mode: t.imageMode,
      image: t.image || null,
      image2: t.image2 || null,
    };
  }

  async getAll(): Promise<Testimonial[]> {
    if (!supabase) {
      throw new Error('Supabase not initialized');
    }

    const { data, error } = await supabase
      .from(TESTIMONIALS_TABLE)
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('Error fetching testimonials from Supabase:', error);
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        console.warn('Testimonials table does not exist. Please run the SQL setup script.');
        return [...defaultTestimonials];
      }
      return [...defaultTestimonials];
    }

    if (!data || data.length === 0) {
      console.log('No testimonials in database, initializing with defaults...');
      await this.initializeDefaults();
      return [...defaultTestimonials];
    }

    return data.map(row => this.transformRow(row));
  }

  async getById(id: string): Promise<Testimonial | null> {
    if (!supabase) {
      throw new Error('Supabase not initialized');
    }

    const { data, error } = await supabase
      .from(TESTIMONIALS_TABLE)
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return null;
    return this.transformRow(data);
  }

  private stripUnknownColumn(
    row: Record<string, unknown>,
    errorMessage: string
  ): Record<string, unknown> | null {
    const match = errorMessage.match(/Could not find the '(\w+)' column/);
    if (match) {
      const col = match[1];
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [col]: _, ...rest } = row;
      return rest;
    }
    return null;
  }

  async create(testimonial: Testimonial): Promise<Testimonial> {
    if (!supabase) {
      throw new Error('Supabase not initialized');
    }

    if (!testimonial.id || testimonial.id === 0) {
      const all = await this.getAll();
      const maxId = all.length > 0 ? Math.max(...all.map(t => t.id)) : 0;
      testimonial.id = maxId + 1;
    }

    let dbRow: Record<string, unknown> = this.transformTestimonial(testimonial);

    let { data, error } = await supabase
      .from(TESTIMONIALS_TABLE)
      .insert(dbRow)
      .select()
      .single();

    if (error?.code === 'PGRST204') {
      const stripped = this.stripUnknownColumn(dbRow, error.message);
      if (stripped) {
        dbRow = stripped;
        ({ data, error } = await supabase
          .from(TESTIMONIALS_TABLE)
          .insert(dbRow)
          .select()
          .single());
      }
    }

    if (error) {
      throw new Error(`Failed to create testimonial: ${error.message}`);
    }

    return this.transformRow(data);
  }

  async update(testimonial: Testimonial): Promise<Testimonial> {
    if (!supabase) {
      throw new Error('Supabase not initialized');
    }

    if (!testimonial.id) {
      throw new Error('Testimonial ID is required');
    }

    const dbRow = this.transformTestimonial(testimonial);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...initialUpdateData } = dbRow;
    let updateData: Record<string, unknown> = initialUpdateData;

    let { data, error } = await supabase
      .from(TESTIMONIALS_TABLE)
      .update(updateData)
      .eq('id', testimonial.id)
      .select()
      .single();

    if (error?.code === 'PGRST204') {
      const stripped = this.stripUnknownColumn(updateData, error.message);
      if (stripped) {
        updateData = stripped;
        ({ data, error } = await supabase
          .from(TESTIMONIALS_TABLE)
          .update(updateData)
          .eq('id', testimonial.id)
          .select()
          .single());
      }
    }

    if (error) {
      console.error('Supabase update error:', error);
      if (error.code === 'PGRST116') {
        throw new Error('Testimonial not found');
      }
      throw new Error(`Failed to update testimonial: ${error.message} (code: ${error.code})`);
    }

    if (!data) {
      throw new Error('Testimonial not found');
    }

    return this.transformRow(data);
  }

  async delete(id: number): Promise<boolean> {
    if (!supabase) {
      throw new Error('Supabase not initialized');
    }

    const { error } = await supabase
      .from(TESTIMONIALS_TABLE)
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting testimonial:', error);
      return false;
    }

    return true;
  }

  private async initializeDefaults(): Promise<void> {
    if (!supabase) return;

    const { count } = await supabase
      .from(TESTIMONIALS_TABLE)
      .select('*', { count: 'exact', head: true });

    if (count === 0) {
      const dbRows = defaultTestimonials.map(t => this.transformTestimonial(t));
      const { error } = await supabase
        .from(TESTIMONIALS_TABLE)
        .insert(dbRows);

      if (error) {
        console.error('Error initializing default testimonials:', error);
      }
    }
  }
}

export const testimonialStorage: TestimonialsStorage = supabase
  ? new SupabaseStorage()
  : new InMemoryStorage();

if (process.env.NODE_ENV === 'production' && !supabase) {
  console.error('WARNING: Supabase not configured! Testimonial changes will NOT persist.');
}
