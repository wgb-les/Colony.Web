define([
        "jquery",
        "underscore",
        "backbone",
        "views/scrapbook/index"
    ],
    function($, _, Backbone, scrapbookView) {

        var AppRouter = Backbone.Router.extend({
            routes: {
                '/scrapbook': "scrapbook"
                //'*actions': 'defaultAction'
            },

            scrapbook: function() {
                //scrapbookView.render();
            },

        });

        var init = function() {
            var app_router = new AppRouter;

            app_router.on("scrapbook", function() {
                //var scrapbookView = new scrapbookView(); 
                //scrapbookView.render(); 
            });

            //Backbone.history.start();
        };
        return {
            init: init
        };
    });