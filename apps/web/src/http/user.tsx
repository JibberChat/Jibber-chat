import { gql } from "../__generated__";

const GET_ME = gql(`
  query getMe {
    getMe {
      id
      name
      email
      createdAt
    }
  }
`);

const GET_USER_PROFILE = gql(`
  query getUserProfile($userId: String!) {
    getUserProfile(userId: $userId) {
      id
      name
      email
      createdAt
    }
  }
`);

const UPDATE_USER = gql(`
  mutation updateUser($userId: String!, $name: String!, $email: String!) {
    updateUser(userId: $userId, name: $name, email: $email) {
      id
      name
      email
      createdAt
    }
  }
`);

export { GET_ME, GET_USER_PROFILE };
export { UPDATE_USER };
