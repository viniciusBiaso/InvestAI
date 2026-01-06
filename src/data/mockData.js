export const USERS = {
    user: {
        id: 1,
        name: "Investidor",
        email: "user@investai.com",
        profile: null // Will be defined during onboarding
    },
    admin: {
        id: 99,
        name: "Admin Master",
        email: "admin@investai.com",
        profile: "admin"
    }
}

export const ASSETS = [
    {
        id: 1,
        name: "Tesouro Selic 2029",
        type: "Renda Fixa",
        risk: "low",
        yield: "11.75% a.a",
        minInvestment: 100,
        description: "Título público mais seguro do mercado."
    },
    {
        id: 2,
        name: "CDB Banco Seguro",
        type: "Renda Fixa",
        risk: "low",
        yield: "110% CDI",
        minInvestment: 1000,
        description: "Garantido pelo FGC até R$ 250 mil."
    },
    {
        id: 3,
        name: "Fundo Multimercado Macro",
        type: "Fundo",
        risk: "medium",
        yield: "CDI + 2%",
        minInvestment: 500,
        description: "Gestão ativa buscando superar o CDI investindo em juros e moedas."
    },
    {
        id: 4,
        name: "IVVB11 (S&P 500)",
        type: "ETF",
        risk: "medium",
        yield: "Var. Cambial + Índice",
        minInvestment: 300,
        description: "Exposição às 500 maiores empresas dos EUA."
    },
    {
        id: 5,
        name: "Bitcoin (BTC)",
        type: "Cripto",
        risk: "crypto",
        yield: "Volátil",
        minInvestment: 50,
        description: "Moeda digital descentralizada. Alto risco e potencial de retorno."
    },
    {
        id: 6,
        name: "Ação Tech S.A. (TCH4)",
        type: "Ação",
        risk: "high",
        yield: "Volátil",
        minInvestment: 20,
        description: "Startup de tecnologia em fase de crescimento agressivo."
    }
]
