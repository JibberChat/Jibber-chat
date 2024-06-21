"use client";

import { useQuery } from "@apollo/client";
import { GET_USERROOMS } from "@/http/room";
import { Chat } from "@/components/Chat";
import { Sidebar } from "@/components/Sidebar";

export default function Home() {
  const { data: rooms } = useQuery(GET_USERROOMS);
  console.log("rooms", rooms?.getUserRooms);

  return (
    <div className="grid min-h-screen w-full grid-cols-[280px_1fr]">
        <Sidebar/>
        <Chat />
    </div>
  );
}
