"use client";

import { useQuery } from "@apollo/client";
import { UserResource } from "@clerk/types";
import { useState } from "react";

import { GET_USERROOMS } from "@/http/room";

import { AuthGuard } from "@/components/AuthGuard";
import { Chat } from "@/components/Chat";
import { Sidebar } from "@/components/Sidebar";

function Home({ user }: Readonly<{ user: UserResource }>) {
  const [selectedRoom] = useState(null);
  const { data: rooms } = useQuery(GET_USERROOMS);
  console.log("rooms", rooms?.getUserRooms);

  return (
    <div className="grid min-h-screen w-full grid-cols-[280px_1fr]">
      <Sidebar />
      {selectedRoom ? <Chat selectedRoom={selectedRoom} />: <p>No room</p>}
    </div>
  );
}

const AuthorizationHome = () => {
  return <AuthGuard render={Home} />;
};

export default AuthorizationHome;
