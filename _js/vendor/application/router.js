define([
        "jquery",
        //'jqueryUi',
        //'jqueryRotate',
        //'jqueryTouchPunch',
        //'html2Canvas',
        "underscore",
        "backbone",
        "views/scrapbook/index",
        "views/filter/index",
    ],
    function($, _, Backbone, scrapbookView, filterView) {
        var AppRouter = Backbone.Router.extend({
            routes: {
                '/scrapbook': "scrapbook",
                '/filter': "filter"
                //'*actions': 'defaultAction'
            },

            scrapbook: function() {
                //scrapbookView.render();
            },

            filter: function() {
                filterView.render();
            }
        });

        var init = function() {
            var app_router = new AppRouter;

            app_router.on("scrapbook", function() {
                var scrapbookView = new scrapbookView();
                scrapbookView.render();
            });

            app_router.on("filter", function() {
                var filterView = new filterView();
                filterView.render();
            });

            Backbone.history.start();
        };
        return {
            init: init
        };
    });