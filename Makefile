SHELL := /bin/bash
COMPOSE := docker compose

.PHONY: help install up down dev build typecheck test format clean
.DEFAULT_GOAL := help

help: ## Liste les commandes
	@grep -E '^[a-z-]+:.*## ' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*## "} {printf "  \033[36m%-10s\033[0m %s\n", $$1, $$2}'

install: ## Installe les dépendances et crée .env s'il manque
	pnpm install
	@test -f .env || (cp .env.example .env && echo "Créé .env depuis .env.example")

up: ## Démarre Postgres (Docker Compose), attend qu'il soit prêt
	$(COMPOSE) up -d --wait

down: ## Arrête Postgres
	$(COMPOSE) down

dev: up ## Postgres et l'API sur http://localhost:4010 en mode développement
	pnpm dev

build: ## Construit l'API
	pnpm build

typecheck: ## Vérifie les types
	pnpm typecheck

test: ## Tests unitaires
	pnpm test

format: ## Met en forme le code (Prettier)
	pnpm format

clean: ## Supprime le volume Docker et la sortie de build
	$(COMPOSE) down -v
	rm -rf dist
