# VitaSonora — Entrega 1

Aplicação **React Native + Expo** inspirada no protótipo do Canva. Tema: uso da música como ponto de partida para conversas, relatos e conscientização sobre bem-estar emocional (**ODS 3**).

## Como executar

Requisitos: Node.js LTS e Expo Go (para testar no celular) ou navegador.

```bash
npm install
npx expo start
```

No terminal do Expo, pressione **w** para abrir no navegador ou leia o QR Code com o Expo Go. Se necessário: `npm run web`.

## Telas navegáveis
- Início
- Cadastrar / Entrar (formulários demonstrativos; sem persistência)
- Comunidade
- História
- Sobre
- Contato

## Organização
- `App.js`: rotas e React Navigation
- `screens/`: telas
- `components/UI.js`: componentes reutilizáveis
- `theme/colors.js`: identidade visual
- `docs/PROPOSTA_ENTREGA_1.md`: planejamento exigido pela avaliação

## Escopo e limitações
Esta entrega é **somente a primeira etapa**: o cadastro e o login ainda não comunicam com servidor; alertas avisam que estão em desenvolvimento. API, MySQL, JWT, hash, CRUD e controle de níveis só entram nas etapas posteriores. Os textos do blog são exemplos de interface, não relatos reais.

## Repositório Git — obrigatório para avaliação
O ZIP não cria nem publica o repositório remoto automaticamente. No diretório do projeto:

```bash
git init
git add .
git commit -m "Entrega 1: estrutura Expo e navegacao VitaSonora"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/vitasonora.git
git push -u origin main
```

Antes do push, crie um repositório **vazio** no GitHub e substitua `SEU-USUARIO` pelo seu usuário. Não envie arquivos `.env` com segredos. Confira o repositório remoto após enviar, como pede o PDF.

## Referências do planejamento
Documento Projeto PI e três telas enviadas pelo aluno, além do PDF Projeto Avaliativo — seção Entrega 1. O projeto `loja-jwt` foi usado apenas como referência de organização técnica, sem copiar sua aplicação de loja.
