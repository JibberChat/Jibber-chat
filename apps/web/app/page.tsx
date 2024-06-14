"use client";

import SendMessage from "@/SendMessage";
import MessageList from "@/MessageList";
import { useQuery } from "@apollo/client";
import { GET_USERROOMS } from "@/http/room";

export default function Home() {
  const { data: rooms } = useQuery(GET_USERROOMS);
  console.log("rooms", rooms?.getUserRooms);

  return (
    <div>
      <h1>Chat Application</h1>
      <MessageList />
      <SendMessage />
    </div>
  );
}
