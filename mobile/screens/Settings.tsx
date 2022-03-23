import { auth, firebaseAuth } from "../util/firebase";
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  SafeAreaView,
  Platform,
  Button,
  Animated,
  useWindowDimensions,
  TextInput,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import React from "react";
import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
  Inter_600SemiBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import AppLoading from "expo-app-loading";
const { width, height } = Dimensions.get("screen");
import Icon from "react-native-vector-icons/MaterialIcons";

export function SettingsPage({ navigation }) {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Inter_600SemiBold,
    Inter_900Black,
  });
  const [user, setUser] = useState<any>("Not Retrieved");
  const [name, setName] = useState<string>("");
  const [updateButtonHidden, setUpdateButtonHidden] = useState<boolean>(false);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(auth, (userData) => {
      if (userData) {
        setUser(userData);
        setName(userData.displayName);
      }
    });
    //   }
    // });
  }, []);
  const styles = StyleSheet.create({
    input: {
      //   height: 60,
      //   borderWidth: 1,
      borderRadius: 15,
      paddingVertical: 10,
      paddingHorizontal: 20,
      fontSize: 16,
      backgroundColor: "white",
      //   flex: 1,
      marginBottom: 15,
      fontFamily: "Inter_600SemiBold",
      borderWidth: 2,
      borderColor: "#0d9f61",
    },
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView
        style={[
          {
            paddingTop:
              Platform.OS === "android" ? StatusBar.currentHeight + 20 : 20,
            // paddingBottom:
            //   Platform.OS === "android" ? StatusBar.currentHeight : 0,
            backgroundColor: "#EDF9F5",
            paddingHorizontal: 20,
            // flex: 1,
            // height: height,
            height: height,

            // padding: 20,
          },
        ]}
      >
        <Text
          style={{
            fontFamily: "Inter_900Black",
            fontSize: 36,
            marginBottom: 20,
          }}
        >
          {/* {user && user.displayName
            ? `Hey, ${user.displayName}! 👋`
            : "Hey! 👋"} */}
          Settings
        </Text>

        <Text
          style={{
            fontFamily: "Inter_900Black",
            marginBottom: 5,
            marginLeft: 10,
            fontSize: 15,
          }}
        >
          Name:
        </Text>

        <TextInput
          style={styles.input}
          selectionColor="#0d9f61"
          value={name}
          placeholder="What's your name?"
          onChangeText={(text) => {
            if (text !== user.displayName) {
              setUpdateButtonHidden(true);
            } else {
              setUpdateButtonHidden(false);
            }
            setName(text);
          }}
        />

        {updateButtonHidden && (
          <Pressable
            onPress={() => {
              // navigation.navigate("Login");
              // firebaseAuth.signOut(auth);
              firebaseAuth
                .updateProfile(user, {
                  displayName: name,
                })
                .then(() => {
                  firebaseAuth.onAuthStateChanged(auth, (userData) => {
                    if (userData) {
                      setUser(userData);
                      setName(userData.displayName);
                      setUpdateButtonHidden(false);
                    }
                    console.log("User Updated", userData.displayName);
                  });
                })
                .catch(() => {
                  alert("Error updating profile");
                });
            }}
            style={{
              borderRadius: 10,
              backgroundColor: "#0d9f61",
              paddingHorizontal: 20,
              paddingVertical: 15,
              width: "100%",
              marginTop: 20,
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontFamily: "Inter_900Black",
                color: "white",
                fontSize: 18,
                marginRight: 10,
              }}
            >
              Update
            </Text>
          </Pressable>
        )}

        <Pressable
          onPress={() => {
            // navigation.navigate("Login");
            firebaseAuth.signOut(auth);
          }}
          style={{
            borderRadius: 10,
            backgroundColor: "#0d9f61",
            paddingHorizontal: 20,
            paddingVertical: 15,
            width: "100%",
            marginTop: 20,
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_900Black",
              color: "white",
              fontSize: 18,
              marginRight: 10,
            }}
          >
            Log Out
          </Text>
          <Icon name="logout" size={30} color="white" />
        </Pressable>
      </SafeAreaView>
    );
  }
}
