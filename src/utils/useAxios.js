import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import { AuthContext } from "../context";
import { BASE_URL } from "../config";

const useAxios = () => {
  const { userInfo, setUserInfo } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${userInfo.accessToken}` },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const user = jwt_decode(userInfo.accessToken);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return req;

    const response = await axios.post(
      `${BASE_URL}/api/token/refresh`,
      {
        refresh: userInfo.refreshToken,
      },
      {
        headers: { Authorization: `Bearer ${userInfo.refreshToken}` },
      }
    );

    AsyncStorage.setItem("userInfo", JSON.stringify(response.data));

    setUserInfo(response.data);
    //setUser(jwt_decode(response.data.access));

    req.headers.Authorization = `Bearer ${response.data.accessToken}`;
    return req;
  });

  return axiosInstance;
};

export default useAxios;
