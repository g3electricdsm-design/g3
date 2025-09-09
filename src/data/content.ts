// Content management data for G3 Electric website
export interface HomepageContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    heroImagePlaceholder: string;
  };
  services: {
    title: string;
    description: string;
    items: Array<{
      id: string;
      title: string;
      description: string;
      icon: string;
    }>;
  };
  cta: {
    title: string;
    description: string;
    buttonText: string;
  };
}

export interface ServicesContent {
  hero: {
    title: string;
    description: string;
  };
  services: Array<{
    id: string;
    title: string;
    description: string;
    features: string[];
    icon: string;
  }>;
  cta: {
    title: string;
    description: string;
    buttonText: string;
  };
}

export interface PricingContent {
  hero: {
    title: string;
    description: string;
  };
  tiers: Array<{
    id: string;
    name: string;
    price: string;
    description: string;
    features: string[];
    popular: boolean;
  }>;
  servicePricing: Array<{
    id: string;
    service: string;
    priceRange: string;
    description: string;
  }>;
  cta: {
    title: string;
    description: string;
    buttonText: string;
  };
}

export interface AboutContent {
  hero: {
    title: string;
    description: string;
  };
  mission: {
    title: string;
    description: string;
  };
  values: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
  }>;
  team: Array<{
    id: string;
    name: string;
    role: string;
    description: string;
    image: string;
  }>;
  cta: {
    title: string;
    description: string;
    buttonText: string;
  };
}

export interface ContactContent {
  hero: {
    title: string;
    description: string;
  };
  form: {
    title: string;
    description: string;
    fields: {
      projectType: {
        label: string;
        placeholder: string;
        options: string[];
      };
      description: {
        label: string;
        placeholder: string;
      };
      budget: {
        label: string;
        placeholder: string;
        options: string[];
      };
      services: {
        label: string;
        options: string[];
      };
      timeline: {
        label: string;
        placeholder: string;
        options: string[];
      };
      workArea: {
        label: string;
        placeholder: string;
      };
      name: {
        label: string;
        placeholder: string;
      };
      email: {
        label: string;
        placeholder: string;
      };
      phone: {
        label: string;
        placeholder: string;
      };
      message: {
        label: string;
        placeholder: string;
      };
    };
    submitButton: string;
  };
  info: {
    title: string;
    items: Array<{
      id: string;
      label: string;
      value: string;
      icon: string;
    }>;
  };
}

// Default content data
export const defaultHomepageContent: HomepageContent = {
  hero: {
    title: "Safe & Dependable",
    subtitle: "Electrical Services You Can Trust",
    description: "Your family's safety is our #1 priority. Professional electrical services for residential and commercial projects with the dependability you deserve.",
    ctaPrimary: "Get Free Quote",
    ctaSecondary: "View Our Work",
    heroImagePlaceholder: "Lighting Project Hero Image"
  },
  services: {
    title: "Our Services",
    description: "From residential lighting to commercial builds, we handle all your electrical needs with safety and precision.",
    items: [
      {
        id: "lighting",
        title: "Lighting",
        description: "Custom lighting solutions for every space",
        icon: "BoltIcon"
      },
      {
        id: "residential",
        title: "Residential",
        description: "Safe electrical work for your home",
        icon: "HomeIcon"
      },
      {
        id: "commercial",
        title: "Commercial",
        description: "Professional commercial electrical services",
        icon: "BuildingOfficeIcon"
      },
      {
        id: "safety",
        title: "Safety First",
        description: "Education and safety for your family",
        icon: "ShieldCheckIcon"
      }
    ]
  },
  cta: {
    title: "Ready to Get Started?",
    description: "Contact us today for a free quote. Your safety and satisfaction are our top priorities.",
    buttonText: "Request Quote"
  }
};

