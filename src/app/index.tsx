import Button from "@/components/button";
import { Input } from "@/components/input";
import { router } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center mt-40">
      <View className="flex-1">
        <Text>LOGO</Text>
      </View>
      <View className="flex-1">
        <Input title="Digite seu nome" />
        <Input title="Digite sua senha" />
        <Button title="Entrar" onPress={() => router.navigate("/alunos")} />
      </View>
    </View>
  );
}
