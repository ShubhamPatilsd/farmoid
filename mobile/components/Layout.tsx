import {
  View,
  Platform,
  StatusBar,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { StatusBar as StatusBarExpo } from "expo-status-bar";
import React from "react";

export const Layout = ({ children, backgroundColor }: any) => {
  const styles = StyleSheet.create({
    container: {
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      backgroundColor: !backgroundColor ? "#fff" : backgroundColor,
      height: "100%",
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      <StatusBarExpo style="dark" />
      {children}
    </SafeAreaView>
  );
};
