CREATE DATABASE IF NOT EXISTS vitasonora_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE vitasonora_db;
CREATE TABLE IF NOT EXISTS relatos (
 id INT AUTO_INCREMENT PRIMARY KEY,
 autor_nome VARCHAR(90) NOT NULL,
 titulo VARCHAR(150) NOT NULL,
 conteudo TEXT NOT NULL,
 tema VARCHAR(80) NOT NULL DEFAULT 'Bem-estar',
 criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO relatos (autor_nome,titulo,conteudo,tema)
SELECT 'Comunidade VitaSonora','A música na minha vida','A música pode acompanhar momentos marcantes e aproximar pessoas.','Memórias'
WHERE NOT EXISTS(SELECT 1 FROM relatos WHERE titulo='A música na minha vida');
