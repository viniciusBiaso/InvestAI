import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "./ui/Button"

const plans = [
    {
        name: "Iniciante",
        price: "R$ 0",
        description: "Para quem está começando a organizar a casa.",
        features: [
            "1 Família de ativos",
            "Análise básica de risco",
            "Chatbot limitado",
            "Suporte por email"
        ],
        cta: "Começar Grátis",
        variant: "outline"
    },
    {
        name: "Investidor Plus",
        price: "R$ 29,90",
        period: "/mês",
        description: "Para quem quer crescer sério e diversificar.",
        features: [
            "Ações, FIIs e Renda Fixa",
            "Análise de Sentimento (IA)",
            "Recomendações ilimitadas",
            "Destaque: Badge Exclusiva"
        ],
        cta: "Assinar Plus",
        variant: "primary",
        featured: true
    },
    {
        name: "Wealth",
        price: "R$ 89,90",
        period: "/mês",
        description: "Gestão completa para grandes patrimônios.",
        features: [
            "Tudo do Plus + Cripto",
            "Simulador de Crise (Stress Test)",
            "Atendimento Prioritário",
            "Relatórios Fiscais"
        ],
        cta: "Falar com Consultor",
        variant: "outline"
    }
]

export default function Pricing() {
    return (
        <section id="pricing" className="py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-wealth-green/5 to-transparent -z-10" />

            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Escolha seu plano</h2>
                    <p className="text-white/60">Comece grátis e evolua conforme seu patrimônio cresce.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className={`relative p-8 rounded-2xl border ${plan.featured ? 'bg-white/5 border-lime-accent shadow-[0_0_30px_-10px_rgba(174,234,0,0.2)]' : 'bg-transparent border-white/10'} flex flex-col h-fit`}
                        >
                            {plan.featured && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-lime-accent text-charcoal text-xs font-bold uppercase tracking-wider rounded-full">
                                    Mais Escolhido
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    <span className="text-white/50 text-sm">{plan.period}</span>
                                </div>
                                <p className="text-white/60 text-sm mt-4">{plan.description}</p>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm">
                                        <Check className="h-5 w-5 text-lime-accent shrink-0" />
                                        <span className="text-white/80">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button variant={plan.variant} className="w-full">
                                {plan.cta}
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
