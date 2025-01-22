import { FlatList } from "react-native";
import { useState, useEffect } from "react";
import { CardHorizontal } from "./food";

export interface FoodProps {
  id: string;
  name: string;
  price: string;
  delivery_time: string;
  delivery_cost: number;
  rating: number;
  image: string;
}

export function TredingFoods() {
  const [foods, setFoods] = useState<FoodProps[]>([]);

  useEffect(() => {
    async function getFoods() {
      const response = await fetch(
        "https://warm-precious-pig.ngrok-free.app/products"
      );
      const data = await response.json();
      const filteredFoods = data.filter(
        (food: FoodProps) => food.rating === 4.9
      );
      setFoods(filteredFoods);
    }
    getFoods();
  }, []);

  return (
    <FlatList
      data={foods}
      renderItem={({ item }) => <CardHorizontal food={item} />}
      horizontal={true}
      contentContainerStyle={{ gap: 14, paddingLeft: 16, paddingRight: 16 }}
      showsHorizontalScrollIndicator={false}
    />
  );
}
