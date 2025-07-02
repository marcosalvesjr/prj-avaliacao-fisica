import Button from "@/components/button";
import { Input } from "@/components/input";
import { AlunosDatabase } from "@/database/useAlunosDatabas";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { ILoginSchema, loginSchema } from "@/utils/schema/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Index() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILoginSchema>({ resolver: zodResolver(loginSchema) });

  async function onHandleSubmit(data: ILoginSchema) {
    console.log(data.email);
    console.log(data.password);
  }
  console.log(errors.email?.message);
  console.log(errors.password?.message);
  console.log(errors);
  return (
    <View className="flex-1 justify-center items-center">
      <View className="flex-1 bg-slate-500 w-[100%] p-5 justify-center items-center">
        <Text>LOGO</Text>
      </View>
      <View className="flex-1 bg-slate-100 w-[100%] p-5 justify-center">
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextInput
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Digite seu e-mail"
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextInput
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Digite sua senha"
            />
          )}
        />
        {/*    
        <Input title="Digite seu nome" />
        <Input title="Digite sua senha" />
        */}

        <Button title="Entrar" onPress={handleSubmit(onHandleSubmit)} />
      </View>
    </View>
  );
}