export const defaultServicesContent: ServicesContent = {
  hero: {
    title: "Professional Electrical Services",
    description: "From residential lighting to commercial builds, we provide safe and dependable electrical solutions for every project."
  },
  services: [
    {
      id: "lighting",
      title: "Lighting Installation & Design",
      description: "Transform your space with custom lighting solutions that combine functionality and aesthetics.",
      features: [
        "LED lighting upgrades",
        "Smart lighting systems",
        "Outdoor landscape lighting",
        "Chandelier and fixture installation",
        "Dimmer switch installation"
      ],
      icon: "BoltIcon"
    },
    {
      id: "residential",
      title: "Residential Electrical Work",
      description: "Complete electrical services for your home, ensuring safety and code compliance.",
      features: [
        "Electrical panel upgrades",
        "Outlet and switch installation",
        "Ceiling fan installation",
        "GFCI outlet installation",
        "Whole house surge protection"
      ],
      icon: "HomeIcon"
    },
    {
      id: "commercial",
      title: "Commercial Electrical Services",
      description: "Professional electrical solutions for businesses and commercial properties.",
      features: [
        "Main service installation",
        "Office circuit wiring",
        "Emergency lighting systems",
        "Data and communication wiring",
        "Energy management systems"
      ],
      icon: "BuildingOfficeIcon"
    },
    {
      id: "safety",
      title: "Safety & Education",
      description: "Electrical safety education and inspection services to protect your family and property.",
      features: [
        "Electrical safety inspections",
        "Code compliance verification",
        "Homeowner education sessions",
        "Emergency electrical repairs",
        "Safety upgrade recommendations"
      ],
      icon: "ShieldCheckIcon"
    }
  ],
  cta: {
    title: "Ready to Start Your Project?",
    description: "Contact us today for a free consultation and quote. We're here to help with all your electrical needs.",
    buttonText: "Get Free Quote"
  }
};

export const defaultPricingContent: PricingContent = {
  hero: {
    title: "Transparent Pricing",
    description: "Quality electrical work at fair prices. No hidden fees, no surprises - just honest, dependable service."
  },
  tiers: [
    {
      id: "residential",
      name: "Residential",
      price: "Starting at $150",
      description: "Perfect for home electrical projects",
      features: [
        "Free estimates",
        "Licensed & insured",
        "Same-day service available",
        "1-year warranty",
        "Clean, professional work"
      ],
      popular: false
    },
    {
      id: "commercial",
      name: "Commercial",
      price: "Custom Quote",
      description: "Professional commercial electrical services",
      features: [
        "Project consultation",
        "Code compliance guaranteed",
        "Flexible scheduling",
        "2-year warranty",
        "24/7 emergency service"
      ],
      popular: true
    },
    {
      id: "emergency",
      name: "Emergency",
      price: "Call for Quote",
      description: "24/7 emergency electrical repairs",
      features: [
        "24/7 availability",
        "Rapid response",
        "Temporary fixes available",
        "Emergency lighting",
        "Safety first approach"
      ],
      popular: false
    }
  ],
  servicePricing: [
    {
      id: "outlet",
      service: "Outlet Installation",
      priceRange: "$150 - $300",
      description: "Standard outlet installation with proper wiring"
    },
    {
      id: "switch",
      service: "Switch Installation",
      priceRange: "$100 - $250",
      description: "Light switch installation and wiring"
    },
    {
      id: "fan",
      service: "Ceiling Fan Installation",
      priceRange: "$200 - $400",
      description: "Ceiling fan mounting and electrical connection"
    },
    {
      id: "panel",
      service: "Panel Upgrade",
      priceRange: "$1,500 - $3,000",
      description: "Electrical panel replacement and upgrade"
    },
    {
      id: "lighting",
      service: "Lighting Installation",
      priceRange: "$100 - $500",
      description: "Fixture installation and wiring"
    }
  ],
  cta: {
    title: "Need a Custom Quote?",
    description: "Every project is unique. Contact us for a personalized estimate based on your specific needs.",
    buttonText: "Request Quote"
  }
};

