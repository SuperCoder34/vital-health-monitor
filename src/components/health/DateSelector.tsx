
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DateSelectorProps {
  date: string;
  onDateChange: (date: string) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ date, onDateChange }) => {
  const dates = [
    'Today, May 3',
    'Yesterday, May 2',
    'Tuesday, May 1',
    'Monday, Apr 30',
    'Sunday, Apr 29',
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center px-2 py-1 h-auto text-sm font-medium">
          {date}
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {dates.map((d) => (
          <DropdownMenuItem 
            key={d} 
            onClick={() => onDateChange(d)}
            className="cursor-pointer"
          >
            {d}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DateSelector;
