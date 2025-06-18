import { useState } from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewProps,
  TextProps,
  View,
  Modal,
} from "react-native";
import ModalVisualizeAvaliacao from "../modalVisualizeAvaliacao";
import Button from "../button";
type CardAvaliacaoProps = TouchableOpacityProps & {
  idAvaliacao:number,
  data: string;
};
export default function CardAvaliacao({ idAvaliacao, data }: CardAvaliacaoProps) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <View className="bg-slate-300 p-5 rounded-md flex-row justify-between gap-20">
      <View>
        <Text className="text-xl">ID: {idAvaliacao}</Text>
        <Text className="text-xl">Data: {data}</Text>
      </View>
      <View className="flex-row gap-5">
        <TouchableOpacity onPress={() => setOpenModal(true)}>
          <Text className="text-blue-500 font-bold">Visualizar</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text className="text-red-500 font-bold ">Excluir</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" visible={openModal}>
        <View className="flex-1 justify-center items-center gap-5">
          <ModalVisualizeAvaliacao idAvaliacao={idAvaliacao} />
          <Button title="Fechar" onPress={() => setOpenModal(false)} />
        </View>
      </Modal>
    </View>
  );
}
