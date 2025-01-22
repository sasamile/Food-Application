import React, { useEffect, useState } from "react";
import { RestaurantId } from "@/src/app/food-detail";
import { useRouter } from "expo-router";
import { FlatList } from "react-native";
import CardRestaurant from "./item";

export default function FamososRestaurants() {
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState<RestaurantId[]>([]);

  useEffect(() => {
    async function getFoods() {
      const response = await fetch(
        "https://warm-precious-pig.ngrok-free.app/restaurants"
      );
      const data = await response.json();

      setRestaurants(data);
    }
    getFoods();
  }, []);

  return (
    <FlatList
      data={restaurants}
      renderItem={({ item }) => <CardRestaurant restaurant={item} />}
      horizontal={true}
      contentContainerStyle={{
        gap: 18,
        paddingLeft: 16,
        paddingRight: 16,
        marginTop: 10,
        marginBottom: 10,
      }}
      showsHorizontalScrollIndicator={false}
    />
  );
}
