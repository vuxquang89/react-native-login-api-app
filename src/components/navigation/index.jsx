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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Bottomtabs() {
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
        }}
        name="homeScreen"
        component={HomeScreen}
      ></Stack.Screen>

      <Tab.Screen
        options={{
          title: "Create QR",
          tabBarLabel: "Create QR",
          tabBarLabelStyle: {
            fontSize: 14,
            //color: "#006600",
          },
        }}
        name="createQRScreen"
        component={CreateQRScreen}
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
        ) : (
          <>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="bottomTabs"
              component={Bottomtabs}
            />

            <Stack.Screen
              options={{
                title: "QR Scanner",
              }}
              name="scannerScreen"
              component={ScannerScreen}
            />
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