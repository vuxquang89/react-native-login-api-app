import { useContext, useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image
} from "react-native";
import { AuthContext } from "../../context";

export default function ScannerScreen() {
  const navigation = useNavigation();
  let cameraRef = useRef(null);
  
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [photo, setPhoto] = useState();

  const [flashMode, setFlashMode] = useState("off");

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrContent, setQrContent] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleNavigation = async () => {
    navigation.navigate("createQRScreen", {
      qrContent: qrContent,
      photo:photo,
    });
  };

  const handleBarCodeScanner = ({ type, data }) => {
    setScanned(true);
    console.log("qr content", data);
    setQrContent(data);
    //setQRInfo({...qrInfo, qrContent:data});
    //handleNavigation(data);
    //alert(`Bar code type ${type} and data ${data}`);
    
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }

  if (hasPermission === false) {
    return <Text>No Access to Camera</Text>;
  }

  const __handleFlashMode = () => {
    if (flashMode === 'on') {
      setFlashMode('off')
    } else if (flashMode === 'off') {
      setFlashMode('on')
    } else {
      setFlashMode('auto')
    }

  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      allowsEditing: true, 
      skipProcessing: true,
      
    };
    try{
      let newPhoto = await cameraRef.current.takePictureAsync(options);
      
      setPhoto(newPhoto);
    }catch(e){
      console.log("error",e);
    }
  }

  if(photo){
   
    console.log("view photo");
    //setQRInfo({...qrInfo, takePhoto:photo});
    //console.log("qrInfo", qrInfo.qrContent);
    
    handleNavigation();
    /*
    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{uri:"data:image/jpg;base64," + photo.base64}}/>
      </SafeAreaView>
    )
    */
  }

  return (
    <View style={styles.container} >
      {scanned ? (
        <Camera style={styles.container} 
          ref={cameraRef}
          flashMode={flashMode}
        >
          <View style={styles.containerTakePic}>
            <View style={styles.wrapperTakePic}>
                <TouchableOpacity
                  onPress={takePic}
                  style={styles.styleTakePic}
                />
            </View>
          </View>
          <TouchableOpacity
            onPress={__handleFlashMode}
            style={{
              position: 'absolute',
              left: '5%',
              top: '10%',
              backgroundColor: flashMode === 'off' ? '#000' : '#fff',
              borderRadius: 50,
              height: 25,
              width: 25
            }}
          >
            <Text
              style={{
              fontSize: 20
              }}
            >
              ⚡️
            </Text>
        </TouchableOpacity>
        </Camera>
      ) :(
        <>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanner}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={`Tap to Scan again`} onPress={() => setScanned(false)} />
      )}
      </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  buttonWrapper:{
    backgroundColor:"#fff",
    alignSelf:"flex-end",
  },
  containerTakePic:{
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    padding: 20,
    justifyContent: 'space-between'
  },
  wrapperTakePic:{
    alignSelf: 'center',
    flex: 1,
    alignItems: 'center'
  },
  styleTakePic:{
    width: 70,
    height: 70,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: '#fff'
  },
  
  preview:{
    alignSelf:"stretch",
    flex:1
  }
});
