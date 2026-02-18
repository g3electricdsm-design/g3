// Project data for G3 Electric portfolio
// This file can be easily edited to manage content

export interface Project {
  id: number;
  title: string;
  category: 'Residential' | 'Commercial';
  type: string;
  image: string;
  description: string;
  overview?: string;
  client: string;
  location: string;
  services: string[];
  challenges: string;
  // Controls portfolio grid tile sizing (Figma `portfolio_grid`)
  // Canonical values:
  // - short: 1 row (~180px)
  // - square: 2 rows (~384px)
  // - tall: 3 rows (square + short stacked)
  // - wide: 2 cols x square height
  // - panoramic: 3 cols x square height
  // - extraTall: 6 rows (two tall stacked)
  //
  // Back-compat values (still accepted):
  // - small -> short
  // - medium -> square
  // - large -> wide
  size:
    | 'small'
    | 'medium'
    | 'large'
    | 'short'
    | 'square'
    | 'tall'
    | 'wide'
    | 'panoramic'
    | 'extraTall';
  orientation?: 'portrait' | 'landscape';
  gallery?: string[];
  slug?: string;
  seoTitle?: string;
  metaDescription?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Modern Kitchen Lighting",
    category: "Residential",
    type: "Lighting",
    image: "/images/portfolio/modern-kitchen-lighting.jpg",
    description: "Custom LED under-cabinet lighting installation",
    client: "Johnson Family",
    location: "Des Moines, IA",
    services: ["LED Installation", "Under-cabinet Lighting", "Pendant Light Installation", "Recessed Lighting", "Smart Switch Integration"],
    challenges: "Working around existing cabinetry and ensuring proper electrical load distribution",
    size: "tall",
    orientation: "portrait"
  },
  {
    id: 2,
    title: "Office Building Wiring",
    category: "Commercial",
    type: "New Build",
    image: "/images/portfolio/office-building-wiring.jpg",
    description: "Complete electrical infrastructure for new office complex",
    client: "Metro Business Center",
    location: "Cedar Rapids, IA",
    services: ["Main Service Installation", "Panel Installation", "Office Circuit Wiring", "AV System Integration", "Emergency Lighting", "Fire Safety Systems"],
    challenges: "Coordinating with multiple contractors and meeting strict commercial building codes",
    size: "wide",
    orientation: "landscape"
  },
  {
    id: 3,
    title: "Smart Home Integration",
    category: "Residential",
    type: "Outlets & Controls",
    image: "/images/portfolio/smart-home-integration.jpg",
    description: "Smart switches and outlet installation throughout home",
    client: "Smith Residence",
    location: "Iowa City, IA",
    services: ["Smart Switch Installation", "Smart Outlet Installation", "Home Automation Wiring", "Security System Integration", "Audio System Wiring"],
    challenges: "Integrating with existing electrical systems while maintaining home aesthetics",
    size: "short"
  },
  {
    id: 4,
    title: "Retail Store Lighting",
    category: "Commercial",
    type: "Lighting",
    image: "/images/portfolio/retail-store-lighting.jpg",
    description: "Energy-efficient LED lighting for retail space",
    client: "Boutique Fashion Store",
    location: "Davenport, IA",
    services: ["Track Lighting Installation", "Display Case Lighting", "Ambient Lighting", "Smart Controls", "Energy Management"],
    challenges: "Maintaining consistent lighting levels while highlighting merchandise effectively",
    size: "short"
  },
  {
    id: 5,
    title: "Ceiling Fan Installation",
    category: "Residential",
    type: "Fans",
    image: "/images/portfolio/smart-home-integration.jpg",
    description: "Multiple ceiling fan installations with smart controls",
    client: "Williams Family",
    location: "Ames, IA",
    services: ["Ceiling Fan Installation", "Smart Control Integration", "Electrical Box Upgrades", "Remote Control Setup"],
    challenges: "Installing fans in rooms with limited ceiling access and ensuring proper support",
    size: "panoramic"
  },
  {
    id: 6,
    title: "Restaurant Electrical",
    category: "Commercial",
    type: "New Build",
    image: "/images/portfolio/office-building-wiring.jpg",
    description: "Complete electrical system for new restaurant build",
    client: "Bella Vista Restaurant",
    location: "Des Moines, IA",
    services: ["Kitchen Equipment Circuits", "Dining Room Lighting", "Bar Electrical", "Outdoor Lighting", "Emergency Systems", "Fire Suppression Integration"],
    challenges: "Meeting commercial kitchen electrical codes and coordinating with kitchen equipment installation",
    size: "wide"
  },
  {
    id: 7,
    title: "Outdoor Lighting System",
    category: "Residential",
    type: "Lighting",
    image: "/images/portfolio/retail-store-lighting.jpg",
    description: "Landscape and security lighting installation",
    client: "Thompson Residence",
    location: "West Des Moines, IA",
    services: ["Landscape Lighting", "Security Lighting", "Motion Sensors", "Smart Controls", "Weatherproof Installation"],
    challenges: "Working with existing landscaping and ensuring weatherproof connections",
    size: "square"
  },
  {
    id: 8,
    title: "Warehouse Lighting",
    category: "Commercial",
    type: "Lighting",
    image: "/images/portfolio/manufacturing-plant-upgrade.jpg",
    description: "High-bay LED lighting for industrial warehouse",
    client: "Midwest Distribution Center",
    location: "Cedar Falls, IA",
    services: ["High-bay LED Installation", "Electrical Panel Upgrades", "Motion Sensor Integration", "Emergency Lighting", "Energy Management"],
    challenges: "Working around ongoing warehouse operations and managing high-voltage electrical work",
    size: "small"
  },
  {
    id: 9,
    title: "Historic Home Rewiring",
    category: "Residential",
    type: "Rewiring",
    image: "/images/portfolio/historic-home-rewiring.jpg",
    description: "Complete electrical rewiring of 1920s historic home",
    client: "Historic Preservation Society",
    location: "Dubuque, IA",
    services: ["Complete Rewiring", "Panel Upgrades", "Historic Fixture Restoration", "Code Compliance", "Safety Inspection"],
    challenges: "Working around historic features and meeting both preservation and safety requirements",
    size: "large"
  },
  {
    id: 10,
    title: "Medical Office Electrical",
    category: "Commercial",
    type: "New Build",
    image: "/images/portfolio/medical-office-electrical.jpg",
    description: "Specialized electrical systems for medical practice",
    client: "Des Moines Medical Group",
    location: "Des Moines, IA",
    services: ["Medical Equipment Circuits", "Emergency Power Systems", "Specialized Lighting", "Code Compliance", "Safety Systems"],
    challenges: "Meeting strict healthcare electrical codes and coordinating with medical equipment installation",
    size: "medium"
  },
  {
    id: 11,
    title: "Pool & Spa Electrical",
    category: "Residential",
    type: "Outdoor",
    image: "/images/portfolio/pool-spa-electrical.jpg",
    description: "Pool and spa electrical installation with safety systems",
    client: "Miller Family",
    location: "West Des Moines, IA",
    services: ["Pool Equipment Wiring", "Safety Systems", "Outdoor Lighting", "GFCI Protection", "Smart Controls"],
    challenges: "Ensuring proper grounding and bonding for pool safety and working in wet conditions",
    size: "medium"
  },
  {
    id: 12,
    title: "Manufacturing Plant Upgrade",
    category: "Commercial",
    type: "Industrial",
    image: "/images/portfolio/manufacturing-plant-upgrade.jpg",
    description: "Electrical system upgrade for manufacturing facility",
    client: "Iowa Manufacturing Co.",
    location: "Waterloo, IA",
    services: ["Power Distribution Upgrades", "Panel Installation", "Heavy Machinery Circuits", "Safety Systems", "Emergency Power"],
    challenges: "Working around production schedules and managing high-voltage electrical work in industrial environment",
    size: "large"
  },
  {
    id: 13,
    title: "Home Theater Installation",
    category: "Residential",
    type: "Entertainment",
    image: "/images/portfolio/home-theater-installation.jpg",
    description: "Complete home theater electrical and AV installation",
    client: "Entertainment Enthusiast",
    location: "Cedar Rapids, IA",
    services: ["Dedicated Circuits", "AV System Wiring", "Smart Lighting", "Sound System Integration", "Home Automation"],
    challenges: "Managing electrical noise and ensuring clean power for sensitive audio equipment",
    size: "small"
  },
  {
    id: 14,
    title: "Church Lighting Renovation",
    category: "Commercial",
    type: "Lighting",
    image: "/images/portfolio/church-lighting-renovation.jpg",
    description: "Historic church lighting restoration and modernization",
    client: "First Methodist Church",
    location: "Iowa City, IA",
    services: ["Historic Fixture Restoration", "LED Conversion", "Accent Lighting", "Dimming Controls", "Energy Management"],
    challenges: "Balancing modern efficiency with historic preservation requirements",
    size: "medium"
  },
  {
    id: 15,
    title: "EV Charging Station",
    category: "Residential",
    type: "EV Infrastructure",
    image: "/images/portfolio/ev-charging-station.jpg",
    description: "Home electric vehicle charging station installation",
    client: "Green Energy Family",
    location: "Ames, IA",
    services: ["240V Circuit Installation", "EV Charger Mounting", "Smart Controls", "Panel Integration", "Safety Systems"],
    challenges: "Ensuring proper electrical capacity and safety for high-power EV charging",
    size: "small"
  }
];

