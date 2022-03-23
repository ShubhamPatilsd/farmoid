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
} from "react-native";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { PlantTile } from "../components/PlantTile";
import { api } from "../util/api";
import Icon from "react-native-vector-icons/Ionicons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
  Inter_600SemiBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import AppLoading from "expo-app-loading";
// import { Paginator } from "../components/GardenPaginator";
const { width, height } = Dimensions.get("screen");

export function HomeScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Inter_600SemiBold,
    Inter_900Black,
  });
  let data: any[] = [
    "https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200",
    "https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200",
    "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80",
    "https://images.unsplash.com/photo-1571192776145-9f563c1df686?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Z2FyZGVufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1547389432-95b8f3c47f3c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Z2FyZGVufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1559749284-7a6971fd798e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGdhcmRlbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  ];

  const handleLogout = () => {
    firebaseAuth.signOut(auth);
    console.log("hi");
  };

  const [user, setUser] = useState<any>("Not Retrieved");
  const [plants, setPlants] = useState<any>([]);

  const tabBarHeight = useBottomTabBarHeight();

  console.log("tabBarHeight", tabBarHeight);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(auth, (userData) => {
      if (userData) {
        setUser(userData);

        firebaseAuth
          .getAuth()
          .currentUser.getIdToken(true)
          .then(async (idToken) => {
            // console.log(idToken);
            const result: any = await api({
              method: "POST",
              url: "/garden/info",
              data: {
                authToken: idToken,
              },
            });
            // console.log(result.data);
            setPlants(result.data.plants);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
    //   }
    // });
  }, []);
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView
        style={[
          {
            paddingTop:
              Platform.OS === "android" ? StatusBar.currentHeight + 20 : 20,
            paddingBottom: Math.ceil(tabBarHeight),
            //   Platform.OS === "android" ? StatusBar.currentHeight : 0,
            backgroundColor: "#EDF9F5",
            // flex: 1,
            // height: height,
            height: height,
            position: "relative",
            paddingHorizontal: 20,

            // padding: 20,
          },
        ]}
      >
        <Text
          style={{
            fontFamily: "Inter_900Black",
            fontSize: 20,
            marginBottom: 20,
          }}
        >
          {user && user.displayName
            ? `Hey, ${user.displayName}! 👋`
            : "Hey! 👋"}
        </Text>
        <Pressable
          style={{
            position: "absolute",
            bottom: Math.ceil(tabBarHeight) * 1.5,
            right: width * 0.05,
            zIndex: 999,
            backgroundColor: "#0d9f61",
            // padding: 5,
            borderRadius: 100,
            width: 65,
            height: 65,
            // display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            navigation.navigate("Create a Plant");

            // .catch((err) => {
            //   // console.log(err);
            // });
          }}
        >
          {/* <Text style={{ color: "white", fontSize: 40 }}>+</Text>
           */}
          <Icon name="ios-add-outline" size={30} color="white" />
        </Pressable>

        <Pressable
          onPress={() => {
            handleLogout();
          }}
        >
          <Text>Hi</Text>
        </Pressable>
        <FlatList
          data={plants}
          keyExtractor={(_, index) => {
            return index.toString();
          }}
          renderItem={({ item, index }) => {
            console.log(item);
            return (
              <View
                style={
                  {
                    // width: ITEM_SIZE,
                    // height: height,
                  }
                }
              >
                {/* <Text>{item.name}</Text> */}
                <PlantTile
                  uri={`https://source.unsplash.com/1600x900/?${item.type} plant`}
                  name={item.name}
                />
              </View>
            );
          }}
        />
      </SafeAreaView>
    );
  }
}
