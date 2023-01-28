import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation ($name: String, $email: String, $password: String) {
    createUser(data: {name: $name, email: $email, password: $password})
    {
      id, name, email, status
    }
  }
`;

export const UPDATE_USER = gql`
  mutation ($id: ID!, $name: String, $email: String ) {
    updateUser(id: $id, data: { name: $name, email: $email})
  }
`

export const CHANGE_PASSWORD = gql`
  mutation ($id: ID!, $currentPassword: String!, $newPassword: String!) {
    changePassword(id: $id, currentPassword: $currentPassword, newPassword: $newPassword)
  }
`

export const RESET_PASSWORD = gql`
  mutation ($email: String!) {
    resetPassword(email: $email)
  }
`

export const DISABLE_USER = gql`
  mutation ($id: ID!) {
    disableUser(id: $id)
  }
`

export const DISABLE_USER_ROOT = gql`
  mutation ($user_id: ID!) {
    disableUserRoot(user_id: $user_id)
  }
`

export const ACTIVATE_USER_ROOT = gql`
  mutation ($user_id: ID!) {
    activateUserRoot(user_id: $user_id)
  }
`

export const CHANGE_PERMISSION_ROOT = gql`
  mutation ($user_id: ID! $permission: String!){
    changePermissionRoot(user_id: $user_id, permission: $permission)
  }
`
