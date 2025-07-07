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
  const SESSION_DURATION = 60 * 10000;

  const storeAuthState = async (newState: {
    isLoggedIn: boolean;
    timestamp: number;
  }) => {
    try {
      //adicionando timestamp no authstate
      // const authWithTimestamp = { ...newState, timestamp: Date.now() };
      // await AsyncStorage.setItem(
      //   AUTH_STATE_KEY,
      //   JSON.stringify(authWithTimestamp)
      // );
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
      const timestamp = Date.now();
      await storeAuthState({ isLoggedIn: true, timestamp });
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
    storeAuthState({ isLoggedIn: false, timestamp: 0 });
    router.replace("/(auth)/Login");
  };

  //A CADA 10 SEGUNDOS EXECUTA A FUNÇÃO
  useEffect(() => {
    const interval = setInterval(async () => {
      const value = await AsyncStorage.getItem(AUTH_STATE_KEY);
      console.log(value);
      if (value) {
        const auth = JSON.parse(value);
        if (auth.isLoggedIn) {
          const lastLogin = new Date(auth.timestamp);
          const now = new Date();
          console.log("Data atual", now);

          const diffInMs = now.getTime() - lastLogin.getTime();
          const diffInMinutes = diffInMs / (1000 * 60);
          console.log("diffInMinutes: ", diffInMinutes);
          console.log("minutos", diffInMinutes);

          if (diffInMinutes >= 0.5) {
            alert("sessão expirada");
            logOut();
          }
        }
      }
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadAuthState = async () => {
      try {
        const authState = await AsyncStorage.getItem(AUTH_STATE_KEY);
        if (authState) {
          const parsedState = JSON.parse(authState);
          if (parsedState.isLoggedIn) {
            setIsLoggedIn(parsedState.isLoggedIn);
          } else {
            await storeAuthState({ isLoggedIn: false, timestamp: 0 });
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
