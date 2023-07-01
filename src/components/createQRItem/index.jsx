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

export default function CreateQRItem({ isLoading, qrInfo, addQR, onPress }) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [content, setContent] = useState();

  const handleLatOnchange = (text) => {
    setLat(text);
  };

  const handleLngOnchange = (text) => {
    setLng(text);
  };
  const handleContentOnchange = (text) => {
    setContent(text);
  };
  console.log("param content", qrInfo.qrContent);
  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <View style={styles.wrapperButton}>
        <Button title="Scanner" onPress={onPress} />
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.titleRegister}>Add QR</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter lat"
          value={lat}
          onChangeText={handleLatOnchange}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter lng"
          value={lng}
          onChangeText={handleLngOnchange}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter content"
          value={content}
          onChangeText={handleContentOnchange}
        />
        
        <Button title="Create" onPress={() => addQR(lat, lng, content)} />
        
      </View>
      <View style={styles.wrapperImage}>
        <Image style={styles.preview} 
          //source={{uri:`data:image/jpg;base64,${qrInfo.photo.base64}`}}
          //source={{uri:  `${qrInfo?.qrInfo.photo.uri}`}}
        />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  wrapperButton: {
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: "red",
  },
  wrapper: {
    width: "80%",
  },
  titleRegister: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    marginBottom: 12,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  wrapperBottom: {
    flexDirection: "row",
    marginTop: 20,
  },
  link: {
    color: "blue",
  },
  wrapperImage:{
    flex:1,
    marginTop:10,
    backgroundColor:"yellow",
    width:"50%",
    height:"50%",
  },
  preview:{
    alignSelf:"stretch",
    width:"100%",
    height:"100%",
    flex:1
  },
});
