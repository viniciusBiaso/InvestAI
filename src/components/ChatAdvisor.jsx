import { useState, useRef, useEffect } from "react"
import { Send, Sparkles, X } from "lucide-react"
import axios from "axios"
import { useAuth } from "../context/AuthContext"

const SUGGESTIONS = [
    "Analisar minha carteira",
    "O que é CDI?",
    "Resumo do Mercado",
    "Devo comprar Bitcoin?"
]

// Safe parser for bold text (e.g. **text**)
const safeRender = (text) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={index} className="text-emerald-400 font-bold">{part.slice(2, -2)}</strong>;
        }
        return part;
    });
};

const Typewriter = ({ text, onComplete }) => {
    const [displayed, setDisplayed] = useState("");

    useEffect(() => {
        let i = 0;
        setDisplayed("");
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayed((prev) => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(timer);
                if (onComplete) onComplete();
            }
        }, 15); // Speed: 15ms per char
        return () => clearInterval(timer);
    }, [text]);

    return <p className="whitespace-pre-wrap font-sans">{safeRender(displayed)}</p>;
};

export default function ChatAdvisor({ onClose }) {
    const { user } = useAuth()

    // Load initial state from LocalStorage or Default
    const [messages, setMessages] = useState(() => {
        const saved = localStorage.getItem("investai_chat_history")
        return saved ? JSON.parse(saved) : [
            { role: "ai", content: `Olá, ${user?.name || "Investidor"}! Sou seu Analytics AI. Como posso ajudar?` }
        ]
    })

    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const bottomRef = useRef(null)

    // Scroll to bottom on new message
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    // Save to LocalStorage on change
    useEffect(() => {
        localStorage.setItem("investai_chat_history", JSON.stringify(messages))
    }, [messages])

    const handleCloseRequest = () => {
        if (messages.length > 1) {
            setShowConfirm(true)
        } else {
            onClose()
        }
    }

    const confirmClose = (shouldClear) => {
        if (shouldClear) {
            const initialMsg = [{ role: "ai", content: `Olá, ${user?.name || "Investidor"}! Sou seu Analytics AI. Como posso ajudar?` }]
            setMessages(initialMsg)
            localStorage.setItem("investai_chat_history", JSON.stringify(initialMsg))
        }
        setShowConfirm(false)
        onClose()
    }

    const handleSend = async (text = input) => {
        if (!text.trim() || isLoading) return

        // User Message
        const userMsg = { role: "user", content: text }
        setMessages(prev => [...prev, userMsg])
        setInput("")
        setIsLoading(true)

        try {
            // Backend Call
            const token = localStorage.getItem("token")
            const response = await axios.post("http://localhost:8000/chat/message",
                { message: text },
                { headers: { Authorization: `Bearer ${token}` } }
            )

            const aiMsg = { role: "ai", content: response.data.response }
            setMessages(prev => [...prev, aiMsg])
        } catch (error) {
            console.error("Chat Error", error)
            setMessages(prev => [...prev, { role: "ai", content: "**Erro de conexão.** Tente novamente." }])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="h-full w-full bg-zinc-900 border-l border-white/5 flex flex-col font-sans">
            {/* Header */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/20 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-sm">InvestAI Advisor</h3>
                        <p className="text-xs text-white/50 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Online
                        </p>
                    </div>
                </div>
                <button onClick={handleCloseRequest} className="p-2 hover:bg-white/5 rounded-full text-white/50 hover:text-white transition-colors">
                    <X size={18} />
                </button>
            </div>

            {/* Confirmation Overlay */}
            {showConfirm && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                    <div className="bg-zinc-900 border border-white/10 p-6 rounded-2xl shadow-2xl max-w-sm w-full text-center">
                        <h3 className="text-lg font-bold text-white mb-2">Fechar Chat?</h3>
                        <p className="text-sm text-white/60 mb-6">Você deseja manter o histórico dessa conversa ou limpar tudo?</p>

                        <div className="space-y-3">
                            <button
                                onClick={() => confirmClose(false)}
                                className="w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-colors"
                            >
                                Manter Histórico
                            </button>
                            <button
                                onClick={() => confirmClose(true)}
                                className="w-full py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                            >
                                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                Limpar e Fechar
                            </button>
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="text-xs text-white/40 hover:text-white mt-2"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 customized-scrollbar bg-zinc-900/50">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${msg.role === 'user'
                                ? 'bg-emerald-600 text-white rounded-tr-none'
                                : 'bg-zinc-800 text-white/90 border border-white/5 rounded-tl-none shadow-sm'
                                }`}
                        >
                            {msg.role === 'ai' && idx === messages.length - 1 && isLoading === false ? (
                                // Only animate the VERY LAST AI message if not currently loading another
                                <Typewriter text={String(msg.content || "")} />
                            ) : (
                                // Render static text for history or user messages
                                <p className="whitespace-pre-wrap font-sans">
                                    {safeRender(String(msg.content || ""))}
                                </p>
                            )}
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-zinc-800 rounded-2xl rounded-tl-none p-4 flex gap-1 items-center">
                            <span className="text-xs text-white/50 animate-pulse">Digitando...</span>
                        </div>
                    </div>
                )}
                <div ref={bottomRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/5 bg-black/20">
                {/* Chips */}
                <div className="flex gap-2 mb-3 overflow-x-auto pb-2 customized-scrollbar">
                    {SUGGESTIONS.map(s => (
                        <button
                            key={s}
                            onClick={() => handleSend(s)}
                            className="whitespace-nowrap px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs text-white/70 hover:bg-white/10 hover:border-emerald-500/30 hover:text-emerald-400 transition-all"
                            disabled={isLoading}
                        >
                            {s}
                        </button>
                    ))}
                </div>

                <div className="relative">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Pergunte sobre seus investimentos..."
                        className="w-full bg-black/30 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-white/20"
                        disabled={isLoading}
                    />
                    <button
                        onClick={() => handleSend()}
                        disabled={!input.trim() || isLoading}
                        className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all ${input.trim() ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:scale-105' : 'bg-white/5 text-white/20 cursor-not-allowed'
                            }`}
                    >
                        <Send size={16} />
                    </button>
                </div>
            </div>
        </div>
    )
}
