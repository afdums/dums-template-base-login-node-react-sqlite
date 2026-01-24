# Backend

API Node.js com Express, Prisma e SQLite. Estrutura modular por feature (auth, health) e autenticacao com JWT (access/refresh token).

## Stack

- Node.js + Express
- Prisma ORM
- SQLite (dev)
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

Preencha os secrets:

```
JWT_ACCESS_SECRET="sua-chave"
JWT_REFRESH_SECRET="sua-chave"
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

## Notas

- O login/cadastro retorna `{ user, tokens }`.
- O refresh deve receber `{ refreshToken }`.
- A rota `GET /health` exige `Authorization: Bearer <access_token>` e serve para testar o login.
- Para trocar de banco no futuro, atualize o provider/URL do Prisma.

## Sugestões de melhorias

- Bloquear login/refresh para contas desativadas (`isActive = false`).
- Impedir que um admin desative a própria conta quando não houver outro admin ativo.
- Adicionar paginação e filtros na listagem de usuários (status, role, busca por email).
- Registrar auditoria de ações administrativas (quem ativou/desativou, quando, etc).
- Adicionar testes de integração para auth e rotas admin.
