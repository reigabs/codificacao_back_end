//! importando Commonjs o modulo os
const os = require ('os');

const plataforma = os.platform;
const memoriaTotal = (os.totalmem() / (1024 ** 3)).toFixed(2);
const memoriaLivre = (os.freemem() / (1024 ** 3)).toFixed(2);
const processador = os.cpus();

console.log('=== DIAGNOSTICO DO SERVIDOR ===\n');
console.log(`Arquitetura OS: ${plataforma}`);
console.log(`Memoria RAM Total: ${memoriaTotal}`);
console.log(`Memoria RAM Livre: ${memoriaLivre}`);
console.log(`Cores do Processador: ${processador.length}`);
console.log(`Processador: ${processador[0].model}`);
console.log(`Velocidade de Processador: ${processador[0].speed} MHz`);
