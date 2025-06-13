import { type SQLiteDatabase } from "expo-sqlite";

export async function initializeDatabase(database: SQLiteDatabase) {
  //CRIAR TABELA CASO NÃO EXISTA
  await database.execAsync(`

CREATE TABLE IF NOT EXISTS alunos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL
);


CREATE TABLE IF NOT EXISTS avaliacoes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  aluno_id INTEGER NOT NULL,
  data TEXT NOT NULL,
  peso REAL,
  altura REAL,
  imc REAL,
  FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE
);
        `);
}
