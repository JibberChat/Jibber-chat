import type { ChatMessage as ChatMessageQuery, ChatRoom } from "@/__generated__/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";

import { ChatHeader } from "./chat/ChatHeader";
import { ChatInput } from "./chat/ChatInput";
import { ChatMessage } from "./chat/ChatMessage";

import { GET_ROOMMESSAGES, ON_MESSAGE_ADDED, SEND_MESSAGE } from "@/http/chat";

interface ChatProps {
  room: ChatRoom;
}

export const Chat: React.FC<Readonly<ChatProps>> = ({ room }) => {
  const { subscribeToMore, data } = useQuery(GET_ROOMMESSAGES, { variables: { roomId: room.id } });

  const [sendMessage] = useMutation(SEND_MESSAGE);

  useEffect(() => {
    subscribeToMore({
      document: ON_MESSAGE_ADDED,
      variables: { roomId: room.id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.userJoinedRoom;
        console.log(newMessage);
        return {
          getRoomMessages: [...prev.getRoomMessages, newMessage],
        };
      },
    });
  }, [room.id, subscribeToMore]);

  return (
    <div className="flex flex-col overflow-hidden h-screen">
      <ChatHeader room={room} />
      <div className="overflow-y-auto p-6 flex flex-col h-full">
        {data?.getRoomMessages
          ?.slice()
          .sort((a, b) => a.createdAt - b.createdAt)
          .map(({ id, text, createdAt, user }: ChatMessageQuery, index: number) => (
            <ChatMessage
              key={id}
              message={text}
              sender={user}
              date={new Date(createdAt)}
              avatarSrc={""}
              isMe={index % 2 === 0}
            />
          ))}
      </div>
      <ChatInput sendMessage={(message: string) => sendMessage({ variables: { roomId: room.id, message } })} />
    </div>
  );
};
