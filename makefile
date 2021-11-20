VERSION := 0.0.1

all: version clean dependencies build

version:
	@echo "Version : $(VERSION)"

clean:
	@echo "Cleaning..."
	@rm -rf bin
	@$(MAKE) -s -C web clean
	@echo "Clean succeed"

dev-dependencies:
	@echo "Fetching dev dependencies..."
	@curl -sSfL https://raw.githubusercontent.com/cosmtrek/air/master/install.sh | sh -s
	@$(MAKE) -s -C . dependencies
	@echo "Fetch dev dependencies succeed"

dependencies:
	@echo "Fetching dependencies..."
	@go get -d ./...
	@$(MAKE) -s -C web dependencies
	@echo "Fetch dependencies succeed"

build:
	@echo "Building..."
	@go build --ldflags '-linkmode external -extldflags "-static"' -o target/bobhare main.go
	@$(MAKE) -s -C web build
	@mkdir -p target/web/dist
	@cp -r web/dist/* target/web/dist/
	@echo "Build succeed"

run:
	@$(MAKE) -j2 run-front run-back

run-front:
	@$(MAKE) -s -C web run

run-back:
	./bin/air -c runner.toml

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
