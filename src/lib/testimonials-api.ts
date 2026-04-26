import { Testimonial } from '@/data/testimonials';

const API_BASE = '/api/testimonials';

export const testimonialsAPI = {
  async getAll(): Promise<Testimonial[]> {
    try {
      const response = await fetch(API_BASE);
      const result = await response.json();
      if (result.success) {
        return result.data;
      }
      throw new Error(result.error || 'Failed to fetch testimonials');
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      const { testimonials } = await import('@/data/testimonials');
      return testimonials;
    }
  },

  async getById(id: string): Promise<Testimonial | null> {
    try {
      const response = await fetch(`${API_BASE}/${id}`);
      const result = await response.json();
      if (result.success) {
        return result.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching testimonial:', error);
      return null;
    }
  },

  async create(testimonial: Testimonial): Promise<Testimonial> {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testimonial),
    });
    const result = await response.json();
    if (result.success) {
      return result.data;
    }
    throw new Error(result.error || 'Failed to create testimonial');
  },

  async update(testimonial: Testimonial): Promise<Testimonial> {
    const response = await fetch(API_BASE, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testimonial),
    });
    const result = await response.json();
    if (result.success) {
      return result.data;
    }
    throw new Error(result.error || 'Failed to update testimonial');
  },

  async delete(id: number): Promise<boolean> {
    const response = await fetch(`${API_BASE}?id=${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    return result.success;
  },
};
