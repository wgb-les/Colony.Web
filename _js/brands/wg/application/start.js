require.config({
    waitSeconds: 200,
    paths: {
        jquery: "../../../vendor/libs/jquery/jquery",
        jqueryUi: "../../../vendor/libs/jquery/jquery.ui",
        //jqueryUi: '//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min',
        jqueryRotate: "../../../vendor/libs/jquery/jquery.ui.rotatable",
        jqueryTouchPunch: "../../../vendor/libs/jquery/jquery.ui.touch-punch",
        html2Canvas: "../../../vendor/libs/jquery/html2canvas",
        jqueryMousewheel: "../../../vendor/libs/jquery/jquery.mousewheel",
        jqueryAnimate: "../../../shared/jquery.animate",
        //jqueryLettering: '../../../vendor/libs/jquery/jquery.lettering',
        underscore: "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.1/underscore-min",
        backbone: "../../../vendor/libs/backbone/backbone.min",
        // marionette: '//cdnjs.cloudflare.com/ajax/libs/backbone.marionette/1.0.4-bundled/backbone.marionette.min',
        marionette: "../../../vendor/libs/backbone/backbone.marionette.min",
        fcbkcomplete: "/_js/vendor/fcbkcomplete",
        imagesLoaded: "/_js/vendor/freetile/jquery.imagesLoaded",
        freetile: "/_js/vendor/freetile/jquery.freetile.min",
        freetileinit: "/_js/vendor/freetile/init",
        form: "/_js/shared/redant/form",
        accordion: "/_js/shared/redant/jquery.accordion.redant",
        RAUtil: "/_js/shared/redant/redant.util",
        //turnjs: "/_js/shared/turnjs",
        eventShim: "/_js/shared/eventShim",
        iscroll: "/_js/shared/iscroll",
        iscrollIpad: "/_js/shared/iscroll.ipad",
        foundation: "/_js/foundation/foundation",
        alerts: "/_js/foundation/foundation.alerts",
        clearing: "/_js/foundation/foundation.clearing",
        cookie: "/_js/foundation/foundation.cookie",
        dropdown: "/_js/foundation/foundation.dropdown",
        //joyride: "/_js/foundation/foundation.joyride",
        magellan: "/_js/foundation/foundation.magellan",
        orbit: "/_js/foundation/foundation.orbit",
        placeholder: "/_js/shared/jquery.placeholder",
        reveal: "/_js/foundation/foundation.reveal",
        section: "/_js/foundation/foundation.section",
        tooltips: "/_js/foundation/foundation.tooltips",
        topbar: "/_js/foundation/foundation.topbar",
        elevateZoom: "/_js/vendor/jquery.elevateZoom-3.0.3",
        qtip: "/_js/vendor/jquery.qtip",
        magnific: "/_js/vendor/magnific",
        scrapbook: "/_js/shared/scrapbook",
        menus: "/_js/shared/menus",
        //tweenmax: "http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min",
        mainShared: "/_js/shared/main",
        mainBrand: "/_js/brands/" + brand + "/desktop",
        jqueryEasing: "../../../vendor/jquery.easing.1.3",
        jqueryKinetic: "../../../vendor/jquery.kinetic",
        jqueryTemplate: "../../../vendor/jquery.tmpl.min",
        niceScroll: "/_js/shared/nice.scroll",
        'backbone.babysitter': "/_js/vendor/libs/backbone/backbone.babysitter.min",
        'backbone.wreqr': "/_js/vendor/libs/backbone/backbone.wreqr.min",
        carouFredSel: "/_js/vendor/jquery.carouFredSel-6.2.1-packed",
        touchSwipe: "/_js/vendor/jquery.touchSwipe.min",
        quickview: "/_js/shared/quickview",
        scrollTo: "/_js/shared/jquery-scrollto",
        menus: "/_js/shared/menus",
        infinateScroll: "/_js/shared/infinatescroll",
        imgTouchCanvas: "/_js/shared/img-touch-canvas"
    },

    shim: {
        underscore: {
            exports: "_"
        },
        jquery: {
            exports: "jquery"
        },
        jqueryUi: {
            deps: ["jquery"]
        },
        RAUtil: {
            deps: ["jquery"]
        },
        elevateZoom: {
            deps: ["jquery"]
        },
        qtip: {
            deps: ["jquery"]
        },
        magnific: {
            deps: ["jquery"]
        },
        magnific: {
            deps: ["jquery"]
        },
        foundation: {
            deps: ["jquery"]
        },
        quickview: {
            deps: ["jquery"]
        },
        scrollTo: {
            deps: ["jquery"]
        },
        menus: {
            deps: ["jquery"]
        },

        infinateScroll: {
            deps: ["jquery"]
        },

        imgTouchCanvas: {
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
        freetileinit: {
            deps: ["freetile"]
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
            deps: ["jquery", "jqueryUi", "backbone", "marionette"]
        },
        accordion: {
            deps: ["jquery"]
        },
        //turnjs: {
        //    deps: ["jquery"]
        //},

        jqueryMousewheel: {
            deps: ["jquery"]
        },

        jqueryEasing: {
            deps: ["jquery"]
        },

        jqueryKinetic: {
            deps: ["jquery"]
        },

        jqueryTemplate: {
            deps: ["jquery"]
        },
        niceScroll: {
            deps: ["jquery"]
        },
        /*jqueryLettering: {
            deps: ['jqueryLettering']
        }*/
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        marionette: {
            deps: ["backbone", "backbone.babysitter", "backbone.wreqr"],
            exports: "Backbone.Marionette"
        },
        jqueryAnimate: {
            deps: ["jquery"]
        },
        menus: {
            deps: ["jquery"]
        },
        scrapbook: {
            deps: ["jquery", "jqueryUi"]
        },
        scrapbook: {
            deps: ["jquery", "jqueryUi"]
        },
        touchSwipe: {
            deps: ["jquery"]
        },
        carouFredSel: {
            deps: ["jquery", "touchSwipe"]
        },
        mainShared: {
            deps: [
                "jqueryUi", "RAUtil", "alerts", "clearing", "cookie", "dropdown", /*"joyride",*/ "magellan", "orbit", "placeholder", "reveal", "section", "tooltips", "topbar",
                "jqueryRotate", "jqueryTouchPunch", "html2Canvas", "form", "accordion", /*"turnjs",*/ "fcbkcomplete", "eventShim", "iscroll", "elevateZoom", "qtip", "scrapbook", "magnific", "niceScroll", "carouFredSel", "scrollTo", "quickview", "infinateScroll", "imgTouchCanvas"
            ]
        },
        mainBrand: {
            deps: ["mainShared", "iscroll", "iscrollIpad", "jqueryMousewheel", "jqueryAnimate", /*"tweenmax",*/ "jqueryEasing", "jqueryKinetic", "jqueryTemplate"]
        }

    }
});

require([ /*'mainShared',*/ "mainBrand", "app"], function(main, App) {


    App.init();
    $(document).foundation();
});