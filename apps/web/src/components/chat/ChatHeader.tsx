import { DoorClosed, DoorOpen, Plus } from "lucide-react";
import React from "react";
import { Room } from "types/room.type";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface ChatHeaderProps {
  room: Room;
}

export const ChatHeader = ({ room }: Readonly<ChatHeaderProps>) => {
  return (
    <div className="flex h-[60px] items-center justify-between border-b bg-muted/40 px-6">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/placeholder.jpg" />
          <AvatarFallback>{room.name?.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{room.name}</div>
          <div className="text-xs text-muted-foreground">{room.id}</div>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Settings</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator /> */}
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Plus className="mr-2" />
              Invite people
            </DropdownMenuItem>
          </DropdownMenuGroup>
          {/* <DropdownMenuSeparator /> */}
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <DoorOpen className="mr-2" />
              Leave room
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
