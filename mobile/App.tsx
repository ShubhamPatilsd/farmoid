import { StatusBar } from "expo-status-bar";
import { StatusBar as StatusBarExpo } from "expo-status-bar";
import { useEffect, useState } from "react";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StarterPage } from "./screens/Auth/Starter";
import { RegisterPage } from "./screens/Auth/Register";
import { auth, firebaseAuth } from "./util/firebase";
import { LoginPage } from "./screens/Auth/Login";
import { HomeScreen } from "./screens/Home";
import { CreatePlantScreen } from "./screens/CreatePlant";
import Toast from "react-native-toast-message";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Feather";
import { SettingsPage } from "./screens/Settings";

// import SplashScreen from "./components/SplashScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [user, setUser] = useState<any>("Not Retrieved");

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(auth, (userData) => {
      if (userData) {
        setUser(userData);
      }
    });
  }, []);

  // const navigation = useNavigation();

  firebaseAuth.onAuthStateChanged(auth, (userData) => {
    console.log(userData);
    // if (userData) {
    setUser(userData);
    // }
  });
  // user === "Not Retrieved" ? (
  //   <SplashScreen />
  //) :

  function Main() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#0d9f61",
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" size={size} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Settings"
          component={SettingsPage}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name="settings" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <>
      <NavigationContainer>
        <StatusBarExpo style="auto" />

        {user ? (
          // <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Main}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Create a Plant"
              component={CreatePlantScreen}
              // options={{ headerShown: false }}
            />
            {/* <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="Settings" component={Settings} /> */}
          </Stack.Navigator>
        ) : (
          // </NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Starter"
              component={StarterPage}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Login"
              component={LoginPage}
              options={{ headerShown: false }}
            />
            {/* <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{ headerShown: false }}
          /> */}
            <Stack.Screen
              name="Register"
              component={RegisterPage}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        )}
        {/* </Stack.Navigator> */}
      </NavigationContainer>
      <Toast />
    </>
  );
}
