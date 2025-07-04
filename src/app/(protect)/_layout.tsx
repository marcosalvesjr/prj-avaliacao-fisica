import { AuthContext } from "@/utils/authContext";
import { Redirect, Tabs } from "expo-router";
import { useContext } from "react";
import { SquareActivity, Users } from "lucide-react-native";

export default function Layout() {
  const authContext = useContext(AuthContext);

  if (!authContext.isReady) {
    return null;
  }

  if (!authContext.isLoggedIn) {
    return <Redirect href={"/(auth)/Login"} />;
  }
  console.log("isReady:", authContext.isReady);
  console.log("isLoggedIn:", authContext.isLoggedIn);
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="alunos/index"
        options={{
          title: "Alunos",
          tabBarIcon: () => <Users size={25} color={"red"} />,
        }}
      />
      <Tabs.Screen
        name="avaliacoes/index"
        options={{
          title: "Avaliações",
          tabBarIcon: () => <SquareActivity size={25} color={"red"} />,
        }}
      />
      <Tabs.Screen name="alunos/aluno/[id]" options={{ href: null }} />
      <Tabs.Screen name="avaliacoes/avaliacao/[id]" options={{ href: null }} />
    </Tabs>
  );
}
