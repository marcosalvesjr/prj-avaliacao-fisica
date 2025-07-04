import { initializeDatabase } from "@/database/initializeDatabase";
import { Redirect, Slot, Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import "../styles/global.css";
import { StatusBar } from "react-native";
import { AuthProvider } from "@/utils/authContext";

export default function Layout() {
  return (
    <SQLiteProvider databaseName="myDatabase.db" onInit={initializeDatabase}>
      <AuthProvider>
        <StatusBar hidden={true} />
        {/* <Stack screenOptions={{ headerShown: false }}></Stack> */}
        <Slot />
      </AuthProvider>
    </SQLiteProvider>
  );
}
