import { View, Text, Button, Alert } from "react-native";
import CreateQRItem from "../../components/createQRItem";
import { AuthContext } from "../../context";
import { useContext, useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import useAxios from "../../utils/useAxios";

export default function CreateQRScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { isLoading, setIsLoading } = useContext(AuthContext);

  //const [qrInfo, setQRInfo] = useState();
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  

  let api = useAxios();

  const qrInfo = route.params ? route.params : false;
  //setQRInfo(route.params ? route.params : {});

  useEffect(() => {
    buttonQR();
    CheckLocationEnabled();
    handleForegroundPermission();
  },[]);

  //check location enable
  const CheckLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if(!enabled){
      Alert.alert("Location Service not enabled", 
        "Please enable your location services to continue",
        [{text:"OK"}],
        {cancelable: false}
      );
    }else{
      setLocationServiceEnabled(enabled);
    }
  }

  const handleForegroundPermission = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync();

    if(status !== "granted"){
      Alert.alert("Permission not granted",
        "Allow the app to use location service",
        [{text: "OK"}],
        {cancelable: false}
      );
    }

  }

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

  const handleScannerScreen = () => {
    navigation.navigate("scannerScreen");
  };

  const handleFreshScreen = () => {
    navigation.navigate("createQRScreen");
  }

  const Upload = (lat, lng, photo, content, address, dateTakePic) => {
    setIsLoading(true);

    //get the extension
    const ext = photo.uri.substring(photo.uri.lastIndexOf(".") + 1);
    //get file name
    const fileName = photo.uri.replace(/^.*[\\\/]/,"");
    console.log("file name upload", fileName);

    const formData = new FormData();
    formData.append("file", {
      uri:photo.uri,
      name:fileName, 
      type: photo.type ? `image/${ext}` : `video/${ext}`,
    });
    formData.append("lat", lat);
    formData.append("lng", lng);
    formData.append("content", content);
    formData.append("address", address);
    formData.append("dateTakePic", dateTakePic);
    
    //qrInfo = false;
    
    let response = api
      .post("/api/qr", formData, 
        {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        })
      .then((res) => {
        let result = res.data;

        setIsLoading(false);
        console.log(result);
        handleFreshScreen();
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(`upload error ${e}`);
      });
      
    /*
    if (response.status === 200) {
      setQRInfo(response.data);
    }
    */
  };

  return (
    <CreateQRItem
      onUpload={Upload}
      isLoading={isLoading}
      qrInfo={qrInfo}
    />
  );
}
