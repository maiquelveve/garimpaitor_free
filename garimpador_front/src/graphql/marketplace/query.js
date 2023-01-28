import { gql } from '@apollo/client';

export const GET_MARKETPLACES_FILTERS = gql`
  query getMarketplaceFilters($brand: String, $network: String, $cnpj: String, $city: String) {
    getMarketplaceFilters(brand: $brand, network: $network, cnpj: $cnpj, city: $city) {
      id
      cnpj
      status
      isMyMarketplace
      marketplaceUserStatus
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

export const GET_MARKETPLACES_ID = gql`
  query getMarketplaceId($id: ID!) {
    getMarketplaceId(id: $id) {
      id
      cnpj
      status
      cep
      complement
      street
      number
      neighborhood
      city {
        id
        name
        state {
          id
          initial
          name
        }
      }
      brand {
        id
        network {
          id
        }
      }
    }
  }
`
