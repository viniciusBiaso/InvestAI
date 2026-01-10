import { useState, useEffect } from "react"
import { Sun, CloudRain, Cloud, ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import { BRIEFING_DATA } from "../data/briefingScenarios"

export default function MorningBrief({ user }) {
    // Determine profile key (fallback to 'bold' if admin or unknown)
    const profileKey = user.profile === 'conservative' ? 'conservative' :
        user.profile === 'moderate' ? 'moderate' : 'bold'

    const [sentiment, setSentiment] = useState("neutral") // bullish, bearish, neutral
    const [greeting, setGreeting] = useState("Bom dia")

    useEffect(() => {
        const hour = new Date().getHours()
        if (hour < 12) setGreeting("Bom dia")
        else if (hour < 18) setGreeting("Boa tarde")
        else setGreeting("Boa noite")
    }, [])

    const currentDate = new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })

    // Get content based on current state
    const content = BRIEFING_DATA[profileKey][sentiment]

    // Icon mapping
    const Icon = content.icon === 'sun' ? Sun : content.icon === 'storm' ? CloudRain : Cloud
    const iconColor = content.icon === 'sun' ? "text-yellow-400" : content.icon === 'storm' ? "text-blue-400" : "text-gray-300"

    // Gradient mapping (Light/Dark aware)
    const gradientClass = sentiment === 'bullish'
        ? 'from-emerald-50 to-emerald-100/50 dark:from-emerald-900/40 dark:to-emerald-900/10'
        : sentiment === 'bearish'
            ? 'from-red-50 to-red-100/50 dark:from-red-900/40 dark:to-red-900/10'
            : 'from-slate-100 to-slate-200/50 dark:from-zinc-900/40 dark:to-zinc-900/10'

    const borderClass = sentiment === 'bullish'
        ? 'border-emerald-200 dark:border-emerald-500/20'
        : sentiment === 'bearish'
            ? 'border-red-200 dark:border-red-500/20'
            : 'border-slate-200 dark:border-white/5'

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full group"
        >
            {/* Background Layer */}
            <div className={`absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-r ${gradientClass} border ${borderClass} shadow-lg dark:shadow-2xl transition-colors duration-300`}>
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${sentiment === 'bullish' ? 'from-emerald-400/20 dark:from-emerald-500/10' : sentiment === 'bearish' ? 'from-red-400/20 dark:from-red-500/10' : 'from-slate-400/20 dark:from-slate-500/10'} to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2`} />
            </div>

            {/* Content Layer (Allows Dropdown Overflow) */}
            <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">

                {/* Text Content */}
                <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-medium text-slate-500 dark:text-white/40 uppercase tracking-widest">{currentDate}</span>
                        <div className="h-4 w-[1px] bg-slate-300 dark:bg-white/10"></div>
                        <span className="text-xs font-bold bg-white/50 dark:bg-white/5 px-2 py-0.5 rounded text-slate-600 dark:text-white/60">
                            Resumo Matinal
                        </span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
                        {greeting}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-800 dark:from-white dark:to-white/60">{user.name.split(' ')[0]}</span>.
                    </h2>

                    <div className="mt-4 p-4 rounded-xl bg-white/60 dark:bg-black/20 border border-slate-200 dark:border-white/5 backdrop-blur-md max-w-2xl shadow-sm dark:shadow-none">
                        <h3 className={`text-lg font-bold mb-1 ${sentiment === 'bullish' ? 'text-emerald-600 dark:text-emerald-400' : sentiment === 'bearish' ? 'text-red-600 dark:text-red-400' : 'text-slate-700 dark:text-slate-300'}`}>
                            {content.headline}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-white/70 leading-relaxed">
                            {content.text}
                        </p>
                    </div>
                </div>

                {/* Weather Icon & Dev Controls */}
                <div className="flex flex-col items-end gap-4">
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Icon size={80} className={`${iconColor} drop-shadow-xl`} strokeWidth={1} />
                    </motion.div>

                    {/* Dev Selector - Fixed Hover Area */}
                    <div className="group/dev relative py-2"> {/* Added padding for hover bridge */}
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-white/10 uppercase tracking-widest cursor-pointer hover:text-slate-600 dark:hover:text-white/30 transition-colors bg-white/50 dark:bg-black/20 px-2 py-1 rounded-full border border-slate-200 dark:border-white/5">
                            <ChevronDown size={10} />
                            <span>Market Simulator</span>
                        </div>

                        {/* Dropdown - Adjusted Top Position */}
                        <div className="absolute right-0 top-[calc(100%-5px)] w-32 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-lg p-1 opacity-0 group-hover/dev:opacity-100 transition-opacity pointer-events-none group-hover/dev:pointer-events-auto shadow-xl z-50">
                            {['bullish', 'neutral', 'bearish'].map(s => (
                                <button
                                    key={s}
                                    onClick={() => setSentiment(s)}
                                    className={`w-full text-left px-2 py-1.5 text-xs rounded hover:bg-slate-100 dark:hover:bg-white/10 ${sentiment === s ? 'text-slate-900 dark:text-white font-bold bg-slate-100 dark:bg-white/5' : 'text-slate-500 dark:text-white/50'}`}
                                >
                                    {s.charAt(0).toUpperCase() + s.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
