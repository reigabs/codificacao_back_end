ula 05 — Variáveis de Ambiente, Configurações e Segurança

🎯 Objetivo

Aprender a utilizar variáveis de ambiente em uma aplicação Node.js, mantendo configurações e informações sensíveis separadas do código-fonte.

Nesta aula foram trabalhados:

dotenv e process.env;

arquivo .env;

arquivo .env.example;

.gitignore;

validação de configurações;

execução da aplicação pelo Node.js;

cuidados com chaves de API e dados sensíveis.

📁 Estrutura

aula05-variaveis-ambiente-configuracoes-seguranca/
├── node_modules/
├── .env
├── .env.example
├── .gitignore
├── app.js
├── package.json
├── package-lock.json
└── README.md

Arquivos principais

.env → armazena os valores reais das configurações.

.env.example → modelo das variáveis necessárias, sem dados sensíveis.

.gitignore → impede o envio de .env, node_modules e logs.

app.js → código principal da atividade.

package.json → configurações e dependências do projeto.

1. Inicialização do projeto

O projeto Node.js foi inicializado com:

npm init -y

Depois foram instaladas as dependências:

npm install dotenv express

No package.json, foi utilizado:

"type": "module"

para permitir o uso de import.

2. Variáveis de ambiente

Foi criado o arquivo .env:

PORT=3000
API_KEY_PAGAMENTO=sua_chave_aqui
DATABASE_URL=mongodb://localhost:27017/meu_banco

Essas informações são acessadas pelo código através de process.env.

Também foi criado o .env.example para indicar quais variáveis são necessárias sem expor seus valores reais.

3. Segurança com .gitignore

O .gitignore utilizado foi:

.env
node_modules/
*.log

O objetivo é evitar que informações sensíveis, dependências e arquivos de log sejam enviados para o Git.

4. Código do app.js

import dotenv from 'dotenv';

dotenv.config();

function iniciarAplicacao() {
    const porta = process.env.PORT || 8080;
    const apiKey = process.env.API_KEY_PAGAMENTO;
    const dbUrl = process.env.DATABASE_URL;

    if (!apiKey) {
        console.error('[ERRO CRÍTICO]: A chave API_KEY_PAGAMENTO não está definida nas variáveis de ambiente!');
        process.exit(1);
    }

    console.log('=== SERVIÇO DE CONFIGURAÇÃO CARREGADO ||| ===');
    console.log(`Serviço Rodando na porta ${porta}`);
    console.log(`Banco de dados: ${dbUrl}`);
    console.log(`APIKey: ${apiKey}`);
    console.log(`Status da API: Chave de tamanho ${apiKey.length} autenticada.`);
}

iniciarAplicacao();

Funcionamento

O comando:

dotenv.config();

carrega as informações do .env.

Depois, elas são acessadas com:

process.env.PORT
process.env.API_KEY_PAGAMENTO
process.env.DATABASE_URL

A chave da API é validada antes da aplicação continuar:

if (!apiKey) {
    process.exit(1);
}

5. Execução

Para executar:

node app.js

O terminal apresenta as configurações carregadas, como:

=== SERVIÇO DE CONFIGURAÇÃO CARREGADO ||| ===
Serviço Rodando na porta 3000
Banco de dados: mongodb://localhost:27017/meu_banco
Status da API: Chave de tamanho ... autenticada.

6. Comandos Git

Verificar alterações:

git status

Adicionar arquivos:

git add .

Criar commit:

git commit -m "docs(aula05): adiciona documentacao da aula"

Enviar para o GitHub:

git push origin main

O arquivo .env não deve ser enviado ao repositório.

📚 Conceitos aprendidos

Variáveis de ambiente;

dotenv;

process.env;

configuração de aplicações Node.js;

validação de variáveis obrigatórias;

.env e .env.example;

.gitignore;

segurança de informações sensíveis;

NPM e Git.

📝 Conclusão

A aula mostrou como configurar uma aplicação Node.js de forma mais organizada e segura, mantendo configurações fora do código-fonte e evitando o versionamento de informações sensíveis.