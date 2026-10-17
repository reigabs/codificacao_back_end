# Aula 17 — Documentação Técnica com Swagger no NestJS

## 📚 Descrição

Esta aula apresenta a configuração do Swagger em uma API desenvolvida com NestJS. O projeto simula uma API de estoque de alimentos, com um endpoint para cadastro de produtos e documentação técnica interativa.

O Swagger permite visualizar endpoints, consultar os dados esperados e testar requisições diretamente pelo navegador, utilizando a especificação OpenAPI.

## 🎯 Objetivos

- Configurar o Swagger em uma aplicação NestJS.
- Documentar endpoints, operações e respostas HTTP.
- Descrever propriedades de DTOs com `@ApiProperty()`.
- Testar a API pela interface Swagger UI.
- Compreender a diferença entre documentação, validação e autenticação.

## 🛠️ Tecnologias

- Node.js e npm
- NestJS e TypeScript
- Swagger / OpenAPI
- `@nestjs/swagger`
- Git e GitHub

## ⚙️ Instalação e execução

No terminal do VS Code, a partir da raiz do repositório:

```powershell
cd aula17-documentacao-tecnica-com-swagger-nestjs
npm install
npm install @nestjs/swagger
npm run start:dev
```

O último comando inicia o servidor em modo de desenvolvimento. Quando a aplicação iniciar corretamente, o terminal apresentará uma mensagem semelhante a:

```text
Found 0 errors. Watching for file changes.
[NestApplication] Nest application successfully started
```

## 📖 Configuração do Swagger — `src/main.ts`

O arquivo `main.ts` inicializa a aplicação e disponibiliza a documentação.

```typescript
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("API de Estoque de Alimentos")
    .setDescription("Documentação técnica interativa para integração")
    .setVersion("1.0")
    .addTag("Produtos")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("docs", app, document);

  await app.listen(3000);
}

bootstrap();
```

### Principais métodos

- `NestFactory.create(AppModule)`: cria a aplicação NestJS.
- `DocumentBuilder()`: inicia a configuração do documento OpenAPI.
- `setTitle()`: define o título da documentação.
- `setDescription()`: descreve a API.
- `setVersion()`: informa a versão documentada.
- `addTag()`: registra uma categoria para organizar as operações.
- `addBearerAuth()`: documenta um esquema de autenticação Bearer.
- `SwaggerModule.createDocument()`: gera o documento OpenAPI.
- `SwaggerModule.setup()`: disponibiliza a interface Swagger UI.
- `app.listen(3000)`: inicia o servidor na porta 3000.

Neste exemplo, a documentação fica disponível em `http://localhost:3000/docs`. Se o argumento de `SwaggerModule.setup()` for `"api"`, o endereço será `http://localhost:3000/api`.

**Importante:** `addBearerAuth()` apenas documenta o esquema de autenticação. Não protege as rotas automaticamente.

## 📝 DTO de produtos — `criar-produtos.dto.ts`

O DTO define a estrutura dos dados esperados para cadastrar um produto.

```typescript
import { ApiProperty } from "@nestjs/swagger";

export class CriarProdutoDto {
  @ApiProperty({
    example: "Café Grão de Ouro 500g",
    description: "Nome comercial do produto cadastrado",
  })
  nome: string;

  @ApiProperty({
    example: 9.99,
    description: "Preço unitário do produto",
  })
  preco: number;

  @ApiProperty({
    example: "Alimentos",
    description: "Categoria do produto",
  })
  categoria: string;
}
```

O decorator `@ApiProperty()` documenta as propriedades e apresenta exemplos na interface Swagger.

- `nome`: nome comercial do produto.
- `preco`: preço unitário.
- `categoria`: categoria do produto.

O DTO ajuda a definir a estrutura dos dados, mas não valida automaticamente as requisições. Para validar valores, é necessário configurar mecanismos próprios, como `class-validator` com `ValidationPipe`.

## 🚏 Controller — `produtos.controller.ts`

O controller recebe a requisição e retorna uma resposta com os dados do produto.

```typescript
import { Body, Controller, Post } from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";
import { CriarProdutoDto } from "./dto/criar-produtos.dto.js";

@ApiTags("produtos")
@Controller("Produtos")
export class ProdutosController {
  @Post()
  @ApiOperation({
    summary: "Cadastrar um novo produto no estoque.",
  })
  @ApiResponse({
    status: 201,
    description: "Produto cadastrado com sucesso.",
  })
  @ApiResponse({
    status: 400,
    description: "Payload inválido ou malformado.",
  })
  async criar(@Body() criarProdutoDto: CriarProdutoDto) {
    return {
      id: 67,
      ...criarProdutoDto,
      criadoEm: new Date().toLocaleDateString(),
    };
  }
}
```

