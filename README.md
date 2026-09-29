# Mega Draft Coach

Treinador de decisões de Clash Royale feito para celular: draft em 10s, aprendizado sem tempo, exercícios contrastantes e revisões espaçadas.

As cartas têm imagens locais. A visão geral móvel mantém as 36 posições em uma grade 6×6, com rival, relógio e confirmação na mesma tela. Toque para selecionar e ver o nome; confirme em Escolher. O tempo continua correndo. Em paisagem compatível, a grade usa 9×4. Ampliar cartas oferece cartões maiores com rolagem; telas muito pequenas usam essa versão automaticamente. Os exercícios de quatro opções usam duas colunas. O início aguarda o pré-carregamento das imagens (até 8s) antes de ativar o cronômetro; nomes continuam disponíveis se houver falha de imagem.

## Comece aqui

### Atualização: laboratório e revisão visual

- **Laboratório de decisões:** oito contextos novos para praticar a abertura (escolhas 2 e 3) ou o fechamento (7 e 8), usando o tempo selecionado no treino livre.
- **Comparar opções:** após responder, veja imagens, notas e justificativas de até três cartas, sempre incluindo sua escolha manual. A comparação também fica no relatório.
- **Diagnóstico da sessão:** sequência visual das decisões, escolhas próximas ao prazo e leitura das funções e ameaças do deck final.
- **Foco sugerido:** usa primeiras tentativas recentes, sem misturar repetições na porcentagem.
- **Biblioteca visual:** consulte as 59 cartas e busque pelo nome ou função, incluindo buscas sem acentos.
- **Exercícios no celular:** quatro opções em uma tela compacta em viewports compatíveis de até 600px de largura e pelo menos 640px de altura. A opção ampliada permanece disponível.

As justificativas de situações geradas ficam salvas junto com o contexto original, inclusive nos backups. O histórico anterior continua compatível.

Abra `mega_draft_coach.html` no navegador, mantendo todos os CSS e JS ao lado. Para usar no celular pela internet, siga [GitHub + Vercel](PUBLICAR-GITHUB-VERCEL.md).

Mantenha também a pasta `assets/cards` com os 59 PNGs. Os créditos e a origem estão em `assets/NOTICE.md` e `assets/sources.json`.

- **Treino do dia:** oito decisões, com revisões vencidas e outros contextos.
- **Aprendizado:** draft completo sem prazo, sugestões opcionais e reflexão.
- **Draft:** 36 cartas compartilhadas, escolhas na sequência 1–2–2–2–2–2–2–2–1, com 15, 10 ou 7 segundos por escolha.
- **Decisão rápida:** quatro exercícios guiados de temas diferentes, selecionados de um banco de 16, e quatro situações novas de drafts simulados. Temas com dificuldade e exercícios ainda não vistos ganham prioridade; repetições recentes perdem prioridade. A confiança vem antes da explicação.
- **Revisão:** repita agora para corrigir e volte em outros dias para testar retenção. Progresso local com exportação/importação.

Leia [a pesquisa e o método](PESQUISA-E-METODO.md) para entender o que o treino pode e não pode medir. As notas são heurísticas; não são chance de vitória, QI ou diagnóstico cognitivo. Este app não tem validação experimental própria.

## Desenvolvimento

```sh
node test-coach.cjs
node build-site.cjs
node test-site.cjs
```

O build cria `public/index.html` e copia apenas os assets do app. `vercel.json` já configura o comando e a saída. Não é necessário `npm install`.

Os testes cobrem drafts completos, deadlines, feedback, cenários válidos, filas de revisão, persistência e backups. Eles usam relógio e DOM simulados; não substituem uma inspeção visual em aparelhos reais.

O app não tem conta, analytics, servidor de dados nem sincronização automática. O manifest oferece metadados para atalho no celular; esta versão não usa service worker para cache offline.

Mantém até 30 resumos de sessão, 400 decisões e 60 contextos de revisão no armazenamento do navegador. Sessões incompletas não são salvas. Exportações podem ser usadas para transferir dados entre o arquivo local e o site publicado.
