import { useState } from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewProps,
  TextProps,
  View,
  Modal,
  Alert,
} from "react-native";
import ModalVisualizeAvaliacao from "../modalVisualizeAvaliacao";
import Button from "../button";
import { useAvaliacaoDatabase } from "@/database/useAvaliacaoDatabase";
type CardAvaliacaoProps = TouchableOpacityProps & {
  idAvaliacao: number;
  data: string;
  nomeAluno: string;
};
export default function CardAvaliacao({
  idAvaliacao,
  data,
  nomeAluno,
}: CardAvaliacaoProps) {
  const [openModal, setOpenModal] = useState(false);
  const aluno = nomeAluno;
  const avaliacaoesDatabase = useAvaliacaoDatabase();

  //REMOVER AVALIAÇÃO FÍSICA
  async function removeAvaliacao(id: number) {
    try {
      await avaliacaoesDatabase.removeAvaliacao(id);
      Alert.alert("Avaliação removida com sucesso!");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View className="bg-slate-300 p-5 rounded-md flex-row justify-between gap-20">
      <View>
        <Text className="text-xl">Data: {data}</Text>
      </View>
      <View className="flex-row gap-5">
        <TouchableOpacity onPress={() => setOpenModal(true)}>
          <Text className="text-blue-500 font-bold">Visualizar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => removeAvaliacao(idAvaliacao)}>
          <Text className="text-red-500 font-bold ">Excluir</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" visible={openModal}>
        <View className="flex-1 justify-center items-center gap-5">
          <ModalVisualizeAvaliacao
            idAvaliacao={idAvaliacao}
            nomeDoAluno={aluno}
          />
          <Button title="Fechar" onPress={() => setOpenModal(false)} />
        </View>
      </Modal>
    </View>
  );
}
