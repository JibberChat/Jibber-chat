/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query getRoomMessages($roomId: String!) {\n    getRoomMessages(roomId: $roomId) {\n      messages {\n        id\n        text\n        user {\n          name\n        }\n      }\n    }\n  }\n": types.GetRoomMessagesDocument,
    "\n  mutation SendMessage($roomId: String!, $message: String!) {\n    sendMessage(roomId: $roomId, message: $message) {\n      id\n      text\n    }\n  }\n": types.SendMessageDocument,
    "\n  subscription userJoinedRoom($roomId: String!) {\n    userJoinedRoom(roomId: $roomId) {\n      # userId\n      id\n      text\n    }\n  }\n": types.UserJoinedRoomDocument,
    "\n  query getUserRooms {\n    getUserRooms {\n      id\n      name\n    }\n  }\n": types.GetUserRoomsDocument,
    "\n  query getUnreadUserRooms {\n    getUnreadUserRooms {\n      id\n      name\n    }\n  }\n": types.GetUnreadUserRoomsDocument,
    "\n  mutation createRoom($name: String!) {\n    createRoom(name: $name) {\n      id\n      name\n    }\n  }\n": types.CreateRoomDocument,
    "\n  mutation updateRoom($roomId: String!, $name: String!) {\n    updateRoom(roomId: $roomId, name: $name) {\n      id\n      name\n    }\n  }\n": types.UpdateRoomDocument,
    "\n  mutation deleteRoom($roomId: String!) {\n    deleteRoom(roomId: $roomId)\n  }\n": types.DeleteRoomDocument,
    "\n  mutation leaveRoom($roomId: String!) {\n    leaveRoom(roomId: $roomId)\n  }\n": types.LeaveRoomDocument,
    "\n  query getMe {\n    getMe {\n      id\n      name\n      email\n      createdAt\n    }\n  }\n": types.GetMeDocument,
    "\n  query getUserProfile($userId: String!) {\n    getUserProfile(userId: $userId) {\n      id\n      name\n      email\n      createdAt\n    }\n  }\n": types.GetUserProfileDocument,
    "\n  mutation updateUser($userId: String!, $name: String!, $email: String!) {\n    updateUser(userId: $userId, name: $name, email: $email) {\n      id\n      name\n      email\n      createdAt\n    }\n  }\n": types.UpdateUserDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getRoomMessages($roomId: String!) {\n    getRoomMessages(roomId: $roomId) {\n      messages {\n        id\n        text\n        user {\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getRoomMessages($roomId: String!) {\n    getRoomMessages(roomId: $roomId) {\n      messages {\n        id\n        text\n        user {\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SendMessage($roomId: String!, $message: String!) {\n    sendMessage(roomId: $roomId, message: $message) {\n      id\n      text\n    }\n  }\n"): (typeof documents)["\n  mutation SendMessage($roomId: String!, $message: String!) {\n    sendMessage(roomId: $roomId, message: $message) {\n      id\n      text\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription userJoinedRoom($roomId: String!) {\n    userJoinedRoom(roomId: $roomId) {\n      # userId\n      id\n      text\n    }\n  }\n"): (typeof documents)["\n  subscription userJoinedRoom($roomId: String!) {\n    userJoinedRoom(roomId: $roomId) {\n      # userId\n      id\n      text\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getUserRooms {\n    getUserRooms {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query getUserRooms {\n    getUserRooms {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getUnreadUserRooms {\n    getUnreadUserRooms {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query getUnreadUserRooms {\n    getUnreadUserRooms {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createRoom($name: String!) {\n    createRoom(name: $name) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation createRoom($name: String!) {\n    createRoom(name: $name) {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation updateRoom($roomId: String!, $name: String!) {\n    updateRoom(roomId: $roomId, name: $name) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation updateRoom($roomId: String!, $name: String!) {\n    updateRoom(roomId: $roomId, name: $name) {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation deleteRoom($roomId: String!) {\n    deleteRoom(roomId: $roomId)\n  }\n"): (typeof documents)["\n  mutation deleteRoom($roomId: String!) {\n    deleteRoom(roomId: $roomId)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation leaveRoom($roomId: String!) {\n    leaveRoom(roomId: $roomId)\n  }\n"): (typeof documents)["\n  mutation leaveRoom($roomId: String!) {\n    leaveRoom(roomId: $roomId)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getMe {\n    getMe {\n      id\n      name\n      email\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query getMe {\n    getMe {\n      id\n      name\n      email\n      createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getUserProfile($userId: String!) {\n    getUserProfile(userId: $userId) {\n      id\n      name\n      email\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query getUserProfile($userId: String!) {\n    getUserProfile(userId: $userId) {\n      id\n      name\n      email\n      createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation updateUser($userId: String!, $name: String!, $email: String!) {\n    updateUser(userId: $userId, name: $name, email: $email) {\n      id\n      name\n      email\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation updateUser($userId: String!, $name: String!, $email: String!) {\n    updateUser(userId: $userId, name: $name, email: $email) {\n      id\n      name\n      email\n      createdAt\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;