import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useLazyQuery } from '@apollo/client';
import { GET_USER_BY_TOKEN } from '../graphql/users/query';

import AlertCatchSystem from '../components/AlertCatchSystem';

const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [userCurrent, setUserCurrent] = useState(null);
  const [loading, setloading] = useState(true);


  /***************************************************************/
  /*************** BEGINNING CONFIGURATIONS GRAPHQL **************/
  /***************************************************************/

  /********* GET USERS BY TOKEN  ***********/
  const optionsQueryUserByToken = {
    onCompleted(data) {
      setUserCurrent(data.getUserByToken);
    },
    onError() {
      AlertCatchSystem();
    },
    fetchPolicy: 'network-only'
  };
  const [getUserByToken, { loading: loadingQueryGetUserByToken }] = useLazyQuery(GET_USER_BY_TOKEN, optionsQueryUserByToken);

  /***************************************************************/
  /******************* END CONFIGURATIONS GRAPHQL ****************/
  /***************************************************************/


  useEffect(() => {
    const loadingStorage = async () => {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        await getUserByToken();
      }

      setloading(loadingQueryGetUserByToken);
    }
    loadingStorage();

  }, []);

  const setLoggedUser = async (data) => {
    await AsyncStorage.setItem('token', data.token);
    setUserCurrent(data);
  }

  const updateUserCurrent = async (data) => {
    setUserCurrent(data);
  }

  const getToken = async () => {
    return await AsyncStorage.getItem('token');
  }

  const logout = async () => {
    setUserCurrent(null);
    await AsyncStorage.clear();
  }

  return (
    <AuthContext.Provider
      value={{
        setLoggedUser,
        logout,
        updateUserCurrent,
        getToken,
        userCurrent,
        isLogged: !!userCurrent,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  return authContext;
}
