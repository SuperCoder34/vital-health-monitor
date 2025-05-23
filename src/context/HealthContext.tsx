
import React, { createContext, useState, useContext } from 'react';

interface BloodPressureData {
  systolic: number;
  diastolic: number;
  pulse?: number;
  notes?: string;
}

interface WeightData {
  weight: number;
  unit: string;
  notes?: string;
}

interface SleepData {
  hours: number;
  quality: string;
  notes?: string;
}

interface MedicationData {
  taken: boolean;
  medications: {
    name: string;
    dosage: string;
    taken: boolean;
  }[];
}

interface HealthContextType {
  bloodPressure: BloodPressureData;
  setBloodPressure: React.Dispatch<React.SetStateAction<BloodPressureData>>;
  weight: WeightData;
  setWeight: React.Dispatch<React.SetStateAction<WeightData>>;
  mood: string;
  setMood: React.Dispatch<React.SetStateAction<string>>;
  dietStatus: string;
  setDietStatus: React.Dispatch<React.SetStateAction<string>>;
  medicationStatus: string;
  setMedicationStatus: React.Dispatch<React.SetStateAction<string>>;
  sleep: SleepData;
  setSleep: React.Dispatch<React.SetStateAction<SleepData>>;
  medication: MedicationData;
  setMedication: React.Dispatch<React.SetStateAction<MedicationData>>;
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
}

const HealthContext = createContext<HealthContextType | undefined>(undefined);

export const HealthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bloodPressure, setBloodPressure] = useState<BloodPressureData>({
    systolic: 120,
    diastolic: 80
  });
  const [weight, setWeight] = useState<WeightData>({
    weight: 70,
    unit: 'kg'
  });
  const [mood, setMood] = useState<string>('Happy');
  const [dietStatus, setDietStatus] = useState<string>('1350 cal - Good');
  const [medicationStatus, setMedicationStatus] = useState<string>('3/3 Completed');
  const [sleep, setSleep] = useState<SleepData>({
    hours: 7.5,
    quality: 'Good'
  });
  const [medication, setMedication] = useState<MedicationData>({
    taken: false,
    medications: [
      { name: 'Vitamin D', dosage: '1000 IU', taken: false },
      { name: 'Multivitamin', dosage: '1 tablet', taken: false },
      { name: 'Metformin', dosage: '500mg', taken: false }
    ]
  });
  const [selectedDate, setSelectedDate] = useState<string>('Today, May 3');

  return (
    <HealthContext.Provider value={{
      bloodPressure,
      setBloodPressure,
      weight,
      setWeight,
      mood,
      setMood,
      dietStatus,
      setDietStatus,
      medicationStatus,
      setMedicationStatus,
      sleep,
      setSleep,
      medication,
      setMedication,
      selectedDate,
      setSelectedDate
    }}>
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => {
  const context = useContext(HealthContext);
  if (!context) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
};
