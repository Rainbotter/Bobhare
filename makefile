VERSION := 0.0.1

all: version clean dependencies build

version:
	@echo "Version : $(VERSION)"

clean:
	@echo "Cleaning..."
	@rm -rf bin
	@$(MAKE) -s -C web clean
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
	@export WEB_APP_PATH=dist/web && npm start

docker:
	@echo "Building docker image..."
	@docker --version
	@docker build -t rainbowloutre/bobhare:latest -t rainbowloutre/bobhare:$(VERSION) .
	@echo "Build docker image succeed"

docker-run:
	@echo "Running docker image..."
	@docker run --rm -p 80:9000 rainbowloutre/bobhare:$(VERSION)

publish:
	@echo "Publishing to Dockerhub..."
	@echo $(DOCKER_PASSWORD) | docker login -u=$(DOCKER_USERNAME) --password-stdin
	@docker push rainbowloutre/bobhare:latest
	@docker push rainbowloutre/bobhare:$(VERSION)
	@echo "Publish succeed"
