# Aula 16 — Validação de Schemas com Zod no NestJS

## 📋 Sobre a aula

Nesta aula, foi implementada a validação de dados com **Zod** no NestJS, utilizando um schema para definir as regras dos colaboradores e um pipe personalizado para validar as requisições antes de serem processadas pelo controller.

## 🚀 Tecnologias utilizadas

- Node.js
- NestJS
- TypeScript
- Zod
- NPM
- Insomnia
- Git e GitHub

## 📁 Estrutura do projeto

```text
aula16-validacao-schemas-com-zod-nestjs/
├── src/
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── colaborador.schemas.ts
│   ├── colaboradores.controller.ts
│   ├── zod-validation.pipe.ts
│   └── main.ts
├── package.json
├── package-lock.json
└── README.md
```

## 📦 Instalação

Acesse a pasta da aula pelo terminal do VS Code:

```powershell
cd aula16-validacao-schemas-com-zod-nestjs
npm install
npm install zod
```

O Zod foi instalado nesta aula para definir e executar as validações dos dados recebidos pela API.

## 🧩 Implementações

### 1. Schema — `colaborador.schemas.ts`

O schema define os campos e as regras de validação dos colaboradores.

| Campo | Regra |
|---|---|
| `nome` | Texto com pelo menos 3 caracteres. |
| `email` | Deve ser um e-mail válido. |
| `idade` | Número entre 18 e 65 anos, inclusive. |
| `departamento` | Aceita `TI`, `RH`, `Comercial` ou `Financeiro`. |

O tipo `Colaborador` é criado com `z.infer<typeof colaboradorSchema>`, mantendo a tipagem TypeScript alinhada ao schema.

### 2. Pipe — `zod-validation.pipe.ts`

A classe `ZodValidationPipe` implementa `PipeTransform` e recebe o schema pelo construtor.

Suas responsabilidades são:
- Validar argumentos do tipo `body` com `safeParse()`.
- Organizar erros com o nome do campo e a mensagem.
- Lançar `BadRequestException` quando os dados forem inválidos.
- Retornar os dados validados quando forem aceitos.

Exemplo de resposta de erro:

```json
{
  "statusCode": 400,
  "erros": [
    {
      "campo": "nome",
      "mensagem": "O nome deve ter pelo menos 3 caracteres!"
    }
  ]
}
```

### 3. Controller — `colaboradores.controller.ts`

O controller disponibiliza a rota `POST /colaboradores` e aplica o pipe com `@UsePipes(new ZodValidationPipe(colaboradorSchema))`.

Se os dados forem válidos, retorna uma mensagem de sucesso e os dados recebidos. Caso contrário, o pipe interrompe o processamento e retorna HTTP 400.

O exemplo não salva os dados em banco de dados.

### 4. Módulo — `app.module.ts`

O módulo registra `ColaboradoresController` em `controllers`. Como o pipe é instanciado diretamente no controller, não precisa ser registrado em `providers` nem incluído em `imports`.

## ▶️ Executando o projeto

Na pasta da aula, execute:

```powershell
npm run start:dev
```

Com a configuração padrão, o servidor ficará disponível em `http://localhost:3000`.

## 🧪 Testes no Insomnia

Configure a requisição:

- **Método:** `POST`
- **URL:** `http://localhost:3000/colaboradores`
- **Body:** JSON
- **Header:** `Content-Type: application/json`

### Teste válido

```json
{
  "nome": "Gabriel Cardoso",
  "email": "gabriel@exemplo.com",
  "idade": 20,
  "departamento": "TI"
}
```

**Resultado esperado:** mensagem de sucesso e os dados recebidos.

### Testes inválidos

| Campo | Valor de teste | Motivo |
|---|---|---|
| `nome` | `"Jo"` | Menos de 3 caracteres. |
| `email` | `"email-invalido"` | E-mail inválido. |
| `idade` | `17` | Menor que 18. |
| `idade` | `66` | Maior que 65. |
| `idade` | `"20"` | Texto em vez de número. |
| `departamento` | `"Marketing"` | Valor não permitido. |

**Resultado esperado:** HTTP `400 Bad Request` com os erros de validação correspondentes.

## 📚 Conceitos aprendidos

- Instalação e utilização do Zod.
- Criação de schemas e inferência de tipos.
- Validação em tempo de execução.
- Pipes personalizados no NestJS.
- Uso de `safeParse()` e `BadRequestException`.
- Decorators `@Controller()`, `@Post()`, `@Body()` e `@UsePipes()`.
- Testes de API com Insomnia.

## 🔧 Comandos Git

Execute na raiz do repositório principal:

```powershell
git status
git add aula16-validacao-schemas-com-zod-nestjs/
git commit -m "feat(aula16): implementa validacao de colaboradores com Zod"
git push origin main
```

Confira o `git status` antes do commit para garantir que somente os arquivos desejados serão incluídos.

## ✅ Conclusão

A aula demonstrou como utilizar o Zod para validar dados em uma API NestJS. O schema define as regras, o pipe verifica as requisições e o controller processa os dados válidos, tornando a entrada de informações mais consistente e segura.
