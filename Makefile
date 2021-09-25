lint-css:
	@node_modules/.bin/stylelint assets/*

lint-html:
	@html5validator --root public/

lint: lint-css lint-html

build:
	hugo --gc --minify --verbose

build-quiet:
	@hugo --quiet

pre-commit: build-quiet lint clean

clean:
	@rm -r public/

server:
	@hugo server --environment dev

.PHONY: lint-css lint-html lint build build-quiet pre-commit clean server
