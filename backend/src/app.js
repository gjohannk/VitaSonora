const express=require('express');
const cors=require('cors');
const bcrypt=require('bcryptjs');
const pool=require('./db');
const {texto,emailValido,idValido}=require('./utils');
const {gerarToken,autenticar,somenteAdmin}=require('./auth');
const app=express();app.use(cors());app.use(express.json({limit:'64kb'}));
app.get('/api/saude',(_req,res)=>res.json({status:'ok',etapa:3}));
app.post('/api/auth/cadastro',async(req,res,next)=>{try{
 const nome=texto(req.body?.nome,90),usuario=texto(req.body?.usuario,50),email=texto(req.body?.email,180).toLowerCase(),senha=req.body?.senha,cpf=texto(req.body?.cpf,20).replace(/\D/g,'');
 if(!nome||usuario.length<3||!emailValido(email)||typeof senha!=='string'||senha.length<8||senha.length>72||cpf&&(cpf.length!==11||/^([0-9])\1{10}$/.test(cpf)))return res.status(400).json({erro:'Dados inválidos. Usuário mínimo 3 caracteres, senha 8 a 72 e CPF com 11 dígitos quando informado.'});
 const hash=await bcrypt.hash(senha,12);const [r]=await pool.execute('INSERT INTO usuarios(nome,usuario,email,cpf,senha_hash,nivel) VALUES (?,?,?,?,?,?)',[nome,usuario,email,cpf||null,hash,'usuario']);
 const novo={id:r.insertId,nome,usuario,email,nivel:'usuario'};res.status(201).json({usuario:novo,token:gerarToken(novo)});
 }catch(e){if(e.code==='ER_DUP_ENTRY')return res.status(409).json({erro:'E-mail, nome de usuário ou CPF já cadastrado'});next(e)}});
app.post('/api/auth/login',async(req,res,next)=>{try{
 const identificador=texto(req.body?.identificador,180),senha=req.body?.senha;
 if(!identificador||typeof senha!=='string')return res.status(400).json({erro:'Informe usuário/e-mail e senha'});
 const [rows]=await pool.execute('SELECT * FROM usuarios WHERE usuario=? OR email=? LIMIT 1',[identificador,identificador.toLowerCase()]);const u=rows[0];
 if(!u||!(await bcrypt.compare(senha,u.senha_hash)))return res.status(401).json({erro:'Credenciais inválidas'});
 const seguro={id:u.id,nome:u.nome,usuario:u.usuario,email:u.email,nivel:u.nivel};res.json({usuario:seguro,token:gerarToken(seguro)});
 }catch(e){next(e)}});
app.get('/api/auth/me',autenticar,(req,res)=>res.json(req.usuario));
const selecionar='SELECT r.id,r.usuario_id,r.titulo,r.conteudo,r.tema,r.criado_em,r.atualizado_em,u.nome AS autor_nome FROM relatos r JOIN usuarios u ON u.id=r.usuario_id';
app.get('/api/relatos',async(_req,res,next)=>{try{const [r]=await pool.execute(`${selecionar} ORDER BY r.criado_em DESC,r.id DESC`);res.json(r);}catch(e){next(e)}});
app.get('/api/relatos/:id',async(req,res,next)=>{try{if(!idValido(req.params.id))return res.status(400).json({erro:'ID inválido'});const [r]=await pool.execute(`${selecionar} WHERE r.id=?`,[req.params.id]);if(!r.length)return res.status(404).json({erro:'Relato não encontrado'});res.json(r[0]);}catch(e){next(e)}});
app.post('/api/relatos',autenticar,async(req,res,next)=>{try{
 const titulo=texto(req.body?.titulo,150),conteudo=texto(req.body?.conteudo,5000),tema=texto(req.body?.tema,80)||'Bem-estar';if(!titulo||!conteudo)return res.status(400).json({erro:'Título e conteúdo obrigatórios'});
 const [r]=await pool.execute('INSERT INTO relatos(usuario_id,titulo,conteudo,tema) VALUES(?,?,?,?)',[req.usuario.id,titulo,conteudo,tema]);res.status(201).json({id:r.insertId,usuario_id:req.usuario.id,titulo,conteudo,tema});
 }catch(e){next(e)}});
