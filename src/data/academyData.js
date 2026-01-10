// Level System Constants - Scaled Up for 1500XP = 50% of Level 1
export const LEVEL_THRESHOLDS = [
    { level: 1, minXp: 0, title: "Estudante Novato" },
    { level: 2, minXp: 3000, title: "Investidor Iniciante" },
    { level: 3, minXp: 6000, title: "Aprendiz Focado" },
    { level: 4, minXp: 10000, title: "Analista em Formação" },
    { level: 5, minXp: 15000, title: "Estrategista Pleno" },
    { level: 6, minXp: 22000, title: "Mestre dos Dividendos" },
    { level: 7, minXp: 35000, title: "Guru do Mercado" },
    { level: 8, minXp: 50000, title: "Tubarão (Shark)" },
]

export const TOPICS = [
    {
        title: "Essenciais para Iniciantes",
        color: "from-emerald-500",
        courses: [
            {
                id: "1", // Changed from 1 (number) to "1" (string) to match courseContent
                title: "O Fim da Poupança",
                duration: "12 min",
                xp: 1500, // High XP for the main intro course
                lessonsCount: 5,
                progress: 0, // Placeholder, calculated effectively in UI
                isLocked: false,
                thumbnail: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop&q=60",
                description: "Por que você está perdendo dinheiro na poupança e os primeiros passos para sair dela."
            },
            {
                id: "2",
                title: "Renda Fixa Turbinada",
                duration: "8 min",
                xp: 800,
                lessonsCount: 3,
                progress: 0,
                isLocked: false,
                thumbnail: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=60",
                description: "Entenda CDB, LCI e LCA e como escolher o melhor título para seus objetivos."
            },
            {
                id: "3",
                title: "Reserva de Emergência",
                duration: "15 min",
                xp: 500,
                lessonsCount: 4,
                progress: 0,
                isLocked: false,
                thumbnail: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?w=800&auto=format&fit=crop&q=60",
                description: "O alicerce de qualquer carteira vencedora. Quanto guardar e onde."
            }
        ]
    },
    {
        title: "Estratégias de Ações",
        color: "from-blue-500",
        courses: [
            {
                id: "4",
                title: "Dividend King: Viver de Renda",
                duration: "22 min",
                xp: 1200,
                lessonsCount: 6,
                progress: 0,
                isLocked: true,
                thumbnail: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?w=800&auto=format&fit=crop&q=60",
                description: "Como montar uma carteira previdenciária focada em dividendos mensais."
            },
            {
                id: "5",
                title: "Análise Fundamentalista na Prática",
                duration: "30 min",
                xp: 2000,
                lessonsCount: 8,
                progress: 0,
                isLocked: true,
                thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop&q=60",
                description: "Aprenda a ler balanços e identificar empresas descontadas."
            }
        ]
    },
    {
        title: "Criptoeconomia & Futuro",
        color: "from-purple-500",
        courses: [
            {
                id: "6",
                title: "Bitcoin: O Ouro Digital",
                duration: "18 min",
                xp: 1000,
                lessonsCount: 4,
                progress: 0,
                isLocked: false,
                thumbnail: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&auto=format&fit=crop&q=60",
                description: "A tese de investimento por trás da maior criptomoeda do mundo."
            },
            {
                id: "7",
                title: "DeFi: Finanças Descentralizadas",
                duration: "25 min",
                xp: 1500,
                lessonsCount: 5,
                progress: 0,
                isLocked: true,
                thumbnail: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=800&auto=format&fit=crop&q=60",
                description: "Empréstimos e rendimentos sem bancos. O futuro do dinheiro."
            }
        ]
    }
]

// Deprecated static stats, we will calculate mostly dynamic
export const USER_STATS = {
    streak: 5, // We keep streak static for now as requested
}
