# AGENTS.md

Instructions pour les agents qui travaillent dans ce dépôt d'exemple.

- Répondre en français ; code, identifiants et messages de commit en anglais.
- API NestJS (ESM, imports relatifs en `.js`) sur Postgres : `src/invoices` (factures), `src/health.controller.ts`.
  Les montants sont en centimes ; un numéro de facture s'écrit `FAC-AAAA-NNNN`.
- L'interface vit dans un autre dépôt (`facturation-web`) et appelle cette API depuis le navigateur.
- Les commandes passent par le Makefile : `make install`, `make dev`, `make test`, `make typecheck`, `make build`.
- Avant de rendre la main : `pnpm format:check`, `make typecheck test build`.
- Toute nouvelle règle de l'API est testée (Vitest, à côté du code : `*.test.ts`).
- Commits en [Conventional Commits](https://www.conventionalcommits.org/) (`feat(invoices): …`), une PR par ticket, qui
  cite son numéro (`Closes #3`).
