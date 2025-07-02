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
    try {
      await statement.executeAsync({
        $idAluno: data.idAluno,
        $data: data.data,
        $peso: data.peso,
        $altura: data.altura,
        $imc: data.imc,
      });
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  //REMOVENDO AVALIAÇÃO FÍSICA
  async function removeAvaliacao(id: number) {
    try {
      await database.execAsync("DELETE FROM avaliacoes WHERE id =" + id);
    } catch (error) {
      throw error;
    }
  }

  //LISTANDO AVALIACOES
  async function list(idAluno: number) {
    const query = "SELECT * FROM avaliacoes WHERE aluno_id = ?";
    const response = await database.getAllAsync<AvaliacaoDatabase>(query, [
      idAluno,
    ]);
    return response;
  }

  //DETALHES DA AVALIAÇÃO
  async function detailsAvaliacao(id: number) {
    const query = "SELECT * FROM avaliacoes WHERE id = ?";
    const response = await database.getFirstAsync<AvaliacaoDatabase>(query, [
      id,
    ]);
    return response;
  }

  async function listAll() {
    const query = "SELECT * FROM avaliacoes";
    const response = await database.getAllAsync<AvaliacaoDatabase>(query);
    return response;
  }

  return { createAvaliacao, list, detailsAvaliacao, removeAvaliacao, listAll };
}
