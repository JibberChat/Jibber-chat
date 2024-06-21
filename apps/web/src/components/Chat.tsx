import React from "react";
import {  GET_ROOMMESSAGES, ON_MESSAGE_ADDED, SEND_MESSAGE } from "@/http/chat";
import SendIcon from "./icons/send";
import { Button } from "./ui/button";

import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";

import { ChatHeader } from "./chat/ChatHeader";
import { ChatInput } from "./chat/ChatInput";
import { ChatMessage } from "./chat/ChatMessage";

export const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, message: "Hey, how's it going?", user: "JD", me: false },
    { id: 2, message: "I'm doing great, thanks for asking!", user: "Me", me: true },
  ]);

  const {subscribeToMore, data} = useQuery(GET_ROOMMESSAGES, { variables: { roomId: "1" } });
  console.log("data", data);

  const [sendMessage] = useMutation(SEND_MESSAGE);

  useEffect(() => {
    subscribeToMore({
      document: ON_MESSAGE_ADDED,
      variables: { roomId: "1" },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.userJoinedRoom;
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: prevMessages.length + 1, message: newMessage.text, user: "1", me: false },
        ]);
        return prev;
      },
    });
  }, []);
  
  return (
    <div className="flex flex-col">
      <ChatHeader />
      {/* <ChatMessages /> */}
      <div className="flex-1 overflow-auto p-6">
        <div className="grid gap-4">
          {messages.map(({id, message, user, me}) => (
              <ChatMessage key={id} message={message} sender={user} time={new Date()} avatarSrc={""} isMe={me} />
          ))}
        </div>
      </div>

      <ChatInput sendMessage={sendMessage}/>
    </div>
  );
}

