'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
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
    client: '',
    location: '',
    services: [],
    challenges: '',
    size: 'medium'
  });

  const [newService, setNewService] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const id = params.id as string;
    
    if (id === 'new') {
      // Creating a new project
      setIsLoading(false);
    } else {
      // Editing existing project
      const project = getProjectById(id);
      if (project) {
        setFormData(project);
      } else {
        // Project not found, redirect to admin
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
        // Create new project
        const newId = Date.now(); // Simple ID generation
        const newProject = { ...formData, id: newId };
        console.log('Creating new project with image:', newProject.image);
        addProject(newProject);
      } else {
        // Update existing project
        console.log('Updating project with image:', formData.image);
        updateProject(formData);
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
                      placeholder="Brief project summary"
                    />
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

              {/* Project Image Upload */}
              <div className="space-y-4">
                <h3 className="font-montserrat text-2xl font-semibold text-earle-black border-b border-gray-300 pb-2">
                  Project Image
                </h3>
                <ImageUpload
                  currentImage={formData.image}
                  onImageChange={handleImageChange}
                  projectTitle={formData.title || 'New Project'}
                />
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
