import { View, Text, Modal } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Button from "@/components/button";

import { useEffect, useState } from "react";
import { useAlunosDatabase } from "@/database/useAlunosDatabas";
import ModalAvaliacao from "@/components/modalAvaliacao";

export default function Alunos() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    nome: "",
  });
  const params = useLocalSearchParams<{ id: string }>();

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

  return (
    <>
      <View className="flex-1 items-center justify-center">
        <View>
          <Text className="text-2xl">
            ID: {params.id} Nome: {data.nome}
          </Text>
        </View>
        <View>
          <Button
            title="Nova avaliação"
            onPress={() => {
              setOpen(true);
            }}
            style={{ marginBottom: 10 }}
          />
        </View>

        <Button title="Voltar" onPress={() => router.back()} />
      </View>

      <Modal visible={open} animationType="slide" transparent={true}>
        <View className="flex-1 justify-center items-center bg-black/60">
          <View className="bg-white p-9 rounded-xl w-4/5 items-center">
            <ModalAvaliacao />
            <Text className="text-xl mb-4">Teste</Text>
            <Button title="Fechar" onPress={() => setOpen(false)} />
          </View>
        </View>
      </Modal>
    </>
  );
}
