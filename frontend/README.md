# Frontend (Angular + PO UI)

Frontend refeito em Angular standalone com Router e componentes PO UI.

## Stack

- Angular 19 (standalone)
- PO UI (@po-ui/ng-components)
- RxJS

## Como rodar

```bash
cd frontend
npm install
npm start
```

Abra `http://localhost:4200/`.

## Configuracao da API

Edite o `src/index.html` e ajuste:

```html
<script>
  window.__APP_CONFIG__ = { apiUrl: "http://localhost:3000" };
</script>
```

## Rotas principais

- `/login`
- `/register`
- `/dashboard/health`
- `/dashboard/admin`

## O que esta pronto

- Autenticacao (login/cadastro)
- Dashboard com cards de status
- Admin de usuarios (lista + ativar/desativar)
