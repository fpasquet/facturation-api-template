# facturation-api

API de facturation d'exemple, pour essayer des agents de code sur un vrai dépôt : des factures (client, montant en
centimes, numéro `FAC-AAAA-NNNN`) dans Postgres, exposées par une API NestJS. Son interface est le dépôt
`facturation-web`.

Ce dépôt est un **modèle** : créez le vôtre avec « Use this template », sous le nom `facturation-api`, sur votre
organisation ou votre compte.

```bash
make install    # dépendances, et .env depuis .env.example
make dev        # Postgres (port 5433) et l'API sur http://localhost:4010
make test       # tests unitaires
```

- `GET /api/health` : `{ "status": "ok" }`
- `GET /api/invoices` : les factures, la plus récente d'abord (trois factures d'exemple au premier démarrage)
- `POST /api/invoices` : `{ "customer": "Atelier Moreau", "amountCents": 120000 }`
