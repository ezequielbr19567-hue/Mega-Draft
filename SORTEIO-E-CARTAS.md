# Sorteio e catálogo: o que foi confirmado

Consulta em 29/09/2026.

## O Mega Draft não sorteia 36 cartas de maneira uniforme

A [análise publicada pela RoyaleAPI em abril de 2023](https://www.reddit.com/r/ClashRoyale/comments/12ymyqc/) descreve dez categorias, quotas de cartas por categoria e sobreposição entre grupos. Uma carta sorteada deixa de estar disponível nos grupos seguintes. Isso produz probabilidades diferentes de aparição.

Em uma [resposta da equipe em julho de 2025](https://discuss.royaleapi.com/t/how-does-royaleapi-track-mega-draft-card-pool-or-show-up-rate-data/30739), a RoyaleAPI explica que a API pública de batalhas não entrega o pool completo e que a configuração depende de constantes do jogo. Portanto, estatísticas de decks finais não bastam para reconstruir a tabela atual.

## As exclusões mudaram

Uma publicação de dezembro de 2022 listava quinze cartas ausentes. A própria [RoyaleAPI informou em janeiro de 2023](https://www.reddit.com/r/RoyaleAPI/comments/10q2rxu/) que a tabela havia mudado: naquele momento, apenas Espelho e Clone ficavam fora entre as cartas regulares. Não é correto usar a lista de 2022 como se fosse uma regra permanente.

A [Supercell confirmou para o torneio de maio de 2026](https://supercell.com/en/games/clashroyale/blog/news/new-season-siege-and-swish/) o pool compartilhado de 36 cartas, dez segundos por escolha, limite de nível 11 e ausência de tropas de torre, evoluções e heróis. Esse anúncio não fornece a lista completa de grupos e cartas elegíveis. Não encontrei confirmação pública suficiente para reproduzir exatamente a tabela de todos os eventos atuais.

## O perfil implementado

O treinador agora usa **107 cartas clássicas**, contra 59 anteriormente. Todos os 48 acréscimos têm imagens locais. A base de nomes, custos e grupos foi obtida do [snapshot público de 18/10/2023 do RoyaleAPI](https://github.com/RoyaleAPI/cr-api-data/tree/d5461b0a59bff33c4da2fc845b07275b66b2d6ff/docs/json). Os grupos `Draft_RH_*` dessa base são de draft regular: sua combinação abaixo é uma **reconstrução didática**, não uma tabela oficial extraída de Mega Draft.

As quotas e a ordem seguem o [guia comunitário de fevereiro de 2023](https://www.reddit.com/r/ClashRoyale/comments/10xrhab/). Esse guia é evidência histórica auxiliar, não confirmação da configuração atual.

| Grupo | Quantidade |
| --- | ---: |
| Tanques | 4 |
| Defesa aérea | 4 |
| Distrações | 4 |
| Primeiro grupo de feitiços | 4 |
| Ataque | 6 |
| Segundo grupo de feitiços | 2 |
| Defensores | 3 |
| Antitanques | 3 |
| Campeões | 3 |
| Construções | 3 |
| **Total** | **36** |

As classificações de sorteio não são equivalentes às funções estratégicas do avaliador. Por exemplo, uma unidade pode figurar num grupo pela combinação de tropas que gera. O avaliador ainda usa funções simplificadas e não simula habilidades de campeões ou combate.

- Sem repetição de carta dentro do pool; cartas podem pertencer a mais de um grupo.
- Ordem dos grupos preservada na grade, em vez de ordenar tudo por elixir.
- Um campeão por deck neste perfil, incluindo rival e escolha automática no timeout.
- Espelho, Clone, variantes temporárias, evoluções, tropas de torre e heróis ficam fora.
- Cartas lançadas depois da base histórica também não entram. Isso é uma limitação do catálogo do treinador, **não uma afirmação de que estão banidas no jogo atual**.
- Não há bloqueio artificial das cartas usadas no draft anterior: isso distorceria a amostragem. A diversidade vem do catálogo ampliado e dos grupos.

Os nomes das cartas já existentes foram preservados para manter compatibilidade com o histórico e os backups. A proveniência completa dos grupos está em `assets/pool-rules.json`; a origem das imagens está em `assets/sources.json`.

## Verificação

Em 2.000 pools de teste, todas as 107 cartas foram alcançadas; cada pool teve 36 cartas únicas, três campeões e as quotas previstas. A média observada de sobreposição entre pools consecutivos foi aproximadamente 14 de 36 cartas. É uma medição deste simulador, não uma taxa oficial do jogo.

Também passaram testes de drafts completos, contextos de treino, bloqueio de segundo campeão, escolha por timeout, imagens, revisões e backups. Não foi feita inspeção visual em celular real nesta atualização.
