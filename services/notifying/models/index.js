/**
 * Manage the models
 * 
 * @param serviceManager
 */
module.exports = function (serviceManager) {

    var  _modelmanager ={} ;
    _modelmanager.serviceManager = serviceManager;

    return _modelmanager;
};