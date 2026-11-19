const jwt = require('jsonwebtoken');
const pool = require('./db');

function gerarToken(usuario) {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    throw new Error('Configure JWT_SECRET com pelo menos 32 caracteres');
  }
  return jwt.sign(
    { sub: String(usuario.id), nivel: usuario.nivel },
    process.env.JWT_SECRET,
    { algorithm: 'HS256', expiresIn: '8h' }
  );
}

async function autenticar(req, res, next) {
  const match = /^Bearer (.+)$/i.exec(req.headers.authorization || '');
  if (!match) return res.status(401).json({ erro: 'Bearer Token obrigatório' });

  let payload;
  try {
    payload = jwt.verify(match[1], process.env.JWT_SECRET, { algorithms: ['HS256'] });
  } catch {
    return res.status(401).json({ erro: 'Token inválido ou expirado' });
  }

  try {
    const [rows] = await pool.execute(
      'SELECT id,nome,usuario,email,nivel FROM usuarios WHERE id=?',
      [payload.sub]
    );
    if (!rows.length) return res.status(401).json({ erro: 'Usuário não existe' });
    req.usuario = rows[0];
    next();
  } catch (error) {
    next(error);
  }
}

function somenteAdmin(req, res, next) {
  if (req.usuario?.nivel !== 'admin') {
    return res.status(403).json({ erro: 'Acesso somente para administrador' });
  }
  next();
}

module.exports = { gerarToken, autenticar, somenteAdmin };
