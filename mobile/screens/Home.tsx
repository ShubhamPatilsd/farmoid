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
import { GardenHomeTile } from "../components/GardenHomeTile";
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

  data = [
    { key: "left-spacer", spacer: true },
    ...data,
    { key: "right-spacer", spacer: true },
  ];

  const ITEM_SIZE = width * 0.82;
  const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;

  const handleLogout = () => {
    firebaseAuth.signOut(auth);
    console.log("hi");
  };

  const [user, setUser] = useState<any>("Not Retrieved");

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(auth, (userData) => {
      if (userData) {
        setUser(userData);
      }
    });
  }, []);
  return (
    <SafeAreaView
      style={[
        {
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          backgroundColor: "#EDF9F5",
          // flex: 1,
          height: height,
        },
      ]}
    >
      {/* <Text style={{ fontSize: 36 }}>Hello, {user.email}</Text> */}

      <FlatList
        data={data}
        keyExtractor={(_, index) => {
          return index.toString();
        }}
        horizontal
        // style={{ height: height }}
        // onMomentumScrollEnd={onScrollEnd}
        pagingEnabled
        // scrollEventThrottle={1}
        // onScrollBeginDrag={12}
        disableIntervalMomentum
        // contentContainerStyle={{
        //   alignItems: "center",
        // }}
        // onScroll={Animated.event(
        //   [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        //   {
        //     useNativeDriver: true,
        //   }
        // )}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={5}
        snapToInterval={ITEM_SIZE}
        decelerationRate={0.75}
        renderItem={({ item, index }) => {
          if (item.spacer) {
            return <View style={{ width: SPACER_ITEM_SIZE }} />;
          }

          return (
            <View
              style={{
                width: ITEM_SIZE,
                // height: height,
              }}
            >
              <GardenHomeTile uri={item} name="Tom's Garden" />
            </View>
          );
        }}
      />
      {/* <View style={{ display: "flex", alignItems: "center" }}>
        <Paginator data={data} scrollX={scrollX} />
      </View> */}

      {/* <Button onPress={handleLogout} title="Logout" /> */}
    </SafeAreaView>
  );
}
