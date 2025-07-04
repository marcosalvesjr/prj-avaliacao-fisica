import { useRouter } from "expo-router";
import {
  createContext,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
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
  //DEFINE TEMPO DE DURAÇÃO DA SESSAO
  const SESSION_DURATION = 60 * 1000;

  const storeAuthState = async (newState: {
    isLoggedIn: boolean;
    expirationTime: number;
  }) => {
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
      const expirationTime = Date.now() + SESSION_DURATION;
      await storeAuthState({ isLoggedIn: true, expirationTime });
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
    storeAuthState({ isLoggedIn: false, expirationTime: 0 });
    router.replace("/(auth)/Login");
  };

  useEffect(() => {
    const loadAuthState = async () => {
      try {
        const authState = await AsyncStorage.getItem(AUTH_STATE_KEY);
        if (authState) {
          const parsedState = JSON.parse(authState);
          if (
            parsedState.isLoggedIn &&
            parsedState.expirationTime &&
            Date.now() < parsedState.expirationTime
          ) {
            setIsLoggedIn(parsedState.isLoggedIn);
          } else {
            await storeAuthState({ isLoggedIn: false, expirationTime: 0 });
            setIsLoggedIn(false);
          }
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
