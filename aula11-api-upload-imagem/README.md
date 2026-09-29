# 📘 Aula 11 — Upload de Arquivos e Imagens no NestJS

---

## 1. Objetivo da Aula
Nesta aula, construímos uma **API de upload de imagens** capaz de receber arquivos enviados pelo cliente, validar suas características, armazená-los no servidor e retornar uma URL para acesso. Os principais focos foram:

- Compreender como o navegador/cliente envia arquivos para um servidor
- Usar o ecossistema do NestJS para interceptar e salvar arquivos
- Aplicar **regras de segurança**: limite de tamanho, tipos permitidos
- Evitar conflitos de nomes com geração de identificadores únicos
- Retornar respostas estruturadas com dados úteis sobre o arquivo salvo

---

## 2. Conceitos Fundamentais

### 2.1 O que é Upload de Arquivos
Upload é o processo de **enviar dados do cliente (navegador, Postman, app)** para o **servidor**, diferente de uma requisição comum de texto. Arquivos são **binários** — imagens, vídeos, áudios — e exigem um formato de transmissão especial.

### 2.2 Formato `multipart/form-data`
- É o **padrão HTTP** para envio de arquivos
- Divide os dados em "partes" — cada campo do formulário é uma seção separada
- Permite misturar **texto + arquivos** na mesma requisição
- No Postman/Insomnia, escolhemos `form-data` e adicionamos o campo do tipo Arquivo

### 2.3 Multer e Integração com NestJS
- **Multer** é a biblioteca padrão do ecossistema Express para lidar com uploads
- O NestJS **não reinventa a roda** — ele integra o Multer com decoradores amigáveis
- `@nestjs/platform-express` traz todos esses recursos prontos

### 2.4 Interceptadores (`FileInterceptor`)
- Um **interceptador** é uma função que "entra no meio" do caminho da requisição
- Ele **captura** o arquivo antes de chegar ao método do controller
- `FileInterceptor('file')` → diz: *"procure um campo chamado `file` na requisição e transforme seu conteúdo num objeto de arquivo"*
- Tudo isso acontece **antes** do seu código rodar — é automático

### 2.5 Armazenamento em Disco
- `diskStorage` → configura **onde** e **com qual nome** o arquivo será gravado
- `destination` → pasta física no sistema de arquivos (ex: `./uploads`)
- Se a pasta não existir, o Multer **não cria sozinho** — é preciso garantir que ela exista
- `filename` → função que define o nome final do arquivo no disco

### 2.6 Geração de Nomes Únicos
- Problema comum: duas pessoas enviam `foto.jpg` → o segundo **sobrescreveria** o primeiro
- Solução: **prefixo único** + nome original
- `uuidv4()` → gera um identificador aleatório do tipo:
  `550e8400-e29b-41d4-a716-446655440000`
- Resultado final: `550e8400-e29b-41d4-a716-446655440000-foto.jpg`
- Assim, **mesmo nome original = arquivo diferente no disco** ✅

---

## 3. Tecnologias e Decoradores Utilizados

| Ferramenta/Decorador | Função |
|---|---|
| `@Controller('imagem')` | Define o prefixo da rota → `/imagem` |
| `@Post('upload')` | Método HTTP POST + sufixo → `/imagem/upload` |
| `@UseInterceptors(...)` | Aplica o interceptador de arquivo na rota |
| `FileInterceptor('file')` | Captura o campo `file` do formulário |
| `@UploadedFile()` | Injeta o objeto do arquivo processado no parâmetro |
| `diskStorage` | Configura destino e nome no sistema de arquivos |
| `uuidv4()` | Gera identificador único universal |
| `BadRequestException` | Retorna erro **400** com mensagem explicativa |
| `limits: { fileSize }` | Bloqueia arquivos acima do tamanho definido |
| `fileFilter` | Valida tipo de arquivo antes de salvar |

---
