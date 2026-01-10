import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "../../context/ThemeContext"

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()

    // Determine if dark is active for animation logic
    const isDark = theme === "dark"

    return (
        <button
            onClick={toggleTheme}
            className="relative p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group overflow-hidden"
            aria-label="Alternar Tema"
        >
            <div className="relative z-10 w-6 h-6 flex items-center justify-center">
                <motion.div
                    initial={false}
                    animate={{ rotate: isDark ? 0 : 180, scale: isDark ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute"
                >
                    <Moon size={18} className="text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                </motion.div>

                <motion.div
                    initial={false}
                    animate={{ rotate: isDark ? -180 : 0, scale: isDark ? 0 : 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute"
                >
                    <Sun size={18} className="text-amber-500 group-hover:text-amber-400 transition-colors" />
                </motion.div>
            </div>
        </button>
    )
}
