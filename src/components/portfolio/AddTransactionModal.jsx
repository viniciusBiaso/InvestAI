import { X, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

export default function AddTransactionModal({ isOpen, onClose, onSave }) {
    if (!isOpen) return null

    const [formData, setFormData] = useState({
        ticker: "",
        type: "Ação",
        date: new Date().toISOString().split('T')[0],
        quantity: "",
        price: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        // Handle price input specifically to allow commas
        if (name === "price") {
            // Only allow numbers and one comma/dot
            const formatted = value.replace(/[^0-9,.]/g, '')
            setFormData(prev => ({ ...prev, [name]: formatted }))
            return
        }
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Basic Validation
        if (!formData.ticker || !formData.quantity || !formData.price) return

        // Format data for parent
        const cleanPrice = parseFloat(formData.price.replace(',', '.'))
        const cleanQty = parseInt(formData.quantity)

        if (isNaN(cleanPrice) || isNaN(cleanQty)) return

        const transactionData = {
            id: Date.now(), // Mock ID
            ticker: formData.ticker.toUpperCase(),
            type: formData.type,
            date: formData.date,
            quantity: cleanQty,
            price: cleanPrice,
            total: cleanQty * cleanPrice
        }

        onSave(transactionData)
        onClose()

        // Reset form
        setFormData({
            ticker: "",
            type: "Ação",
            date: new Date().toISOString().split('T')[0],
            quantity: "",
            price: ""
        })
    }

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />

                {/* Modal Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                >
                    <div className="p-6 border-b border-white/5 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-white">Nova Transação</h3>
                        <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-white/50 hover:text-white transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-white/60 mb-1 uppercase tracking-wide">Ativo (Ticker)</label>
                            <input
                                name="ticker"
                                value={formData.ticker}
                                onChange={handleChange}
                                type="text"
                                placeholder="Ex: PETR4"
                                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-lime-accent/50 transition-colors uppercase placeholder:normal-case shadow-inner"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-white/60 mb-1 uppercase tracking-wide">Tipo</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-lime-accent/50 transition-colors appearance-none"
                                >
                                    <option value="Ação">Ação</option>
                                    <option value="FII">FII</option>
                                    <option value="Renda Fixa">Renda Fixa</option>
                                    <option value="Cripto">Cripto</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-white/60 mb-1 uppercase tracking-wide">Data</label>
                                <input
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    type="date"
                                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-lime-accent/50 transition-colors"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-white/60 mb-1 uppercase tracking-wide">Quantidade</label>
                                <input
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    type="number"
                                    placeholder="0"
                                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-lime-accent/50 transition-colors shadow-inner"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-white/60 mb-1 uppercase tracking-wide">Preço Unitário</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-sm">R$</span>
                                    <input
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        type="text"
                                        inputMode="decimal"
                                        placeholder="0,00"
                                        className="w-full bg-black/30 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-lime-accent/50 transition-colors shadow-inner"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full bg-lime-accent text-charcoal font-bold py-4 rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(174,234,0,0.2)]"
                            >
                                <Check size={18} />
                                Salvar Transação
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}
