build:
	hugo --gc --minify --verbose

build-quiet:
	@hugo --quiet

pre-commit: build-quiet lint clean

clean:
	@rm -r public/

server:
	@hugo server --environment dev

.PHONY: build build-quiet pre-commit clean server
