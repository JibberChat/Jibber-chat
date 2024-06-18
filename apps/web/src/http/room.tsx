import { gql } from "../__generated__";

const GET_USERROOMS = gql(`
  query getUserRooms {
    getUserRooms {
      id
      name
      messages {
        id
        message
        userId
      }
    }
  }
`);

const GET_UNREAD_USERROOMS = gql(`
  query getUnreadUserRooms {
    getUnreadUserRooms {
      id
      name
      messages {
        id
        message
        userId
      }
    }
  }
`);

const CREATE_ROOM = gql(`
  mutation createRoom($name: String!) {
    createRoom(name: $name) {
      id
      name
      messages {
        id
        message
        userId
      }
    }
  }
`);

const UPDATE_ROOM = gql(`
  mutation updateRoom($roomId: String!, $name: String!) {
    updateRoom(roomId: $roomId, name: $name) {
      id
      name
      messages {
        id
        message
        userId
      }
    }
  }
`);

const DELETE_ROOM = gql(`
  mutation deleteRoom($roomId: String!) {
    deleteRoom(roomId: $roomId)
  }
`);

const LEAVE_ROOM = gql(`
  mutation leaveRoom($roomId: String!) {
    leaveRoom(roomId: $roomId)
  }
`);

export { GET_USERROOMS, GET_UNREAD_USERROOMS };
export { CREATE_ROOM, UPDATE_ROOM, DELETE_ROOM, LEAVE_ROOM };
