import Button from "@/components/button";
import { useAvaliacaoDatabase } from "@/database/useAvaliacaoDatabase";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Avaliacao() {
  const params = useLocalSearchParams<{ id: string }>();
  const [data, setData] = useState({ id: 0 });

  const avaliacaoDatabase = useAvaliacaoDatabase();

  useEffect(() => {
    if (params.id) {
      avaliacaoDatabase.detailsAvaliacao(Number(params.id)).then((response) => {
        if (response) {
          setData({ id: response.id });
        }
      });
    }
  }, [params.id]);

  return (
    <View className="flex-1 justify-center items-center">
      <Text>{data.id}</Text>
      <Button title="Voltar" onPress={() => router.navigate("/avaliacoes")} />
    </View>
  );
}
