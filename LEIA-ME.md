# Mega Draft Coach

Abra `mega_draft_coach.html` no navegador. Mantenha `cards.js`, `coach.js` e `coach.css` na mesma pasta. Não requer instalação nem internet. A versão anterior está preservada em `mega_draft_coach.original.html`.

## Como treinar

1. Faça um **Aprendizado** sem tempo. Escolha antes de pedir sugestões, quando possível.
2. Faça as oito situações de **Decisão rápida**. Use clique ou teclas 1–4. O relógio para durante o feedback.
3. Faça um **Draft em 10s**. Há 36 cartas e escolhas na sequência 1–2–2–2–2–2–2–2–1. Quem começa varia entre sessões. Cada escolha tem seu próprio relógio.
4. No resultado, use **Repetir decisões a revisar** para retornar ao mesmo contexto. A ordem das alternativas muda.

Nos 10 segundos: **0–3: identifique a ameaça. 3–7: compare duas opções para a lacuna principal. 7–10: confirme.** Durante o turno do rival, prepare um plano A e um plano B.

15s servem para aquecer. Experimente 7s depois de três drafts de 10s com pelo menos 80/100 de qualidade e 90% das escolhas no prazo. Essa é uma meta didática do treinador, não um limiar científico validado.

## Avaliação

- Qualidade e pontualidade aparecem separadamente. Responder mais rápido não aumenta a nota de qualidade.
- No draft, o avaliador compara funções faltantes, respostas às ameaças, algumas sinergias, peso de elixir, redundância e escassez. Alternativas próximas recebem tolerância.
- Nos exercícios, respostas e explicações são curadas; algumas perguntas aceitam mais de uma boa opção.
- No draft cronometrado, tempo esgotado escolhe uma carta aleatória, registra a escolha automática e dá zero àquela decisão. Nos exercícios, registra ausência de escolha.
- Dicas só estão disponíveis no aprendizado; escolhas auxiliadas são identificadas.
- Sessões concluídas ficam no armazenamento local do navegador, até 30 registros. Encerrar uma sessão incompleta não a salva. A repetição de erros usa a sessão atual; o histórico persistente contém resumos.
- O tempo continua correndo com a aba em segundo plano. Ao voltar, o prazo é conferido novamente. Reiniciar ou encerrar cancela os temporizadores anteriores.

## Limites e referências

É um treinador de decisão de draft. Não simula batalhas, posicionamento, níveis, evoluções, campeões nem o balanceamento atual. O catálogo é reduzido. A distribuição do pool é didática e não reproduz os grupos oficiais. A nota não estima chance de vitória e a sugestão do bot não é verdade absoluta. O prazo de 10s é a meta solicitada pelo usuário.

Consulta em 29/09/2026:

- [Supercell — pool compartilhado de 36 cartas](https://supercell.com/en/games/clashroyale/blog/news/new-season-siege-and-swish/).
- [Guia comunitário — counters, sinergia e leitura do pool](https://www.reddit.com/r/ClashRoyale/comments/10xrhab/). Estratégias comunitárias são contextuais.
- [RoyaleAPI — estatísticas de Mega Draft](https://royaleapi.com/cards/popular?cat=MegaDraft). Referência para consulta externa; o app não importa estatísticas ao vivo.

## Verificação

Execute `node test-coach.cjs`. A suíte testa 50 drafts completos, exclusividade das cartas, oito escolhas por jogador, expiração, clique após prazo, cancelamento de temporizadores, os oito exercícios, repetição, aprendizado sem relógio, lacunas críticas e persistência.

Os testes usam DOM e relógio simulados. A inspeção visual em navegador não foi concluída porque o navegador integrado bloqueou o protocolo `file://`.
