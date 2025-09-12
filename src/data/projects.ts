// Project data for G3 Electric portfolio
// This file can be easily edited to manage content

export interface Project {
  id: number;
  title: string;
  category: 'Residential' | 'Commercial';
  type: string;
  image: string;
  description: string;
  fullDescription: string;
  client: string;
  location: string;
  duration: string;
  completed: string;
  services: string[];
  challenges: string;
  results: string;
  size: 'small' | 'medium' | 'large';
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Modern Kitchen Lighting",
    category: "Residential",
    type: "Lighting",
    image: "/images/portfolio/modern-kitchen-lighting.jpg",
    description: "Custom LED under-cabinet lighting installation",
    fullDescription: "This modern kitchen lighting project involved the complete redesign and installation of a custom LED lighting system. We installed energy-efficient under-cabinet LED strips, pendant lights over the island, and recessed ceiling lights throughout the kitchen space. The project required careful planning to ensure proper illumination for cooking and food preparation while maintaining the home's aesthetic appeal.",
    client: "Johnson Family",
    location: "Des Moines, IA",
    duration: "2 days",
    completed: "March 2024",
    services: ["LED Installation", "Under-cabinet Lighting", "Pendant Light Installation", "Recessed Lighting", "Smart Switch Integration"],
    challenges: "Working around existing cabinetry and ensuring proper electrical load distribution",
    results: "50% reduction in energy consumption while improving lighting quality and adding smart controls",
    size: "large"
  },
  {
    id: 2,
    title: "Office Building Wiring",
    category: "Commercial",
    type: "New Build",
    image: "/images/portfolio/office-building-wiring.jpg",
    description: "Complete electrical infrastructure for new office complex",
    fullDescription: "This comprehensive commercial project involved designing and installing the complete electrical infrastructure for a new 50,000 sq ft office building. Our team handled everything from the main electrical service installation to individual office circuits, conference room AV systems, and emergency lighting throughout the building.",
    client: "Metro Business Center",
    location: "Cedar Rapids, IA",
    duration: "6 weeks",
    completed: "February 2024",
    services: ["Main Service Installation", "Panel Installation", "Office Circuit Wiring", "AV System Integration", "Emergency Lighting", "Fire Safety Systems"],
    challenges: "Coordinating with multiple contractors and meeting strict commercial building codes",
    results: "On-time completion with zero safety incidents and full code compliance",
    size: "large"
  },
  {
    id: 3,
    title: "Smart Home Integration",
    category: "Residential",
    type: "Outlets & Controls",
    image: "/images/portfolio/smart-home-integration.jpg",
    description: "Smart switches and outlet installation throughout home",
    fullDescription: "This smart home integration project transformed a traditional home into a fully connected smart home. We installed smart switches, outlets, and dimmers throughout the house, integrated with a central home automation system. The project included wiring for smart door locks, security cameras, and whole-home audio systems.",
    client: "Smith Residence",
    location: "Iowa City, IA",
    duration: "3 days",
    completed: "January 2024",
    services: ["Smart Switch Installation", "Smart Outlet Installation", "Home Automation Wiring", "Security System Integration", "Audio System Wiring"],
    challenges: "Integrating with existing electrical systems while maintaining home aesthetics",
    results: "Complete home automation with 40+ smart devices controlled from a single app",
    size: "medium"
  },
  {
    id: 4,
    title: "Retail Store Lighting",
    category: "Commercial",
    type: "Lighting",
    image: "/images/portfolio/retail-store-lighting.jpg",
    description: "Energy-efficient LED lighting for retail space",
    fullDescription: "This retail lighting project focused on creating an inviting shopping environment while maximizing energy efficiency. We installed track lighting, display case lighting, and ambient lighting throughout the store, all controlled by a smart lighting system that adjusts based on time of day and occupancy.",
    client: "Boutique Fashion Store",
    location: "Davenport, IA",
    duration: "1 week",
    completed: "December 2023",
    services: ["Track Lighting Installation", "Display Case Lighting", "Ambient Lighting", "Smart Controls", "Energy Management"],
    challenges: "Maintaining consistent lighting levels while highlighting merchandise effectively",
    results: "60% reduction in lighting energy costs with improved customer experience",
    size: "small"
  },
  {
    id: 5,
    title: "Ceiling Fan Installation",
    category: "Residential",
    type: "Fans",
    image: "/images/portfolio/ceiling-fan-installation.jpg",
    description: "Multiple ceiling fan installations with smart controls",
    fullDescription: "This project involved installing ceiling fans in multiple rooms throughout the home, including bedrooms, living room, and outdoor covered patio. Each fan was equipped with smart controls and integrated with the home's existing smart home system for seamless operation.",
    client: "Williams Family",
    location: "Ames, IA",
    duration: "1 day",
    completed: "November 2023",
    services: ["Ceiling Fan Installation", "Smart Control Integration", "Electrical Box Upgrades", "Remote Control Setup"],
    challenges: "Installing fans in rooms with limited ceiling access and ensuring proper support",
    results: "Improved air circulation and comfort with smart control convenience",
    size: "small"
  },
  {
    id: 6,
    title: "Restaurant Electrical",
    category: "Commercial",
    type: "New Build",
    image: "/images/portfolio/restaurant-electrical.jpg",
    description: "Complete electrical system for new restaurant build",
    fullDescription: "This restaurant electrical project involved designing and installing the complete electrical infrastructure for a new fine dining establishment. The project included specialized kitchen equipment circuits, dining room lighting, bar area electrical, and outdoor patio lighting, all designed to meet commercial kitchen safety standards.",
    client: "Bella Vista Restaurant",
    location: "Des Moines, IA",
    duration: "4 weeks",
    completed: "October 2023",
    services: ["Kitchen Equipment Circuits", "Dining Room Lighting", "Bar Electrical", "Outdoor Lighting", "Emergency Systems", "Fire Suppression Integration"],
    challenges: "Meeting commercial kitchen electrical codes and coordinating with kitchen equipment installation",
    results: "Full code compliance with enhanced dining atmosphere and operational efficiency",
    size: "large"
  },
  {
    id: 7,
    title: "Outdoor Lighting System",
    category: "Residential",
    type: "Lighting",
    image: "/images/portfolio/outdoor-lighting-system.jpg",
    description: "Landscape and security lighting installation",
    fullDescription: "This outdoor lighting project enhanced both the security and aesthetic appeal of the property. We installed landscape lighting along walkways and garden areas, security lighting with motion sensors, and decorative lighting for the outdoor entertaining area, all controlled by a smart outdoor lighting system.",
    client: "Thompson Residence",
    location: "West Des Moines, IA",
    duration: "2 days",
    completed: "September 2023",
    services: ["Landscape Lighting", "Security Lighting", "Motion Sensors", "Smart Controls", "Weatherproof Installation"],
    challenges: "Working with existing landscaping and ensuring weatherproof connections",
    results: "Enhanced security and beautiful nighttime ambiance with automated controls",
    size: "medium"
  },
  {
    id: 8,
    title: "Warehouse Lighting",
    category: "Commercial",
    type: "Lighting",
    image: "/images/portfolio/warehouse-lighting.jpg",
    description: "High-bay LED lighting for industrial warehouse",
    fullDescription: "This industrial lighting project involved replacing outdated fluorescent lighting with modern high-bay LED fixtures throughout a 30,000 sq ft warehouse. The new lighting system provides better illumination for workers while significantly reducing energy consumption and maintenance requirements.",
    client: "Midwest Distribution Center",
    location: "Cedar Falls, IA",
    duration: "3 days",
    completed: "August 2023",
    services: ["High-bay LED Installation", "Electrical Panel Upgrades", "Motion Sensor Integration", "Emergency Lighting", "Energy Management"],
    challenges: "Working around ongoing warehouse operations and managing high-voltage electrical work",
    results: "70% reduction in lighting energy costs with improved worker safety and productivity",
    size: "small"
  }
];

// Helper function to get project by ID
export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id.toString() === id);
}

// Helper function to get all projects
export function getAllProjects(): Project[] {
  return projects;
}
