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

const paddingNum = 10;

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
          // padding: paddingNum,
          // marginRight: paddingNum * ,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri }}
          style={{
            width: width * 0.78,
            height: width * 0.5,
            // marginRight: ,
            resizeMode: "cover",
            borderRadius: 25,
          }}
        />
        <View
          style={{
            transform: [{ translateY: -50 }],
            backgroundColor: "#fff",
            padding: 20,
            borderRadius: 15,
            width: width * 0.65,
            // borderColor: "lightgrey",
            // borderWidth: 1,
            shadowColor: "#0C9359",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4.65,
            elevation: 7,
          }}
        >
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
      </View>
    );
  }
}
