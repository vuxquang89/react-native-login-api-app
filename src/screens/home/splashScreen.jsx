import React from "react";
import { ActivityIndicator } from "react-native";
import { StyleSheet, View } from "react-native";

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#fff"/>
        </View>
    )
}

export default SplashScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        backgroundColor:"#06bcee"
    },
})