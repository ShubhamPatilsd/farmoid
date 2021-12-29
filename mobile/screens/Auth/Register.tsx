import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TextInputBase,
  TextInput,
  Platform,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { LoginLayout as Layout } from "../../components/LoginLayout";

import { auth, firebaseAuth } from "../../util/firebase";

import AppLoading from "expo-app-loading";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";

export const RegisterPage = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  // const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    console.log("hi");
    firebaseAuth
      .createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((err) => {
        console.log(err.code, err.message);
      });
  };

  const styles = StyleSheet.create({
    h1: {
      fontSize: 48,
      color: "#fff",
      fontFamily: "Poppins_700Bold",
    },

    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "stretch",
      height: "100%",
      padding: 20,
    },
    btn: {
      borderRadius: 10,
      backgroundColor: "white",
      paddingHorizontal: 20,
      paddingVertical: 15,
      //   width: "100%",
    },
    input: {
      //   height: 60,
      //   borderWidth: 1,
      borderRadius: 5,
      paddingVertical: 10,
      paddingHorizontal: 20,
      fontSize: 16,
      backgroundColor: "white",
      //   flex: 1,
      marginBottom: 15,
    },
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Layout backgroundColor="#52b788">
        {/* <SafeAreaView
          style={{
            paddingTop: Platform.OS !== "ios" ? StatusBar.currentHeight * 4 : 0,
          }}
        > */}
        {/* </SafeAreaView> */}

        <View style={styles.container}>
          <View>
            <Text style={styles.h1}>Register</Text>
            {/* <Text>
              {email}
              {password}
            </Text> */}
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                marginBottom: "10%",
                fontSize: 20,
              }}
            >
              Welcome to Greenable! Take a step in helping your plants by
              signing up below
            </Text>

            {/* <Text
              style={{
                fontFamily: "Poppins_400Regular",
                color: "white",
                fontSize: 20,
              }}
            >
              Welcome to the new way of keepsdfsdfing up with your plants.
            </Text> */}
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              autoCompleteType="email"
              keyboardType="email-address"
              autoCorrect={false}
              onChangeText={(text) => setEmail(text)}
            />

            <TextInput
              style={styles.input}
              value={password}
              placeholder={"Password"}
              autoCompleteType={"password"}
              textContentType={"password"}
              secureTextEntry={true}
              autoCorrect={false}
              onChangeText={(text) => setPassword(text)}
            />
            <Pressable
              style={[styles.btn, { marginTop: 10 }]}
              onPress={handleSignUp}
            >
              <Text
                style={{
                  fontSize: 25,
                  color: "#52b788",
                  textAlign: "center",
                  fontFamily: "Poppins_700Bold",
                }}
              >
                Let's Go
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                navigation.navigate("Starter");
              }}
              style={{ marginTop: 10 }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {" "}
                Not the right page? Go Back
              </Text>
            </Pressable>
          </View>
        </View>
      </Layout>
    );
  }
};
