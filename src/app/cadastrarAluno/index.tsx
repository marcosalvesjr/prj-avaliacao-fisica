import Button from "@/components/button";
import { Input } from "@/components/input";
import { router } from "expo-router";
import { Pressable, Text } from "react-native";
import { FlatList, View } from "react-native";

export default function CadastrarAluno() {
  const alunos = [
    { id: 1, nome: "Ana Silva" },
    { id: 2, nome: "Bruno Costa" },
    { id: 3, nome: "Carla Oliveira" },
    { id: 4, nome: "Diego Santos" },
    { id: 5, nome: "Érica Lima" },
  ];

  return (
    <View className="items-center justify-center mt-40">
      <Input title="Nome do aluno" />
      <Button title="Cadastrar" />
      <FlatList
        data={alunos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.navigate(`/alunos/aluno/${item.id}`)}>
            <Text>{item.nome}</Text>
          </Pressable>
        )}
      />
      <Button
        title="Voltar"
        onPress={() => router.back()}
        style={{ marginTop: 10 }}
      />
    </View>
  );
}
