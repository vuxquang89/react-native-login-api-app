import { View, Button, StyleSheet } from "react-native";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context";
import { useRoute, useNavigation } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';
import UserInfoItem from "../../components/userInfoItem";

export default function UserInfoScreen(){
    const navigation = useNavigation();
    const { isLoading, setIsLoading, userInfo, onLogout } = useContext(AuthContext);

    useEffect(() => {
        buttonLogout();
    },[]);

    const buttonLogout = () => {
        navigation.setOptions({
          headerRight: () => {
            return (
                <MaterialIcons name="logout" 
                    size={24} 
                    style = {styles.styleButtonLogout}
                    onPress={() => onLogout()} />              
            )
          }
        })
      }

    return (
        
        <UserInfoItem 
            userInfo={userInfo}
        />            
        
    );
}

const styles = StyleSheet.create({
    styleButtonLogout:{
        marginRight: 10,
        color: "red",
    }
});