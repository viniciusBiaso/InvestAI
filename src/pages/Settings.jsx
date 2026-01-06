import { useState } from "react"
import { User, Shield, CreditCard, Bell } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import ProfileTab from "../components/settings/ProfileTab"
import SecurityTab from "../components/settings/SecurityTab"
import BillingTab from "../components/settings/BillingTab"
import NotificationsTab from "../components/settings/NotificationsTab"

export default function Settings({ user }) {
    const [activeTab, setActiveTab] = useState("profile")

    const TABS = [
        { id: "profile", label: "Meu Perfil", icon: User },
        { id: "security", label: "Segurança", icon: Shield },
        { id: "billing", label: "Assinatura", icon: CreditCard },
        { id: "notifications", label: "Notificações", icon: Bell },
    ]

    return (
        <div className="pb-32 animate-fade-in">
            <h1 className="text-3xl font-bold mb-8">Configurações</h1>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                {/* Vertical Tabs (Sidebar) */}
                <aside className="w-full lg:w-64 flex-none space-y-1">
                    {TABS.map((tab) => {
                        const Icon = tab.icon
                        const isActive = activeTab === tab.id

                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    w-full flex items-center gap-3 px-4 py-3 rounded-r-xl border-l-[3px] transition-all text-sm font-medium
                                    ${isActive
                                        ? 'bg-white/5 border-lime-accent text-white'
                                        : 'border-transparent text-white/50 hover:text-white hover:bg-white/5'}
                                `}
                            >
                                <Icon size={18} className={isActive ? "text-lime-accent" : ""} />
                                {tab.label}
                            </button>
                        )
                    })}
                </aside>

                {/* Content Area */}
                <div className="flex-1 bg-charcoal min-h-[500px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {activeTab === "profile" && <ProfileTab user={user} />}
                            {activeTab === "security" && <SecurityTab />}
                            {activeTab === "billing" && <BillingTab user={user} />}
                            {activeTab === "notifications" && <NotificationsTab />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
