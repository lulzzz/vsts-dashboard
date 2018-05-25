DOCKER_PREFIX = emishealth
DOCKER_NAME = vsts-dashboard

.PHONY: explain
explain:
	### Welcome
	#
	#  __   _____ _____ ___     ___   _   ___ _  _ ___  ___   _   ___ ___
	#  \ \ / / __|_   _/ __|___|   \ /_\ / __| || | _ )/ _ \ /_\ | _ \   \
	#   \ V /\__ \ | | \__ \___| |) / _ \\__ \ __ | _ \ (_) / _ \|   / |) |
	#    \_/ |___/ |_| |___/   |___/_/ \_\___/_||_|___/\___/_/ \_\_|_\___/
	#
	### Installation
	#
	# $$ make install
	#
	#

.PHONY: clean
clean:
	rm -fr node_modules
	rm -fr build/

.PHONY: install
install:
	npm install

.PHONY: vet
vet:
	./node_modules/tslint/bin/tslint  --project .

.PHONY: build
build:
	npm run build

.PHONY: test
test:
	CI=true npm test

.PHONY: test-cov
test-cov:
	CI=true node scripts/test.js --env=jsdom --coverage --coverageDirectory=build/coverage

.PHONY: run
run:
	npm start

.PHONY: all
all: clean install vet build test

.PHONY: docker-build
docker-build:
	docker build -t $(DOCKER_PREFIX)/$(DOCKER_NAME) .

.PHONY: docker-push
docker-push:
	docker push $(DOCKER_PREFIX)/$(DOCKER_NAME)

.PHONY: docker-all
docker-all: docker-build docker-push
