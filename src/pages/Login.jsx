import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useAuth } from "../context/AuthContext"
import { Button } from "../components/ui/Button"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Loader2, AlertCircle } from "lucide-react"
import { useState } from "react"

const loginSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(1, "A senha é obrigatória")
})

export default function Login({ onToggleRegister, onLoginSuccess }) {
    const { login } = useAuth()
    const [error, setError] = useState("")

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(loginSchema)
    })

    // We act as a "Page" but since App.jsx currently manages state routing manually (or will be updated to Router),
    // we'll keep the props for flexible integration. For strict Routing, onToggleRegister would be a navigate().

    const onSubmit = async (data) => {
        try {
            setError("")
            await login(data.email, data.password)
            onLoginSuccess() // Callback to switch view or navigate
        } catch (err) {
            setError("Credenciais inválidas. Verifique e tente novamente.")
        }
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-charcoal">
            {/* Left: Art/Visuals */}
            <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-wealth-green to-black items-center justify-center p-12">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
                <div className="relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="w-16 h-16 rounded-2xl bg-lime-accent text-charcoal flex items-center justify-center text-4xl font-bold mx-auto mb-8 shadow-[0_0_40px_rgba(174,234,0,0.4)]">
                            I
                        </div>
                        <h2 className="text-4xl font-bold mb-4 text-white">Domine seu patrimônio.</h2>
                        <p className="text-white/60 text-lg max-w-md mx-auto">
                            Inteligência Artificial aplicada à gestão de risco institucional. Para você.
                        </p>
                    </motion.div>
                </div>
                {/* Abstract Glow */}
                <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-lime-accent/10 blur-[150px] rounded-full" />
            </div>

            {/* Right: Form */}
            <div className="flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl font-bold text-white mb-2">Bem-vindo de volta</h1>
                        <p className="text-white/50">Entre para acessar seu dashboard.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-white/70 mb-2">Email</label>
                            <input
                                {...register("email")}
                                className={`w-full bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-lime-accent/50 transition-all`}
                                placeholder="seu@email.com"
                            />
                            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="block text-sm font-medium text-white/70">Senha</label>
                                <Link to="/forgot-password" className="text-xs text-lime-accent hover:underline">Esqueceu?</Link>
                            </div>
                            <input
                                type="password"
                                {...register("password")}
                                className={`w-full bg-white/5 border ${errors.password ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-lime-accent/50 transition-all`}
                                placeholder="••••••••"
                            />
                            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
                        </div>

                        {error && (
                            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-3 rounded-lg">
                                <AlertCircle size={16} />
                                {error}
                            </motion.div>
                        )}

                        <Button className="w-full h-12 text-base" isLoading={isSubmitting}>
                            Entrar
                        </Button>
                    </form>

                    <div className="text-center text-sm text-white/60">
                        Não tem conta?{" "}
                        <button onClick={onToggleRegister} className="text-lime-accent font-bold hover:underline">
                            Crie agora
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
