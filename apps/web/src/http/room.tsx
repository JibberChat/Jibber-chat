import { gql } from "../__generated__";

export const GET_USERROOMS = gql(`
  query getUserRooms {
    getUserRooms {
      id
      name
      messages {
        id
        text
        # userId
      }
    }
  }
`);

export const GET_UNREAD_USERROOMS = gql(`
  query getUnreadUserRooms {
    getUnreadUserRooms {
      id
      name
      messages {
        id
        text
        # userId
      }
    }
  }
`);

export const CREATE_ROOM = gql(`
  mutation createRoom($name: String!) {
    createRoom(name: $name) {
      id
      name
      messages {
        id
        text
        # userId
      }
    }
  }
`);

export const UPDATE_ROOM = gql(`
  mutation updateRoom($roomId: String!, $name: String!) {
    updateRoom(roomId: $roomId, name: $name) {
      id
      name
      messages {
        id
        text
        # userId
      }
    }
  }
`);

export const DELETE_ROOM = gql(`
  mutation deleteRoom($roomId: String!) {
    deleteRoom(roomId: $roomId)
  }
`);

export const LEAVE_ROOM = gql(`
  mutation leaveRoom($roomId: String!) {
    leaveRoom(roomId: $roomId)
  }
`);
