/**
 * Event Webhook Middleware
 * This middelware will send a webhook to a defined address
 * 
 * @param serviceManager
 */
module.exports = function (serviceManager) {

    // Initialise the event manager
    var _eventManager = {};
    var de
 
    /**
     * RaiseEvent method
     * @param {string} key
     * @parm {object} options
    */
    _eventManager.raiseEvent = function (name, options) {
        console.log("Event Webhook Middleware:" +name + options);
    }

    return _eventManager;
};