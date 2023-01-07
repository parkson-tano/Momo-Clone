// App.js

import React, { useCallback, useContext, useEffect, useState } from "react";
import Login from "./Login";
import { AuthContext } from "../context/AuthContext";
import * as Keychain from "react-native-keychain";
import Dashboard from "../Dashboard";
import Spinner from "../Spinner";
import DashboardStack from "../navigation/DashboardStacjk";
import RegisterStack from "../navigation/RegisterStack";

const Service = () => {
  const authContext = useContext(AuthContext);
  const [status, setStatus] = useState("loading");

  const loadJWT = useCallback(async () => {
    try {
      const value = Keychain.getGenericPassword();
      const jwt = JSON.parse(value.password);
      authContext.setAuthState({
        access: jwt.access || null,
        refresh: jwt.refresh || null,
        authenticated: jwt.access !== null,
      });
      setStatus("success");
    } catch (error) {
      setStatus("error");
      console.log(`Keychain Error: ${error.message}`);
      authContext.setAuthState({
        access: null,
        refresh: null,
        authenticated: false,
      });
    }
  }, []);

  useEffect(() => {
    loadJWT();
  }, [loadJWT]);

  if (status === "loading") {
        return <RegisterStack />;
  } else {
    return <DashboardStack />;
  }


  if (authContext?.authState?.authenticated === false) {
    return <RegisterStack />;
  } else {
    return <DashboardStack />;
  }
};

export default Service;
