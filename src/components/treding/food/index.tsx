import { View, Pressable, Text, Image } from "react-native";
import { FoodProps } from "..";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export function CardHorizontal({ food }: { food: FoodProps }) {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "../food-detail",
      params: { id: food.id },
    });
  };

  return (
    <Pressable
      className="flex flex-col rounded-xl relative"
      onPress={handlePress}
    >
      <Image source={{ uri: food.image }} className="w-44 h-36 rounded-xl" />
      <View className="flex flex-row bg-neutral-900/90 gap-1 rounded-full absolute top-2 right-3 px-2 py-1 items-center justify-center">
        <Ionicons name="star" size={14} color={"#ca8a04"} />
        <Text className="text-white text-sm">{food.rating}</Text>
      </View>
      <Text className="text-green-700 font-medium text-lg">${food.price}</Text>
      <Text className=" text-black mt-1">{food.name}</Text>
      <Text className=" text-neutral-600 mt-1 text-sm">
        {food.delivery_time} - ${food.delivery_cost}
      </Text>
    </Pressable>
  );
}
