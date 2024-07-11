"use client";

import type { ChatRoom, CreateRoomInput, DeleteOrLeaveRoomInput, UpdateRoomInput } from "@/__generated__/graphql";
import { useMutation, useQuery } from "@apollo/client";
import React, { ReactNode, createContext, useContext, useMemo } from "react";

import { CREATE_ROOM, GET_USERROOMS, LEAVE_ROOM, UPDATE_ROOM } from "@/http/room";

interface RoomsContextType {
  rooms: ChatRoom[] | undefined;
  createNewRoom: (input: CreateRoomInput) => Promise<void>;
  updateRoomById: (input: UpdateRoomInput) => Promise<void>;
  leaveRoomById: (input: DeleteOrLeaveRoomInput) => Promise<void>;
  refetchRooms: () => void;
  loading: boolean;
}

const RoomsContext = createContext<RoomsContextType | undefined>(undefined);

export const useRooms = (): RoomsContextType => {
  const context = useContext(RoomsContext);
  if (!context) {
    throw new Error("useRooms must be used within a RoomsProvider");
  }
  return context;
};

export const RoomsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data, loading, refetch } = useQuery(GET_USERROOMS);
  const [createRoom] = useMutation(CREATE_ROOM);
  const [updateRoom] = useMutation(UPDATE_ROOM);
  const [leaveRoom] = useMutation(LEAVE_ROOM);

  const createNewRoom = async (input: CreateRoomInput) => {
    await createRoom({
      variables: { input },
    });
    refetch();
  };

  const updateRoomById = async (input: UpdateRoomInput) => {
    await updateRoom({
      variables: { input },
    });
    refetch();
  };

  const leaveRoomById = async (input: DeleteOrLeaveRoomInput) => {
    await leaveRoom({
      variables: { input },
    });
    refetch();
  };

  const value = useMemo(() => {
    return {
      rooms: data?.getUserRooms,
      createNewRoom,
      updateRoomById,
      leaveRoomById,
      refetchRooms: refetch,
      loading,
    };
  }, [data?.getUserRooms, createNewRoom, updateRoomById, leaveRoomById, refetch, loading]);

  return <RoomsContext.Provider value={value}>{children}</RoomsContext.Provider>;
};
