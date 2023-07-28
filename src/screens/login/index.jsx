import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import LoginItem from "../../components/loginItem";
import { AuthContext } from "../../context";

export default function LoginScreen() {
  const navigation = useNavigation();

  const { isLoading, login, loginGoogle } = useContext(AuthContext);

  const handleOnRegisterScreen = () => {
    navigation.navigate("registerScreen");
  };

  return (
    <LoginItem
      login={login}
      loginGoogle={loginGoogle}
      isLoading={isLoading}
      onPress={() => handleOnRegisterScreen()}
    />
  );
}
