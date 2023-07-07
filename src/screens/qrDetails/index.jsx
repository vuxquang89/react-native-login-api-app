import { useContext, useState, useEffect } from "react";
import * as MediaLibrary from 'expo-media-library';
import useAxios from "../../utils/useAxios";
import { View, Button, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import QRDetailsItem from "../../components/qrDetailsItem";


export default function QRDetails(){
    const route = useRoute();
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

    //console.log("qr details", qrDetailsData);
    return (
       
            <QRDetailsItem 
                qrDetailsData={qrDetailsData}
                uri={uri}
                isLoading={isLoading}
            />
       
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})