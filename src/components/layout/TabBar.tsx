
import React from 'react';
import { Home, BarChart2, Calendar, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface TabItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  href: string;
}

const TabItem: React.FC<TabItemProps> = ({ icon, label, active = false, href }) => {
  return (
    <Link 
      to={href} 
      className={cn(
        "flex flex-col items-center justify-center flex-1 py-2 text-xs transition-colors",
        active ? "text-health-primary" : "text-gray-500"
      )}
    >
      <div className="mb-1">{icon}</div>
      <span>{label}</span>
    </Link>
  );
};

const TabBar = () => {
  // In a real app, we would determine which tab is active based on the current route
  // For now, we'll just set the Home tab as active
  const currentPath = window.location.pathname;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t shadow-sm">
      <div className="flex items-center justify-around max-w-md mx-auto">
        <TabItem 
          icon={<Home size={20} />} 
          label="Home" 
          active={currentPath === "/"} 
          href="/" 
        />
        <TabItem 
          icon={<BarChart2 size={20} />} 
          label="Stats" 
          active={currentPath === "/stats"} 
          href="/stats" 
        />
        <TabItem 
          icon={<Calendar size={20} />} 
          label="Calendar" 
          active={currentPath === "/calendar"} 
          href="/calendar" 
        />
        <TabItem 
          icon={<Settings size={20} />} 
          label="Settings" 
          active={currentPath === "/settings"} 
          href="/settings" 
        />
      </div>
    </div>
  );
};

export default TabBar;
