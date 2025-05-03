
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

interface WeightData {
  weight: number;
  unit: string;
  notes?: string;
}

interface WeightModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: WeightData) => void;
  defaultValues?: WeightData;
}

const WeightModal: React.FC<WeightModalProps> = ({ open, onOpenChange, onSubmit, defaultValues }) => {
  const [weight, setWeight] = useState<number | ''>(defaultValues?.weight || '');
  const [unit, setUnit] = useState<string>(defaultValues?.unit || 'kg');
  const [notes, setNotes] = useState<string>(defaultValues?.notes || '');
  
  // Reset form when modal opens
  React.useEffect(() => {
    if (open && defaultValues) {
      setWeight(defaultValues.weight || '');
      setUnit(defaultValues.unit || 'kg');
      setNotes(defaultValues.notes || '');
    } else if (open) {
      setWeight('');
      setUnit('kg');
      setNotes('');
    }
  }, [open, defaultValues]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!weight) {
      toast({
        title: "Please enter your weight",
        variant: "destructive"
      });
      return;
    }
    
    const data: WeightData = {
      weight: Number(weight),
      unit,
      notes: notes.trim() ? notes : undefined
    };
    
    onSubmit(data);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Record Weight</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="flex space-x-3 items-end">
            <div className="flex-1 space-y-2">
              <Label htmlFor="weight">Weight</Label>
              <Input 
                id="weight" 
                type="number"
                placeholder="70" 
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value ? Number(e.target.value) : '')}
                required
              />
            </div>
            <div className="w-20">
              <Label htmlFor="unit">Unit</Label>
              <select
                id="unit"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              >
                <option value="kg">kg</option>
                <option value="lb">lb</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea 
              id="notes" 
              placeholder="Any additional notes" 
              className="resize-none h-20"
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

export default WeightModal;
