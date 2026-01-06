import { useAuth } from "../context/AuthContext"
import { Button } from "../components/ui/Button"
import { Mail, RefreshCw, CheckCircle2 } from "lucide-react"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function VerifyEmail() {
    const { user, setUser } = useAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const handleVerifySimulation = async () => {
        setLoading(true)
        try {
            // Call backend to force verify
            await axios.post(`http://localhost:8000/verify-email?email=${user.email}`)

            // Update local user state
            setUser({ ...user, is_verified: true })

            // Redirect to dashboard logic will be handled by AppShell or manual nav
            navigate("/app")
        } catch (error) {
            console.error("Verification failed", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-charcoal flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-2xl p-8 text-center space-y-6">
                <div className="w-20 h-20 bg-lime-accent/10 rounded-full flex items-center justify-center mx-auto animate-pulse">
                    <Mail className="w-10 h-10 text-lime-accent" />
                </div>

                <div>
                    <h1 className="text-2xl font-bold text-white mb-2">Verifique seu Email</h1>
                    <p className="text-white/60">
                        Enviamos um link de confirmação para <span className="text-white font-medium">{user?.email}</span>.
                    </p>
                </div>

                <div className="bg-black/20 rounded-lg p-4 text-sm text-left border-l-4 border-lime-accent">
                    <p className="text-white/80">
                        <strong>Nota (Simulação):</strong> Como este é um protótipo, o email foi "enviado" apenas para o log do terminal do backend.
                    </p>
                </div>

                <Button onClick={handleVerifySimulation} isLoading={loading} className="w-full">
                    Simular Clique no Link
                </Button>

                <button onClick={() => window.location.reload()} className="text-white/40 text-xs hover:text-white flex items-center justify-center w-full gap-2">
                    <RefreshCw size={12} /> Já verifiquei, recarregar página
                </button>
            </div>
        </div>
    )
}
