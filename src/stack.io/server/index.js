var model = require("./model"),
    server = require("./server"),
    auth = require("./middleware/auth");

var connectors = {
    "SocketIOConnector": "socketio"
};

var middleware = {
    zerorpcMiddleware: "backend/zerorpc",
    printMiddleware: "debug/print",
    builtinsMiddleware: "etc/builtins"
};

for(var connectorName in connectors) {
    exports[connectorName] = require("./connectors/" + connectors[connectorName])
}

for(var middlewareName in middleware) {
    exports[middlewareName] = require("./middleware/" + middleware[middlewareName])
}

exports.createSyntheticError = model.createSyntheticError;
exports.Session = model.Session;
exports.Request = model.Request;
exports.Response = model.Response;
exports.IOServer = server.IOServer;
exports.useOAuth = auth.useOAuth;
exports.useNormalAuth = auth.useNormalAuth;