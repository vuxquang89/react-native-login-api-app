import { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay/lib";

export default function LoginItem({ login, isLoading, onPress }) {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const handleUsernameOnchange = (text) => {
    setUsername(text);
  };

  const handlePasswordOnchange = (text) => {
    setPassword(text);
  };

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <View style={styles.wrapper}>
        <Text style={styles.titleLogin}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter username"
          value={username}
          onChangeText={handleUsernameOnchange}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter password"
          value={password}
          onChangeText={handlePasswordOnchange}
          secureTextEntry
        />

        <Button title="Login" onPress={() => login(username, password)} />

        <View style={styles.wrapperBottom}>
          <Text>Don't have account?</Text>
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.link}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    width: "80%",
  },
  titleLogin: {
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
