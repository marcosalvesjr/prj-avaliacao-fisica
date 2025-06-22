import Button from "@/components/button";
import { Input } from "@/components/input";
import { AlunosDatabase } from "@/database/useAlunosDatabas";
import { router } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

export default function Index() {

  return (
    <View className="flex-1 justify-center items-center">
      <View className="flex-1 bg-slate-500 w-[100%] p-5 justify-center items-center">
        <Text>LOGO</Text>
      </View>
      <View className="flex-1 bg-slate-100 w-[100%] p-5 justify-center">
        <Input title="Digite seu nome" />
        <Input title="Digite sua senha" />
        <Button title="Entrar" onPress={() => router.replace("/alunos")} />
      </View>
    </View>
  );
}
