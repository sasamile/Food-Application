import "../styles/global.css";
import { Slot } from "expo-router";
import { StatusBar, Text, View } from "react-native";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1 }}>
        <Slot />
      </View>
      <Toast
        position="top"
        config={{
          success: ({ text1, text2 }) => (
            <View className="bg-green-500 mx-4 p-4 rounded-xl shadow-lg ">
              <Text className="text-white font-bold">{text1}</Text>
              {text2 && <Text className="text-white mt-1">{text2}</Text>}
            </View>
          ),
        }}
      />
    </>
  );
}
