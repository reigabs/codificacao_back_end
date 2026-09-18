import dotenv from 'dotenv';
dotenv.config();

function iniciarAplicacao(){
    const porta = process.env.PORT || 8080;
    const apiKey = process.env.API_key_PAGAMENTO;
    const dbUrl = process.env.DATABASE_URL;

    if(!apiKey) {
        console.error(`[ERRO CRÍTICO]: A chave API_KEY_PAGAMENTO não está definida nas variáveis de ambiente!`);
        process.exit(1);   
    }
    console.log('=== SERVIÇO DE CONFIGURAÇÂO CARREGADO ||| ===');
    console.log(`Serviço Rodando na porta ${porta}`);
    console.log(`Banco de dados: ${dbUrl}`);
    console.log(`APIKey: ${apiKey}`);
    console.log(`Status da API: Chave de tamanho ${apiKey.length} autenticada.`);

}

iniciarAplicacao();