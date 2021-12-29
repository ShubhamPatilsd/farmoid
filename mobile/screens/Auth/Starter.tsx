import { View, StyleSheet, Text, Pressable } from "react-native";
import { LoginLayout as Layout } from "../../components/LoginLayout";
// import { useNavigation } from "@react-navigation/core";

import AppLoading from "expo-app-loading";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import React, { useState, useEffect } from "react";

export const StarterPage = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  const styles = StyleSheet.create({
    h1: {
      fontSize: 48,
      color: "#fff",
      fontFamily: "Poppins_700Bold",
    },
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      padding: 20,
    },
    btn: {
      borderRadius: 25,
      backgroundColor: "white",
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 10,
      paddingRight: 10,
      width: "100%",
    },
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Layout backgroundColor="#52b788">
        <View style={styles.container}>
          <View style={{ marginBottom: "10%" }}>
            <Text style={[styles.h1]}>Greenable</Text>
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
                color: "white",
                fontSize: 20,
              }}
            >
              Welcome to the new way of keeping up with your plants.
            </Text>
          </View>
          <Pressable
            onPress={() => {
              navigation.navigate("Register");
            }}
            style={[styles.btn, { marginBottom: 10 }]}
          >
            <Text
              style={{
                fontSize: 24,
                color: "#52b788",
                fontWeight: "bold",
                textAlign: "center",
                fontFamily: "Poppins_700Bold",
              }}
            >
              Sign Up
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              navigation.navigate("Login");
            }}
            style={styles.btn}
          >
            <Text
              style={{
                fontSize: 24,
                color: "#52b788",
                fontWeight: "bold",
                textAlign: "center",
                fontFamily: "Poppins_700Bold",
              }}
            >
              Login
            </Text>
          </Pressable>
        </View>
      </Layout>
    );
  }
};
