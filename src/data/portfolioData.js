export const PORTFOLIO_DATA = {
    kpis: {
        totalValue: 154320.50,
        profitability: 12.5, // percent
        resultValue: 17146.72, // absolute profit
        monthlyDividends: 845.20,
        allocationCorrection: "Cripto" // logic helper
    },
    allocation: [
        { name: "Ações BR", value: 45000, color: "#10b981" }, // Emerald 500
        { name: "FIIs", value: 38000, color: "#aeea00" },     // Lime Accent
        { name: "Renda Fixa", value: 52000, color: "#3b82f6" }, // Blue 500
        { name: "Cripto", value: 19320, color: "#8b5cf6" }     // Violet 500
    ],
    assets: [
        { id: 1, ticker: "WEGE3", type: "Ação", name: "Weg S.A.", quantity: 400, info: "Bens Industriais", avgPrice: 32.50, currentPrice: 38.90 },
        { id: 2, ticker: "VALE3", type: "Ação", name: "Vale S.A.", quantity: 150, info: "Mineração", avgPrice: 68.20, currentPrice: 62.10 },
        { id: 3, ticker: "HGLG11", type: "FII", name: "CSHG Logística", quantity: 80, info: "Logístico", avgPrice: 162.00, currentPrice: 165.50 },
        { id: 4, ticker: "KNIP11", type: "FII", name: "Kinea Índice Preços", quantity: 120, info: "Papel", avgPrice: 94.50, currentPrice: 96.80 },
        { id: 5, ticker: "TESOURO IPCA+ 2035", type: "Renda Fixa", name: "Tesouro Direto", quantity: 12, info: "IPCA + 6.2%", avgPrice: 2100.00, currentPrice: 2250.00 },
        { id: 6, ticker: "BTC", type: "Cripto", name: "Bitcoin", quantity: 0.05, info: "Blockchain", avgPrice: 280000.00, currentPrice: 345000.00 },
        { id: 7, ticker: "ETH", type: "Cripto", name: "Ethereum", quantity: 1.2, info: "Smart Contracts", avgPrice: 12000.00, currentPrice: 14500.00 }
    ]
};
