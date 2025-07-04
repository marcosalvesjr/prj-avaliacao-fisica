import Button from "@/components/button";
import { Input } from "@/components/input";
import { AlunosDatabase } from "@/database/useAlunosDatabas";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import { Controller, useForm, useWatch } from "react-hook-form";
import { ILoginSchema, loginSchema } from "@/utils/schema/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "@/utils/authContext";
import useDebounce from "@/utils/hook/useDebounce";

export default function Login() {
  const authContext = useContext(AuthContext);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });
  const email = useWatch({ control, name: "email" });
  const debouncedEmail = useDebounce(email, 800);
  const password = useWatch({ control, name: "password" });
  const debouncedPassword = useDebounce(password, 800);
  console.log("email: ", email);
  console.log("password: ", password);
  useEffect(() => {
    if (debouncedEmail?.trim()) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (debouncedPassword?.trim()) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }, [debouncedEmail, debouncedPassword]);

  async function onHandleSubmit(data: ILoginSchema) {

    await authContext.logIn(data.email, data.password);
  }

  console.log(errors);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View className="flex-1 justify-center items-center">
        <View className="flex-1 bg-slate-500 w-[100%]  justify-center items-center">
          <Text>LOGO</Text>
        </View>
        <View className="flex-1 w-[100%] ml-20  justify-center">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextInput
                className="border-b mb-4 border-slate-300 w-[80%] text-lg font-bold"
                value={field.value}
                onChangeText={field.onChange}
                placeholder="Digite seu e-mail"
              />
            )}
          />
          {emailError && errors.email?.message && (
            <Text className="text-red-500">{errors.email.message}</Text>
          )}
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextInput
                className="border-b mb-4 border-slate-300 w-[80%] text-lg font-bold"
                value={field.value}
                onChangeText={field.onChange}
                placeholder="Digite sua senha"
              />
            )}
          />
          {passwordError && errors.password?.message && (
            <Text className="text-red-500">{errors.password.message}</Text>
          )}
          {/*    
        <Input title="Digite seu nome" />
        <Input title="Digite sua senha" />
        */}

          <Button title="Entrar" onPress={handleSubmit(onHandleSubmit)} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
