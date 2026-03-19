import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // ✅ Load theme instantly (NO flicker)
  const [Theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // ✅ Save theme
  useEffect(() => {
    localStorage.setItem("theme", Theme);
  }, [Theme]);

  // ✅ Apply theme to HTML (important for full app styling)
  useEffect(() => {
    document.documentElement.classList.toggle("dark", Theme === "dark");
  }, [Theme]);

  // ✅ Toggle
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ Theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);