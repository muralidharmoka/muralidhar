/**
 * Created by Muralidhar on 12/25/2014.
 */
(function(App){
    App.ApplicationRoute = Ember.Route.exted({
        model:function(){
            return users;
        }
    });
}());

