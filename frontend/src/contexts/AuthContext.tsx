import { signIn } from "@/services/api";
import Cookies from "js-cookie";
import { createContext, useEffect, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  async function login(email: string, pass: string) {
      setIsLoading(true);

    try {
      const response = await signIn(email, pass);
      
      if (response.data && response.data.access_token) {
        Cookies.set("token", response.data.access_token, { expires: 1 });
        
        setIsAuthenticated(true);
        toast.success("Login realizado com sucesso!");
        const origin = location.state?.from?.pathname || "/";
        navigate(origin);
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao fazer login. Verifique as credenciais.");
    } finally {
      setIsLoading(false);
    }
  }

  function logout() {
    Cookies.remove("token");
    setIsAuthenticated(false);
    navigate("/login");
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}