all: clean build-apps create-index

create-bin:
	mkdir bin

clean:
	rm -rf bin/ build/

build-server: create-bin
	cp -r src/stack.io/ bin/
	rm -rf bin/stack.io/client

build-server-app: create-bin build-server
	cp -r src/server-app bin/server-app
	cp -r bin/stack.io bin/server-app/

build-client: create-bin build-web-client build-python-client build-node-client

build-web-client:
	mkdir -p bin/stack.io/client/web
	mkdir build

	./scripts/simple_replace src/stack.io/client/web/stack.io.js src/stack.io/client/shared/js/shared.js build/stack.io.js
	node scripts/r.js -o scripts/client-build-prod.cfg.js
	node scripts/r.js -o scripts/client-build-debug.cfg.js

	rm -rf build

build-node-client:
	mkdir -p bin/stack.io/client/node
	./scripts/simple_replace src/stack.io/client/node/stack.io.js src/stack.io/client/shared/js/shared.js bin/stack.io/client/node/stack.io.js

build-python-client:
	mkdir -p bin/stack.io/client/python
	cp src/stack.io/client/python/stackio.py bin/stack.io/client/python/stackio.py

build-utils: build-server
	node bin/stack.io/authorizer/sqlite/lib/init-db.js bin/authorizer.db

build-apps: build-server-app build-client build-utils
	cp -r apps bin/apps
	./scripts/build_app dashboard
	./scripts/build_app test
	./scripts/build_app oauth
	./scripts/build_app mice
	./scripts/build_app stress

create-index:
	cp src/index.js .

npm-distrib: clean build-server build-node-client build-web-client build-utils create-index
