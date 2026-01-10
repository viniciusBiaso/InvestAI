import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import useMarketData from '../../hooks/useMarketData';
import { ArrowUpRight, ArrowDownRight, Loader } from 'lucide-react';
import clsx from 'clsx';

const AssetChart = ({ ticker = 'IVVB11' }) => {
    const [period, setPeriod] = useState('1mo');
    const { quote, history, loading, error } = useMarketData(ticker, period);

    const periods = [
        { label: '1S', value: '5d' },
        { label: '1M', value: '1mo' },
        { label: '6M', value: '6mo' },
        { label: '1A', value: '1y' },
        { label: 'MAX', value: 'max' },
    ];

    if (error) {
        return (
            <div className="bg-white dark:bg-charcoal rounded-2xl p-6 border border-slate-200 dark:border-white/5 h-[400px] flex items-center justify-center">
                <div className="text-center">
                    <p className="text-slate-500 dark:text-white/50 mb-2">Dados indisponíveis para {ticker}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="text-sm text-lime-600 dark:text-lime-accent hover:underline"
                    >
                        Tentar novamente
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-charcoal rounded-2xl p-6 border border-slate-200 dark:border-white/5 h-[400px] flex flex-col transition-colors">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h3 className="text-sm font-medium text-slate-500 dark:text-white/60 mb-1">{ticker}</h3>
                    {loading && !quote ? (
                        <div className="h-8 w-32 bg-slate-100 dark:bg-white/5 animate-pulse rounded"></div>
                    ) : (
                        <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-bold text-slate-900 dark:text-white">
                                {quote?.price ?
                                    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(quote.price)
                                    : '---'}
                            </span>
                            {quote && (
                                <div className={clsx(
                                    "flex items-center gap-1 text-sm font-bold px-2 py-1 rounded-full",
                                    quote.change_percent >= 0
                                        ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                                        : "bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400"
                                )}>
                                    {quote.change_percent >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                    {Math.abs(quote.change_percent).toFixed(2)}%
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Period Selector */}
                <div className="flex bg-slate-100 dark:bg-white/5 rounded-lg p-1">
                    {periods.map((p) => (
                        <button
                            key={p.value}
                            onClick={() => setPeriod(p.value)}
                            className={clsx(
                                "px-3 py-1 text-xs font-medium rounded-md transition-all",
                                period === p.value
                                    ? "bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm"
                                    : "text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white"
                            )}
                        >
                            {p.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chart Area */}
            <div className="flex-1 w-full min-h-0 relative">
                {loading && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 dark:bg-charcoal/50 backdrop-blur-[1px]">
                        <Loader className="w-8 h-8 text-lime-600 dark:text-lime-accent animate-spin" />
                    </div>
                )}

                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={history}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#BEF264" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#BEF264" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-grid)" opacity={0.1} />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                            minTickGap={30}
                        />
                        <YAxis
                            orientation="right"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                            tickFormatter={(value) => `R$ ${value}`}
                            domain={['auto', 'auto']}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1e1e1e',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}
                            itemStyle={{ color: '#fff' }}
                            labelStyle={{ color: '#94a3b8', marginBottom: '0.5rem' }}
                            formatter={(value) => [`R$ ${value}`, 'Preço']}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#BEF264"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorValue)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AssetChart;
