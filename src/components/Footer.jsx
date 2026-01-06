import { motion } from "framer-motion"
import { Quote } from "lucide-react"

const testimonials = [
    {
        quote: "Finalmente entendi onde estava errando nos meus investimentos. A IA explicou tudo de forma simples.",
        author: "Ricardo S.",
        role: "Investidor Iniciante"
    },
    {
        quote: "A análise de sentimento me salvou de entrar em uma furada na semana passada. Ferramenta indispensável.",
        author: "Mariana L.",
        role: "Trader"
    },
    {
        quote: "Interface incrível e insights profundos. Uso para gerenciar o patrimônio da minha família.",
        author: "Carlos E.",
        role: "Empresário"
    }
]

export function Testimonials() {
    return (
        <section className="py-24 bg-white/2">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-16">Quem usa, aprova</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className="p-8 rounded-2xl bg-charcoal border border-white/5 relative"
                        >
                            <Quote className="absolute top-8 right-8 text-white/5 h-12 w-12" />
                            <p className="text-white/80 italic mb-6 relative z-10">"{t.quote}"</p>
                            <div>
                                <div className="font-bold text-lime-accent">{t.author}</div>
                                <div className="text-xs text-white/40">{t.role}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Logos */}
                <div className="mt-20 flex flex-wrap justify-center gap-12 opacity-30 grayscale">
                    {/* Placeholder Logos */}
                    <h3 className="text-2xl font-bold">B3</h3>
                    <h3 className="text-2xl font-bold">NASDAQ</h3>
                    <h3 className="text-2xl font-bold">BLOOMBERG</h3>
                    <h3 className="text-2xl font-bold">FORBES</h3>
                </div>
            </div>
        </section>
    )
}

export function Footer() {
    return (
        <footer className="py-20 border-t border-white/10 relative overflow-hidden">
            {/* Glow Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-lime-accent/5 rounded-full blur-[100px] -z-10" />

            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
                    Seu patrimônio merece <br />
                    <span className="text-lime-accent">inteligência artificial.</span>
                </h2>

                <button className="bg-white text-charcoal px-8 py-4 rounded-full text-lg font-bold mb-16 hover:scale-105 transition-transform">
                    Começar Agora
                </button>

                <div className="grid md:grid-cols-4 gap-8 text-left text-sm text-white/40 border-t border-white/5 pt-12">
                    <div>
                        <div className="font-bold text-white mb-4">InvestAI</div>
                        <p>O futuro do seu dinheiro.</p>
                    </div>
                    <div>
                        <div className="font-bold text-white mb-4">Produto</div>
                        <ul className="space-y-2">
                            <li>Funcionalidades</li>
                            <li>Preços</li>
                            <li>Roadmap</li>
                        </ul>
                    </div>
                    <div>
                        <div className="font-bold text-white mb-4">Legal</div>
                        <ul className="space-y-2">
                            <li>Termos de Uso</li>
                            <li>Privacidade</li>
                        </ul>
                    </div>
                    <div>
                        <div className="font-bold text-white mb-4">Social</div>
                        <ul className="space-y-2">
                            <li>Twitter</li>
                            <li>LinkedIn</li>
                            <li>Instagram</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 text-xs text-white/20">
                    © 2026 InvestAI. Todos os direitos reservados.
                </div>
            </div>
        </footer>
    )
}
