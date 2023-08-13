import { useContext, useState, useEffect } from "react";
import * as MediaLibrary from 'expo-media-library';
import useAxios from "../../utils/useAxios";
import { View, Button, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import QRDetailsItem from "../../components/qrDetailsItem";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function QRDetails(){
    const route = useRoute();
    const navigation = useNavigation();
    const api = useAxios();

    const {qrId} = route.params;

    const [isLoading, setIsLoading] = useState(false);
    const [qrDetailsData, setQRDetailsData] = useState([]);
    const [uri, setUri] = useState("");
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();

    
    useEffect(() => {
        console.log("get qr details");
        getQRInfoDetailsData();
        handleMediaLibraryPermission();
    },[]);

    const handleMediaLibraryPermission = async () => {
        const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
        setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    }

    const getQRInfoDetailsData = async () => {
        setIsLoading(true);
        //console.log("get qr details");
        let resp = await api.get(`/api/qr/${qrId}`)
        .then((res) => {
            let result = res.data;
    
            setIsLoading(false);
            console.log("qrinfo detail", result.qrImages[0].uri);
            setQRDetailsData(result);
            setUri(result.qrImages[0].uri);
        })
        .catch((e) => {
            setIsLoading(false);
            console.log(`get data error ${e}`);
        });
    }

    const delItem = async () => {
        console.log("detail screen delete");
        console.log("detailsData", qrDetailsData);
        AsyncStorage.setItem("selectItemId", JSON.stringify(qrDetailsData.id));
        navigation.goBack();
        //const result = await AsyncStorage.getItem("userInfo");
        //console.log("result", result);
        //let data = [];
        //if(result !== null) data = JSON.parse(result);
        
        //const newQRData = data.filter(n => n.id !== qrId);
        //await AsyncStorage.setItem("qrInfoData", JSON.stringify(newQRData));

    }

    //console.log("qr details", qrDetailsData);
    return (
       
            <QRDetailsItem 
                qrDetailsData={qrDetailsData}
                uri={uri}
                isLoading={isLoading}
                deleteItem={delItem}
            />
       
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})