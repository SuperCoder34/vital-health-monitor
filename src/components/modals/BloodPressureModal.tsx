
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface BloodPressureData {
  systolic: number;
  diastolic: number;
  pulse?: number;
  notes?: string;
}

interface BloodPressureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: BloodPressureData) => void;
  defaultValues?: BloodPressureData;
}

const BloodPressureModal: React.FC<BloodPressureModalProps> = ({ 
  open, 
  onOpenChange, 
  onSubmit,
  defaultValues = { systolic: 120, diastolic: 80 }
}) => {
  const [systolic, setSystolic] = useState(defaultValues.systolic.toString());
  const [diastolic, setDiastolic] = useState(defaultValues.diastolic.toString());
  const [pulse, setPulse] = useState(defaultValues.pulse?.toString() || '');
  const [notes, setNotes] = useState(defaultValues.notes || '');
  
  // Update form values when default values change
  useEffect(() => {
    if (defaultValues) {
      setSystolic(defaultValues.systolic.toString());
      setDiastolic(defaultValues.diastolic.toString());
      setPulse(defaultValues.pulse?.toString() || '');
      setNotes(defaultValues.notes || '');
    }
  }, [defaultValues, open]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    const systolicNum = parseInt(systolic);
    const diastolicNum = parseInt(diastolic);
    
    if (isNaN(systolicNum) || isNaN(diastolicNum)) {
      return; // Basic validation
    }
    
    const data: BloodPressureData = {
      systolic: systolicNum,
      diastolic: diastolicNum
    };
    
    // Add optional fields if they exist
    if (pulse && !isNaN(parseInt(pulse))) {
      data.pulse = parseInt(pulse);
    }
    
    if (notes.trim()) {
      data.notes = notes;
    }
    
    onSubmit(data);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Record Blood Pressure</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="systolic">Systolic (mmHg)</Label>
              <Input 
                id="systolic" 
                type="number" 
                placeholder="120" 
                value={systolic}
                onChange={(e) => setSystolic(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="diastolic">Diastolic (mmHg)</Label>
              <Input 
                id="diastolic" 
                type="number" 
                placeholder="80" 
                value={diastolic}
                onChange={(e) => setDiastolic(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="pulse">Pulse (bpm)</Label>
            <Input 
              id="pulse" 
              type="number" 
              placeholder="75"
              value={pulse}
              onChange={(e) => setPulse(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea 
              id="notes" 
              placeholder="Any additional notes" 
              className="resize-none"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          
          <DialogFooter>
            <Button type="submit" className="w-full">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BloodPressureModal;
