import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
import { parseCookies } from 'nookies';

import { NAME_COOKIES_USER_TOKEN } from './constant';

const uploadLink = createUploadLink({
  uri: 'http://localhost:4000'
});

const authLink = setContext((_, { headers }) => {

  const cookies = parseCookies();
  const token = cookies[NAME_COOKIES_USER_TOKEN]

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
