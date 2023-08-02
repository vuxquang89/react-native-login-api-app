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
import FlashMessage from "react-native-flash-message";
import {isValidEmail, isValidUsername, isValidPassword} from "../../utils/Validations";

export default function RegisterItem({ onRegister, isLoading, onPress }) {
  const [username, setUsername] = useState("");
  const [errorUserName, setErrorUsername] = useState("");
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const isValidationSubmit = () => {
    return isValidEmail(email) == true && 
           isValidPassword(password) == true && 
           isValidUsername(username) == true;
  }

  const handleUsernameOnchange = (text) => {
    if(text.length < 4 || text.length > 10){
      setErrorUsername("Username must be more than 3 and less than 10 characters");
    }else if(isValidUsername(text) == false){
      setErrorUsername("Username cannot contain special characters");
    }else{
      setErrorUsername("");
    }
    setUsername(text);
  };

  const handleEmailOnchange = (text) => {
    setErrorEmail(isValidEmail(text) == true ? "" : "Email not in correct format")
    setEmail(text);
  };

  const handlePasswordOnchange = (text) => {
    if(text.length < 6 || text.length > 20){
      setErrorPassword("Password must be more than 5 and less than 20 characters");
    }else if(isValidPassword(text) == false){
      setErrorPassword("Password cannot contain spaces");
    }else{
      setErrorPassword("");
    }
    setPassword(text);
  };

  return (
    <View style={styles.container}>
      <FlashMessage position="center"/>
      <Spinner visible={isLoading} />
      <View style={styles.wrapper}>
        <Text style={styles.titleRegister}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          value={username}
          onChangeText={handleUsernameOnchange}
        />
        <Text style={styles.textError}>{errorUserName}</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter email"
          value={email}
          onChangeText={handleEmailOnchange}
        />
        <Text style={styles.textError}>{errorEmail}</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter password"
          value={password}
          onChangeText={handlePasswordOnchange}
          secureTextEntry
        />
        <Text style={styles.textError}>{errorPassword}</Text>

        <Button
          disabled = {isValidationSubmit() == false}
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
    //marginBottom: 12,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  wrapperBottom: {
    flexDirection: "row",
    marginTop: 20,
  },
  textError:{
    fontSize: 12,
    color: "red",
    textAlign: "right",
    marginBottom: 5,
  },
  link: {
    color: "blue",
  },
});
