
import React from 'react';
import Header from '@/components/layout/Header';
import TabBar from '@/components/layout/TabBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StatsSummary from '@/components/health/StatsSummary';
import BloodPressureChart from '@/components/health/BloodPressureChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useHealth } from '@/context/HealthContext';
import { Pills, CloudMoon } from 'lucide-react';

const Stats = () => {
  const { 
    bloodPressure, 
    weight, 
    mood, 
    dietStatus, 
    medicationStatus, 
    sleep,
    medication,
    selectedDate 
  } = useHealth();

  // Combine all metrics for the summary view
  const metrics = {
    bloodPressure,
    weight,
    mood,
    dietStatus,
    medicationStatus,
    sleep,
    medication
  };

  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      <Header />
      
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Health Statistics</h1>
        
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary">
            <StatsSummary metrics={metrics} date={selectedDate} />
            
            <div className="mt-4 space-y-4">
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

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CloudMoon className="h-5 w-5" />
                    Sleep
                  </CardTitle>
                  <CardDescription>Sleep duration and quality</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-[200px] bg-muted/20 rounded-md">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{sleep.hours} hours</div>
                      <div className="text-lg text-muted-foreground mt-2">Quality: {sleep.quality}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Pills className="h-5 w-5" />
                    Medications
                  </CardTitle>
                  <CardDescription>Medication adherence</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center h-[200px] bg-muted/20 rounded-md">
                    <div className="text-2xl font-bold mb-4">
                      {medication.medications.filter(med => med.taken).length}/{medication.medications.length} Taken
                    </div>
                    <div className="w-full max-w-xs">
                      {medication.medications.map((med, index) => (
                        <div key={index} className="flex justify-between items-center p-2 border-b">
                          <span>{med.name} ({med.dosage})</span>
                          <span className={med.taken ? "text-green-500" : "text-red-500"}>
                            {med.taken ? "✓" : "✗"}
                          </span>
                        </div>
                      ))}
                    </div>
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
