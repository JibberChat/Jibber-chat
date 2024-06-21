import { gql } from "@/__generated__";

export const GET_ROOMMESSAGES = gql(`
  query getRoomMessages($roomId: String!) {
    getRoomMessages(roomId: $roomId) {
      messages {
        id
        text
        # userId
      }
    }
  }
`);

export const SEND_MESSAGE = gql(`
  mutation SendMessage($roomId: String!, $message: String!) {
    sendMessage(roomId: $roomId, message: $message) {
      # userId
      id
      text
    }
  }
`);

export const ON_MESSAGE_ADDED = gql(`
  subscription userJoinedRoom($roomId: String!) {
    userJoinedRoom(roomId: $roomId) {
      # userId
      id
      text
    }
  }
`);
