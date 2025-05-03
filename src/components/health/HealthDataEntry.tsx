
import React from 'react';
import { 
  Activity, 
  Heart, 
  Utensils, 
  SmilePlus,
  CloudMoon, 
  Timer, 
  Pill,
  Droplet
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface EntryItemProps {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
}

const EntryItem: React.FC<EntryItemProps> = ({ icon, title, onClick }) => {
  return (
    <div 
      className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm cursor-pointer transition-all hover:shadow-md"
      onClick={onClick}
    >
      <div className="flex items-center justify-center w-12 h-12 mb-2 rounded-full bg-blue-50">
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-700">{title}</span>
    </div>
  );
};

interface HealthDataEntryProps {
  onOpenModal: (modalType: string) => void;
}

const HealthDataEntry: React.FC<HealthDataEntryProps> = ({ onOpenModal }) => {
  return (
    <div className="px-4 py-6 bg-white">
      <h2 className="text-lg font-semibold text-center mb-5">Health Data Recording</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <EntryItem 
          icon={<Heart className="h-6 w-6 text-health-primary" />} 
          title="Blood Pressure" 
          onClick={() => onOpenModal('bloodPressure')} 
        />
        <EntryItem 
          icon={<Utensils className="h-6 w-6 text-health-primary" />} 
          title="Food Photo" 
          onClick={() => onOpenModal('food')} 
        />
        <EntryItem 
          icon={<Activity className="h-6 w-6 text-health-primary" />} 
          title="Exercise" 
          onClick={() => onOpenModal('exercise')} 
        />
        <EntryItem 
          icon={<Timer className="h-6 w-6 text-health-primary" />} 
          title="Meditation" 
          onClick={() => onOpenModal('meditation')} 
        />
        <EntryItem 
          icon={<SmilePlus className="h-6 w-6 text-health-primary" />} 
          title="Mood" 
          onClick={() => onOpenModal('mood')} 
        />
        <EntryItem 
          icon={<CloudMoon className="h-6 w-6 text-health-primary" />} 
          title="Sleep" 
          onClick={() => onOpenModal('sleep')} 
        />
        <EntryItem 
          icon={<Pill className="h-6 w-6 text-health-primary" />} 
          title="Medication" 
          onClick={() => onOpenModal('medication')} 
        />
        <EntryItem 
          icon={<Droplet className="h-6 w-6 text-health-primary" />} 
          title="Water" 
          onClick={() => onOpenModal('water')} 
        />
      </div>
    </div>
  );
};

export default HealthDataEntry;
