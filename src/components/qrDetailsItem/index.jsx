import { View, Button, Image, StyleSheet, Text,Share, Alert } from "react-native";
//import {shareAsync} from "expo-sharing";
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { BASE_URL } from "../../config";
import ViewShot from "react-native-view-shot";
import { useRef, useState } from "react";
import Spinner from "react-native-loading-spinner-overlay/lib";
import FlashMessage,{ showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function QRDetailsItem({ qrDetailsData, uri, isLoading, deleteItem }) {
  const viewToSnapshotRef = useRef();
  const [snapShotImage, setSnapShotImage] = useState();

  const captureViewShot = async () => {
    const imageRUI = await viewToSnapshotRef.current.capture();
    console.log("imageRUI: ", imageRUI);
    Share.share({
      title:"Image", 
      //ios
      url:imageRUI,
      //android
      message:imageRUI,
    }, {
      dialogTitle:"Share Image"
    }).then(({action, activityType}) => {
      if(action === Share.sharedAction)
        console.log("Share was successful!");
      else
        console.log("Share was dismissed!");
    }).catch(err => console.log(err));
    /*
    shareAsync(imageRUI).then(() => {
      console.log("share...");
    })
    */
  }

  //share image
  const onShareImageAsync = async () => {
    try{
      const imageRUI = await viewToSnapshotRef.current.capture();
      await Sharing.shareAsync(imageRUI, {mimeType: "image/gif"});
      
    }catch(e){
      alert(e.message);
    }
  }

  //save image
  const onSaveImageAsync = async () => {
    try{
      const imageRUI = await viewToSnapshotRef.current.capture();
      await MediaLibrary.saveToLibraryAsync(imageRUI);
      if(imageRUI){
        showMessage({
          message: "Save successful!",
          //description: "My message description",
          type: "success",
        });
      }
    }catch(e){
      alert(e.message);
    }
  }

  //delete image

  const displayDeleteAlert = () => {
    Alert.alert("Are You Sure", "This action will delete your image!",
      [
        {
          text: "Delete",
          onPress: () => deleteItem(),
        },
        {
          text: "No Thanks",
          onPress: () => console.log("no thanks"),
        },
      ],{
        cancelable: true,
      })
  }


  //  console.log("uri", `${BASE_URL}` + "/" +`${uri}`);
    return (
      <>
      <View style={styles.container}>
        
        <FlashMessage position="center" />

        <Spinner visible={isLoading} />
        <ViewShot style={styles.wrapperImage}           
           ref={viewToSnapshotRef}
           options={{format:"jpg", quality:1}}
        >
          <Image style={styles.preview} 
            source={{uri:  `${BASE_URL}` + "/" +`${uri}`}}
            resizeMode="cover"
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
      <View style={styles.wrapperIcons}>
        <View style={styles.wrapperIconItem}>
          <FontAwesome name="share" size={24} 
            style={styles.styleButtonIcon} 
            onPress={()=>onShareImageAsync()} />
        </View>
        <View style={styles.wrapperIconItem}>
          <FontAwesome name="download" size={24} 
            style={styles.styleButtonIcon} 
            onPress={()=>onSaveImageAsync()}/>
        </View>
        
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
        backgroundColor:"#c4c4c4",
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
    wrapperIcons:{
      flex:0.2,
      position:"absolute",
      top:"10%",
      right:20,
      
    },
    wrapperIconItem:{
      backgroundColor:"#5e5c5cc2",
      borderRadius:50,
      width:40,
      height:40,
      marginBottom:20,
      justifyContent:"center",
      alignItems:"center"
    },
    styleButtonIcon:{
      color:"white",
      
    },
    styleButtonIconDel:{
      color: "#ff0000a3",
    }
});