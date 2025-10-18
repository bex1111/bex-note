build: build-ui build-backend build-docker

build-ui:
	cd ui && npm install && npm run build && cd ..

build-backend:
	cd backend && npm install && npm run build && cd ..

build-docker:
	docker build -t bex1111/bex-note:beta .

test:
	cd backend && make test && cd ../ui && make test && cd ..

up:
	docker compose up -d

down:
	docker compose down

restart: down up