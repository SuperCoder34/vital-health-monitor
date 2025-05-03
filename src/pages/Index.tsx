
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
import WeightModal from '@/components/modals/WeightModal';
import { useToast } from '@/components/ui/use-toast';
import { useHealth } from '@/context/HealthContext';

const Index = () => {
  const { toast } = useToast();
  const [openModal, setOpenModal] = useState<string | null>(null);
  
  // Use the health context instead of local state
  const { 
    bloodPressure, setBloodPressure,
    weight, setWeight,
    mood, setMood,
    dietStatus, setDietStatus,
    medicationStatus, setMedicationStatus,
    selectedDate, setSelectedDate
  } = useHealth();

  const handleOpenModal = (modalType: string) => {
    setOpenModal(modalType);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

  // Handlers for submitting different health metrics
  const handleBloodPressureSubmit = (data: typeof bloodPressure) => {
    setBloodPressure(data);
    
    // Determine blood pressure status
    let status = 'Normal';
    if (data.systolic >= 140 || data.diastolic >= 90) {
      status = 'High';
    } else if (data.systolic < 90 || data.diastolic < 60) {
      status = 'Low';
    }
    
    toast({
      title: "Blood pressure recorded",
      description: `Your reading of ${data.systolic}/${data.diastolic} has been saved.`
    });
    
    handleCloseModal();
  };

  const handleFoodSubmit = (data: { mealType: string, description?: string }) => {
    // In a real app, this would calculate calories based on food
    // For now, let's just update with a random calorie count
    const calories = Math.floor(Math.random() * 500) + 300;
    setDietStatus(`${calories} cal - ${calories < 600 ? 'Good' : 'High'}`);
    
    toast({
      title: "Food recorded",
      description: `Your ${data.mealType.toLowerCase()} has been saved.`
    });
    
    handleCloseModal();
  };

  const handleMoodSubmit = (data: { mood: string, notes?: string }) => {
    setMood(data.mood);
    
    toast({
      title: "Mood recorded",
      description: `Your mood has been recorded as ${data.mood}.`
    });
    
    handleCloseModal();
  };

  const handleWeightSubmit = (data: typeof weight) => {
    setWeight(data);
    
    toast({
      title: "Weight recorded",
      description: `Your weight of ${data.weight}${data.unit} has been saved.`
    });
    
    handleCloseModal();
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
            value={`${bloodPressure.systolic}/${bloodPressure.diastolic} - ${bloodPressure.systolic >= 140 || bloodPressure.diastolic >= 90 ? 'High' : bloodPressure.systolic < 90 || bloodPressure.diastolic < 60 ? 'Low' : 'Normal'}`} 
            bgColor="bg-blue-50"
            onClick={() => handleOpenModal('bloodPressure')}
          />
          <MetricCard 
            icon={Utensils} 
            label="Diet Status" 
            value={dietStatus} 
            bgColor="bg-green-50"
            iconColor="text-green-600"
            onClick={() => handleOpenModal('food')}
          />
          <MetricCard 
            icon={SmilePlus} 
            label="Mood Status" 
            value={mood} 
            bgColor="bg-yellow-50"
            iconColor="text-yellow-600"
            onClick={() => handleOpenModal('mood')}
          />
          <MetricCard 
            icon={Pill} 
            label="Medication" 
            value={medicationStatus} 
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
        onSubmit={handleBloodPressureSubmit}
        defaultValues={bloodPressure}
      />
      <FoodModal 
        open={openModal === 'food'} 
        onOpenChange={() => handleCloseModal()} 
        onSubmit={handleFoodSubmit}
      />
      <ExerciseModal 
        open={openModal === 'exercise'} 
        onOpenChange={() => handleCloseModal()} 
      />
      <MoodModal 
        open={openModal === 'mood'} 
        onOpenChange={() => handleCloseModal()} 
        onSubmit={handleMoodSubmit}
      />
      <WeightModal
        open={openModal === 'weight'} 
        onOpenChange={() => handleCloseModal()}
        onSubmit={handleWeightSubmit}
        defaultValues={weight}
      />
    </div>
  );
};

export default Index;
