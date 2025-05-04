
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { CloudMoon } from 'lucide-react';

const sleepFormSchema = z.object({
  hours: z.coerce.number().min(0).max(24).default(7.5),
  quality: z.string().min(1, { message: 'Sleep quality is required' }).default('Good'),
  notes: z.string().optional(),
});

type SleepFormValues = z.infer<typeof sleepFormSchema>;

export interface SleepData {
  hours: number;
  quality: string;
  notes?: string;
}

interface SleepModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: SleepData) => void;
  defaultValues?: SleepData;
}

const SleepModal: React.FC<SleepModalProps> = ({
  open,
  onOpenChange,
  onSubmit,
  defaultValues = {
    hours: 7.5,
    quality: 'Good'
  }
}) => {
  const form = useForm<SleepFormValues>({
    resolver: zodResolver(sleepFormSchema),
    defaultValues
  });

  const handleSubmit = (data: SleepFormValues) => {
    onSubmit({
      hours: data.hours,
      quality: data.quality,
      notes: data.notes
    });
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CloudMoon className="h-6 w-6 text-health-primary" />
            Record Sleep
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="hours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hours Slept</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.5" 
                      placeholder="7.5"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="quality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sleep Quality</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      {...field}
                    >
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                      <option value="Poor">Poor</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any notes about your sleep?"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SleepModal;
