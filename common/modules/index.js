/**
 * @fileoverview This file allows for simple helper functions that we may need
 */
'use strict';
const events = require('events');
const fs = require('fs');
const path = require('path');

/**
 * File Manager class
 */
module.exports = function () {

    var _utilities = {};

     /**
     * This utilitie allows us to find whether the project is running standalone or in modules. 
     * This then allows static resources to be accessible no matter at what level you are running 
     * be it nooblyjs or nooblyjs-module or any of the family of products that use
     * the library
     */
    _utilities.isModule = function() {
        return module.path.indexOf("node_modules") > -1;
    }


    /**
     * Add child modules to a module
     * @param {object} parentModule 
     * @param {string} modulegroupname 
     * @param {string} modulePath 
     */
    _utilities.loadChildModules = function(parentModule, modulegroupname , modulePath) {
        if (fs.existsSync(modulePath)) {
            var childModules = fs.readdirSync(modulePath);
            for (var i = 0; i < childModules.length; i++) {
              parentModule[modulegroupname].push(require(childModules[i]));
            }
          }
    }

  return _utilities
}

