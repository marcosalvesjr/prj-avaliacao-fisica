import {
  Alert,
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import Button from "@/components/button";
import { router } from "expo-router";
import { Input } from "@/components/input";
import { useAlunosDatabase, AlunosDatabase } from "@/database/useAlunosDatabas";
import BtnAdicionar from "@/components/btnAdicionar";

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
      if (response && response.insertedRowId) {
        Alert.alert(`Aluno cadastrado com o Id: ${response.insertedRowId}`);
        setAluno("");
        list();
      }
    } catch (error) {
      console.log(error);
    }
  }
  //LISTANDO ALUNOS
  async function list() {
    const response = await alunosDatabase.list();
    setAlunos(response);
  }

  //REMOVER ALUNO
  async function removeAluno(id: number) {
    try {
      await alunosDatabase.removeAluno(id);
      Alert.alert("Aluno removido com sucesso!");
      list();
    } catch (error) {
      console.log(error);
    }
  }

  //ATUALIZANDO LISTA
  useEffect(() => {
    list();
  }, []);

  return (
    <View className="mt-40 justify-center items-center">
      <View className="flex-row items-center gap-5">
        <Input title="Cadastrar aluno" value={aluno} onChangeText={setAluno} />
        <BtnAdicionar title="+" onPress={createAluno} />
      </View>

      <FlatList
        className="mb-5 h-96"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
        data={alunos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            className="flex-row justify-between bg-slate-300 w-80 p-4 rounded-lg"
            onPress={() => router.navigate(`/alunos/aluno/${item.id}`)}
          >
            <View className="flex-row gap-3">
              <Text>ID: {item.id}</Text>
              <Text>Nome: {item.nome}</Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => removeAluno(item.id)}>
                <Text className="text-red-500 font-bold">Excluir</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        )}
      />
      <Button title="Voltar" onPress={() => router.back()} />
    </View>
  );
}
