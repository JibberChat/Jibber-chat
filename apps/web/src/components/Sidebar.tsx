import type { ChatRoom, GetMeQuery } from "@/__generated__/graphql";
import { useAuth } from "@clerk/clerk-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LogOut } from "lucide-react";
import React from "react";

import { Groups } from "./Groups";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface SidebarProps {
  user: GetMeQuery["getMe"];
  rooms: ChatRoom[] | undefined;
  // eslint-disable-next-line no-unused-vars
  setSelectedRoom: (room: ChatRoom) => void;
}

export const Sidebar = ({ user, rooms, setSelectedRoom }: Readonly<SidebarProps>) => {
  const { signOut } = useAuth();
  return (
    <div className="flex flex-col border-r bg-muted/40">
      <div className="flex h-[60px] items-center border-b px-6">
        <DropdownMenu>
          <DropdownMenuTrigger className="h-[100%] flex items-center relative">
            <Avatar className="mr-2">
              {/* <AvatarImage src={user.imageUrl} className="rounded-full w-8 h-8" /> */}
              <AvatarFallback>{user.name?.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <p>{user.name}</p>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => signOut()}>
                <LogOut className="mr-2" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <div className="flex flex-col h-full justify-end px-4">
          <Groups rooms={rooms} setSelectedRoom={setSelectedRoom} />
        </div>
      </div>
    </div>
  );
};
