VERSION := 0.0.1

all: clean build

version:
	@echo "Version : $(VERSION)"

clean:
	@echo "Cleaning..."
	@$(MAKE) -s -C front clean
	@$(MAKE) -s -C back clean
	@echo "Clean succeed"

build:
	@echo "Building..."
	@$(MAKE) -s -C front build
	@$(MAKE) -s -C back build
	@echo "Build succeed"

publish:
	@echo "Publishing to Dockerhub..."
	@echo "Building docker image"
	@docker --version
	@docker build -t rainbowloutre/bobhare:latest -t rainbowloutre/bobhare:$(VERSION) .
	@echo $(DOCKER_PASSWORD) | docker login -u=$(DOCKER_USERNAME) --password-stdin
	@docker push rainbowloutre/bobhare:latest
	@docker push rainbowloutre/bobhare:$(VERSION)
	@echo "Publish succeed"
