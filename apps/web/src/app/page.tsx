"use client";

import type { ChatRoom, GetMeQuery } from "@/__generated__/graphql";
import { useQuery } from "@apollo/client";
import { useState } from "react";

import { GET_USERROOMS } from "@/http/room";

import { AuthGuard } from "@/components/AuthGuard";
import { Chat } from "@/components/Chat";
import { Sidebar } from "@/components/Sidebar";

function Home({ user }: Readonly<{ user: GetMeQuery["getMe"] }>) {
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const { data: rooms, loading } = useQuery(GET_USERROOMS);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid min-h-screen w-full grid-cols-[280px_1fr] overflow-hidden">
      <Sidebar user={user} rooms={rooms?.getUserRooms} setSelectedRoom={(room: ChatRoom) => setSelectedRoom(room)} />
      {selectedRoom ? <Chat user={user} room={selectedRoom} /> : <p>No room</p>}
    </div>
  );
}

const AuthorizationHome = () => {
  return <AuthGuard render={Home} />;
};

export default AuthorizationHome;
