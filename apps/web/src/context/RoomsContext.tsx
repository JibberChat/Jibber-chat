import React, { createContext, useContext, ReactNode } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USERROOMS, CREATE_ROOM, UPDATE_ROOM, LEAVE_ROOM } from '@/http/room';
import type { ChatRoom } from '@/__generated__/graphql';

interface RoomsContextType {
  rooms: ChatRoom[] | undefined;
  createNewRoom: (name: string) => Promise<void>;
  updateRoomById: (roomId: string, name: string) => Promise<void>;
  leaveRoomById: (roomId: string) => Promise<void>;
  refetchRooms: () => void;
  loading: boolean;
}

const RoomsContext = createContext<RoomsContextType | undefined>(undefined);

export const useRooms = (): RoomsContextType => {
  const context = useContext(RoomsContext);
  if (!context) {
    throw new Error('useRooms must be used within a RoomsProvider');
  }
  return context;
};

export const RoomsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data, loading, refetch } = useQuery(GET_USERROOMS);
  const [createRoom] = useMutation(CREATE_ROOM);
  const [updateRoom] = useMutation(UPDATE_ROOM);
  const [leaveRoom] = useMutation(LEAVE_ROOM);

  const createNewRoom = async (name: string) => {
    await createRoom({
      variables: {
        input: { name },
      },
    });
    refetch();
  };

  const updateRoomById = async (roomId: string, name: string) => {
    await updateRoom({
      variables: {
        input: { roomId, name },
      },
    });
    refetch();
  };

  const leaveRoomById = async (roomId: string) => {
    await leaveRoom({
      variables: {
        input: { roomId },
      },
    });
    refetch();
  };

  const refetchRooms = () => {
    refetch();
  };

  return (
    <RoomsContext.Provider
      value={{
        rooms: data?.getUserRooms,
        createNewRoom,
        updateRoomById,
        leaveRoomById,
        refetchRooms,
        loading,
      }}
    >
      {children}
    </RoomsContext.Provider>
  );
};