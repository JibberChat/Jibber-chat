import type { ChatRoom } from "@/__generated__/graphql";
import { useMutation } from "@apollo/client";
import { Label } from "@radix-ui/react-label";
import { DoorOpen, Edit, Plus } from "lucide-react";
import React, { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";

import { LEAVE_ROOM, UPDATE_ROOM } from "@/http/room";

interface ChatHeaderProps {
  room: ChatRoom;
}

export const ChatHeader = ({ room }: Readonly<ChatHeaderProps>) => {
  const [leaveRoom] = useMutation(LEAVE_ROOM);
  const [editRoom] = useMutation(UPDATE_ROOM);
  const [isOpen, setIsOpen] = useState(false);

  const handleEditRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = e.currentTarget.roomName?.value;
    if (!name) return;

    editRoom({
      variables: {
        input: {
          roomId: room.id,
          name,
        },
      },
    }).then(({ data }) => {
      if (data?.updateRoom) {
        return window.location.reload();
      }
    });

    setIsOpen(false);
  };
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
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setIsOpen(true)}>
              <Edit className="mr-2" />
              Edit Room
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                leaveRoom({ variables: { input: { roomId: room.id } } }).then(() => window.location.reload())
              }
            >
              <DoorOpen className="mr-2" />
              Leave room
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit room</DialogTitle>
            <DialogDescription>Change the name of the room here.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditRoom}>
            <div className="grid gap-4 py-4">
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="roomName" className="text-right">
                  Name
                </Label>
                <Input id="roomName" name="roomName" placeholder="Room name" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
