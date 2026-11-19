# Entrega 4 — Checklist de validação (VitaSonora)

Marque [x] **somente depois do teste prático**. Não declare um APK pronto apenas porque o código compila.

## Pré-requisitos
- [ ] API configurada em `backend/.env`, com MySQL acessível e `JWT_SECRET` de 32+ caracteres.
- [ ] Banco da Entrega 3 preparado: `usuarios`, `relatos` e `comentarios`.
- [ ] Backend inicia e `GET /api/saude` responde `status: ok`.
- [ ] App inicia no navegador; no Android, a API está acessível pelo endereço configurado no build.

## Funcionalidades e permissões
- [ ] Visitante pode visualizar relatos, mas não publicar.
- [ ] Cadastro cria usuário no nível `usuario` e senha fica armazenada em hash.
- [ ] Login válido funciona; senha incorreta retorna erro.
- [ ] Token ausente retorna 401 em rota privada; token inválido também.
- [ ] Usuário A cria, lê, edita e exclui o próprio relato.
- [ ] Usuário B não pode editar ou excluir relato de A (403 ao tentar na API).
- [ ] Comentário é publicado e aparece após recarregar.
- [ ] Usuário consegue excluir seu comentário; terceiro sem permissão recebe 403.
- [ ] Administrador vê tela de usuários e pode moderar relatos e comentários.
- [ ] Usuário comum não acessa lista administrativa (403).
- [ ] Logout remove a sessão local.
- [ ] Mensagens de erro e confirmação de exclusão funcionam no navegador e no Android.

## Finalização
- [x] Os dois testes unitários de validação do backend passaram.
- [ ] O Gradle concluiu `:app:assembleRelease`.
- [ ] README e guia do APK atualizados, sem senha nem token.
- [ ] APK compilado localmente com Gradle e instalado em um Android real.
- [ ] Teste de cadastro, login e CRUD feito **no APK**, com API acessível.
- [ ] Código e documentação da mesma versão enviados ao GitHub.
- [ ] Link do APK e link do repositório anexados à entrega.
- [ ] Apresentação ensaiada com o roteiro em `docs/ROTEIRO_APRESENTACAO.md`.

## Registro de testes

Em 19/11/2026, o teste HTTP com MySQL local confirmou cadastro, login, JWT, CRUD de relatos, comentários e permissões. A transação foi revertida ao final. Os testes da interface e do APK têm registro próprio.
| Data | Cenário | Resultado | Evidência | Observações |
|---|---|---|---|---|
| ____ | Cadastro/login | [ ] passou [ ] falhou | screenshot | |
| ____ | Criar/editar/excluir relato | [ ] passou [ ] falhou | screenshot | |
| ____ | Comentários | [ ] passou [ ] falhou | screenshot | |
| ____ | Admin/403 | [ ] passou [ ] falhou | HTTP/teste | |
| ____ | APK instalado e conectado | [ ] passou [ ] falhou | foto/print | |

## Versão entregue

- Commit usado no Gradle: pendente.
- APK e SHA-256: pendentes.
- Teste em Android físico: pendente.
