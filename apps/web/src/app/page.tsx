"use client";

import type { GetMeQuery } from "@/__generated__/graphql";
import { useChat } from "@/contexts/ChatContext";

import { AuthGuard } from "@/components/AuthGuard";
import { Chat } from "@/components/Chat";
import { Sidebar } from "@/components/Sidebar";

function Home({ user }: Readonly<{ user: GetMeQuery["getMe"] }>) {
  const { room } = useChat();

  return (
    <div className="grid min-h-screen w-full grid-cols-[280px_1fr] overflow-hidden">
      <Sidebar user={user} />
      {room ? <Chat user={user} /> : <p>No room</p>}
    </div>
  );
}

const AuthorizationHome = () => {
  return <AuthGuard render={Home} />;
};

export default AuthorizationHome;
