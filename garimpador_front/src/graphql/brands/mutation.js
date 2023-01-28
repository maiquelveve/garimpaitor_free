import { gql } from '@apollo/client';

export const CREATE_BRAND = gql`
  mutation createBrand($name: String!, $network_id: ID!) {
    createBrand(data: { name: $name, network_id: $network_id }) {
      id name status verified network { id name }
    }
  }
`

export const CREATE_BRAND_SYSTEM = gql`
  mutation createBrandSystem($name: String!, $network_id: ID!) {
    createBrandSystem(data: { name: $name, network_id: $network_id }) {
      id name status verified network { id name }
    }
  }
`

export const UPDATE_BRAND = gql`
  mutation updateBrand($id: ID!, $name: String!, $network_id: ID!) {
    updateBrand(id: $id, data: { name: $name, network_id: $network_id }) {
      id name status verified network { id name }
    }
  }
`

export const ACTIVATE_BRAND = gql`
  mutation activateBrand($id: ID!) {
    activateBrand(id: $id)
  }
`

export const DISABLE_BRAND = gql`
  mutation disableBrand($id: ID!) {
    disableBrand(id: $id)
  }
`

export const VERIFY_BRAND = gql`
  mutation verifyBrand($id: ID!) {
    verifyBrand(id: $id)
  }
`
