
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface HealthMetrics {
  bloodPressure: {
    systolic: number;
    diastolic: number;
    pulse?: number;
    notes?: string;
  };
  weight: {
    weight: number;
    unit: string;
    notes?: string;
  };
  mood: string;
  dietStatus: string;
  medicationStatus: string;
}

interface StatsSummaryProps {
  metrics: HealthMetrics;
  date: string;
}

const StatsSummary: React.FC<StatsSummaryProps> = ({ metrics, date }) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Daily Summary</CardTitle>
          <CardDescription>{date}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Blood Pressure</TableCell>
                <TableCell>{metrics.bloodPressure.systolic}/{metrics.bloodPressure.diastolic} mmHg</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Weight</TableCell>
                <TableCell>{metrics.weight.weight} {metrics.weight.unit}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Mood</TableCell>
                <TableCell>{metrics.mood}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Diet Status</TableCell>
                <TableCell>{metrics.dietStatus}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Medication</TableCell>
                <TableCell>{metrics.medicationStatus}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsSummary;
