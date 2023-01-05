/**
 * @fileoverview This file allows for simple helper functions for modules
 */
'use strict';

const events = require('events');
const fs = require('fs');
const path = require('path');

/**
 * Utilites Module
 * @returns {object}
 *  - isModule : This method is used to determine if the code is running directy or being run from a module in Node Modules
 *  - loadChildModules : This method is used to load "require" modules  by reading the file system directly. It should lessen the code needed to be written
 */
module.exports = function () {

    // Instantiate the module
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

