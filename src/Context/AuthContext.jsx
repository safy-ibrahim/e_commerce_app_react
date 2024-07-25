import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(false);

export default function AuthContextProvider({ children }) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userData, setUserData] = useState();

  useEffect(() => {
    try {
      setUserData(jwtDecode(localStorage.getItem("token")));
      console.log(userData);
      setIsUserLoggedIn(true);
    } catch (error) {
      setIsUserLoggedIn(false);
      localStorage.removeItem("token");
    }

    window.addEventListener("storage", (e) => {
      try {
        jwtDecode(localStorage.getItem("token"));
        setIsUserLoggedIn(true);
      } catch (error) {
        setIsUserLoggedIn(false);
        localStorage.removeItem("token");
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ isUserLoggedIn, setIsUserLoggedIn, userData }}
    >
      {children}
    </AuthContext.Provider>
  );
}
