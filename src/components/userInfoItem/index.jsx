import { Button, StyleSheet, View, Text} from "react-native";
import FlashMessage from "react-native-flash-message";
import Spinner from "react-native-loading-spinner-overlay/lib";

export default function UserInfoItem({isLoading, userInfo }) {

    return (
        <View style = {styles.container}>
            <FlashMessage position="center"/>
            <Spinner visible={isLoading} />
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