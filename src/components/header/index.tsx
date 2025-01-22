import { View, Pressable, Text } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { CartButton } from "./cart/cart-button";
import Toast from "react-native-toast-message";

export function Header() {
  return (
    
    <View className="w-full flex flex-row items-center justify-between">
      
      <Pressable className="w-10 h-10 bg-white rounded-full flex justify-center items-center">
        <Ionicons name="menu" size={20} color="#121212" />
      </Pressable>

      <View className="flex flex-col items-center justify-center">
        <Text className="text-center text-sm text-slate-800">Localizacion</Text>

        <View className="flex-row items-center justify-center gap-1">
          <Feather name="map-pin" size={14} color="#FF0000" />
          <Text className="text-lg font-bold">Campo Grande</Text>
        </View>
      </View>
      <CartButton />
  
      
    </View>
  );
}
