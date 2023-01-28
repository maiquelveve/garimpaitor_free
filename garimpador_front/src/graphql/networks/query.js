import { gql } from '@apollo/client';

export const GET_NETWORK_NAME = gql`
  query getNetworkName($name: String!) {
    getNetworkName(name: $name) {
      id name status verified
    }
  }
`

export const GET_ALL_NETWORKS = gql`
  query getAllNetworks {
    getAllNetworks {
      id name
    }
  }
`
