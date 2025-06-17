import { View, Text, Modal, FlatList } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Button from "@/components/button";

import { useEffect, useState } from "react";
import { useAlunosDatabase } from "@/database/useAlunosDatabas";
import ModalAvaliacao from "@/components/modalAvaliacao";
import {
  AvaliacaoDatabase,
  useAvaliacaoDatabase,
} from "@/database/useAvaliacaoDatabase";

export default function Alunos() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    nome: "",
  });

  const [avaliacoes, setAvaliacoes] = useState<AvaliacaoDatabase[]>([]);
  const params = useLocalSearchParams<{ id: string }>();
  const alunoId = Number(params.id);
  //DB
  const avaliacaoesDatabase = useAvaliacaoDatabase();
  const alunoDatabase = useAlunosDatabase();

  useEffect(() => {
    if (params.id) {
      alunoDatabase.getDataAluno(Number(params.id)).then((response) => {
        if (response) {
          setData({ nome: response.nome });
        }
      });
    }
  }, [params.id]);

  useEffect(() => {
    async function listAvaliacoes() {
      const response = await avaliacaoesDatabase.list();
      setAvaliacoes(response);
    }
    listAvaliacoes();
  }, []);

  return (
    <>
      <View className="flex-1 mt-40 items-center justify-center">
        <View>
          <Text className="text-2xl">
            ID: {params.id} Nome: {data.nome}
          </Text>
        </View>
        <View className="flex-1 p-5">
          <FlatList
            contentContainerStyle={{ gap: 5 }}
            style={{ height: 40 }}
            data={avaliacoes}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <Text className="bg-slate-300 p-2 text-xl rounded-md">
                id aluno: {item.idAluno} data: {item.data} IMC: {item.imc} peso:
                {item.peso} altura:{item.altura}
              </Text>
            )}
          />
        </View>
        <View className="flex-1">
          <Button
            title="Nova avaliação"
            onPress={() => {
              setOpen(true);
            }}
            style={{ marginBottom: 10 }}
          />
          <Button title="Voltar" onPress={() => router.back()} />
        </View>
      </View>

      <Modal visible={open} animationType="slide" transparent={true}>
        <View className="flex-1 justify-center items-center bg-black/60">
          <View className="bg-white p-9 rounded-xl w-4/5 items-center">
            <ModalAvaliacao
              alunoId={alunoId}
              atualizaLista={() =>
                avaliacaoesDatabase
                  .list()
                  .then((response) => setAvaliacoes(response))
              }
            />
            <Button title="Fechar" onPress={() => setOpen(false)} />
          </View>
        </View>
      </Modal>
    </>
  );
}
