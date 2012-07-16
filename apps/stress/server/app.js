var stack = require("../../../stack.io").client;


stack.io(null, function(error, client) {
    client.expose("stress", "tcp://127.0.0.1:4242", {
        lazyIter: function(reply) {
            var i = 0;

            setInterval(function() {
                reply(null, i++, true);
            }, 0);
        }
    });
});
