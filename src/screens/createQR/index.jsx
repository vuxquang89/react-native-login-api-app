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

  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  const [currentAddress, setCurrentAddress] = useState("Wait, we are fetching you location...");

  let api = useAxios();

  const qrInfo = route.params ? route.params : false;

  useEffect(() => {
    buttonQR();
    
    CheckLocationEnabled();
    GetCurrentLocation();
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

  //create the handler method
  //get current location
  const GetCurrentLocation = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync();

    if(status !== "granted"){
      Alert.alert("Permission not granted",
        "Allow the app to use location service",
        [{text: "OK"}],
        {cancelable: false}
      );
    }
    let {coords} = await Location.getCurrentPositionAsync();

    if(coords){
      const {latitude, longitude} = coords;
      
      setLat(coords.latitude);
      setLng(coords.longitude);
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });
      console.log("response", response);
      for(let item of response){
        let address = `${item.name}, ${item.street}, ${item.subregion}, ${item.region}`;
        setCurrentAddress(address);
      }
    }    
    
  }

  console.log(currentAddress);

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
      latLocation={lat}
      lngLocation={lng}
      currentAddress={currentAddress}  
      
    />
  );
}
