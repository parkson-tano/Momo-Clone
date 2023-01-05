import React, { createContext, useState } from "react";
import * as Keychain from "react-native-keychain";

const AuthContext = createContext(null);
const { Provider } = AuthContext;
const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    access: null,
    refresh: null,
    authenticated: null,
    password: null,
  });

  const logout = () => {
    // await Keychain.resetGenericPassword();
    setAuthState({
      access: null,
      refresh: null,
      authenticated: false,
      password: null,
    });
  };

  const getAccessToken = () => {
    return authState.access;
  };

  return (
    <Provider
      value={{
        authState,
        getAccessToken,
        setAuthState,
        logout,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
