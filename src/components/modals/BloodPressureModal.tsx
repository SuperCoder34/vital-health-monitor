
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

interface BloodPressureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BloodPressureModal: React.FC<BloodPressureModalProps> = ({ open, onOpenChange }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, here we would send the data to a backend
    toast({
      title: "Blood pressure recorded",
      description: "Your blood pressure data has been saved successfully.",
    });
    onOpenChange(false);
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
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="diastolic">Diastolic (mmHg)</Label>
              <Input 
                id="diastolic" 
                type="number" 
                placeholder="80" 
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
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea 
              id="notes" 
              placeholder="Any additional notes" 
              className="resize-none"
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
