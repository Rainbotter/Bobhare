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
	@go get -d ./...
	@$(MAKE) -s -C web dependencies
	@echo "Fetch dependencies succeed"

build:
	@echo "Building..."
	@$(MAKE) -s -C web build
	@go build --ldflags '-linkmode external -extldflags "-static"' -o bin/bobhare main.go
	@mkdir -p bin/web/dist
	@cp -r web/dist/* bin/web/dist/
	@echo "Build succeed"

run:
	@$(MAKE) -j2 run-front run-back

run-front:
	@$(MAKE) -s -C web run

run-back:
	@go run main.go

docker:
	@echo "Building docker image..."
	@docker --version
	@docker build -t rainbowloutre/bobhare:latest -t rainbowloutre/bobhare:$(VERSION) .
	@echo "Build docker image succeed"

publish:
	@echo "Publishing to Dockerhub..."
	@echo $(DOCKER_PASSWORD) | docker login -u=$(DOCKER_USERNAME) --password-stdin
	@docker push rainbowloutre/bobhare:latest
	@docker push rainbowloutre/bobhare:$(VERSION)
	@echo "Publish succeed"
