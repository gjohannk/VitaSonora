# VitaSonora — Proposta (Entrega 1)

## Problema atual e contexto
O bem-estar emocional e a saúde mental são preocupações sociais importantes. Muitas pessoas têm experiências marcantes relacionadas à música, mas nem sempre encontram espaços acolhedores para relatar essas vivências e conversar com outras pessoas. O projeto se conecta ao **ODS 3 — Saúde e Bem-Estar**.

## Público afetado
Pessoas que ouvem música e desejam compartilhar sentimentos, lembranças e experiências, incluindo jovens e adultos interessados na relação entre música e bem-estar.

## Justificativa
Uma comunidade temática pode incentivar o diálogo, a expressão pessoal, o apoio mútuo e a conscientização sobre o papel da música na vida cotidiana. O aplicativo não promete tratar doenças nem substitui profissionais de saúde.

## Solução e nome
**VitaSonora:** aplicativo mobile de comunidade/blog para compartilhar relatos sobre como a música influencia experiências e emoções.

## Funcionalidades planejadas
- Visualizar blog e relatos por tema.
- Cadastrar e autenticar usuários.
- Publicar, editar e excluir relatos próprios.
- Comentar e curtir publicações.
- Navegar pelas páginas Sobre e Contato.
- Moderação de publicações e comentários.

## Tipos e permissões de usuários (previstos)
- **Usuário comum:** ler publicações e comentários, criar e gerenciar seus próprios relatos e comentários, curtir posts.
- **Administrador/moderador:** permissões do usuário comum, além de moderar e excluir conteúdo inadequado e gerenciar usuários conforme regras definidas posteriormente.

Na Entrega 1, os papéis são **planejamento**, não permissões ativas: a aplicação ainda não tem backend, banco, autenticação ou JWT.

## Telas previstas
1. Início — apresentação da proposta e acesso aos demais conteúdos.
2. Cadastrar/Entrar — formulários visuais de registro e login.
3. Comunidade — temas do blog e prévia de comentários.
4. História — detalhe de um tema.
5. Sobre — objetivo social e ODS 3.
6. Contato — formulário visual de contato.

## Fluxo inicial
Início → Cadastrar/Entrar; Início → Comunidade → História; Início → Sobre; Início → Contato; Comunidade → Cadastrar/Entrar.

## Entrega 1 implementada
Projeto Expo organizado em componentes, screens e theme; React Navigation com pilha nativa; seis telas navegáveis; identidade visual verde baseada no Canva; botões e campos visuais. **Sem cadastro persistente nem login real**: botões explicam que essas funções chegam em outras etapas.

## Próximas etapas (não implementadas agora)
Entrega 2: modelagem SQL, API Express e integração fetch. Entrega 3: hash, cadastro/login, JWT, níveis de acesso e CRUD. Entrega 4: testes, ajustes e APK.
