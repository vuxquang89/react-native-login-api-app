import { Button, StyleSheet, View, Text, Image, Pressable } from "react-native";
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { BASE_URL } from "../../config";


export default function HomeItem({ latLocation, lngLocation, address, date, uri , onPress, actionDel}) {
  
  return (
    <View style={styles.itemContainer}>
      <Pressable 
        android_ripple={{color: "#ced474"}}  
        style={styles.pressableView}
        onPress={onPress}
      >
        <View style={styles.wrapperImage}>
          <Image style={styles.preview} 
            
            source={{uri:  `${BASE_URL}` + "/" + `${uri}`}}
          />
          <View style={styles.wrapperContentTextImage}>
            <Text style={styles.textContentImage}>{date}</Text>
            
          </View>
        </View>
        
      </Pressable>
      <View style={styles.wrapperIcon}>
        <View style={styles.wrapperIconItem}>
          <AntDesign name="delete" 
            style={styles.styleButtonIcon}
            size={24} 
            onPress={()=>actionDel()}/>
          
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1/2,
    margin: 8,
    height: 180,
    borderRadius: 8,
  },
  pressableView:{
    flex:1,
  },
  
  wrapperImage:{
    flex:1,
    backgroundColor:"#c4c4c4",
    width:"95%",
    height:"100%",
    borderRadius: 8,
  },
  preview:{
    alignSelf:"stretch",
    width:"100%",
    height:"100%",
    flex:1,
    borderRadius: 8,
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
  styleText:{
    fontSize: 12,
  },
  wrapperIcon:{
    flex:0.2,
    position:"absolute",
    top:"10%",
    right:20,
  },
  wrapperIconItem:{
    backgroundColor:"#ff0000a3",
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
});
