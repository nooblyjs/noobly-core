const express = require('express');
const session = require('express-session');
const cors = require('cors');

/**
 * The interface manager object exposes the routing and creation of websites
 * This manager is meant to abstract what version of UI controller is being used
 */
module.exports = function (moduleManager) {

    // Instantiate the app
    const app = express();

    // local parameters
    var parameters = (parameters != null ? parameters : {})

    /** Initiate the object */
    var _interfaceManager = {}

    // Implement the security
    const passport = require('passport');
    const googleStratergy = require('./passports/oauth-provider-google.js');

    // Session usage and encryption
    app.use(session({ secret: 'Too Many Secrets', resave: true, saveUninitialized: true }));
    app.use(passport.initialize())


    /**
     * The add site routing
     * @param {string} url
     * @param {string} path
    */
    _interfaceManager.registerSite = function (url, path) {
        app.use(url, express.static(path));
    }

    /**
   * The add site routing
   * @param {string} url
   * @param {string} path
  */
    _interfaceManager.registerProtectedSite = function (url, path) {
        app.use(url, passport.authenticate('google', { scope: ['email', 'profile'] }), express.static(path));
    }

    /**
       * The add and API route
       * @param {string} method
       * @param {string} url
       * @param {string} callback
      */
    _interfaceManager.authentication = function (method, authentication, callback) {
        if (method == "GET") {
            app.route(url).get(callback);
        }
        if (method == "POST") {
            app.route(url).post(callback);
        }
        if (method == "PUT") {
            app.route(url).put(callback);
        }
        if (method == "DEL") {
            app.route(url).del(callback);
        }
    }

    /**
     * The add and API route
     * @param {string} method
     * @param {string} url
     * @param {string} callback
    */
    _interfaceManager.registerAPI = function (method, url, callback) {
        if (method == "GET") {
            app.route(url).get(callback);
        }
        if (method == "POST") {
            app.route(url).post(callback);
        }
        if (method == "PUT") {
            app.route(url).put(callback);
        }
        if (method == "DEL") {
            app.route(url).del(callback);
        }
    }

    /**
     * The listen method
     * @param {string} port
     * @param {string} callback
    */
    _interfaceManager.listen = function (port, callback) {
        app.listen(port, () => {
            callback(port);
        });
    };

    /**
         * Return the app routes
         */
    _interfaceManager.app = function () {
        return app;
    }

    app.get('/login',
        passport.authenticate('google', { scope: ['email', 'profile'] }), (req, res) => { }
    );
    app.get('/callback'
        , passport.authenticate('google', { scope: ['email', 'profile'] }),
        (req, res) => {
            return res.send('Congrats ' + '<br> ' + req.user.displayName + '( ' + req.user.id + ')<br><img src=' + req.user.image + '>');
        }
    );

    // Register the CORS middleware
    app.options('*', cors());

    return _interfaceManager;
};