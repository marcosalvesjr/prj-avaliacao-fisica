import { useRouter } from "expo-router";
import { createContext, PropsWithChildren, useState } from "react";
import { mockUsers } from "./mock/users";

type AuthContextType = {
  logIn: (email: string, password: string) => Promise<boolean>;
  logOut: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  logIn: async () => false,
  logOut: () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const router = useRouter();

  const logIn = async (email: string, password: string) => {
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      setIsLoggedin(true);
      router.replace("/alunos");
      return true;
    } else {
      alert("E-mail ou senha incorretos!");
      return false;
    }
  };

  const logOut = () => {
    setIsLoggedin(false);
    router.replace("/");
  };

  return (
    <AuthContext.Provider value={{ logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}
