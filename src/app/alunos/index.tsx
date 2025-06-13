import { FlatList, Pressable, Text, View } from "react-native";
import { Component } from "react";
import Button from "@/components/button";
import { router } from "expo-router";
import { Input } from "@/components/input";

type Props = {};

type State = {
  alunos: { id: number; nome: string }[];
};

export default class Alunos extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      alunos: [
        { id: 1, nome: "Ana Silva" },
        { id: 2, nome: "Bruno Costa" },
        { id: 3, nome: "Carla Oliveira" },
        { id: 4, nome: "Diego Santos" },
        { id: 5, nome: "Érica Lima" },
      ],
    };
  }
  render() {
    return (
      <View className="mt-40 justify-center items-center">
        <Input title="Buscar aluno" />
        <Button title="Adicionar Aluno" />
        <FlatList
          data={this.state.alunos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => router.navigate(`alunos/aluno/${item.id}`)}
            >
              <Text>{item.nome}</Text>
            </Pressable>
          )}
        />
        <Button title="Voltar" onPress={() => router.back()} />
      </View>
    );
  }
}