export const defaultAboutContent: AboutContent = {
  hero: {
    title: "About G3 Electric",
    description: "Your trusted partner for safe, dependable electrical services. We've been serving our community with excellence and integrity."
  },
  mission: {
    title: "Our Mission",
    description: "To provide safe, reliable electrical services that protect your family and property while exceeding your expectations for quality and professionalism."
  },
  values: [
    {
      id: "safety",
      title: "Safety First",
      description: "Your family's safety is our top priority. We follow all safety protocols and code requirements.",
      icon: "ShieldCheckIcon"
    },
    {
      id: "dependability",
      title: "Dependability",
      description: "When we say we'll be there, we'll be there. Reliable service you can count on.",
      icon: "ClockIcon"
    },
    {
      id: "quality",
      title: "Quality Work",
      description: "We take pride in every job, ensuring clean, professional work that lasts.",
      icon: "StarIcon"
    },
    {
      id: "integrity",
      title: "Integrity",
      description: "Honest pricing, transparent communication, and ethical business practices.",
      icon: "HandRaisedIcon"
    }
  ],
  team: [
    {
      id: "owner",
      name: "John Smith",
      role: "Owner & Master Electrician",
      description: "20+ years of experience in residential and commercial electrical work.",
      image: "placeholder-owner.jpg"
    }
  ],
  cta: {
    title: "Ready to Work With Us?",
    description: "Experience the difference that safety, dependability, and quality work can make for your electrical needs.",
    buttonText: "Contact Us Today"
  }
};

export const defaultContactContent: ContactContent = {
  hero: {
    title: "Get Your Free Quote",
    description: "Ready to start your electrical project? Fill out the form below and we'll get back to you within 24 hours."
  },
  form: {
    title: "Request a Quote",
    description: "Tell us about your project and we'll provide a detailed estimate.",
    fields: {
      projectType: {
        label: "Project Type",
        placeholder: "Select project type",
        options: ["Residential", "Commercial", "Emergency", "Other"]
      },
      description: {
        label: "Project Description",
        placeholder: "Describe your electrical project in detail..."
      },
      budget: {
        label: "Estimated Budget",
        placeholder: "Select budget range",
        options: ["Under $500", "$500 - $1,000", "$1,000 - $2,500", "$2,500 - $5,000", "$5,000+", "Not sure"]
      },
      services: {
        label: "Services Needed",
        options: ["Lighting Installation", "Outlet/Switch Work", "Ceiling Fan Installation", "Panel Upgrade", "Emergency Repair", "Safety Inspection", "Other"]
      },
      timeline: {
        label: "Timeline",
        placeholder: "When do you need this completed?",
        options: ["ASAP", "This week", "This month", "Next month", "Flexible"]
      },
      workArea: {
        label: "Work Area Size",
        placeholder: "e.g., Kitchen, Living Room, Whole House, Office Building"
      },
      name: {
        label: "Full Name",
        placeholder: "Your full name"
      },
      email: {
        label: "Email Address",
        placeholder: "your.email@example.com"
      },
      phone: {
        label: "Phone Number",
        placeholder: "(555) 123-4567"
      },
      message: {
        label: "Additional Message",
        placeholder: "Any additional information or questions..."
      }
    },
    submitButton: "Send Quote Request"
  },
  info: {
    title: "Contact Information",
    items: [
      {
        id: "phone",
        label: "Phone",
        value: "(555) 123-4567",
        icon: "PhoneIcon"
      },
      {
        id: "email",
        label: "Email",
        value: "info@g3electric.com",
        icon: "EnvelopeIcon"
      },
      {
        id: "hours",
        label: "Business Hours",
        value: "Mon-Fri: 8AM-6PM, Sat: 9AM-4PM",
        icon: "ClockIcon"
      },
      {
        id: "emergency",
        label: "Emergency Service",
        value: "24/7 Available",
        icon: "ExclamationTriangleIcon"
      }
    ]
  }
};

// Content management functions
export function getContent() {
  return {
    homepage: defaultHomepageContent,
    services: defaultServicesContent,
    pricing: defaultPricingContent,
    about: defaultAboutContent,
    contact: defaultContactContent
  };
}

export function updateContent(page: string, content: Record<string, any>) {
  // In a real app, this would save to a database
  console.log(`Updating ${page} content:`, content);
  return true;
}
