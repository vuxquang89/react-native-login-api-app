import { Button, StyleSheet, View, Text} from "react-native";

export default function UserInfoItem({userInfo }) {

    return (
        <View style = {styles.container}>
            <View style={styles.styleWrapper}>
                <Text style={styles.styleText}>Welcome {userInfo.username}</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: "center",
        
    },
    styleWrapper:{
        marginTop: 10,
    },
    styleText:{
        fontSize:16,
    },
})