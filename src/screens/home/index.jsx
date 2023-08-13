import { useContext, useState, useEffect, useCallback } from "react";
import HomeItem from "../../components/homeItem";
import { AuthContext } from "../../context";
import useAxios from "../../utils/useAxios";
import { View, FlatList, StyleSheet, Alert, Button } from "react-native";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FlashMessage from "react-native-flash-message";
import { BASE_URL } from "../../config";

export default function HomeScreen() {

  const [qrInfoData, setQRInfoData] = useState([]);
  const [itemId, setItemId] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const { isLoading, setIsLoading } = useContext(AuthContext);

  let api = useAxios();
  const navigation = useNavigation();

  let getData = async () => {
    //console.log("request");
    setIsLoading(true);
    let response = await api.get(`/api/qr?page=${currentPage}&limit=6`)
      .then((res) => {
        let result = res.data;

        setIsLoading(false);
        setRefreshing(false);
        if(result.status){
          console.log(result);
        }
        
        setQRInfoData([...qrInfoData, ...result]);
        //setQRInfoData(result);
      })
      .catch((e) => {
        setIsLoading(false);
        setRefreshing(false);
        console.log(`get data error ${e.message}`);
      });
    /*
      
    if (response.status === 200) {
      setQRInfo(response.data);
    }
    */
  };

  const loadMoreItem = () => {
    console.log("load more item");
    setCurrentPage(currentPage + 1);
  }

  const handleRefresh = () => {
    console.log("refresh");
    setRefreshing(true);    
    setQRInfoData([]);    
    setCurrentPage(1);    
    //getData();
  }

  useFocusEffect(
    useCallback(() => {
      console.log("focus callback");
      getId();
      
    },[])
  );

  const getId = async () => {
    const id = await AsyncStorage.getItem("selectItemId");
    
    if(id !== "-1"){
      console.log("delete id", id);
      handleRefreshData(Number(id));
    }else{
      console.log("id", id);
    }
    
  }

  useEffect(() => {    
    console.log("get data");
    getData();
  }, [currentPage]);

  const handleDetailsItem = (id) => {
    console.log("qr id: ", id);
    AsyncStorage.setItem("selectItemId", JSON.stringify(-1));
    //setItemId(-1);
    navigation.navigate("qrDetails", {
      qrId: id,
    })
  }

  const handleRefreshData = (id) => {
    setIsLoading(true);
    api
      .delete(
        `${BASE_URL}/api/qr/${id}`,                
      )
      .then((res) => {
        console.log("delete data",res.data);
        if(res.data.status === 200){
          let cpyListQRData = [...qrInfoData];
          cpyListQRData = cpyListQRData.filter(
            n => n.id !== id
          );
          setQRInfoData(cpyListQRData);

          showMessage({
            message: "Success",
            description: res.data.message,
            type: "success",
          });
        }else{
          showMessage({
            message: "Warning",
            description: res.data.message,
            type: "warning",
          });
        }
        

        setIsLoading(false);
      })
      .catch((e) => {
        console.log(`logout error ${e}`);
        
        showMessage({
          message: "Error",
          description: e.message,
          type: "danger",
        });
        
        setIsLoading(false);
      });
    
    
    
  }

  const handleDeleteItem = (getItemId) => {
    console.log("delete item" , getItemId);
    
    Alert.alert("Are You Sure", "This action will delete your image!",
      [
        {
          text: "Delete",
          onPress: () => handleRefreshData(getItemId),
        },
        {
          text: "No Thanks",
          onPress: () => console.log("no thanks"),
        },
      ],{
        cancelable: true,
      })
  }

  //console.log("qrInfo", qrInfoData);
  

  return (
    <View>
      <Spinner visible={isLoading} />
      <FlashMessage position="center"/>
      <FlatList
        data={qrInfoData}
        renderItem={(itemData) => (
          <HomeItem 
            latLocation={itemData.item.lat}
            lngLocation={itemData.item.lng}
            address={itemData.item.address}
            date={itemData.item.dateUpload}
            uri={itemData.item.qrImages[0].uriResize}
            onPress={() => handleDetailsItem(itemData.item.id)}
            actionDel={() => handleDeleteItem(itemData.item.id)}
          />
        )}
        //keyExtractor={(itemData) => itemData.id}
        keyExtractor={(item, index) => String(index)}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0}
        numColumns={2}
      />
      
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemData:{
    flex: 1,
  }
})