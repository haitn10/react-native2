import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { List } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export const DetailScreen = ({ navigation, route }) => {
  return (
    <View style={{ flex: 1 }}>
      <Image
        source={{
          uri: route.params.image,
        }}
        style={{ flex: 1, resizeMode: "cover" }}
      />

      <SafeAreaView
        edges={["top"]}
        style={{ position: "absolute", top: 0, left: 0, right: 0 }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 20,
            gap: 8,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 52,
              borderWidth: 1,
              borderColor: "#ccc",
            }}
          >
            <Ionicons name="arrow-back" size={24} color={"#ccc"} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <View style={{ padding: 16, gap: 16, flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 20, fontWeight: "700", color: "#000" }}>
              {route.params.name}
            </Text>
            <Text
              style={{
                color: "#000",
                opacity: 0.75,
                fontWeight: "600",
                fontSize: 16,
                marginTop: 5,
                marginRight: 10,
              }}
            >
              ${`${route.params.price}`.toLocaleString()}
            </Text>
          </View>

          {route.params.isTopOfTheWeek ? (
            <View>
              <Text
                style={{
                  fontSize: 16,
                  color: "#fff",
                  backgroundColor: "#da0000",
                  borderRadius: 10,
                  padding: 5,
                  overflow: "hidden",
                }}
              >
                Top of Week
              </Text>
            </View>
          ) : null}
        </View>

        <View style={{ flexDirection: "row", gap: 2 }}>
          <Text
            style={{
              fontSize: 14,
              color: "#000",
              textAlign: "center",
            }}
          >
            Rating:{" "}
            {new Array(5).fill("").map((_, i) => (
              <Ionicons
                key={i}
                name={
                  i + 0.5 < Number(route.params.rating)
                    ? "star-sharp"
                    : "star-half-sharp"
                }
                color="#facc15"
                size={20}
              />
            ))}{" "}
            ({route.params.rating} stars)
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 14,
              color: "#000",
              textTransform: "capitalize",
            }}
          >
            Bonus: {route.params.bonus}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <List.Item
            title="Color"
            description={route.params.color}
            style={{ flex: 1, flexDirection: "column" }}
            titleStyle={{ fontWeight: 500 }}
            descriptionStyle={{ opacity: 0.5 }}
            left={() => <Ionicons name="color-filter-outline" size={20} />}
          />
          <List.Item
            title="Weight"
            description={route.params.weight}
            style={{ flex: 1, flexDirection: "column" }}
            titleStyle={{ fontWeight: 500 }}
            descriptionStyle={{ opacity: 0.5 }}
            left={() => <Ionicons name="barbell-outline" size={20} />}
          />
          <List.Item
            title="Origin"
            description={route.params.origin}
            style={{ flex: 1, flexDirection: "column" }}
            titleStyle={{ fontWeight: 500 }}
            descriptionStyle={{ opacity: 0.5 }}
            left={() => (
              <Ionicons name="golf-outline" color="green" size={20} />
            )}
          />
        </View>
      </View>
    </View>
  );
};
