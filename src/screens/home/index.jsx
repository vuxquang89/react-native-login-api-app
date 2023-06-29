import { useContext, useState, useEffect } from "react";
import HomeItem from "../../components/homeItem";
import { AuthContext } from "../../context";
import useAxios from "../../utils/useAxios";

export default function HomeScreen() {
  let [qrInfo, setQRInfo] = useState([]);
  const { isLoading, userInfo, onLogout } = useContext(AuthContext);

  let api = useAxios();

  /*

  let getData = async () => {
    console.log("request");
    let response = await api.get("/api/qr");
    console.log("response", response);
    if (response.status === 200) {
      setQRInfo(response.data);
    }
  };

  useEffect(() => {
    console.log("get data");
    getData();
  }, []);

  console.log("qrInfo", qrInfo);
  */

  return (
    <HomeItem isLoading={isLoading} userInfo={userInfo} onLogout={onLogout} />
  );
}
