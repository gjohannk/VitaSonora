# VitaSonora — Entrega 4 (versão final em preparação)

Aplicação mobile sobre o impacto da música no bem-estar (ODS 3), construída sobre a Entrega 2. A loja JWT fornecida foi usada como referência de arquitetura, não como tema copiado.

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
npm install
```
Copie `backend/.env.example` para `backend/.env`. Configure banco e `JWT_SECRET` único com **ao menos 32 caracteres aleatórios** (não publique este segredo).
```
npm run dev
```
API disponível em `http://localhost:3000/api/saude`.

## Iniciar aplicativo
Na raiz: `npm install`. Copie `.env.example` para `.env` e substitua o endereço em `EXPO_PUBLIC_API_URL` pelo IPv4 local do computador, por exemplo `http://192.168.1.100:3000`. No celular, use a **mesma rede Wi-Fi** do computador. Não use `localhost` no celular. Depois execute `npx expo start --clear`.

## Primeiro administrador
Crie uma conta comum no aplicativo. No terminal da pasta `backend`, execute:
```
npm run admin -- admin@exemplo.com
```
Substitua pelo e-mail da conta cadastrada. **Saia e entre novamente no app** para atualizar a sessão e o nível exibido. A API verifica o nível atual no banco para cada chamada autenticada.

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
5. Promova uma conta a `admin` pelo comando acima, faça login de novo e verifique a tela Usuários e moderação.
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
- **Build APK Android com EAS:** `docs/BUILD_APK.md` e `eas.json`
- **Roteiro para a apresentação:** `docs/ROTEIRO_APRESENTACAO.md`

**Atenção:** o APK deve ser compilado e testado após configurar uma URL da API acessível pelo Android; não existe APK pré-gerado neste ZIP. A API e o banco devem estar ativos para login, publicações e comentários. Para demonstrar a entrega, faça um commit/push da mesma versão usada no build e inclua o link do APK final.

**Segurança:** mantenha os dados sensíveis apenas em `.env`, que deve permanecer ignorado. Substitua qualquer credencial que tenha sido exposta em prints ou código anteriormente.
