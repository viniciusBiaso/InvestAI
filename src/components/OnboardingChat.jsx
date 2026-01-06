import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "./ui/Button"
import { ArrowRight, Bot, User } from "lucide-react"

// 10 Deep Questions for Precise Profiling
const questions = [
    {
        text: "Vamos começar pelo principal. Qual é o seu GRANDE objetivo financeiro?",
        options: [
            { label: "Preservação máxima (Medo de perder)", value: "conservative", points: 0 },
            { label: "Crescimento consistente longo prazo", value: "moderate", points: 5 },
            { label: "Multiplicação agressiva de capital", value: "aggressive", points: 10 }
        ]
    },
    {
        text: "Em quanto tempo você PRECISARÁ resgatar a maior parte desse dinheiro?",
        options: [
            { label: "Menos de 1 ano (Curto prazo)", value: "short", points: 0 },
            { label: "Entre 2 a 5 anos", value: "medium", points: 5 },
            { label: "Acima de 10 anos (Longo prazo)", value: "long", points: 10 }
        ]
    },
    {
        text: "Vamos falar de dor. Se sua carteira cair 10% amanhã (-R$ 1.000 a cada R$ 10k), o que você faria?",
        options: [
            { label: "Vendo tudo em pânico", value: "panic", points: 0 }, // Critical Check
            { label: "Fico desconfortável, mas aguardo", value: "wait", points: 5 },
            { label: "Compro mais (Liquidação!)", value: "buy", points: 10 }
        ]
    },
    {
        text: "Qual seu nível de conhecimento sobre o mercado financeiro?",
        options: [
            { label: "Iniciante (Poupança/CDB)", points: 0 },
            { label: "Intermediário (FIIs/Ações)", points: 5 },
            { label: "Avançado (Derivativos/Cripto)", points: 10 }
        ]
    },
    {
        text: "Como é a estabilidade da sua renda principal hoje?",
        options: [
            { label: "Variável / Incerta", points: 0 }, // Needs security
            { label: "Estável, mas sem sobras grandes", points: 5 },
            { label: "Muito estável e garantida", points: 10 } // Takes more risk
        ]
    },
    {
        text: "Você tem dependentes financeiros ou grandes dívidas?",
        options: [
            { label: "Sim, muitos dependentes/dívidas", points: 0 },
            { label: "Alguns, mas gerenciável", points: 5 },
            { label: "Não, sou livre financeiramente", points: 10 }
        ]
    },
    {
        text: "Já investiu em Renda Variável (Ações/Cripto) antes?",
        options: [
            { label: "Nunca", points: 0 },
            { label: "Sim, e perdi dinheiro", points: 2 },
            { label: "Sim, e tive bons resultados", points: 8 }
        ]
    },
    {
        text: "Teste de Estresse Máximo: Em uma crise como 2008 ou 2020, o mercado cai 40%. Você...",
        options: [
            { label: "Não conseguiria dormir à noite", points: 0 },
            { label: "Entendo que faz parte do ciclo", points: 6 },
            { label: "Tenho caixa para aproveitar a crise", points: 10 }
        ]
    },
    {
        text: "O que é mais importante para você?",
        options: [
            { label: "Não perder dinheiro NUNCA", points: 0 },
            { label: "Ganhar acima da inflação", points: 5 },
            { label: "Ganhar o máximo possível", points: 10 }
        ]
    },
    {
        text: "Para finalizar: Como você define 'Sucesso' nos investimentos?",
        options: [
            { label: "Paz de espírito", points: 0 },
            { label: "Realização de sonhos", points: 5 },
            { label: "Liberdade total e poder", points: 10 }
        ]
    },
    {
        text: "Qual o valor inicial que você pretende investir?",
        options: [
            { label: "Até R$ 5.000", points: 0 },
            { label: "Entre R$ 5.000 e R$ 50.000", points: 5 },
            { label: "Acima de R$ 50.000", points: 10 }
        ]
    }
]

