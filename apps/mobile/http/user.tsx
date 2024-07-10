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

export const CREATE_USER = gql(`
  mutation createUser($input: CreateUserInput!) {
    createUser(createUserInput: $input) {
      id
      name
      email
      createdAt
    }
  }
`);

export const UPDATE_USER = gql(`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(updateUserInput: $input) {
      id
      name
      email
      createdAt
    }
  }
`);
