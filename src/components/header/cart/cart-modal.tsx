import React from "react";
import { Modal, View, Text, Pressable, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCartStore } from "@/src/hook/card-store";
import Toast from "react-native-toast-message";

interface CartModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export function CartModal({ isVisible, onClose }: CartModalProps) {
  const { items, removeItem, updateQuantity } = useCartStore();

  const total = items.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <>
      {items.length !== 0 && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isVisible}
          onRequestClose={onClose}
        >
          <View className="flex-1 bg-black/50">
            <View className="flex-1 mt-20 bg-white rounded-t-3xl">
              {/* Header del modal */}
              <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
                <Text className="text-xl font-bold">Carrito</Text>
                <Pressable onPress={onClose}>
                  <Ionicons name="close" size={24} color="black" />
                </Pressable>
              </View>

              {/* Lista de productos */}
              <ScrollView className="flex-1 p-4">
                {items.length === 0 ? (
                  <Text className="text-center text-gray-500 mt-4">
                    No hay productos en el carrito
                  </Text>
                ) : (
                  items.map((item) => (
                    <View
                      key={item.id}
                      className="flex-row items-center mb-4 bg-gray-50 p-3 rounded-xl"
                    >
                      <Image
                        source={{ uri: item.image }}
                        className="w-20 h-20 rounded-lg"
                      />
                      <View className="flex-1 ml-3">
                        <Text className="font-semibold text-base">
                          {item.name}
                        </Text>
                        <Text className="text-green-700 font-bold mt-1">
                          ${Number(item.price) * item.quantity}
                        </Text>

                        {/* Controles de cantidad */}
                        <View className="flex-row items-center mt-2">
                          <Pressable
                            onPress={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="bg-gray-200 rounded-full w-8 h-8 items-center justify-center"
                          >
                            <Ionicons name="remove" size={20} color="black" />
                          </Pressable>

                          <Text className="mx-4 font-semibold">
                            {item.quantity}
                          </Text>

                          <Pressable
                            onPress={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="bg-gray-200 rounded-full w-8 h-8 items-center justify-center"
                          >
                            <Ionicons name="add" size={20} color="black" />
                          </Pressable>
                        </View>
                      </View>

                      <Pressable
                        onPress={() => removeItem(item.id)}
                        className="p-2"
                      >
                        <Ionicons name="trash-outline" size={24} color="red" />
                      </Pressable>
                    </View>
                  ))
                )}
              </ScrollView>

              {/* Footer con total y botón de pagar */}
              <View className="p-4 border-t border-gray-200">
                <View className="flex-row justify-between items-center mb-4">
                  <Text className="text-lg">Total:</Text>
                  <Text className="text-xl font-bold text-green-700">
                    ${total.toFixed(2)}
                  </Text>
                </View>
                <Pressable
                  className="bg-green-700 rounded-full py-4"
                  onPress={() => {
                    // Aquí iría la lógica de pago
                    console.log("Procesando pago...");
                    onClose();
                  }}
                >
                  <Text className="text-white text-center font-bold text-lg">
                    Pagar Ahora
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
}
