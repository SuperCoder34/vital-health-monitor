
import React from 'react';
import Header from '@/components/layout/Header';
import TabBar from '@/components/layout/TabBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StatsSummary from '@/components/health/StatsSummary';
import BloodPressureChart from '@/components/health/BloodPressureChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useHealth } from '@/context/HealthContext';

const Stats = () => {
  const { 
    bloodPressure, 
    weight, 
    mood, 
    dietStatus, 
    medicationStatus, 
    selectedDate 
  } = useHealth();

  // Combine all metrics for the summary view
  const metrics = {
    bloodPressure,
    weight,
    mood,
    dietStatus,
    medicationStatus
  };

  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      <Header />
      
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Health Statistics</h1>
        
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="charts">Charts</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary">
            <StatsSummary metrics={metrics} date={selectedDate} />
          </TabsContent>
          
          <TabsContent value="charts">
            <div className="space-y-4">
              <BloodPressureChart data={bloodPressure} />
              
              <Card>
                <CardHeader>
                  <CardTitle>Weight</CardTitle>
                  <CardDescription>Today's weight: {weight.weight} {weight.unit}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-[200px] bg-muted/20 rounded-md">
                    <div className="text-2xl font-bold">{weight.weight} {weight.unit}</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Mood</CardTitle>
                  <CardDescription>Today's mood</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-[200px] bg-muted/20 rounded-md">
                    <div className="text-2xl font-bold">{mood}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Health History</CardTitle>
                <CardDescription>Your health data over time</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">
                  Detailed history will be available soon. Track your progress over time and gain valuable insights into your health.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <TabBar />
    </div>
  );
};

export default Stats;
