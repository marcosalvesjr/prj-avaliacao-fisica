import { Tabs } from "expo-router";

export default function LayoutAluno() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: "Alunos" }} />
      <Tabs.Screen name="avaliacoes/index" options={{ title: "Avaliações" }} />
      <Tabs.Screen name="aluno/[id]" options={{ href: null }} />
    </Tabs>
  );
}
