'use client';

import React, { useState } from 'react';
import { XMarkIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface ContentEditorProps {
  content: Record<string, unknown> | null;
  onSave: (updatedContent: { page: string; content: Record<string, unknown> }) => void;
  onCancel: () => void;
  isOpen: boolean;
  title: string;
}

export default function ContentEditor({ content, onSave, onCancel, isOpen, title }: ContentEditorProps) {
  const [editedContent, setEditedContent] = useState(content);

  if (!isOpen) return null;

  const handleSave = () => {
    if (editedContent) {
      onSave({ page: title.toLowerCase(), content: editedContent });
    }
  };

  const handleCancel = () => {
    setEditedContent(content);
    onCancel();
  };

  const updateField = (path: string, value: string | number | boolean) => {
    const keys = path.split('.');
    const newContent = { ...editedContent };
    let current = newContent as Record<string, unknown>;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]] as Record<string, unknown>;
    }
    
    current[keys[keys.length - 1]] = value;
    setEditedContent(newContent);
  };

  const addArrayItem = (path: string, newItem: Record<string, string | string[] | boolean>) => {
    const keys = path.split('.');
    const newContent = { ...editedContent };
    let current = newContent as Record<string, unknown>;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]] as Record<string, unknown>;
    }
    
    if (!Array.isArray(current[keys[keys.length - 1]])) {
      current[keys[keys.length - 1]] = [];
    }
    
    (current[keys[keys.length - 1]] as unknown[]).push(newItem);
    setEditedContent(newContent);
  };

  const removeArrayItem = (path: string, index: number) => {
    const keys = path.split('.');
    const newContent = { ...editedContent };
    let current = newContent as Record<string, unknown>;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]] as Record<string, unknown>;
    }
    
    (current[keys[keys.length - 1]] as unknown[]).splice(index, 1);
    setEditedContent(newContent);
  };

  const renderField = (label: string, path: string, type: string = 'text', options?: string[]) => {
    const value = (path.split('.').reduce((obj: unknown, key) => (obj as Record<string, unknown>)?.[key], editedContent) as string) || '';

    return (
      <div className="mb-4">
        <label className="block font-montserrat font-semibold text-earle-black mb-2">
          {label}
        </label>
        {type === 'textarea' ? (
          <textarea
            value={value}
            onChange={(e) => updateField(path, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent"
            rows={4}
          />
        ) : type === 'select' ? (
          <select
            value={value}
            onChange={(e) => updateField(path, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent"
          >
            <option value="">Select an option</option>
            {options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => updateField(path, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent"
          />
        )}
      </div>
    );
  };

  const renderArrayField = (label: string, path: string, itemTemplate: Record<string, string | string[] | boolean>) => {
    const items = (path.split('.').reduce((obj: unknown, key) => (obj as Record<string, unknown>)?.[key], editedContent) as unknown[]) || [];

    return (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <label className="font-montserrat font-semibold text-earle-black">
            {label}
          </label>
          <button
            onClick={() => addArrayItem(path, itemTemplate)}
            className="flex items-center gap-2 px-3 py-1 btn-primary text-sm"
          >
            <PlusIcon className="h-4 w-4" />
            Add Item
          </button>
        </div>
        
        <div className="space-y-4">
          {items.map((item: unknown, index: number) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg border">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-montserrat font-medium text-earle-black">
                  Item {index + 1}
                </h4>
                <button
                  onClick={() => removeArrayItem(path, index)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
              
              {Object.keys(item as Record<string, unknown>).map((key) => (
                <div key={key} className="mb-3">
                  <label className="block font-raleway text-sm font-medium text-gray-700 mb-1">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  {key === 'description' || key === 'features' ? (
                    <textarea
                      value={Array.isArray((item as Record<string, unknown>)[key]) ? ((item as Record<string, unknown>)[key] as string[]).join('\n') : ((item as Record<string, unknown>)[key] as string) || ''}
                      onChange={(e) => {
                        const newItems = [...items];
                        if (key === 'features') {
                          (newItems[index] as Record<string, unknown>)[key] = e.target.value.split('\n').filter(f => f.trim());
                        } else {
                          (newItems[index] as Record<string, unknown>)[key] = e.target.value;
                        }
                        updateField(path, newItems as unknown as string | number | boolean);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent text-sm"
                      rows={3}
                    />
                  ) : (
                    <input
                      type="text"
                      value={((item as Record<string, unknown>)[key] as string) || ''}
                      onChange={(e) => {
                        const newItems = [...items];
                        (newItems[index] as Record<string, unknown>)[key] = e.target.value;
                        updateField(path, newItems as unknown as string | number | boolean);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent text-sm"
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white-smoke rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-montserrat text-2xl text-earle-black">
              Edit {title} Content
            </h2>
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <XMarkIcon className="h-6 w-6 text-earle-black" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Hero Section */}
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-montserrat text-lg font-semibold text-earle-black mb-4">Hero Section</h3>
              {renderField('Title', 'hero.title')}
              {renderField('Subtitle', 'hero.subtitle')}
              {renderField('Description', 'hero.description', 'textarea')}
              {renderField('Primary CTA', 'hero.ctaPrimary')}
              {renderField('Secondary CTA', 'hero.ctaSecondary')}
            </div>

            {/* Services Section */}
            {editedContent.services && (
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-montserrat text-lg font-semibold text-earle-black mb-4">Services Section</h3>
                {renderField('Section Title', 'services.title')}
                {renderField('Section Description', 'services.description', 'textarea')}
                {renderArrayField('Service Items', 'services.items', {
                  id: '',
                  title: '',
                  description: '',
                  icon: ''
                })}
              </div>
            )}

            {/* CTA Section */}
            {editedContent.cta && (
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-montserrat text-lg font-semibold text-earle-black mb-4">Call to Action</h3>
                {renderField('Title', 'cta.title')}
                {renderField('Description', 'cta.description', 'textarea')}
                {renderField('Button Text', 'cta.buttonText')}
              </div>
            )}

            {/* Additional sections based on content type */}
            {editedContent.mission && (
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-montserrat text-lg font-semibold text-earle-black mb-4">Mission</h3>
                {renderField('Title', 'mission.title')}
                {renderField('Description', 'mission.description', 'textarea')}
              </div>
            )}

            {editedContent.values && (
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-montserrat text-lg font-semibold text-earle-black mb-4">Values</h3>
                {renderArrayField('Values', 'values', {
                  id: '',
                  title: '',
                  description: '',
                  icon: ''
                })}
              </div>
            )}

            {editedContent.team && (
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-montserrat text-lg font-semibold text-earle-black mb-4">Team</h3>
                {renderArrayField('Team Members', 'team', {
                  id: '',
                  name: '',
                  role: '',
                  description: '',
                  image: ''
                })}
              </div>
            )}

            {editedContent.tiers && (
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-montserrat text-lg font-semibold text-earle-black mb-4">Pricing Tiers</h3>
                {renderArrayField('Pricing Tiers', 'tiers', {
                  id: '',
                  name: '',
                  price: '',
                  description: '',
                  features: [],
                  popular: false
                })}
              </div>
            )}

            {editedContent.servicePricing && (
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-montserrat text-lg font-semibold text-earle-black mb-4">Service Pricing</h3>
                {renderArrayField('Service Pricing', 'servicePricing', {
                  id: '',
                  service: '',
                  priceRange: '',
                  description: ''
                })}
              </div>
            )}

            {editedContent.form && (
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-montserrat text-lg font-semibold text-earle-black mb-4">Contact Form</h3>
                {renderField('Form Title', 'form.title')}
                {renderField('Form Description', 'form.description', 'textarea')}
                {renderField('Submit Button Text', 'form.submitButton')}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <button
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 text-earle-black rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 btn-primary"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
