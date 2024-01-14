import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";

export const Card = ({ item, onAddFarvoite }) => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        onPress={onAddFarvoite}
        style={{
          position: "absolute",
          right: 36,
          top: 12,
          zIndex: 1,
        }}
      >
        <Ionicons name="heart-circle" size={42} color={"#ccc"} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Detail", item)}
        style={{
          position: "relative",
          marginHorizontal: 24,
          borderRadius: 10,
          height: 150,
          marginBottom: 10,
          overflow: "hidden",
        }}
      >
        <Image
          source={{
            uri: item.image,
          }}
          resizeMode="cover"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
        />
        <View
          style={{
            position: "absolute",
            left: 12,
            top: 12,
            paddingHorizontal: 12,
            paddingVertical: 8,
            backgroundColor: "rgba(0,0,0,0.25)",
            borderRadius: 100,
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "600", color: "#fff" }}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
