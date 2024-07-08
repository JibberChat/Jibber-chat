import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface ChatMessageProps {
    sender: string;
    message: string;
    time: Date;
    avatarSrc: string;
    isMe: boolean
}

export const ChatMessage = ({ sender, message, time, avatarSrc, isMe }: ChatMessageProps) => {
    return (
      <div className={`flex items-start gap-4 ${isMe ? "justify-end" : ""}`}>
        {!isMe && (
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatarSrc} />
            <AvatarFallback>{sender.slice(0, 2)}</AvatarFallback>
          </Avatar>
        )}
        <div className="grid gap-1">
          <div className={`rounded-lg ${isMe ? "bg-primary text-primary-foreground" : "bg-muted"} p-3 text-sm`}>
            <p>{message}</p>
          </div>
          {/* <div className="text-xs text-muted-foreground">{time.toISOString()}</div> */}
        </div>
        {isMe && (
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatarSrc} />
            <AvatarFallback>{sender.slice(0, 2)}</AvatarFallback>
          </Avatar>
        )}
      </div>
    );
  }