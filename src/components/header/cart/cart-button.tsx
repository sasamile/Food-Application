import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCartStore } from "@/src/hook/card-store";
import { useState } from "react";
import { CartModal } from "./cart-modal";

export function CartButton() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const itemCount = useCartStore((state) => state.itemCount);

  return (
    <>
      <Pressable
        onPress={() => setIsModalVisible(true)}
        className="relative w-10 h-10 bg-white rounded-full flex justify-center items-center"
      >
        <Ionicons name="cart-outline" size={24} color="black" />
        {itemCount > 0 && (
          <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 items-center justify-center">
            <Text className="text-white text-xs">{itemCount}</Text>
          </View>
        )}
      </Pressable>
      <CartModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </>
  );
}
