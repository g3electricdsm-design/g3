import { 
  HomeIcon, 
  BuildingOfficeIcon, 
  BoltIcon, 
  LightBulbIcon 
} from "@heroicons/react/24/outline";

// Local SVG icon paths (hosted in /public/icons/)
const FIGMA_ICONS = {
  lightbulb: "/icons/lightbulb.svg",
  ledLighting: "/icons/led-lighting.svg",
  socket: "/icons/socket.svg",
  plug: "/icons/plug.svg",
  distributionBox: "/icons/distribution-box.svg",
  circuitBoard: "/icons/circuit-board.svg",
  safetyGoggles: "/icons/safety-goggles.svg",
  breaker: "/icons/breaker.svg",
  power: "/icons/power.svg",
};

// Service icon component
interface ServiceIconProps {
  iconName: string;
  className?: string;
}

export function ServiceIcon({ iconName, className = "w-full h-auto" }: ServiceIconProps) {
  const iconMap: Record<string, string> = {
    lightbulb: FIGMA_ICONS.lightbulb,
    'led-lighting': FIGMA_ICONS.ledLighting,
    socket: FIGMA_ICONS.socket,
    plug: FIGMA_ICONS.plug,
    'distribution-box': FIGMA_ICONS.distributionBox,
    'circuit-board': FIGMA_ICONS.circuitBoard,
    'safety-goggles': FIGMA_ICONS.safetyGoggles,
    breaker: FIGMA_ICONS.breaker,
    power: FIGMA_ICONS.power,
  };

  const iconUrl = iconMap[iconName];
  
  if (!iconUrl) {
    return null;
  }

  return (
    <img 
      src={iconUrl} 
      alt={iconName}
      className={className}
    />
  );
}

// Get service icon by service ID
export function getServiceIcon(serviceId: string): string {
  const iconMap: Record<string, string> = {
    lighting: 'led-lighting',
    residential: 'socket',
    commercial: 'distribution-box',
    safety: 'safety-goggles',
  };
  
  return iconMap[serviceId] || 'power';
}

export const getCategoryIcon = (category: string, size: 'sm' | 'md' | 'lg' = 'md') => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };
  
  const className = sizeClasses[size];
  
  switch (category) {
    case 'Residential':
      return <HomeIcon className={className} />;
    case 'Commercial':
      return <BuildingOfficeIcon className={className} />;
    default:
      return <BoltIcon className={className} />;
  }
};

export const getTypeIcon = (type: string, size: 'sm' | 'md' | 'lg' = 'md') => {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };
  
  const className = sizeClasses[size];
  
  switch (type) {
    case 'Lighting':
      return <LightBulbIcon className={className} />;
    case 'Fans':
      return <BoltIcon className={className} />;
    default:
      return <BoltIcon className={className} />;
  }
};

