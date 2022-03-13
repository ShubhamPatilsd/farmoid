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
// import { Paginator } from "../components/GardenPaginator";
const { width, height } = Dimensions.get("screen");

export function HomeScreen() {
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

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(auth, (userData) => {
      if (userData) {
        setUser(userData);

        firebaseAuth
          .getAuth()
          .currentUser.getIdToken(true)
          .then(async (idToken) => {
            console.log(idToken);
            const result = await api({
              method: "POST",
              url: "/garden/info",
              data: {
                authToken: idToken,
              },
            });

            setPlants(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
    //   }
    // });
  }, []);
  return (
    <SafeAreaView
      style={[
        {
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          // paddingBottom:
          //   Platform.OS === "android" ? StatusBar.currentHeight : 0,
          backgroundColor: "#EDF9F5",
          // flex: 1,
          // height: height,
          height: height,

          // padding: 20,
        },
      ]}
    >
      <Pressable
        onPress={() => {
          firebaseAuth
            .getAuth()
            .currentUser.getIdToken(true)
            .then((idToken) => {
              // console.log(id)
              // axios({
              //   method: "POST",
              //   url: "http://localhost:5000/auth/register",
              //   data: {
              //     authToken: idToken,
              //   },
              // });

              console.log("hi");

              api({
                method: "POST",
                url: "/garden/plant/create",
                data: {
                  authToken: idToken,
                  name: "Bob ting",
                },
              });
              // catch((err) => {
              //   console.log(err);
              // });
            })
            .catch((err) => {
              console.log(err);
            });
          // .catch((err) => {
          //   // console.log(err);
          // });
        }}
      >
        <Text>Press</Text>
      </Pressable>

      <Pressable
        onPress={() => {
          handleLogout();
        }}
      >
        <Text>Hi</Text>
      </Pressable>
      <FlatList
        data={data}
        keyExtractor={(_, index) => {
          return index.toString();
        }}
        // horizontal
        // pagingEnabled
        // disableIntervalMomentum
        // showsHorizontalScrollIndicator={false}
        // scrollEventThrottle={5}
        // snapToInterval={ITEM_SIZE}
        // decelerationRate={0.75}
        renderItem={({ item, index }) => {
          return (
            <View
              style={
                {
                  // width: ITEM_SIZE,
                  // height: height,
                }
              }
            >
              <PlantTile uri={item} name="Tom's Garden" />
            </View>
          );
        }}
      />
      <Pressable
        style={{
          borderRadius: 10,
          backgroundColor: "black",
          borderColor: "white",
          marginBottom: 50,
          borderWidth: 2,
          paddingHorizontal: 20,
          paddingVertical: 15,
          width: "100%",
        }}
      >
        <Text>Press</Text>
      </Pressable>
    </SafeAreaView>
  );
}
