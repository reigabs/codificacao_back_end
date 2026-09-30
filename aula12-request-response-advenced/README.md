# Aula 12 — Request e Response Advanced

## 📚 Sobre a aula

Nesta aula foram trabalhados conceitos avançados de **Request e Response** utilizando o NestJS.

O projeto implementa uma rota protegida por uma **API Key**, enviada através de um Header HTTP. A aplicação verifica a chave recebida e, dependendo do resultado, retorna uma resposta de sucesso ou de acesso negado.

Além disso, foram utilizados recursos como:

- `@Controller()`
- `@Get()`
- `@Headers()`
- `@Res()`
- `Response` do Express
- Status HTTP
- Respostas JSON
- Validação de uma API Key

---

## 🎯 Objetivos

- Compreender o funcionamento de Request e Response;
- Trabalhar com Headers HTTP;
- Capturar informações enviadas pelo cliente;
- Utilizar o decorator `@Headers()`;
- Utilizar o objeto `Response` do Express;
- Criar uma rota protegida;
- Trabalhar com códigos de status HTTP;
- Retornar respostas personalizadas em JSON;
- Testar a API utilizando o Insomnia.

---

## 🛠️ Tecnologias utilizadas

- Node.js
- NestJS
- TypeScript
- Express
- NPM
- Insomnia
- Git
- GitHub

---

# ▶️ Executando o projeto

Para iniciar o servidor em modo de desenvolvimento:

```bash
npm run start:dev
```

Após iniciar, a aplicação ficará disponível em:

```text
http://localhost:3000
```

---

# 🔐 Controller de segurança

O arquivo responsável pela rota protegida é:

```text
src/seguranca.controller.ts
```

O controller utilizado na aula é:

```typescript
import { Controller, Get, Headers, Res } from '@nestjs/common';
import type { Response } from 'express';

@Controller('secret')
export class SegurancaController {
```

## 📌 `@Controller('secret')`

O decorator `@Controller()` define o caminho base das rotas do controller.

```typescript
@Controller('secret')
```

Isso significa que as rotas criadas dentro desse controller começarão com:

```text
/secret
```

---

# 📡 Criando uma rota GET

A rota principal utiliza o decorator `@Get()`:

```typescript
@Get()
accessAreaSecret(
  @Headers('y-api-key') apiKey: string,
  @Res() res: Response
) {
```

Como o controller possui:

```typescript
@Controller('secret')
```

e o método possui:

```typescript
@Get()
```

a rota final será:

```text
GET /secret
```

No navegador ou Insomnia:

```text
http://localhost:3000/secret
```

---

# 📥 Recebendo Headers com `@Headers()`

A aplicação utiliza o Header:

```text
y-api-key
```

O código responsável por capturar esse valor é:

```typescript
@Headers('y-api-key') apiKey: string
```

O valor enviado pelo cliente é armazenado na variável:

```typescript
apiKey
```

Por exemplo, no Insomnia:

```text
y-api-key: FULLSTACK-2026
```

A aplicação receberá:

```typescript
apiKey = 'FULLSTACK-2026'
```

---

# 🔑 Validação da API Key

Depois de receber a chave, a aplicação verifica se ela é válida:

```typescript
if(apiKey === 'FULLSTACK-2026') {
```

Essa condição compara o valor recebido no Header com a chave esperada.

### Exemplo de chave correta

```text
y-api-key: FULLSTACK-2026
```

Resultado:

```text
Acesso permitido
```

### Exemplo de chave incorreta

```text
y-api-key: 123456
```

Resultado:

```text
Acesso negado
```

---

# 📤 Trabalhando com `Response`

O controller recebe o objeto `Response` do Express:

```typescript
@Res() res: Response
```

Para isso, o projeto importa o tipo `Response`:

```typescript
import type { Response } from 'express';
```

O objeto `res` permite controlar diretamente a resposta enviada ao cliente.

---

# ✅ Resposta de sucesso

Quando a API Key está correta, o código executado é:

```typescript
res.setHeader('y-auth-status', 'verificado');

return res.status(200).json({
  mensagem: 'Acesso concedido a Area Secreta',
  log: new Date()
});
```

## `res.setHeader()`

O método:

```typescript
res.setHeader('y-auth-status', 'verificado');
```

adiciona um Header personalizado à resposta.

Nesse caso:

```text
y-auth-status: verificado
```

---

## `res.status(200)`

O código:

```typescript
res.status(200)
```

define o status HTTP da resposta como:

```text
200 OK
```

Esse status representa uma requisição processada com sucesso.

---

## `res.json()`

O método:

```typescript
.json({
  mensagem: 'Acesso concedido a Area Secreta',
  log: new Date()
});
```

envia uma resposta no formato JSON.

Exemplo:

```json
{
  "mensagem": "Acesso concedido a Area Secreta",
  "log": "2026-09-29T21:00:00.000Z"
}
```

