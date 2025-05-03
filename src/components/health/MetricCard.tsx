
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  bgColor?: string;
  iconColor?: string;
  onClick?: () => void;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon: Icon,
  label,
  value,
  bgColor = "bg-blue-50",
  iconColor = "text-health-primary",
  onClick
}) => {
  return (
    <div 
      className={cn("health-metric-card", bgColor)}
      onClick={onClick}
    >
      <div className={cn("health-icon-container bg-white mr-3", iconColor)}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex flex-col">
        <span className="text-xs text-gray-500">{label}</span>
        <span className="text-sm font-medium">{value}</span>
      </div>
    </div>
  );
};

export default MetricCard;
