import { View, Text, Alert } from "react-native";
import { Input } from "../input";
import {
  AvaliacaoDatabase,
  useAvaliacaoDatabase,
} from "@/database/useAvaliacaoDatabase";
import Button from "../button";
import { useEffect, useState } from "react";

type ModalProps = {
  alunoId: number;
  atualizaLista?: () => void;
};
export default function ModalAvaliacao({ alunoId, atualizaLista }: ModalProps) {
  const [data, setData] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");

  const avaliacaoesDatabase = useAvaliacaoDatabase();
  //$idAluno, $data, $peso, $altura, $imc

  //CRIAR AVALIAÇÃO FÍSICA
  async function createAvalicao() {
    const imc = String(calcImc(peso, altura).toFixed(2));
    try {
      await avaliacaoesDatabase.createAvaliacao({
        idAluno: alunoId,
        data: data,
        peso: parseFloat(peso),
        altura: parseFloat(altura),
        imc: parseFloat(imc),
      });
      atualizaLista?.();
      Alert.alert("Avaliação feita com sucesso");
    } catch (error) {
      console.log(error);
    }
  }

  //CALCULAR IMC
  function calcImc(peso: string, altura: string) {
    const pesoN = parseFloat(peso);
    const alturaN = parseFloat(altura);
    return pesoN / (alturaN * alturaN);
  }

  return (
    <View>
      <View>
        <Input title="Digite a data" value={data} onChangeText={setData} />
        <Input
          title="Digite o peso do aluno"
          value={String(peso)}
          onChangeText={setPeso}
        />
        <Input
          title="Digite a altura do"
          value={String(altura)}
          onChangeText={setAltura}
        />
      </View>
      <View>
        <Button title="Salvar" onPress={createAvalicao} />
      </View>
    </View>
  );
}
