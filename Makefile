default: help

help:
	cat Makefile

build: build-ui build-backend build-docker

build-ui:
	cd ui && npm install && npm run build && cd ..

build-backend:
	cd backend && npm install && npm run build && cd ..

build-docker:
	docker build -t bex1111/bex-note:beta .

test:
	cd backend && make test && cd ../ui && make test && cd ..

e2e-ui:
	docker compose up -d bex-note
	docker compose run --rm -p 9323:9323 playwright sh -c "npm ci && npx playwright test --ui-host=0.0.0.0 --ui-port=9323"

test-e2e: build
	docker compose up -d bex-note
	docker compose run --rm playwright sh -c "npm ci && npx playwright test"

up:

down:
	docker compose down

restart: down up
