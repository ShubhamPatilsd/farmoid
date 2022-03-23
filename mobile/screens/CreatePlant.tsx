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
  TextInput,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { PlantTile } from "../components/PlantTile";
import { api } from "../util/api";
import Icon from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import { plantTypes } from "../util/plantTypes";
import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
  Inter_600SemiBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import AppLoading from "expo-app-loading";
const { width, height } = Dimensions.get("screen");

export function CreatePlantScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Inter_600SemiBold,
    Inter_900Black,
  });
  const [user, setUser] = useState<any>("Not Retrieved");
  const [plantName, setPlantName] = useState<string>("");
  const [selectedType, setSelectedType] = useState();
  const styles = StyleSheet.create({
    input: {
      //   height: 60,
      //   borderWidth: 1,
      borderRadius: 15,
      paddingVertical: 10,
      paddingHorizontal: 20,
      fontSize: 16,
      backgroundColor: "white",
      //   flex: 1,
      marginBottom: 15,
      fontFamily: "Inter_600SemiBold",
    },
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView
        style={[
          {
            paddingTop:
              Platform.OS === "android" ? StatusBar.currentHeight + 20 : 20,
            // paddingBottom:
            //   Platform.OS === "android" ? StatusBar.currentHeight : 0,
            backgroundColor: "#EDF9F5",
            paddingHorizontal: 20,
            // flex: 1,
            // height: height,
            height: height,

            // padding: 20,
          },
        ]}
      >
        {/* <Text
          style={{
            fontFamily: "Inter_900Black",
            fontSize: 36,
            marginBottom: 20,
          }}
        >
          Create a Plant
        </Text> */}
        <TextInput
          style={styles.input}
          placeholder="What is your plant called?"
          value={plantName}
          keyboardType="default"
          autoCorrect={false}
          onChangeText={(text) => setPlantName(text)}
          selectionColor="#0d9f61"
        />
        <View
          style={{
            borderColor: "#0d9f61",
            borderWidth: 2,
            borderRadius: 15,
            padding: 5,
          }}
        >
          <View style={{ backgroundColor: "white", borderRadius: 15 }}>
            <Picker
              selectedValue={selectedType}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedType(itemValue)
              }
            >
              <Picker.Item
                value="0"
                label="Plant Type"
                color="grey"
                style={{ fontFamily: "Inter_600SemiBold" }}
              />
              {plantTypes.map((plantType, i) => {
                return (
                  <Picker.Item
                    key={i}
                    value={plantType}
                    label={plantType}
                    style={{ fontFamily: "Inter_600SemiBold" }}
                  />
                );
              })}
            </Picker>
          </View>
        </View>

        <Pressable
          onPress={() => {
            // navigation.navigate("Login");
            firebaseAuth.onAuthStateChanged(auth, (userData) => {
              if (userData) {
                setUser(userData);

                firebaseAuth
                  .getAuth()
                  .currentUser.getIdToken(true)
                  .then((idToken) => {
                    api({
                      method: "POST",
                      url: "/garden/plant/create",
                      data: {
                        authToken: idToken,
                        name: plantName,
                        plantType: selectedType,
                      },
                    });
                    // catch((err) => {
                    //   console.log(err);
                    // });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            });
          }}
          style={{
            borderRadius: 10,
            backgroundColor: "#0d9f61",
            paddingHorizontal: 20,
            paddingVertical: 15,
            width: "100%",
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "#fff",
              textAlign: "center",
              fontFamily: "Inter_700Bold",
            }}
          >
            Create
          </Text>
        </Pressable>
      </SafeAreaView>
    );
  }
}
