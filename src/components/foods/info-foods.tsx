import { FlatList } from "react-native";
import { useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { CardFoods } from ".";

export interface FoodProps {
  id: string;
  name: string;
  price: string;
  delivery_time: string;
  delivery_cost: number;
  rating: number;
  image: string;
}

export function InfoFoods() {
  const [shownFoods, setShownFoods] = useState<FoodProps[]>([]);

  useEffect(() => {
    async function getFoods() {
      try {
        // Limpiar el almacenamiento local antes de obtener nuevos datos
        await AsyncStorage.removeItem("lastShownDate");
        await AsyncStorage.removeItem("shownFoods");

        const response = await fetch(
          "https://warm-precious-pig.ngrok-free.app/products"
        );
        if (!response.ok) {
          console.error("Error fetching data:", response.statusText);
          return;
        }
        const data = await response.json();

        // Limitar a 3 alimentos diferentes
        const today = new Date().toDateString();
        const storedDate = await AsyncStorage.getItem("lastShownDate");
        const storedFoods = JSON.parse(
          (await AsyncStorage.getItem("shownFoods")) || "[]"
        );

        if (storedDate !== today) {
          setShownFoods(data.slice(0, 3));
          await AsyncStorage.setItem("lastShownDate", today);
          await AsyncStorage.setItem(
            "shownFoods",
            JSON.stringify(data.slice(0, 3))
          );
        } else {
          setShownFoods(storedFoods);
        }
      } catch (error) {
        console.error("Error fetching or processing data:", error);
      }
    }
    getFoods();
  }, []);

  return (
    <FlatList
      data={shownFoods}
      renderItem={({ item }) => <CardFoods food={item} />}
      contentContainerStyle={{ gap: 14, paddingLeft: 16, paddingRight: 16 }}
    />
  );
}