async function podeEditarRelato(req,res,next){try{if(!idValido(req.params.id))return res.status(400).json({erro:'ID inválido'});const [rows]=await pool.execute('SELECT usuario_id FROM relatos WHERE id=?',[req.params.id]);if(!rows.length)return res.status(404).json({erro:'Relato não encontrado'});if(rows[0].usuario_id!==req.usuario.id&&req.usuario.nivel!=='admin')return res.status(403).json({erro:'Você não tem permissão para este relato'});next();}catch(e){next(e)}}
app.put('/api/relatos/:id',autenticar,podeEditarRelato,async(req,res,next)=>{try{const titulo=texto(req.body?.titulo,150),conteudo=texto(req.body?.conteudo,5000),tema=texto(req.body?.tema,80)||'Bem-estar';if(!titulo||!conteudo)return res.status(400).json({erro:'Título e conteúdo obrigatórios'});await pool.execute('UPDATE relatos SET titulo=?,conteudo=?,tema=? WHERE id=?',[titulo,conteudo,tema,req.params.id]);res.json({id:Number(req.params.id),titulo,conteudo,tema});}catch(e){next(e)}});
app.delete('/api/relatos/:id',autenticar,podeEditarRelato,async(req,res,next)=>{try{await pool.execute('DELETE FROM relatos WHERE id=?',[req.params.id]);res.json({mensagem:'Relato excluído'});}catch(e){next(e)}});
app.get('/api/relatos/:id/comentarios',async(req,res,next)=>{try{if(!idValido(req.params.id))return res.status(400).json({erro:'ID inválido'});const [rows]=await pool.execute('SELECT c.id,c.relato_id,c.usuario_id,c.texto,c.criado_em,u.nome AS autor_nome FROM comentarios c JOIN usuarios u ON u.id=c.usuario_id WHERE c.relato_id=? ORDER BY c.id DESC',[req.params.id]);res.json(rows);}catch(e){next(e)}});
app.post('/api/relatos/:id/comentarios',autenticar,async(req,res,next)=>{try{if(!idValido(req.params.id))return res.status(400).json({erro:'ID inválido'});const textoComentario=texto(req.body?.texto,1000);if(!textoComentario)return res.status(400).json({erro:'Comentário vazio'});const [rows]=await pool.execute('SELECT id FROM relatos WHERE id=?',[req.params.id]);if(!rows.length)return res.status(404).json({erro:'Relato não encontrado'});const [r]=await pool.execute('INSERT INTO comentarios (relato_id,usuario_id,texto) VALUES (?,?,?)',[req.params.id,req.usuario.id,textoComentario]);res.status(201).json({id:r.insertId,texto:textoComentario});}catch(e){next(e)}});
app.delete('/api/comentarios/:id',autenticar,async(req,res,next)=>{try{if(!idValido(req.params.id))return res.status(400).json({erro:'ID inválido'});const [rows]=await pool.execute('SELECT usuario_id FROM comentarios WHERE id=?',[req.params.id]);if(!rows.length)return res.status(404).json({erro:'Comentário não encontrado'});if(req.usuario.nivel!=='admin'&&rows[0].usuario_id!==req.usuario.id)return res.status(403).json({erro:'Sem permissão'});await pool.execute('DELETE FROM comentarios WHERE id=?',[req.params.id]);res.json({mensagem:'Comentário excluído'});}catch(e){next(e)}});
app.get('/api/usuarios',autenticar,somenteAdmin,async(req,res,next)=>{try{const [rows]=await pool.execute('SELECT id,nome,usuario,email,nivel,criado_em FROM usuarios ORDER BY id');res.json(rows);}catch(e){next(e)}});
app.patch('/api/usuarios/:id/nivel',autenticar,somenteAdmin,async(req,res,next)=>{try{if(!idValido(req.params.id)||!['usuario','admin'].includes(req.body?.nivel))return res.status(400).json({erro:'Dados inválidos'});if(Number(req.params.id)===req.usuario.id)return res.status(400).json({erro:'Não altere seu próprio nível'});const [r]=await pool.execute('UPDATE usuarios SET nivel=? WHERE id=?',[req.body?.nivel,req.params.id]);if(!r.affectedRows)return res.status(404).json({erro:'Usuário não encontrado'});res.json({mensagem:'Nível atualizado'});}catch(e){next(e)}});
app.use((err,_req,res,_next)=>{if(err.type==='entity.parse.failed')return res.status(400).json({erro:'JSON inválido'});if(err.type==='entity.too.large')return res.status(413).json({erro:'Corpo da requisição muito grande'});console.error(err.code || err.name);res.status(500).json({erro:'Erro interno do servidor'});});
module.exports=app;
