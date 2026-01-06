import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "../components/ui/Button"
import { motion } from "framer-motion"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const forgotSchema = z.object({
    email: z.string().email("Insira um email válido")
})

export default function ForgotPassword() {
    const navigate = useNavigate()
    const [success, setSuccess] = useState(false)

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(forgotSchema)
    })

    const onSubmit = async (data) => {
        try {
            // Call backend mock endpoint
            await axios.post(`http://localhost:8000/forgot-password?email=${data.email}`)
            setSuccess(true)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-charcoal">
            {/* Left: Art */}
            <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-t from-black to-charcoal items-center justify-center p-12 order-2">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
                <div className="relative z-10 text-center">
                    <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-4xl font-bold mx-auto mb-8 animate-pulse">
                        ?
                    </div>
                    <h2 className="text-3xl font-bold mb-4 text-white">Recuperação Segura</h2>
                    <p className="text-white/60">Enviaremos um link mágico para você retomar o acesso.</p>
                </div>
            </div>

            {/* Right: Form */}
            <div className="flex items-center justify-center p-8 order-1">
                <div className="w-full max-w-md space-y-8">
                    <button onClick={() => navigate("/login")} className="flex items-center text-white/50 hover:text-white transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Voltar para Login
                    </button>

                    {!success ? (
                        <>
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-2">Esqueceu a senha?</h1>
                                <p className="text-white/50">Acontece. Digite seu email abaixo.</p>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-white/70 mb-2">Email cadastrado</label>
                                    <input
                                        {...register("email")}
                                        className={`w-full bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-lime-accent/50 transition-all`}
                                        placeholder="seu@email.com"
                                    />
                                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                                </div>

                                <Button className="w-full h-12 text-base" isLoading={isSubmitting}>
                                    Enviar Link de Recuperação
                                </Button>
                            </form>
                        </>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-12"
                        >
                            <div className="w-16 h-16 bg-lime-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 className="w-8 h-8 text-lime-accent" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Email Enviado!</h2>
                            <p className="text-white/60 mb-8">
                                Se o email estiver cadastrado, você receberá o link em instantes.
                            </p>
                            <Button variant="outline" className="w-full" onClick={() => navigate("/login")}>
                                Voltar para Login
                            </Button>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    )
}
