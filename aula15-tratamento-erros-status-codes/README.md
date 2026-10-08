# Aula 15 - Tratamento de Erros e Status Codes com NestJS

## 📚 Sobre

Nesta aula foi desenvolvido um sistema de produtos com **NestJS**, trabalhando o tratamento de erros e os principais **Status Codes HTTP**.

## 🎯 Objetivos

- Trabalhar `BadRequestException`;
- Trabalhar `NotFoundException`;
- Utilizar `Logger`;
- Validar o ID informado na URL;
- Retornar Status Codes adequados para cada situação.

## 🛠️ Tecnologias

- Node.js
- NestJS
- TypeScript
- Insomnia

## 📁 Estrutura

```text
src/
├── app.controller.spec.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── main.ts
├── produtos.controller.ts
└── produtos-service.ts
```

## 📦 ProdutosService

O `ProdutosService` contém uma lista de 25 produtos e o método `listarProdutos()`.

```typescript
@Injectable()
export class ProdutosService {
    produtos = [
        { id: 1, nome: 'Arroz Namorados', preco: 9.99 },
        { id: 2, nome: 'Feijão Timbiras', preco: 7.99 },
        // ...
    ];

    listarProdutos() {
        return this.produtos;
    }
}
```

## 🎮 ProdutosController

O controller possui duas rotas:

### Listar produtos

```http
GET /produtos
```

Retorna todos os produtos.

### Buscar produto

```http
GET /produtos/:id
```

O ID recebido é convertido para número e validado.

```typescript
const id = Number(idProduto);

if (isNaN(id)) {
    this.logger.error(
        `Tentativa de buscar com o ID ${idProduto} não numérico.`
    );

    throw new BadRequestException(
        'O ID do produto deve ser um número inteiro.'
    );
}
```

Caso o produto não exista:

```typescript
if (!produto) {
    this.logger.warn(
        `Produto com ID ${id} não localizado.`
    );

    throw new NotFoundException(
        `Produto com ID ${id} não encontrado.`
    );
}
```

## 📊 Status Codes

| Status | Significado | Situação |
|---|---|---|
| `200` | OK | Requisição realizada com sucesso |
| `400` | Bad Request | ID inválido |
| `404` | Not Found | Produto não encontrado |

## 📝 Logger

O `Logger` registra informações no terminal.

### Erro

```typescript
this.logger.error('Mensagem de erro');
```

### Aviso

```typescript
this.logger.warn('Mensagem de aviso');
```

## 🧪 Testes no Insomnia

### Listar produtos

```http
GET http://localhost:3000/produtos
```

**Resultado:** `200 OK`

### Buscar produto existente

```http
GET http://localhost:3000/produtos/1
```

**Resultado:** `200 OK`

### Buscar produto inexistente

```http
GET http://localhost:3000/produtos/100
```

**Resultado:** `404 Not Found`

### Informar ID inválido

```http
GET http://localhost:3000/produtos/abc
```

**Resultado:** `400 Bad Request`

## ▶️ Executar o projeto

```bash
npm run start:dev
```