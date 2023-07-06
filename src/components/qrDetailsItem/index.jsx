import { View, Button, Image, StyleSheet, Text,Share } from "react-native";
import { BASE_URL } from "../../config";
import ViewShot from "react-native-view-shot";
import { useRef, useState } from "react";
import Spinner from "react-native-loading-spinner-overlay/lib";

export default function QRDetailsItem({ qrDetailsData, uri, isLoading }) {
  const viewToSnapshotRef = useRef();
  const [snapShotImage, setSnapShotImage] = useState();

  const captureViewShot = async () => {
    const imageRUI = await viewToSnapshotRef.current.capture();
    console.log("imageRUI: ", imageRUI);
    Share.share({title:"Image", url:imageRUI});
  }
    console.log("uri", `${BASE_URL}` + "/" +`${uri}`);
    return (
      <>
      <View style={styles.container}>
        <Spinner visible={isLoading} />
        <ViewShot style={styles.wrapperImage}           
           ref={viewToSnapshotRef}
           options={{format:"jpg", quality:1}}
        >
          <Image style={styles.preview} 
            source={{uri:  `${BASE_URL}` + "/" +`${uri}`}}
          />
          <View style={styles.wrapperContentTextImage}>
            <Text style={styles.textContentImage}>{qrDetailsData.dateUpload}</Text>
            <Text style={styles.textContentImage}>lat: {qrDetailsData.lat}; lng: {qrDetailsData.lng}</Text>
            <Text style={styles.textContentImage}>{qrDetailsData.address}</Text>
          </View>
        </ViewShot>
        
        <View style={styles.wrapper}>
        
          <View style={styles.wrapperContentQR}>
            <Text style={styles.title}>Content QR Code: </Text>
            <Text style={styles.textContentQR}>{qrDetailsData.content}</Text> 
          </View>

        </View>
        
      </View>
      <View style={styles.wrapperShare}>
      <Button title="share" onPress={()=>captureViewShot()}/>
    </View>
    </>
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
        width:"100%",
        height:"100%",
        marginTop:5,
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
    wrapperShare:{
      flex:0.2,
      position:"absolute",
      top:"10%",
      right:10,
    },
});