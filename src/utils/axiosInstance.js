import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

import { BASE_URL } from "../config";

let userInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const axiosInstance = axios.create({
  BASE_URL,
  headers: { Authorization: `Bearer ${userInfo.accessToken}` },
});

axiosInstance.interceptors.request.use(async (req) => {
  if (!userInfo) {
    userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    req.headers.Authorization = `Bearer ${userInfo.accessToken}`;
  }

  const user = jwt_decode(userInfo.accessToken);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  if (!isExpired) return req;

  const response = await axios.post(`${BASE_URL}/api/token/refresh`, {
    refresh: userInfo.refreshToken,
  });

  localStorage.setItem("userInfo", JSON.stringify(response.data));
  req.headers.Authorization = `Bearer ${response.data.accessToken}`;
  return req;
});

export default axiosInstance;
