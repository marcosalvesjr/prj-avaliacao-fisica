import { Alert, FlatList, Pressable, Text, View } from "react-native";
import { useEffect, useState } from "react";
import Button from "@/components/button";
import { router } from "expo-router";
import { Input } from "@/components/input";
import { useAlunosDatabase, AlunosDatabase } from "@/database/useAlunosDatabas";

type Props = {};

export default function Alunos() {
  const [aluno, setAluno] = useState("");
  const [id, setId] = useState("");
  const [alunos, setAlunos] = useState<AlunosDatabase[]>([]);

  const alunosDatabase = useAlunosDatabase();

  //CADASTRANDO ALUNO NOVO
  async function createAluno() {
    try {
      const response = await alunosDatabase.createAluno({
        nome: aluno,
      });

      Alert.alert(`Aluno cadastrado com o Id: ${response.insertedRowId}`);
      list();
    } catch (error) {
      console.log(error);
    }
  }
  //LISTANDO ALUNOS
  async function list() {
    const response = await alunosDatabase.list();
    setAlunos(response);
  }
  //ATUALIZANDO LISTA
  useEffect(() => {
    list();
  }, []);

  return (
    <View className="mt-40 justify-center items-center">
      <Input title="Cadastrar aluno" value={aluno} onChangeText={setAluno} />
      <Button title="Adicionar Aluno" onPress={createAluno} />
      <FlatList
        data={alunos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.navigate(`alunos/aluno/${item.id}`)}>
            <Text>{item.nome}</Text>
          </Pressable>
        )}
      />
      <Button title="Voltar" onPress={() => router.back()} />
    </View>
  );
}
