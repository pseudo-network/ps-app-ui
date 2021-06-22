service := ps-app-ui
version := 0.0.2
gcloud_proj := pseudonetwork
cluster := ps-dev
gcr-image := gcr.io/${gcloud_proj}/${service}:${version}
root := $(abspath $(shell pwd))
port := 80

list:
	@grep '^[^#[:space:]].*:' Makefile | grep -v ':=' | grep -v '^\.' | sed 's/:.*//g' | sed 's/://g' | sort

bootstrap:
	pip install bumpversion
	npm install

init:
	npm install

dev:
	npm start

docker-build:
	docker build -t $(gcr-image) .

docker-dev:
	make docker-build
	make docker-run

docker-push:
	docker push $(gcr-image)

docker-run:
	@docker run -itp $(port):$(port)  $(gcr-image)

bumpversion-patch:
	bumpversion patch --allow-dirty

bumpversion-minor:
	bumpversion minor --allow-dirty

bumpversion-major:
	bumpversion major --allow-dirty
