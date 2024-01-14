import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Item } from "../components/Item";

export const FavoriteScreen = () => {
  const insets = useSafeAreaInsets();
  const [favoriteList, setFavoriteList] = useState([]);

  useEffect(() => {
    async function fetchMyAPI() {
      setFavoriteList(
        JSON.parse(await AsyncStorage.getItem("favorites"))
          ? JSON.parse(await AsyncStorage.getItem("favorites"))
          : []
      );
    }
    fetchMyAPI();
  }, []);

  const deleteAllFavorites = async () => {
    try {
      await AsyncStorage.removeItem("favorites");
      setFavoriteList([]);
      ToastAndroid.show(
        "Clear favorites list successfully!",
        ToastAndroid.SHORT
      );
    } catch (error) {
      ToastAndroid.show("Clear favorites list failed!", ToastAndroid.SHORT);
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
      flex: 1,
      backgroundColor: "#333333",
    },
  });

  return (
    <SafeAreaView style={styles.safearea}>
      <View
        style={{
          paddingHorizontal: 24,
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 1,
          gap: 8,
          borderBottomColor: "#000",
        }}
      >
        <View style={{ flex: 1, padding: 10 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              marginBottom: 8,
              color: "#000",
              textAlign: "center",
            }}
            numberOfLines={1}
          >
            My Favorites
          </Text>
        </View>
      </View>

      {favoriteList.length > 0 ? (
        <View
          style={{
            justifyContent: "flex-end",
            flexDirection: "row",
            paddingHorizontal: 20,
            margin: 10,
          }}
        >
          <Pressable onPress={() => deleteAllFavorites()}>
            <Text
              style={{
                color: "#333",
                textTransform: "uppercase",
                fontSize: 13,
                fontWeight: "bold",
              }}
            >
              Clear all
            </Text>
          </Pressable>
        </View>
      ) : null}

      <View style={{ paddingHorizontal: 16, marginTop: 10 }}>
        {favoriteList.length > 0 ? (
          <FlatList
            data={favoriteList}
            renderItem={(item) => (
              <Item
                item={item}
                favorites={favoriteList}
                setFavorites={setFavoriteList}
              />
            )}
            keyExtractor={(item) => item.name}
            numColumns={1}
          />
        ) : (
          <Text style={{ color: "#000", textAlign: "center", marginTop: 10 }}>
            No favorites yet
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};