export default function OnboardingChat({ onComplete }) {
    const [step, setStep] = useState(0)
    const [history, setHistory] = useState([])
    const [isTyping, setIsTyping] = useState(false)
    const [totalPoints, setTotalPoints] = useState(0)

    const bottomRef = useRef(null)

    useEffect(() => {
        if (history.length === 0) {
            addBotMessage(questions[0].text)
        }
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [history])

    const addBotMessage = (text) => {
        setIsTyping(true)
        setTimeout(() => {
            setIsTyping(false)
            setHistory(prev => [...prev, { type: 'bot', text }])
        }, 800) // Slightly faster pacing for 10 q's
    }

    const handleAnswer = (option) => {
        setHistory(prev => [...prev, { type: 'user', text: option.label }])
        setTotalPoints(prev => prev + option.points)

        // Critical Panic Check: If user answers "Vendo tudo em pânico" (points 0 in Q3), force Conservative immediately?
        // Let's stick to points sum for now, but keep risk logic in mind.

        const nextStep = step + 1
        if (nextStep < questions.length) {
            setStep(nextStep)
            addBotMessage(questions[nextStep].text)
        } else {
            finishAssessment(totalPoints + option.points)
        }
    }

    const finishAssessment = (finalScore) => {
        setIsTyping(true)
        setTimeout(() => {
            // SCORING LOGIC (Max 100 points)
            // 0 - 35: Conservative
            // 36 - 70: Moderate
            // 71 - 100: Aggressive

            let profile = "conservative"
            if (finalScore > 70) profile = "aggressive"
            else if (finalScore > 35) profile = "moderate"

            addBotMessage(`Análise concluída.\nPontuação de Risco: ${finalScore}/100.\n\nCalculando sua alocação ideal...`)

            setTimeout(() => {
                onComplete(profile)
            }, 2500)
        }, 1500)
    }

    return (
        <div className="min-h-screen bg-charcoal text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 h-1 bg-white/10 w-full z-50">
                <motion.div
                    className="h-full bg-lime-accent"
                    animate={{ width: `${((step) / questions.length) * 100}%` }}
                />
            </div>

            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-wealth-green/10 rounded-full blur-[120px]" />
            </div>

            <div className="w-full max-w-2xl z-10 flex flex-col h-[85vh]">
                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto space-y-6 pr-4 customized-scrollbar pb-60">
                    {history.map((msg, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex gap-4 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${msg.type === 'bot' ? 'bg-lime-accent text-charcoal' : 'bg-white/10 text-white'}`}>
                                {msg.type === 'bot' ? <Bot size={20} /> : <User size={20} />}
                            </div>
                            <div className={`p-4 rounded-2xl max-w-[80%] ${msg.type === 'bot' ? 'bg-white/5 border border-white/5 rounded-tl-none' : 'bg-wealth-green text-white rounded-tr-none'}`}>
                                <p className="whitespace-pre-wrap">{msg.text}</p>
                            </div>
                        </motion.div>
                    ))}

                    {isTyping && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-lime-accent text-charcoal flex items-center justify-center shrink-0">
                                <Bot size={20} />
                            </div>
                            <div className="bg-white/5 border border-white/5 p-4 rounded-2xl rounded-tl-none flex gap-2">
                                <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" />
                                <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                                <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce [animation-delay:0.4s]" />
                            </div>
                        </motion.div>
                    )}
                    <div ref={bottomRef} />
                </div>

                {/* Options Area */}
                <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal via-charcoal to-transparent p-6 md:p-8 z-20 flex justify-center">
                    <div className="w-full max-w-2xl">
                        {!isTyping && step < questions.length && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="grid gap-3"
                            >
                                {questions[step].options.map((opt, idx) => (
                                    <Button
                                        key={idx}
                                        variant="outline"
                                        className="justify-between group h-auto py-4 text-left text-sm md:text-base hover:border-lime-accent/50 hover:bg-lime-accent/5"
                                        onClick={() => handleAnswer(opt)}
                                    >
                                        <span>{opt.label}</span>
                                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ml-2 shrink-0" />
                                    </Button>
                                ))}
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
