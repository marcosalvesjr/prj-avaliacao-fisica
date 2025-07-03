import {
  Alert,
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import Button from "@/components/button";
import { router } from "expo-router";
import { Input } from "@/components/input";
import { useAlunosDatabase, AlunosDatabase } from "@/database/useAlunosDatabas";
import BtnAdicionar from "@/components/btnAdicionar";
import { AuthContext } from "@/utils/authContext";
import { Eye, Trash } from "lucide-react-native";

export default function Alunos() {
  const authContext = useContext(AuthContext);
  const [aluno, setAluno] = useState("");
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

  function handleLogOut() {
    authContext.logOut();
  }

  //ATUALIZANDO LISTA
  useEffect(() => {
    list();
  }, []);

  return (
    <View className="flex-1 px-4 py-8 items-center mt-10">
      <View className="flex-row items-center gap-5">
        <Input title="Cadastrar aluno" value={aluno} onChangeText={setAluno} />
        <BtnAdicionar title="+" onPress={createAluno} />
      </View>

      <FlatList
        className="flex-1 mb-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
          gap: 10,
          alignItems: "center",
        }}
        data={alunos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="flex-row justify-between bg-slate-300 w-[95%] p-4 rounded-lg items-center">
            <View className="flex-row gap-3">
              <Text>ID: {item.id}</Text>
              <Text>Nome: {item.nome}</Text>
            </View>
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={() => router.navigate(`/alunos/aluno/${item.id}`)}
              >
                <Eye size={25} color={"#3B82F6"} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removeAluno(item.id)}>
                <Trash size={25} color={"#EF4444"} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <Button title="Sair" onPress={handleLogOut} />
    </View>
  );
}
