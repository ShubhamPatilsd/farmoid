import React from "react";
import { View, Image, Dimensions, Text } from "react-native";
const { width, height } = Dimensions.get("screen");
import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
  Inter_600SemiBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import AppLoading from "expo-app-loading";
import Icon from "react-native-vector-icons/Feather";

const imageW = width;
const imageH = imageW;

interface PlantTileProps {
  uri: string;
  name: string;
  moisture: number;
}

const paddingNum = 10;

export function PlantTile<PlantTileProps>({ uri, name, moisture }) {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Inter_600SemiBold,
    Inter_900Black,
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
        <View>
          <Image
            source={{ uri }}
            style={{
              width: width * 0.9,
              height: width * 0.5,
              // marginRight: ,
              resizeMode: "cover",
              borderRadius: 25,
            }}
          />
          <View
            style={{
              position: "absolute",
              top: (50 % -(width * 0.5)) / 2,
              alignSelf: "center",
              // left: width * 0.37,
              backgroundColor: "#0d9f61",
              borderRadius: 100,
              width: 100,
              height: 100,
              padding: 20,
              opacity: 0.9,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="droplet" color="white" size={30} />
            <Text
              style={{
                fontFamily: "Inter_900Black",
                fontSize: 18,
                color: "white",
              }}
            >
              {" "}
              {moisture}%
            </Text>
          </View>
        </View>
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
              fontFamily: "Inter_900Black",
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
