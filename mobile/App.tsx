import { StatusBar } from "expo-status-bar";
import { StatusBar as StatusBarExpo } from "expo-status-bar";
import { useEffect, useState } from "react";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StarterPage } from "./screens/Auth/Starter";
import { RegisterPage } from "./screens/Auth/Register";
import { auth, firebaseAuth } from "./util/firebase";
import { LoginPage } from "./screens/Auth/Login";
// import SplashScreen from "./components/SplashScreen";

const Stack = createNativeStackNavigator();

function HomeScreen() {
  const handleLogout = () => {
    firebaseAuth.signOut(auth);
    console.log("hi");
  };

  const [user, setUser] = useState<any>("Not Retrieved");

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(auth, (userData) => {
      if (userData) {
        setUser(userData);
      }
    });
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Pressable onPress={handleLogout}>
        <Text>logout</Text>
      </Pressable>
    </View>
  );
}

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

  return (
    <NavigationContainer>
      <StatusBarExpo style="auto" />

      {user ? (
        <HomeScreen />
      ) : (
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
  );
}
