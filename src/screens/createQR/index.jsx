import { View, Text, Button } from "react-native";
import CreateQRItem from "../../components/createQRItem";
import { AuthContext } from "../../context";
import { useContext, useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import useAxios from "../../utils/useAxios";

export default function CreateQRScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { isLoading, setIsLoading } = useContext(AuthContext);

  const [currentDate, setCurrentDate] = useState("");

  let api = useAxios();

  const qrInfo = route.params ? route.params : false;

  useEffect(() => {
    buttonQR();
    getTime();
  },[]);

  const buttonQR = () => {
    navigation.setOptions({
      headerRight: () => {
        return (
          
          <Button 
            onPress={() => handleScannerScreen()}
            title="SCANNER"
          />
        )
      }
    })
  }

  const getTime = () => {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var hours = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    setCurrentDate(day + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec);
  }

  const handleScannerScreen = () => {
    navigation.navigate("scannerScreen");
  };

  const addQR = (lat, lng, content) => {
    setIsLoading(true);
    let response = api
      .post("/api/qr", { lat, lng, content })
      .then((res) => {
        let result = res.data;

        setIsLoading(false);
        console.log(result);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(`login error ${e}`);
      });

    /*
    if (response.status === 200) {
      setQRInfo(response.data);
    }
    */
  };

  return (
    <CreateQRItem
      addQR={addQR}
      isLoading={isLoading}
      qrInfo={qrInfo}
      currentDate={currentDate}
      
    />
  );
}
