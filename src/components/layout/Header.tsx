
import React from 'react';
import { Menu, Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder.svg" alt="User" />
            <AvatarFallback>AJ</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xs text-gray-500">Hello,</p>
            <h3 className="text-sm font-medium">Alex Johnson</h3>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5 text-gray-600" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Menu className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
