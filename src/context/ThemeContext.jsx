import { createContext, useContext, useEffect, useState } from "react";


const ThemeContext = createContext();

export const ThemeProvider = ({children}) =>{
        const [Theme, setTheme] = useState("light")


        //load saved theme

        // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);


        //Save theme
        useEffect(() => {
          localStorage.setItem("theme",Theme)
        }, [Theme])
        
        // toggle theme
        const toggleTheme = ()=>{
            setTheme((prev)=>(prev === "light"?"dark":"light"))
        }

    return (
        <ThemeContext.Provider value={{ Theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = ()=>{
    return useContext(ThemeContext)
}