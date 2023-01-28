import { gql } from '@apollo/client';

export const CREATE_NETWORK = gql`
  mutation createNetwork($name: String!) {
    createNetwork(data: { name: $name}) {
      id name status verified
    }
  }
`

export const CREATE_NETWORK_SYSTEM = gql`
  mutation createNetworkSystem($name: String!) {
    createNetworkSystem(data: { name: $name}) {
      id name status verified
    }
  }
`

export const UPDATE_NETWORK = gql`
  mutation updateNetwork($id: ID!, $name: String!) {
    updateNetwork(id: $id, data: { name: $name}) {
      id name status verified
    }
  }
`

export const ACTIVATE_NETWORK = gql`
  mutation activateNetwork($id: ID!) {
    activateNetwork(id: $id)
  }
`

export const DISABLE_NETWORK = gql`
  mutation disableNetwork($id: ID!) {
    disableNetwork(id: $id)
  }
`

export const VERIFY_NETWORK = gql`
  mutation verifyNetwork($id: ID!) {
    verifyNetwork(id: $id)
  }
`
