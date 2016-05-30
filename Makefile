

all:
	tsc --out web/main.js main.ts
	cp ./index.html web/
