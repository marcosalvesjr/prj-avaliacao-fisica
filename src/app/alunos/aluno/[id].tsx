import { View, Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Button from "@/components/button";

export default function Alunos() {
  const params = useLocalSearchParams<{ id: string }>();
  return (
    <View className="flex-1 items-center justify-center">
      <Text>{params.id}</Text>
      <Button title="Adicionar avaliação física" style={{ marginBottom: 10 }} />
      <Button title="Voltar" onPress={() => router.back()} />
    </View>
  );
}
