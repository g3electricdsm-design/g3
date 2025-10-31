'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Testimonial, getTestimonialById, updateTestimonial, addTestimonial } from '@/data/testimonials';
import ImageUpload from '@/components/ImageUpload';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function EditTestimonialPage() {
  const router = useRouter();
  const params = useParams();
  const [formData, setFormData] = useState<Testimonial>({
    id: 0,
    name: '',
    location: '',
    project: '',
    rating: 5,
    text: '',
    image: ''
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const id = params.id as string;
    
    if (id === 'new') {
      // Creating a new testimonial
      setIsLoading(false);
    } else {
      // Editing existing testimonial
      const testimonial = getTestimonialById(id);
      if (testimonial) {
        setFormData(testimonial);
      } else {
        // Testimonial not found, redirect to admin
        router.push('/admin');
        return;
      }
      setIsLoading(false);
    }
  }, [params.id, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'rating' ? parseInt(value) : value }));
  };

  const handleImageChange = (imageFile: File | null) => {
    if (imageFile) {
      // Convert file to base64 data URL for persistence
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setFormData(prev => ({
          ...prev,
          image: dataUrl
        }));
      };
      reader.readAsDataURL(imageFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const id = params.id as string;
      
      if (id === 'new') {
        // Create new testimonial
        const newId = Date.now(); // Simple ID generation
        const newTestimonial = { ...formData, id: newId };
        addTestimonial(newTestimonial);
      } else {
        // Update existing testimonial
        updateTestimonial(formData);
      }

      // Redirect back to admin testimonials tab
      router.push('/admin?tab=testimonials');
    } catch (error) {
      console.error('Error saving testimonial:', error);
      alert('Error saving testimonial. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-earle-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-earle-black">
      {/* Navigation */}
      <Navigation currentPath="/admin" />

      {/* Header */}
      <section className="bg-gradient-to-br from-purple to-phlox text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Link 
              href="/admin" 
              className="flex items-center text-white hover:text-white-smoke transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Admin
            </Link>
          </div>
          <h1 className="font-megrim text-5xl md:text-6xl mb-4">
            {formData.id === 0 ? 'Add New Testimonial' : 'Edit Testimonial'}
          </h1>
          <p className="font-raleway text-lg md:text-xl max-w-3xl">
            {formData.id === 0 
              ? 'Add a new customer testimonial to showcase on your website.'
              : 'Update testimonial details and information.'
            }
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white-smoke rounded-lg shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Basic Information */}
                <div className="space-y-6">
                  <h3 className="font-montserrat text-2xl font-semibold text-earle-black border-b border-gray-300 pb-2">
                    Basic Information
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-earle-black mb-2">
                      Customer Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent text-earle-black"
                      required
                      placeholder="Enter customer name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-earle-black mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent text-earle-black"
                      required
                      placeholder="e.g., Des Moines, IA"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-earle-black mb-2">
                      Project/Service *
                    </label>
                    <input
                      type="text"
                      name="project"
                      value={formData.project}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent text-earle-black"
                      required
                      placeholder="e.g., Kitchen Lighting Installation"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-earle-black mb-2">
                      Rating *
                    </label>
                    <select
                      name="rating"
                      value={formData.rating}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent text-earle-black"
                    >
                      <option value={5}>5 Stars</option>
                      <option value={4}>4 Stars</option>
                      <option value={3}>3 Stars</option>
                      <option value={2}>2 Stars</option>
                      <option value={1}>1 Star</option>
                    </select>
                  </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-6">
                  <h3 className="font-montserrat text-2xl font-semibold text-earle-black border-b border-gray-300 pb-2">
                    Customer Photo
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-earle-black mb-2">
                      Upload Customer Photo
                    </label>
                    <ImageUpload
                      currentImage={formData.image}
                      onImageChange={handleImageChange}
                      label="Select customer photo"
                    />
                    <p className="mt-2 text-sm text-gray-600">
                      Upload a photo of the customer for display in the testimonial.
                    </p>
                  </div>
                </div>
              </div>

              {/* Testimonial Text */}
              <div>
                <h3 className="font-montserrat text-2xl font-semibold text-earle-black border-b border-gray-300 pb-2 mb-6">
                  Testimonial Text
                </h3>
                <div>
                  <label className="block text-sm font-medium text-earle-black mb-2">
                    Customer Testimonial *
                  </label>
                  <textarea
                    name="text"
                    value={formData.text}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent text-earle-black"
                    required
                    placeholder="Enter the customer's testimonial text..."
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-4 pt-6 border-t border-gray-300">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-montserrat font-medium text-earle-black hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="btn-primary px-6 py-3 font-montserrat font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? 'Saving...' : formData.id === 0 ? 'Create Testimonial' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

