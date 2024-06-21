"use client";

import { useQuery } from "@apollo/client";
import { SignOutButton } from "@clerk/clerk-react";

import { GET_USERROOMS } from "@/http/room";

import { AuthGuard } from "@/components/AuthGuard";
import { Chat } from "@/components/Chat";
import { Sidebar } from "@/components/Sidebar";

function Home() {
  const { data: rooms } = useQuery(GET_USERROOMS);
  console.log("rooms", rooms?.getUserRooms);

  return (
    <div className="flex h-screen w-full flex-col bg-gray-100 dark:bg-gray-900">
      {/* <Header /> */}
      <div className="flex flex-1 overflow-hidden">
        <SignOutButton />
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

const AuthorizationHome = () => {
  return (
    <AuthGuard>
      <Home />
    </AuthGuard>
  );
};

export default AuthorizationHome;
