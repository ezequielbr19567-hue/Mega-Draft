# Laboratório de decisões e revisão visual

Esta atualização prioriza treinar contextos diferentes e entender a escolha depois de responder, mantendo os controles adicionais fora da tela de decisão.

## Como usar

1. Faça o Treino do dia para combinar situações e revisões.
2. Abra o Laboratório de decisões para treinar separadamente a abertura ou as últimas vagas. Cada sessão traz oito contextos simulados novos.
3. Responda e registre sua confiança. Em Comparar as opções, veja sua carta junto de alternativas e leia o custo estratégico de cada uma.
4. Ao terminar, observe as decisões fora do prazo e as funções ausentes do deck. A biblioteca permite estudar as imagens e funções das cartas fora do cronômetro.
5. Use 15s se estiver perdendo o prazo. Volte aos 10s depois de entender o motivo das escolhas; rapidez sozinha não comprova melhora.

## Método e limites

A combinação de tentativa antes do feedback e revisões em dias diferentes se apoia em uma [revisão sobre espaçamento e recuperação](https://www.nature.com/articles/s44159-022-00089-1). Separar abertura e fechamento, definir oito exercícios e escolher os limites de tempo são decisões deste produto, não protocolos validados para Clash Royale.

O foco sugerido considera até 80 primeiras tentativas recentes e exige pelo menos três de um tema. A amostra é descritiva, pequena e pode misturar tempos diferentes. A análise do deck não simula batalhas e as notas não são probabilidades de vitória. O catálogo continua reduzido a 59 cartas.

As análises por carta dos novos cenários são calculadas no pool original e preservadas na revisão e no backup. Backups antigos continuam aceitos; casos gerados antigos sem análises individuais informam essa limitação.

## Verificação

Testes automatizados cobrem drafts, deadlines, revisão espaçada, backups, contextos novos, faixas das escolhas por fase, seleção/confirmar, comparação de alternativas e busca da biblioteca. O build verifica todos os arquivos públicos e as 59 imagens. Esses testes usam um DOM simulado; falta validação visual em aparelhos reais.

Para publicar, extraia o ZIP e envie os arquivos e a pasta assets à raiz do mesmo repositório. Não é necessário apagar o repositório. A configuração da Vercel permanece igual.
