
import React, { useState } from 'react';
import { Heart, Utensils, SmilePlus, Pill } from 'lucide-react';
import Header from '@/components/layout/Header';
import TabBar from '@/components/layout/TabBar';
import DateSelector from '@/components/health/DateSelector';
import MetricCard from '@/components/health/MetricCard';
import Notification from '@/components/health/Notification';
import HealthDataEntry from '@/components/health/HealthDataEntry';
import BloodPressureModal from '@/components/modals/BloodPressureModal';
import FoodModal from '@/components/modals/FoodModal';
import ExerciseModal from '@/components/modals/ExerciseModal';
import MoodModal from '@/components/modals/MoodModal';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState('Today, May 3');
  const [openModal, setOpenModal] = useState<string | null>(null);

  const handleOpenModal = (modalType: string) => {
    setOpenModal(modalType);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      <Header />
      
      {/* Date Selector & Summary Cards */}
      <div className="p-4 bg-white">
        <div className="flex justify-between mb-3">
          <DateSelector 
            date={selectedDate}
            onDateChange={setSelectedDate}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <MetricCard 
            icon={Heart} 
            label="Blood Pressure" 
            value="120/80 - Normal" 
            bgColor="bg-blue-50"
            onClick={() => handleOpenModal('bloodPressure')}
          />
          <MetricCard 
            icon={Utensils} 
            label="Diet Status" 
            value="1350 cal - Good" 
            bgColor="bg-green-50"
            iconColor="text-green-600"
            onClick={() => handleOpenModal('food')}
          />
          <MetricCard 
            icon={SmilePlus} 
            label="Mood Status" 
            value="Happy" 
            bgColor="bg-yellow-50"
            iconColor="text-yellow-600"
            onClick={() => handleOpenModal('mood')}
          />
          <MetricCard 
            icon={Pill} 
            label="Medication" 
            value="3/3 Completed" 
            bgColor="bg-purple-50"
            iconColor="text-purple-600"
            onClick={() => toast({ title: "All medications taken!", description: "You've taken all your medications for today." })}
          />
        </div>
      </div>
      
      {/* Notifications */}
      <div className="p-4 mt-2 bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <button className="text-sm text-health-primary">View all</button>
        </div>
        
        <Notification
          title="Message from Dr. Johnson"
          message="Your blood pressure has improved, keep up the good work!"
          time="Today 09:30"
          type="doctor"
        />
      </div>
      
      {/* Health Data Entry */}
      <div className="mt-2">
        <HealthDataEntry onOpenModal={handleOpenModal} />
      </div>

      {/* Tab Bar */}
      <TabBar />

      {/* Modals */}
      <BloodPressureModal 
        open={openModal === 'bloodPressure'} 
        onOpenChange={() => handleCloseModal()} 
      />
      <FoodModal 
        open={openModal === 'food'} 
        onOpenChange={() => handleCloseModal()} 
      />
      <ExerciseModal 
        open={openModal === 'exercise'} 
        onOpenChange={() => handleCloseModal()} 
      />
      <MoodModal 
        open={openModal === 'mood'} 
        onOpenChange={() => handleCloseModal()} 
      />
    </div>
  );
};

export default Index;
