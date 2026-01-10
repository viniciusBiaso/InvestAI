import { useState } from "react"
import { LogOut, PieChart, TrendingUp, Shield, Activity, Menu, Bell, Search, GraduationCap, Sparkles, Settings as SettingsIcon } from "lucide-react"
import { ASSETS } from "../data/mockData"
import { motion, AnimatePresence } from "framer-motion"
import ChatAdvisor from "./ChatAdvisor"
import MorningBrief from "./MorningBrief"
import WalletDashboard from "./portfolio/WalletDashboard"
import Academy from "../pages/Academy"
import Settings from "../pages/Settings"
import ThemeToggle from "./ui/ThemeToggle"
import OmniSearch from "./ui/OmniSearch"

export default function Dashboard({ user, onLogout }) {
    const [showChat, setShowChat] = useState(false)
    const [currentView, setCurrentView] = useState("overview") // 'overview' | 'wallet' | 'academy' | 'settings'
    const [walletTicker, setWalletTicker] = useState("IBOV")

    const handleAssetSelect = (ticker) => {
        setWalletTicker(ticker)
        setCurrentView("wallet")
    }

    const isAdmin = user.profile === "admin"
    const isConservative = user.profile === "conservative"

    const visibleAssets = isAdmin
        ? ASSETS
        : isConservative
            ? ASSETS.filter(a => a.risk === "low" || a.risk === "medium")
            : ASSETS

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-charcoal text-slate-900 dark:text-white flex overflow-hidden font-sans transition-colors duration-300">
            {/* Sidebar (Desktop) */}
            <aside className="hidden lg:flex w-72 flex-col border-r border-slate-200 dark:border-white/5 bg-white dark:bg-black/20 backdrop-blur-md">
                <div className="p-6 border-b border-slate-200 dark:border-white/5">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 bg-black dark:bg-lime-accent rounded-lg flex items-center justify-center text-white dark:text-charcoal font-bold shadow-sm">I</div>
                        <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">InvestAI</span>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-white/40 uppercase tracking-widest pl-10">Dashboard</span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <NavItem
                        icon={<PieChart size={20} />}
                        label="Visão Geral"
                        active={currentView === "overview"}
                        onClick={() => setCurrentView("overview")}
                    />
                    <NavItem
                        icon={<Activity size={20} />}
                        label="Minha Carteira"
                        active={currentView === "wallet"}
                        onClick={() => setCurrentView("wallet")}
                    />
                    <NavItem
                        icon={<GraduationCap size={20} />}
                        label="Academy"
                        active={currentView === "academy"}
                        onClick={() => setCurrentView("academy")}
                    />
                    <NavItem icon={<TrendingUp size={20} />} label="Oportunidades" />
                </nav>

                <div className="p-4 border-t border-slate-200 dark:border-white/5">
                    <div className="mb-4">
                        <ThemeToggle />
                    </div>
                    <button
                        onClick={() => setCurrentView("settings")}
                        className={`w-full flex items-center gap-3 p-3 text-sm rounded-lg mb-2 transition-colors ${currentView === 'settings' ? 'bg-lime-accent text-charcoal font-bold shadow-sm' : 'text-slate-500 dark:text-white/60 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'}`}
                    >
                        <SettingsIcon size={18} /> Configurações
                    </button>

                    <div className="bg-slate-100 dark:bg-white/5 rounded-xl p-4 mb-4 border border-slate-200 dark:border-transparent">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lime-accent to-emerald-600 flex items-center justify-center text-charcoal font-bold text-lg shadow-sm">
                                {user.name.charAt(0)}
                            </div>
                            <div>
                                <p className="font-medium text-sm text-slate-900 dark:text-white">{user.name}</p>
                                <p className="text-xs text-slate-500 dark:text-white/50 capitalize">{user.profile || "Perfil Padrão"}</p>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-2 p-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                        <LogOut size={16} /> Sair da Conta
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-slate-50 dark:bg-charcoal relative overflow-y-auto customized-scrollbar transition-colors duration-300">
                {/* Mobile Header */}
                <header className="sticky top-0 z-30 bg-white/80 dark:bg-charcoal/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 px-6 py-4 flex items-center justify-between transition-colors duration-300">
                    <div className="lg:hidden flex items-center gap-3">
                        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 border border-white/10 rounded-lg">
                            <Menu size={20} />
                        </button>
                        <span className="font-bold text-lg">InvestAI</span>
                    </div>

                    <div className="hidden lg:block w-96">
                        <OmniSearch onSelect={handleAssetSelect} />
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 hover:bg-white/5 rounded-full transition-colors">
                            <Bell size={20} className="text-white/70" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                    </div>
                </header>

                <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-10 pb-32">
                    {currentView === "overview" ? (
                        <>
                            {/* Context Awareness Header (Replaced by MorningBrief) */}
                            <MorningBrief user={user} />

                            {/* Smart Grid */}
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {visibleAssets.map((asset, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="bg-white/5 border border-white/5 hover:border-lime-accent/30 rounded-2xl p-6 group transition-all hover:-translate-y-1"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${asset.risk === "high" ? "bg-red-500/20 text-red-500" :
                                                asset.risk === "medium" ? "bg-yellow-500/20 text-yellow-500" :
                                                    "bg-emerald-500/20 text-emerald-500"
                                                }`}>
                                                Risco {asset.risk === "high" ? "Alto" : asset.risk === "medium" ? "Médio" : "Baixo"}
                                            </span>
                                            {asset.type === "crypto" && <span className="text-xs text-white/40">Cripto</span>}
                                        </div>
                                        <h3 className="text-xl font-bold mb-1">{asset.name}</h3>
                                        <div className="flex items-end gap-2 mb-4">
                                            <span className="text-3xl font-light">{asset.value}</span>
                                            <span className="text-sm text-emerald-400 mb-1 flex items-center">
                                                <TrendingUp size={12} className="mr-1" /> +2.4%
                                            </span>
                                        </div>
                                        <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                                            <div className="bg-lime-accent h-full w-[70%]" />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {isAdmin && (
                                <div className="bg-purple-900/20 border border-purple-500/30 rounded-2xl p-8 text-center">
                                    <h2 className="text-2xl font-bold text-purple-200 mb-2">Painel Admin Master</h2>
                                    <p className="text-purple-200/60 mb-6">Acesso irrestrito a todas as classes de ativos e logs do sistema.</p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="bg-purple-900/40 p-4 rounded-xl"><div className="text-2xl font-bold">1.2k</div><div className="text-xs opacity-60">Novos Users</div></div>
                                        <div className="bg-purple-900/40 p-4 rounded-xl"><div className="text-2xl font-bold">R$ 4M</div><div className="text-xs opacity-60">Volume (24h)</div></div>
                                        <div className="bg-purple-900/40 p-4 rounded-xl"><div className="text-2xl font-bold">99.9%</div><div className="text-xs opacity-60">Uptime</div></div>
                                        <div className="bg-purple-900/40 p-4 rounded-xl"><div className="text-2xl font-bold">12</div><div className="text-xs opacity-60">Alertas</div></div>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : currentView === "wallet" ? (
                        <WalletDashboard initialTicker={walletTicker} onTickerChange={setWalletTicker} />
                    ) : currentView === "academy" ? (
                        <Academy />
                    ) : (
                        <Settings user={user} />
                    )}
                </div>
            </main>

            {/* CHAT FAB & DRAWER */}
            <AnimatePresence>
                {showChat && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed inset-y-0 right-0 z-50 w-full md:w-[450px] shadow-2xl"
                    >
                        <div className="h-full w-full">
                            <ChatAdvisor onClose={() => setShowChat(false)} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {!showChat && (
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowChat(true)}
                    className="fixed bottom-6 right-6 w-14 h-14 bg-lime-accent text-charcoal rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(174,234,0,0.4)] z-40 hover:brightness-110 transition-all"
                >
                    <Sparkles size={24} />
                </motion.button>
            )}

        </div>
    )
}

function NavItem({ icon, label, active, onClick }) {
    return (
        <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? 'bg-lime-accent text-charcoal font-bold shadow-sm' : 'text-slate-500 dark:text-white/60 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'}`}>
            {icon}
            <span className="text-sm">{label}</span>
        </button>
    )
}
