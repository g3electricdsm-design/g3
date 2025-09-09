'use client';

import { useState } from 'react';
import { XMarkIcon, PhoneIcon, EnvelopeIcon, CalendarIcon, ClockIcon, UserIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import { FormEntry } from '@/data/formEntries';

interface FormEntryModalProps {
  entry: FormEntry | null;
  onClose: () => void;
  onUpdateStatus: (id: number, status: string) => void;
  onAddNote: (id: number, note: string) => void;
  isOpen: boolean;
}

export default function FormEntryModal({ entry, onClose, onUpdateStatus, onAddNote, isOpen }: FormEntryModalProps) {
  const [newNote, setNewNote] = useState('');
  const [showAddNote, setShowAddNote] = useState(false);

  if (!isOpen || !entry) return null;

  const handleStatusChange = (newStatus: string) => {
    onUpdateStatus(entry.id, newStatus);
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote(entry.id, newNote.trim());
      setNewNote('');
      setShowAddNote(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'read': return 'bg-yellow-100 text-yellow-800';
      case 'contacted': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white-smoke rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="font-montserrat text-2xl text-earle-black mb-2">
                Form Entry #{entry.id}
              </h2>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(entry.status)}`}>
                  {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                </span>
                <span className="text-sm text-gray-600">
                  {new Date(entry.timestamp).toLocaleDateString()} at {new Date(entry.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <XMarkIcon className="h-6 w-6 text-earle-black" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Customer Information */}
            <div className="space-y-6">
              <h3 className="font-montserrat text-xl text-earle-black">Customer Information</h3>
              
              <div className="bg-white rounded-lg p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <UserIcon className="h-5 w-5 text-purple" />
                  <div>
                    <p className="font-montserrat font-semibold text-earle-black">{entry.customerInfo.name}</p>
                    <p className="text-sm text-gray-600">{entry.customerInfo.company || 'Individual Customer'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <EnvelopeIcon className="h-5 w-5 text-purple" />
                  <a href={`mailto:${entry.customerInfo.email}`} className="text-purple hover:text-phlox">
                    {entry.customerInfo.email}
                  </a>
                </div>

                {entry.customerInfo.phone && (
                  <div className="flex items-center gap-3">
                    <PhoneIcon className="h-5 w-5 text-purple" />
                    <a href={`tel:${entry.customerInfo.phone}`} className="text-purple hover:text-phlox">
                      {entry.customerInfo.phone}
                    </a>
                  </div>
                )}

                {entry.additionalInfo?.urgency && (
                  <div className="flex items-center gap-3">
                    <ClockIcon className="h-5 w-5 text-purple" />
                    <span className={`px-2 py-1 rounded text-sm font-medium ${getUrgencyColor(entry.additionalInfo.urgency)}`}>
                      {entry.additionalInfo.urgency.charAt(0).toUpperCase() + entry.additionalInfo.urgency.slice(1)} Priority
                    </span>
                  </div>
                )}
              </div>

              {/* Project Information */}
              <h3 className="font-montserrat text-xl text-earle-black">Project Details</h3>
              
              <div className="bg-white rounded-lg p-4 space-y-4">
                {entry.projectInfo.projectType && (
                  <div>
                    <p className="font-montserrat font-semibold text-earle-black">Project Type</p>
                    <p className="text-gray-700">{entry.projectInfo.projectType}</p>
                  </div>
                )}

                {entry.projectInfo.description && (
                  <div>
                    <p className="font-montserrat font-semibold text-earle-black">Description</p>
                    <p className="text-gray-700">{entry.projectInfo.description}</p>
                  </div>
                )}

                {entry.projectInfo.budget && (
                  <div>
                    <p className="font-montserrat font-semibold text-earle-black">Budget</p>
                    <p className="text-gray-700">{entry.projectInfo.budget}</p>
                  </div>
                )}

                {entry.projectInfo.timeline && (
                  <div>
                    <p className="font-montserrat font-semibold text-earle-black">Timeline</p>
                    <p className="text-gray-700">{entry.projectInfo.timeline}</p>
                  </div>
                )}

                {entry.projectInfo.workArea && (
                  <div>
                    <p className="font-montserrat font-semibold text-earle-black">Work Area</p>
                    <p className="text-gray-700">{entry.projectInfo.workArea}</p>
                  </div>
                )}

                {entry.projectInfo.services && entry.projectInfo.services.length > 0 && (
                  <div>
                    <p className="font-montserrat font-semibold text-earle-black">Services Needed</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {entry.projectInfo.services.map((service, index) => (
                        <span key={index} className="px-3 py-1 bg-purple/10 text-purple rounded-full text-sm">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Information & Admin Actions */}
            <div className="space-y-6">
              <h3 className="font-montserrat text-xl text-earle-black">Additional Information</h3>
              
              <div className="bg-white rounded-lg p-4 space-y-4">
                {entry.additionalInfo?.message && (
                  <div>
                    <p className="font-montserrat font-semibold text-earle-black">Message</p>
                    <p className="text-gray-700">{entry.additionalInfo.message}</p>
                  </div>
                )}

                {entry.additionalInfo?.preferredContact && (
                  <div>
                    <p className="font-montserrat font-semibold text-earle-black">Preferred Contact</p>
                    <p className="text-gray-700 capitalize">{entry.additionalInfo.preferredContact}</p>
                  </div>
                )}
              </div>

              {/* Admin Actions */}
              <h3 className="font-montserrat text-xl text-earle-black">Admin Actions</h3>
              
              <div className="bg-white rounded-lg p-4 space-y-4">
                <div>
                  <label className="block font-montserrat font-semibold text-earle-black mb-2">Update Status</label>
                  <select
                    value={entry.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent"
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="contacted">Contacted</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-montserrat font-semibold text-earle-black">Admin Notes</label>
                    <button
                      onClick={() => setShowAddNote(!showAddNote)}
                      className="text-purple hover:text-phlox text-sm"
                    >
                      {showAddNote ? 'Cancel' : 'Add Note'}
                    </button>
                  </div>
                  
                  {entry.adminNotes && (
                    <div className="bg-gray-50 p-3 rounded-lg mb-3">
                      <p className="text-gray-700">{entry.adminNotes}</p>
                    </div>
                  )}

                  {showAddNote && (
                    <div className="space-y-2">
                      <textarea
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Add admin notes..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-transparent"
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleAddNote}
                          className="px-4 py-2 bg-purple text-white rounded-lg hover:bg-phlox transition-colors text-sm"
                        >
                          Add Note
                        </button>
                        <button
                          onClick={() => {
                            setShowAddNote(false);
                            setNewNote('');
                          }}
                          className="px-4 py-2 border border-gray-300 text-earle-black rounded-lg hover:bg-gray-50 transition-colors text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
