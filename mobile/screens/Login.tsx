import { View, StyleSheet, Text } from "react-native";
import { Layout } from "../components/Layout";

import AppLoading from "expo-app-loading";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import React, { useState, useEffect } from "react";

export const LoginPage = () => {
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
      padding: 10,
    },
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Layout backgroundColor="#52b788">
        <View style={styles.container}>
          <Text style={[styles.h1]}>Greenable</Text>
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              color: "white",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            Welcome to the new way of keeping up with your plants.
          </Text>
        </View>
      </Layout>
    );
  }
};
