require.config({
    paths: {
        jquery: "//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min",
        jqueryUi: "//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min",
        jqueryRotate: "../libs/jquery/jquery.ui.rotatable",
        jqueryTouchPunch: "../libs/jquery/jquery.ui.touch-punch",
        html2Canvas: "../libs/jquery/html2canvas",
        underscore: "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.1/underscore-min",
        backbone: "../libs/backbone/backbone.min",
        marionette: "//cdnjs.cloudflare.com/ajax/libs/backbone.marionette/1.0.4-bundled/backbone.marionette.min",
        modernizr: "/_js/vendor/custom.modernizr",
        fcbkcomplete: "/_js/vendor/fcbkcomplete",
        imagesLoaded: "/_js/vendor/freetile/jquery.imagesLoaded",
        freetile: "/_js/vendor/freetile/jquery.freetile.min",
        init: "/_js/vendor/freetile/init",
        form: "/_js/shared/redant/form",
        accordion: "/_js/shared/redant/jquery.accordion.redant",
        //turnjs: "/_js/shared/turnjs",
        iscroll: "/_js/shared/iscroll",
        foundation: "/_js/foundation/foundation",
        alerts: "/_js/foundation/foundation.alerts",
        clearing: "/_js/foundation/foundation.clearing",
        cookie: "/_js/foundation/foundation.cookie",
        dropdown: "/_js/foundation/foundation.dropdown",
        //joyride: "/_js/foundation/foundation.joyride",
        magellan: "/_js/foundation/foundation.magellan",
        orbit: "/_js/foundation/foundation.orbit",
        placeholder: "/_js/foundation/foundation.placeholder",
        reveal: "/_js/foundation/foundation.reveal",
        section: "/_js/foundation/foundation.section",
        tooltips: "/_js/foundation/foundation.tooltips",
        topbar: "/_js/foundation/foundation.topbar",
    },

    shim: {
        underscore: {
            exports: "_"
        },
        jquery: {
            exports: "jquery"
        },

        jqueryUI: {
            deps: ["jquery"]
        },

        foundation: {
            deps: ["jquery"]
        },

        alerts: {
            deps: ["foundation"]
        },

        clearing: {
            deps: ["foundation"]
        },

        cookie: {
            deps: ["foundation"]
        },

        dropdown: {
            deps: ["foundation"]
        },

        //joyride: {
        //    deps: ["foundation"]
        //},

        magellan: {
            deps: ["foundation"]
        },

        orbit: {
            deps: ["foundation"]
        },

        placeholder: {
            deps: ["foundation"]
        },

        reveal: {
            deps: ["foundation"]
        },

        section: {
            deps: ["foundation"]
        },

        tooltips: {
            deps: ["foundation"]
        },

        topbar: {
            deps: ["foundation"]
        },

        imagesLoaded: {
            deps: ["jquery"],
            exports: "jQuery.fn.imagesLoaded"
        },

        freetile: {
            deps: ["jquery", "imagesLoaded"],
            exports: "jQuery.fn.freetile"
        },
        init: {
            deps: ["jquery", "imagesLoaded", "freetile"]
        },
        jqueryRotate: {
            deps: ["jquery"]
        },
        jqueryTouchPunch: {
            deps: ["jquery"]
        },
        html2Canvas: {
            deps: ["jquery"]
        },
        touchPunch: {
            deps: ["jquery"]
        },
        fcbkcomplete: {
            deps: ["jquery"]
        },
        form: {
            deps: ["jquery", "backbone", "marionette"]
        },
        accordion: {
            deps: ["jquery"]
        },
        //turnjs: {
        //    deps: ["jquery"]
        //},

        backbone: {
            deps: ["underscore", "jquery", "jqueryUi"],
            exports: "Backbone"
        },

        marionette: {
            deps: ["backbone"],
            exports: "Backbone.Marionette"
        }

    }
});

require(["app", "foundation", "alerts", "clearing", "cookie", "dropdown", /*"joyride",*/ "magellan", "orbit", "placeholder", "reveal", "section", "tooltips", "topbar", "jquery", "jqueryRotate", "jqueryTouchPunch", "html2Canvas", "modernizr", "fcbkcomplete", "marionette", "form", "accordion", /*"turnjs",*/ "iscroll"], function(App) {
    App.init();
    $(document).foundation();
});