default: help

help: cat Makefile

mock-up:
	docker compose up -d

mock-down:
	docker compose down

mock-restart: mock-down mock-up

up:
	npm run serve

dev: mock-up up

test:
	npm run test

update-snapshots:
	npm run snapshot-update