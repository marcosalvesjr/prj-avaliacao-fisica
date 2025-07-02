import { useRouter } from "expo-router";
import { createContext, PropsWithChildren, useState } from "react";

type AuthContextType = {
  logIn: () => void;
  logOut: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  logIn: async () => false,
  logOut: () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const router = useRouter();

  const logIn = async () => {
    setIsLoggedin(true);
    router.replace("/alunos");
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
