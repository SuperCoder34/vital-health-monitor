
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

interface MoodData {
  mood: string;
  notes?: string;
}

interface MoodOption {
  id: string;
  emoji: string;
  label: string;
}

const moodOptions: MoodOption[] = [
  { id: 'happy', emoji: '😊', label: 'Happy' },
  { id: 'calm', emoji: '😌', label: 'Calm' },
  { id: 'neutral', emoji: '😐', label: 'Neutral' },
  { id: 'sad', emoji: '😔', label: 'Sad' },
  { id: 'angry', emoji: '😡', label: 'Angry' }
];

interface MoodModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: MoodData) => void;
}

const MoodModal: React.FC<MoodModalProps> = ({ open, onOpenChange, onSubmit }) => {
  const [selectedMood, setSelectedMood] = useState('');
  const [notes, setNotes] = useState('');
  
  // Reset form when modal opens
  React.useEffect(() => {
    if (open) {
      setSelectedMood('');
      setNotes('');
    }
  }, [open]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMood) {
      toast({
        title: "Please select a mood",
        variant: "destructive"
      });
      return;
    }
    
    // Find the selected mood option to get its label
    const selectedOption = moodOptions.find(option => option.id === selectedMood);
    if (!selectedOption) return;
    
    const data: MoodData = {
      mood: selectedOption.label
    };
    
    if (notes.trim()) {
      data.notes = notes;
    }
    
    onSubmit(data);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Record Mood</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="flex justify-between">
            {moodOptions.map((option) => (
              <div
                key={option.id}
                className={cn(
                  "flex flex-col items-center cursor-pointer p-2 rounded-lg transition-all",
                  selectedMood === option.id && "bg-blue-50"
                )}
                onClick={() => setSelectedMood(option.id)}
              >
                <div className="text-3xl mb-1">{option.emoji}</div>
                <span className="text-xs">{option.label}</span>
              </div>
            ))}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea 
              id="notes" 
              placeholder="What made you feel this way?" 
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

export default MoodModal;
