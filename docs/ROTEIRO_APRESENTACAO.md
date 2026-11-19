# Roteiro de apresentação — VitaSonora (Entrega 4)

Tempo sugerido: 5–7 minutos; adaptar ao tempo dado pela professora.

## 1. Problema e solução (45 segundos)
O VitaSonora é um espaço para compartilhar histórias sobre como a música influencia lembranças, sentimentos e bem-estar. Relaciona-se ao ODS 3 (saúde e bem-estar). É uma comunidade de relatos, **não** um aplicativo de atendimento psicológico nem substitui cuidados profissionais.

## 2. Tecnologias (45 segundos)
- React Native com Expo: telas e navegação.
- React Navigation: troca entre Início, Entrar, Comunidade, Relato e Usuários.
- Fetch: comunicação com API REST.
- Node.js + Express: rotas da aplicação e regras de autorização.
- MySQL: usuários, relatos e comentários.

## 3. Demonstração (2 minutos)
1. Mostrar tela inicial e Comunidade sem login.
2. Criar usuário de demonstração (ou usar conta teste) e fazer login.
3. Publicar um relato de teste, comentar, editar e confirmar a exclusão.
4. Mostrar que um usuário comum não pode modificar conteúdo de outro.
5. Demonstrar a tela administrativa com conta de administrador previamente preparada.

## 4. Segurança (1 minuto)
- bcryptjs armazena **hash**, não a senha legível.
- Ao fazer login, a API emite JWT com validade de 8 horas.
- O aplicativo envia `Authorization: Bearer TOKEN` nas requisições autenticadas.
- Middleware valida token e consulta o nível atual do usuário no banco.
- Rotas administrativas respondem 401 (sem login) ou 403 (sem permissão).
- `.env`, segredo JWT e senha MySQL não vão para o repositório.

## 5. Banco + GitHub + APK (1 minuto)
Mostrar a estrutura das tabelas `usuarios`, `relatos` e `comentarios` no Workbench. Abrir o histórico no GitHub e, quando disponível, mostrar o APK e a página do build. Para demonstração em Wi-Fi, conferir antes se o celular consegue acessar a API.

## 6. Conclusão (30 segundos)
Dizer o que foi entregue, as limitações (API requer servidor; dados de CPF pedem cuidados de privacidade) e possibilidades futuras (moderação, acessibilidade e hospedagem permanente).

## Perguntas possíveis da professora
**Por que JWT?** Para autenticar requisições sem enviar a senha em cada chamada.

**O que é middleware?** Função que verifica token e permissões antes da rota protegida.

**Por que bcrypt?** Para armazenar um hash resistente a ataques, em vez de guardar senhas em texto.

**Qual o papel do MySQL?** Persistir dados, com relações entre usuários, relatos e comentários.

**Por que o APK pode não funcionar fora de casa?** Porque backend e MySQL são serviços separados; a URL da API deve ser acessível pelo celular.
