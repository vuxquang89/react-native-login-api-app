import { View, Text } from "react-native";
import RegisterItem from "../../components/registerItem";
import { AuthContext } from "../../context";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";

export default function RegisterScreen() {
  const navigation = useNavigation();
  const { isLoading, onRegister } = useContext(AuthContext);

  const handleOnLoginScreen = () => {
    navigation.navigate("loginScreen");
  };

  return (
    <RegisterItem
      onRegister={onRegister}
      isLoading={isLoading}
      onPress={() => handleOnLoginScreen()}
    />
  );
}
