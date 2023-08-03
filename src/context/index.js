import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";
import { Alert } from "react-native";
import { showMessage } from "react-native-flash-message";
import { BASE_URL } from "../config";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  //const api = useAxios();

  const loginGoogle = (idToken) => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/api/auth/google/verify`, {
        idToken,
      })
      .then((res) => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        setIsLoading(false);
        console.log(userInfo);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log("error", e);
        showMessage({
          message: "Error",
          description: "Cannot login",
          type: "danger",
        });
      });

    /*
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      idToken: idToken,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${BASE_URL}/api/auth/user/google`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setIsLoading(false);
      });
      */
  };

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
        Alert.alert("Warning","username or password is incorrect!",[{text:"OK"}]);        
        console.log(`login error ${e}`);
      });
  };

  const onRegister = (username, email, password) => {
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/api/auth/register`, { username, email, password })
      .then((res) => {
        let result = res.data;
        if(result.status == 201){
          showMessage({
            message: "Warning",
            description: result.message,
            type: "warning",
          });
          
        }else{
          showMessage({
            message: "Success",
            description: "Register successful!",
            type: "success",
          });
          setUserInfo(result);
          AsyncStorage.setItem("userInfo", JSON.stringify(result));        
        }
        setIsLoading(false);
        console.log(result);
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
        console.log("logout",res.data);
        if(res.data.status == 200 || res.data.status == 201 || res.data.status == "202"){
          AsyncStorage.removeItem("userInfo");
          setUserInfo({});
        }else{
          showMessage({
            message: "Error",
            description: "Cannot logout",
            type: "danger",
          });
        }        
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(`logout error ${e}`);
        showMessage({
          message: "Error",
          description: e,
          type: "danger",
        });
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
        loginGoogle,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
