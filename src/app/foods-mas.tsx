import {
  View,
  Text,
  FlatList,
  Dimensions,
  Pressable,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FoodProps } from "../components/treding";
import { CardHorizontal } from "../components/treding/food";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function FoodsMas() {
  const router = useRouter();
  const [foods, setFoods] = useState<FoodProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getFoods() {
      try {
        const response = await fetch(
          "https://warm-precious-pig.ngrok-free.app/products"
        );
        const data = await response.json();
        setFoods(data);
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    }
    getFoods();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <View className="animate-spin rounded-full h-20 w-20 border-t-2 border-blue-500 my-4"></View>
        <Text className="text-lg">Cargando...</Text>
      </View>
    );
  }

  if (!foods) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg">No se encontró la comida</Text>
      </View>
    );
  }
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={{ position: 'relative' }}>
        <Pressable
          onPress={() => router.back()}
          style={{
            position: 'absolute',
            top: 24,
            left: 16,
            backgroundColor: 'white',
            borderRadius: 50,
            padding: 8,
            zIndex: 1,
          }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
      </View>
      <FlatList
        data={foods}
        renderItem={({ item }) => (
          <View className="p-6 justify-center items-center flex flex-row">
            <CardHorizontal food={item} />
          </View>
        )}
        numColumns={2}
        contentContainerStyle={{
          marginTop: 20,
        }}
      />
    </>
  );
}
