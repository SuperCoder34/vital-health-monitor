
import React from 'react';
import Header from '@/components/layout/Header';
import TabBar from '@/components/layout/TabBar';

const Settings = () => {
  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      <Header />
      
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Settings</h1>
        <div className="health-card p-6">
          <div className="text-lg text-center mb-4">Coming Soon</div>
          <p className="text-gray-500 text-center">
            App settings and preferences will be available here. 
            Customize the app to fit your health monitoring needs.
          </p>
        </div>
      </div>
      
      <TabBar />
    </div>
  );
};

export default Settings;
