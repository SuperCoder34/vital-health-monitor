
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent
} from '@/components/ui/chart';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts';

interface BloodPressureData {
  systolic: number;
  diastolic: number;
}

const BloodPressureChart: React.FC<{ data: BloodPressureData }> = ({ data }) => {
  const chartData = [
    {
      name: 'Blood Pressure',
      Systolic: data.systolic,
      Diastolic: data.diastolic,
    }
  ];

  const config = {
    Systolic: {
      label: 'Systolic',
      color: '#ef4444',
    },
    Diastolic: {
      label: 'Diastolic',
      color: '#3b82f6',
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Blood Pressure</CardTitle>
        <CardDescription>Today's blood pressure readings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ChartContainer config={config}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="Systolic" fill="var(--color-Systolic)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Diastolic" fill="var(--color-Diastolic)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BloodPressureChart;
