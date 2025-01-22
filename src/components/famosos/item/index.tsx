import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { RestaurantId } from "@/src/app/food-detail";
import { useRouter } from "expo-router";

export default function CardRestaurant({
  restaurant,
}: {
  restaurant: RestaurantId;
}) {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "../restaurants-detail",
      params: { id: restaurant?.id },
    });
  };
  return (
    <Pressable onPress={handlePress}>
      <View className="flex flex-col justify-center items-center">
        <Image
          source={{ uri: restaurant.image }}
          className="w-20 h-20 rounded-full"
        />
        <Text className="text-sm font-medium ">{restaurant.name}</Text>
      </View>
    </Pressable>
  );
}
