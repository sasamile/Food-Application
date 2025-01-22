import { Header } from "@/src/components/header";
import { Text, View, StatusBar } from "react-native";
import Constants from "expo-constants";
import { Banner } from "../components/banner";
import { Search } from "../components/search";
import { Section } from "../components/section";
import { TredingFoods } from "../components/treding";
import FamososRestaurants from "../components/famosos";
import { useRouter } from "expo-router";
import { InfoFoods } from "../components/foods/info-foods";
import { FlatList } from "react-native";

const statusBarHeight = Constants.statusBarHeight;

export default function Index() {
  const router = useRouter();

  const renderHeader = () => (
    <View className="w-full px-4" style={{ marginTop: statusBarHeight -12 }}>
      <Header />
      <Banner />
      <Search />
      <Section name="Comidas de moda" size="text-2xl" />
      <TredingFoods />
      <Section name="Famosos en DevFood" size="text-xl" />
      <FamososRestaurants />
      <Section
        name="Comidas"
        size="text-2xl"
        action={() => router.push("../foods-mas")}
        label="Ver mas"
      />
    </View>
  );

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <FlatList
        ListHeaderComponent={renderHeader}
        data={[]}
        renderItem={null}
        ListFooterComponent={<InfoFoods />}
        ListFooterComponentStyle={{
          margin: 16,
          gap:12,
        }}
        showsVerticalScrollIndicator={false}
      
      />
    </>
  );
}