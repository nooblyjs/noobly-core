'use strict';
const config = require('config');

/**
 * Notifying Manager class
 */
module.exports = function (parameters) {

    /** Initiate the object */
    var _controller = {};

    /**
    * Has Property Method
    * @param {string} property
   */
    _controller.has = function (property) {
        return config.has(property);
    }

        /**
    * Get Property Method
    * @param {string} property
   */
         _controller.get = function (property) {
            return config.get(property);
        }

    return _controller;
};