import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(
    () => sessionStorage.getItem("loggedIn") === "true"
  );

  const login = () => {
    sessionStorage.setItem("loggedIn", "true");
    setLoggedIn(true);
  };

  const logout = () => {
    sessionStorage.removeItem("loggedIn");
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);