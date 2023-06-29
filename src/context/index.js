import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";
import { BASE_URL } from "../config";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const login = (username, password) => {
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/api/auth/login`, { username, password })
      .then((res) => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        setIsLoading(false);
        console.log(userInfo);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(`login error ${e}`);
      });
  };

  const onRegister = (username, email, password) => {
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/api/auth/register`, { username, email, password })
      .then((res) => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        setIsLoading(false);
        console.log(userInfo);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(`register error ${e}`);
      });
  };

  const onLogout = () => {
    setIsLoading(true);
    axios
      .post(
        `${BASE_URL}/api/auth/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.accessToken}` },
        }
      )
      .then((res) => {
        AsyncStorage.removeItem("userInfo");
        setUserInfo({});
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(`logout error ${e}`);
        setIsLoading(false);
      });
  };

  //check if loggedIn
  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem("userInfo");
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        setIsLoading,
        userInfo,
        setUserInfo,
        splashLoading,
        login,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
