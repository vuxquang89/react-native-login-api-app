import { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AuthContext } from "../../context";

export default function ScannerScreen() {
  const navigation = useNavigation();
  const [hasPermission, setHaspermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrInfo, setQRInfo] = useState({ lat: 10, lng: 19, content: "tesst" });

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHaspermission(status === "granted");
    })();
  }, []);

  const handleNavigation = (content) => {
    navigation.navigate("createQRScreen", {
      qrContent: content,
    });
  };

  const handleBarCodeScanner = ({ type, data }) => {
    setScanned(true);
    //handleNavigation(data);
    alert(`Bar code type ${type} and data ${data}`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }

  if (hasPermission === false) {
    return <Text>No Access to Camera</Text>;
  }

  return (
    <View style={styles.containner}>
      <Button title="Test" />

      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanner}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={`Tap to Scan again`} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containner: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
