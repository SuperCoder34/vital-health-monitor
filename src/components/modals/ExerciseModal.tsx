
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { 
  MapPin, 
  Running, 
  Bike, 
  Swimming,
  Dumbbell
} from 'lucide-react';

interface ActivityOption {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const activityOptions: ActivityOption[] = [
  { id: 'walking', label: 'Walking', icon: <MapPin className="h-5 w-5 text-health-primary" /> },
  { id: 'running', label: 'Running', icon: <Running className="h-5 w-5 text-health-primary" /> },
  { id: 'cycling', label: 'Cycling', icon: <Bike className="h-5 w-5 text-health-primary" /> },
  { id: 'swimming', label: 'Swimming', icon: <Swimming className="h-5 w-5 text-health-primary" /> },
  { id: 'gym', label: 'Gym', icon: <Dumbbell className="h-5 w-5 text-health-primary" /> }
];

interface ExerciseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ExerciseModal: React.FC<ExerciseModalProps> = ({ open, onOpenChange }) => {
  const [selectedActivity, setSelectedActivity] = useState('walking');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, here we would send the data to a backend
    toast({
      title: "Exercise recorded",
      description: "Your exercise session has been saved successfully.",
    });
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Record Exercise</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid grid-cols-5 gap-2">
            {activityOptions.map((option) => (
              <div
                key={option.id}
                className={cn(
                  "flex flex-col items-center p-2 rounded-lg cursor-pointer border transition-colors",
                  selectedActivity === option.id
                    ? "bg-blue-50 border-health-primary"
                    : "border-gray-200 hover:bg-gray-50"
                )}
                onClick={() => setSelectedActivity(option.id)}
              >
                <div className="mb-1">{option.icon}</div>
                <span className="text-xs text-center">{option.label}</span>
              </div>
            ))}
          </div>
          
          <div className="flex space-x-3 items-end">
            <div className="flex-1 space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input 
                id="duration" 
                type="number"
                placeholder="30" 
                required
              />
            </div>
            <div className="pb-2 text-sm">minutes</div>
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

export default ExerciseModal;
