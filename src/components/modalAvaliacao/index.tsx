import { View, Text } from "react-native";
import { Input } from "../input";
import { AvaliacaoDatabase } from "@/database/useAvaliacaoDatabase";
import Button from "../button";

type Props = AvaliacaoDatabase & {};
export default function ModalAvaliacao() {
  const dataAtual = new Date();
  return (
    <View>
      <View>
        <Text>{String(dataAtual.getDay())}</Text>
        <Input title="Digite o peso do aluno" />
        <Input title="Digite a altura do" />
      </View>
      <View>
        <Button title="Salvar" />
      </View>
    </View>
  );
}
