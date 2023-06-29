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

export default function RegisterItem({ onRegister, isLoading, onPress }) {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleUsernameOnchange = (text) => {
    setUsername(text);
  };

  const handleEmailOnchange = (text) => {
    setEmail(text);
  };

  const handlePasswordOnchange = (text) => {
    setPassword(text);
  };

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <View style={styles.wrapper}>
        <Text style={styles.titleRegister}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          value={username}
          onChangeText={handleUsernameOnchange}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          value={email}
          onChangeText={handleEmailOnchange}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter password"
          value={password}
          onChangeText={handlePasswordOnchange}
          secureTextEntry
        />

        <Button
          title="Register"
          onPress={() => onRegister(username, email, password)}
        />

        <View style={styles.wrapperBottom}>
          <Text>You have account?</Text>
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.link}>Login</Text>
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
