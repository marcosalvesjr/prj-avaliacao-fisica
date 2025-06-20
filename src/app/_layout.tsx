import { initializeDatabase } from "@/database/initializeDatabase";
import { Slot } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import "../styles/global.css";
import { StatusBar } from "react-native";

export default function Layout() {
  return (
    <SQLiteProvider databaseName="myDatabase.db" onInit={initializeDatabase}>
      <StatusBar hidden={true} />
      <Slot />
    </SQLiteProvider>
  );
}
