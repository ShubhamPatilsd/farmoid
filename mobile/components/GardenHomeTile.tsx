import React from "react";
import { View, Image, Dimensions, Text } from "react-native";
const { width, height } = Dimensions.get("screen");
import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import AppLoading from "expo-app-loading";

const imageW = width;
const imageH = imageW;

interface GardenHomeTileProps {
  uri: string;
  name: string;
}

const paddingNum = 20;

export function GardenHomeTile<GardenHomeTileProps>({ uri, name }) {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View
        style={{
          padding: paddingNum,
        }}
      >
        <Image
          source={{ uri }}
          style={{
            width: imageW * ((100 - paddingNum / 2) * 0.01),
            height: width * 0.4,
            resizeMode: "cover",
            borderRadius: 25,
          }}
        />
        <Text
          style={{
            fontSize: 22,
            color: "#000",
            fontFamily: "Inter_600SemiBold",
            textAlign: "center",
            marginTop: 5,
          }}
        >
          {name}
        </Text>
      </View>
    );
  }
}
