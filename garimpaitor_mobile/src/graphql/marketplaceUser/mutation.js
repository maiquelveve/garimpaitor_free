import { gql } from "@apollo/client";

export const DISABLE_MARKETPLACE_USER = gql`
  mutation disableMarketplaceUser($id: ID!) {
    disableMarketplaceUser(id: $id)
  }
`

export const ACTIVATE_MARKETPLACE_USER = gql`
  mutation activateMarketplaceUser($id: ID!) {
    activateMarketplaceUser(id: $id)
  }
`

export const ADD_MARKETPLACE_USER = gql`
  mutation addMarketplaceUser($user_id: ID!, $marketplace_id: ID!) {
    addMarketplaceUser(data: { user_id: $user_id, marketplace_id: $marketplace_id})
  }
`
