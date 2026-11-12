require('dotenv').config();
if(!process.env.JWT_SECRET||process.env.JWT_SECRET.length<32){console.error('Defina JWT_SECRET de 32+ caracteres em backend/.env');process.exit(1)}
const app=require('./app');const port=Number(process.env.PORT||3000);
app.listen(port,'0.0.0.0',()=>console.log(`VitaSonora API Entrega 3: http://localhost:${port}`));
