import { ShieldCheck, Smartphone, Check } from "lucide-react"
import { useState } from "react"

export default function SecurityTab() {
    const [tfaEnabled, setTfaEnabled] = useState(false)

    return (
        <div className="max-w-2xl space-y-8 animate-fade-in">
            <h2 className="text-2xl font-bold">Segurança e Login</h2>

            {/* 2FA Section */}
            <div className="bg-white/5 border border-white/5 rounded-2xl p-6 flex items-center justify-between">
                <div className="flex gap-4">
                    <div className="p-3 bg-emerald-500/10 rounded-xl h-fit">
                        <Smartphone className="text-emerald-500" size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Autenticação de Dois Fatores (2FA)</h3>
                        <p className="text-white/60 text-sm max-w-sm mt-1">
                            Adicione uma camada extra de proteção à sua conta. Exigiremos um código ao fazer login.
                        </p>
                    </div>
                </div>

                {/* Toggle Switch */}
                <button
                    onClick={() => setTfaEnabled(!tfaEnabled)}
                    className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ${tfaEnabled ? 'bg-emerald-500' : 'bg-white/10'}`}
                >
                    <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${tfaEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
            </div>

            {/* Password Form */}
            <div className="space-y-6 pt-4 border-t border-white/5">
                <h3 className="text-lg font-bold flex items-center gap-2">
                    <ShieldCheck size={20} className="text-white/50" />
                    Alterar Senha
                </h3>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-white/60 uppercase tracking-widest">Senha Atual</label>
                        <input
                            type="password"
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-lime-accent/50 transition-colors"
                        />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-white/60 uppercase tracking-widest">Nova Senha</label>
                            <input
                                type="password"
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-lime-accent/50 transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-white/60 uppercase tracking-widest">Confirmar Senha</label>
                            <input
                                type="password"
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-lime-accent/50 transition-colors"
                            />
                        </div>
                    </div>
                </div>

                <button className="bg-white/5 border border-white/10 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/10 transition-all">
                    Atualizar Senha
                </button>
            </div>
        </div>
    )
}
