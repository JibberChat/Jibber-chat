"use client";

import { useQuery } from "@apollo/client";
import { UserResource } from "@clerk/types";
import { useState } from "react";
import { Room } from "types/room.type";

import { GET_USERROOMS } from "@/http/room";

import { AuthGuard } from "@/components/AuthGuard";
import { Chat } from "@/components/Chat";
import { Sidebar } from "@/components/Sidebar";

function Home({ user }: Readonly<{ user: UserResource }>) {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const { data: rooms, loading } = useQuery(GET_USERROOMS);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid min-h-screen w-full grid-cols-[280px_1fr]">
      <Sidebar rooms={rooms.getUserRooms} setSelectedRoom={(room: Room) => setSelectedRoom(room)} />
      {selectedRoom ? <Chat room={selectedRoom} /> : <p>No room</p>}
    </div>
  );
}

const AuthorizationHome = () => {
  return <AuthGuard render={Home} />;
};

export default AuthorizationHome;
