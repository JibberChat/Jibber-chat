import React from "react";
import { Room } from "types/room.type";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface ChatHeaderProps {
  room: Room;
}

export const ChatHeader = ({ room }: Readonly<ChatHeaderProps>) => {
  return (
    <div className="flex h-[60px] items-center border-b bg-muted/40 px-6">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/placeholder.jpg" />
          <AvatarFallback>{room.name}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{room.name}</div>
          <div className="text-xs text-muted-foreground">{room.id}</div>
        </div>
      </div>
    </div>
  );
};
