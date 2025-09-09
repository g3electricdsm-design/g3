'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, PlusIcon, PencilIcon, TrashIcon, CogIcon, ChartBarIcon, PhotoIcon, EnvelopeIcon, EyeIcon, HomeIcon, UserIcon } from '@heroicons/react/24/outline';
import Navigation from '@/components/Navigation';
import { getAllProjects, Project } from '@/data/projects';
import { getAllServices, Service } from '@/data/services';
import { getAllFormEntries, FormEntry } from '@/data/formEntries';
import { getContent, updateContent } from '@/data/content';
import ProjectForm from '@/components/ProjectForm';
import FormEntryModal from '@/components/FormEntryModal';
import ContentEditor from '@/components/ContentEditor';

export default function Admin() {
  const [projects, setProjects] = useState<Project[]>(getAllProjects());
  const [services] = useState<Service[]>(getAllServices());
  const [formEntries, setFormEntries] = useState<FormEntry[]>(getAllFormEntries());
  const [content, setContent] = useState(getContent());
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [selectedFormEntry, setSelectedFormEntry] = useState<FormEntry | null>(null);
  const [editingContent, setEditingContent] = useState<{ page: string; content: Record<string, unknown> } | null>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showFormEntryModal, setShowFormEntryModal] = useState(false);
  const [showContentEditor, setShowContentEditor] = useState(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'services' | 'formEntries' | 'content' | 'analytics' | 'settings'>('projects');

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setShowProjectForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const handleSaveProject = (projectData: Project) => {
    if (editingProject) {
      // Update existing project
      setProjects(projects.map(p => p.id === editingProject.id ? { ...projectData, id: editingProject.id } : p));
    } else {
      // Add new project
      const newId = Math.max(...projects.map(p => p.id), 0) + 1;
      setProjects([...projects, { ...projectData, id: newId }]);
    }
    setEditingProject(null);
    setShowProjectForm(false);
  };

  const handleCancelProject = () => {
    setEditingProject(null);
    setShowProjectForm(false);
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setShowProjectForm(true);
  };

  const handleViewFormEntry = (entry: FormEntry) => {
    setSelectedFormEntry(entry);
    setShowFormEntryModal(true);
  };

  const handleUpdateFormEntryStatus = (id: number, status: string) => {
    setFormEntries(prev => prev.map(entry => 
      entry.id === id ? { ...entry, status: status as 'new' | 'read' | 'contacted' | 'completed' | 'cancelled' } : entry
    ));
  };

  const handleAddFormEntryNote = (id: number, note: string) => {
    setFormEntries(prev => prev.map(entry => 
      entry.id === id ? { ...entry, adminNotes: note } : entry
    ));
  };

  const handleDeleteFormEntry = (id: number) => {
    if (confirm('Are you sure you want to delete this form entry?')) {
      setFormEntries(prev => prev.filter(entry => entry.id !== id));
    }
  };

  const handleEditContent = (page: string) => {
    setEditingContent({ page, content: content[page as keyof typeof content] as unknown as Record<string, unknown> });
    setShowContentEditor(true);
  };

  const handleSaveContent = (updatedContent: { page: string; content: Record<string, unknown> }) => {
    const newContent = { ...content };
    (newContent as Record<string, unknown>)[updatedContent.page] = updatedContent.content;
    setContent(newContent);
    updateContent(updatedContent.page, updatedContent.content);
    setShowContentEditor(false);
    setEditingContent(null);
  };

  const handleCancelContent = () => {
    setShowContentEditor(false);
    setEditingContent(null);
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

      {/* Content Management Dashboard */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Dashboard Header */}
          <div className="mb-8">
            <h2 className="font-montserrat text-3xl text-white mb-4">Content Management Dashboard</h2>
            <p className="font-raleway text-white-smoke">Manage your website content, projects, and services</p>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <nav className="flex space-x-8">
              {[
                { id: 'projects', name: 'Projects', icon: PhotoIcon },
                { id: 'services', name: 'Services', icon: CogIcon },
                { id: 'formEntries', name: 'Form Entries', icon: EnvelopeIcon },
                { id: 'content', name: 'Content', icon: PencilIcon },
                { id: 'analytics', name: 'Analytics', icon: ChartBarIcon },
                { id: 'settings', name: 'Settings', icon: CogIcon }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as 'projects' | 'services' | 'formEntries' | 'content' | 'analytics' | 'settings')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-montserrat font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-purple text-white'
                        : 'text-white-smoke hover:text-purple hover:bg-white-smoke/10'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-montserrat text-2xl text-white">Portfolio Projects</h3>
                <button
                  onClick={handleAddProject}
                  className="btn-primary flex items-center gap-2"
                >
                  <PlusIcon className="h-5 w-5" />
                  Add New Project
                </button>
              </div>

              <div className="bg-white-smoke rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-montserrat text-lg font-semibold text-earle-black">{project.title}</h4>
                          <p className="font-raleway text-sm text-gray-600">{project.category} • {project.type}</p>
                        </div>
                        <div className="flex items-center gap-1">
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
                      <p className="font-raleway text-sm text-gray-500 mb-3 line-clamp-2">{project.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>{project.client}</span>
                        <span>{project.completed}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Services Tab */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-montserrat text-2xl text-white">Services Management</h3>
                <button className="bg-purple text-white px-6 py-3 rounded-lg font-montserrat font-semibold hover:bg-phlox transition-colors flex items-center gap-2">
                  <PlusIcon className="h-5 w-5" />
                  Add New Service
                </button>
              </div>

              <div className="bg-white-smoke rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services.map((service) => (
                    <div key={service.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-montserrat text-lg font-semibold text-earle-black">{service.name}</h4>
                          <p className="font-raleway text-sm text-gray-600">{service.category}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button className="p-2 text-purple hover:bg-purple/10 rounded-lg transition-colors">
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <p className="font-raleway text-sm text-gray-500 mb-3">{service.description}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">{service.pricing.description}</span>
                        {service.popular && (
                          <span className="bg-purple/10 text-purple px-2 py-1 rounded-full text-xs font-medium">
                            Popular
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Form Entries Tab */}
          {activeTab === 'formEntries' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-montserrat text-2xl text-white">Form Entries</h3>
                <div className="flex items-center gap-4">
                  <span className="text-white-smoke">
                    {formEntries.filter(e => e.status === 'new').length} new entries
                  </span>
                  <button className="btn-primary flex items-center gap-2">
                    <EnvelopeIcon className="h-5 w-5" />
                    Export Entries
                  </button>
                </div>
              </div>

              <div className="bg-white-smoke rounded-lg p-6">
                <div className="space-y-4">
                  {formEntries.map((entry) => (
                    <div key={entry.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-montserrat text-lg font-semibold text-earle-black">
                              {entry.customerInfo.name}
                            </h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              entry.status === 'new' ? 'bg-blue-100 text-blue-800' :
                              entry.status === 'read' ? 'bg-yellow-100 text-yellow-800' :
                              entry.status === 'contacted' ? 'bg-purple-100 text-purple-800' :
                              entry.status === 'completed' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(entry.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="font-raleway text-sm text-gray-600 mb-2">
                            {entry.customerInfo.email} • {entry.customerInfo.phone}
                          </p>
                          <p className="font-raleway text-sm text-gray-500 mb-2">
                            <strong>Project:</strong> {entry.projectInfo.projectType} • {entry.projectInfo.description?.substring(0, 100)}...
                          </p>
                          {entry.projectInfo.budget && (
                            <p className="font-raleway text-sm text-gray-500">
                              <strong>Budget:</strong> {entry.projectInfo.budget}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewFormEntry(entry)}
                            className="p-2 text-purple hover:bg-purple/10 rounded-lg transition-colors"
                            title="View details"
                          >
                            <EyeIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteFormEntry(entry.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete entry"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Content Management Tab */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-montserrat text-2xl text-white">Content Management</h3>
                <p className="text-white-smoke">Manage all website content from one place</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Homepage Content */}
                <div className="bg-white-smoke rounded-lg p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-purple/20 rounded-lg flex items-center justify-center">
                      <HomeIcon className="h-6 w-6 text-purple" />
                    </div>
                    <div>
                      <h4 className="font-montserrat text-lg font-semibold text-earle-black">Homepage</h4>
                      <p className="font-raleway text-sm text-gray-600">Hero, services, CTA sections</p>
                    </div>
                  </div>
                  <p className="font-raleway text-sm text-gray-600 mb-4">
                    Manage hero content, service previews, and call-to-action sections.
                  </p>
                  <button
                    onClick={() => handleEditContent('homepage')}
                    className="w-full btn-primary"
                  >
                    Edit Homepage
                  </button>
                </div>

                {/* Services Content */}
                <div className="bg-white-smoke rounded-lg p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-hookers-green/20 rounded-lg flex items-center justify-center">
                      <CogIcon className="h-6 w-6 text-hookers-green" />
                    </div>
                    <div>
                      <h4 className="font-montserrat text-lg font-semibold text-earle-black">Services</h4>
                      <p className="font-raleway text-sm text-gray-600">Service descriptions & features</p>
                    </div>
                  </div>
                  <p className="font-raleway text-sm text-gray-600 mb-4">
                    Update service descriptions, features, and detailed information.
                  </p>
                  <button
                    onClick={() => handleEditContent('services')}
                    className="w-full bg-hookers-green text-white px-4 py-2 rounded-lg font-montserrat font-medium hover:bg-hookers-green/80 transition-colors"
                  >
                    Edit Services
                  </button>
                </div>

                {/* Pricing Content */}
                <div className="bg-white-smoke rounded-lg p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-phlox/20 rounded-lg flex items-center justify-center">
                      <ChartBarIcon className="h-6 w-6 text-phlox" />
                    </div>
                    <div>
                      <h4 className="font-montserrat text-lg font-semibold text-earle-black">Pricing</h4>
                      <p className="font-raleway text-sm text-gray-600">Pricing tiers & service costs</p>
                    </div>
                  </div>
                  <p className="font-raleway text-sm text-gray-600 mb-4">
                    Manage pricing tiers, service pricing, and cost information.
                  </p>
                  <button
                    onClick={() => handleEditContent('pricing')}
                    className="w-full bg-phlox text-white px-4 py-2 rounded-lg font-montserrat font-medium hover:bg-phlox/80 transition-colors"
                  >
                    Edit Pricing
                  </button>
                </div>

                {/* About Content */}
                <div className="bg-white-smoke rounded-lg p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-purple/20 rounded-lg flex items-center justify-center">
                      <UserIcon className="h-6 w-6 text-purple" />
                    </div>
                    <div>
                      <h4 className="font-montserrat text-lg font-semibold text-earle-black">About Us</h4>
                      <p className="font-raleway text-sm text-gray-600">Mission, values, team info</p>
                    </div>
                  </div>
                  <p className="font-raleway text-sm text-gray-600 mb-4">
                    Update company mission, values, team information, and story.
                  </p>
                  <button
                    onClick={() => handleEditContent('about')}
                    className="w-full btn-primary"
                  >
                    Edit About
                  </button>
                </div>

                {/* Contact Content */}
                <div className="bg-white-smoke rounded-lg p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-hookers-green/20 rounded-lg flex items-center justify-center">
                      <EnvelopeIcon className="h-6 w-6 text-hookers-green" />
                    </div>
                    <div>
                      <h4 className="font-montserrat text-lg font-semibold text-earle-black">Contact Form</h4>
                      <p className="font-raleway text-sm text-gray-600">Form fields & contact info</p>
                    </div>
                  </div>
                  <p className="font-raleway text-sm text-gray-600 mb-4">
                    Customize contact form fields, labels, and contact information.
                  </p>
                  <button
                    onClick={() => handleEditContent('contact')}
                    className="w-full bg-hookers-green text-white px-4 py-2 rounded-lg font-montserrat font-medium hover:bg-hookers-green/80 transition-colors"
                  >
                    Edit Contact
                  </button>
                </div>

                {/* Content Overview */}
                <div className="bg-white-smoke rounded-lg p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-earle-black/20 rounded-lg flex items-center justify-center">
                      <EyeIcon className="h-6 w-6 text-earle-black" />
                    </div>
                    <div>
                      <h4 className="font-montserrat text-lg font-semibold text-earle-black">Content Overview</h4>
                      <p className="font-raleway text-sm text-gray-600">All content status</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-raleway text-gray-600">Homepage</span>
                      <span className="font-montserrat text-green-600">✓ Updated</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-raleway text-gray-600">Services</span>
                      <span className="font-montserrat text-green-600">✓ Updated</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-raleway text-gray-600">Pricing</span>
                      <span className="font-montserrat text-green-600">✓ Updated</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-raleway text-gray-600">About</span>
                      <span className="font-montserrat text-green-600">✓ Updated</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-raleway text-gray-600">Contact</span>
                      <span className="font-montserrat text-green-600">✓ Updated</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h3 className="font-montserrat text-2xl text-white">Analytics Dashboard</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white-smoke rounded-lg p-6">
                  <h4 className="font-montserrat text-lg font-semibold text-earle-black mb-2">Total Projects</h4>
                  <p className="font-megrim text-3xl text-purple">{projects.length}</p>
                </div>
                <div className="bg-white-smoke rounded-lg p-6">
                  <h4 className="font-montserrat text-lg font-semibold text-earle-black mb-2">Total Services</h4>
                  <p className="font-megrim text-3xl text-purple">{services.length}</p>
                </div>
                <div className="bg-white-smoke rounded-lg p-6">
                  <h4 className="font-montserrat text-lg font-semibold text-earle-black mb-2">Form Entries</h4>
                  <p className="font-megrim text-3xl text-purple">{formEntries.length}</p>
                </div>
                <div className="bg-white-smoke rounded-lg p-6">
                  <h4 className="font-montserrat text-lg font-semibold text-earle-black mb-2">New Entries</h4>
                  <p className="font-megrim text-3xl text-purple">{formEntries.filter(e => e.status === 'new').length}</p>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="font-montserrat text-2xl text-white">Settings</h3>
              <div className="bg-white-smoke rounded-lg p-6">
                <h4 className="font-montserrat text-lg font-semibold text-earle-black mb-4">Data Management</h4>
                <div className="space-y-4">
                  <button className="w-full btn-primary">
                    Export All Data
                  </button>
                  <button className="w-full btn-secondary">
                    Import Data
                  </button>
                  <button className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-montserrat font-semibold hover:bg-red-700 transition-colors">
                    Reset All Data
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Project Form Modal */}
          <ProjectForm
            project={editingProject}
            onSave={handleSaveProject}
            onCancel={handleCancelProject}
            isOpen={showProjectForm}
          />

          {/* Form Entry Modal */}
          <FormEntryModal
            entry={selectedFormEntry}
            onClose={() => setShowFormEntryModal(false)}
            onUpdateStatus={handleUpdateFormEntryStatus}
            onAddNote={handleAddFormEntryNote}
            isOpen={showFormEntryModal}
          />

          {/* Content Editor Modal */}
          <ContentEditor
            content={editingContent?.content}
            onSave={handleSaveContent}
            onCancel={handleCancelContent}
            isOpen={showContentEditor}
            title={editingContent?.page ? editingContent.page.charAt(0).toUpperCase() + editingContent.page.slice(1) : ''}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white-smoke py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="font-montserrat text-2xl text-earle-black mb-4">G3 Electric</h3>
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
