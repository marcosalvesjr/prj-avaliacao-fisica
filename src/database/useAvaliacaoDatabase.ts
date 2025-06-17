import { useSQLiteContext } from "expo-sqlite";

export type AvaliacaoDatabase = {
  id: number;
  idAluno: number;
  data: string;
  peso: number;
  altura: number;
  imc: number;
};

export function useAvaliacaoDatabase() {
  const database = useSQLiteContext();

  //ADICIONANDO NOVA AVALIAÇÃO
  async function createAvaliacao(data: Omit<AvaliacaoDatabase, "id">) {
    const statement = await database.prepareAsync(
      "INSERT INTO avaliacoes (aluno_id, data, peso, altura, imc) VALUES ($idAluno, $data, $peso, $altura, $imc)"
    );

    await statement.executeAsync({
      $idAluno: data.idAluno,
      $data: data.data,
      $peso: data.peso,
      $altura: data.altura,
      $imc: data.imc,
    });

    await statement.finalizeAsync();
  }

  //LISTANDO AVALIACOES
  async function list(idAluno:number) {
    const query = "SELECT * FROM avaliacoes WHERE aluno_id = ?";
    const response = await database.getAllAsync<AvaliacaoDatabase>(query,[idAluno]);
    return response;
  }

  return { createAvaliacao, list };
}
