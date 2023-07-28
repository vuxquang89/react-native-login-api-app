import { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay/lib";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
//import * as AuthSession from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

export default function LoginItem({ login, loginGoogle, isLoading, onPress }) {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest(
    {
      androidClientId:
        "897004892708-g7l5e8i8ik7ffehv45algt4mf66m8ucn.apps.googleusercontent.com",
      iosClientId:
        "897004892708-ufvj6u51179tv4phjsh7anncrksdpb9h.apps.googleusercontent.com",
      webClientId:
        "897004892708-q4jq5c6114ndp8ge49jjsipn8d1iv6pg.apps.googleusercontent.com",
      expoClientId:
        "897004892708-as8sj8mme3jfk12rg7s1fo7tjbdje49t.apps.googleusercontent.com",
      //responseType: "id_token",
      //scopes: ["profile", "email"],
      //redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    },
    {
      originalFullName: "@vux.quang89/react-native-login-api-app",
    }
  );

  useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  async function handleSignInWithGoogle() {
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      if (response?.type === "success") {
        console.log("response", response);
        console.log("idToken", response.authentication.idToken);
        setUserInfo(response.authentication.idToken);
        //await getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(JSON.parse(user));
    }
  }

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch("", {
        headers: { Authurization: `Bearer ${token}` },
      });

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {}
    //loginGoogle(token);
  };

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
        <Text>ID Token: {JSON.stringify(userInfo)}</Text>
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

        <View>
          <Button title="Login with Google" onPress={() => promptAsync()} />
        </View>
        <View>
          <Button
            title="Delete local storage"
            onPress={() => AsyncStorage.removeItem("@user")}
          />
        </View>
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
