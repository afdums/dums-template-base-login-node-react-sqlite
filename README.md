# dums-template-base-login-node-react-sqlite

## Sugestoes para evoluir o template (checklist)

- [ ] Rotacao de refresh token + revogacao de sessoes
- [ ] Logout de todos os dispositivos
- [ ] Politica de senha (tamanho minimo/complexidade) + bloqueio por tentativas
- [ ] Fluxo "esqueci minha senha"
- [ ] Verificacao de e-mail
- [ ] RBAC por role com middleware central (admin-only, etc.)
- [ ] Paginacao/filtros/ordenacao no endpoint de usuarios
- [ ] Respostas de erro padronizadas (codigo, mensagem, detalhes)
- [ ] Validacao de payload centralizada (schema)
- [ ] Health check completo (app + DB + storage se houver)
- [ ] Logs com request-id para rastrear erros
- [ ] Seed inicial (criar admin no primeiro boot)
- [ ] Script "init" (criar .env, migrar DB, seed)
- [ ] Docker Compose (backend + DB) e/ou opcao pronta para Postgres
- [ ] Documentacao "clone -> roda" curta e objetiva
- [ ] Interceptor de refresh token + logout automatico em 401
- [ ] Guard por role no frontend (menu/admin por permissao)
- [ ] Formularios com validacao completa + feedback consistente
- [ ] Estado global de erro/loading (toasts/skeletons)
- [ ] Opcao "lembrar sessao"
- [ ] Busca/filtro/ordenacao/paginacao na tela de usuarios
- [ ] Detalhes do usuario (modal) + edicao de role
- [ ] Acoes em lote (ativar/desativar)
- [ ] Reset de senha por admin (com confirmacao)
- [ ] Script de "renomear projeto" (nome/app title/package.json)
- [ ] Variaveis de tema padronizadas (cores/tipografia)
- [ ] i18n basico (pt/en)
