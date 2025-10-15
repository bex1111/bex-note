build: build-ui build-backend build-docker

build-ui:
	cd ui && npm install && npm run build && cd ..

build-backend:
	cd backend && npm install && npm run build && cd ..

build-docker:
	docker build -t bex-note:latest .

run:
	docker rm -f bex-note || true && docker run -p 3000:3000 -v ./temp:/data --name bex-note bex-note:latest