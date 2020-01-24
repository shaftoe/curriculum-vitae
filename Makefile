lint-css:
	@node_modules/.bin/stylelint assets/*

lint-html:
	@html5validator --root public/

lint: lint-css lint-html

build:
	hugo --gc --minify --verbose

build-quiet:
	@hugo --quiet

pre-commit: build-quiet lint
	@rm -r public/
