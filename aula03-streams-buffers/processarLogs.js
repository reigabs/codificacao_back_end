import fs from 'fs';
import  readline  from 'readline';

async function filtrarErrors(){

    console.log('Iniciando processamento com Stream...');
    exibirConsumoMemoria('Inicio');

    const streamLeitura = fs.createReadStream('servidor.log');
    const streamEscrita = fs.createWriteStream('apenas_erros.log');
    const leitorLinhaALinha = readline.createInterface({input: streamLeitura, crlfDelay: Infinity});

    let totalErrors = 0;
    let cabecalhoAtual = '';
    for await(const linha of leitorLinhaALinha) {
          // Guarda a linha que contém data, hora e número da linha
        if (linha.startsWith('[')) {
            cabecalhoAtual = linha;
        }
        if(linha.includes('ERROR')){
            streamEscrita.write(cabecalhoAtual + '\n')
            streamEscrita.write(linha + '\n');
            totalErrors++;
        }
    }

    exibirConsumoMemoria('Fim');
    console.log('Processamento Concluído \n');
    console.log(`Quantidade de Erros Encontrados: ${totalErrors} linhas.\n`);
}
filtrarErrors();

function exibirConsumoMemoria(consumo){
    const memoria = process.memoryUsage();
    const rssMB = (memoria.rss / 1024 /1024).toFixed(2);
    const heapMB = (memoria.heapUsed /1024/1024).toFixed(2);
    console.log(`[${consumo}] RSS: ${rssMB} MB | Heap Utilizado: ${heapMB} MB`);
}
