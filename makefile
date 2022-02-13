VERSION := 0.0.1

all: version clean dependencies build

version:
	@echo "Version : $(VERSION)"

clean:
	@echo "Cleaning..."
	@rm -rf dist
	@rm -rf node_modules
	@$(MAKE) -s -C src/web clean
	@echo "Clean succeed"

dependencies:
	@echo "Fetching dependencies..."
	@npm install
	@$(MAKE) -s -C src/web dependencies
	@echo "Fetch dependencies succeed"

build:
	@echo "Building..."
	@npm run build
	@$(MAKE) -s -C src/web build
	@echo "Build succeed"

run:
	@$(MAKE) -j2 run-front run-back

run-front:
	@$(MAKE) -s -C src/web run

run-back:
	@export WEB_APP_PATH=/web && mkdir -p target && export DATABASE_PATH=target/local_db.sqlite3 && npm run start:debug

docker:
	@echo "Building docker image..."
	@docker --version
	@docker build -t rainbowloutre/bobhare:latest -t rainbowloutre/bobhare:$(VERSION) .
	@echo "Build docker image succeed"

docker-run:
	@echo "Running docker image..."
	@docker run --rm -p 80:3000 rainbowloutre/bobhare:$(VERSION)

publish:
	@echo "Publishing to Dockerhub..."
	@echo $(DOCKER_PASSWORD) | docker login -u=$(DOCKER_USERNAME) --password-stdin
	@docker push rainbowloutre/bobhare:latest
	@docker push rainbowloutre/bobhare:$(VERSION)
	@echo "Publish succeed"
