import { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay/lib";

export default function CreateQRItem({ isLoading, qrContent, addQR, onPress }) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [content, setContent] = useState(qrContent);

  const handleLatOnchange = (text) => {
    setLat(text);
  };

  const handleLngOnchange = (text) => {
    setLng(text);
  };
  const handleContentOnchange = (text) => {
    setContent(text);
  };

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
});
