import { useState, useEffect } from "react"
import { Plus, Wallet, TrendingUp, DollarSign, AlertTriangle, Edit2, Trash2, PieChart } from "lucide-react"
import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { motion } from "framer-motion"
import { PORTFOLIO_DATA } from "../../data/portfolioData"
import AddTransactionModal from "./AddTransactionModal"
import AssetChart from "../asset/AssetChart"

export default function WalletDashboard({ initialTicker, onTickerChange }) {
    const [isModalOpen, setModalOpen] = useState(false)
    const [data, setData] = useState(PORTFOLIO_DATA)
    // Local state for selected ticker, initialized with prop or default
    const [selectedTicker, setSelectedTicker] = useState(initialTicker || "IBOV")

    // Effect to update local state if prop changes (controlled behavior)
    useEffect(() => {
        if (initialTicker) {
            setSelectedTicker(initialTicker)
        }
    }, [initialTicker])

    // Wrapper to update both local and parent state
    const handleTickerChange = (ticker) => {
        setSelectedTicker(ticker)
        if (onTickerChange) {
            onTickerChange(ticker)
        }
    }

    useEffect(() => {
        // Set default ticker if assets are available and selectedTicker is IBOV
        if (data.assets.length > 0 && selectedTicker === "IBOV" && !initialTicker) {
            const firstAsset = data.assets[0];
            handleTickerChange(firstAsset.ticker);
        }
    }, [data.assets]);

    const handleNewTransaction = (transaction) => {
        setData(prevData => {
            const newData = { ...prevData }

            // 1. Update Assets List
            const existingAssetIndex = newData.assets.findIndex(a => a.ticker === transaction.ticker)

            if (existingAssetIndex >= 0) {
                // Update existing asset (Weighted Average Price)
                const asset = newData.assets[existingAssetIndex]
                const totalCost = (asset.quantity * asset.avgPrice) + (transaction.quantity * transaction.price)
                const newQuantity = asset.quantity + transaction.quantity
                const newAvgPrice = totalCost / newQuantity

                newData.assets[existingAssetIndex] = {
                    ...asset,
                    quantity: newQuantity,
                    avgPrice: newAvgPrice,
                    currentPrice: transaction.price // Assume current price is last paid for now
                }
            } else {
                // Add new asset
                newData.assets.push({
                    id: transaction.id,
                    ticker: transaction.ticker,
                    name: transaction.ticker, // Placeholder Name
                    type: transaction.type,
                    quantity: transaction.quantity,
                    avgPrice: transaction.price,
                    currentPrice: transaction.price,
                    sector: "Outros",
                    risk: "medium"
                })
            }

            // 2. Update Allocation
            // Recalculate all totals based on updated assets
            const totalValue = newData.assets.reduce((sum, item) => sum + (item.quantity * item.currentPrice), 0)

            // Recalculate category totals
            const categories = ["Ação", "FII", "Renda Fixa", "Cripto"]
            newData.allocation = categories.map(cat => {
                const catValue = newData.assets
                    .filter(a => a.type === cat)
                    .reduce((sum, item) => sum + (item.quantity * item.currentPrice), 0)

                // Keep original colors
                const orgColor = prevData.allocation.find(a => a.name === cat)?.color || "#ffffff"

                return {
                    name: cat,
                    value: catValue,
                    color: orgColor
                }
            }).filter(a => a.value > 0)

            // 3. Update KPIs
            newData.kpis.totalValue = totalValue
            // Profitability is mocked, but we could update resultValue
            const totalInvested = newData.assets.reduce((sum, item) => sum + (item.quantity * item.avgPrice), 0)
            newData.kpis.resultValue = totalValue - totalInvested

            return newData
        })
    }

    // Calculate allocation percentage manually for the alert
    const cryptoAlloc = data.allocation.find(a => a.name === "Cripto")
    const totalValue = data.kpis.totalValue
    const cryptoPercent = cryptoAlloc ? ((cryptoAlloc.value / totalValue) * 100).toFixed(1) : 0
    const isCryptoHigh = cryptoPercent > 20

    return (
        <div className="space-y-8 animate-fade-in pb-32">

            {/* Header & Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-1 text-slate-900 dark:text-white transition-colors">Minha Carteira</h1>
                    <p className="text-slate-600 dark:text-white/60">Gestão inteligente do seu patrimônio.</p>
                </div>
                <button
                    onClick={() => setModalOpen(true)}
                    className="flex items-center gap-2 bg-lime-accent text-charcoal px-6 py-3 rounded-xl font-bold hover:brightness-110 hover:scale-105 transition-all shadow-[0_0_20px_rgba(174,234,0,0.3)]"
                >
                    <Plus size={20} />
                    Nova Transação
                </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <KpiCard
                    label="Patrimônio Total"
                    value={`R$ ${data.kpis.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                    icon={<Wallet className="text-emerald-400" />}
                    trend="+1.2% este mês"
                />
                <KpiCard
                    label="Rentabilidade Geral"
                    value={`${data.kpis.profitability}%`}
                    icon={<TrendingUp className="text-lime-accent" />}
                    isPositive={true}
                    subValue={`+ R$ ${data.kpis.resultValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                />
                <KpiCard
                    label="Proventos (Mês)"
                    value={`R$ ${data.kpis.monthlyDividends.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                    icon={<DollarSign className="text-yellow-400" />}
                    trend="Recebidos"
                />
            </div>

            {/* Charts & Health Section */}
            <div className="grid lg:grid-cols-3 gap-6">

                {/* Left Column: Asset Selection & Allocation */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Allocation Chart */}
                    <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center relative shadow-sm dark:shadow-none transition-colors">
                        <h3 className="w-full text-lg font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                            <PieChart size={18} className="text-slate-500 dark:text-white/50" />
                            Alocação
                        </h3>
                        <div className="h-64 w-full relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <RePieChart>
                                    <Pie
                                        data={data.allocation}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {data.allocation.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                </RePieChart>
                            </ResponsiveContainer>
                            {/* Center Text */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="text-xs text-slate-400 dark:text-white/30 font-bold uppercase tracking-widest">Ativos</span>
                            </div>
                        </div>
                        {/* Legend */}
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 w-full mt-4 text-xs text-slate-600 dark:text-white/70">
                            {data.allocation.map(item => (
                                <div key={item.name} className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span>{item.name}</span>
                                    <span className="ml-auto font-mono opacity-50">{((item.value / totalValue) * 100).toFixed(0)}%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* AI Alert Card (Moved to Left) */}
                    {isCryptoHigh && (
                        <div className="bg-yellow-100 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 rounded-2xl p-4 flex items-start gap-4">
                            <div className="p-3 bg-yellow-200 dark:bg-yellow-500/20 rounded-xl">
                                <AlertTriangle className="text-yellow-700 dark:text-yellow-500" size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-yellow-800 dark:text-yellow-500">Atenção: Exposição Elevada</h4>
                                <p className="text-sm text-yellow-700 dark:text-yellow-200/70 mt-1">
                                    Sua posição em <strong>Cripto ({cryptoPercent}%)</strong> ultrapassa o limite recomendado (20%) para seu perfil Moderado.
                                    Considere rebalancear vendendo parte dos lucros.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column: Real-time Chart & Assets Table */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Real-time Market Chart */}
                    <div>
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <TrendingUp size={20} className="text-lime-600 dark:text-lime-accent" />
                            Análise de Mercado: {selectedTicker}
                        </h3>
                        {/* ErrorBoundary could be implemented here */}
                        <AssetChart ticker={selectedTicker} />
                    </div>

                    {/* Assets Table (Interactive) */}
                    <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm dark:shadow-none transition-colors">
                        <div className="p-6 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Meus Ativos</h3>
                            <div className="text-xs text-slate-500 dark:text-white/40 uppercase tracking-widest">
                                Selecione para ver o gráfico
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="text-xs text-slate-500 dark:text-white/40 uppercase tracking-wider border-b border-slate-200 dark:border-white/5">
                                        <th className="p-4 font-medium pl-6">Ativo</th>
                                        <th className="p-4 font-medium">Preço Médio</th>
                                        <th className="p-4 font-medium">Preço Atual</th>
                                        <th className="p-4 font-medium">Posição</th>
                                        <th className="p-4 font-medium text-right pr-6">Resultado</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {data.assets.map((asset) => {
                                        const total = asset.quantity * asset.currentPrice
                                        const profit = (asset.currentPrice - asset.avgPrice) * asset.quantity
                                        const profitPercent = ((asset.currentPrice - asset.avgPrice) / asset.avgPrice) * 100
                                        const isProfit = profit >= 0
                                        const isSelected = selectedTicker === asset.ticker

                                        return (
                                            <tr
                                                key={asset.id}
                                                onClick={() => setSelectedTicker(asset.ticker)}
                                                className={`border-b border-slate-200 dark:border-white/5 transition-all cursor-pointer group
                                                    ${isSelected
                                                        ? 'bg-lime-50 dark:bg-lime-accent/10 border-l-4 border-l-lime-500'
                                                        : 'hover:bg-slate-50 dark:hover:bg-white/5 border-l-4 border-l-transparent'
                                                    }`}
                                            >
                                                <td className="p-4 pl-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs 
                                                            ${asset.type === 'Cripto' ? 'bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400' :
                                                                asset.type === 'Ação' ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' :
                                                                    'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400'}`}>
                                                            {asset.ticker.slice(0, 3)}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-slate-900 dark:text-white">{asset.ticker}</div>
                                                            <div className="text-xs text-slate-500 dark:text-white/40">{asset.name}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-slate-600 dark:text-white/60">R$ {asset.avgPrice.toFixed(2)}</td>
                                                <td className="p-4 text-slate-900 dark:text-white">R$ {asset.currentPrice.toFixed(2)}</td>
                                                <td className="p-4 font-bold text-slate-900 dark:text-white">R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                                                <td className="p-4 text-right pr-6">
                                                    <div className={`font-bold ${isProfit ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                                                        {isProfit ? '+' : ''}R$ {profit.toFixed(2)}
                                                    </div>
                                                    <div className={`text-xs ${isProfit ? 'text-emerald-600/60 dark:text-emerald-400/60' : 'text-red-600/60 dark:text-red-400/60'}`}>
                                                        {isProfit ? '▲' : '▼'} {profitPercent.toFixed(1)}%
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <AddTransactionModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleNewTransaction}
            />
        </div>
    )
}

function KpiCard({ label, value, icon, trend, isPositive, subValue }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-slate-300 dark:hover:border-white/10 transition-all shadow-sm dark:shadow-none"
        >
            <div className="flex justify-between items-start mb-4">
                <span className="text-slate-500 dark:text-white/60 text-sm font-medium">{label}</span>
                <div className="p-2 bg-slate-100 dark:bg-white/5 rounded-lg group-hover:bg-slate-200 dark:group-hover:bg-white/10 transition-colors">
                    {icon}
                </div>
            </div>
            <div className="text-2xl font-bold mb-1 text-slate-900 dark:text-white">{value}</div>
            {subValue && <div className={`text-sm font-bold ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>{subValue}</div>}
            {trend && <div className="text-xs text-slate-400 dark:text-white/40 mt-2">{trend}</div>}
        </motion.div>
    )
}

function CustomTooltip({ active, payload }) {
    if (active && payload && payload.length) {
        return (
            <div className="bg-charcoal border border-white/10 p-3 rounded-xl shadow-xl backdrop-blur-md">
                <p className="text-white font-bold text-sm">{payload[0].name}</p>
                <p className="text-lime-accent text-sm">
                    R$ {payload[0].value.toLocaleString()}
                </p>
            </div>
        )
    }
    return null
}
