
import React from 'react';
import { cn } from '@/lib/utils';
import { MessageSquareMedical, LucideIcon } from 'lucide-react';

interface NotificationProps {
  icon?: LucideIcon;
  title: string;
  message: string;
  time: string;
  type?: 'doctor' | 'system' | 'reminder';
}

const Notification: React.FC<NotificationProps> = ({
  icon: Icon = MessageSquareMedical,
  title,
  message,
  time,
  type = 'doctor'
}) => {
  const getIconContainerColor = () => {
    switch(type) {
      case 'doctor': return 'bg-blue-50';
      case 'system': return 'bg-purple-50';
      case 'reminder': return 'bg-amber-50';
      default: return 'bg-blue-50';
    }
  };

  const getIconColor = () => {
    switch(type) {
      case 'doctor': return 'text-health-primary';
      case 'system': return 'text-purple-500';
      case 'reminder': return 'text-amber-500';
      default: return 'text-health-primary';
    }
  };

  return (
    <div className="flex p-3 bg-blue-50 rounded-xl mb-3 last:mb-0">
      <div className={cn("health-icon-container mr-3", getIconContainerColor())}>
        <Icon className={cn("h-5 w-5", getIconColor())} />
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium mb-0.5">{title}</div>
        <div className="text-xs text-gray-500 mb-1 line-clamp-2">{message}</div>
        <div className="text-xs text-gray-400">{time}</div>
      </div>
    </div>
  );
};

export default Notification;
