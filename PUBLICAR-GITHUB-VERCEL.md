# Publicar o Mega Draft Coach com GitHub + Vercel

**GitHub guarda os arquivos e suas alterações. Vercel transforma esses arquivos no site acessível pelo celular.** Este projeto usa HTML, CSS e JavaScript, sem banco de dados e sem dependências de npm. Você não precisa instalar Node para publicar pela interface dos serviços.

## 1. Coloque os arquivos no GitHub

1. Entre no [GitHub](https://github.com/) e crie um repositório, por exemplo `mega-draft-coach`.
2. Escolha público ou privado. A visibilidade do código é uma escolha separada da publicação do site.
3. Na página do repositório, use **Add file → Upload files**. Em repositório vazio, pode aparecer o link **uploading an existing file**.
4. Envie os arquivos abaixo **diretamente na raiz**, sem criar uma pasta externa `Treino Draft`.
5. Clique em **Commit changes** para salvar o envio.

Arquivos necessários:

```text
mega_draft_coach.html
coach.css
mobile.css
cards.js
learning.js
coach.js
icon.svg
manifest.webmanifest
build-site.cjs
vercel.json
```

O pacote `mega-draft-github.zip` contém esses arquivos e a documentação. **Extraia o ZIP antes de enviar; enviar só o ZIP não publica o app.** Não envie backups do seu progresso. A versão antiga `mega_draft_coach.original.html` pode continuar só no computador.

O GitHub permite carregar arquivos existentes e registrar o envio como um commit. [Documentação de upload](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository).

## 2. Importe na Vercel

1. Entre na [Vercel](https://vercel.com/) usando sua conta.
2. Vá a **Add New → Project** e conecte o GitHub quando solicitado.
3. Autorize o acesso ao repositório que você acabou de criar e clique em **Import**.
4. Confira a configuração abaixo. O arquivo `vercel.json` já declara os valores do projeto.

| Campo | Valor |
| --- | --- |
| Framework Preset | **Other** |
| Root Directory | Raiz do repositório (`./`) |
| Build Command | `node build-site.cjs` |
| Output Directory | `public` |
| Install Command | Vazio |
| Environment Variables | Nenhuma |

5. Clique em **Deploy** e aguarde o status **Ready**.
6. Abra o domínio de produção que a Vercel mostrar, terminando em `.vercel.app`, no celular.

O comando de build apenas copia os arquivos do app para `public/`, gerando `public/index.html`. Não há framework para instalar. A Vercel serve somente o diretório de saída. [Configuração de build](https://vercel.com/docs/builds/configure-a-build).

## 3. Use no celular

- Abra o endereço HTTPS do site, não o link dos arquivos no GitHub.
- Teste uma sessão completa e confira se o histórico continua após atualizar a página.
- No menu do navegador, procure a opção para **adicionar à tela inicial**. A disponibilidade e o nome variam por navegador. O manifest prepara nome, cor e abertura independente quando suportados.
- Não há service worker nesta versão: o atalho **não garante abertura sem internet**. Depois de carregada, a lógica do treino roda no aparelho.
- O progresso pertence ao navegador e ao endereço usado. Prefira sempre o mesmo domínio de produção; uma URL de preview tem armazenamento separado.
- Para levar seu histórico do computador ao celular, use **Backup e troca de aparelho → Exportar progresso**, transfira o JSON e importe no celular. Não coloque esse JSON no GitHub.

## 4. Atualize depois

Edite ou envie os arquivos alterados no GitHub e faça outro commit na branch de produção, normalmente `main`. A integração da Vercel cria um novo deployment automaticamente; acompanhe o resultado em **Deployments**. Alterações em outras branches podem gerar previews. [Integração GitHub + Vercel](https://vercel.com/docs/git/vercel-for-github).

Você não precisa enviar a pasta `public`: a Vercel a recria usando `build-site.cjs`.

## Se algo não funcionar

| Sintoma | O que conferir |
| --- | --- |
| Site com 404 | Se o build terminou e Output Directory é `public`; o script cria `index.html` ali. |
| Erro “cannot find build-site.cjs” | Arquivo faltando ou Root Directory apontando para a pasta errada. |
| Página sem estilo ou botões sem resposta | Os dois CSS e os três JS foram enviados com nomes e letras iguais? |
| Site pede login da Vercel | Confira se abriu o domínio de produção e se há proteção de acesso habilitada no projeto. |
| Progresso sumiu | Confira o mesmo aparelho, navegador e domínio. Navegação privada e limpeza de dados podem remover o histórico. Importe seu backup se disponível. |
| Atualização não apareceu | Confira o último deployment da branch de produção e atualize a página. |

Estas instruções preparam a publicação. Nenhum repositório ou deployment foi criado automaticamente nesta conversa.
