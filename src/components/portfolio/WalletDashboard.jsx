import { useState } from "react"
import { Plus, Wallet, TrendingUp, DollarSign, AlertTriangle, Edit2, Trash2, PieChart } from "lucide-react"
import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { motion } from "framer-motion"
import { PORTFOLIO_DATA } from "../../data/portfolioData"
import AddTransactionModal from "./AddTransactionModal"

export default function WalletDashboard() {
    const [isModalOpen, setModalOpen] = useState(false)
    const [data, setData] = useState(PORTFOLIO_DATA)

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
                    <h1 className="text-3xl font-bold mb-1">Minha Carteira</h1>
                    <p className="text-white/60">Gestão inteligente do seu patrimônio.</p>
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

                {/* Allocation Chart */}
                <div className="lg:col-span-1 bg-white/5 border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center relative">
                    <h3 className="w-full text-lg font-bold mb-4 flex items-center gap-2">
                        <PieChart size={18} className="text-white/50" />
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
                            <span className="text-xs text-white/30 font-bold uppercase tracking-widest">Ativos</span>
                        </div>
                    </div>
                    {/* Legend */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 w-full mt-4 text-xs text-white/70">
                        {data.allocation.map(item => (
                            <div key={item.name} className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                <span>{item.name}</span>
                                <span className="ml-auto font-mono opacity-50">{((item.value / totalValue) * 100).toFixed(0)}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Portfolio Health & Warnings */}
                <div className="lg:col-span-2 space-y-6">
                    {/* AI Alert Card */}
                    {isCryptoHigh && (
                        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4 flex items-start gap-4">
                            <div className="p-3 bg-yellow-500/20 rounded-xl">
                                <AlertTriangle className="text-yellow-500" size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-yellow-500">Atenção: Exposição Elevada</h4>
                                <p className="text-sm text-yellow-200/70 mt-1">
                                    Sua posição em <strong>Cripto ({cryptoPercent}%)</strong> ultrapassa o limite recomendado (20%) para seu perfil Moderado.
                                    Considere rebalancear vendendo parte dos lucros.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Assets Table */}
                    <div className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
                        <div className="p-6 border-b border-white/5 flex items-center justify-between">
                            <h3 className="font-bold text-lg">Meus Ativos</h3>
                            <div className="text-xs text-white/40 uppercase tracking-widest">
                                {data.assets.length} Posições
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="text-xs text-white/40 uppercase tracking-wider border-b border-white/5">
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

                                        return (
                                            <tr key={asset.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                                <td className="p-4 pl-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs 
                                                            ${asset.type === 'Cripto' ? 'bg-purple-500/20 text-purple-400' :
                                                                asset.type === 'Ação' ? 'bg-emerald-500/20 text-emerald-400' :
                                                                    'bg-blue-500/20 text-blue-400'}`}>
                                                            {asset.ticker.slice(0, 3)}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold">{asset.ticker}</div>
                                                            <div className="text-xs text-white/40">{asset.name}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-white/60">R$ {asset.avgPrice.toFixed(2)}</td>
                                                <td className="p-4">R$ {asset.currentPrice.toFixed(2)}</td>
                                                <td className="p-4 font-bold">R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                                                <td className="p-4 text-right pr-6">
                                                    <div className={`font-bold ${isProfit ? 'text-emerald-400' : 'text-red-400'}`}>
                                                        {isProfit ? '+' : ''}R$ {profit.toFixed(2)}
                                                    </div>
                                                    <div className={`text-xs ${isProfit ? 'text-emerald-400/60' : 'text-red-400/60'}`}>
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
            className="bg-white/5 border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-white/10 transition-all"
        >
            <div className="flex justify-between items-start mb-4">
                <span className="text-white/60 text-sm font-medium">{label}</span>
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                    {icon}
                </div>
            </div>
            <div className="text-2xl font-bold mb-1">{value}</div>
            {subValue && <div className={`text-sm font-bold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>{subValue}</div>}
            {trend && <div className="text-xs text-white/40 mt-2">{trend}</div>}
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
