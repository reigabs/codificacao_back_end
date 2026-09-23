# Aula 08 e 09 — Métodos GET, POST, PATCH e DELETE no NestJS

## Descrição
Implementação de um backend completo utilizando NestJS com operações de cadastro, listagem, atualização e remoção de convidados, seguindo os padrões REST e a arquitetura modular do NestJS.

## Tecnologias Utilizadas
- Node.js
- NestJS
- TypeScript
- Observabilidade com createObservModule

## Estrutura do Projeto
aula08-09-metodo-get-post-patch-delete/
├── src/
│   ├── app.module.ts                  # Módulo principal da aplicação
│   ├── convidados.controller.ts       # Definição das rotas / controlador
│   ├── convidados.service.ts          # Regras de negócio e armazenamento
│   ├── criar-convidado.dto.ts          # Padronização dos dados de entrada
│   ├── app.controller.ts
│   └── app.service.ts
├── test/
├── package.json
├── tsconfig.json
└── README.md

## Endpoints

| Método | Rota | Descrição |
|---|---|---|
| GET | /convidados | Listar todos os convidados cadastrados |
| POST | /convidados | Cadastrar um novo convidado |
| PATCH | /convidados/:id | Atualizar a idade de um convidado pelo ID |
| DELETE | /convidados/:id | Remover um convidado da lista |

## Detalhamento dos Arquivos

### 1. criar-convidado.dto.ts
Define o formato dos dados que a API espera receber no cadastro:
- nome: string
- idade: number

Garante que os dados recebidos terão os nomes e tipos corretos. Funciona como um "contrato" entre o cliente e a API.

### 2. convidados.service.ts
Contém toda a lógica e os dados. O controlador nunca acessa os dados diretamente — sempre chama o serviço.

Propriedade de armazenamento:
- private convidados = []
- Lista em memória — os dados são mantidos enquanto o servidor estiver rodando
- private: só a própria classe pode alterar diretamente

Métodos:
- listarConvidados() → retorna a lista completa
- criarConvidado(dados) → gera ID automático, adiciona na lista e retorna o criado
- encontrarConvidado(id) → busca um convidado pelo ID
- atualizarIdade(id, idade) → localiza e altera a idade; retorna o convidado atualizado
- removerConvidadoLista(id) → encontra a posição com findIndex, remove com splice; lança NotFoundException se o ID não existir

### 3. convidados.controller.ts
É a "porta de entrada" da API: recebe a requisição HTTP, chama o serviço e devolve a resposta.

Decoradores utilizados:
- @Controller('convidados') → todas as rotas começam com /convidados
- @Get(), @Post(), @Patch(), @Delete() → definem o método HTTP
- @Param('id') → captura o valor da URL
- @Body() → lê os dados enviados no corpo da requisição

Funcionamento de cada rota:
- GET → retorna this.convidadoService.listarConvidados()
- POST → recebe nome e idade, registra no console e retorna mensagem de sucesso
- PATCH → converte o ID de texto para número (+id), recebe a nova idade e chama a atualização
- DELETE → chama a remoção; se o ID não existir, o serviço lança o erro automaticamente

### 4. app.module.ts
Registra todos os componentes para o NestJS reconhecer:
- controllers: [AppController, ConvidadosController]
- providers: [AppService, ConvidadosService]

Sem registrar aqui, as rotas não funcionam. Também importa o módulo de observabilidade que exibe no terminal cada rota mapeada.

## Como Executar

# Instalar dependências
npm install

# Iniciar servidor em modo desenvolvimento
npm run start:dev

Ao iniciar, será exibido no terminal:
[Nest] Application successfully started
Mapped /convidados — GET
Mapped /convidados — POST
Mapped /convidados/:id — PATCH
Mapped /convidados/:id — DELETE

## Exemplos de Requisições

### Cadastrar (POST)
{
  "nome": "Maria Silva",
  "idade": 28
}

Resposta:
{
  "mensagem": "Convidado \"Maria Silva\" adicionado com sucesso!",
  "dados": {
    "nome": "Maria Silva",
    "idade": 28
  }
}

### Atualizar Idade (PATCH /1)
{
  "idade": 29
}

### Remover (DELETE /1)
Retorna mensagem de confirmação ou erro 404 se o ID não existir.

## Tratamento de Erros
- Ao tentar acessar ou remover um ID inexistente, o serviço lança NotFoundException
- O NestJS retorna automaticamente:
  - Código de status: 404 Not Found
  - Mensagem explicando que o convidado não foi encontrado

## Resumo do Aprendizado
- Estrutura de projeto com módulos, controladores e serviços
- Implementação dos 4 métodos principais do HTTP
- Uso de DTO para padronizar dados
- Injeção de dependência
- Armazenamento em memória com manipulação de arrays
- Tratamento de erros com exceções
- Conversão de tipos e parâmetros de rota
- Respostas estruturadas e mensagens amigáveis

## Próximos Passos
- Conectar a um banco de dados (PostgreSQL, MongoDB...)
- Adicionar validação automática com class-validator
- Implementar autenticação
- Criar testes automatizados