// Import API client
import { projectsAPI } from '@/lib/projects-api';

// Helper function to get project by ID or slug
// This now uses the API instead of localStorage
export async function getProjectById(idOrSlug: string): Promise<Project | undefined> {
  if (typeof window === 'undefined') {
    // Server-side: fallback to default projects
    return projects.find(project => 
      project.slug === idOrSlug || project.id.toString() === idOrSlug
    );
  }
  
  const project = await projectsAPI.getById(idOrSlug);
  return project || undefined;
}

// Synchronous version for backward compatibility (uses cache)
let projectsCache: Project[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 300000; // 5 minutes

async function getCachedProjects(): Promise<Project[]> {
  const now = Date.now();
  if (projectsCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return projectsCache;
  }
  
  projectsCache = await projectsAPI.getAll();
  cacheTimestamp = now;
  return projectsCache;
}

// Helper function to get project by slug
export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  if (typeof window === 'undefined') {
    return projects.find(project => project.slug === slug);
  }
  return await getProjectById(slug);
}

// Helper function to get all projects
export async function getAllProjects(): Promise<Project[]> {
  if (typeof window === 'undefined') {
    // Server-side: return default projects
    return [...projects];
  }
  return await getCachedProjects();
}

// Synchronous version for components that need immediate data
// This will return cached data or default projects
export function getAllProjectsSync(): Project[] {
  if (typeof window === 'undefined') {
    return [...projects];
  }
  return projectsCache || [...projects];
}

// Helper function to update a project
export async function updateProject(updatedProject: Project): Promise<void> {
  if (typeof window === 'undefined') {
    return; // Server-side: skip
  }
  
  await projectsAPI.update(updatedProject);
  // Invalidate cache
  projectsCache = null;
}

// Helper function to add a new project
export async function addProject(newProject: Project): Promise<void> {
  if (typeof window === 'undefined') {
    return; // Server-side: skip
  }
  
  await projectsAPI.create(newProject);
  // Invalidate cache
  projectsCache = null;
}

// Helper function to delete a project
export async function deleteProject(id: number): Promise<void> {
  if (typeof window === 'undefined') {
    return; // Server-side: skip
  }
  
  await projectsAPI.delete(id);
  // Invalidate cache
  projectsCache = null;
}
