# Backend

API Node.js com Express, Prisma e PostgreSQL. Estrutura modular por feature (auth, health) e autenticacao com JWT (access/refresh token).

## Stack

- Node.js + Express
- Prisma ORM
- PostgreSQL
- JWT (access/refresh)

## Como rodar localmente

1) Instale as dependencias

```bash
cd backend
npm install
```

2) Configure as variaveis de ambiente

Crie um arquivo `.env` a partir do exemplo:

```bash
copy .env.example .env
```

Suba o Postgres localmente e ajuste o `DATABASE_URL` no `.env` (usuario, senha, host, porta e nome do banco).
Formato:

```
DATABASE_URL="postgresql://USUARIO:SENHA@HOST:PORTA/NOME_DO_BANCO?schema=public"
```

Exemplo:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/app?schema=public"
```

Preencha os secrets:

```
JWT_ACCESS_SECRET="sua-chave"
JWT_REFRESH_SECRET="sua-chave"
```

Defina o admin inicial (primeiro boot):

```
SEED_ADMIN_NAME="Admin"
SEED_ADMIN_EMAIL="admin@local"
SEED_ADMIN_PASSWORD="change-me"
```

3) Rode as migrations e gere o client

```bash
npm run prisma:migrate
```

4) Inicie o servidor

```bash
npm run dev
```

## Endpoints principais

- `GET /health`
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`
- `POST /auth/logout-all`

## Notas

- O login/cadastro retorna `{ user, tokens }`.
- O refresh deve receber `{ refreshToken }`.
- O logout recebe `{ refreshToken }` para revogar a sessao atual.
- O logout-all revoga todas as sessoes do usuario autenticado (enviar access token).
- A rota `GET /health` exige `Authorization: Bearer <access_token>` e serve para testar o login.
- Para trocar de banco no futuro, atualize o provider/URL do Prisma.

## Sugestões de melhorias

- Bloquear login/refresh para contas desativadas (`isActive = false`).
- Impedir que um admin desative a própria conta quando não houver outro admin ativo.
- Adicionar paginação e filtros na listagem de usuários (status, role, busca por email).
- Registrar auditoria de ações administrativas (quem ativou/desativou, quando, etc).
- Adicionar testes de integração para auth e rotas admin.
