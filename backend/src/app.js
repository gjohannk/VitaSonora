const express=require('express');
const cors=require('cors');
const pool=require('./db');
const {texto,idValido}=require('./utils');
const app=express();app.use(cors());app.use(express.json({limit:'64kb'}));
app.get('/api/saude',(_req,res)=>res.json({status:'ok',etapa:2}));
app.get('/api/relatos',async(_req,res,next)=>{try{const [rows]=await pool.execute('SELECT id, autor_nome, titulo, conteudo, tema, criado_em FROM relatos ORDER BY criado_em DESC,id DESC');res.json(rows);}catch(e){next(e)}});
app.get('/api/relatos/:id',async(req,res,next)=>{try{if(!idValido(req.params.id))return res.status(400).json({erro:'ID inválido'});const [rows]=await pool.execute('SELECT * FROM relatos WHERE id=?',[req.params.id]);if(!rows.length)return res.status(404).json({erro:'Relato não encontrado'});res.json(rows[0]);}catch(e){next(e)}});
app.post('/api/relatos',async(req,res,next)=>{try{
 const autor=texto(req.body.autor_nome,90),titulo=texto(req.body.titulo,150),conteudo=texto(req.body.conteudo,5000),tema=texto(req.body.tema,80)||'Bem-estar';
 if(!autor||!titulo||!conteudo)return res.status(400).json({erro:'Autor, título e conteúdo são obrigatórios'});
 const [result]=await pool.execute('INSERT INTO relatos(autor_nome,titulo,conteudo,tema) VALUES (?,?,?,?)',[autor,titulo,conteudo,tema]);res.status(201).json({id:result.insertId,autor_nome:autor,titulo,conteudo,tema});
 }catch(e){next(e)}});
app.use((err,req,res,_next)=>{console.error(err);res.status(500).json({erro:'Erro interno do servidor'});});
module.exports=app;
