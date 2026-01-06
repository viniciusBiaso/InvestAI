import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useAuth } from "../context/AuthContext"
import { Button } from "../components/ui/Button"
import { motion } from "framer-motion"
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react"
import { useState } from "react"

const registerSchema = z.object({
    name: z.string().min(2, "Nome muito curto"),
    email: z.string().email("Email inválido"),
    password: z.string().min(8, "Mínimo de 8 caracteres"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não conferem",
    path: ["confirmPassword"],
})

export default function Register({ onToggleLogin, onLoginSuccess }) {
    const { register: registerAuth } = useAuth()
    const [error, setError] = useState("")

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(registerSchema)
    })

    const onSubmit = async (data) => {
        try {
            setError("")
            await registerAuth(data.name, data.email, data.password)
            onLoginSuccess() // Auto-login successful
        } catch (err) {
            setError("Erro ao criar conta. Email já pode estar em uso.")
        }
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-charcoal">
            {/* Left: Art/Visuals */}
            <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-bl from-lime-900 to-black items-center justify-center p-12 order-2 lg:order-1">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
                <div className="relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8 mx-auto">
                            <CheckCircle2 className="w-10 h-10 text-lime-accent" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4 text-white">Junte-se à Elite.</h2>
                        <div className="space-y-4 text-left max-w-sm mx-auto text-white/70 mt-8">
                            <div className="flex gap-3 items-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-lime-accent" />
                                <span>Acesso ao Dashboard Pro</span>
                            </div>
                            <div className="flex gap-3 items-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-lime-accent" />
                                <span>Análise de Risco com IA</span>
                            </div>
                            <div className="flex gap-3 items-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-lime-accent" />
                                <span>Simulações de Crise</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Right: Form */}
            <div className="flex items-center justify-center p-8 order-1 lg:order-2">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl font-bold text-white mb-2">Criar Conta</h1>
                        <p className="text-white/50">Comece sua jornada de investimentos hoje.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-white/70 mb-2">Nome Completo</label>
                            <input
                                {...register("name")}
                                className={`w-full bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-lime-accent/50 transition-all`}
                                placeholder="João Silva"
                            />
                            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/70 mb-2">Email</label>
                            <input
                                {...register("email")}
                                className={`w-full bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-lime-accent/50 transition-all`}
                                placeholder="seu@email.com"
                            />
                            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-white/70 mb-2">Senha</label>
                                <input
                                    type="password"
                                    {...register("password")}
                                    className={`w-full bg-white/5 border ${errors.password ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-lime-accent/50 transition-all`}
                                    placeholder="Mín 8 carac."
                                />
                                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white/70 mb-2">Confirmar</label>
                                <input
                                    type="password"
                                    {...register("confirmPassword")}
                                    className={`w-full bg-white/5 border ${errors.confirmPassword ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-lime-accent/50 transition-all`}
                                    placeholder="Repita"
                                />
                                {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>}
                            </div>
                        </div>

                        {error && (
                            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-3 rounded-lg">
                                <AlertCircle size={16} />
                                {error}
                            </motion.div>
                        )}

                        <Button className="w-full h-12 text-base" isLoading={isSubmitting}>
                            Criar Conta
                        </Button>
                    </form>

                    <div className="text-center text-sm text-white/60">
                        Já tem conta?{" "}
                        <button onClick={onToggleLogin} className="text-lime-accent font-bold hover:underline">
                            Entrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
