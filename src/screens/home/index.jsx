import { useContext, useState, useEffect } from "react";
import HomeItem from "../../components/homeItem";
import { AuthContext } from "../../context";
import useAxios from "../../utils/useAxios";
import { View, FlatList, StyleSheet, Button } from "react-native";
import Spinner from "react-native-loading-spinner-overlay/lib";

export default function HomeScreen() {
  let [qrInfoData, setQRInfoData] = useState();
  const { isLoading, setIsLoading, userInfo, onLogout } = useContext(AuthContext);

  let api = useAxios();

  

  let getData = async () => {
    console.log("request");
    setIsLoading(false);
    let response = await api.get("/api/qr")
      .then((res) => {
        let result = res.data;

        setIsLoading(false);
        console.log(result[0]);
        setQRInfoData(result);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(`get data error ${e}`);
      });
    /*
      
    if (response.status === 200) {
      setQRInfo(response.data);
    }
    */
  };

  useEffect(() => {
    console.log("get data");
    getData();
  }, []);

  console.log("qrInfo", qrInfoData);
  

  return (
    <View>
      <Spinner visible={isLoading} />
      <FlatList
        data={qrInfoData}
        renderItem={(itemData) => (
          <HomeItem 
            latLocation={itemData.item.lat}
            lngLocation={itemData.item.lng}
            address={itemData.item.address}
            date={itemData.item.dataUpload}
            uri={itemData.item.qrImages[0].uriResize}
          />
        )}
        keyExtractor={(itemData) => itemData.id}
        numColumns={2}
      />
      <Button title="Logout" onPress={()=>onLogout()}/>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})