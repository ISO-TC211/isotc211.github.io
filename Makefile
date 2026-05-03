SHELL := /bin/bash

all: _site

bundle:
	bundle

clean:
	bundle exec jekyll clean

_site:
	bundle exec jekyll build

serve: bundle
	bundle exec jekyll serve --trace

.PHONY: all clean serve
