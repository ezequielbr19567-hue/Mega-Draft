# Por que este treino foi redesenhado

## A meta que dá para medir

O objetivo é reconhecer problemas do draft, recuperar estratégias úteis e decidir dentro de 10 segundos. Não há base para prometer aumento de QI ou melhora geral do cérebro por usar este site. Uma revisão ampla encontrou benefícios mais consistentes nas tarefas treinadas e evidência muito mais limitada para tarefas distantes e atividades cotidianas. [Simons et al., 2016](https://www.psychologicalscience.org/journals/pspi/1529100616661983/).

Isso muda o produto: ele não mostra “idade cerebral”, “QI” ou um índice inventado de inteligência. Mostra qualidade estimada da escolha, prazo, primeira tentativa, repetição e temas que precisam de atenção. Ainda assim, são indicadores internos de um avaliador simplificado.

## Evidência → decisão de design

| Princípio | O que a pesquisa permite dizer | Aplicação aqui |
| --- | --- | --- |
| Recuperar antes de consultar | Experimentos com textos científicos encontraram benefícios de recuperação ativa em testes posteriores; não estudaram este jogo. [Karpicke & Blunt, 2011](https://pubmed.ncbi.nlm.nih.gov/21252317/) | Escolha antes do feedback. Depois, formule mentalmente a prioridade antes de ler a solução. Múltipla escolha sozinha também envolve reconhecimento; a explicação mental acrescenta tentativa de recuperação. |
| Distribuir a prática | Espaçamento e recuperação têm suporte em pesquisa de aprendizagem; o intervalo adequado depende da tarefa e do tempo de retenção desejado. [Carpenter, Pan & Butler, 2022](https://www.nature.com/articles/s44159-022-00089-1) | Revisões em dias diferentes. Intervalos de 1, 3, 7 e 14 dias são uma escolha prática deste app, não uma prescrição validada para Clash Royale. |
| Misturar problemas | Um ensaio em matemática estudou benefícios de prática intercalada. Transferir essa conclusão ao draft é uma hipótese de design. [Rohrer et al., 2020](https://doi.org/10.1037/edu0000367) | A sessão mistura temas. Há casos contrastantes: ora falta ataque, ora o ataque já existe e falta defesa. |
| Monitorar a própria certeza | Confundir familiaridade com domínio é um problema de aprendizagem discutido na revisão de Carpenter e colegas. | A confiança é registrada antes da explicação, para apontar escolhas que pareciam certas e merecem reconsideração. Ela não aumenta a nota. |

Nenhum desses estudos validou este treinador. O produto aplica princípios de aprendizagem e precisa de testes de eficácia próprios. Não há porcentagem garantida de melhora.

## Um ciclo de treino executável

1. **Primeiro dia:** faça um draft no Aprendizado. Pense por conta própria antes de abrir dicas. Entenda quais funções cada carta oferece.
2. **Em uma sessão curta:** use Treino do dia. São oito decisões, com tempo parado para refletir e ler o feedback. Os 3–5 minutos são uma estimativa de duração, não uma dose científica.
3. **Depois de escolher:** diga “Escolhi X para resolver Y, aceitando Z”. Marque se estava seguro ou em dúvida; pode pular se preferir. Não escreva textos longos durante o treino.
4. **Compare:** sua prioridade era a mesma do exemplo? Outra carta também resolvia? O custo de elixir ou a resposta adversária mudava a decisão? Discordar do avaliador com um motivo é melhor do que decorar sua preferência.
5. **Em outro dia:** faça as revisões vencidas antes de acumular sessões novas. Acertar repetidamente no mesmo dia não aumenta o intervalo.
6. **Aplique:** faça um draft completo em 10s, com cartas variadas e sem sugestões. As quatro opções de um exercício não reproduzem a busca entre 36 cartas.
7. **Leve para a arena:** após uma partida real, registre fora do app uma ameaça que ignorou e uma escolha que faria diferente. O resultado da partida também depende de posicionamento, execução e do oponente.

O roteiro “ameaça → necessidade → escolha” é uma forma de organizar a atenção. Na prática: aproximadamente 0–3s para ler a ameaça, 3–7s para comparar duas respostas e 7–10s para confirmar. Esses cortes são orientativos; não há medição separada dessas fases.

## O que foi implementado

- Banco de **16 situações**, cobrindo oito temas e casos contrastantes. Cada sessão rápida sorteia oito. O banco ainda é pequeno: complementar com drafts aleatórios evita depender apenas da memorização.
- **Treino do dia** combina até quatro revisões vencidas com outros exercícios, dando preferência aos ainda não vistos quando possível.
- **Fila persistente** guarda até 60 contextos; os 400 registros de decisão mais recentes alimentam os indicadores. Resumos de até 30 sessões também são mantidos.
- Resposta inadequada, tempo esgotado ou dúvida em uma revisão elegível encurtam o próximo intervalo para um dia. Acerto em revisão vencida pode aumentar para 3, 7 e 14 dias. Acertos antecipados não adiantam a próxima data.
- A repetição imediata continua disponível para corrigir entendimento. Ela não é tratada como prova de retenção duradoura.
- As sessões incompletas não são incorporadas ao histórico. Não há ranking público, punição por dias sem treinar ou sequência obrigatória.

## Como verificar se está ajudando

Durante uma ou duas semanas, compare apenas sessões semelhantes: draft de 10s com draft de 10s, sem ajuda. Observe três coisas em conjunto: qualidade estimada, escolhas no prazo e capacidade de justificar a prioridade. Se só o tempo melhora enquanto a qualidade cai, você está apressando a resposta.

As taxas de primeira tentativa e repetição **não formam um experimento controlado**: contextos e dificuldades podem ser diferentes. Não subtraia uma da outra para chamar o resultado de “ganho cerebral”. Um teste mais forte exigiria situações novas equivalentes, medidas antes e depois e comparação com outro método de treino.

O limiar de 80/100 e 90% no prazo em três drafts é um critério operacional para sugerir 7s, não uma medida validada de domínio. Se estiver errando ou perdendo atenção, use 15s ou Aprendizado e volte a 10s depois.

## Decisões para celular

Alvos de ação de pelo menos 44px; cartões com nomes completos; texto sem fontes externas; zoom preservado; respeito à preferência por movimento reduzido; espaço para a área segura do aparelho. Durante exercícios rápidos, os decks usam texto compacto. O cabeçalho decorativo desaparece na sessão móvel. Os decks podem ser recolhidos, o tempo fica visível e o botão de continuar fica próximo ao polegar.

O pool completo pode precisar de rolagem. Os filtros Ataque, Defesa e Feitiços reduzem a busca, mantendo as posições dentro do filtro. Não recomendo esconder cartas automaticamente com base na resposta sugerida: isso treinaria seguir o sistema em vez de ler o draft.

Pesquisa consultada em 29/09/2026.
