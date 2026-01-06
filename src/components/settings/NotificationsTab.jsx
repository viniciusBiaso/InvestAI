import { useState } from "react"
import { Bell, Mail, Zap } from "lucide-react"

export default function NotificationsTab() {
    return (
        <div className="max-w-2xl space-y-8 animate-fade-in">
            <h2 className="text-2xl font-bold">Preferências de Notificação</h2>
            <p className="text-white/60">Escolha como você quer ser avisado sobre o mercado e sua conta.</p>

            <div className="space-y-6">
                <NotificationItem
                    title="Resumo Matinal"
                    desc="Receba um e-mail diário com os destaques do mercado antes da abertura."
                    icon={<Mail size={20} />}
                    defaultChecked={true}
                />
                <NotificationItem
                    title="Alertas de Volatilidade"
                    desc="Push notification quando seus ativos oscilarem mais de 5%."
                    icon={<Zap size={20} />}
                    defaultChecked={true}
                />
                <NotificationItem
                    title="Novidades da Plataforma"
                    desc="Fique por dentro de novas features e atualizações do InvestAI."
                    icon={<Bell size={20} />}
                    defaultChecked={false}
                />
            </div>
        </div>
    )
}

function NotificationItem({ title, desc, icon, defaultChecked }) {
    const [enabled, setEnabled] = useState(defaultChecked)

    return (
        <div className="flex items-start justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors">
            <div className="flex gap-4">
                <div className="mt-1 text-white/50">{icon}</div>
                <div>
                    <h3 className="font-bold">{title}</h3>
                    <p className="text-sm text-white/50 mt-1 max-w-sm">{desc}</p>
                </div>
            </div>

            <button
                onClick={() => setEnabled(!enabled)}
                className={`w-12 h-7 rounded-full p-1 transition-colors duration-300 flex-none ml-4 ${enabled ? 'bg-lime-accent' : 'bg-white/10'}`}
            >
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
        </div>
    )
}
