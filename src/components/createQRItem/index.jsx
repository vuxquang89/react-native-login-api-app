import { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay/lib";

export default function CreateQRItem({ isLoading, qrInfo, addQR, latLocation, lngLocation, currentAddress, currentDate}) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [content, setContent] = useState();

  //console.log("param content", qrInfo.qrContent);
  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      {qrInfo ? (
        <>
        <Text style={styles.titleHeader}>QR Code info</Text>

        <View style={styles.wrapperImage}>
          <Image style={styles.preview} 
            //source={{uri:`data:image/jpg;base64,${qrInfo.photo.base64}`}}
            source={{uri:  `${qrInfo.photo.uri}`}}
          />
          <View style={styles.wrapperContentTextImage}>
            <Text style={styles.textContentImage}>{currentDate}</Text>
            <Text style={styles.textContentImage}>lat: {latLocation}; lng: {lngLocation}</Text>
            <Text style={styles.textContentImage}>{currentAddress}</Text>
          </View>
        </View>
        <View style={styles.wrapper}>
        
          <View style={styles.wrapperContentQR}>
            <Text style={styles.title}>Content QR Code: </Text>
            <Text style={styles.textContentQR}>{qrInfo ? qrInfo.qrContent : ""}</Text> 
          </View>

          <View style={styles.wrapperButtonUpload}>
            <Button title="Upload" onPress={() => addQR(lat, lng, content)} />
          </View> 
        </View>
        </>
        ):(
          <Text>Click button "Scanner" to get information</Text>
      ) }
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  titleHeader: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  wrapperButton: {
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: "red",
  },
  wrapper: {
    width: "100%",
    padding:10,
  },
  wrapperContentQR:{
    marginBottom:5,
  },
  textContentQR:{
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 5
  },
  title:{
    fontWeight:"bold",
  },
  wrapperBottom: {
    flexDirection: "row",
    marginTop: 20,
  },
  wrapperButtonUpload:{
    
    alignSelf:"center",
    alignItems:"center",
  },
  wrapperImage:{
    flex:1,
    backgroundColor:"yellow",
    width:"95%",
    height:"100%",
  },
  preview:{
    alignSelf:"stretch",
    width:"100%",
    height:"100%",
    flex:1
  },
  wrapperContentTextImage:{
    position: "absolute",
    bottom:10,
    right:0,
  },
  textContentImage:{
    color: "#fff",
    fontSize:15,
  },
});
