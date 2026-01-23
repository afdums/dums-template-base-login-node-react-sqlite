# Frontend

App React com Vite, tela de login e cadastro, tema dark por default com opcao de alternar para light.

## Stack

- React 18
- Vite
- CSS modular por feature

## Como rodar localmente

1) Instale as dependencias

```bash
cd frontend
npm install
```

2) Configure o ambiente

Crie um `.env` a partir do exemplo:

```bash
copy .env.example .env
```

Variavel usada:

```
VITE_API_URL="http://localhost:3000"
```

3) Inicie o servidor de desenvolvimento

```bash
npm run dev
```

## O que existe no frontend

- Tema global com dark/light e toggle salvo no `localStorage`.
- Tela de login (consome `POST /auth/login`).
- Tela de cadastro (consome `POST /auth/register`).
- Validacao simples de email e senha no client.

## Estrutura de pastas

```
src/
  app/
    App.jsx
    App.css
    theme.css
  features/
    auth/
      LoginPage.jsx
      RegisterPage.jsx
      LoginPage.css
      authService.js
  shared/
    lib/
      validators.js
```

## Notas

- Os tokens sao retornados pela API e exibidos apenas como feedback de sucesso.
- Para testar o backend, use o access token no header `Authorization: Bearer <token>` e chame `GET /health`.
