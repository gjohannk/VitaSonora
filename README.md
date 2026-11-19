# VitaSonora — Entrega 4

VitaSonora é uma comunidade escolar sobre música e bem-estar emocional, relacionada ao ODS 3. O projeto oferece um espaço de expressão e acolhimento para quem deseja compartilhar experiências com música, encontrar histórias em comum e conversar com outras pessoas.

## Recursos implementados
- Expo + React Navigation, comunidade, formulário de relato, detalhes, edição, exclusão, comentários e cadastro/login.
- API REST Node.js + Express + MySQL.
- Cadastro com senha armazenada com `bcryptjs` (hash, 12 rounds). Login com comparação do hash.
- JWT assinado com expiração de 8 horas, enviado como `Authorization: Bearer <token>`.
- Sessão local em `AsyncStorage`, `GET /api/auth/me` na abertura e logout local.
- Dois níveis: **usuario** (cria relatos, edita/remove apenas os seus, comenta e remove seus comentários), **admin** (pode editar/excluir quaisquer relatos e comentários e administrar níveis de terceiros).
- Permissões verificadas no BACK-END, não apenas em botões da interface.
- CRUD completo da entidade principal `relatos`: GET, POST, PUT e DELETE.
- Comentários GET, POST e DELETE; usuários GET e PATCH nível para admin.

## Preparar MySQL
1. É recomendado criar uma base **vazia**, importar `database/vitasonora.sql` pelo MySQL Workbench ou `mysql -u root -p < database/vitasonora.sql`.
2. **Atenção**: esquema da Entrega 2 não é compatível automaticamente com o da Entrega 3. Leia `database/MIGRACAO_DA_ENTREGA_2.md` para preservar dados.

## Iniciar API
```
cd backend
npm ci
```
Copie `backend/.env.example` para `backend/.env`. Configure banco e `JWT_SECRET` único com **ao menos 32 caracteres aleatórios** (não publique este segredo).
```
npm run dev
```
API disponível em `http://localhost:3000/api/saude`.

## Iniciar aplicativo

Na raiz, execute `npm ci` e `npx expo start --web` para usar o navegador do computador com a API local. Para Expo Go no celular, configure `EXPO_PUBLIC_API_URL` no `.env` da raiz com o endereço da API acessível ao aparelho e execute `npx expo start --clear`. Para rede local, mantenha ambos na mesma rede Wi-Fi. Veja os passos para APK em `docs/BUILD_APK.md`.

O frontend usa a variável pública `EXPO_PUBLIC_API_URL`. O backend usa `PORT`, `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` e `JWT_SECRET` em `backend/.env`. Use `npm ci` na raiz e em `backend` para seguir os lockfiles.

## Primeiro administrador

Cadastre a conta de demonstração e abra o MySQL Workbench conectado a `vitasonora_db`. Confirme o e-mail antes de promover a conta e substitua o valor abaixo pelo e-mail correto.

```sql
UPDATE usuarios SET nivel = 'admin' WHERE email = 'admin@exemplo.com';
```

Saia e entre novamente para atualizar o perfil exibido. A API consulta o nível atual no banco em cada requisição autenticada.

## Principais rotas
| Método | Rota | Acesso |
|---|---|---|
| GET | /api/saude | público |
| POST | /api/auth/cadastro | público |
| POST | /api/auth/login | público |
| GET | /api/auth/me | logado |
| GET | /api/relatos | público |
| GET | /api/relatos/:id | público |
| POST | /api/relatos | logado |
| PUT | /api/relatos/:id | autor ou admin |
| DELETE | /api/relatos/:id | autor ou admin |
| GET | /api/relatos/:id/comentarios | público |
| POST | /api/relatos/:id/comentarios | logado |
| DELETE | /api/comentarios/:id | autor ou admin |
| GET | /api/usuarios | admin |
| PATCH | /api/usuarios/:id/nivel | admin |

## Teste manual de permissões
1. Crie duas contas; ambas começam no nível `usuario`.
2. Entre com A, crie um relato, edite e exclua seu próprio relato.
3. Entre com B, abra relato de A: não deve aparecer opção de editar; a API responde HTTP 403 se B tentar `PUT`/`DELETE` diretamente.
4. Comente autenticado; confirme que visitante sem token não publica.
5. Promova uma conta a `admin` pela instrução SQL acima, faça login de novo e verifique a tela Usuários e moderação.
6. Tente acessar `GET /api/usuarios` sem token: deve retornar 401; com usuário comum: 403.

## Segurança e observações
- Cadastro público jamais escolhe nível `admin`; nível é definido no servidor.
- O campo CPF é **opcional** e é guardado em texto (sem criptografia): para publicação real, revisar necessidade, consentimento, política de retenção e proteção de dados pessoais. Este projeto é demonstrativo escolar.
- `AsyncStorage` permite demonstração da sessão, mas não é armazenamento criptografado. Em produto real prefira armazenamento seguro.
- O logout remove o token do dispositivo; JWT previamente emitido pode continuar válido até vencer (8h), pois não há lista de revogação.
- Avaliação precisa de execução local com MySQL; não há dados reais ou credenciais inclusos.
- Para GitHub, não envie `.env`, credenciais ou `node_modules` e faça commit/push no seu próprio repositório.

## Entrega 4: testes, APK e apresentação

A Entrega 4 finaliza o aplicativo. Os requisitos são testar as funcionalidades e permissões, preparar o build Android, registrar evidências, revisar a documentação e enviar ao repositório atualizado.

- **Checklist e evidências:** `docs/ENTREGA_4_CHECKLIST.md`
- **Build local do APK Android com Gradle:** `docs/BUILD_APK.md`
- **Roteiro para a apresentação:** `docs/ROTEIRO_APRESENTACAO.md`

**Atenção:** o APK deve ser compilado e testado após configurar uma URL da API acessível pelo Android; consulte o checklist para o status do APK. A API e o banco devem estar ativos para login, publicações e comentários. Para demonstrar a entrega, faça um commit/push da mesma versão usada no build e inclua o link do APK final.

**Segurança:** mantenha os dados sensíveis apenas em `.env`, que deve permanecer ignorado. Substitua qualquer credencial que tenha sido exposta em prints ou código anteriormente.
