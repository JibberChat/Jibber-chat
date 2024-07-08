import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface ChatMessageProps {
  sender: { name: string };
  message: string;
  time: Date;
  avatarSrc: string;
  isMe: boolean;
}

export const ChatMessage = ({ sender, message, time, avatarSrc, isMe }: ChatMessageProps) => {
  const displayAvatar = (
    <Avatar className="h-10 w-10">
      <AvatarImage src="/placeholder-user.jpg" />
      <AvatarFallback>{sender.name.slice(0, 2)}</AvatarFallback>
    </Avatar>
  );

  return (
    <div className={`flex items-start gap-4 ${isMe ? "justify-end" : ""}`}>
      {!isMe && <>{displayAvatar}</>}
      <div className="grid gap-1">
        <div className={`rounded-lg ${isMe ? "bg-primary text-primary-foreground" : "bg-muted"} p-3 text-sm`}>
          <p>{message}</p>
        </div>
        {/* <div className="text-xs text-muted-foreground">{time.toISOString()}</div> */}
      </div>
      {isMe && <>{displayAvatar}</>}
    </div>
  );
};
