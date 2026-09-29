# Mega Draft Coach

Treinador de decisões de Clash Royale feito para celular: draft em 10s, aprendizado sem tempo, exercícios contrastantes e revisões espaçadas.

As cartas agora têm imagens locais. O deck rival e o relógio compartilham uma faixa fixa no topo durante a rolagem; o botão de recolher afeta apenas seu deck. O pool usa quatro colunas no celular, e os exercícios de quatro opções usam duas colunas. O início aguarda o pré-carregamento das imagens (até 8s) antes de ativar o cronômetro; nomes continuam disponíveis se houver falha de imagem.

## Comece aqui

Abra `mega_draft_coach.html` no navegador, mantendo todos os CSS e JS ao lado. Para usar no celular pela internet, siga [GitHub + Vercel](PUBLICAR-GITHUB-VERCEL.md).

Mantenha também a pasta `assets/cards` com os 59 PNGs. Os créditos e a origem estão em `assets/NOTICE.md` e `assets/sources.json`.

- **Treino do dia:** oito decisões, com revisões vencidas e outros contextos.
- **Aprendizado:** draft completo sem prazo, sugestões opcionais e reflexão.
- **Draft:** 36 cartas compartilhadas, escolhas na sequência 1–2–2–2–2–2–2–2–1, com 15, 10 ou 7 segundos por escolha.
- **Decisão rápida:** oito situações sorteadas de um banco de 16, com confiança antes da explicação.
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
