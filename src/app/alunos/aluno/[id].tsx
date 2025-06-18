import { View, Text, Modal, FlatList, ViewComponent } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Button from "@/components/button";

import { useEffect, useState } from "react";
import { useAlunosDatabase } from "@/database/useAlunosDatabas";
import ModalAvaliacao from "@/components/modalAvaliacao";
import {
  AvaliacaoDatabase,
  useAvaliacaoDatabase,
} from "@/database/useAvaliacaoDatabase";
import CardAvaliacao from "@/components/cardAvaliacao";

export default function Alunos() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    nome: "",
  });

  const [avaliacoes, setAvaliacoes] = useState<AvaliacaoDatabase[]>([]);
  const params = useLocalSearchParams<{ id: string }>();
  const alunoId = Number(params.id);
  //HOOKS BANCO DE DADOS
  const avaliacaoesDatabase = useAvaliacaoDatabase();
  const alunoDatabase = useAlunosDatabase();
  //RECEBE DADOS DO ALUNO
  useEffect(() => {
    if (params.id) {
      alunoDatabase.getDataAluno(Number(params.id)).then((response) => {
        if (response) {
          setData({ nome: response.nome });
        }
      });
    }
  }, [params.id]);
  //RECEBE DADOS E LISTA AS AVALIAÇÕES
  useEffect(() => {
    async function listAvaliacoes() {
      const response = await avaliacaoesDatabase.list(alunoId);
      setAvaliacoes(response);
    }

    listAvaliacoes();
  }, []);
  return (
    <>
      <View className="flex-1 mt-40 items-center justify-center">
        <View>
          <Text className="text-2xl">{data.nome}</Text>
        </View>
        <View className="flex-1 p-5">
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ gap: 5 }}
            data={avaliacoes}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <View>
                {/** <Text className="bg-slate-300 p-2 text-xl rounded-md">
                  id aluno: {item.idAluno}
                </Text>
                <Text>
                  data: {item.data} IMC: {item.imc} peso:
                  {item.peso} altura:{item.altura}
                </Text>*/}
                <CardAvaliacao nomeAluno={data.nome} idAvaliacao={item.id} data={item.data} />
              </View>
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
                  .list(alunoId)
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
