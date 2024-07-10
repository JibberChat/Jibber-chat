import type { ChatRoom, GetMeQuery } from "@/__generated__/graphql";
import { useAuth } from "@clerk/clerk-react";
import {
  Avatar, AvatarFallback,
} from "@radix-ui/react-avatar";
import { Edit, LogOut } from "lucide-react";
import React, { useState } from "react";

import { Groups } from "./Groups";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { UPDATE_USER } from "@/http/user";
import { useMutation } from "@apollo/client";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface SidebarProps {
  user: GetMeQuery["getMe"];
  rooms: ChatRoom[] | undefined;
  // eslint-disable-next-line no-unused-vars
  setSelectedRoom: (room: ChatRoom) => void;
}

export const Sidebar = ({ user, rooms, setSelectedRoom }: Readonly<SidebarProps>) => {
  const { signOut } = useAuth();
  const [editUser] = useMutation(UPDATE_USER);
  const [isOpen, setIsOpen] = useState(false);

  const handleEditUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = e.currentTarget.name?.value;
    console.log(name, "name edit");
    if (!name) return;

    console.log(user.id, "user id")

    editUser({
      variables: {
        input: {
          name,
        },
      },
    }).then(({ data }) => {
      if (data?.updateUser) {
        return window.location.reload();
      }
    });

    console.log("edit user");

    setIsOpen(false);
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
              <DropdownMenuItem onClick={() => signOut()}>
                <LogOut className="mr-2" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setIsOpen(true)}>
                <Edit className="mr-2" />
                Edit Profile
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit name</DialogTitle>
              <DialogDescription>Change the name</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditUser}>
              <div className="grid gap-4 py-4">
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" name="name" placeholder="Mame" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <div className="flex flex-col h-full justify-end px-4">
          <Groups rooms={rooms} setSelectedRoom={setSelectedRoom} />
        </div>
      </div>
    </div>
  );
};
