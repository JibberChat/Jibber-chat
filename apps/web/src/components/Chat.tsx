import { useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { Room } from "types/room.type";

import { ChatHeader } from "./chat/ChatHeader";
import { ChatInput } from "./chat/ChatInput";
import { ChatMessage } from "./chat/ChatMessage";

import { GET_ROOMMESSAGES, ON_MESSAGE_ADDED, SEND_MESSAGE } from "@/http/chat";

interface ChatProps {
  room: Room;
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
        return {
          getRoomMessages: [
            ...prev.getRoomMessages,
            { id: newMessage.id, text: newMessage.text, user: newMessage.user },
          ],
        };
      },
    });
  }, []);

  return (
    <div className="flex flex-col">
      <ChatHeader room={room} />
      {/* <ChatMessages /> */}
      <div className="flex-1 overflow-auto p-6">
        <div className="grid gap-4">
          {data?.getRoomMessages.map(
            ({ id, text, user }: { id: string; text: string; user: { name: string }; me: boolean }, index: number) => (
              <ChatMessage
                key={id}
                message={text}
                sender={user}
                time={new Date()}
                avatarSrc={""}
                isMe={index % 2 === 0}
              />
            )
          )}
        </div>
      </div>

      <ChatInput sendMessage={(message: string) => sendMessage({ variables: { roomId: room.id, message } })} />
    </div>
  );
};
