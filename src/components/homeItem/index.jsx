import { Button, StyleSheet, View, Text } from "react-native";
import Spinner from "react-native-loading-spinner-overlay/lib";

export default function HomeItem({ isLoading, userInfo, onLogout }) {
  return (
    <View>
      <Spinner visible={isLoading} />
      <Text>Welcome {userInfo.username}</Text>
      <Button title="Logout" color="red" onPress={() => onLogout()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapperButton: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
