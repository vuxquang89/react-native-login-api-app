import { View, Text } from "react-native";
import CreateQRItem from "../../components/createQRItem";
import { AuthContext } from "../../context";
import { useContext } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import useAxios from "../../utils/useAxios";

export default function CreateQRScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { isLoading, setIsLoading } = useContext(AuthContext);

  let api = useAxios();

  const { qrContent } = route.params ? route.params : "";

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
      qrContent={qrContent}
      onPress={() => handleScannerScreen()}
    />
  );
}
