import { useAvaliacaoDatabase } from "@/database/useAvaliacaoDatabase";
import { useEffect, useState } from "react";
import { View, Text, Modal } from "react-native";

type ModalVisualizeAvaliacaoProp = {
  idAvaliacao: number;
  nomeDoAluno: string;
};

export default function ModalVisualizeAvaliacao({
  idAvaliacao,
  nomeDoAluno,
}: ModalVisualizeAvaliacaoProp) {
  const id = idAvaliacao;
  const [avaliacao, setAvaliacao] = useState({
    data: "",
    peso: 0,
    altura: 0,
    imc: 0,
  });

  const database = useAvaliacaoDatabase();

  let classificacao = "";

  //CLASSIFICAÇÃO DO IMC
  switch (true) {
    case avaliacao.imc < 18.5:
      classificacao = "Abaixo do peso";
      break;
    case avaliacao.imc >= 18.5 && avaliacao.imc < 25:
      classificacao = "Peso normal";
      break;
    case avaliacao.imc >= 25 && avaliacao.imc < 30:
      classificacao = "Sobrepeso";
      break;
    case avaliacao.imc >= 30 && avaliacao.imc < 35:
      classificacao = "Obesidade grau I";
      break;
    case avaliacao.imc >= 35 && avaliacao.imc < 40:
      classificacao = "Obesidade grau II";
      break;
    case avaliacao.imc >= 40:
      classificacao = "Obesidade grau III";
      break;
    default:
      classificacao = "Valor inválido";
  }
  //BUSCAR DADOS DE AVALIACAO
  useEffect(() => {
    async function fetchAvaliacao() {
      if (id) {
        const response = await database.detailsAvaliacao(id);
        if (response) {
          setAvaliacao({
            data: response.data,
            peso: response.peso,
            altura: response.altura,
            imc: response.imc,
          });
        }
      }
    }
    fetchAvaliacao();
  }, [id]);

  return (
    <View>
      <View className="gap-5">
        <View className="flex-row-reverse gap-10">
          <Text className="text-2xl">Data: {avaliacao.data}</Text>
          <Text className="text-2xl">Nome: {nomeDoAluno}</Text>
        </View>
        <View className="gap-2">
          <View className="flex-row justify-between bg-slate-300 p-2 rounded-md">
            <Text className="text-lg">Altura: </Text>
            <Text className="font-bold text-lg">{avaliacao.altura} M</Text>
          </View>
          <View className="flex-row justify-between bg-slate-300 p-2 rounded-md">
            <Text className="text-lg">Peso: </Text>
            <Text className="font-bold text-lg">{avaliacao.peso} Kg</Text>
          </View>
          <View className="flex-row justify-between bg-slate-300 p-2 rounded-md">
            <Text className="text-lg">IMC: </Text>
            <Text
              className={`font-bold text-lg ${avaliacao.imc > 25 || avaliacao.imc < 18 ? "text-red-500" : "text-green-500"}`}
            >
              {avaliacao.imc}
            </Text>
          </View>
          <View className="flex-row justify-between bg-slate-300 p-2 rounded-md">
            <Text className="text-lg">Classificação</Text>
            <Text
              className={`font-bold text-lg ${avaliacao.imc > 25 || avaliacao.imc < 18 ? "text-red-500" : "text-green-500"}`}
            >
              {classificacao}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
