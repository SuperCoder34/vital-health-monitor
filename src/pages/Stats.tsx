
import React from 'react';
import Header from '@/components/layout/Header';
import TabBar from '@/components/layout/TabBar';

const Stats = () => {
  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      <Header />
      
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Health Statistics</h1>
        <div className="health-card p-6">
          <div className="text-lg text-center mb-4">Coming Soon</div>
          <p className="text-gray-500 text-center">
            Detailed health statistics and trends will be available here. 
            Track your progress over time and gain valuable insights into your health.
          </p>
        </div>
      </div>
      
      <TabBar />
    </div>
  );
};

export default Stats;
