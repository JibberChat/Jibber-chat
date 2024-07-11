"use client";

import type { ChatMessage, ChatRoom } from "@/__generated__/graphql";
import { useMutation, useQuery } from "@apollo/client";
import React, { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { GET_ROOMMESSAGES, ON_MESSAGE_ADDED, SEND_MESSAGE } from "@/http/chat";

interface ChatContextType {
  room: ChatRoom | undefined;
  roomMessages: ChatMessage[];
  sendNewMessage: (message: string) => Promise<void>;
  setRoom: (room: ChatRoom) => void;
  loadingMessage: boolean;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | undefined>(undefined);

  const { subscribeToMore, data, loading, refetch } = useQuery(GET_ROOMMESSAGES, {
    variables: selectedRoom ? { roomId: selectedRoom.id } : undefined,
    skip: !selectedRoom,
  });

  const [sendMessage, { loading: sendingMessage }] = useMutation(SEND_MESSAGE);

  const sendNewMessage = useCallback(
    async (message: string) => {
      if (!selectedRoom) return;
      await sendMessage({ variables: { roomId: selectedRoom.id, message } });
      refetch();
    },
    [selectedRoom, sendMessage, refetch]
  );

  const setRoom = useCallback(
    (room: ChatRoom) => {
      setSelectedRoom(room);
      refetch({ roomId: room.id });
    },
    [refetch]
  );

  const roomMessages = data?.getRoomMessages || [];

  useEffect(() => {
    if (!selectedRoom) return;
    const unsubscribe = subscribeToMore({
      document: ON_MESSAGE_ADDED,
      variables: { roomId: selectedRoom.id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.userJoinedRoom;
        return {
          getRoomMessages: [...prev.getRoomMessages, newMessage],
        };
      },
    });
    return () => unsubscribe();
  }, [selectedRoom, subscribeToMore]);

  const value: ChatContextType = useMemo(
    () => ({
      room: selectedRoom,
      roomMessages,
      setRoom,
      sendNewMessage,
      loadingMessage: loading || sendingMessage,
    }),
    [selectedRoom, roomMessages, setRoom, sendNewMessage, loading, sendingMessage]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
