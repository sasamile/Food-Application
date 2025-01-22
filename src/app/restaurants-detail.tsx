import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {  RestaurantId } from "./food-detail";
import { CardHorizontal } from "../components/treding/food";
import { FoodProps } from "../components/treding";

export default function RestaurantsDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [food, setFood] = useState<FoodProps[]>([]);
  const [restaurants, setRestaurants] = useState<RestaurantId | null>(null);

  console.log(restaurants);

  useEffect(() => {
    async function loadData() {
      try {
        const restaurantResponse = await fetch(
          `https://warm-precious-pig.ngrok-free.app/restaurants/${id}`
        );
        const restaurantData = await restaurantResponse.json();
        setRestaurants(restaurantData);

        const foodResponse = await fetch(
          `https://warm-precious-pig.ngrok-free.app/products?restaurantId=${id}`
        );
        const foodData = await foodResponse.json();
        setFood(foodData);
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  return (
    <ScrollView>
      <View className="relative">
        <Image
          source={{ uri: restaurants?.image }}
          className="w-full h-80"
          resizeMode="cover"
        />
        <Pressable
          onPress={() => router.back()}
          className="absolute top-12 left-4 bg-white rounded-full p-2"
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
      </View>

      <View className="p-4">
        <Text className="text-2xl font-bold flex-1">{restaurants?.name}</Text>

        <View className="mt-6">
          <Text className="text-lg font-bold mb-2">Descripción</Text>
          <Text className="text-neutral-600 leading-5">
            {restaurants?.description}
          </Text>
        </View>

        <Text className="text-lg font-bold py-6">Productos</Text>

        <FlatList
          data={food}
          renderItem={({ item }) => <CardHorizontal food={item} />}
          horizontal={true}
          contentContainerStyle={{ gap: 14, paddingLeft: 16, paddingRight: 16 }}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
}