O valor de `log` é gerado automaticamente através de:

```typescript
new Date()
```

---

# ❌ Resposta quando a API Key é inválida

Quando a chave está incorreta ou não foi enviada, o `if` não é executado.

Nesse caso, o código retorna:

```typescript
return res.status(403).json({
  erro: 'Forbidden',
  mensagem: 'Chave API inválida ou ausente',
  log: new Date()
});
```

A resposta utiliza o status:

```text
403 Forbidden
```

E retorna um JSON semelhante a:

```json
{
  "erro": "Forbidden",
  "mensagem": "Chave API inválida ou ausente",
  "log": "2026-09-29T21:00:00.000Z"
}
```

---

# 🧩 Código completo do Controller

O código completo desenvolvido na aula é:

```typescript
import { Controller, Get, Headers, Res } from '@nestjs/common';
import type { Response } from 'express';

@Controller('secret')
export class SegurancaController {

  @Get()
  accessAreaSecret(
    @Headers('y-api-key') apiKey: string,
    @Res() res: Response
  ) {

    if(apiKey === 'FULLSTACK-2026') {

      res.setHeader('y-auth-status', 'verificado');

      return res.status(200).json({
        mensagem: 'Acesso concedido a Area Secreta',
        log: new Date()
      });

    }

    return res.status(403).json({
      erro: 'Forbidden',
      mensagem: 'Chave API inválida ou ausente',
      log: new Date()
    });
  }
}
```

---

# 🧪 Testando no Insomnia

Para testar a rota, abra o **Insomnia** e crie uma requisição:

```text
GET http://localhost:3000/secret
```

Na aba **Headers**, adicione:

| Nome | Valor |
|---|---|
| `y-api-key` | `FULLSTACK-2026` |

A requisição ficará semelhante a:

```text
GET http://localhost:3000/secret

Headers:
y-api-key: FULLSTACK-2026
```

Ao enviar, a API deverá retornar:

```text
200 OK
```

Com:

```json
{
  "mensagem": "Acesso concedido a Area Secreta",
  "log": "..."
}
```

---

# ❌ Testando uma chave inválida

Para testar o tratamento de erro, altere o Header para:

```text
y-api-key: 123456
```

Envie novamente a requisição:

```text
GET http://localhost:3000/secret
```

A API deverá retornar:

```text
403 Forbidden
```

Com:

```json
{
  "erro": "Forbidden",
  "mensagem": "Chave API inválida ou ausente",
  "log": "..."
}
```

---

# 🚫 Testando sem a API Key

Também é possível testar a rota sem enviar o Header:

```text
GET http://localhost:3000/secret
```

Como não existe uma chave válida, a aplicação executará a resposta de erro:

```typescript
return res.status(403).json({
  erro: 'Forbidden',
  mensagem: 'Chave API inválida ou ausente',
  log: new Date()
});
```

Resultado:

```text
403 Forbidden
```

---

# 📊 Status HTTP utilizados

| Status | Nome | Utilização |
|---|---|---|
| `200` | OK | API Key válida e acesso concedido |
| `403` | Forbidden | API Key inválida ou ausente |

---

# 🔄 Fluxo da requisição

```text
Cliente
   │
   │ GET /secret
   │
   │ y-api-key: FULLSTACK-2026
   ▼
SegurancaController
   │
   │ @Headers('y-api-key')
   ▼
Verificação da API Key
   │
   ├── Chave correta
   │      │
   │      ▼
   │    200 OK
   │    Acesso concedido
   │
   └── Chave incorreta/ausente
          │
          ▼
        403 Forbidden
        Acesso negado
```

---

# 📖 Principais conceitos aprendidos

## `@Controller()`

Define o caminho base do controller:

```typescript
@Controller('secret')
```

---

## `@Get()`

Define uma rota HTTP GET:

```typescript
@Get()
```

---

## `@Headers()`

Permite acessar um Header específico da requisição:

```typescript
@Headers('y-api-key') apiKey: string
```

---

## `@Res()`

Permite trabalhar diretamente com o objeto `Response`:

```typescript
@Res() res: Response
```

---

## `setHeader()`

Adiciona um Header à resposta:

```typescript
res.setHeader('y-auth-status', 'verificado');
```

---

## `status()`

Define o código HTTP da resposta:

```typescript
res.status(200)
```

ou:

```typescript
res.status(403)
```

---

## `json()`

Retorna dados no formato JSON:

```typescript
res.status(200).json({
  mensagem: 'Acesso concedido a Area Secreta'
});
```

---

# 📌 Comandos utilizados

Instalar dependências:

```bash
npm install
```

Executar em desenvolvimento:

```bash
npm run start:dev
```

Executar o projeto:

```bash
npm run start
```

Executar testes:

```bash
npm run test
```

Executar testes E2E:

```bash
npm run test:e2e
```