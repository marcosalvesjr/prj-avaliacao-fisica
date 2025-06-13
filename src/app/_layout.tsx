import { initializeDatabase } from "@/database/initialieDatabase";
import { Slot } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import "../styles/global.css";

export default function Layout() {
  return (
    <SQLiteProvider databaseName="myDatabase.db" onInit={initializeDatabase}>
      <Slot />
    </SQLiteProvider>
  );
}
