import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export const ChatHeader = () => {
    return (
      <div className="flex h-[60px] items-center border-b bg-muted/40 px-6">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">John Doe</div>
            <div className="text-xs text-muted-foreground">Online</div>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <span className="sr-only">Call</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <span className="sr-only">Video Call</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <span className="sr-only">More Options</span>
          </Button>
        </div>
      </div>
    );
  }