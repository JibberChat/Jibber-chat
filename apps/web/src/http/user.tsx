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

export { GET_ME, GET_USER_PROFILE };
