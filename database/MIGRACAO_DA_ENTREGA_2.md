# Atenção: migração da Entrega 2

O banco da Entrega 2 possui uma tabela `relatos` sem `usuario_id`. A Entrega 3 exige associação entre usuário e relato. O script principal `vitasonora.sql` cria um **banco novo**, não converte automaticamente a tabela antiga.

**Para teste escolar sem preservar dados anteriores:** faça backup do banco da Entrega 2 e, em seguida, crie uma base vazia (por exemplo, `vitasonora_db`) antes de importar `database/vitasonora.sql`. Para isso, não execute o script novo sobre a tabela antiga.

**Para preservar relatos:** exporte os relatos antigos, crie uma base nova, cadastre um usuário e faça uma migração manual preenchendo `usuario_id` para cada relato. Não apague dados reais sem backup.