### Explicação

- `@ApiTags("produtos")`: agrupa a operação na documentação.
- `@Controller("Produtos")`: define o prefixo da rota.
- `@Post()`: registra uma operação HTTP POST.
- `@ApiOperation()`: descreve a finalidade do endpoint.
- `@ApiResponse()`: documenta os códigos de resposta possíveis.
- `@Body()`: recebe o corpo da requisição.
- `...criarProdutoDto`: copia as propriedades do DTO para a resposta.

O endpoint é `POST /Produtos`.

**Observação:** o exemplo retorna um identificador fixo e não salva o produto em um banco de dados. Além disso, `@ApiResponse()` documenta os status, mas não implementa automaticamente a validação nem o tratamento de erros.

## 🧪 Testando a API

### 1. Abrir o Swagger

Com o servidor em execução, acesse:

`http://localhost:3000/docs`

O endereço depende do caminho configurado em `SwaggerModule.setup()`.

### 2. Localizar a operação

Na interface, procure `produtos` e selecione `POST /Produtos`.

Clique em **Try it out** para habilitar o teste.

### 3. Enviar um JSON

```json
{
  "nome": "Café Grão de Ouro 500g",
  "preco": 9.99,
  "categoria": "Alimentos"
}
```

Clique em **Execute** para enviar a requisição.

### 4. Conferir a resposta

A resposta será semelhante a:

```json
{
  "id": 67,
  "nome": "Café Grão de Ouro 500g",
  "preco": 9.99,
  "categoria": "Alimentos",
  "criadoEm": "16/10/2026"
}
```

A data será gerada no momento da requisição. O status esperado para o cadastro é `201 Created`.

### Testando pelo Insomnia

Também é possível utilizar o Insomnia com a seguinte configuração:

- **Método:** `POST`
- **URL:** `http://localhost:3000/Produtos`
- **Corpo:** JSON
- **Cabeçalho:** `Content-Type: application/json`

Utilize o mesmo JSON apresentado anteriormente e envie a requisição.

## ⚠️ Problemas comuns

**Erro `Cannot GET /`:** o navegador envia uma requisição GET, mas o controller apresentado registra apenas POST `/Produtos`. Acesse o Swagger ou teste a rota pelo Insomnia.

**Erro `Cannot GET /api`:** confira o caminho informado em `SwaggerModule.setup()`. Neste README, o endereço utilizado é `/docs`.

**Campos ausentes no Swagger:** confira as propriedades do DTO, os decorators `@ApiProperty()` e o parâmetro `@Body()` do controller.

**Resposta `400` não aparece ao enviar dados inválidos:** `@ApiResponse()` apenas documenta a resposta. É necessário implementar validação e tratamento de erros.

**Servidor não inicia:** verifique as mensagens do terminal, as dependências e os erros de compilação.

## 📌 Resumo dos principais recursos

| Recurso | Finalidade |
|---|---|
| `DocumentBuilder` | Configurar a documentação OpenAPI |
| `SwaggerModule.createDocument()` | Gerar o documento da API |
| `SwaggerModule.setup()` | Disponibilizar o Swagger UI |
| `@ApiTags()` | Agrupar operações |
| `@ApiOperation()` | Descrever endpoints |
| `@ApiResponse()` | Documentar respostas HTTP |
| `@ApiProperty()` | Documentar campos do DTO |
| `@Controller()` | Definir o prefixo das rotas |
| `@Post()` | Registrar uma rota POST |
| `@Body()` | Receber os dados enviados |

## 📤 Git — Commit semântico

Execute os comandos abaixo a partir da raiz do repositório.

```powershell
git status
git add aula17-documentacao-tecnica-com-swagger-nestjs
git diff --cached --stat
git status
```

Confira se somente os arquivos da Aula 17 foram preparados. Se estiver tudo correto, crie o commit:

```powershell
git commit -m "docs(aula17): documenta API NestJS com Swagger"
```

Confira o histórico e o estado do repositório:

```powershell
git log -5 --oneline
git status
```

Para publicar no GitHub, depois de conferir as alterações:

```powershell
git push origin main
```

**Atenção:** `git add` prepara arquivos, `git commit` registra as alterações localmente e `git push` envia os commits ao repositório remoto.

## ✅ Resultado esperado

Ao concluir a aula, a aplicação terá uma documentação interativa da API de estoque de alimentos, permitindo consultar o endpoint `POST /Produtos`, visualizar os campos documentados e testar requisições pelo navegador.

O uso do Swagger facilita a compreensão, os testes e a integração com outros sistemas, enquanto a validação, a autenticação e a persistência dos dados continuam sendo responsabilidades da implementação da aplicação.