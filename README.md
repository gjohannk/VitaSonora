# VitaSonora — Entrega 2

Aplicativo mobile para compartilhamento de relatos sobre o impacto da música no bem-estar, inspirado no ODS 3. Continuação da Entrega 1 (interface e navegação).

## O que funciona nesta etapa
- React Native + Expo e React Navigation com telas de Início, Comunidade, Relato, Novo relato, Sobre, Contato e prévia visual de Entrar.
- API REST Node.js/Express com `GET /api/saude`, `GET /api/relatos`, `GET /api/relatos/:id`, `POST /api/relatos`.
- MySQL com tabela `relatos`; integração da tela de comunidade com `fetch` via `services/api.js`.
- Inserção e consulta de dados reais. Login, JWT, níveis e CRUD completo ficam para Entrega 3.

## Pré-requisitos
Node.js 20+, MySQL 8+, Expo Go ou emulador Android.

## Executar
1. Importe `database/vitasonora.sql` no MySQL Workbench (ou use `mysql -u root -p < database/vitasonora.sql`).
2. Em `backend/`: `npm install`; copie `.env.example` para `.env` e configure `DB_USER`, `DB_PASSWORD`; rode `npm run dev`.
3. Na raiz do projeto: `npm install`; copie `.env.example` para `.env`, configure `EXPO_PUBLIC_API_URL=http://IP_DO_SEU_PC:3000`; rode `npx expo start --clear`.
4. O celular e o computador devem estar na mesma rede. Android Emulator usa por padrão `http://10.0.2.2:3000`; no navegador normalmente `http://localhost:3000`.

## Testes manuais
- Acesse `http://localhost:3000/api/saude` e verifique `status: ok`.
- Abra Comunidade e veja os relatos do MySQL.
- Publique um relato e confira se apareceu em Comunidade e na tabela `relatos`.
- Desligue a API para verificar a mensagem de erro.

## GitHub
Faça commits e push reais no SEU repositório (o ZIP não publica arquivos automaticamente):
```
git add .
git commit -m "Entrega 2 - MySQL API e listagem/publicacao de relatos"
git push
```
Nunca publique `.env` ou `node_modules`.
