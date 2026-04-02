'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon, StarIcon, XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';
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
    slug: '',
    seoTitle: '',
    metaDescription: ''
  });

  const [newService, setNewService] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const additionalImageInputRef = useRef<HTMLInputElement>(null);

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

  const handleImageChange = (imageFile: File | null, dataUrl?: string) => {
    if (dataUrl) {
      setFormData(prev => ({ ...prev, image: dataUrl }));
    } else if (imageFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, image: e.target?.result as string }));
      };
      reader.readAsDataURL(imageFile);
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

  const processImage = async (file: File): Promise<string> => {
    // Primary: server-side processing with sharp
    try {
      const form = new FormData();
      form.append('file', file);
      form.append('maxDimension', '2000');
      form.append('quality', '85');
      const res = await fetch('/api/image/process', { method: 'POST', body: form });
      const json = await res.json();
      if (json.success) return json.dataUrl;
      throw new Error(json.error);
    } catch (serverError) {
      console.warn('Server processing unavailable, using client fallback:', serverError);
    }

    // Fallback: convert HEIC client-side if needed, then compress via canvas
    let processable = file;
    const name = file.name.toLowerCase();
    const type = file.type.toLowerCase();
    const isHeicFile = type === 'image/heic' || type === 'image/heif' || name.endsWith('.heic') || name.endsWith('.heif');

    if (isHeicFile) {
      try {
        const heic2any = (await import('heic2any')).default;
        const blob = await heic2any({ blob: file, toType: 'image/jpeg', quality: 0.92 });
        const result = Array.isArray(blob) ? blob[0] : blob;
        processable = new File([result], file.name.replace(/\.\w+$/, '.jpg'), {
          type: 'image/jpeg',
          lastModified: Date.now(),
        });
      } catch (heicErr) {
        const msg = heicErr instanceof Error ? heicErr.message : JSON.stringify(heicErr);
        throw new Error(`Could not convert "${file.name}". HEIC conversion failed: ${msg || 'unknown error'}. Try converting to JPG in Photos first.`);
      }
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let w = img.width, h = img.height;
          const larger = Math.max(w, h);
          if (larger > 2000) { const s = 2000 / larger; w = Math.round(w * s); h = Math.round(h * s); }
          canvas.width = w;
          canvas.height = h;
          canvas.getContext('2d')?.drawImage(img, 0, 0, w, h);
          canvas.toBlob(
            (blob) => {
              if (!blob) { reject(new Error('Compression failed')); return; }
              const r2 = new FileReader();
              r2.onload = (ev) => resolve(ev.target?.result as string);
              r2.onerror = () => reject(new Error('Read failed'));
              r2.readAsDataURL(blob);
            },
            'image/jpeg',
            0.92
          );
        };
        img.onerror = () => reject(new Error(`Could not decode "${file.name}". The file may be corrupt or unsupported.`));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Read failed'));
      reader.readAsDataURL(processable);
    });
  };

  const handleAdditionalImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setImageError(null);

    const errors: string[] = [];

    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/') && !/\.(heic|heif)$/i.test(file.name)) continue;
      if (file.size > 10 * 1024 * 1024) {
        errors.push(`"${file.name}" is too large (${(file.size / 1024 / 1024).toFixed(1)} MB).`);
        continue;
      }
      try {
        const dataUrl = await processImage(file);
        setFormData(prev => ({
          ...prev,
          additionalImages: [...(prev.additionalImages || []), dataUrl]
        }));
      } catch (err) {
        const msg = err instanceof Error ? err.message : `Failed to process "${file.name}".`;
        errors.push(msg);
        console.error('Error processing additional image:', msg, err);
      }
    }

    if (errors.length > 0) {
      setImageError(errors.join(' '));
    }

    if (additionalImageInputRef.current) {
      additionalImageInputRef.current.value = '';
    }
  };

  const handleRemoveAdditionalImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      additionalImages: (prev.additionalImages || []).filter((_, i) => i !== index)
    }));
  };

  const handleSetFeatured = (index: number) => {
    setFormData(prev => {
      const additional = [...(prev.additionalImages || [])];
      const newFeatured = additional[index];
      additional[index] = prev.image;
      return { ...prev, image: newFeatured, additionalImages: additional };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
                
                <ImageUpload
                  currentImage={formData.image}
                  onImageChange={handleImageChange}
                  onSizeSuggestion={handleSizeSuggestion}
                  projectTitle={formData.title || 'New Project'}
                />

                <div className="mt-6">
                  <label className="block text-sm font-medium text-earle-black mb-2">
                    Additional Images
                  </label>
                  <p className="text-xs text-gray-500 mb-3">
                    Add extra gallery images. Click the star to make an image the featured image.
                  </p>

                  <div className="flex flex-wrap gap-4 items-start">
                    {(formData.additionalImages || []).map((img, index) => (
                      <div key={index} className="relative group w-28 h-28 rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-100 flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img} alt={`Additional ${index + 1}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleSetFeatured(index)}
                            className="p-1.5 bg-white/90 rounded-full hover:bg-yellow-100 transition-colors"
                            title="Set as featured image"
                          >
                            <StarIcon className="h-4 w-4 text-yellow-600" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveAdditionalImage(index)}
                            className="p-1.5 bg-white/90 rounded-full hover:bg-red-100 transition-colors"
                            title="Remove image"
                          >
                            <XMarkIcon className="h-4 w-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => additionalImageInputRef.current?.click()}
                      className="w-28 h-28 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-purple hover:text-purple transition-colors cursor-pointer"
                    >
                      <PlusIcon className="h-6 w-6 mb-1" />
                      <span className="text-xs font-medium">Add Image</span>
                    </button>
                  </div>

                  <input
                    ref={additionalImageInputRef}
                    type="file"
                    accept="image/*,.heic,.heif"
                    multiple
                    onChange={handleAdditionalImageUpload}
                    className="hidden"
                  />

                  {imageError && (
                    <div className="mt-3 flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <span className="text-red-500 flex-shrink-0 mt-0.5">&#9888;</span>
                      <p className="flex-1 font-raleway text-sm text-red-700">{imageError}</p>
                      <button type="button" onClick={() => setImageError(null)} className="text-red-400 hover:text-red-600 flex-shrink-0 text-lg leading-none">&times;</button>
                    </div>
                  )}
                </div>
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
