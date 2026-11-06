const test=require('node:test');const assert=require('node:assert/strict');
const {texto,idValido}=require('../src/utils');
test('normaliza texto',()=>assert.equal(texto('  música  '),'música'));
test('rejeita id vazio',()=>assert.equal(idValido(0),false));
