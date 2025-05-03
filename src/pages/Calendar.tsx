
import React from 'react';
import Header from '@/components/layout/Header';
import TabBar from '@/components/layout/TabBar';

const Calendar = () => {
  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      <Header />
      
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Health Calendar</h1>
        <div className="health-card p-6">
          <div className="text-lg text-center mb-4">Coming Soon</div>
          <p className="text-gray-500 text-center">
            Your health events and appointments will be shown here. 
            Plan your health activities and never miss important appointments.
          </p>
        </div>
      </div>
      
      <TabBar />
    </div>
  );
};

export default Calendar;
