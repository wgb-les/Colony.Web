// Accordion Plugin
// Version: 1.0.3
// Author: Steven Burrows

;
(function($) {

    var noop = function() { return; };

    $.accordion = function(el, options) {

        var defaults = {
            accordionType: "simple",
            trigger: "h3",
            element: ".details",
            container: "article",
            closeOthers: true,
            transitionSpeed: 250,
            transitionEase: "swing",
            expandedClass: "expanded",
            openFirst: true,
            onItemOpen: noop,
            onItemClose: noop,
            onInit: noop
        };
        var plugin = this;
        plugin.settings = {};
        var init = function() {
            plugin.settings = $.extend({}, defaults, options);
            plugin.el = el;
            if (plugin.settings.accordionType == "simple") {
                plugin.init_simple();
            } else {
                plugin.init_adv()
            }

            plugin.settings.onInit(plugin);

        };
        //SIMPLE ACCORDION
        plugin.init_simple = function() {
            $(plugin.el.selector + " " + plugin.settings.trigger).each(function(index, element) {
                $(this).next().hide();
                $(this).bind("click", plugin.simple_clicked);
            });
            if (plugin.settings.openFirst == true) {
                $(plugin.el.selector + " " + plugin.settings.trigger + ":first").trigger("click");
            }
        };
        plugin.simple_clicked = function(e) {
            if (plugin.settings.closeOthers) {
                var current = {
                    obj: $(this),
                    visible: $(this).next().is(":visible")
                };
                $(this).parentsUntil(plugin.el.selector).parent().children(plugin.settings.container).children(plugin.settings.trigger).each(function(index, element) {
                    $(this).next().stop().slideUp();
                    $(this).parent().removeClass(plugin.settings.expandedClass);
                });

                if (current.visible == true) {
                    current.obj.next().stop().slideUp(plugin.settings.transitionSpeed, plugin.settings.transitionEase, function() { $(this).attr("style", "overflow-x: hidden; overflow-y: hidden; display: none;") });
                } else {
                    current.obj.next().stop().slideDown(plugin.settings.transitionSpeed, plugin.settings.transitionEase);
                    $(this).parent().addClass(plugin.settings.expandedClass);
                }
            } else {
                $(this).next().slideToggle(plugin.settings.transitionSpeed, plugin.settings.transitionEase);
                $(this).parent().toggleClass(plugin.settings.expandedClass);
            }
            return false;
        };

        //ADVANCED ACCORDION
        plugin.init_adv = function() {
            $(plugin.el.selector + " " + plugin.settings.trigger).each(function(index, element) {
                $(this).closest(plugin.settings.container).children(plugin.settings.element).hide();
                $(this).bind("click", plugin.adv_clicked);
            });
        };
        plugin.adv_clicked = function(e) {
            var current = { obj: $(this), visible: $(this).closest(plugin.settings.container).children(plugin.settings.element).is(":visible") };
            if (plugin.settings.closeOthers) {
                $(this).parentsUntil(plugin.el.selector).parent().children(plugin.settings.container).children(plugin.settings.element).each(function(index, element) {
                    $(this).closest(plugin.settings.container).children(plugin.settings.element).stop().slideUp();
                    $(this).parent().removeClass(plugin.settings.expandedClass);
                });
                if (current.visible == true) {
                    current.obj.closest(plugin.settings.container).children(plugin.settings.element).stop().slideUp();
                    plugin.settings.onItemClose($(this).parents(plugin.settings.container));
                } else {
                    current.obj.closest(plugin.settings.container).children(plugin.settings.element).stop().slideDown();
                    $(this).parent().addClass(plugin.settings.expandedClass);
                    plugin.settings.onItemOpen($(this).parents(plugin.settings.container));
                }
            } else {
                $(this).closest(plugin.settings.container).children(plugin.settings.element).slideToggle(plugin.settings.transitionSpeed, plugin.settings.transitionEase);
                $(this).parent().toggleClass(plugin.settings.expandedClass);

                if (current.visible == true) {
                    plugin.settings.onItemClose($(this).parents(plugin.settings.container));
                } else {
                    plugin.settings.onItemOpen($(this).parents(plugin.settings.container));
                }
            }
            return false;
        };
        init();

    };
})(jQuery);