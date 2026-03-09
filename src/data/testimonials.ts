// Testimonials data for G3 Electric
// This file can be easily edited to manage customer testimonials

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  project: string;
  rating: number;
  title: string;
  text: string;
  imageMode: 'single' | 'before-after';
  image?: string;
  image2?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Nick",
    location: "Waukee, IA",
    project: "Windstorm client",
    rating: 5,
    title: "Windstorm Emergency Response",
    imageMode: 'single',
    text: "Austin & Lacey at G3 turned what would have been a nightmare into a dream. We had a 75-year-old tree fall onto our garage from a wind storm, and he was there to provide estimates by the end of the day. Throughout the entirety of the project, he kept in constant communication with our roofing contractors and included us in all design decisions. Dependable, safe, and fast are what you need in an electrical professional; G3 is all three.",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    location: "West Des Moines, IA",
    project: "Kitchen Lighting Installation",
    rating: 5,
    title: "Kitchen Lighting Transformation",
    imageMode: 'single',
    text: "G3 Electric transformed our kitchen with beautiful LED lighting. The team was professional, punctual, and the quality of work exceeded our expectations. Highly recommend their services!",
  },
  {
    id: 3,
    name: "Mike Thompson",
    location: "Des Moines, IA",
    project: "Electrical Panel Upgrade",
    rating: 5,
    title: "Electrical Panel Upgrade",
    imageMode: 'single',
    text: "Outstanding work on our electrical panel upgrade. The electricians were knowledgeable, clean, and explained everything clearly. Our home is now safer and more efficient. Thank you G3 Electric!",
  },
  {
    id: 4,
    name: "Lisa Chen",
    location: "Ankeny, IA",
    project: "Smart Home Installation",
    rating: 5,
    title: "Smart Home Integration",
    imageMode: 'single',
    text: "G3 Electric made our smart home dreams a reality. They installed smart switches, outlets, and integrated everything seamlessly. The team was patient and answered all our questions. Excellent service!",
  },
  {
    id: 5,
    name: "Jennifer Davis",
    location: "Johnston, IA",
    project: "Emergency Electrical Repair",
    rating: 5,
    title: "Weekend Emergency, Handled Fast",
    imageMode: 'single',
    text: "When our electrical panel failed on a weekend, G3 Electric responded quickly and fixed the issue professionally. Their emergency service is top-notch. We're grateful for their prompt and reliable service.",
  },
  {
    id: 6,
    name: "David Wilson",
    location: "Clive, IA",
    project: "Outdoor Lighting System",
    rating: 5,
    title: "Outdoor Lighting System",
    imageMode: 'single',
    text: "The outdoor lighting system G3 Electric installed has enhanced both the security and beauty of our property. The work was done efficiently and the results are stunning. Highly professional team!",
  }
];

// In-memory storage for runtime updates
let testimonialsData = [...testimonials];

// Helper function to get all testimonials
export function getAllTestimonials(): Testimonial[] {
  return testimonialsData;
}

// Helper function to get featured testimonials (for homepage)
export function getFeaturedTestimonials(count: number = 3): Testimonial[] {
  return testimonialsData.slice(0, count);
}

// Helper function to get testimonial by ID
export function getTestimonialById(id: string): Testimonial | undefined {
  return testimonialsData.find(testimonial => testimonial.id.toString() === id);
}

// Helper function to update a testimonial
export function updateTestimonial(updatedTestimonial: Testimonial): void {
  const index = testimonialsData.findIndex(t => t.id === updatedTestimonial.id);
  if (index !== -1) {
    testimonialsData[index] = updatedTestimonial;
  }
}

// Helper function to add a new testimonial
export function addTestimonial(newTestimonial: Testimonial): void {
  testimonialsData.push(newTestimonial);
}

// Helper function to delete a testimonial
export function deleteTestimonial(id: number): void {
  testimonialsData = testimonialsData.filter(t => t.id !== id);
}
