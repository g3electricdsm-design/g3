// Form entries data for G3 Electric
export interface FormEntry {
  id: number;
  type: 'quote' | 'contact' | 'payment';
  timestamp: string;
  status: 'new' | 'read' | 'contacted' | 'completed' | 'cancelled';
  customerInfo: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
  };
  projectInfo: {
    projectType?: string;
    description?: string;
    budget?: string;
    timeline?: string;
    workArea?: string;
    services?: string[];
  };
  additionalInfo?: {
    message?: string;
    preferredContact?: string;
    urgency?: 'low' | 'medium' | 'high';
  };
  adminNotes?: string;
}

// Sample form entries - in a real app, this would come from a database
export const formEntries: FormEntry[] = [
  {
    id: 1,
    type: 'quote',
    timestamp: '2024-03-15T10:30:00Z',
    status: 'new',
    customerInfo: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '(555) 123-4567',
      company: 'Johnson Family Home'
    },
    projectInfo: {
      projectType: 'Residential',
      description: 'Need to install new lighting throughout our kitchen and dining room. Looking for modern LED fixtures with smart controls.',
      budget: '$2,000 - $3,000',
      timeline: 'Within 2 weeks',
      workArea: 'Kitchen and Dining Room',
      services: ['Lighting Installation', 'Smart Controls']
    },
    additionalInfo: {
      message: 'We have a 2-story home and need someone reliable. Safety is our top priority.',
      preferredContact: 'email',
      urgency: 'medium'
    }
  },
  {
    id: 2,
    type: 'quote',
    timestamp: '2024-03-14T14:20:00Z',
    status: 'read',
    customerInfo: {
      name: 'Mike Chen',
      email: 'mike.chen@business.com',
      phone: '(555) 987-6543',
      company: 'Chen & Associates'
    },
    projectInfo: {
      projectType: 'Commercial',
      description: 'Complete electrical upgrade for new office building. Need main service installation, panel work, and office circuit wiring.',
      budget: '$15,000 - $25,000',
      timeline: 'Next 6 weeks',
      workArea: '5,000 sq ft office building',
      services: ['Main Service Installation', 'Panel Installation', 'Office Circuit Wiring', 'Emergency Lighting']
    },
    additionalInfo: {
      message: 'This is a new construction project. Need to coordinate with general contractor.',
      preferredContact: 'phone',
      urgency: 'high'
    },
    adminNotes: 'Large commercial project. Schedule site visit ASAP.'
  },
  {
    id: 3,
    type: 'contact',
    timestamp: '2024-03-13T09:15:00Z',
    status: 'contacted',
    customerInfo: {
      name: 'Emily Rodriguez',
      email: 'emily.r@email.com',
      phone: '(555) 456-7890'
    },
    projectInfo: {
      projectType: 'Residential',
      description: 'Ceiling fan installation in 3 bedrooms and living room.',
      budget: 'Under $1,000',
      timeline: 'This weekend',
      workArea: '4 rooms total',
      services: ['Ceiling Fan Installation']
    },
    additionalInfo: {
      message: 'Need someone available this weekend. Existing fans are old and making noise.',
      preferredContact: 'phone',
      urgency: 'high'
    },
    adminNotes: 'Customer contacted. Scheduled for Saturday morning.'
  },
  {
    id: 4,
    type: 'quote',
    timestamp: '2024-03-12T16:45:00Z',
    status: 'completed',
    customerInfo: {
      name: 'David Thompson',
      email: 'david.thompson@email.com',
      phone: '(555) 321-9876',
      company: 'Thompson Residence'
    },
    projectInfo: {
      projectType: 'Residential',
      description: 'Smart home integration for entire house. Smart switches, outlets, and home automation system.',
      budget: '$5,000 - $8,000',
      timeline: 'Next month',
      workArea: '2,500 sq ft home',
      services: ['Smart Home Integration', 'Smart Switch Installation', 'Home Automation Wiring']
    },
    additionalInfo: {
      message: 'We want to make our home fully smart. Need someone experienced with home automation.',
      preferredContact: 'email',
      urgency: 'low'
    },
    adminNotes: 'Project completed successfully. Customer very satisfied. Referral potential.'
  },
  {
    id: 5,
    type: 'contact',
    timestamp: '2024-03-11T11:30:00Z',
    status: 'cancelled',
    customerInfo: {
      name: 'Lisa Park',
      email: 'lisa.park@email.com',
      phone: '(555) 654-3210'
    },
    projectInfo: {
      projectType: 'Residential',
      description: 'Outdoor lighting installation for backyard and front walkway.',
      budget: '$1,500 - $2,500',
      timeline: 'Spring',
      workArea: 'Front and backyard',
      services: ['Outdoor Lighting', 'Landscape Lighting']
    },
    additionalInfo: {
      message: 'Looking for landscape lighting to improve security and aesthetics.',
      preferredContact: 'email',
      urgency: 'low'
    },
    adminNotes: 'Customer cancelled - decided to do project themselves.'
  }
];

export function getFormEntryById(id: number): FormEntry | undefined {
  return formEntries.find(entry => entry.id === id);
}

export function getAllFormEntries(): FormEntry[] {
  return formEntries;
}

export function getFormEntriesByType(type: string): FormEntry[] {
  if (type === 'All') return formEntries;
  return formEntries.filter(entry => entry.type === type);
}

export function getFormEntriesByStatus(status: string): FormEntry[] {
  if (status === 'All') return formEntries;
  return formEntries.filter(entry => entry.status === status);
}

export function getNewFormEntries(): FormEntry[] {
  return formEntries.filter(entry => entry.status === 'new');
}

export function deleteFormEntry(id: number): void {
  const index = formEntries.findIndex(entry => entry.id === id);
  if (index > -1) {
    formEntries.splice(index, 1);
  }
}

export function updateFormEntryAdminNotes(id: number, notes: string): void {
  const entry = formEntries.find(e => e.id === id);
  if (entry) {
    entry.adminNotes = notes;
  }
}

export function updateFormEntryUrgency(id: number, urgency: 'low' | 'medium' | 'high' | ''): void {
  const entry = formEntries.find(e => e.id === id);
  if (entry) {
    if (!entry.additionalInfo) {
      entry.additionalInfo = {};
    }
    if (urgency === '') {
      delete entry.additionalInfo.urgency;
    } else {
      entry.additionalInfo.urgency = urgency;
    }
  }
}
