import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { MessageSquare, Activity } from "lucide-react"

export default function PlatformShowcase() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], [100, -100])

    return (
        <section id="how-it-works" className="py-32 overflow-hidden" ref={containerRef}>
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Copy */}
                    <div className="lg:w-1/3">
                        <h2 className="text-4xl md:text-5xl font-bold mb-8">
                            Seu analista pessoal disponível <span className="text-lime-accent">24/7</span>.
                        </h2>

                        <div className="space-y-8">
                            <div className="flex gap-4">
                                <div className="mt-1 bg-white/10 p-2 rounded-lg h-fit text-lime-accent">
                                    <MessageSquare />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Chatbot Entrevistador</h3>
                                    <p className="text-white/60">Conte seus objetivos como se estivesse conversando com um amigo. Nossa IA entende o contexto e nuances.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="mt-1 bg-white/10 p-2 rounded-lg h-fit text-lime-accent">
                                    <Activity />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Termômetro de Risco</h3>
                                    <p className="text-white/60">Visualize instantaneamente se um ativo combina com seu perfil antes de investir.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mockups */}
                    <div className="lg:w-2/3 relative h-[600px] w-full">
                        {/* Desktop App */}
                        <motion.div
                            style={{ y }}
                            className="absolute right-0 top-0 w-4/5 h-full bg-charcoal border border-white/10 rounded-tl-3xl rounded-bl-3xl shadow-2xl overflow-hidden glass-card"
                        >
                            <div className="p-6 border-b border-white/10 flex items-center gap-4">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                </div>
                                <div className="h-6 w-96 bg-white/5 rounded-md" />
                            </div>
                            <div className="p-8 grid grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="h-32 bg-white/5 rounded-xl w-full" />
                                    <div className="h-32 bg-white/5 rounded-xl w-full" />
                                </div>
                                <div className="h-full bg-white/5 rounded-xl" />
                            </div>
                        </motion.div>

                        {/* Mobile App */}
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            whileInView={{ y: 50, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="absolute left-10 md:left-20 bottom-10 w-[280px] h-[550px] bg-charcoal border-[8px] border-gray-900 rounded-[3rem] shadow-2xl overflow-hidden z-20"
                        >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-xl z-30" />
                            <div className="h-full bg-gradient-to-b from-wealth-green/20 to-black p-6 pt-12 flex flex-col">
                                <div className="bg-white/10 p-4 rounded-xl mb-4 rounded-tl-none self-end max-w-[90%]">
                                    <p className="text-xs text-white/80">Quero investir R$ 5k em algo conservador.</p>
                                </div>
                                <div className="bg-lime-accent p-4 rounded-xl mb-auto rounded-tr-none self-start max-w-[90%] text-charcoal">
                                    <p className="text-xs font-medium">Encontrei 3 opções de CDB com liquidez diária que batem o CDI. Quer ver?</p>
                                </div>

                                <div className="mt-8 bg-white/5 rounded-2xl p-4 border border-white/10">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-xs text-white/50">Nível de Risco</span>
                                        <span className="text-xs text-lime-accent">Baixo</span>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full w-[20%] bg-lime-accent" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
