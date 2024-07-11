import type { GetMeQuery } from "@/__generated__/graphql";
import { useMutation } from "@apollo/client";
import { useAuth } from "@clerk/clerk-react";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Edit, LogOut } from "lucide-react";
import React, { useState } from "react";

import { Groups } from "./Groups";
import EditProfile from "./dialogs/EditProfile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { UPDATE_USER } from "@/http/user";

interface SidebarProps {
  user: GetMeQuery["getMe"];
}

export const Sidebar: React.FC<Readonly<SidebarProps>> = ({ user }) => {
  const { signOut } = useAuth();
  const [editUser] = useMutation(UPDATE_USER);
  const [isOpen, setIsOpen] = useState(false);

  const handleEditProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = (e.currentTarget.name as unknown as HTMLInputElement).value;
    if (name.trim() === "") return;

    editUser({
      variables: {
        input: {
          name: name.trimStart(),
        },
      },
    }).then(({ data }) => {
      if (data?.updateUser) {
        return window.location.reload();
      }
    });
  };
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
              <DropdownMenuItem onClick={() => setIsOpen(true)}>
                <Edit className="mr-2" />
                Edit Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                <LogOut className="mr-2" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex-1 overflow-auto py-2 flex flex-col h-full justify-end px-4">
        <Groups />
      </div>
      <EditProfile isOpen={isOpen} setIsOpen={setIsOpen} handleEditProfile={handleEditProfile} />
    </div>
  );
};
