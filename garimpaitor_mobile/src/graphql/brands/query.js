import { gql } from '@apollo/client';

export const GET_BRAND_NAME = gql`
  query getBrandName($name: String!) {
    getBrandName(name: $name) {
      id
      name
      status
      verified
      network {
        id
        name
      }
    }
  }
`

export const GET_FOR_NETWORK = gql`
  query getForNetwork($network_id: ID!) {
    getForNetwork(network_id: $network_id) {
      id
      name
    }
  }
`
