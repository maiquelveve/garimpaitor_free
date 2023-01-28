import React, { createContext, useContext, useEffect, useState } from 'react';
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { NAME_COOKIES_USER_TOKEN } from 'src/config/constant';

import { useLazyQuery } from '@apollo/client';
import { GET_USER_BY_TOKEN } from 'src/graphql/users/query';

import { menusUser, menusUserAdim, menusUserMarketplace, menusUserNotlogedIn } from 'src/config/menus';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [userCurrent, setUserCurrent] = useState(null)
  const [getUserByToken] = useLazyQuery(GET_USER_BY_TOKEN)

  useEffect(async () => {
    const { data } = await getUserByToken();

    if (data) {
      setUserCurrent(data.getUserByToken)
    }

  }, [])

  const getToken = () => {
    const cookies = parseCookies();
    return cookies[NAME_COOKIES_USER_TOKEN]
  }

  const setToken = (token) => {
    setCookie(undefined, NAME_COOKIES_USER_TOKEN, token, {
      maxAge: (60 * 60 * 24) * 7 // one week
    });
  }

  const getMenusUser = async () => {
    const token = getToken();

    if (!token) {
      return menusUserNotlogedIn;
    }

    const { data } = await getUserByToken();
    let menus;
    switch (data?.getUserByToken.type) {
      case "A":
        menus = menusUserAdim;
        break;

      case "M":
        menus = menusUserMarketplace;
        break;

      default:
        menus = menusUser;
        break;
    }
    return menus;
  }

  const logout = async (ctx = null, page = '/') => {
    destroyCookie(ctx, NAME_COOKIES_USER_TOKEN);
    setUserCurrent(null);
    window.location.href = page;
  }

  return (
    <AuthContext.Provider
      value={{
        getToken,
        setToken,
        getMenusUser,
        logout,
        userCurrent,
        setUserCurrent
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  const { getToken, setToken, getMenusUser, logout, userCurrent, setUserCurrent } = authContext;

  return { getToken, setToken, getMenusUser, logout, userCurrent, setUserCurrent };
}
