import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../../context";
import CreateQRScreen from "../../screens/createQR";
import HomeScreen from "../../screens/home";
import SplashScreen from "../../screens/home/splashScreen";
import LoginScreen from "../../screens/login";
import RegisterScreen from "../../screens/register";
import ScannerScreen from "../../screens/scanner";
import QRDetails from "../../screens/qrDetails";
import UserInfoScreen from "../../screens/userInfo";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#006600",
        tabBarInactiveTintColor: "#8e8e93",
        tabBarLabelStyle: { textAlign: "center" },
        tabBarIndicatorStyle: {
          borderBottomColor: "#C2D5A8",
          borderBottomWidth: 2,
        },
        tabBarStyle: { backgroundColor: "#fff" },

        tabBarLabelStyle: {
          textTransform: "none",
        },
      }}
    >
      <Stack.Screen
        options={{
          title: "Home",
          tabBarLabel: "Home",
          tabBarLabelStyle: {
            fontSize: 14,
            //color: "#006600",
          },

          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="md-home"
                size={24}
                color={tabInfo.focused ? "#006600" : "#8e8e93"}
              />
            );
          },

          unmountOnBlur: true,//reload screen
        }}
        name="homeScreen"
        component={HomeScreen}

        //reload screen
        listeners={({navigation}) => ({
          blur: () => navigation.setParams({screen : undefined})
        })}
      ></Stack.Screen>

      <Tab.Screen
        options={{
          title: "QR Code",
          tabBarLabel: "QR Code",
          tabBarLabelStyle: {
            fontSize: 14,
            //color: "#006600",
          },
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="scan-sharp"
                size={24}
                color={tabInfo.focused ? "#006600" : "#8e8e93"}
              />
            );
          },
        }}
        
        name="createQRScreen"
        component={CreateQRScreen}
      />

      <Tab.Screen
        options={{
          title: "Infomation",
          tabBarLabel: "Info",
          tabBarLabelStyle: {
            fontSize: 14,
            //color: "#006600",
          },
          tabBarIcon: (tabInfo) => {
            return (
              
              <Ionicons
                name="information-circle-outline"
                size={24}
                color={tabInfo.focused ? "#006600" : "#8e8e93"}
              />
            );
          },
        }}
        
        name="userInfoScreen"
        component={UserInfoScreen}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  const { userInfo, splashLoading } = useContext(AuthContext);
  //console.log(userInfo.username);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {splashLoading ? (
          <Stack.Screen
            name="splashScreen"
            component={SplashScreen}
            options={{
              headerShown: false,
            }}
          ></Stack.Screen>
        ) : userInfo.accessToken ? (
          <>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="bottomTabs"
              component={BottomTabs}
            />

            <Stack.Screen
              options={{
                title: "QR Scanner",
              }}
              name="scannerScreen"
              component={ScannerScreen}
            />

            <Stack.Screen
              options={{
                title: "QR Details",
              }}
              name="qrDetails"
              component={QRDetails}
            />
            
          </>
        ) : (
          <>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="loginScreen"
              component={LoginScreen}
            ></Stack.Screen>

            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="registerScreen"
              component={RegisterScreen}
            ></Stack.Screen>
          </>
          
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
