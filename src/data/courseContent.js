
export const COURSE_CONTENT = {
    // "curso-01" kept for legacy/demo if needed, or removed. I'll keep it but updated.
    "curso-01": {
        id: "curso-01",
        title: "Fundamentos da Bolsa",
        progress: 15,
        modules: [
            {
                title: "Introdução",
                lessons: [
                    {
                        id: 1,
                        title: "O que é uma Ação?",
                        type: "video",
                        isCompleted: true,
                        duration: "5 min",
                        content: `
# O que é uma Ação?

Uma **ação** é a menor parcela do capital social de uma empresa. Ao comprar uma ação, você se torna **sócio** dessa companhia, passando a ter direitos e deveres.

### Por que as empresas emitem ações?
As empresas abrem capital na bolsa (IPO) principalmente para:
* Captar recursos para investimentos (expansão, novas fábricas, tecnologia).
* Dar saída para sócios antigos.
* Ganhar visibilidade e governança.

> "O mercado de ações é um dispositivo para transferir dinheiro dos impacientes para os pacientes." – Warren Buffett

### Tipos de Ação
1. **Ordinárias (ON):** Dão direito a voto nas assembleias. Final do código: **3** (Ex: VALE3).
2. **Preferenciais (PN):** Têm preferência no recebimento de dividendos. Final do código: **4** (Ex: PETR4).
3. **Units:** Pacotes de ações (ON + PN). Final do código: **11** (Ex: KLBN11).

### Riscos Envolvidos
* **Risco de Mercado:** Ação cair devido a fatores macroeconômicos.
* **Risco de Liquidez:** Dificuldade de vender o ativo.
* **Risco Operacional:** A empresa ter problemas de gestão ou resultados ruins.

Na próxima aula, vamos entender como analisar se uma ação está barata ou cara.
                        `
                    },
                    {
                        id: 2,
                        title: "Home Broker na Prática",
                        type: "text",
                        isCompleted: false,
                        duration: "10 min",
                        content: `
# Home Broker na Prática

O **Home Broker** é a plataforma que conecta você à Bolsa de Valores (B3). É por lá que enviamos as ordens de compra e venda.

### Principais Elementos

* **Book de Ofertas:** Mostra as intenções de compra e venda de todos os participantes.
* **Boleta:** Onde você preenche:
    * *Ativo:* O código da ação.
    * *Quantidade:* Lote padrão (100) ou fracionário (1 a 99).
    * *Preço:* O valor que deseja pagar.

### Tipos de Ordem

1. **A Mercado:** Executa imediatamente pelo melhor preço disponível no momento.
2. **Limitada:** Você define o preço máximo que aceita pagar.
3. **Stop Loss:** Ordem automática de venda para limitar prejuízos.

**Dica Prática:** Sempre verifique o *Ticker* (código) antes de enviar a ordem. Comprar AAPL (Apple) é diferente de comprar AAPL34 (BDR da Apple).
                        `
                    }
                ]
            }
        ]
    },
    // Updated "O Fim da Poupança" with all 5 modules from AcademyData
    "1": {
        id: "1",
        title: "O Fim da Poupança",
        progress: 0,
        modules: [
            {
                title: "Módulo 1: O Despertar",
                lessons: [
                    {
                        id: 1,
                        title: "O 'Assassino Silencioso' do seu Dinheiro",
                        type: "text",
                        isCompleted: false,
                        duration: "2 min",
                        content: `# O 'Assassino Silencioso' do seu Dinheiro

⏱️ Tempo de leitura: 2 minutos

Você provavelmente ama a poupança por um motivo: a sensação de segurança. Você vê o número lá, ele nunca diminui nominalmente, e você dorme tranquilo.

Mas aqui está a verdade brutal: **Seu dinheiro está encolhendo.**

Imagine o seguinte cenário real: Em janeiro de 2021, você colocou R$ 10.000 na poupança. Em janeiro de 2022, você foi sacar. O banco lhe mostrou que você tinha aproximadamente R$ 10.290 (rendimento da poupança naquele ano foi pífio, cerca de 2,9%).

Você "ganhou" R$ 290, certo? **Errado.**

Em 2021, a inflação (IPCA) no Brasil foi de 10,06%. Aquilo que custava R$ 10.000 em janeiro de 2021, passou a custar R$ 11.006 em janeiro de 2022.

### O Resultado Real
Para manter o seu poder de compra, você precisaria ter R$ 11.006. Você só tem R$ 10.290.

> **Conclusão:** Você perdeu o equivalente a um carrinho de supermercado cheio, mesmo com o dinheiro "guardado" no banco.

Esse fenômeno se chama **Rentabilidade Real Negativa**. É quando o seu dinheiro cresce mais devagar do que os preços das coisas. A poupança é especialista em fazer isso.`
                    },
                    {
                        id: 2,
                        title: "A Matemática da Derrota",
                        type: "text",
                        isCompleted: false,
                        duration: "2 min",
                        content: `# A Matemática da Derrota

⏱️ Tempo de leitura: 2 minutos

Por que a poupança rende tão pouco? Porque a regra do jogo mudou em 2012 e muitos brasileiros não perceberam.

Funciona assim:

* **Se a Taxa Selic (juros do país) for maior que 8,5% ao ano:** A poupança rende 0,5% ao mês + TR (que é quase zero). Isso dá cerca de 6,17% ao ano.
* **Se a Selic for menor ou igual a 8,5%:** A poupança rende apenas 70% da Selic.

### O Comparativo Real
Hoje, existem investimentos tão seguros quanto a poupança que pagam 100% da Taxa Selic ou do CDI.

Vamos fazer uma conta de padaria com um cenário hipotético de juros altos (11% ao ano):

1. **Investimento Seguro (CDB/Tesouro):** Rende ~11% ao ano.
2. **Poupança:** Rende ~6,17% ao ano.

Você está abrindo mão de quase o dobro do rendimento pelo mesmo nível de segurança. Em 10 anos, essa diferença não paga apenas um jantar; paga um carro popular.

> **Ponto Chave:** A poupança tem um "teto" de ganhos. Quando a economia vai bem e os juros sobem, a poupança trava. Os outros investimentos acompanham a alta.`
                    }
                ]
            },
            {
                title: "Módulo 2: O Mito da Liquidez",
                lessons: [
                    {
                        id: 3,
                        title: "O Medo de Ficar Preso",
                        type: "text",
                        isCompleted: false,
                        duration: "2 min",
                        content: `# O Mito da Liquidez

⏱️ Tempo de leitura: 2 minutos

"Mas na poupança eu saco o dinheiro no domingo à noite se precisar!"

Verdade. Mas você sabia que a poupança tem uma "pegadinha" chamada **Aniversário**?

### Cenário Real
Você deposita R$ 5.000 no dia 05 de um mês. Se você sacar esse dinheiro no dia 04 do mês seguinte (29 dias depois), sabe quanto você ganha de juros? **Zero. Nada. Nem um centavo.**

A poupança só rentabiliza se você completar o ciclo de 30 dias. Se sacar um dia antes, perde o lucro do mês inteiro.

### A Alternativa Moderna
Investimentos como o **Tesouro Selic** ou **CDBs de Liquidez Diária** rendem todos os dias úteis. Se você deixar o dinheiro lá por 10 dias e sacar, você ganha os juros proporcionais daqueles 10 dias.

* **Poupança:** Rigidez mensal.
* **Novos Investimentos:** Flexibilidade diária.

A tal "facilidade" da poupança custa caro: ela te pune se você precisar do dinheiro fora da data exata.`
                    }
                ]
            },
            {
                title: "Módulo 3: Segurança",
                lessons: [
                    {
                        id: 4,
                        title: "E se o banco quebrar?",
                        type: "text",
                        isCompleted: false,
                        duration: "3 min",
                        content: `# E se o banco quebrar?

⏱️ Tempo de leitura: 3 minutos

Aqui reside o maior medo do iniciante. "Meu avô perdeu dinheiro no Collor, eu só confio no bancão."

Primeiro, esqueça o confisco. A estrutura econômica e legal do Brasil hoje é blindada contra isso. O risco real é a instituição financeira quebrar.

Mas existe um "anjo da guarda" chamado **FGC (Fundo Garantidor de Créditos)**.

### Como funciona na prática
O FGC é uma entidade privada, mantida pelos bancos, que funciona como um seguro de carro. Se você investir em um CDB de um banco menor (que paga muito mais que a poupança) e esse banco falir:

> O FGC devolve seu dinheiro, com os juros acumulados até o dia da quebra.

O limite é de **R$ 250.000** por CPF e por instituição.

### E o Tesouro Direto?
Esse é ainda mais seguro que a poupança. Quem garante o Tesouro Direto é o **Governo Federal**. Para o governo dar calote no Tesouro Direto, ele teria que quebrar o país inteiro antes. Se isso acontecesse, o dinheiro na sua poupança (que está em um banco privado) já teria virado pó muito antes.

### Resumo da Segurança
* **Poupança:** Risco do Banco (Garantido pelo FGC).
* **CDB:** Risco do Banco (Garantido pelo FGC).
* **Tesouro Direto:** Risco Soberano (O mais seguro da economia).

A poupança não é mais segura. Ela é apenas mais famosa.`
                    }
                ]
            },
            {
                title: "Módulo 4: Plano de Fuga",
                lessons: [
                    {
                        id: 5,
                        title: "O Passo a Passo",
                        type: "text",
                        isCompleted: false,
                        duration: "3 min",
                        content: `# Plano de Fuga

⏱️ Tempo de leitura: 3 minutos

Agora que você entendeu que a poupança perde para a inflação, tem rentabilidade travada e possui as mesmas garantias que outros investimentos melhores, hora de agir.

Não precisa mover todo o seu dinheiro hoje. Faça um teste.

### O Desafio dos R$ 100,00

1. **Abra conta em uma Corretora ou Banco Digital:** (A maioria dos "bancões" cobra taxas altas ou esconde os bons produtos). Apps como NuBank, Inter, XP, Rico ou BTG são gratuitos.
2. **Procure por:**
    * *Opção A (A mais fácil):* CDB com "Liquidez Diária" que pague 100% do CDI (ou mais).
    * *Opção B (A mais segura):* Tesouro Selic (disponível na plataforma do Tesouro Direto através da corretora).
3. **Transfira:** Mande R$ 100,00 da sua poupança para lá.
4. **Observe:** Deixe por um mês. Compare com o extrato da poupança.

### Onde colocar sua Reserva de Emergência?
Aquele dinheiro que você usa para imprevistos deve sair da poupança e ir para um Tesouro Selic ou CDB de Liquidez Diária.

* **Risco:** Praticamente idêntico.
* **Liquidez:** Imediata (ou D+1).
* **Rentabilidade:** Muito superior (quase o dobro em cenários de juros altos).

> **Conclusão Final:** A poupança hoje é como guardar dinheiro embaixo do colchão, mas com um banco lucrando em cima de você. Pare de financiar o lucro do banco e comece a financiar os seus sonhos.`
                    }
                ]
            }
        ]
    }
}
