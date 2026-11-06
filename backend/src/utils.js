function texto(v,max=5000){return typeof v==='string' ? v.trim().slice(0,max) : '';}
function emailValido(v){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v||'');}
function idValido(v){return Number.isSafeInteger(Number(v))&&Number(v)>0;}
module.exports={texto,emailValido,idValido};
