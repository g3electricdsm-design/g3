'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon, PhoneIcon, EnvelopeIcon, ClockIcon, UserIcon, TrashIcon, PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { getAllFormEntries, FormEntry, deleteFormEntry, updateFormEntryAdminNotes, updateFormEntryUrgency } from '@/data/formEntries';
import { useState, useEffect } from 'react';

export default function FormEntryDetail() {
  const params = useParams();
  const router = useRouter();
  const [entry, setEntry] = useState<FormEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [adminNotesText, setAdminNotesText] = useState('');
  const [isEditingUrgency, setIsEditingUrgency] = useState(false);
  const [urgencyValue, setUrgencyValue] = useState<'low' | 'medium' | 'high' | ''>('');

  useEffect(() => {
    const entries = getAllFormEntries();
    const foundEntry = entries.find(e => e.id.toString() === params.id);
    setEntry(foundEntry || null);
    if (foundEntry) {
      setAdminNotesText(foundEntry.adminNotes || '');
      setUrgencyValue(foundEntry.additionalInfo?.urgency || '');
    }
    setIsLoading(false);
  }, [params.id]);

  const handleDelete = () => {
    if (entry && confirm('Are you sure you want to delete this form entry?')) {
      deleteFormEntry(entry.id);
      router.push('/admin?tab=formEntries');
    }
  };

  const handleSaveNotes = () => {
    if (entry) {
      updateFormEntryAdminNotes(entry.id, adminNotesText);
      setEntry({ ...entry, adminNotes: adminNotesText });
      setIsEditingNotes(false);
    }
  };

  const handleCancelEdit = () => {
    if (entry) {
      setAdminNotesText(entry.adminNotes || '');
      setIsEditingNotes(false);
    }
  };

  const handleSaveUrgency = () => {
    if (entry) {
      updateFormEntryUrgency(entry.id, urgencyValue);
      setEntry({
        ...entry,
        additionalInfo: {
          ...entry.additionalInfo,
          urgency: urgencyValue || undefined
        }
      });
      setIsEditingUrgency(false);
    }
  };

  const handleCancelUrgencyEdit = () => {
    if (entry) {
      setUrgencyValue(entry.additionalInfo?.urgency || '');
      setIsEditingUrgency(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-earle-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="min-h-screen bg-earle-black">
        <Navigation currentPath="/admin" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center text-white">
            <h1 className="font-megrim text-4xl mb-4">Entry Not Found</h1>
            <p className="font-raleway text-lg mb-8">The form entry you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/admin?tab=formEntries" className="btn-primary">
              Back to Form Entries
            </Link>
          </div>
        </div>
        <Footer currentPath="/admin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-earle-black">
      <Navigation currentPath="/admin" />

      {/* Header */}
      <section className="bg-gradient-to-br from-purple to-phlox text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/admin?tab=formEntries" 
                className="flex items-center text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all font-raleway font-medium backdrop-blur-sm"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back to Entries
              </Link>
            </div>
            <button
              onClick={handleDelete}
              className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
              title="Delete entry"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
          <h1 className="font-megrim text-4xl md:text-5xl mb-4 mt-6">Form Entry #{entry.id}</h1>
          <p className="font-raleway text-lg md:text-xl">
            Submitted on {new Date(entry.timestamp).toLocaleDateString()} at {new Date(entry.timestamp).toLocaleTimeString()}
          </p>
        </div>
      </section>

      {/* Entry Details */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Customer Information */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="font-montserrat text-2xl font-semibold text-gray-900 mb-6">Customer Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <UserIcon className="h-7 w-7 text-gray-900" />
                  </div>
                  <div>
                    <p className="font-montserrat font-semibold text-gray-900">{entry.customerInfo.name}</p>
                    {entry.customerInfo.company && (
                      <p className="font-raleway text-sm text-gray-700">{entry.customerInfo.company}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <EnvelopeIcon className="h-7 w-7 text-gray-900" />
                  </div>
                  <a href={`mailto:${entry.customerInfo.email}`} className="font-raleway text-purple font-medium hover:text-phlox underline">
                    {entry.customerInfo.email}
                  </a>
                </div>

                {entry.customerInfo.phone && (
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <PhoneIcon className="h-7 w-7 text-gray-900" />
                    </div>
                    <a href={`tel:${entry.customerInfo.phone}`} className="font-raleway text-purple font-medium hover:text-phlox underline">
                      {entry.customerInfo.phone}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Project Information */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="font-montserrat text-2xl font-semibold text-gray-900 mb-6">Project Details</h2>
              
              <div className="space-y-4">
                {entry.projectInfo.projectType && (
                  <div>
                    <p className="font-montserrat font-semibold text-gray-900 mb-1">Project Type</p>
                    <p className="font-raleway text-gray-800">{entry.projectInfo.projectType}</p>
                  </div>
                )}

                {entry.projectInfo.description && (
                  <div>
                    <p className="font-montserrat font-semibold text-gray-900 mb-1">Description</p>
                    <p className="font-raleway text-gray-800">{entry.projectInfo.description}</p>
                  </div>
                )}

                {entry.projectInfo.budget && (
                  <div>
                    <p className="font-montserrat font-semibold text-gray-900 mb-1">Budget</p>
                    <p className="font-raleway text-gray-800">{entry.projectInfo.budget}</p>
                  </div>
                )}

                {entry.projectInfo.timeline && (
                  <div>
                    <p className="font-montserrat font-semibold text-gray-900 mb-1">Timeline</p>
                    <p className="font-raleway text-gray-800">{entry.projectInfo.timeline}</p>
                  </div>
                )}

                {entry.projectInfo.workArea && (
                  <div>
                    <p className="font-montserrat font-semibold text-gray-900 mb-1">Work Area</p>
                    <p className="font-raleway text-gray-800">{entry.projectInfo.workArea}</p>
                  </div>
                )}

                {entry.projectInfo.services && entry.projectInfo.services.length > 0 && (
                  <div>
                    <p className="font-montserrat font-semibold text-gray-900 mb-2">Services Needed</p>
                    <div className="flex flex-wrap gap-2">
                      {entry.projectInfo.services.map((service, index) => (
                        <span key={index} className="px-3 py-1 bg-purple/10 text-purple rounded-full text-sm font-raleway">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="font-montserrat text-2xl font-semibold text-gray-900 mb-6">Additional Information</h2>
              
              <div className="space-y-4">
                {entry.additionalInfo?.message && (
                  <div>
                    <p className="font-montserrat font-semibold text-gray-900 mb-1">Message</p>
                    <p className="font-raleway text-gray-800">{entry.additionalInfo.message}</p>
                  </div>
                )}

                {entry.additionalInfo?.preferredContact && (
                  <div>
                    <p className="font-montserrat font-semibold text-gray-900 mb-1">Preferred Contact Method</p>
                    <p className="font-raleway text-gray-800 capitalize">{entry.additionalInfo.preferredContact}</p>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <ClockIcon className="h-6 w-6 text-gray-900 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-montserrat font-semibold text-gray-900">Urgency</p>
                      {!isEditingUrgency ? (
                        <button
                          onClick={() => setIsEditingUrgency(true)}
                          type="button"
                          className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-white bg-purple hover:bg-phlox rounded-lg transition-colors"
                          style={{ backgroundColor: '#6D0091', color: '#FFFFFF' }}
                        >
                          <PencilIcon className="h-3 w-3 text-white" />
                          <span className="text-white">Edit</span>
                        </button>
                      ) : null}
                    </div>
                    {isEditingUrgency ? (
                      <div className="space-y-3">
                        <select
                          value={urgencyValue}
                          onChange={(e) => setUrgencyValue(e.target.value as 'low' | 'medium' | 'high' | '')}
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-purple font-raleway text-gray-800"
                        >
                          <option value="">No urgency set</option>
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={handleSaveUrgency}
                            type="button"
                            className="flex items-center gap-1 px-4 py-2 bg-purple text-white rounded-lg hover:bg-phlox transition-colors font-medium text-sm"
                            style={{ backgroundColor: '#6D0091', color: '#FFFFFF' }}
                          >
                            <CheckIcon className="h-4 w-4 text-white" />
                            <span className="text-white">Save</span>
                          </button>
                          <button
                            onClick={handleCancelUrgencyEdit}
                            type="button"
                            className="flex items-center gap-1 px-4 py-2 border-2 border-purple text-purple rounded-lg hover:bg-purple/10 transition-colors font-medium text-sm"
                            style={{ color: '#6D0091', borderColor: '#6D0091' }}
                          >
                            <XMarkIcon className="h-4 w-4 text-purple" />
                            <span className="text-purple">Cancel</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        {entry.additionalInfo?.urgency ? (
                          <span className={`px-3 py-1 rounded-full text-sm font-raleway font-medium uppercase inline-block ${
                            entry.additionalInfo.urgency === 'high' ? 'bg-red-100 text-red-800' :
                            entry.additionalInfo.urgency === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {entry.additionalInfo.urgency} Priority
                          </span>
                        ) : (
                          <p className="font-raleway text-gray-500 italic text-sm">No urgency set. Click Edit to set urgency.</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Notes - Always Visible */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-montserrat text-2xl font-semibold text-gray-900">Admin Notes</h2>
                {!isEditingNotes ? (
                  <button
                    onClick={() => {
                      setIsEditingNotes(true);
                    }}
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple hover:bg-phlox rounded-lg transition-colors shadow-sm border-0 cursor-pointer"
                    style={{ backgroundColor: '#6D0091', color: '#FFFFFF' }}
                  >
                    <PencilIcon className="h-5 w-5 text-white" />
                    <span className="text-white">Edit Notes</span>
                  </button>
                ) : null}
              </div>
              
              {isEditingNotes ? (
                <div className="space-y-4">
                  <textarea
                    value={adminNotesText}
                    onChange={(e) => setAdminNotesText(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple focus:border-purple font-raleway text-gray-800"
                    placeholder="Add admin notes..."
                  />
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleSaveNotes}
                      type="button"
                      className="flex items-center gap-2 px-6 py-2 bg-purple text-white rounded-lg hover:bg-phlox transition-colors font-medium shadow-sm cursor-pointer"
                      style={{ backgroundColor: '#6D0091', color: '#FFFFFF' }}
                    >
                      <CheckIcon className="h-5 w-5 text-white" />
                      <span className="text-white">Save Notes</span>
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      type="button"
                      className="flex items-center gap-2 px-6 py-2 border-2 border-purple text-purple rounded-lg hover:bg-purple/10 transition-colors font-medium cursor-pointer"
                      style={{ color: '#6D0091', borderColor: '#6D0091' }}
                    >
                      <XMarkIcon className="h-5 w-5 text-purple" />
                      <span className="text-purple">Cancel</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  {entry.adminNotes ? (
                    <p className="font-raleway text-gray-800 whitespace-pre-wrap">{entry.adminNotes}</p>
                  ) : (
                    <p className="font-raleway text-gray-500 italic">No admin notes yet. Click &quot;Edit Notes&quot; to add notes.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer currentPath="/admin" />
    </div>
  );
}

