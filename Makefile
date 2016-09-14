

all:
	tsc -t es6 --out web/main.js main.ts
	cp ./index.html web/
	cp ./monkey.json web/
	cp ./resources/template.png web/resources/


clean:
	rm -rf web/
