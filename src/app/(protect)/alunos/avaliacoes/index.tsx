import {
  AvaliacaoDatabase,
  useAvaliacaoDatabase,
} from "@/database/useAvaliacaoDatabase";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Avaliacoes() {
  const [avaliacoes, setAvaliacoes] = useState<AvaliacaoDatabase[]>([]);

  const database = useAvaliacaoDatabase();

  async function showAll() {
    const res = await database.listAll();
    setAvaliacoes(res);
  }

  useEffect(() => {
    showAll();
  }, []);

  return (
    <View className="flex-1 justify-center items-center">
      <Text>Avaliacoes</Text>
    </View>
  );
}
