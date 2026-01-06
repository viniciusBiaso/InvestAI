export const TOPICS = [
    {
        title: "Essenciais para Iniciantes",
        color: "from-emerald-500",
        courses: [
            {
                id: 1,
                title: "O Fim da Poupança",
                duration: "12 min",
                progress: 100,
                isLocked: false,
                thumbnail: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop&q=60",
                description: "Por que você está perdendo dinheiro na poupança e os primeiros passos para sair dela.",
                modules: [
                    {
                        id: 1,
                        title: "Módulo 1: O 'Assassino Silencioso' do seu Dinheiro",
                        duration: "2 min",
                        content: `⏱️ Tempo de leitura: 2 minutos

Você provavelmente ama a poupança por um motivo: a sensação de segurança. Você vê o número lá, ele nunca diminui nominalmente, e você dorme tranquilo.

Mas aqui está a verdade brutal: Seu dinheiro está encolhendo.

Imagine o seguinte cenário real: Em janeiro de 2021, você colocou R$ 10.000 na poupança. Em janeiro de 2022, você foi sacar. O banco lhe mostrou que você tinha aproximadamente R$ 10.290 (rendimento da poupança naquele ano foi pífio, cerca de 2,9%).

Você "ganhou" R$ 290, certo? Errado.

Em 2021, a inflação (IPCA) no Brasil foi de 10,06%. Aquilo que custava R$ 10.000 em janeiro de 2021, passou a custar R$ 11.006 em janeiro de 2022.

O Resultado Real: Para manter o seu poder de compra, você precisaria ter R$ 11.006. Você só tem R$ 10.290.

Conclusão: Você perdeu o equivalente a um carrinho de supermercado cheio, mesmo com o dinheiro "guardado" no banco.

Esse fenômeno se chama Rentabilidade Real Negativa. É quando o seu dinheiro cresce mais devagar do que os preços das coisas. A poupança é especialista em fazer isso.`
                    },
                    {
                        id: 2,
                        title: "Módulo 2: A Matemática da Derrota (Regra Nova vs. Velha)",
                        duration: "2 min",
                        content: `⏱️ Tempo de leitura: 2 minutos

Por que a poupança rende tão pouco? Porque a regra do jogo mudou em 2012 e muitos brasileiros não perceberam.

Funciona assim:

Se a Taxa Selic (juros do país) for maior que 8,5% ao ano: A poupança rende 0,5% ao mês + TR (que é quase zero). Isso dá cerca de 6,17% ao ano.

Se a Selic for menor ou igual a 8,5%: A poupança rende apenas 70% da Selic.

O Comparativo Real: Hoje, existem investimentos tão seguros quanto a poupança (explicaremos no Módulo 4) que pagam 100% da Taxa Selic ou do CDI.

Vamos fazer uma conta de padaria com um cenário hipotético de juros altos (11% ao ano):

Investimento Seguro (CDB/Tesouro): Rende ~11% ao ano.

Poupança: Rende ~6,17% ao ano.

Você está abrindo mão de quase o dobro do rendimento pelo mesmo nível de segurança. Em 10 anos, essa diferença não paga apenas um jantar; paga um carro popular.

Ponto Chave: A poupança tem um "teto" de ganhos. Quando a economia vai bem e os juros sobem, a poupança trava. Os outros investimentos acompanham a alta.`
                    },
                    {
                        id: 3,
                        title: "Módulo 3: O Mito da Liquidez (O Medo de Ficar Preso)",
                        duration: "2 min",
                        content: `⏱️ Tempo de leitura: 2 minutos

"Mas na poupança eu saco o dinheiro no domingo à noite se precisar!"

Verdade. Mas você sabia que a poupança tem uma "pegadinha" chamada Aniversário?

Cenário Real: Você deposita R$ 5.000 no dia 05 de um mês. Se você sacar esse dinheiro no dia 04 do mês seguinte (29 dias depois), sabe quanto você ganha de juros? Zero. Nada. Nem um centavo.

A poupança só rentabiliza se você completar o ciclo de 30 dias. Se sacar um dia antes, perde o lucro do mês inteiro.

A Alternativa Moderna: Investimentos como o Tesouro Selic ou CDBs de Liquidez Diária rendem todos os dias úteis. Se você deixar o dinheiro lá por 10 dias e sacar, você ganha os juros proporcionais daqueles 10 dias.

Poupança: Rigidez mensal.

Novos Investimentos: Flexibilidade diária.

A tal "facilidade" da poupança custa caro: ela te pune se você precisar do dinheiro fora da data exata.`
                    },
                    {
                        id: 4,
                        title: "Módulo 4: 'E se o banco quebrar?' (A Proteção Invisível)",
                        duration: "3 min",
                        content: `⏱️ Tempo de leitura: 3 minutos

Aqui reside o maior medo do iniciante. "Meu avô perdeu dinheiro no Collor, eu só confio no bancão."

Primeiro, esqueça o confisco. A estrutura econômica e legal do Brasil hoje é blindada contra isso. O risco real é a instituição financeira quebrar.

Mas existe um "anjo da guarda" chamado FGC (Fundo Garantidor de Créditos).

Como funciona na prática: O FGC é uma entidade privada, mantida pelos bancos, que funciona como um seguro de carro. Se você investir em um CDB de um banco menor (que paga muito mais que a poupança) e esse banco falir:

O FGC devolve seu dinheiro, com os juros acumulados até o dia da quebra.

O limite é de R$ 250.000 por CPF e por instituição.

E o Tesouro Direto? Esse é ainda mais seguro que a poupança. Quem garante o Tesouro Direto é o Governo Federal. Para o governo dar calote no Tesouro Direto, ele teria que quebrar o país inteiro antes. Se isso acontecesse, o dinheiro na sua poupança (que está em um banco privado) já teria virado pó muito antes.

Resumo da Segurança:

Poupança: Risco do Banco (Garantido pelo FGC).

CDB: Risco do Banco (Garantido pelo FGC).

Tesouro Direto: Risco Soberano (O mais seguro da economia).

A poupança não é mais segura. Ela é apenas mais famosa.`
                    },
                    {
                        id: 5,
                        title: "Módulo 5: Plano de Fuga (O Passo a Passo)",
                        duration: "3 min",
                        content: `⏱️ Tempo de leitura: 3 minutos

Agora que você entendeu que a poupança perde para a inflação, tem rentabilidade travada e possui as mesmas garantias que outros investimentos melhores, hora de agir.

Não precisa mover todo o seu dinheiro hoje. Faça um teste.

O Desafio dos R$ 100,00:

Abra conta em uma Corretora ou Banco Digital: (A maioria dos "bancões" cobra taxas altas ou esconde os bons produtos). Apps como NuBank, Inter, XP, Rico ou BTG são gratuitos.

Procure por:

Opção A (A mais fácil): CDB com "Liquidez Diária" que pague 100% do CDI (ou mais).

Opção B (A mais segura): Tesouro Selic (disponível na plataforma do Tesouro Direto através da corretora).

Transfira: Mande R$ 100,00 da sua poupança para lá.

Observe: Deixe por um mês. Compare com o extrato da poupança.

Onde colocar sua Reserva de Emergência? Aquele dinheiro que você usa para imprevistos deve sair da poupança e ir para um Tesouro Selic ou CDB de Liquidez Diária.

Risco: Praticamente idêntico.

Liquidez: Imediata (ou D+1).

Rentabilidade: Muito superior (quase o dobro em cenários de juros altos).

Conclusão Final: A poupança hoje é como guardar dinheiro embaixo do colchão, mas com um banco lucrando em cima de você. O sistema bancário adora que você deixe o dinheiro na poupança, pois eles te pagam 6% e emprestam esse mesmo dinheiro a 40%, 60% ou 100% para outros clientes.

Pare de financiar o lucro do banco e comece a financiar os seus sonhos.`
                    }
                ]
            },
            {
                id: 2,
                title: "Renda Fixa Turbinada",
                duration: "8 min",
                progress: 45,
                isLocked: false,
                thumbnail: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=60",
                description: "Entenda CDB, LCI e LCA e como escolher o melhor título para seus objetivos."
            },
            {
                id: 3,
                title: "Reserva de Emergência",
                duration: "15 min",
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
                id: 4,
                title: "Dividend King: Viver de Renda",
                duration: "22 min",
                progress: 10,
                isLocked: true,
                thumbnail: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?w=800&auto=format&fit=crop&q=60",
                description: "Como montar uma carteira previdenciária focada em dividendos mensais."
            },
            {
                id: 5,
                title: "Análise Fundamentalista na Prática",
                duration: "30 min",
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
                id: 6,
                title: "Bitcoin: O Ouro Digital",
                duration: "18 min",
                progress: 0,
                isLocked: false,
                thumbnail: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&auto=format&fit=crop&q=60",
                description: "A tese de investimento por trás da maior criptomoeda do mundo."
            },
            {
                id: 7,
                title: "DeFi: Finanças Descentralizadas",
                duration: "25 min",
                progress: 0,
                isLocked: true,
                thumbnail: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=800&auto=format&fit=crop&q=60",
                description: "Empréstimos e rendimentos sem bancos. O futuro do dinheiro."
            }
        ]
    }
]

export const USER_STATS = {
    level: 3,
    levelTitle: "Aprendiz Focado",
    xp: 2450,
    nextLevelXp: 4000
}
