# 👥 Aula 08-09 — API de Convidados com NestJS

## 📚 Sobre a aula

Nesta aula foi desenvolvido um projeto prático utilizando o framework **NestJS** para criar uma API REST responsável pelo cadastro e gerenciamento de convidados.

Durante a atividade foram implementados os principais métodos HTTP:

- **GET** → Listar os convidados cadastrados.
- **POST** → Cadastrar um novo convidado.
- **PATCH** → Atualizar parcialmente as informações (idade) de um convidado.
- **DELETE** → Remover um convidado cadastrado pelo ID.

Além do roteamento, a aplicação explora os fundamentos arquiteturais do NestJS: **Controllers, Services, DTOs (Data Transfer Objects), Decorators, Injeção de Dependência e Tratamento de Exceções**. Para validação e execução das requisições na prática, utilizou-se a ferramenta **Insomnia**.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** (Ambiente de execução)
- **NestJS** (Framework para construção de aplicações Node.js)
- **TypeScript** (Linguagem base)
- **PowerShell / Terminal** (Execução de comandos)
- **Insomnia** (Testes de endpoints HTTP)

---

## 📁 Estrutura de Arquivos do Projeto

```text
aula08-09-metodo-get-post-patch-delete/
├── src/
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── convidados.controller.ts
│   ├── convidados.service.ts
│   ├── criar-convidado.dto.ts
│   └── main.ts
├── test/
├── .gitignore
├── package.json
└── README.md