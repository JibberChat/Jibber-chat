import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ActivityIcon from "./icons/activity";
import PlusIcon from "./icons/plus";
import { CREATE_ROOM, GET_USERROOMS } from "@/http/room";
import { useMutation, useQuery } from "@apollo/client";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Group {
  id: string;
  name: string;
}

export const Groups = () => {
  // const [groups, setGroups] = useState([]);
  // const [newGroup, setNewGroup] = useState("");

  // useEffect(() => {
  //   // Fetch the groups from the server
  //   GET_USERROOMS().then((data) => setGroups(data));
  // }, []);

  // const handleCreateGroup = () => {
  //   // Create a new group
  //   CREATE_ROOM(newGroup).then((data) => {
  //     setGroups([...groups, data]);
  //     setNewGroup("");
  //   });
  // };

  const { data: rooms } = useQuery(GET_USERROOMS, { variables: { userId: "1" } });
  const [createRoom] = useMutation(CREATE_ROOM);
  const [isOpen, setIsOpen] = useState(false);

  const handleCreateRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = e.currentTarget.roomName?.value;
    if (!name) return;

    createRoom({
      variables: {
        name,
      },
    });
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Rooms:</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <PlusIcon className="h-4 w-4" />
              <span className="sr-only">Add Room</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add a new room</DialogTitle>
              <DialogDescription>Fill out the form to create a new room.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateRoom}>
              <div className="grid gap-4 py-4">
                <div className="grid items-center grid-cols-4 gap-4">
                  <Label htmlFor="roomName" className="text-right">
                    Name
                  </Label>
                  <Input id="roomName" name="roomName" placeholder="Room name" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Room</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex-grow">
        <Button variant="outline" className="w-full">
          {rooms?.getUserRooms?.name || ""}
        </Button>
      </div>
    </div>
  );
};


  {/* {rooms?.getUserRooms?.map((room: any) => (
        <Button key={room.id} variant="outline" className="w-full justify-start">
          {room.name}
        </Button>
      ))} */}