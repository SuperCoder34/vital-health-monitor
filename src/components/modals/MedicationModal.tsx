
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Checkbox } from "@/components/ui/checkbox";
import { Pill } from 'lucide-react';

const medicationFormSchema = z.object({
  taken: z.boolean().default(false),
  medications: z.array(
    z.object({
      name: z.string(),
      dosage: z.string(),
      taken: z.boolean(),
    })
  ),
});

type MedicationFormValues = z.infer<typeof medicationFormSchema>;

export interface MedicationData {
  taken: boolean;
  medications: {
    name: string;
    dosage: string;
    taken: boolean;
  }[];
}

interface MedicationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: MedicationData) => void;
  defaultValues?: MedicationData;
}

const MedicationModal: React.FC<MedicationModalProps> = ({
  open,
  onOpenChange,
  onSubmit,
  defaultValues = {
    taken: false,
    medications: [
      { name: 'Vitamin D', dosage: '1000 IU', taken: false },
      { name: 'Multivitamin', dosage: '1 tablet', taken: false },
      { name: 'Metformin', dosage: '500mg', taken: false },
    ]
  }
}) => {
  const [localMedications, setLocalMedications] = useState(defaultValues.medications);
  
  const form = useForm<MedicationFormValues>({
    resolver: zodResolver(medicationFormSchema),
    defaultValues
  });

  const handleToggleMedication = (index: number) => {
    const updated = [...localMedications];
    updated[index] = { ...updated[index], taken: !updated[index].taken };
    setLocalMedications(updated);
  };

  const handleSubmit = () => {
    const data = {
      taken: localMedications.every(med => med.taken),
      medications: localMedications
    };
    onSubmit(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pill className="h-6 w-6 text-health-primary" />
            Record Medications
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-4">
            <div className="space-y-4">
              {localMedications.map((medication, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`medication-${index}`} 
                    checked={medication.taken}
                    onCheckedChange={() => handleToggleMedication(index)}
                  />
                  <label
                    htmlFor={`medication-${index}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {medication.name} ({medication.dosage})
                  </label>
                </div>
              ))}
            </div>
            
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default MedicationModal;
