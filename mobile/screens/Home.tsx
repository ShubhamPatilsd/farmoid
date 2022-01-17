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
import { Paginator } from "../components/GardenPaginator";
const { width, height } = Dimensions.get("screen");

export function HomeScreen() {
  const data = [
    // "https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200",
    // "https://cdn.dribbble.com/users/3281732/screenshots/13130602/media/592ccac0a949b39f058a297fd1faa38e.jpg?compress=1&resize=1200x1200",
    // "https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200",
    // "https://cdn.dribbble.com/users/3281732/screenshots/11205211/media/44c854b0a6e381340fbefe276e03e8e4.jpg?compress=1&resize=1200x1200",
    // "https://cdn.dribbble.com/users/3281732/screenshots/7003560/media/48d5ac3503d204751a2890ba82cc42ad.jpg?compress=1&resize=1200x1200",
    // "https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200",
    // "https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200",
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

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(auth, (userData) => {
      if (userData) {
        setUser(userData);
      }
    });
  }, []);
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaView
      style={[
        { flex: 1 },
        {
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        },
      ]}
    >
      <Text style={{ fontSize: 36 }}>Hello, {user.email}</Text>
      <FlatList
        data={data}
        keyExtractor={(_, index) => {
          return index.toString();
        }}
        horizontal
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return <GardenHomeTile uri={item} name="Tom's Garden" />;
        }}
      />
      <Paginator data={data} scrollX={scrollX} />
      <Button onPress={handleLogout} title="Logout" />
    </SafeAreaView>
  );
}
