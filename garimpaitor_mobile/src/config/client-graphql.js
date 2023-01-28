import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { URL_API } from './constants';

const uploadLink = createUploadLink({
  uri: URL_API
});

const authLink = setContext(async (_, { headers }) => {

  const token = await AsyncStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authtoken: token ? token : ""
    }
  }
});

export const client = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getAllUsers: {
            merge(_, incoming) {
              return incoming;
            }
          },
          getNetworkName: {
            merge(_, incoming) {
              return incoming;
            }
          },
          getBrandName: {
            merge(_, incoming) {
              return incoming;
            }
          },
          getMarketplaceFilters: {
            merge(_, incoming) {
              return incoming;
            }
          },
          getUserByToken: {
            merge(_, incoming) {
              return incoming;
            }
          },
        }
      }
    }
  })
});
