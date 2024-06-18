"use client";

import { useQuery } from "@apollo/client";
import { GET_USERROOMS } from "@/http/room";
import { Chat } from "@/components/Chat";
import { Sidebar } from "@/components/Sidebar";

export default function Home() {
  const { data: rooms } = useQuery(GET_USERROOMS);
  console.log("rooms", rooms?.getUserRooms);

  return (
    <div className="flex h-screen w-full flex-col bg-gray-100 dark:bg-gray-900">
      {/* <Header /> */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar/>
        <Chat />
      </div>
    </div>
  );
}
