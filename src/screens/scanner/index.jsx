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
  Image,
  ImageBackground, 
  Alert,
  Dimensions,
} from "react-native";
import moment from "moment";
import * as Location from "expo-location";

import { AuthContext } from "../../context";

export default function ScannerScreen() {
  const navigation = useNavigation();
  let cameraRef = useRef(null);

  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
 
  const [currentAddress, setCurrentAddress] = useState("Wait, we are fetching you location...");
  
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [startCamera, setStartCamera] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null)
  const [photo, setPhoto] = useState();

  const [flashMode, setFlashMode] = useState("off");
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [currentDateWithMoment, setCurrentDateWithMoment] = useState("");
  const [qrContent, setQrContent] = useState("");

  const {width} = Dimensions.get("screen");


  useEffect(() => {
    /*
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasPermission(status === "granted");
    })();
    */
    
    __startBarCodeScanner();
    __startCamera();
    GetCurrentLocation();

  }, []);

  
  //create the handler method
  //get current location
  const GetCurrentLocation = async () => {
    
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

  //set up start barcode scanner
  const __startBarCodeScanner = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
    
  }

  //set up start camera
  const __startCamera = async () => {
    const {status} = await Camera.requestCameraPermissionsAsync();
    console.log("start camera");
    if (status === 'granted') {
      setStartCamera(true)
    } else {
      Alert.alert('Access denied')
    }
  }

  //handle navigation to createQR Screen
  const handleNavigation = async () => {
    
    navigation.navigate("createQRScreen", {
      qrContent: qrContent,
      photo:capturedImage,
      date:currentDateWithMoment,
      lat:lat,
      lng:lng,
      currentAddress:currentAddress,
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

  const __savePhoto = () => {
    console.log("save Photo");
    handleNavigation();
  }

  const __retakePicture = () => {
    console.log("retake picture");
    setCapturedImage(null);
    setPreviewVisible(false);
    __startCamera();
  }

  //handle flash mode camera
  const __handleFlashMode = () => {
    if (flashMode === 'on') {
      setFlashMode('off')
    } else if (flashMode === 'off') {
      setFlashMode('on')
    } else {
      setFlashMode('auto')
    }

  }

  //handle switch camera
  const __handleSwitchCamera = () => {
    if (cameraType === 'back' || cameraType === 0) {
      setCameraType('front')
    } else {
      setCameraType('back')
    }
    
  }

  //take picture function
  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      allowsEditing: true, 
      skipProcessing: true,
      
    };
    try{
      let newPhoto = await cameraRef.current.takePictureAsync(options);
      getTime();
      console.log(currentDateWithMoment);
      //setPhoto(newPhoto);
      setPreviewVisible(true);
      setCapturedImage(newPhoto);
    }catch(e){
      console.log("take pic error",e);
    }
  }

  const getTime = async () => {
    console.log("get time");
    /*
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var hours = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    setCurrentDate(day + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec);
    */
    var dateMoment = moment().format("DD/MM/YYYY hh:mm:ss a");
    setCurrentDateWithMoment(dateMoment);
  }

  /*
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
    
  }
  */

  return (
    <View style={styles.container} >
      {scanned ? <>{previewVisible && capturedImage ? (
        <CameraPreview photo={capturedImage} savePhoto={__savePhoto} retakePicture={__retakePicture}/>
      ) : (
        <Camera style={styles.container} 
          ref={cameraRef}
          flashMode={flashMode}
          type={cameraType}
        >
          <View style={styles.containerTakePic}>
            <View style={styles.wrapperTakePic}>
                <TouchableOpacity
                  onPress={takePic}
                  style={styles.styleTakePic}
                />
            </View>
            
            <TouchableOpacity 
              onPress={__handleSwitchCamera}
              style={styles.styleFlip}

            >
              <Text style={styles.buttonFlip}>
                {cameraType === 'front' ? '🤳' : '📷'}
              </Text>
            </TouchableOpacity>
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
      )}</> : (
      <>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanner}
        style={[StyleSheet.absoluteFillObject, styles.container]}
      />
        <View style={{...StyleSheet.absoluteFill, alignItems:"center", justifyContent:"center"}}>
          <View style={{width : width/2, height:width/2}}>
            <View style={{flex:1, flexDirection:"row"}}>
              <View style={{flex:1, ...styles.leftTop}}></View>
              <View style={{flex:1}}></View>
              <View style={{flex:1}}></View>
              <View style={{flex:1}}></View>
              <View style={{flex:1, ...styles.rightTop}}></View>
            </View>
            <View style={{flex:1}}></View>
            <View style={{flex:1}}></View>
            <View style={{flex:1}}></View>
            <View style={{flex:1, flexDirection:"row"}}>
              <View style={{flex:1, ...styles.leftBottom}}></View>
              <View style={{flex:1}}></View>
              <View style={{flex:1}}></View>
              <View style={{flex:1}}></View>
              <View style={{flex:1, ...styles.rightBottom}}></View>
            </View>
          </View>
        </View>
      {scanned && (
        <Button title={`Tap to Scan again`} onPress={() => setScanned(false)} />
      )}
      </>
      )}
    </View>
  );
}

//Camera Preview
const CameraPreview = ({photo, retakePicture, savePhoto}) => {
  return (
    <View style={styles.containerPreview}>
      <ImageBackground
        source={{uri : photo && photo.uri}}
        style={styles.imageBackground}  
      >
        <View style={styles.wrapperButton}>
          <View style={styles.borderButton}>
            <TouchableOpacity
              onPress={retakePicture}
              style={styles.buttonItem}
            >
              <Text style={styles.iButton}>Re-take</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={savePhoto}
              style={styles.buttonItem}
            >
              <Text style={styles.iButton}>Save-photo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
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
  styleFlip:{
    position:"absolute",
    flex:1,
    alignSelf:"center",
    alignItems:"center",
    left:"20%",
    width:25,
    height:25,
  },
  buttonFlip:{
    textAlign:"center",
    color:"#fff",
  },
  preview:{
    alignSelf:"stretch",
    flex:1
  },
  //style barcode masker
  leftTop:{
    borderLeftWidth:3,
    borderTopWidth:3,
    borderColor:"#fff",
  },
  leftBottom:{
    borderLeftWidth:3,
    borderBottomWidth:3,
    borderColor:"#fff",
  },
  rightTop:{
    borderRightWidth:3,
    borderTopWidth:3,
    borderColor:"#fff",
  },
  rightBottom:{
    borderRightWidth:3,
    borderBottomWidth:3,
    borderColor:"#fff",
  },
  //style camera preview
  containerPreview:{
    backgroundColor: 'transparent',
    flex: 1,
    width: '100%',
    height: '100%'
  },
  imageBackground:{
    flex:1,
  },
  wrapperButton:{
    flex: 1,
    flexDirection: 'column',
    padding: 15,
    justifyContent: 'flex-end'
  },
  borderButton:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonItem:{
    width: 130,
    height: 40,

    alignItems: 'center',
    borderRadius: 4
  },
  iButton:{
    color: '#fff',
    fontSize: 20,
    padding:3,
    borderRadius:5,
    backgroundColor:"rgba(52,52,52,0.5)",
  },

});
