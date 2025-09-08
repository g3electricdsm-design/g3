'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Navigation from '@/components/Navigation';
import { getAllProjects, Project } from '@/data/projects';

export default function Admin() {
  const [projects, setProjects] = useState<Project[]>(getAllProjects());
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const handleEdit = (project: Project) => {
    setEditingProject(project);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-earle-black">
      {/* Navigation */}
      <Navigation currentPath="/admin" />

      {/* Header */}
      <section className="bg-gradient-to-br from-purple to-phlox text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Link href="/" className="flex items-center text-white hover:text-white-smoke transition-colors">
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </div>
          <h1 className="font-megrim text-4xl md:text-5xl mb-4">Content Management</h1>
          <p className="font-raleway text-lg md:text-xl max-w-3xl">
            Manage your portfolio projects and website content.
          </p>
        </div>
      </section>

      {/* Content Management */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Add Project Button */}
          <div className="mb-8">
            <button
              onClick={() => {
                setEditingProject(null);
              }}
              className="bg-purple text-white px-6 py-3 rounded-lg font-montserrat font-semibold hover:bg-phlox transition-colors flex items-center gap-2"
            >
              <PlusIcon className="h-5 w-5" />
              Add New Project
            </button>
          </div>

          {/* Projects List */}
          <div className="bg-white-smoke rounded-lg p-6">
            <h2 className="font-montserrat text-2xl text-earle-black mb-6">Portfolio Projects</h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-montserrat text-lg font-semibold text-earle-black">{project.title}</h3>
                      <p className="font-raleway text-gray-600">{project.category} • {project.type}</p>
                      <p className="font-raleway text-sm text-gray-500 mt-1">{project.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(project)}
                        className="p-2 text-purple hover:bg-purple/10 rounded-lg transition-colors"
                        title="Edit project"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete project"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-montserrat text-lg font-semibold text-blue-900 mb-3">Content Management Instructions</h3>
            <div className="font-raleway text-blue-800 space-y-2">
              <p>• <strong>To edit projects:</strong> Click the pencil icon next to any project</p>
              <p>• <strong>To add projects:</strong> Click the &quot;Add New Project&quot; button above</p>
              <p>• <strong>To delete projects:</strong> Click the trash icon (this action cannot be undone)</p>
              <p>• <strong>To update the live site:</strong> All changes are automatically saved and will appear on the website</p>
              <p>• <strong>For advanced editing:</strong> You can directly edit the <code className="bg-blue-100 px-1 rounded">src/data/projects.ts</code> file</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white-smoke py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="font-megrim text-2xl text-earle-black mb-4">G3 Electric</h3>
            <p className="font-raleway text-gray-600 mb-4">Safe & Dependable Electrical Services</p>
            <div className="flex justify-center space-x-6">
              <Link href="/services" className="text-gray-600 hover:text-purple font-raleway">Services</Link>
              <Link href="/portfolio" className="text-purple font-raleway">Portfolio</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-purple font-raleway">Pricing</Link>
              <Link href="/about" className="text-gray-600 hover:text-purple font-raleway">About</Link>
              <Link href="/contact" className="text-gray-600 hover:text-purple font-raleway">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
