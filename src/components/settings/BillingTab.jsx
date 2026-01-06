import { CreditCard, Check, Zap } from "lucide-react"

export default function BillingTab({ user }) {
    const isPlus = user.profile !== "free" // Assuming mockup specific logic
    // Actually the user mock says 'conservative', 'admin', etc. Let's assume 'admin' gets Plus features.

    return (
        <div className="max-w-3xl space-y-8 animate-fade-in">
            <h2 className="text-2xl font-bold">Assinatura e Planos</h2>

            {/* Current Plan Card */}
            <div className={`
                relative rounded-2xl p-8 border overflow-hidden
                ${isPlus
                    ? 'bg-gradient-to-br from-emerald-900/40 to-black border-lime-accent/30'
                    : 'bg-white/5 border-white/5'}
            `}>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-white/50">Plano Atual</span>
                            {isPlus && <span className="bg-lime-accent text-charcoal text-[10px] font-bold px-2 py-0.5 rounded">ATIVO</span>}
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2">
                            {isPlus ? "Investidor Plus+" : "Plano Básico"}
                        </h3>
                        <p className="text-white/60">
                            {isPlus
                                ? "Próxima renovação em 05 FEV 2026."
                                : "Atualize para desbloquear análises avançadas."}
                        </p>
                    </div>

                    {isPlus ? (
                        <button className="bg-white/10 border border-white/10 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/20 transition-colors">
                            Gerenciar Assinatura
                        </button>
                    ) : (
                        <button className="bg-gradient-to-r from-lime-400 to-emerald-500 text-charcoal px-8 py-3 rounded-xl font-bold hover:brightness-110 transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center gap-2">
                            <Zap size={20} fill="currentColor" />
                            Quero Ser Plus
                        </button>
                    )}
                </div>

                {/* Background Decor */}
                {isPlus && (
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                )}
            </div>

            {/* Payment Method */}
            <div className="space-y-4 pt-4">
                <h3 className="text-lg font-bold">Forma de Pagamento</h3>
                <div className="flex items-center justify-between bg-white/5 border border-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-4">
                        <div className="bg-white/10 p-2 rounded-lg">
                            <CreditCard size={24} className="text-white/70" />
                        </div>
                        <div>
                            <p className="font-bold">Mastercard final 8829</p>
                            <p className="text-xs text-white/40">Expira em 12/28</p>
                        </div>
                    </div>
                    <button className="text-sm font-bold text-lime-accent hover:underline">Editar</button>
                </div>
            </div>

            {/* Invoice History (Simplified) */}
            <div className="space-y-4 pt-4">
                <h3 className="text-lg font-bold">Histórico de Cobrança</h3>
                <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                            <div className="flex items-center gap-3">
                                <div className="bg-emerald-500/20 p-1 rounded-full"><Check size={12} className="text-emerald-500" /></div>
                                <span className="text-sm font-medium">Jan 05, 2026</span>
                            </div>
                            <span className="text-sm text-white/60">R$ 49,90</span>
                            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">PAGO</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
