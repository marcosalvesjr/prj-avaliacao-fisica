import { useSQLiteContext } from "expo-sqlite";
import { Alert } from "react-native";

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
      if (data.nome === "") {
        return Alert.alert("Digite um nome para cadastrar o aluno");
      } else {
        const result = await statement.executeAsync({
          $nome: data.nome,
        });
        const insertedRowId = result.lastInsertRowId.toLocaleString();
        return { insertedRowId };
      }
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
  //ATUALIZAR CADASTRO DE ALUNO
  async function updateAluno(data: AlunosDatabase) {
    const statement = await database.prepareAsync(
      "UPDATE alunos SET name = $name WHERE id = $id "
    );
    try {
      await statement.executeAsync({
        $nome: data.nome,
      });
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }
  //REMOVER ALUNO
  async function removeAluno(id: number) {
    try {
      await database.execAsync("DELETE FROM alunos WHERE id = " + id);
    } catch (error) {
      throw error;
    }
  }
  //BUSCAR DADO DE ALUNO
  async function getDataAluno(id: number) {
    try {
      const query = "SELECT * FROM alunos WHERE id = ?";
      const response = await database.getFirstAsync<AlunosDatabase>(query, [
        id,
      ]);
      return response;
    } catch (error) {
      throw error;
    }
  }
  return { createAluno, list, updateAluno, removeAluno, getDataAluno };
}
