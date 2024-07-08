import { gql } from "../__generated__";

export const GET_USERROOMS = gql(`
  query getUserRooms {
    getUserRooms {
      id
      name
    }
  }
`);

export const GET_UNREAD_USERROOMS = gql(`
  query getUnreadUserRooms {
    getUnreadUserRooms {
      id
      name
    }
  }
`);

export const CREATE_ROOM = gql(`
  mutation createRoom($input: CreateRoomInput!) {
    createRoom(createRoomInput: $input) {
      id
      name
    }
  }
`);

export const UPDATE_ROOM = gql(`
  mutation updateRoom($input: UpdateRoomInput!) {
    updateRoom(updateRoomInput: $input) {
      id
      name
    }
  }
`);

export const DELETE_ROOM = gql(`
  mutation deleteRoom($input: DeleteOrLeaveRoomInput!) {
    deleteRoom(deleteRoomInput: $input)
  }
`);

export const LEAVE_ROOM = gql(`
  mutation leaveRoom($input: DeleteOrLeaveRoomInput!) {
    leaveRoom(leaveRoomInput: $input) 
  }
`);
