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
    title: '',
    text: '',
    imageMode: 'single',
    image: '',
    image2: ''
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    const id = params.id as string;

    if (id === 'new') {
      setIsLoading(false);
    } else {
      const testimonial = getTestimonialById(id);
      if (testimonial) {
        setFormData(testimonial);
      } else {
        router.push('/admin');
        return;
      }
      setIsLoading(false);
    }
  }, [params.id, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageModeChange = (mode: 'single' | 'before-after') => {
    setFormData(prev => ({ ...prev, imageMode: mode }));
  };

  const handleImageChange = (imageFile: File | null, dataUrl?: string) => {
    if (dataUrl) {
      setFormData(prev => ({ ...prev, image: dataUrl }));
    } else if (imageFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, image: e.target?.result as string }));
      };
      reader.readAsDataURL(imageFile);
    } else {
      setFormData(prev => ({ ...prev, image: '' }));
    }
  };

  const handleImage2Change = (imageFile: File | null, dataUrl?: string) => {
    if (dataUrl) {
      setFormData(prev => ({ ...prev, image2: dataUrl }));
    } else if (imageFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, image2: e.target?.result as string }));
      };
      reader.readAsDataURL(imageFile);
    } else {
      setFormData(prev => ({ ...prev, image2: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveError(null);

    try {
      const id = params.id as string;
      const isNew = id === 'new';

      if (isNew) {
        const newId = Date.now();
        addTestimonial({ ...formData, id: newId });
      } else {
        updateTestimonial(formData);
      }

      const label = isNew ? 'Testimonial created' : 'Testimonial saved';
      router.push(`/admin?tab=testimonials&toast=${encodeURIComponent(label)}&toastType=success`);
    } catch (error) {
      console.error('Error saving testimonial:', error);
      setSaveError('Error saving testimonial. Please try again.');
    } finally {
      setIsSaving(false);
    }
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
      <Navigation currentPath="/admin" />

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
              : 'Update testimonial details and information.'}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-earle-black border border-white/10 rounded-lg shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* Basic Information */}
              <div>
                <h3 className="font-montserrat text-2xl font-semibold text-white border-b border-white/20 pb-2 mb-6">
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Testimonial Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent text-white bg-earle-black"
                      required
                      placeholder="e.g., Kitchen Lighting Transformation"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      A short headline displayed prominently on the testimonial card.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Customer Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent text-white bg-earle-black"
                      required
                      placeholder="Enter customer name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent text-white bg-earle-black"
                      required
                      placeholder="e.g., Des Moines, IA"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Project / Service *
                    </label>
                    <input
                      type="text"
                      name="project"
                      value={formData.project}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent text-white bg-earle-black"
                      required
                      placeholder="e.g., Kitchen Lighting Installation"
                    />
                  </div>
                </div>
              </div>

              {/* Testimonial Text */}
              <div>
                <h3 className="font-montserrat text-2xl font-semibold text-white border-b border-white/20 pb-2 mb-6">
                  Testimonial Text
                </h3>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Customer Quote *
                  </label>
                  <textarea
                    name="text"
                    value={formData.text}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent text-white bg-earle-black"
                    required
                    placeholder="Enter the customer's testimonial text..."
                  />
                </div>
              </div>

              {/* Image Mode + Uploads */}
              <div>
                <h3 className="font-montserrat text-2xl font-semibold text-white border-b border-white/20 pb-2 mb-6">
                  Images
                </h3>

                {/* Image mode — radio buttons */}
                <div className="mb-6">
                  <fieldset>
                    <legend className="block text-sm font-medium text-white mb-3">
                      Image Display Format
                    </legend>
                    <div className="flex flex-wrap gap-6">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="imageMode"
                          value="single"
                          checked={formData.imageMode === 'single'}
                          onChange={() => handleImageModeChange('single')}
                          className="mt-1 h-4 w-4 border-gray-300 text-purple focus:ring-purple"
                        />
                        <span>
                          <span className="font-montserrat font-semibold text-sm text-white block">Single Image</span>
                          <span className="font-raleway text-sm text-white">One photo displayed on the card.</span>
                        </span>
                      </label>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="imageMode"
                          value="before-after"
                          checked={formData.imageMode === 'before-after'}
                          onChange={() => handleImageModeChange('before-after')}
                          className="mt-1 h-4 w-4 border-gray-300 text-purple focus:ring-purple"
                        />
                        <span>
                          <span className="font-montserrat font-semibold text-sm text-white block">Before &amp; After</span>
                          <span className="font-raleway text-sm text-white">Two photos shown side by side.</span>
                        </span>
                      </label>
                    </div>
                  </fieldset>
                </div>

                {/* Image uploads */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      {formData.imageMode === 'before-after' ? 'Before Image' : 'Photo'}
                    </label>
                    <ImageUpload
                      currentImage={formData.image}
                      onImageChange={handleImageChange}
                      label={formData.imageMode === 'before-after' ? 'Select before photo' : 'Select photo'}
                    />
                  </div>

                  {formData.imageMode === 'before-after' && (
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        After Image
                      </label>
                      <ImageUpload
                        currentImage={formData.image2}
                        onImageChange={handleImage2Change}
                        label="Select after photo"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Save Error */}
              {saveError && (
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <span className="text-red-500 flex-shrink-0">&#9888;</span>
                  <p className="font-raleway text-sm text-red-700 flex-1">{saveError}</p>
                  <button type="button" onClick={() => setSaveError(null)} className="text-red-400 hover:text-red-600 text-lg leading-none">&times;</button>
                </div>
              )}

              {/* Form Actions */}
              <div className="flex justify-end gap-4 pt-6 border-t border-white/20">
                <button
                  type="button"
                  onClick={() => router.push('/admin')}
                  className="px-6 py-3 border border-white/20 rounded-lg font-montserrat font-medium text-white hover:bg-white/10 transition-colors"
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

      <Footer currentPath="/admin" />
    </div>
  );
}
