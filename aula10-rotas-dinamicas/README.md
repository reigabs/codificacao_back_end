# Aula 10 — Rotas Dinâmicas e Parâmetros no NestJS

## Descrição
Implementação de rotas dinâmicas com parâmetros, conversão de tipos e tratamento de erros em uma API de consulta de jogos. Construída com NestJS e TypeScript, seguindo a arquitetura modular com Controller, Service e Module.

## Tecnologias Utilizadas
- Node.js
- NestJS
- TypeScript
- ParseIntPipe — conversão automática de tipo
- NotFoundException — tratamento de erro padrão do NestJS

## Estrutura do Projeto
aula10-rotas-dinamicas/
├── src/
│   ├── app.module.ts           # Módulo principal
│   ├── app.controller.ts       # Rota de status do servidor
│   ├── app.service.ts          # Serviço de status
│   ├── jogos.controller.ts     # Rotas dinâmicas de jogos
│   └── jogos.service.ts        # Dados e lógica de consulta
├── test/
├── package.json
└── README.md

## Endpoints

| Método | Rota | Descrição |
|---|---|---|
| GET | /status | Verificar se o servidor está ativo |
| GET | /jogos/:id | Buscar um jogo pelo ID (número) |

## Detalhamento dos Arquivos

### 1. app.service.ts
Serviço que retorna o status da aplicação:
- getHello() → retorna o texto "Status Servidor: Ativo"

### 2. app.controller.ts
Controlador da rota de status:
- @Controller('status') → rota base /status
- @Get() → responde com o status do serviço

### 3. jogos.service.ts
Armazena a lista de jogos e contém a lógica de busca:

Lista de jogos em memória:
- id: 1 → Minecraft, Mojang Studios
- id: 2 → The Legend of Zelda: Ocarina of Time, Nintendo
- id: 3 → Grand Theft Auto V, Rockstar North
- id: 4 → Elden Ring, FromSoftware
- id: 5 → God of War, Santa Monica Studio

Método buscarPorId(id: number):
- Percorre a lista procurando o jogo com o ID informado
- Se não encontrar → lança NotFoundException com mensagem explicativa
- Se encontrar → retorna o objeto completo do jogo

### 4. jogos.controller.ts
Define as rotas dinâmicas e recebe os parâmetros:

- @Controller('jogos') → rota base /jogos
- @Get(':id') → rota dinâmica; o valor depois de /jogos/ é capturado como id
- @Param('id', ParseIntPipe) → extrai da URL e converte para número inteiro
- Encaminha ao serviço e retorna o resultado

Conceitos aplicados:
- :id → parâmetro dinâmico na rota
- ParseIntPipe → valida e converte o tipo automaticamente
- Separação: Controller recebe requisição → Service executa a lógica

### 5. app.module.ts
Registra todos os componentes para o NestJS reconhecer:
- controllers → AppController, JogosController
- providers → AppService, JogosService
- Sem registro, as rotas e serviços não funcionam

## Como Executar

# Instalar dependências
npm install

# Iniciar servidor em modo desenvolvimento
npm run start:dev

Ao iniciar, o terminal exibe:
[Nest] Application successfully started
Mapped /status — GET
Mapped /jogos/:id — GET

## Exemplos de Requisições

### Consultar status do servidor
GET /status
Resposta: Status Servidor: Ativo

### Buscar jogo por ID existente
GET /jogos/1
Resposta:
{
  "id": 1,
  "titulo": "Minecraft",
  "estudio": "Mojang Studios"
}

### Buscar jogo por ID inexistente
GET /jogos/99
Resposta → Status 404:
{
  "statusCode": 404,
  "message": "Jogo com ID 99 não localizado em nosso estoque",
  "error": "Not Found"
}

## Funcionamento da Rota Dinâmica

Acessando /jogos/2:
1. O NestJS identifica que 2 é o valor do parâmetro :id
2. @Param com ParseIntPipe converte de texto para número
3. O valor é enviado ao serviço buscarPorId(2)
4. O serviço procura na lista → encontra o jogo
5. O jogo é retornado como resposta JSON

Se o ID não existir:
- O serviço lança NotFoundException
- O NestJS formata automaticamente a resposta com status 404 e mensagem

## Resumo do Aprendizado
- Criar rotas com parâmetros dinâmicos usando :id
- Extrair valores da URL com @Param()
- Converter tipos com ParseIntPipe
- Separar responsabilidades entre Controller e Service
- Usar exceções nativas do NestJS para tratamento de erros
- Retornar códigos de status HTTP corretos automaticamente
- Estruturar projeto modularmente com @Module()

## Próximos Passos
- Adicionar rota para listar todos os jogos
- Implementar cadastro, edição e remoção
- Conectar a um banco de dados persistente
- Criar DTOs para validação de dados