/* Dados do profissional. Para vender a outro cliente, troque só este arquivo. Tudo aqui é fictício. */
window.PROFISSIONAL = {
  marca: "Prisma Contabilidade",
  nome: "Helena Martins",
  cargo: "Contadora",
  registro: "CRC-SP 000000/O",
  whatsapp: "5511999999999",   // WhatsApp que recebe os contatos (DDI+DDD+número)
  email: "contato@prismacontabil.exemplo",
  cidade: "São Paulo · atendimento online em todo o Brasil",
  horario: "Segunda a sexta, das 9h às 18h",
  headline: "Contabilidade sem dor de cabeça para o seu CNPJ.",
  sub: "Imposto em dia, nota fiscal sem susto e uma contadora que responde no WhatsApp. Para MEI, microempresa e autônomo.",
  garantia: "A primeira conversa é gratuita e sem compromisso.",
  numeros: [
    { v: "+300", l: "empresas atendidas" },
    { v: "9 anos", l: "de experiência" },
    { v: "até 4 h", l: "para a primeira resposta" },
    { v: "4,9 de 5", l: "avaliação dos clientes" }
  ],
  dores: [
    { t: "Boleto do imposto atrasado?", d: "Eu acompanho os vencimentos e aviso antes de virar multa." },
    { t: "Não sabe qual regime compensa?", d: "Comparo MEI, Simples Nacional e outros para o seu caso." },
    { t: "Nota fiscal virou dor de cabeça?", d: "Te ensino a emitir ou emito por você, do jeito mais simples." },
    { t: "Mistura conta pessoal com a da empresa?", d: "Organizo o financeiro para você saber quanto realmente sobra." }
  ],
  servicos: [
    { t: "Abertura de CNPJ", d: "Da escolha da atividade ao alvará, com tudo regularizado." },
    { t: "Contabilidade mensal", d: "Apuração de impostos, guias, balancete e obrigações." },
    { t: "MEI em dia", d: "Guia mensal (DAS), declaração anual e regularização de atrasos." },
    { t: "Emissão de nota fiscal", d: "Configuração e suporte para emitir sem erro." },
    { t: "Imposto de Renda", d: "Pessoa física e autônomo, com carnê-leão quando for o caso." },
    { t: "Planejamento tributário", d: "Quanto pagar de imposto dentro da lei, sem sustos." }
  ],
  passos: [
    { t: "Você conta seu caso", d: "Pelo diagnóstico rápido ou direto no WhatsApp, em poucos minutos." },
    { t: "Eu analiso e te mostro o caminho", d: "Retorno em até 4 horas úteis, com o plano certo e o valor." },
    { t: "Você foca no negócio", d: "A rotina contábil fica comigo e você acompanha tudo pelo celular." }
  ],
  planos: [
    { id: "mei", nome: "MEI Essencial", preco: 89, para: "MEI e autônomo", itens: ["Guia mensal (DAS) com lembrete", "Declaração anual (DASN)", "Suporte de nota fiscal", "Atendimento por WhatsApp"] },
    { id: "simples", nome: "Simples Nacional", preco: 289, para: "Microempresa até R$ 30 mil/mês", destaque: true, itens: ["Contabilidade completa mensal", "Guias e obrigações em dia", "Folha de até 3 funcionários", "Reunião trimestral de resultados"] },
    { id: "cresce", nome: "Em crescimento", preco: 590, para: "Faturamento acima de R$ 30 mil/mês", itens: ["Tudo do Simples Nacional", "Planejamento tributário anual", "Pró-labore e distribuição de lucros", "Relatórios gerenciais mensais"] }
  ],
  depoimentos: [
    { n: "Carla Menezes", c: "Confeiteira · MEI", t: "Eu vivia atrasando o boleto. Agora recebo o lembrete e nunca mais paguei multa." },
    { n: "Roberto Dias", c: "Loja de bicicletas · ME", t: "Descobri que estava no regime errado. A economia pagou os honorários no primeiro mês." },
    { n: "Aline Torres", c: "Designer · autônoma", t: "Declarar o imposto era um pesadelo. Em uma tarde ficou tudo resolvido, com explicação clara." }
  ],
  faq: [
    { q: "Como é a primeira conversa?", a: "É por WhatsApp ou chamada de vídeo, de 15 a 20 minutos. Eu entendo seu caso e digo qual caminho faz sentido. Sem custo e sem compromisso." },
    { q: "Atende de fora de São Paulo?", a: "Sim. Todo o atendimento é online e a documentação é digital, então atendo clientes em todo o Brasil." },
    { q: "Posso trocar de contador sem burocracia?", a: "Pode. Eu cuido da transição: peço os documentos ao contador anterior e organizo tudo para você não ter interrupção." },
    { q: "Os valores têm fidelidade?", a: "Não há multa de saída. Você fica porque o serviço compensa." },
    { q: "Preciso entender de contabilidade?", a: "Não. Eu explico em linguagem simples o que importa e cuido do resto." },
    { q: "E se eu tiver impostos atrasados?", a: "Faço o levantamento e te mostro as opções de regularização e parcelamento, antes de você decidir qualquer coisa." }
  ]
};
