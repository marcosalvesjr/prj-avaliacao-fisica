import { useSQLiteContext } from "expo-sqlite";

export type AlunosDatabase = {
  id: number;
  nome: string;
};

export function useAlunosDatabase() {
  const database = useSQLiteContext();
  //CADASTRANDO NOVO ALUNO
  async function createAluno(data: Omit<AlunosDatabase, "id">) {
    const statement = await database.prepareAsync(
      "INSERT INTO alunos (nome) VALUES ($nome)"
    );
    try {
      const result = await statement.executeAsync({
        $nome: data.nome,
      });

      const insertedRowId = result.lastInsertRowId.toLocaleString();

      return { insertedRowId };
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }
  //LISTANDO ALUNOS
  async function list() {
    const query = "SELECT * FROM alunos";

    const response = await database.getAllAsync<AlunosDatabase>(query);

    return response;
  }

  return { createAluno, list };
}
