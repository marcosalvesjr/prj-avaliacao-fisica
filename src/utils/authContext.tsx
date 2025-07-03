import { useRouter } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { mockUsers } from "./mock/users";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  isLoggedIn: boolean;
  logIn: (email: string, password: string) => Promise<boolean>;
  logOut: () => void;
  isReady: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isReady: false,
  logIn: async () => false,
  logOut: () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  const AUTH_STATE_KEY = "authState";

  const storeAuthState = async (newState: { isLoggedIn: boolean }) => {
    try {
      await AsyncStorage.setItem(AUTH_STATE_KEY, JSON.stringify(newState));
    } catch (err) {
      console.log(err);
    }
  };

  const logIn = async (email: string, password: string) => {
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      await storeAuthState({ isLoggedIn: true });
      setIsLoggedIn(true);
      router.replace("/(protect)/alunos");
      return true;
    } else {
      alert("E-mail ou senha incorretos!");
      return false;
    }
  };

  const logOut = () => {
    setIsLoggedIn(false);
    storeAuthState({ isLoggedIn: false });
    router.replace("/(auth)/Login");
  };

  useEffect(() => {
    const loadAuthState = async () => {
      try {
        const authState = await AsyncStorage.getItem(AUTH_STATE_KEY);
        console.log("Estado parseado:", authState);
        if (authState) {
          const parsedState = JSON.parse(authState);
          console.log("Estado parseado:", parsedState);
          
          setIsLoggedIn(parsedState.isLoggedIn);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsReady(true);
      }
    };
    loadAuthState();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, logIn, logOut, isReady }}>
      {children}
    </AuthContext.Provider>
  );
}
