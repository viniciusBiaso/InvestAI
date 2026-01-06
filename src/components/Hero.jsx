import { motion } from "framer-motion"
import { Button } from "./ui/Button"
import { ArrowRight, ShieldCheck, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

export default function Hero() {
    const [text, setText] = useState("Pare de adivinhar.")
    const [phase, setPhase] = useState("first") // first | deleting | typing | done

    useEffect(() => {
        let timeout

        if (phase === "first") {
            timeout = setTimeout(() => setPhase("deleting"), 2000)
        } else if (phase === "deleting") {
            if (text.length > 0) {
                timeout = setTimeout(() => setText(text.slice(0, -1)), 50)
            } else {
                setPhase("typing")
            }
        } else if (phase === "typing") {
            const fullText = "Invista com Inteligência Artificial."
            if (text.length < fullText.length) {
                timeout = setTimeout(() => setText(fullText.slice(0, text.length + 1)), 50)
            } else {
                setPhase("done")
            }
        }

        return () => clearTimeout(timeout)
    }, [text, phase])

    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-wealth-green/20 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-lime-accent/5 rounded-full blur-[100px] -z-10" />

            <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <div className="max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-lime-accent animate-pulse" />
                        <span className="text-xs font-medium text-lime-accent tracking-wide uppercase">Nova era dos investimentos</span>
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                            {text}
                        </span>
                        <span className="animate-pulse text-lime-accent">|</span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg text-white/60 mb-8 leading-relaxed max-w-lg"
                    >
                        O primeiro Assessor Digital que prioriza a segurança do seu patrimônio.
                        Análise de risco institucional, acessível a todos.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Button size="lg" className="group shadow-[0_0_40px_-10px_rgba(174,234,0,0.3)]">
                            Começar Análise Gratuita
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                        <Button size="lg" variant="outline">
                            Ver Demonstração
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-12 flex items-center gap-6 text-sm text-white/40"
                    >
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-wealth-green" />
                            <span>Dados Criptografados</span>
                        </div>
                        <div className="h-4 w-px bg-white/10" />
                        <div>
                            <span className="text-white">50k+</span> análises realizadas
                        </div>
                    </motion.div>
                </div>

                {/* Visual Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
                    animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative hidden lg:block perspective-1000"
                >
                    {/* Main Dashboard Mockup */}
                    <div className="relative z-10 p-2 bg-gradient-to-b from-white/10 to-transparent rounded-2xl backdrop-blur-md border border-white/10 shadow-2xl rotate-y-12 rotate-z-2 hover:rotate-y-0 hover:rotate-z-0 transition-all duration-700">
                        <div className="aspect-[16/10] bg-charcoal rounded-xl overflow-hidden relative">
                            {/* Mockup UI Elements - Abstract Representation */}
                            <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-black p-6">
                                <div className="flex justify-between items-center mb-8">
                                    <div className="h-8 w-32 bg-white/10 rounded-lg animate-pulse" />
                                    <div className="h-8 w-8 rounded-full bg-lime-accent/20" />
                                </div>
                                <div className="grid grid-cols-3 gap-4 mb-8">
                                    <div className="h-24 rounded-lg bg-white/5 border border-white/5 p-4">
                                        <div className="h-2 w-2 rounded-full bg-lime-accent mb-2" />
                                        <div className="h-4 w-12 bg-white/10 rounded mb-2" />
                                        <div className="h-6 w-20 bg-white/20 rounded" />
                                    </div>
                                    <div className="h-24 rounded-lg bg-white/5 border border-white/5 p-4">
                                        <div className="h-2 w-2 rounded-full bg-yellow-500 mb-2" />
                                        <div className="h-4 w-12 bg-white/10 rounded mb-2" />
                                        <div className="h-6 w-20 bg-white/20 rounded" />
                                    </div>
                                    <div className="h-24 rounded-lg bg-white/5 border border-white/5 p-4">
                                        <div className="h-2 w-2 rounded-full bg-purple-500 mb-2" />
                                        <div className="h-4 w-12 bg-white/10 rounded mb-2" />
                                        <div className="h-6 w-20 bg-white/20 rounded" />
                                    </div>
                                </div>
                                {/* Chart Area */}
                                <div className="h-40 w-full bg-gradient-to-t from-lime-accent/10 to-transparent rounded-lg border-b border-lime-accent/20 relative overflow-hidden">
                                    <svg viewBox="0 0 100 40" className="absolute bottom-0 w-full h-full text-lime-accent fill-lime-accent/20 stroke-current stroke-2">
                                        <path d="M0 30 C 20 20, 40 35, 60 10 S 80 25, 100 5 V 40 H 0 Z" />
                                        <path d="M0 30 C 20 20, 40 35, 60 10 S 80 25, 100 5" fill="none" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Elements */}
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -right-8 -top-8 p-4 glass-card rounded-xl z-20"
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-lime-accent/20 p-2 rounded-lg text-lime-accent">
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <div className="text-xs text-white/50">Score de Risco</div>
                                <div className="text-xl font-bold text-white">98/100</div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
