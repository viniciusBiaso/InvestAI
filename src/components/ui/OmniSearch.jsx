import { useState, useEffect, useRef } from "react"
import { Search, Loader, TrendingUp, X } from "lucide-react"
import axios from "axios"
import { AnimatePresence, motion } from "framer-motion"

export default function OmniSearch({ onSelect }) {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const wrapperRef = useRef(null)
    // const navigate = useNavigate() // Navigation removed

    // Debounce Logic
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (query.length >= 2) {
                setIsLoading(true)
                try {
                    const response = await axios.get(`http://localhost:8000/api/market/search?query=${query}`)
                    setResults(response.data)
                    setIsOpen(true)
                } catch (error) {
                    console.error("Search failed", error)
                    setResults([])
                } finally {
                    setIsLoading(false)
                }
            } else {
                setResults([])
                setIsOpen(false)
            }
        }, 300) // 300ms delay

        return () => clearTimeout(delayDebounceFn)
    }, [query])

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [wrapperRef])

    const handleSelect = (ticker) => {
        setQuery("") // Clear query
        setIsOpen(false)
        if (onSelect) {
            onSelect(ticker)
        }
    }

    return (
        <div ref={wrapperRef} className="relative w-full max-w-md z-50">
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {isLoading ? (
                        <Loader size={16} className="text-lime-accent animate-spin" />
                    ) : (
                        <Search size={16} className="text-white/40 group-focus-within:text-lime-accent transition-colors" />
                    )}
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-white/5 rounded-full leading-5 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:bg-white/10 focus:border-lime-accent/50 focus:ring-1 focus:ring-lime-accent/50 sm:text-sm transition-all shadow-inner"
                    placeholder="Buscar ativos (ex: PETR4, Apple)..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.length >= 2 && setIsOpen(true)}
                />
                {query.length > 0 && (
                    <button
                        onClick={() => { setQuery(""); setIsOpen(false); }}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white"
                    >
                        <X size={14} />
                    </button>
                )}
            </div>

            <AnimatePresence>
                {isOpen && results.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute mt-2 w-full bg-charcoal/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                    >
                        <ul className="max-h-60 overflow-y-auto py-2">
                            {results.map((asset) => (
                                <li key={asset.ticker}>
                                    <button
                                        onClick={() => handleSelect(asset.ticker)}
                                        className="w-full text-left px-4 py-3 hover:bg-white/5 hover:border-l-4 border-l-transparent hover:border-l-lime-accent transition-all flex items-center justify-between group"
                                    >
                                        <div>
                                            <p className="text-sm font-bold text-white group-hover:text-lime-accent transition-colors">
                                                {asset.ticker}
                                            </p>
                                            <p className="text-xs text-white/50">{asset.name}</p>
                                        </div>
                                        <TrendingUp size={14} className="text-white/20 group-hover:text-lime-accent transition-colors" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
                {isOpen && results.length === 0 && !isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute mt-2 w-full bg-charcoal/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl p-4 text-center"
                    >
                        <p className="text-sm text-white/40">Nenhum ativo encontrado.</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
