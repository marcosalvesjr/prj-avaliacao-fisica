import { FlatList, Text, View } from "react-native";
import { Component } from "react";
import Button from "@/components/button";
import { router } from "expo-router";
import { Input } from "@/components/input";

export default class Alunos extends Component {
  render() {
    return (
      <View className="flex-1 justify-center items-center">
        <Input title="Buscar aluno" />
        <Button title="Adicionar Aluno" />
        <Text className="text-5xl font-bold">Lista de alunos</Text>
        <Button title="Voltar" onPress={() => router.back()} />
      </View>
    );
  }
}
