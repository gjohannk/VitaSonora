const jwt=require('jsonwebtoken');
const pool=require('./db');
function gerarToken(u){if(!process.env.JWT_SECRET||process.env.JWT_SECRET.length<32)throw Error('Configure JWT_SECRET com pelo menos 32 caracteres');return jwt.sign({sub:String(u.id),nivel:u.nivel},process.env.JWT_SECRET,{expiresIn:'8h'});}
async function autenticar(req,res,next){const auth=req.headers.authorization||'';const match=/^Bearer (.+)$/i.exec(auth);if(!match)return res.status(401).json({erro:'Bearer Token obrigatório'});try{const payload=jwt.verify(match[1],process.env.JWT_SECRET,{algorithms:['HS256']});const [rows]=await pool.execute('SELECT id,nome,usuario,email,nivel FROM usuarios WHERE id=?',[payload.sub]);if(!rows.length)return res.status(401).json({erro:'Usuário não existe'});req.usuario=rows[0];next();}catch(e){return res.status(401).json({erro:'Token inválido ou expirado'});}}
function somenteAdmin(req,res,next){if(req.usuario?.nivel!=='admin')return res.status(403).json({erro:'Acesso somente para administrador'});next();}
module.exports={gerarToken,autenticar,somenteAdmin};
