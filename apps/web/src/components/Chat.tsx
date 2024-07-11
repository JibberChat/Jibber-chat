import type { ChatMessage as ChatMessageQuery, GetMeQuery } from "@/__generated__/graphql";
import { useChat } from "@/contexts/ChatContext";

import { ChatHeader } from "./chat/ChatHeader";
import { ChatInput } from "./chat/ChatInput";
import { ChatMessage } from "./chat/ChatMessage";

interface ChatProps {
  user: GetMeQuery["getMe"];
}

export const Chat: React.FC<Readonly<ChatProps>> = ({ user }) => {
  const { room, roomMessages, sendNewMessage } = useChat();
  if (!room) return null;

  return (
    <div className="flex flex-col overflow-hidden h-screen">
      <ChatHeader room={room} />
      <div className="overflow-y-auto p-6 flex flex-col h-full">
        {roomMessages
          ?.slice()
          .sort((a, b) => a.createdAt - b.createdAt)
          .map(({ id, text, createdAt, user: userMessage }: ChatMessageQuery) => (
            <ChatMessage
              key={id}
              message={text}
              sender={userMessage}
              date={new Date(createdAt)}
              avatarSrc={""}
              isMe={userMessage.id === user.id}
            />
          ))}
      </div>
      <ChatInput sendMessage={(message: string) => sendNewMessage(message)} />
    </div>
  );
};
