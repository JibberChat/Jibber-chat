import type { ChatRoom } from "@/__generated__/graphql";
import { useRooms } from "@/contexts/RoomsContext";
import { useMutation } from "@apollo/client";
import { DoorOpen, Edit, Plus } from "lucide-react";
import React, { useState } from "react";

import EditRoom from "../dialogs/EditRoom";
import InviteUserToRoom from "../dialogs/InviteUserToRoom";
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

import { INVITE_USER_TO_ROOM } from "@/http/room";

interface ChatHeaderProps {
  room: ChatRoom;
}

export const ChatHeader = ({ room }: Readonly<ChatHeaderProps>) => {
  const { leaveRoomById, updateRoomById } = useRooms();

  const [inviteUserToRoom] = useMutation(INVITE_USER_TO_ROOM);

  const [isOpenEditRoom, setIsOpenEditRoom] = useState(false);
  const [isOpenInviteUser, setIsOpenInviteUser] = useState(false);

  const handleEditRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = e.currentTarget.roomName?.value;
    if (!name.trim()) return;

    await updateRoomById({ name, roomId: room.id });

    setIsOpenEditRoom(false);
  };

  const handleInviteUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userEmail = e.currentTarget.userEmail.value;
    if (!userEmail.trim()) return;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) return;

    inviteUserToRoom({
      variables: {
        input: {
          roomId: room.id,
          userEmail,
        },
      },
    }).then(() => {
      setIsOpenInviteUser(false);
    });
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
            <DropdownMenuItem onClick={() => setIsOpenInviteUser(true)}>
              <Plus className="mr-2" />
              Invite people
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setIsOpenEditRoom(true)}>
              <Edit className="mr-2" />
              Edit Room
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                // leaveRoom({ variables: { input: { roomId: room.id } } }).then(() => window.location.reload())
                leaveRoomById({ roomId: room.id })
              }
            >
              <DoorOpen className="mr-2" />
              Leave room
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditRoom isOpen={isOpenEditRoom} setIsOpen={setIsOpenEditRoom} handleEditRoom={handleEditRoom} />
      <InviteUserToRoom isOpen={isOpenInviteUser} setIsOpen={setIsOpenInviteUser} handleInviteUser={handleInviteUser} />
    </div>
  );
};
