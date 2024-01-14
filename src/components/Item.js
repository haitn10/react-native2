import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";

export const Item = ({ item, favorites, setFavorites }) => {
  const navigation = useNavigation();

  const deleteFavorite = async (item) => {
    try {
      const updatedFavorites = favorites.filter(
        (favorite) => !Object.is(favorite.name, item.item.name)
      );
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
      ToastAndroid.show("Deleted favorite item successfully!", ToastAndroid.SHORT);
    } catch (error) {
      console.log("Error deleting favorite:", error);
    }
  };

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Detail", item.item);
        }}
        style={{ flex: 1, flexDirection: "row", alignItems: "center", gap: 10 }}
      >
        <Image source={{ uri: item.item.image }} style={styles.itemImage} />
        <View>
          <Text style={{ color: "#000", fontWeight: "800" }}>
            {item.item.name}
          </Text>
          <Text style={{ color: "#000" }}>${item.item.price}</Text>
        </View>
      </TouchableOpacity>
      <Pressable onPress={() => deleteFavorite(item)}>
        <Ionicons name="trash" size={20} color={"#000"} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    width: "100%",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
  },
  itemImage: {
    borderRadius: 20,
    height: 40,
    width: 40,
  },
});
