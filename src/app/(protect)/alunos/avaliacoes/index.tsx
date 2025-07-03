import {
  AvaliacaoDatabase,
  useAvaliacaoDatabase,
} from "@/database/useAvaliacaoDatabase";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

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
    <View className="flex-1 justify-center items-center w-full mt-20">
      <Text className="font-bold text-2xl mb-5">Avaliações</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignItems: "center", gap: 10 }}
        data={avaliacoes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="p-4 flex-row bg-slate-300 items-center justify-between w-[95%] rounded-md">
            <View>
              <Text>Id: {item.id}</Text>
              <Text>Data: {item.data}</Text>
            </View>
            <View>
              <TouchableOpacity>
                <Text className="text-blue-500 font-bold">Visualizar</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text className="text-red-500 font-bold">Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
