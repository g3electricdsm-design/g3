'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeftIcon, PhotoIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { Project, getProjectById, updateProject, addProject } from '@/data/projects';
import ImageUpload from '@/components/ImageUpload';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const [formData, setFormData] = useState<Project>({
    id: 0,
    title: '',
    category: 'Residential',
    type: '',
    image: '/api/placeholder/800/600',
    description: '',
    overview: '',
    client: '',
    location: '',
    services: [],
    challenges: '',
    size: 'medium',
    orientation: 'landscape',
    gallery: [],
    slug: '',
    seoTitle: '',
    metaDescription: '',
    featured: false
  });

  const [newService, setNewService] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [featuredError, setFeaturedError] = useState('');

  useEffect(() => {
    const loadProject = async () => {
      const id = params.id as string;
      
      if (id === 'new') {
        // Creating a new project
        setIsLoading(false);
      } else {
        // Editing existing project
        try {
          const project = await getProjectById(id);
          if (project) {
            setFormData(project);
          } else {
            // Project not found, redirect to admin
            router.push('/admin');
            return;
          }
        } catch (error) {
          console.error('Error loading project:', error);
          router.push('/admin');
          return;
        }
        setIsLoading(false);
      }
    };

    loadProject();
  }, [params.id, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddService = () => {
    if (newService.trim() !== '') {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, newService.trim()]
      }));
      setNewService('');
    }
  };

  const handleRemoveService = (index: number) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  const handleImageChange = (imageUrl: string | null) => {
    if (imageUrl) {
      setFormData(prev => ({ ...prev, image: imageUrl }));
    }
  };

  const handleSizeSuggestion = (suggestedSize: string, aspectRatio: number) => {
    // Auto-populate the size field with smart suggestion
    console.log(`📐 Image detected: ${aspectRatio.toFixed(2)} aspect ratio → suggesting "${suggestedSize}"`);
    setFormData(prev => ({
      ...prev,
      size: suggestedSize as Project['size']
    }));
    
    // Auto-set orientation based on aspect ratio
    const suggestedOrientation = aspectRatio < 1 ? 'portrait' : 'landscape';
    setFormData(prev => ({
      ...prev,
      orientation: suggestedOrientation
    }));
  };

  const galleryInputRef = useRef<HTMLInputElement>(null);
  const [isGalleryUploading, setIsGalleryUploading] = useState(false);
  const [galleryDragOver, setGalleryDragOver] = useState(false);

  async function uploadFileToStorage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch('/api/upload', { method: 'POST', body: formData });
    const result = await response.json();
    if (!result.success) throw new Error(result.error || 'Upload failed');
    return result.url;
  }

  const handleGalleryFiles = async (files: FileList | File[]) => {
    const imageFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (imageFiles.length === 0) return;

    setIsGalleryUploading(true);
    try {
      const urls = await Promise.all(imageFiles.map(f => uploadFileToStorage(f)));
      setFormData(prev => ({
        ...prev,
        gallery: [...(prev.gallery || []), ...urls]
      }));
    } catch (err) {
      console.error('Gallery upload error:', err);
      alert('Error uploading one or more images. Please try again.');
    } finally {
      setIsGalleryUploading(false);
      if (galleryInputRef.current) galleryInputRef.current.value = '';
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      gallery: (prev.gallery || []).filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeaturedError('');

    if (formData.featured && formData.size !== 'panoramic') {
      setFeaturedError('Featured project requires Portfolio Tile Size to be Panoramic. Please set Tile Size to "Panoramic (2 rows tall, 3 columns wide)" to use Featured.');
      return;
    }

    setIsSaving(true);

    try {
      const id = params.id as string;
      
      console.log('💾 Saving project with data:', {
        title: formData.title,
        size: formData.size,
        orientation: formData.orientation,
        id: formData.id
      });
      
      if (id === 'new') {
        // Create new project
        const newId = Date.now(); // Simple ID generation
        const newProject = { ...formData, id: newId };
        console.log('Creating new project with image:', newProject.image);
        await addProject(newProject);
      } else {
        // Update existing project
        console.log('Updating project with image:', formData.image);
        await updateProject(formData);
      }

      // Redirect back to admin
      router.push('/admin');
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project. Please try again.');
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
      <section className="bg-gradient-to-br from-purple to-phlox text-white pt-16 pb-8">
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
            {formData.id === 0 ? 'Add New Project' : 'Edit Project'}
          </h1>
          <p className="font-raleway text-lg md:text-xl max-w-3xl">
            {formData.id === 0 
              ? 'Create a new project to showcase your electrical work.'
              : 'Update project details and information.'
            }
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white-smoke rounded-lg shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Project Image Upload */}
              <div className="space-y-4 mb-6">
                <h3 className="font-montserrat text-2xl font-semibold text-earle-black border-b border-gray-300 pb-2">
                  Project Image
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-earle-black mb-2">
                    Portfolio Tile Size
                  </label>
                  <select
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent text-earle-black"
                  >
                    <option value="short">Short (1 row tall)</option>
                    <option value="square">Square (2 rows tall, 1 column wide)</option>
                    <option value="tall">Tall (3 rows tall, 1 column wide)</option>
                    <option value="wide">Wide (2 rows tall, 2 columns wide)</option>
                    <option value="panoramic">Panoramic (2 rows tall, 3 columns wide)</option>
                    <option value="extraTall">Extra Tall (6 rows tall, 1 column wide)</option>
                  </select>
                  <p className="mt-1 text-xs text-gray-500">
                    Controls how this project appears on the /portfolio grid. Auto-suggested based on your image aspect ratio.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={!!formData.featured}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, featured: e.target.checked }));
                      setFeaturedError('');
                    }}
                    className="h-4 w-4 text-purple focus:ring-purple border-gray-300 rounded"
                  />
                  <label htmlFor="featured" className="font-montserrat text-sm font-medium text-earle-black">
                    Feature this project (requires Panoramic tile size above)
                  </label>
                </div>
                {featuredError && (
                  <p className="text-sm text-red-600 font-raleway" role="alert">
                    {featuredError}
                  </p>
                )}
                
                <ImageUpload
                  currentImage={formData.image}
                  onImageChange={handleImageChange}
                  onSizeSuggestion={handleSizeSuggestion}
                  projectTitle={formData.title || 'New Project'}
                />
              </div>

              {/* Gallery Images */}
              <div className="space-y-4 mb-6">
                <h3 className="font-montserrat text-2xl font-semibold text-earle-black border-b border-gray-300 pb-2">
                  Gallery Images
                </h3>
                <p className="text-sm text-gray-500">
                  Additional photos shown as scrollable thumbnails below the main image on the project detail page.
                </p>

                {(formData.gallery && formData.gallery.length > 0) && (
                  <div className="flex flex-wrap gap-3">
                    {formData.gallery.map((src, idx) => (
                      <div key={idx} className="relative group w-28 h-28 rounded-lg overflow-hidden border border-gray-300">
                        <Image
                          src={src}
                          alt={`Gallery image ${idx + 1}`}
                          fill
                          className="object-cover"
                          sizes="112px"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(idx)}
                          className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div
                  className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                    galleryDragOver
                      ? 'border-purple bg-purple/10 scale-[1.02] shadow-lg'
                      : 'border-gray-300 hover:border-purple hover:bg-purple/5'
                  } ${isGalleryUploading ? 'pointer-events-none opacity-75' : ''}`}
                  onClick={() => galleryInputRef.current?.click()}
                  onDrop={(e) => { e.preventDefault(); setGalleryDragOver(false); handleGalleryFiles(e.dataTransfer.files); }}
                  onDragOver={(e) => { e.preventDefault(); setGalleryDragOver(true); }}
                  onDragLeave={(e) => { e.preventDefault(); setGalleryDragOver(false); }}
                >
                  {isGalleryUploading ? (
                    <div className="text-center">
                      <div className="w-10 h-10 border-4 border-purple border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                      <p className="font-montserrat text-sm text-earle-black">Processing images...</p>
                    </div>
                  ) : (
                    <>
                      {galleryDragOver ? (
                        <CloudArrowUpIcon className="h-10 w-10 text-purple mb-2 animate-bounce" />
                      ) : (
                        <PhotoIcon className="h-10 w-10 text-gray-400 mb-2" />
                      )}
                      <p className="font-montserrat text-sm text-earle-black">
                        {galleryDragOver ? 'Drop images here' : 'Add Gallery Photos'}
                      </p>
                      <p className="font-raleway text-xs text-gray-500 mt-1">
                        Click or drag &amp; drop multiple images
                      </p>
                    </>
                  )}
                </div>

                <input
                  ref={galleryInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => { if (e.target.files) handleGalleryFiles(e.target.files); }}
                  className="hidden"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Basic Information */}
                <div className="space-y-6">
                  <h3 className="font-montserrat text-2xl font-semibold text-earle-black border-b border-gray-300 pb-2">
                    Basic Information
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-earle-black mb-2">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent text-earle-black"
                      required
                      placeholder="Enter project title"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-earle-black mb-2">
                        Category *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent text-earle-black"
                      >
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-earle-black mb-2">
                        Type *
                      </label>
                      <input
                        type="text"
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent text-earle-black"
                        placeholder="e.g., Lighting, Panel Upgrade"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-earle-black mb-2">
                        Client
                      </label>
                      <input
                        type="text"
                        name="client"
                        value={formData.client}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent text-earle-black"
                        placeholder="Client Name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-earle-black mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent text-earle-black"
                        placeholder="e.g., Des Moines, IA"
                      />
                    </div>
                  </div>

                </div>

                {/* Project Descriptions */}
                <div className="space-y-6">
                  <h3 className="font-montserrat text-2xl font-semibold text-earle-black border-b border-gray-300 pb-2">
                    Project Details
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-earle-black mb-2">
                      Short Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent text-earle-black"
                      placeholder="Brief project summary (shown on preview cards)"
                    />
                    <p className="mt-1 text-xs text-gray-500">This description appears on the portfolio preview cards</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-earle-black mb-2">
                      Project Overview
                    </label>
                    <textarea
                      name="overview"
                      value={formData.overview || ''}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent text-earle-black"
                      placeholder="Detailed project overview (shown on project detail page)"
                    />
                    <p className="mt-1 text-xs text-gray-500">This detailed overview appears on the individual project detail page</p>
                  </div>


                  {/* Services */}
                  <div>
                    <label className="block text-sm font-medium text-earle-black mb-2">
                      Services Provided
                    </label>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={newService}
                        onChange={(e) => setNewService(e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent text-earle-black"
                        placeholder="Add a service"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddService())}
                      />
                      <button
                        type="button"
                        onClick={handleAddService}
                        className="px-6 py-3 bg-purple text-white rounded-lg hover:bg-phlox transition-colors font-medium"
                      >
                        Add
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {formData.services.map((service, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-2 px-3 py-2 bg-purple/10 text-purple rounded-full text-sm font-medium"
                        >
                          {service}
                          <button
                            type="button"
                            onClick={() => handleRemoveService(index)}
                            className="hover:text-red-600 text-lg leading-none"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Challenges */}
                  <div>
                    <label className="block text-sm font-medium text-earle-black mb-2">
                      Challenges
                    </label>
                    <textarea
                      name="challenges"
                      value={formData.challenges}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent text-earle-black"
                      placeholder="Project challenges faced"
                    />
                  </div>
                </div>
              </div>

              {/* SEO Section */}
              <div className="space-y-6">
                <h3 className="font-montserrat text-2xl font-semibold text-earle-black border-b border-gray-300 pb-2">
                  SEO Settings
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-earle-black mb-2">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent text-earle-black"
                    placeholder="project-slug"
                  />
                  <p className="mt-1 text-xs text-gray-500">Used in the URL: /portfolio/[slug]</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-earle-black mb-2">
                    Title Tag
                  </label>
                  <input
                    type="text"
                    name="seoTitle"
                    value={formData.seoTitle || ''}
                    onChange={handleInputChange}
                    maxLength={70}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent text-earle-black"
                    placeholder="Title Tag (70 characters max)"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    {formData.seoTitle?.length || 0}/70 characters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-earle-black mb-2">
                    Meta Description
                  </label>
                  <textarea
                    name="metaDescription"
                    value={formData.metaDescription || ''}
                    onChange={handleInputChange}
                    maxLength={140}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent text-earle-black"
                    placeholder="Meta Description (140 characters max)"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    {formData.metaDescription?.length || 0}/140 characters
                  </p>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-4 pt-8 border-t border-gray-300">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-8 py-3 border border-gray-300 text-earle-black rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-8 py-3 bg-purple text-white rounded-lg hover:bg-phlox transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? 'Saving...' : (formData.id === 0 ? 'Create Project' : 'Update Project')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer currentPath="/admin" />
    </div>
  );
}
