import type { ChatRoom } from "@/__generated__/graphql";
import { useMutation } from "@apollo/client";
import { DoorOpen, Plus } from "lucide-react";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { LEAVE_ROOM } from "@/http/room";

interface ChatHeaderProps {
  room: ChatRoom;
}

export const ChatHeader = ({ room }: Readonly<ChatHeaderProps>) => {
  const [leaveRoom] = useMutation(LEAVE_ROOM);

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
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Plus className="mr-2" />
              Invite people
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => leaveRoom({ variables: { input: { id: room.id } } }).then(() => window.location.reload())}
            >
              <DoorOpen className="mr-2" />
              Leave room
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
