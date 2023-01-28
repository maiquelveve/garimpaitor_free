import { gql } from '@apollo/client';

export const GET_CITYS = gql`
  query getCitys($state_id: ID!){
    getCitys(state_id: $state_id) {
      id
      name
      state {
        id
        name
        initial
        country {
          id
          name
          initial
        }
      }
    }
  }
`

export const GET_STATES = gql`
  query getStates {
    getStates {
      id
      name
      initial
      country {
        id
        initial
        name
      }
    }
  }
`
