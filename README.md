# dums-template-base-login-node-react-sqlite

## Sugestoes para evoluir o template (checklist)

Legenda de prioridade: P1 = obrigatorio, P2 = recomendado, P3 = opcional.

### Backend - Autenticacao e seguranca

- [x] (P1) Rotacao de refresh token + revogacao de sessoes
- [x] (P1) Bloquear login/refresh/uso de token para usuarios inativos
- [ ] (P1) Politica de senha (tamanho minimo/complexidade) + bloqueio por tentativas
- [ ] (P1) Fluxo "esqueci minha senha"
- [ ] (P1) Verificacao de e-mail
- [ ] (P2) Logout de todos os dispositivos
- [ ] (P2) RBAC por role com middleware central (admin-only, etc.)

### Backend - API e dados

- [ ] (P1) Validacao de payload centralizada (schema)
- [ ] (P1) Respostas de erro padronizadas (codigo, mensagem, detalhes)
- [x] (P2) Usar UUID como IDs (User/RefreshToken)
- [ ] (P2) Paginacao/filtros/ordenacao no endpoint de usuarios

### Backend - Observabilidade

- [ ] (P1) Health check completo (app + DB + storage se houver)
- [ ] (P2) Logs com request-id para rastrear erros

### Backend - DX e deploy

- [ ] (P1) Seed inicial (criar admin no primeiro boot)
- [ ] (P1) Script "init" (criar .env, migrar DB, seed)
- [ ] (P2) Docker Compose (backend + DB) e/ou opcao pronta para Postgres
- [ ] (P2) Documentacao "clone -> roda" curta e objetiva

### Frontend - Autenticacao e UX

- [ ] (P1) Interceptor de refresh token + logout automatico em 401
- [ ] (P1) Formularios com validacao completa + feedback consistente
- [ ] (P1) Estado global de erro/loading (toasts/skeletons)
- [ ] (P2) Guard por role no frontend (menu/admin por permissao)
- [ ] (P2) Opcao "lembrar sessao"

### Frontend - Admin de usuarios

- [ ] (P1) Busca/filtro/ordenacao/paginacao na tela de usuarios
- [ ] (P2) Detalhes do usuario (modal) + edicao de role
- [ ] (P2) Acoes em lote (ativar/desativar)
- [ ] (P3) Reset de senha por admin (com confirmacao)

### Template - Reuso e branding

- [x] (P1) Script de "renomear projeto" (nome/app title/package.json)
- [ ] (P2) Variaveis de tema padronizadas (cores/tipografia)
- [ ] (P3) i18n basico (pt/en)

## Renomear projeto

Execute o script abaixo a partir da raiz do repo:

```powershell
.\scripts\rename-project.ps1 -Name "meu-projeto" -Title "Meu Projeto"
```

Se nao informar `-Title`, o script gera um titulo a partir do `-Name`.
