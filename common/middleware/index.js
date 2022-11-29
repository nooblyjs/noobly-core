'use strict';

/**
 * Module : Middleware Utility
 * This utility allows for middleware actions to be common
 */
module.exports = function () {

    var _middleware = {};

    /**
     * Method : useUnique This method will replace any existing middleware
     * @param (object) module The module whose middleware we are interogating. Note that utility with interogate the module.middleware array
     * @param (object) middleware The middleware to use
     * @param (string) keymethod The key method that will be used by reflection to determine the type middleware
     */
    _middleware.useUnique = function (module, middleware, keymethod) {
        for(var i = 0; i < module.middleware.length; i++ ){
            if (Reflect.has(module.middleware[i], 'raiseEvent')) {
                item.remove(module.middleware[i]);
            }
        };
        module.middleware.push(middleware);
    }

    /**
     * Method : use This method will add the middleware
     * @param (object) module The module whose middleware we are interogating. Note that utility with interogate the module.middleware array
     * @param (object) middleware The middleware to use
     */
    _middleware.use = function (module, middleware) {
        module.middleware.push(middleware);
    }

    /**
     * Method : retrieve Returns all the middleare for a keymethod
     * @param (object) module The module whose middleware we are interogating. Note that utility with interogate the module.middleware array
     * @param (string) keymethod The key method that will be used by reflection to determine the type middleware
     */
    _middleware.retrieve = function (module, keymethod) {
        var retMiddleware = [];
        for(var i = 0; i < module.middleware.length; i++ ){
            if (Reflect.has(module.middleware[i], keymethod)) {
                retMiddleware.push(module.middleware[i]);
            }
        };
        return retMiddleware
    }

    /**
     * Method : retrieve Returns the first middleare for a keymethod
     * @param (object) module The module whose middleware we are interogating. Note that utility with interogate the module.middleware array
     * @param (string) keymethod The key method that will be used by reflection to determine the type middleware
     */
    _middleware.retrieveFirst = function (module, keymethod) {
        for(var i = 0; i < module.middleware.length; i++ ){
            if (Reflect.has(module.middleware[i], keymethod)) {
                return module.middleware[i];
            }
        };
        return null;
    };
    

    /**
     * Method : retrieve Returns the last middleare for a keymethod
     * @param (object) module The module whose middleware we are interogating. Note that utility with interogate the module.middleware array
     * @param (string) keymethod The key method that will be used by reflection to determine the type middleware
     */
    _middleware.retrieveLast = function (module, keymethod) {
        var retMiddleware = null;
        for(var i = 0; i < module.middleware.length; i++ ){
            if (Reflect.has(module.middleware[i], keymethod)) {
                rretMiddleware = module.middleware[i]
            }
        };
        return retMiddleware
    }

    return _middleware
}

