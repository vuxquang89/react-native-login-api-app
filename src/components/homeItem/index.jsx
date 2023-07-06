import { Button, StyleSheet, View, Text, Image, Pressable } from "react-native";
import { BASE_URL } from "../../config";


export default function HomeItem({ latLocation, lngLocation, address, date, uri }) {
  console.log("uri", BASE_URL +"/"+ uri);
  return (
    <View style={styles.itemContainer}>
      <Pressable 
        android_ripple={{color: "#ced474"}}  
        style={styles.pressableView}
      >
        <View style={styles.wrapperImage}>
          <Image style={styles.preview} 
            
            source={{uri:  `${BASE_URL}` + "/" + `${uri}`}}
          />
          <View style={styles.wrapperContentTextImage}>
            <Text style={styles.textContentImage}>{date}</Text>
            <Text style={styles.textContentImage}>lat: {latLocation}; lng: {lngLocation}</Text>
            <Text style={styles.textContentImage}>{address}</Text>
          </View>
        </View>
      </Pressable>
      
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    margin:16,
    height:180,
    borderRadius:8,
  },
  pressableView:{
    flex:1,
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
    fontSize:12,
  },
});
