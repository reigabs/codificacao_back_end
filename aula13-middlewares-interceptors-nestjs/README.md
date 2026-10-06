# Aula 13 - Middlewares e Interceptors com NestJS

Projeto desenvolvido durante a Aula 13 da disciplina de **Codificação para Back-End**, utilizando **NestJS** e **TypeScript**.

Nesta aula foram estudados conceitos de **Middlewares**, utilizados para processar requisições antes que elas cheguem aos Controllers.

O projeto implementa um Middleware responsável por:

- Registrar método e rota das requisições;
- Identificar rotas administrativas;
- Verificar um Header de autorização;
- Bloquear acessos não autorizados;
- Permitir o prosseguimento de requisições autorizadas.

---

## Tecnologias utilizadas

- Node.js
- NestJS
- TypeScript
- Express
- NPM
- Git
- GitHub
---

## O que é um Middleware?

Middleware é uma camada executada durante o processamento de uma requisição HTTP, antes que ela chegue ao Controller.

Ele pode ser utilizado para:

- Logs;
- Autenticação;
- Autorização;
- Validações;
- Controle de acesso.

Neste projeto, o Middleware é utilizado para registrar requisições e controlar o acesso à rota administrativa.

---

## LoggerMiddleware

Arquivo:

```text
src/logger/logger.middleware.ts
```

Código principal:

```typescript
import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const currentUrl = req.originalUrl || req.url;

    console.log(`[LOG] Método: ${req.method} | Rota: ${req.path}`);

    if (currentUrl.startsWith('/admin')) {
      const base = req.headers['x-user-base'];

      if (base !== 'Administrador') {
        return res.status(403).json({
          Codigo: 403,
          mensagem: 'Acesso Negado: Privilégio de Administrador necessário',
          registro: new Date,
        });
      }
    }

    next();
  }
}
```

### Funcionamento

O Middleware:

1. Obtém a URL da requisição;
2. Exibe o método HTTP e a rota no terminal;
3. Verifica se a rota começa com `/admin`;
4. Busca o Header `x-user-base`;
5. Permite somente o valor `Administrador`;
6. Retorna `403` caso o acesso seja negado;
7. Utiliza `next()` para continuar a requisição quando autorizada.

---

## Configuração do Middleware

O Middleware é registrado no:

```text
src/app.module.ts
```

```typescript
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { LoggerMiddleware } from './logger/logger.middleware.js';

@Module({
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
```

O:

```typescript
.forRoutes('*')
```

faz com que o Middleware seja executado em todas as rotas da aplicação.

---

## Rotas da aplicação

O Controller possui duas rotas:

### Rota pública

```text
GET /
```

Retorna:

```json
{
  "mensagem": "Rota Pública acessada com sucesso!",
  "data": "data atual"
}
```

### Rota administrativa

```text
GET /admin
```

Retorna:

```json
{
  "mensagem": "Bem-Vindo ao Painel Administrativo",
  "data": "data atual"
}
```

Essa rota exige o Header:

```text
x-user-base: Administrador
```

---

## Controle de acesso

### Acesso autorizado

Requisição:

```text
GET /admin
```

Header:

```text
x-user-base: Administrador
```

Resultado:

```text
200 OK
```

O Middleware executa:

```typescript
next();
```

e a requisição continua para o Controller.

### Acesso não autorizado

Sem o Header ou utilizando outro valor:

```text
x-user-base: Usuario
```

Resultado:

```text
403 Forbidden
```

Resposta:

```json
{
  "Codigo": 403,
  "mensagem": "Acesso Negado: Privilégio de Administrador necessário",
  "registro": "data atual"
}
```

---

## Fluxo da aplicação

```text
Requisição HTTP
       ↓
LoggerMiddleware
       ↓
Verificação da rota
       ↓
É /admin?
   ↓          ↓
 Não        Sim
   ↓          ↓
 next()   Verifica Header
              ↓
      ┌───────┴───────┐
      ↓               ↓
Administrador      Inválido
      ↓               ↓
   next()          403
      ↓
  Controller
      ↓
  Resposta
```

---

## Testando a aplicação

Para iniciar o projeto:

```bash
npm install
```

Depois:

```bash
npm run start:dev
```

A aplicação ficará disponível em:

```text
http://localhost:3000
```

Os testes podem ser realizados utilizando o **Insomnia**.

### Teste da rota pública

```text
GET http://localhost:3000/
```

### Teste da rota administrativa sem autorização

```text
GET http://localhost:3000/admin
```

Resultado:

```text
403 Forbidden
```

### Teste da rota administrativa com autorização

Adicionar o Header:

```text
x-user-base: Administrador
```

Resultado:

```text
200 OK
```

---

## Comandos principais

```bash
# Instalar dependências
npm install

# Iniciar em desenvolvimento
npm run start:dev

# Compilar o projeto
npm run build

# Executar testes
npm run test

# Executar testes E2E
npm run test:e2e
```

---

## Middleware x Interceptor

**Middleware:** executa durante o processamento inicial da requisição e pode analisar `Request`, `Response` e `NextFunction`.

**Interceptor:** recurso do NestJS utilizado para executar lógica antes ou depois de um método do Controller, podendo modificar respostas, medir tempo de execução e realizar outras operações.

Nesta implementação, o recurso desenvolvido foi principalmente o **Middleware**.

