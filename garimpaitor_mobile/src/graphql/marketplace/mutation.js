import { gql } from "@apollo/client";

export const CREATE_MARKETPLACE = gql`
  mutation createMarketplace(
    $cnpj: String!,
	  $street: String!,
	  $number: String,
	  $neighborhood: String,
	  $cep: String,
	  $complement: String,
	  $city_id: ID!,
	  $brand_id: ID!,
  ) {
    createMarketplace(
      data:{
        cnpj: $cnpj
        street: $street,
        number: $number,
        neighborhood: $neighborhood,
        cep: $cep,
        complement: $complement,
        city_id: $city_id,
        brand_id: $brand_id,
      }
    ) {
      id
      cnpj
      status
      city {
        name
        state {
          initial
        }
      }
      brand {
        name
        network {
          name
        }
      }
    }
  }
`

export const CREATE_MARKETPLACE_SYSTEM = gql`
  mutation createMarketplaceSystem(
    $cnpj: String!,
	  $street: String!,
	  $number: String,
	  $neighborhood: String,
	  $cep: String,
	  $complement: String,
	  $city_id: ID!,
	  $brand_id: ID!,
  ) {
    createMarketplaceSystem(
      data:{
        cnpj: $cnpj
        street: $street,
        number: $number,
        neighborhood: $neighborhood,
        cep: $cep,
        complement: $complement,
        city_id: $city_id,
        brand_id: $brand_id,
      }
    ) {
      id
      cnpj
      status
      city {
        name
        state {
          initial
        }
      }
      brand {
        name
        network {
          name
        }
      }
    }
  }
`

export const UPDATE_MARKETPLACE = gql`
  mutation updateMarketplace(
    $id: ID!
    $cnpj: String!,
	  $street: String!,
	  $number: String,
	  $neighborhood: String,
	  $cep: String,
	  $complement: String,
	  $city_id: ID!,
	  $brand_id: ID!,
  ) {
    updateMarketplace(
      id: $id,
      data: {
        cnpj: $cnpj
        street: $street,
        number: $number,
        neighborhood: $neighborhood,
        cep: $cep,
        complement: $complement,
        city_id: $city_id,
        brand_id: $brand_id
      }
    )
  }
`

export const DISABLE_MARKETPLACE_SYSTEM = gql`
  mutation disableMarketplaceSystem($id: ID!) {
    disableMarketplaceSystem(id: $id)
  }
`

export const ACTIVATE_MARKETPLACE_SYSTEM = gql`
  mutation activateMarketplaceSystem($id: ID!) {
    activateMarketplaceSystem(id: $id)
  }
`
