
// src/pages/common/AuthContext.tsx

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";


import IconPasswordWrapper from "../../components/ext/displays/IconPasswordExt";
import IconNewUserWrapper from "../../components/ext/displays/IconNewUserExt";
import EditNoteIcon from "../../components/ext/displays/IconEditNoteExt";
import VisibilityIcon from "../../components/ext/displays/IconVisibilityExt";
import SearchIcon from "../../components/ext/displays/IconSearchExt";

export const COMMIT_HASH: string = "08aae08f2e452524e441c51879a03b15f5b42b1e";

export interface DrawerItemsType {
  id: string;
  icon: JSX.Element;
  pageId: string;
}

interface AuthContextType {
  token: string | null;
  loginEndpoint: string;
  logoutEndpoint: string;
  sessionEndpoint: string;
  usersEndpoint: string;
  userEndpoint: string;
  userPswdEndpoint: string;
  userAttemptsEndpoint: string;
  selectedUsername: string;
  drawerItems: DrawerItemsType[];
  currentPage: string;
  commitHash: string;
  login: (newToken: string) => void;
  logout: () => void;
  setCurrentPage: (pageId: string) => void;
  setSelectedUsername: (selectedUsername: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [loginEndpoint, setLoginEndpoint] = useState<string>("");
  const [logoutEndpoint, setLogoutEndpoint] = useState<string>("");
  const [sessionEndpoint, setSessionEndpoint] = useState<string>("");
  const [usersEndpoint, setUsersEndpoint] = useState<string>("");
  const [userEndpoint, setUserEndpoint] = useState<string>("");
  const [userPswdEndpoint, setUserPswdEndpoint] = useState<string>("");
  const [userAttemptsEndpoint, setUserAttemptsEndpoint] = useState<string>("");
  const [selectedUsername, setSelectedUsername] = useState<string>("");
  const [commitHash, setCommitHash] = useState<string>("");
  const [currentPage, setCurrentPage] = useState("Search");

  const drawerItems: DrawerItemsType[] = [
    { id: "Search", icon: <SearchIcon />, pageId: "Search" },
    { id: "Audit", icon: <VisibilityIcon />, pageId: "Audit" },
    { id: "New", icon: <IconNewUserWrapper />, pageId: "New" },
    { id: "Username", icon: <EditNoteIcon />, pageId: "Username" },
    { id: "Password", icon: <IconPasswordWrapper />, pageId: "Password" },
  ];

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    // Recupera endpoints do localStorage
    const storedLoginEndpoint =
      localStorage.getItem("loginEndpoint") ||
      process.env.REACT_APP_LOGIN_ENDPOINT ||
      "";
    const storedLogoutEndpoint =
      localStorage.getItem("logoutEndpoint") ||
      process.env.REACT_APP_LOGOUT_ENDPOINT ||
      "";
    const storedSessionEndpoint =
      localStorage.getItem("sessionEndpoint") ||
      process.env.REACT_APP_SESSION_ENDPOINT ||
      "";
    const storedUsersEndpoint =
      localStorage.getItem("usersEndpoint") ||
      process.env.REACT_APP_USERS_ENDPOINT ||
      "";
    const storedUserEndpoint =
      localStorage.getItem("userEndpoint") ||
      process.env.REACT_APP_USER_ENDPOINT ||
      "";
    const storedUserPswdEndpoint =
      localStorage.getItem("userPswdEndpoint") ||
      process.env.REACT_APP_USER_PSWD_ENDPOINT ||
      "";
    const storedUserAttemptsEndpoint =
      localStorage.getItem("userAttemptsEndpoint") ||
      process.env.REACT_APP_USER_ATTEMPTS_ENDPOINT ||
      "";
    const storedSelectedUsername =
      localStorage.getItem("selectedUsername");

    const currentCommitHash = COMMIT_HASH || "";

    if (storedToken) {
      setToken(storedToken);
    }
    // Atualiza o estado com os valores recuperados ou padrões
    setCommitHash(currentCommitHash);
    setLoginEndpoint(storedLoginEndpoint);
    setLogoutEndpoint(storedLogoutEndpoint);
    setSessionEndpoint(storedSessionEndpoint);
    setUsersEndpoint(storedUsersEndpoint);
    setUserEndpoint(storedUserEndpoint);
    setUserAttemptsEndpoint(storedUserAttemptsEndpoint);
    setUserPswdEndpoint(storedUserPswdEndpoint);
    if (storedSelectedUsername) {
      setSelectedUsername(storedSelectedUsername);
    }
  }, []);

  const login = (newToken: string) => {
    setToken(null);
    localStorage.removeItem("token");
    setToken(newToken);
    localStorage.setItem("token", newToken);
    // Não há necessidade de atualizar os endpoints no login, a menos que se alterem
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("selectedUsername");
    // Os endpoints permanecem inalterados no logout
  };

  const value = {
    token,
    loginEndpoint,
    logoutEndpoint,
    sessionEndpoint,
    usersEndpoint,
    userEndpoint,
    userPswdEndpoint,
    userAttemptsEndpoint,
    selectedUsername,
    drawerItems,
    currentPage,
    commitHash,
    login,
    logout,
    setCurrentPage,
    setSelectedUsername,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
