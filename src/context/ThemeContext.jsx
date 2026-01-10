import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
    // Logic to initialize theme
    // 1. Check localStorage
    // 2. Check system preference
    // 3. Default to 'dark' if nothing found (since app was dark-first)
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem("investai_theme")
        if (saved) return saved

        if (window.matchMedia("(prefers-color-scheme: light)").matches) {
            return "light"
        }
        return "dark"
    })

    useEffect(() => {
        const root = window.document.documentElement

        // Remove old class
        root.classList.remove("light", "dark")

        // Add new class
        root.classList.add(theme)

        // Save to storage
        localStorage.setItem("investai_theme", theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme(prev => (prev === "dark" ? "light" : "dark"))
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    return useContext(ThemeContext)
}
