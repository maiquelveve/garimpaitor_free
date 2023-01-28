import { gql } from '@apollo/client';

export const LOGIN = gql`
  query login($email: String, $password: String) {
    login(data: {email: $email, password: $password})
    {
      id, name, email, status, token, avatarLink, isRoot, type
    }
  }
`;


export const GET_USER_BY_TOKEN = gql`
  query getUserByToken {
    getUserByToken
    {
      id, name, email, avatarLink, isRoot, type
    }
  }
`;

export const GET_ALL_USERS = gql`
  query getAllUsers($name: String) {
    getAllUsers(data: { name: $name}) {
      id, name, email, isRoot, status, type
    }
  }
`
