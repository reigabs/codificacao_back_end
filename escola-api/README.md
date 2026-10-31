# Escola API - Gerenciamento de Alunos

API REST desenvolvida com NestJS e TypeScript para gerenciamento de alunos, utilizando MongoDB como banco de dados e Mongoose para integração e persistência de informações.

## Tecnologias utilizadas

- **NestJS:** framework para desenvolvimento da API.
- **TypeScript:** linguagem utilizada no desenvolvimento.
- **MongoDB:** banco de dados NoSQL.
- **Mongoose:** integração com MongoDB.
- **class-validator:** validação dos dados recebidos.
- **class-transformer:** transformação de dados.
- **Postman:** testes das requisições HTTP.

## Instalação e execução

Instalar as dependências:

```bash
npm install
```

Instalar os pacotes de integração e validação:

```bash
npm install @nestjs/mongoose mongoose
npm install class-validator class-transformer
```

Iniciar o servidor em modo de desenvolvimento:

```bash
npm run start:dev
```

A API fica disponível em:

```text
http://localhost:3000
```

## Integração com MongoDB

A conexão com o banco de dados é realizada utilizando `@nestjs/mongoose`.

No `app.module.ts`, utiliza-se `MongooseModule.forRoot()`:

```typescript
MongooseModule.forRoot(
  'mongodb://localhost:27017/escola_db'
)
```

- `localhost`: endereço do servidor MongoDB.
- `27017`: porta padrão do MongoDB.
- `escola_db`: nome do banco de dados.

O Mongoose permite manipular documentos do MongoDB por meio de schemas e models.

## Schema e Model

O schema define a estrutura dos documentos armazenados na coleção de alunos.

A classe `Aluno` utiliza os decorators `@Schema()` e `@Prop()` para definir suas propriedades.

| Campo | Tipo | Descrição |
|---|---|---|
| `nome` | String | Nome do aluno. |
| `idade` | Number | Idade do aluno. |
| `matricula` | String | Matrícula única do aluno. |
| `curso` | Array de String | Cursos associados ao aluno. |

O `SchemaFactory.createForClass()` transforma a classe em um schema compatível com o Mongoose.

O tipo `HydratedDocument` representa um documento do MongoDB associado ao modelo.

## DTOs e validação de dados

DTO (Data Transfer Object) é utilizado para definir e controlar os dados recebidos pelas requisições da API.

### CreateAlunoDto

Utilizado no cadastro de alunos.

Validações implementadas com `class-validator`:

- `@IsString()`: verifica se o valor é uma string.
- `@IsNotEmpty()`: impede valores vazios.
- `@IsInt()`: exige um número inteiro.
- `@Min(0)`: estabelece o valor mínimo permitido.
- `@IsArray()`: verifica se o campo é um array.
- `@IsString({ each: true })`: valida cada elemento do array.
- `@ArrayMinSize(1)`: exige pelo menos um elemento no array.

### UpdateAlunoDto

Utilizado para receber os dados de atualização de um aluno, permitindo modificar somente os campos necessários.

## ValidationPipe

O NestJS disponibiliza o `ValidationPipe`, responsável por executar as validações dos DTOs antes de encaminhar os dados ao controller.

No `main.ts`, foi configurado globalmente:

```typescript
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
}));
```

Configurações:

- `whitelist`: remove propriedades que não possuem decorators de validação nos DTOs.
- `forbidNonWhitelisted`: rejeita propriedades não permitidas.
- `transform`: transforma os dados recebidos conforme os tipos definidos.

## Operações CRUD

CRUD representa as quatro operações fundamentais de manipulação de dados:

- **Create:** criação de registros.
- **Read:** leitura de registros.
- **Update:** atualização de registros.
- **Delete:** exclusão de registros.

Rotas implementadas:

| Método HTTP | Endpoint | Funcionalidade |
|---|---|---|
| POST | `/alunos` | Cadastrar aluno. |
| GET | `/alunos` | Listar todos os alunos. |
| GET | `/alunos/:id` | Buscar aluno pelo ID. |
| PATCH | `/alunos/:id` | Atualizar dados do aluno. |
| DELETE | `/alunos/:id` | Excluir aluno. |

### Controller

O `AlunosController` recebe as requisições HTTP e define os endpoints da aplicação.

Principais decorators:

- `@Controller()`: define a rota principal.
- `@Post()`: recebe requisições de cadastro.
- `@Get()`: recebe requisições de consulta.
- `@Patch()`: recebe requisições de atualização.
- `@Delete()`: recebe requisições de exclusão.
- `@Body()`: acessa os dados enviados no corpo da requisição.
- `@Param()`: acessa parâmetros da URL.

O controller encaminha as operações para o service, separando a comunicação HTTP das regras de negócio.

### Service

O `AlunosService` contém a lógica das operações realizadas pela API.

O modelo do Mongoose é injetado utilizando `@InjectModel(Aluno.name)`, permitindo acessar os métodos de manipulação dos documentos.

| Método Mongoose | Funcionalidade |
|---|---|
| `create()` | Cria um novo aluno. |
| `find().exec()` | Busca todos os alunos. |
| `findById().exec()` | Busca um aluno pelo ID. |
| `findByIdAndUpdate()` | Atualiza os dados de um aluno. |
| `findByIdAndDelete()` | Exclui um aluno pelo ID. |

Nas operações de busca, atualização e exclusão, é verificado se o aluno existe. Quando não é encontrado, a aplicação utiliza `NotFoundException`, retornando HTTP 404.

## Testes com Postman

Os testes foram realizados utilizando o Postman para verificar o funcionamento das rotas e a comunicação com o MongoDB.

Procedimento:

1. Iniciar o servidor com `npm run start:dev`.
2. Utilizar `http://localhost:3000/alunos` como endereço base.
3. Selecionar o método HTTP correspondente.
4. Para POST e PATCH, acessar `Body`, selecionar `raw` e escolher `JSON`.
5. Enviar os dados e verificar a resposta.

### Exemplo de cadastro

**POST** `/alunos`

```json
{
  "nome": "Alerrandro Henrique dos Santos Queiroz",
  "idade": 20,
  "matricula": "67676767",
  "curso": [
    "Instalador e Reparador de Redes"
  ]
}
```

Testes realizados:

- Cadastro de aluno.
- Listagem de alunos cadastrados.
- Busca de aluno pelo identificador.
- Atualização de informações.
- Exclusão de aluno.
- Verificação das validações dos DTOs.

O cadastro foi realizado com sucesso, retornando `201 Created`, confirmando a criação do registro.

## Tratamento de erros HTTP

Foram utilizadas exceções do NestJS para tratar situações em que uma operação não pode ser concluída.

| Exceção | Status HTTP | Finalidade |
|---|---|---|
| `BadRequestException` | 400 | Dados inválidos ou requisição incorreta. |
| `NotFoundException` | 404 | Aluno não encontrado. |

## Comandos utilizados

| Comando | Finalidade |
|---|---|
| `npm install` | Instala as dependências. |
| `npm run start:dev` | Inicia o servidor em desenvolvimento. |
| `npm run build` | Compila a aplicação. |
| `npm install class-validator class-transformer ` |
|