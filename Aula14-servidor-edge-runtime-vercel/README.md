# Aula 14 - Servidor Edge Runtime com Vercel

Projeto desenvolvido durante a Aula 14 da disciplina de **Codificação para Back-End**, com o objetivo de estudar a execução de funções serverless utilizando a plataforma **Vercel** e o conceito de **Edge Runtime**.

Durante a aula foi realizada a criação e configuração de uma conta na Vercel, autenticação através da CLI, configuração do projeto e execução de um servidor local para testar uma função de API.

---

# 1. Criação da conta na Vercel

Para realizar a aula, foi criada uma conta na plataforma **Vercel**.

A Vercel é utilizada para hospedar e executar aplicações e funções serverless, permitindo também trabalhar com funções executadas na infraestrutura da plataforma.

Após a criação da conta, foi acessado o painel da Vercel para realizar a configuração do projeto.

---

# 2. Instalação e utilização da Vercel CLI

A interação com a Vercel também foi realizada através do terminal utilizando a **Vercel CLI**.

Para verificar a instalação da CLI:

```bash
vercel
```

A versão utilizada durante a aula foi apresentada no terminal.

---

# 3. Login na Vercel pelo terminal

Para autenticar a conta da Vercel através do terminal, foi utilizado:

```bash
vercel login
```

O comando abriu o processo de autenticação através do navegador.

Após realizar a autorização, o navegador apresentou a mensagem indicando que a autorização foi concluída com sucesso.

Com isso, a CLI ficou autenticada para utilizar a conta Vercel.

---

# 4. Configuração do projeto

Dentro da pasta do projeto foi executado:

```bash
vercel
```

A CLI iniciou o processo de configuração do projeto.

Durante a configuração foram apresentadas algumas opções:

```text
Which project? Create a new project
Name? aula14-servidor-edge-runtime-vercel
Connect this Git repository to automatically deploy changes on every push? no
Code directory? ./
```

Foi escolhido:

- Criar um novo projeto;
- Utilizar o nome `aula14-servidor-edge-runtime-vercel`;
- Não conectar automaticamente um repositório Git;
- Utilizar a pasta atual como diretório do código.

---

# 5. Configuração detectada pela Vercel

Como o projeto não utilizava um framework específico reconhecido automaticamente pela Vercel, foi apresentada a configuração padrão:

```text
No framework detected.

Build Command:
npm run vercel-build ou npm run build

Development Command:
None

Install Command:
yarn install, pnpm install, npm install ou bun install

Output Directory:
public
```

Para este projeto, a aplicação utiliza uma função dentro da pasta `api`.

---

# 6. Função da API

A função principal do projeto está localizada em:

```text
api/hora-servidor.ts
```

O arquivo possui uma função responsável por receber uma requisição e retornar informações sobre sua execução.

Exemplo:

```typescript
import { Request } from '@vercel/node';

export default function handler(req: Request) {
  const inicio = new Date();

  return new Response(
    JSON.stringify({
      message: 'Função executada na borda de rede',
      horarioDoServidor: new Date().toISOString(),
      regiao: 'local-dev',
      ttf: `${Date.now() - inicio.getTime()} ms`,
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    },
  );
}
```

A função retorna:

- `message`: informa que a função foi executada na borda de rede;
- `horarioDoServidor`: apresenta o horário da execução;
- `regiao`: identifica a região utilizada durante a execução;
- `ttf`: apresenta o tempo necessário para executar a função.

---

# 7. Execução do projeto localmente

Após a configuração, o projeto foi executado localmente utilizando:

```bash
vercel dev
```

A Vercel iniciou o ambiente de desenvolvimento local.

O terminal apresentou informações semelhantes a:

```text
Local:      http://localhost:3000
Vercel Queues: ...
Vercel Schedules: ...
Runtime Cache: ...
Ready! Available at http://localhost:3000
```

Com isso, o servidor ficou disponível localmente na porta `3000`.

---

# 8. Acesso à API

A função localizada em:

```text
api/hora-servidor.ts
```

fica disponível através da rota:

```text
http://localhost:3000/api/hora-servidor
```

A requisição utilizada foi:

```http
GET /api/hora-servidor
```

---

# 9. Teste da API

A API foi testada utilizando uma requisição HTTP do tipo `GET`.

```text
GET http://localhost:3000/api/hora-servidor
```

O servidor retornou:

```text
Status: 200 OK
```

E uma resposta semelhante a:

```json
{
  "message": "Função executada na borda de rede",
  "horarioDoServidor": "2026-10-06T00:16:15.819Z",
  "regiao": "local-dev",
  "ttf": "0 ms"
}
```

O resultado confirma que a função foi executada corretamente e que a API está respondendo às requisições.

---

# 10. Vercel Dashboard

Após a autenticação, também foi acessado o painel da Vercel.

O projeto ficou associado à conta utilizada durante a aula, permitindo posteriormente realizar deploy e acompanhar os projetos através do dashboard.

Nesta aula, a conta e o projeto na Vercel foram utilizados principalmente para estudar o processo de configuração e execução de uma aplicação serverless.

---

# Comandos utilizados

### Verificar a Vercel CLI

```bash
vercel
```

### Fazer login

```bash
vercel login
```

### Configurar o projeto

```bash
vercel
```

### Executar o servidor local

```bash
vercel dev
```

### Rota utilizada no teste

```text
GET http://localhost:3000/api/hora-servidor
```