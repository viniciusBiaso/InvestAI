import { motion } from "framer-motion"
import { Shield, Brain, Target, Zap } from "lucide-react"

const features = [
    {
        icon: Shield,
        title: "Blindagem de Carteira",
        description: "Simulamos crises antes que elas aconteçam. Stress-test sua carteira contra cenários reais de mercado.",
        size: "col-span-12 md:col-span-8",
        gradient: "from-wealth-green/20 to-transparent"
    },
    {
        icon: Brain,
        title: "IA Consultiva",
        description: "Não dizemos apenas 'compre', explicamos o 'porquê'. Análises detalhadas em linguagem natural.",
        size: "col-span-12 md:col-span-4",
        gradient: "from-lime-accent/10 to-transparent"
    },
    {
        icon: Target,
        title: "Match de Perfil",
        description: "Investimentos que respeitam seu estômago para risco e horizonte de tempo.",
        size: "col-span-12 md:col-span-4",
        gradient: "from-purple-500/10 to-transparent"
    },
    {
        icon: Zap,
        title: "Rebalanceamento Dinâmico",
        description: "Alertas automáticos quando sua alocação desvia do objetivo.",
        size: "col-span-12 md:col-span-8",
        gradient: "from-blue-500/10 to-transparent"
    }
]

export default function Features() {
    return (
        <section id="features" className="py-24 relative">
            <div className="container mx-auto px-6">
                <div className="mb-16 text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Por que o InvestAI?</h2>
                    <p className="text-white/60 text-lg">
                        Tecnologia institucional, agora no seu bolso.
                    </p>
                </div>

                <div className="grid grid-cols-12 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className={`relative ${feature.size} group p-8 rounded-3xl bg-white/5 border border-white/10 overflow-hidden hover:border-lime-accent/30 transition-all duration-300`}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div className="p-3 bg-white/5 rounded-xl w-fit mb-6 text-lime-accent group-hover:bg-lime-accent group-hover:text-charcoal transition-colors duration-300">
                                    <feature.icon size={28} />
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                                    <p className="text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
