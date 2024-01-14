import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Categories } from "../../constants/db";
import { Card } from "../components/Card";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const [activeJobType, setActiveJobType] = useState("Cattleya");
  const [favoriteList, setFavoriteList] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    Categories.filter((item) => item.name === activeJobType).map((item) =>
      setData(item.items)
    );
    async function fetchMyAPI() {
      setFavoriteList(
        JSON.parse(await AsyncStorage.getItem("favorites"))
          ? JSON.parse(await AsyncStorage.getItem("favorites"))
          : []
      );
    }
    fetchMyAPI();
  }, [activeJobType]);

  const onAddFarvoite = async (item) => {
    try {
      // Check if the item with the same ID already exists in favorites
      if (favoriteList !== null) {
        const existingItem = favoriteList.find((favItem) =>
          Object.is(favItem.name, item.name)
        );
        if (existingItem) {
          ToastAndroid.show(
            "The item exists in the favorites list!",
            ToastAndroid.SHORT
          );
        } else {
          favoriteList.push(item);
          await AsyncStorage.setItem("favorites", JSON.stringify(favoriteList));
          ToastAndroid.show("Add to farovite succesfully!", ToastAndroid.SHORT);
        }
      } else {
        favoriteList.push(item);
        await AsyncStorage.setItem("favorites", JSON.stringify(favoriteList));
        ToastAndroid.show("Add to farovite succesfully!", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log("Error adding item to favorites:", error);
    }
  };

  const styles = StyleSheet.create({
    safearea: {
      flex: 1,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    },
    container: {
      paddingHorizontal: 24,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    tab: (activeJobType, item) => ({
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: activeJobType === item ? "#000" : "#ccc",
      margin: 5,
    }),
  });

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={{ paddingHorizontal: 24 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 12,
            marginTop: 12,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 600, color: "#000" }}>
            Trendings
          </Text>
        </View>
      </View>
      <View>
        <ScrollView
          horizontal={true}
          style={{ paddingHorizontal: 24 }}
          showsHorizontalScrollIndicator={false}
        >
          {Categories.map((category, index) => (
            <View key={index} style={{ height: 50 }}>
              <TouchableOpacity
                style={styles.tab(activeJobType, category.name)}
                onPress={() => {
                  setActiveJobType(category.name);
                }}
              >
                <Text>{category.name}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={{}}>
        <ScrollView style={{ height: "100%", columnGap: 2 }}>
          {data.map((item, index) => (
            <Card
              key={index}
              item={item}
              favoriteList={favoriteList}
              setFavoriteList={setFavoriteList}
              onAddFarvoite={() => onAddFarvoite(item)}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
