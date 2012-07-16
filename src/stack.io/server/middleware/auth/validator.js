var _ = require("underscore"),
    model = require("../../model");

//Validates that a request can be conducted by the user given his/her
//permissions
module.exports = function(req, res, next) {
    var permissions = req.session.auth ? req.session.auth.permissions : [];

    var canInvoke = _.any(permissions, function(permission) {
        return permission.service.test(req.service) && permission.method.test(req.method);
    });

    if(canInvoke) {
        next();
    } else {
        var error = model.createSyntheticError("NotPermittedError", "Not permitted");
        res.update(error, undefined, false);
    }
}