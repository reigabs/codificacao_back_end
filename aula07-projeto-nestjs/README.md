# Aula 07 - Projeto NestJS

Projeto desenvolvido durante a Aula 07 da disciplina de **Codificação para Back-End**, utilizando **NestJS**, **TypeScript** e **Node.js**.

O objetivo da aula foi criar uma aplicação básica utilizando a estrutura do NestJS, trabalhando com **Controller, Service, Module, injeção de dependência e rotas HTTP**.

---

## Tecnologias utilizadas

- Node.js
- NestJS
- TypeScript
- NPM
- Git
- GitHub

---

# Criação do projeto

O projeto foi criado utilizando o **NestJS CLI**, que gera automaticamente uma estrutura inicial para a aplicação.

A estrutura criada pelo NestJS contém arquivos como:

- `src/` → código-fonte da aplicação.
- `test/` → arquivos relacionados aos testes.
- `package.json` → configurações e dependências do projeto.
- `nest-cli.json` → configuração do NestJS CLI.
- `tsconfig.json` → configuração do TypeScript.
- `node_modules/` → dependências instaladas do projeto.

codigos:
- npm install -g @nestjs/cli
- nest new aula07-projeto-nestjs

---

ACESSAR O GIT OCULTO:
- Get-ChildItem -Force

---

# Remoção do Git inicial

Ao criar o projeto pelo NestJS, um repositório Git pode ser criado automaticamente dentro da pasta do projeto.

Como a Aula 07 faz parte do repositório principal `codificacao_back_end`, foi necessário remover o `.git` criado dentro de `aula07-projeto-nestjs`.

O comando utilizado foi:

```powershell
Remove-Item -Recurse -Force .git

pra ver se foi removido, usa o comando "Get-ChildItem -Force", se o ".git" sumiu, é pq deu certo