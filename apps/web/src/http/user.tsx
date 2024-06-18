import { gql } from "../__generated__";

export const GET_ME = gql(`
  query getMe {
    getMe {
      id
      name
      email
      createdAt
    }
  }
`);

export const GET_USER_PROFILE = gql(`
  query getUserProfile($userId: String!) {
    getUserProfile(userId: $userId) {
      id
      name
      email
      createdAt
    }
  }
`);

export const UPDATE_USER = gql(`
  mutation updateUser($userId: String!, $name: String!, $email: String!) {
    updateUser(userId: $userId, name: $name, email: $email) {
      id
      name
      email
      createdAt
    }
  }
`);
