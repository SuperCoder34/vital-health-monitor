
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Camera } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';

interface FoodData {
  mealType: string;
  description?: string;
}

interface FoodModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: FoodData) => void;
}

const FoodModal: React.FC<FoodModalProps> = ({ open, onOpenChange, onSubmit }) => {
  const [hasPhoto, setHasPhoto] = useState(false);
  const [mealType, setMealType] = useState('breakfast');
  const [description, setDescription] = useState('');
  
  // Reset form when modal opens
  React.useEffect(() => {
    if (open) {
      setHasPhoto(false);
      setMealType('breakfast');
      setDescription('');
    }
  }, [open]);
  
  const takePhoto = () => {
    // In a real app, this would access the camera
    setHasPhoto(true);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hasPhoto) {
      toast({
        title: "Please take a photo",
        variant: "destructive"
      });
      return;
    }
    
    const data: FoodData = {
      mealType: mealType.charAt(0).toUpperCase() + mealType.slice(1) // Capitalize first letter
    };
    
    if (description.trim()) {
      data.description = description;
    }
    
    onSubmit(data);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Record Meal</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div 
            className="bg-gray-100 h-52 rounded-lg flex items-center justify-center cursor-pointer"
            onClick={takePhoto}
          >
            {hasPhoto ? (
              <div className="text-center">
                <p className="text-green-600 mb-2">✓ Photo taken</p>
                <Button type="button" size="sm" variant="outline" onClick={(e) => {
                  e.stopPropagation();
                  setHasPhoto(false);
                }}>
                  Retake
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-health-primary flex items-center justify-center mb-2">
                  <Camera className="h-6 w-6 text-white" />
                </div>
                <p className="text-sm text-gray-500">Tap to take photo</p>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="mealType">Meal Type</Label>
            <Select defaultValue={mealType} onValueChange={setMealType}>
              <SelectTrigger>
                <SelectValue placeholder="Select meal type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="breakfast">Breakfast</SelectItem>
                <SelectItem value="lunch">Lunch</SelectItem>
                <SelectItem value="dinner">Dinner</SelectItem>
                <SelectItem value="snack">Snack</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input 
              id="description" 
              placeholder="Describe your meal"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <DialogFooter>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={!hasPhoto}
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FoodModal;
