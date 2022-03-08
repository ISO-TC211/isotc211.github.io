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

update-init:
	git submodule update --init

update-modules:
	git submodule foreach git pull origin master

.PHONY: all clean serve update-init update-modules
