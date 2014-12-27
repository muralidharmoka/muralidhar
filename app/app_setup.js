/**
 * Created by Muralidhar on 12/25/2014.
 */
window.appSetupFunctions = [];

window.setupApp = function(divSelector){
    divSelector = divSelector || '#app1';


    window.App = _.extend(Ember.Application.create({
        rootElement: divSelector,
        LOG_TRANSITIONS: false
    }));

    App.ApplicationAdapter = DS.LSAdapter.extend();
    _.each(window.appSetupFunctions, function (setupFunction) {
        setupFunction();
    });

};