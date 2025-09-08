// Services data for G3 Electric
export interface Service {
  id: number;
  name: string;
  description: string;
  category: 'Residential' | 'Commercial' | 'Both';
  icon: string;
  features: string[];
  pricing: {
    type: 'hourly' | 'fixed' | 'quote';
    value?: string;
    description: string;
  };
  popular: boolean;
}

export const services: Service[] = [
  {
    id: 1,
    name: "Lighting Installation",
    description: "Custom lighting solutions for every space",
    category: "Both",
    icon: "LightBulbIcon",
    features: [
      "LED installation",
      "Under-cabinet lighting",
      "Pendant lights",
      "Recessed lighting",
      "Smart controls"
    ],
    pricing: {
      type: "quote",
      description: "Custom quote based on project scope"
    },
    popular: true
  },
  {
    id: 2,
    name: "Residential Electrical",
    description: "Safe electrical work for your home",
    category: "Residential",
    icon: "HomeIcon",
    features: [
      "Outlet installation",
      "Circuit breaker upgrades",
      "GFCI installation",
      "Electrical panel upgrades",
      "Safety inspections"
    ],
    pricing: {
      type: "hourly",
      value: "$85/hour",
      description: "Plus materials"
    },
    popular: true
  },
  {
    id: 3,
    name: "Commercial Electrical",
    description: "Professional commercial electrical services",
    category: "Commercial",
    icon: "BuildingOfficeIcon",
    features: [
      "Main service installation",
      "Panel installation",
      "Office circuit wiring",
      "Emergency lighting",
      "Fire safety systems"
    ],
    pricing: {
      type: "quote",
      description: "Project-based pricing"
    },
    popular: false
  },
  {
    id: 4,
    name: "Smart Home Integration",
    description: "Transform your home with smart technology",
    category: "Residential",
    icon: "CpuChipIcon",
    features: [
      "Smart switches",
      "Smart outlets",
      "Home automation",
      "Security integration",
      "Voice control setup"
    ],
    pricing: {
      type: "hourly",
      value: "$95/hour",
      description: "Plus smart devices"
    },
    popular: true
  },
  {
    id: 5,
    name: "Ceiling Fan Installation",
    description: "Professional ceiling fan installation and repair",
    category: "Both",
    icon: "BoltIcon",
    features: [
      "Fan installation",
      "Smart controls",
      "Remote setup",
      "Electrical box upgrades",
      "Maintenance"
    ],
    pricing: {
      type: "fixed",
      value: "$150/fan",
      description: "Includes basic installation"
    },
    popular: false
  },
  {
    id: 6,
    name: "Electrical Safety Inspection",
    description: "Comprehensive electrical safety assessment",
    category: "Both",
    icon: "ShieldCheckIcon",
    features: [
      "Code compliance check",
      "Safety hazard identification",
      "Detailed report",
      "Recommendations",
      "Priority repairs"
    ],
    pricing: {
      type: "fixed",
      value: "$200",
      description: "Complete inspection report"
    },
    popular: false
  }
];

export function getServiceById(id: number): Service | undefined {
  return services.find(service => service.id === id);
}

export function getAllServices(): Service[] {
  return services;
}

export function getServicesByCategory(category: string): Service[] {
  if (category === 'All') return services;
  return services.filter(service => service.category === category || service.category === 'Both');
}
