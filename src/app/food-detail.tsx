import { View, Text, Image, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useCartStore } from "../hook/card-store";

// Definimos la interfaz para los ingredientes
interface Ingredient {
  name: string;
  amount: string;
}

// Interfaz para el objeto food completo
export interface FoodDetail {
  id: string;
  name: string;
  restaurantId: string;
  price: string;
  delivery_time: string;
  delivery_cost: number;
  rating: number;
  image: string;
  description: string;
  ingredients: Ingredient[];
  category: string;
}

export interface RestaurantId {
  id: string;
  name: string;
  image: string;
  description?: string;
}

export default function FoodDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [food, setFood] = useState<FoodDetail | null>(null);
  const [restaurants, setRestaurants] = useState<RestaurantId | null>(null);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  const handlePress = () => {
    router.push({
      pathname: "../restaurants-detail",
      params: { id: restaurants?.id },
    });
  };

  useEffect(() => {
    // Función para cargar los datos del producto y el restaurante
    async function loadData() {
      try {
        // Primero cargamos los datos del producto
        const foodResponse = await fetch(
          `https://warm-precious-pig.ngrok-free.app/products/${id}`
        );
        const foodData = await foodResponse.json();
        setFood(foodData);

        // Una vez que tenemos los datos del producto, cargamos los datos del restaurante
        if (foodData?.restaurantId) {
          const restaurantResponse = await fetch(
            `https://warm-precious-pig.ngrok-free.app/restaurants/${foodData.restaurantId}`
          );
          const restaurantData = await restaurantResponse.json();
          setRestaurants(restaurantData);
        }
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <View className="animate-spin rounded-full h-20 w-20 border-t-2 border-purple-500 my-4"></View>
        <Text className="text-lg">Cargando...</Text>
      </View>
    );
  }

  if (!food) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg">No se encontró la comida</Text>
      </View>
    );
  }

  const handleOrderNow = () => {
    if (food) {
      addItem(food);
      setTimeout(() => {
        router.push("/");
      }, 2000); // Espera 3 segundos antes de redirigir
    }
  };

  return (
    <>
      <ScrollView className="flex-1 bg-white">
        <Toast
          position="top"
          config={{
            success: ({ text1, text2 }) => (
              <View className="bg-green-500 mx-4 p-4 rounded-xl shadow-lg absolute z-100">
                <Text className="text-white font-bold">{text1}</Text>
                {text2 && <Text className="text-white mt-1">{text2}</Text>}
              </View>
            ),
          }}
        />

        {/* Header con botón de retorno */}
        <View className="relative -z-10">
          <Image
            source={{ uri: food.image }}
            className="w-full h-72"
            resizeMode="cover"
          />
          <Pressable
            onPress={() => router.back()}
            className="absolute top-12 left-4 bg-white rounded-full p-2"
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>
        </View>

        {/* Contenido principal */}
        <View className="p-4">
          {/* Cabecera con nombre y rating */}
          <View className="flex-row justify-between items-center">
            <Text className="text-2xl font-bold flex-1">{food.name}</Text>

            <View className="flex-row items-center bg-yellow-600/20 px-2 py-1 rounded-full">
              <Ionicons name="star" size={16} color="#ca8a04" />
              <Text className="ml-1 font-medium">{food.rating}</Text>
            </View>
          </View>
          {/* Categoría */}
          <Text className="text-neutral-500 mt-1">{food.category}</Text>

          <Pressable
            className="flex flex-row items-center mt-6 gap-4"
            onPress={handlePress}
          >
            <Image
              source={{ uri: restaurants?.image }}
              className="w-10 h-10 rounded-full  "
              resizeMode="cover"
            />
            <Text className="text-xl font-semibold">{restaurants?.name}</Text>
          </Pressable>

          {/* Precio y tiempo */}
          <View className="flex-row items-center mt-4">
            <Text className="text-green-700 text-xl font-bold">
              ${food.price}
            </Text>
            <Text className="ml-4 text-neutral-500">
              {food.delivery_time} · Envío ${food.delivery_cost}
            </Text>
          </View>

          {/* Descripción */}
          <View className="mt-6">
            <Text className="text-lg font-bold mb-2">Descripción</Text>
            <Text className="text-neutral-600 leading-5">
              {food.description}
            </Text>
          </View>

          {/* Ingredientes */}
          <View className="mt-6">
            <Text className="text-lg font-bold mb-2">Ingredientes</Text>
            <View className="bg-neutral-50 rounded-xl p-4">
              {food.ingredients.map((ingredient, index) => (
                <View
                  key={index}
                  className="flex-row justify-between items-center py-2"
                >
                  <Text className="text-neutral-700">• {ingredient.name}</Text>
                  <Text className="text-neutral-500">{ingredient.amount}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Botón de ordenar */}
          <Pressable
            className="bg-green-700 rounded-full py-4 mt-6"
            onPress={handleOrderNow}
          >
            <Text className="text-white text-center font-bold text-lg">
              Ordenar Ahora
            </Text>
          </Pressable>

          {/* Toast para notificaciones */}
        </View>
      </ScrollView>
    </>
  );
}
