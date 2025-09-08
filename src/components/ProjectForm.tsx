'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { Project } from '@/data/projects';

interface ProjectFormProps {
  project?: Project | null;
  onSave: (projectData: Project) => void;
  onCancel: () => void;
  isOpen: boolean;
}

export default function ProjectForm({ project, onSave, onCancel, isOpen }: ProjectFormProps) {
  const [formData, setFormData] = useState<Project>({
    id: 0,
    title: '',
    category: 'Residential',
    type: '',
    image: '/api/placeholder/800/600',
    description: '',
    fullDescription: '',
    client: '',
    location: '',
    duration: '',
    completed: '',
    services: [],
    challenges: '',
    results: '',
    size: 'medium'
  });

  const [newService, setNewService] = useState('');

  useEffect(() => {
    if (project) {
      setFormData(project);
    } else {
      setFormData({
        id: 0,
        title: '',
        category: 'Residential',
        type: '',
        image: '/api/placeholder/800/600',
        description: '',
        fullDescription: '',
        client: '',
        location: '',
        duration: '',
        completed: '',
        services: [],
        challenges: '',
        results: '',
        size: 'medium'
      });
    }
  }, [project]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddService = () => {
    if (newService.trim()) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white-smoke rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-megrim text-2xl text-earle-black">
              {project ? 'Edit Project' : 'Add New Project'}
            </h2>
            <button
              onClick={onCancel}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <XMarkIcon className="h-6 w-6 text-earle-black" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="font-montserrat text-lg font-semibold text-earle-black">Basic Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-earle-black mb-2">Project Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-earle-black mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-earle-black mb-2">Project Type</label>
                  <input
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent"
                    placeholder="e.g., Lighting, New Build, Fans"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-earle-black mb-2">Size</label>
                  <select
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
              </div>

              {/* Client Information */}
              <div className="space-y-4">
                <h3 className="font-montserrat text-lg font-semibold text-earle-black">Client Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-earle-black mb-2">Client Name</label>
                  <input
                    type="text"
                    name="client"
                    value={formData.client}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-earle-black mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-earle-black mb-2">Duration</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent"
                    placeholder="e.g., 2 days, 1 week"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-earle-black mb-2">Completion Date</label>
                  <input
                    type="text"
                    name="completed"
                    value={formData.completed}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent"
                    placeholder="e.g., March 2024"
                  />
                </div>
              </div>
            </div>

            {/* Descriptions */}
            <div className="space-y-4">
              <h3 className="font-montserrat text-lg font-semibold text-earle-black">Project Descriptions</h3>
              
              <div>
                <label className="block text-sm font-medium text-earle-black mb-2">Short Description</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent"
                  placeholder="Brief project summary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-earle-black mb-2">Full Description</label>
                <textarea
                  name="fullDescription"
                  value={formData.fullDescription}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent"
                  placeholder="Detailed project description"
                />
              </div>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h3 className="font-montserrat text-lg font-semibold text-earle-black">Services Provided</h3>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent"
                  placeholder="Add a service"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddService())}
                />
                <button
                  type="button"
                  onClick={handleAddService}
                  className="px-4 py-2 bg-purple text-white rounded-lg hover:bg-phlox transition-colors"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.services.map((service, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-purple/10 text-purple rounded-full text-sm"
                  >
                    {service}
                    <button
                      type="button"
                      onClick={() => handleRemoveService(index)}
                      className="hover:text-red-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Challenges and Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-earle-black mb-2">Challenges</label>
                <textarea
                  name="challenges"
                  value={formData.challenges}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent"
                  placeholder="Project challenges faced"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-earle-black mb-2">Results</label>
                <textarea
                  name="results"
                  value={formData.results}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent"
                  placeholder="Project results achieved"
                />
              </div>
            </div>

            {/* Image Upload Placeholder */}
            <div className="space-y-4">
              <h3 className="font-montserrat text-lg font-semibold text-earle-black">Project Image</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <PhotoIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Image upload coming soon</p>
                <p className="text-sm text-gray-500">Currently using placeholder: {formData.image}</p>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2 border border-gray-300 text-earle-black rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-purple text-white rounded-lg hover:bg-phlox transition-colors"
              >
                {project ? 'Update Project' : 'Create Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
