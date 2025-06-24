import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Keep the context name as `auth` (your original)
export const auth = createContext();

// Optional hook for cleaner usage (you can use this or `useContext(auth)` directly)
export const useAuth = () => useContext(auth);

export const AuthProvider = ({ children }) => {
  const [curruser, setcurruser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  const login = async (inputs) => {
    try {
      const res = await axios.post("http://localhost:8800/api/auth/login", inputs, {
        withCredentials: true,
      });

      setcurruser(res.data); // expected to include profile URL, etc.
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setcurruser(null);
  };

  useEffect(() => {
    if (curruser) {
      localStorage.setItem("user", JSON.stringify(curruser));
    }
  }, [curruser]);

  return (
    <auth.Provider value={{ curruser, login, logout }}>
      {children}
    </auth.Provider>
  );
};


